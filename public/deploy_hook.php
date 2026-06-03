<?php
/**
 * deploy_hook.php — Portfolio deploy (apps.instantpdf.ro)
 * Mirror al fluxului Instantino: git push + curl, fara SSH / shell_exec.
 * Descarca ZIP-ul repo-ului public de pe GitHub si extrage DOAR folderul
 * `dist/` (build-ul) in directorul curent (docroot).
 *
 * Trigger: curl -s -A "Mozilla/5.0" "https://apps.instantpdf.ro/deploy_hook.php?token=TOKEN"
 * Secret : fisier cu o linie, UN nivel DEASUPRA docroot-ului (neservit, necomis in repo).
 */
header('Content-Type: application/json; charset=utf-8');

// GitHub (repo public — fara token de auth)
$GH_USER   = 'yolo420ro';
$GH_REPO   = 'apps-instanpdf-portfolio';
$GH_BRANCH = 'main';

// Docroot = folderul in care sta scriptul. dist/ se extrage aici.
$docroot = __DIR__;

// Secret: fisier UN nivel deasupra docroot-ului (nu e web-accesibil, nu e in repo).
$secretFile = dirname(__DIR__) . '/apps_deploy_secret.txt';
$secret = is_file($secretFile) ? trim(file_get_contents($secretFile)) : '';

// ── Auth (compare in timp constant)
$token = isset($_GET['token']) ? $_GET['token']
       : (isset($_SERVER['HTTP_X_DEPLOY_TOKEN']) ? $_SERVER['HTTP_X_DEPLOY_TOKEN'] : '');
if ($secret === '' || $token === '' || !hash_equals($secret, $token)) {
    http_response_code(403);
    echo json_encode(['ok' => false, 'error' => 'Unauthorized']);
    exit;
}

@set_time_limit(300);
@ini_set('memory_limit', '256M');

// ── Download ZIP de pe GitHub (public)
$zipUrl = "https://codeload.github.com/{$GH_USER}/{$GH_REPO}/zip/refs/heads/{$GH_BRANCH}";
$tmp = sys_get_temp_dir() . "/deploy_portfolio_" . time() . ".zip";
$fp = fopen($tmp, 'w+');
if (!$fp) { echo json_encode(['ok' => false, 'error' => 'Cannot create temp file']); exit; }

$ch = curl_init();
curl_setopt_array($ch, [
    CURLOPT_URL            => $zipUrl,
    CURLOPT_FILE           => $fp,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_MAXREDIRS      => 5,
    CURLOPT_TIMEOUT        => 180,
    CURLOPT_SSL_VERIFYPEER => false,
    CURLOPT_USERAGENT      => 'Portfolio-Deploy/1.0',
]);
curl_exec($ch);
$httpCode  = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);
fclose($fp);

if ($httpCode !== 200 || !filesize($tmp)) {
    @unlink($tmp);
    echo json_encode(['ok' => false, 'error' => 'GitHub ZIP download failed', 'http_code' => $httpCode, 'curl_error' => $curlError]);
    exit;
}

// ── Extrage DOAR dist/ → docroot
$zip = new ZipArchive();
if ($zip->open($tmp) !== true) {
    @unlink($tmp);
    echo json_encode(['ok' => false, 'error' => 'Cannot open ZIP']);
    exit;
}

// Folderul-radacina din ZIP-ul GitHub, ex. "apps-instanpdf-portfolio-main/"
$root = '';
for ($i = 0; $i < $zip->numFiles; $i++) {
    $n = $zip->getNameIndex($i);
    $slash = strpos($n, '/');
    if ($slash !== false) { $root = substr($n, 0, $slash + 1); break; }
}
$distPrefix = $root . 'dist/';

$updated = 0; $errors = [];
for ($i = 0; $i < $zip->numFiles; $i++) {
    $name = $zip->getNameIndex($i);
    if (strpos($name, $distPrefix) !== 0) continue;            // doar build-ul
    $rel = substr($name, strlen($distPrefix));
    if ($rel === '' || strpos($rel, '..') !== false) continue; // skip radacina + zip-slip

    $target = $docroot . '/' . $rel;
    if (substr($name, -1) === '/') {
        if (!is_dir($target)) @mkdir($target, 0755, true);
        continue;
    }
    $parent = dirname($target);
    if (!is_dir($parent)) @mkdir($parent, 0755, true);

    $content = $zip->getFromIndex($i);
    if ($content === false) { $errors[] = "read: $rel"; continue; }
    if (file_put_contents($target, $content) !== false) { $updated++; }
    else { $errors[] = "write: $rel"; }
}
$zip->close();
@unlink($tmp);

echo json_encode([
    'ok'            => empty($errors),
    'repo'          => $GH_REPO,
    'files_updated' => $updated,
    'errors_count'  => count($errors),
    'errors'        => array_slice($errors, 0, 20),
    'timestamp'     => date('Y-m-d H:i:s'),
], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);

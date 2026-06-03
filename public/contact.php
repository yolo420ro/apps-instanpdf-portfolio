<?php
/**
 * contact.php — primeste formularul de contact (JSON POST) si trimite email.
 * Destinatarul e citit dintr-un fisier server-side (NU in repo public):
 *   /home/instant1/_secure/portofoliu/contact_to.txt  (o linie, adresa ta)
 */
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'POST only']);
    exit;
}

$raw  = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) {
    echo json_encode(['ok' => false, 'error' => 'bad payload']);
    exit;
}

// Honeypot: botii completeaza "website" -> raspundem ok dar nu trimitem.
if (!empty($data['website'])) {
    echo json_encode(['ok' => true]);
    exit;
}

$name    = trim((string)($data['name'] ?? ''));
$email   = trim((string)($data['email'] ?? ''));
$message = trim((string)($data['message'] ?? ''));

if ($name === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || $message === '') {
    echo json_encode(['ok' => false, 'error' => 'date invalide']);
    exit;
}

// Limita lungimi (anti-abuz)
$name    = mb_substr($name, 0, 120);
$email   = mb_substr($email, 0, 160);
$message = mb_substr($message, 0, 5000);

// Destinatar din fisier server-side (in afara docroot-ului, nu in repo)
$toFile = dirname(__DIR__) . '/_secure/portofoliu/contact_to.txt';
$to = is_file($toFile) ? trim(file_get_contents($toFile)) : '';
if ($to === '' || !filter_var($to, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['ok' => false, 'error' => 'recipient not configured']);
    exit;
}

$fromDomain = 'noreply@instantpdf.ro';
$subject    = "Portfolio contact: " . $name;
$body  = "Mesaj nou de pe apps.instantpdf.ro\n\n";
$body .= "Nume:  $name\n";
$body .= "Email: $email\n\n";
$body .= "Mesaj:\n$message\n";

$headers  = "From: Portfolio <{$fromDomain}>\r\n";
$headers .= "Reply-To: {$email}\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';

$sent = @mail($to, $encodedSubject, $body, $headers);

echo json_encode(['ok' => (bool)$sent]);

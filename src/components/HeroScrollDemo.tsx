import { ContainerScroll } from "@/components/ui/container-scroll-animation";

export function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden pb-[8rem] pt-[2rem]">
      <ContainerScroll
        titleComponent={
          <>
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-neutral-400">
              Portfolio
            </p>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
              Catalin Paul Popescu <br />
              <span className="mt-1 text-4xl font-bold leading-none md:text-[6rem]">
                AI Solutions Architect
              </span>
            </h1>
            <p className="mt-4 max-w-xl text-base text-neutral-400 md:text-lg">
              I build AI-agent systems — and the framework that builds them.
            </p>
          </>
        }
      >
        <img
          src="/hero.jpg"
          alt="Portfolio preview"
          height={720}
          width={1400}
          className="mx-auto h-full rounded-2xl object-cover object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}

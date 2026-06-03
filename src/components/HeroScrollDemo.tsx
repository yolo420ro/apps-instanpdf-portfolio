import { ContainerScroll } from "@/components/ui/container-scroll-animation";

export function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden pb-[8rem] pt-[2rem]">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
              Catalin Paul Popescu <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                AI Solutions Architect
              </span>
            </h1>
          </>
        }
      >
        <img
          src="/linear.webp"
          alt="portfolio preview"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}

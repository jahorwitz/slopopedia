import { Header, Image, MovieCardList, PageTitle } from "../components";
import image from "../images/main_image.svg";

export function MainRoute() {
  return (
    <>
      <div className="relative">
        <Header>
          <Header.Logo />
          <Header.NavLinks />
          <Header.Profile />
        </Header>
        <div className="flex flex-row w-full max-w-[1440px] mb-20 mx-auto items-center content-center xs:pr-2  md:text-md md:pr-2">
          <Image
            className={"absolute w-full  max-w-[1440px] pt-11 xs:pt-5 sm:pt-9"}
            src={image}
            alt="actors"
          />
        </div>
      </div>

      <div className="w-full max-w-[1440px] mx-auto p-20 xs:p-4 sm:pl-7 sm:pr-7 sm:pt-15">
        <PageTitle className="h-6 w-36 font-bold" title="RECENTLY ADDED" />
        <div className="flex flex-wrap md:flex-wrap xs:flex-wrap gap-5 mb-10">
          <MovieCardList />
        </div>
      </div>
    </>
  );
}

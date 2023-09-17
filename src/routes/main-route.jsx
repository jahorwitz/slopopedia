import { Header } from "../components/index";
import MovieCardList from "../components/MovieCardList";
import PageTitle from "../components/PageTitle/PageTitle";
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
        <div className="flex flex-row w-full max-w-[1440px] mb-20 mx-auto items-center content-center xs:pl-2 xs:pr-2  md:text-md md:pr-2 md:pl-2 ">
          <img
            className="absolute pt-11 xs:pt-5 sm:pt-9"
            src={image}
            alt="actors"
          />
        </div>
      </div>

      <div className="w-full max-w-[1440px] mx-auto p-20">
        <PageTitle className="h-6 w-36 font-bold" title="RECENTLY ADDED" />
        <div className="flex flex-wrap md:flex-wrap xs:flex-wrap gap-5 mb-10">
          <MovieCardList />
        </div>
      </div>
    </>
  );
}

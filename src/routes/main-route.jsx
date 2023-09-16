import { Header } from "../components/index";
import MovieCardList from "../components/MovieCardList";
import image from "../images/main_image.svg";

export function MainRoute() {
  return (
    <>
      <Header>
        <Header.Logo />
        <Header.NavLinks />
        <Header.Profile />
      </Header>
      <div
        className="flex flex-row w-full max-w-[1440px] mx-auto items-center z-0 content-center xs:pl-2 xs:pr-2  md:text-md md:pr-2 md:pl-2 "
        style={{ position: "relative", top: "-59px" }}
      >
        <img className="relative" src={image} alt="actors" />
      </div>

      <div className="w-full max-w-[1440px] mx-auto p-20">
        <p className="h-6 w-36 font-bold">RECENTLY ADDED</p>
        <div className="flex flex-wrap md:flex-wrap xs:flex-wrap gap-5 mb-10">
          <MovieCardList />
        </div>
      </div>
    </>
  );
}

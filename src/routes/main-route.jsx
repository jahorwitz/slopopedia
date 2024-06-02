import { Link } from "react-router-dom";
import { Header, MovieCardList } from "../components";
import { useMovies } from "../hooks/use-movies";
import image from "../images/main_image.svg";

export function MainRoute() {
  const { movieData, moviesLoading } = useMovies();

  return (
    <>
      <div className="relative">
        <Header>
          <Header.Logo />
          <Header.NavLinks />
          <Header.Profile />
        </Header>
        <Link to="/sounds">
          <div className="flex  flex-row w-full h-[120px] mt-[-30px] bg-no-repeat bg-cover bg-center mx-auto items-center content-center md:text-md ">
            <img className={"w-full"} src={image} alt="actors" />
          </div>
        </Link>
        {/* The above div is the mainpage banner */}
      </div>
      <div className="w-full p-[120px] xs:p-[20px] sm:p-[40px] md:p-[60px]">
        <h1 className="flex w-full mb-8 gap-12 text-xl scale-y-2 font-arialBold font-medium text-grey-900 text-center sm:pt-[20px] md:pt-[15px]">
          RECENTLY ADDED
        </h1>
        <div className="flex flex-wrap md:flex-wrap xs:flex-wrap gap-5 mb-10">
          {!moviesLoading && <MovieCardList movies={movieData?.movies} />}
        </div>
      </div>
    </>
  );
}

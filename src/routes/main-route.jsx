import { useQuery } from "@apollo/client";
import { Header, MovieCardList } from "../components";
import { GET_MOVIES } from "../graphql/get-movies";
import image from "../images/main_image.svg";

export function MainRoute() {
  const { data, loading, error } = useQuery(GET_MOVIES, {
    variables: {
      where: {},
    },
  });

  return (
    <>
      <div className="relative">
        <Header>
          <Header.Logo />
          <Header.NavLinks />
          <Header.Profile />
        </Header>
        <div className="flex flex-row w-full max-w-[1440px] mb-20 mx-auto items-center content-center xs:pr-2  md:text-md md:pr-2">
          <img
            className={"absolute w-full  max-w-[1440px] pt-11 xs:pt-5 sm:pt-9"}
            src={image}
            alt="actors"
          />
        </div>
      </div>

      <div className="w-full max-w-[1440px] mx-auto p-20">
        <h1 className="h-6 w-36 font-bold">RECENTLY ADDED</h1>
        <div className="flex flex-wrap md:flex-wrap xs:flex-wrap gap-5 mb-10">
          {!loading && <MovieCardList movies={data?.movies} />}
        </div>
      </div>
    </>
  );
}

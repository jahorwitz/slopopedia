import { useQuery } from "@apollo/client";
import { Header, MovieCardList } from "../components";
import { GET_MOVIES } from "../graphql/get-movies";
import image from "../images/main_image.svg";

export function MainRoute() {
  const { data, loading, error } = useQuery(GET_MOVIES, {
    variables: {
      where: {
        status: {
          equals: "published",
        },
      },
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
        <div className="flex  flex-row w-full h-[120px] mt-[-30px] bg-no-repeat bg-cover bg-center mx-auto items-center content-center md:text-md ">
          <img className={"w-full"} src={image} alt="actors" />
        </div>
        {/* The above div is the mainpage banner */}
      </div>
      <div className="w-full p-[120px] xs:p-[20px] sm:p-[40px] md:p-[60px]">
        <h1 className="flex w-full mb-8 gap-12 text-xl scale-y-2 font-arialBold font-medium text-grey-900 text-center sm:pt-[20px] md:pt-[15px]">
          RECENTLY ADDED
        </h1>
        <div className="flex flex-wrap md:flex-wrap xs:flex-wrap gap-5 mb-10">
          {!loading && <MovieCardList movies={data?.movies} />}
        </div>
      </div>
    </>
  );
}

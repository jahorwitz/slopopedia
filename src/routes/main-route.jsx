import { Header } from "../components/index";
import MovieCardList from "../components/MovieCardList";

export function MainRoute() {
  return (
    <>
      <Header>
        <Header.Logo />
        <Header.NavLinks />
        <Header.Profile />
      </Header>
      {/* <div className="w-full max-w-[1440px] mx-auto">
        <img src={mainImage} alt="faces" />
      </div> */}
      <div className="w-full max-w-[1440px] mx-auto p-20">
        <p className="h-6 w-36 font-bold">RECENTLY ADDED</p>
        <div className="flex flex-wrap md:flex-wrap xs:flex-wrap gap-5 mb-10">
          <MovieCardList />
        </div>
      </div>
    </>
  );
}

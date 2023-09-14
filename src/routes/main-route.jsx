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
      {/* <div className="w-full  max-w-[1440px] mx-auto"> */}
      <div className="w-full max-w-[1440px] mx-auto p-4">
        <p className="px-5 py-2">RECENTLY ADDED</p>
        <div className="flex flex-wrap px-16 py-5 md:flex-wrap-reverse">
          <MovieCardList />
        </div>
      </div>
    </>
  );
}

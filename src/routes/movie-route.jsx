import { Header, MoviePage } from "../components/index";

export function MovieRoute() {
  return (
    <>
      <Header>
        <Header.Logo />
        <Header.NavLinks />
        <Header.Profile />
      </Header>
      <div className="flex flex-col">
        <MoviePage />
      </div>
    </>
  );
}

import { Footer, Header } from "../components/index";
import ArtcilePage from "../page/blog/ArticlePage.jsx";

export function ArticleRoute() {
  return (
    <>
      <div className="relative">
        <Header>
          <Header.Logo />
          <Header.NavLinks />
          <Header.Profile />
        </Header>
      </div>
      <div className="w-full max-w-[1440px] -top-5 mx-auto p-20 flex flex-row relative justify-center">
        <ArtcilePage />
      </div>
      <div className="w-full max-w-[989] mx-auto p-20 top-60">
        <Footer>
          <Footer.Content></Footer.Content>{" "}
        </Footer>
      </div>
    </>
  );
}

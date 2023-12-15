import { Header } from "../../components";
import ArticlePage from "../../page/blog/article-page.jsx";

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
        <ArticlePage />
      </div>
    </>
  );
}

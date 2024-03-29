import { Header } from "../../components";
import ArticlesPage from "../../page/blog/articles-page.jsx";

export function ArticlesRoute() {
  return (
    <>
      <div className="relative">
        <Header>
          <Header.Logo />
          <Header.NavLinks />
          <Header.Profile />
        </Header>
      </div>
      <ArticlesPage />
    </>
  );
}

import { Header } from "../../components";
import ArticlesPage from "../../page/blog/articles-page.jsx";

export function ArticlesRoute() {
  return (
    <>
      <div className="relative" data-test-id="articles-header">
        <Header data-test-id="articles-header">
          <Header.Logo />
          <Header.NavLinks />
          <Header.Profile />
        </Header>
      </div>
      <ArticlesPage data-test-id="articles-articlespage" />
    </>
  );
}

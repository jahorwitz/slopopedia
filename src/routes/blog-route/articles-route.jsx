import { Header } from "../../components";
import ArticlesPage from "../../page/blog/articles-page.jsx";

export function ArticlesRoute() {
  return (
    <>
      <div className="relative" data-test-id="articles-header">
        <Header data-test-id="articles-header">
          <Header.Logo data-test-id="articles-header-logo" />
          <Header.NavLinks data-test-id="articles-header-navLinks" />
          <Header.Profile data-test-id="articles-header-profile" />
        </Header>
      </div>
      <ArticlesPage data-test-id="articles-articlespage" />
    </>
  );
}

import { Header } from "../../components";
import ArticlePage from "../../page/blog/article-page.jsx";

export function ArticleRoute({ type }) {
  return (
    <>
      <div className="relative" data-test-id="article-header">
        <Header data-test-id="article-header">
          <Header.Logo data-test-id="article-header-logo" />
          <Header.NavLinks data-test-id="article-header-navlinks" />
          <Header.Profile data-test-id="article-header-profile" />
        </Header>
      </div>
      <ArticlePage type={type} data-test-id="article-articlePage" />
    </>
  );
}

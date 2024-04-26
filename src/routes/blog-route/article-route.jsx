import { Header } from "../../components";
import ArticlePage from "../../page/blog/article-page.jsx";

export function ArticleRoute({ isEdited }) {
  return (
    <>
      <div className="relative">
        <Header>
          <Header.Logo />
          <Header.NavLinks />
          <Header.Profile />
        </Header>
      </div>
      <ArticlePage isEdited={isEdited} />
    </>
  );
}

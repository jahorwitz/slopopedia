import { useQuery } from "@apollo/client";
import { Footer, Post } from "../../components/index.js";
import { GET_BLOG_POSTS } from "../../graphql/queries/blog/posts.js";
import { useCurrentUser } from "../../hooks/use-current-user.js";
import purpleGoblin from "../../images/purple-goblin.png";
import { formatDateTime } from "../../utils/constants.js";

export const Articles = () => {
  const { isLoggedIn } = useCurrentUser();
  const { data, loading, error } = useQuery(GET_BLOG_POSTS, {
    variables: {
      where: {
        status: {
          equals: "published",
        },
      },
    },
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });
  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;

  return (
    <div className="max-w-[1440px] mx-auto" data-test-id="articles-page">
      {isLoggedIn && (
        <div
          className="flex mt-10 justify-end mr-32"
          data-test-id="articles-page-navbar-loggedin"
        >
          <a
            href="/draft"
            className="underline"
            data-test-id="articles-page-navbar-loggedin-drafts"
          >
            Drafts
          </a>
          <a
            href="/articles/create"
            className="underline ml-5"
            data-test-id="articles-page-navbar-loggedin-new-entry"
          >
            + New Entry
          </a>
        </div>
      )}
      <div className="w-full mx-auto pt-10 pb-20 flex flex-col">
        <div>
          {data.posts.map((post, index) => {
            const { title, content, author, id, createdAt, keywords, movies } =
              post;
            if (index % 2 == 0) {
              return (
                <div key={id} className="flex mx-20 justify-between mb-8">
                  <Post
                    title={title}
                    content={content}
                    author={author?.username}
                    date={formatDateTime(createdAt)}
                    id={id}
                    keywords={keywords}
                    movies={movies}
                    className={``}
                    data-test-id="articles-page-post"
                  />
                  <img className="mx-40" src={purpleGoblin} />
                </div>
              );
            } else {
              return (
                <div key={id} className="flex mx-20 justify-between mb-8">
                  <img className="mx-auto" src={purpleGoblin} />

                  <Post
                    title={title}
                    content={content}
                    author={author?.username}
                    date={formatDateTime(createdAt)}
                    id={id}
                    keywords={keywords}
                    className={``}
                    data-test-id="articles-page-post"
                  />
                </div>
              );
            }
          })}
        </div>
      </div>
      <div
        className="w-full max-w-[989] mx-auto p-10"
        data-test-id="articles-page-footer"
      >
        <Footer data-test-id="articles-page-footer"></Footer>
      </div>
    </div>
  );
};

export default Articles;

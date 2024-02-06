import { useQuery } from "@apollo/client";
import { Footer, Post } from "../../components/index.js";
import { GET_BLOG_POSTS } from "../../graphql/queries/blog/posts.js";
import { formatDateTime } from "../../utils/constants.js";

export const Articles = () => {
  const { data, loading, error } = useQuery(GET_BLOG_POSTS, {
    variables: {
      where: {
        status: {
          equals: "published",
        },
      },
    },
  });
  console.log(data);
  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;

  return (
    <div>
      <div className="float-right mr-32 mt-10 flex">
        <a href="/draft" className="underline">
          Drafts
        </a>
        <a href="/articles/create" className="underline ml-5">
          + New Entry
        </a>
      </div>
      <div className="w-full max-w-[1440px] mx-auto p-20 flex flex-col">
        <div>
          {data.posts.map((post, index) => {
            const { title, content, author, id, createdAt, keywords } = post;
            return (
              <Post
                key={id}
                title={title}
                content={content}
                author={author?.username}
                date={formatDateTime(createdAt)}
                id={id}
                keywords={keywords}
                className={``}
              />
            );
          })}
        </div>
      </div>
      <div className="absolute bottom-0 w-full max-w-[989] mx-auto p-10">
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Articles;

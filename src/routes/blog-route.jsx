import { useQuery } from "@apollo/client";
import { Footer, Header, Post } from "../components";
import { GET_BLOG_POSTS } from "../graphql/queries/blog/posts.js";
import { formatDateTime } from "../utils/constants.js";

export function BlogRoute() {
  const { data, loading, error } = useQuery(GET_BLOG_POSTS);
  console.log(data);
  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;

  return (
    <>
      <div className="relative">
        <Header>
          <Header.Logo />
          <Header.NavLinks />
          <Header.Profile />
        </Header>
      </div>
      <div className="float-right mr-32 mt-10 flex">
        <a href="/draft" className="underline">
          Drafts
        </a>
        <a href="/article" className="underline ml-5">
          + New Entry
        </a>
      </div>
      <div className="w-full max-w-[1440px] mx-auto p-20 flex flex-col">
        <div>
          {data.posts.map((post) => {
            const {
              id,
              title,
              content: { document },
            } = post;
            const body = document[0].children.map((child) =>
              child.text ? child.text : null
            );
            return (
              <Post
                key={id}
                title={title}
                btnTitle={"Not Slop"}
                content={body}
                author={post.author?.name}
                date={formatDateTime(post.author?.createdAt)}
              />
            );
          })}
        </div>
      </div>
      <div className="w-full max-w-[989] mx-auto p-20">
        <Footer>
          <Footer.Content></Footer.Content>{" "}
        </Footer>
      </div>
    </>
  );
}

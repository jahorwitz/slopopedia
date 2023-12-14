import { useQuery } from "@apollo/client";
import { Footer, Header, Post } from "../../components";
import { GET_BLOG_POSTS } from "../../graphql/queries/blog/posts.js";
import { formatDateTime } from "../../utils/constants.js";

export function BlogRoute() {
  const { data, loading, error } = useQuery(GET_BLOG_POSTS);
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
          {data.posts.map((post, index) => {
            const { title, content, author } = post;
            //const isOdd = index % 2 !== 0;
            return (
              <Post
                key={index}
                title={title}
                content={content}
                author={author?.username}
                date={formatDateTime(author?.createdAt)}
                //className={isOdd ? 'scale-x-[-1]' : ''}
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

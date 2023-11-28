import { useQuery } from "@apollo/client";
import { Draft } from "../../components";
import { GET_DRAFT_POSTS } from "../../graphql/queries/blog/posts.js";
import { formatDateTime } from "../../utils/constants.js";

export default function Drafts() {
  const { data, loading, error } = useQuery(GET_DRAFT_POSTS);
  console.log(data);
  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;

  return (
    <>
      <div className="w-full max-auto max-w-2xl h-40 left-60 relative">
        {data.posts.map((post, idx) => {
          const { title, author } = post;
          return (
            <Draft
              key={idx}
              title={title}
              date={formatDateTime(author?.createdAt)}
              author={author?.username}
            />
          );
        })}
      </div>
    </>
  );
}

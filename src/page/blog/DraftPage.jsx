import { useQuery } from "@apollo/client";
import { Draft } from "../../components";
import { GET_DRAFT_POSTS } from "../../graphql/queries/blog/posts.js";
import { formatDateTime } from "../../utils/constants.js";

export default function Drafts() {
  const { data, loading, error } = useQuery(GET_DRAFT_POSTS);

  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;

  return (
    <>
      <div className="w-full max-auto max-w-2xl h-40 left-60 relative">
        {data.posts.map((post, idx) => (
          <Draft
            key={idx}
            title={post.title}
            date={formatDateTime(post.author?.createdAt)}
            author={post.author?.name}
          />
        ))}
      </div>
    </>
  );
}

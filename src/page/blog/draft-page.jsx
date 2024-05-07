import { useQuery } from "@apollo/client";
import { useContext } from "react";
import { Draft } from "../../components";
import { GET_DRAFT_POSTS } from "../../graphql/queries/blog/posts.js";
import { CurrentUserContext } from "../../store/current-user-context.js";
import { formatDateTime } from "../../utils/constants.js";

export default function Drafts() {
  const { currentUser } = useContext(CurrentUserContext);
  const { data, loading, error } = useQuery(GET_DRAFT_POSTS, {
    variables: {
      where: {
        status: { equals: "draft" },
        AND: [
          {
            author: {
              id: {
                equals: currentUser.id,
              },
            },
          },
        ],
      },
    },
  });
  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;

  return (
    <>
      <div className="w-full max-auto max-w-2xl h-40 left-60 relative">
        {data.posts.map((post, idx) => {
          const { title, author, createdAt, id } = post;
          return (
            <Draft
              key={idx}
              title={title}
              date={formatDateTime(createdAt)}
              author={author?.username}
              id={id}
              keywords={keywords}
              movies={movies}
            />
          );
        })}
      </div>
    </>
  );
}

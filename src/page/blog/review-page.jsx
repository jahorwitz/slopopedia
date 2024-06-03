import { useMutation, useQuery } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  DeleteConfirmationModal,
  Footer,
} from "../../components/index.js";
import { DELETE_POST } from "../../graphql/mutations/blog/post.js";
import {
  GET_BLOG_POST,
  GET_BLOG_POSTS,
} from "../../graphql/queries/blog/posts.js";
import { useModals } from "../../hooks/use-modals.js";
import { CurrentUserContext } from "../../store/current-user-context.js";
import { formatDateTime } from "../../utils/constants.js";

export const Review = ({ id }) => {
  const { openModal, closeModal } = useModals();
  const router = useNavigate();
  const { currentUser } = useContext(CurrentUserContext);
  const [post, setPost] = useState({
    title: "",
    username: "",
    content: "",
    keywords: [],
    createdAt: "",
  });
  const [deletePost, {}] = useMutation(DELETE_POST, {
    refetchQueries: [GET_BLOG_POSTS],
  });

  const { data } = useQuery(GET_BLOG_POST, {
    variables: {
      where: {
        id: id,
      },
    },
  });
  const [accessGranted, setAccessGranted] = useState(false);

  useEffect(() => {
    if (data) {
      if (data.post.author) {
        setPost({
          title: data.post.title,
          content: data.post.content,
          username: data.post.author.username,
          keywords: data.post.keywords,
          createdAt: data.post.createdAt,
        });
        if (currentUser.id === data.post.author.id) {
          setAccessGranted(true);
        }
      } else {
        setPost({
          title: data.post.title,
          content: data.post.content,
          username: "User Deleted",
          keywords: data.post.keywords,
          createdAt: data.post.createdAt,
        });
      }
    }
  }, [data, currentUser]);

  const onEdit = () => {
    if (currentUser.id === data.post.author.id) {
      router(`/articles/${id}/edit`);
    }
  };

  function openDeleteConfirmationModal() {
    openModal(<DeleteConfirmationModal confirmButtonAction={onDelete} />);
  }

  const onDelete = () => {
    router(`/articles`);
    if (currentUser.id === data.post.author.id) {
      deletePost({
        variables: {
          where: {
            id: id,
          },
        },
      });
      closeModal();
    }
  };

  let keywordsList = [];

  post.keywords.forEach((keyword) => {
    keywordsList.push(
      <Button
        key={keyword.id}
        className="bg-yellow-button text-sm h-8 w-30 text-black text-center items-center mb-0 py-0 px-2"
      >
        {`${keyword?.name}`}
      </Button>
    );
  });

  return (
    <div>
      <div className="py-10 max-w-xl mx-auto">
        <div className="flex justify-between items-start">
          <div className="flex-1">{/* Empty div for spacing */}</div>
          {accessGranted ? (
            <div className="flex flex-row relative left-28 gap-5">
              <button
                onClick={onEdit}
                className=" underline underline-offset-2 text-black-500"
              >
                Edit
              </button>
              <button
                onClick={openDeleteConfirmationModal}
                className=" underline underline-offset-2 text-red-500"
              >
                Delete
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="mb-4 flex flex-col gap-4 h-full">
          <h2 className="text-3xl Arial-NarrowBold">{post.title}</h2>
          <div className="my-0">{keywordsList}</div>
          <div className="flex gap-8">
            <p className="text-gray">{`${formatDateTime(post.createdAt)}`}</p>
            <p className="text-gray">
              {post.username === "User Deleted"
                ? `User Deleted`
                : `By ${post.username}`}{" "}
            </p>
          </div>
        </div>
        <div className="space-y-2">
          {post.content.split(/(?:\r?\n)+/).map((paragraph, index) => (
            <p key={index} className="text-black-700 text-base ">
              {`${paragraph}\n\n`}
            </p>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 w-full max-w-[989] mx-auto mt-auto p-10">
        <Footer>{/* <Footer.Content></Footer.Content>{" "} */}</Footer>
      </div>
    </div>
  );
};

export default Review;

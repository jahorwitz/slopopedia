import { useMutation, useQuery } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { Form } from "../../../src/components/form";
import { Footer } from "../../components/index.js";
import { CREATE_POST } from "../../graphql/mutations/blog/post.js";
import { GET_BLOG_POST } from "../../graphql/queries/blog/posts.js";
import { CurrentUserContext } from "../../store/current-user-context.js";

export const Article = () => {
  const router = useNavigate();
  const { id } = useParams();
  const [formState, setFormState] = useState({
    title: "",
    content: "",
    keywords: [],
    movies: [],
  });
  const [createPost, { loading, error }] = useMutation(CREATE_POST);
  const { currentUser } = useContext(CurrentUserContext);
  const { data } = useQuery(GET_BLOG_POST, {
    variables: {
      where: {
        id: id,
      },
    },
  });

  useEffect(() => {
    if (id) {
      console.log(data, data.post);
      setFormState({
        title: data.post.title,
        content: data.post.content,
        keywords: [],
        movies: [],
      });
    }
  }, [id]);

  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;

  const notification = () => {
    console.log("notifying");
    const notify = toast.info("Post successful!", {
      theme: "dark",
    });
    if (notify) {
      setTimeout(() => {
        router("/articles");
      }, 3000);
    }
  };

  const onDraft = (e) => {
    e.preventDefault();
    console.log(currentUser);
    createPost({
      variables: {
        data: {
          title: formState.title,
          content: formState.content,
          keywords: {
            create: formState.keywords.map((item) => {
              return { name: item };
            }),
          },
          movies: {
            create: formState.movies.map((item) => {
              return { title: item, description: "placeholder" };
            }),
          },
          author: {
            connect: { username: currentUser.username },
          },
          status: "draft",
        },
      },
    })
      .then(() => notification())
      .catch((err) => {
        console.error(err);
      });
  };

  const onPublish = (e) => {
    e.preventDefault();
    console.log(currentUser);
    createPost({
      variables: {
        data: {
          title: formState.title,
          content: formState.content,
          keywords: {
            create: formState.keywords.map((item) => {
              return { name: item };
            }),
          },
          movies: {
            create: formState.movies.map((item) => {
              return { title: item, description: "placeholder" };
            }),
          },
          author: {
            connect: { username: currentUser.username },
          },
          status: "published",
        },
      },
    })
      .then(() => notification())
      .catch((err) => {
        console.error(err);
      });
  };

  // ^^^
  // not sure if there is a way to turn onDraft and onPublish into
  // one function that takes in a string argument to assign to status

  const checkValidity = (value) => {
    if (!value) {
      return false;
    }
    return true;
  };

  // ^^^
  // this can probably be replaced w/ better validation, for the sake of
  // matching the mock I just made this, I forget if there is a built in
  // validator

  return (
    <>
      <div className="relative flex flex-row justify-center mx-auto -top-5 pt-20">
        <ToastContainer className={"absolute"} />
        <Form className={"w-[700px] ml-[224px] p-5 bg-white"}>
          <Form.TextInput
            className="relative flex justify-center font-bold font-arial flex-col py-3"
            labelText={"Title"}
            value={formState.title}
            onChange={(e) =>
              setFormState({ ...formState, title: e.target.value })
            }
            isValid={checkValidity(formState.title)}
          />
          <Form.TextArea
            labelText={"Body"}
            placeholder={`Body`}
            value={formState.content}
            onChange={(e) =>
              setFormState({ ...formState, content: e.target.value })
            }
          />
          <Form.TextInput
            className=" flex font-bold font-arial flex-col py-3"
            labelText={"Slops"}
            placeholder={"Add topical slops"}
            value={formState.movies.join(", ")}
            onChange={(e) =>
              setFormState({
                ...formState,
                movies: e.target.value.split(",").map((item) => item.trim()),
              })
            }
            isValid={checkValidity(formState.movies.join(", "))}
          />
          <Form.TextInput
            className=" flex font-bold font-arial flex-col py-3"
            labelText={"Keywords"}
            placeholder={"Add topical keywords"}
            value={formState.keywords.join(", ")}
            onChange={(e) =>
              setFormState({
                ...formState,
                keywords: e.target.value.split(",").map((item) => item.trim()),
              })
            }
            isValid={checkValidity(formState.keywords.join(", "))}
          />
        </Form>
        <div className="self-center mt-32 h-[49px] min-w-[224px] md:absolute md:bottom-0 md:left-0 md:right-0 md:top-96 xs:absolute xs:bottom-0 xs:left-0 xs:right-0 xs:top-80">
          <Form onSubmit={onDraft}>
            <Form.Submit
              className="font-bold font-arial bg-white text-lg/4 text-black w-full border border-black py-4 px-4"
              title={"Save to drafts"}
              onSubmit={onDraft}
            />
          </Form>

          <Form onSubmit={onPublish}>
            <Form.Submit
              className="font-bold font-arial bg-yellow-400  text-lg/4 text-black w-full border border-black py-4 px-4"
              title={"Publish! "}
              disabled={false}
            />
          </Form>
        </div>
      </div>
      <div className="w-full max-w-[989] mx-auto p-20">
        <Footer></Footer>
      </div>
    </>
  );
};

export default Article;

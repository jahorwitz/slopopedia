import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { Form } from "../../components/form.jsx";
import { CREATE_POST } from "../../graphql/mutations/blog/post.js";

export const Article = () => {
  const router = useNavigate();
  const [formState, setFormState] = useState({
    title: "",
    content: "",
  });
  const [createPost, { loading, error }] = useMutation(CREATE_POST, {
    variables: {
      title: formState.title,
      content: formState.content,
    },
  });

  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;
  const notification = () => {
    const notify = toast.info("Post successful!", {
      theme: "dark",
    });
    if (notify) {
      setTimeout(() => {
        router("/blog");
      }, 7000);
    }
  };

  const onSubmit = async (e) => {
    // TODO: Render proper document structure.
    e.preventDefault();
    await createPost({
      variables: {
        data: {
          title: formState.title,
          content: { document: { type: "paragraph", text: formState.content } },
        },
      },
    });

    notification();
  };

  return (
    <>
      <ToastContainer />
      <Form className="mx-auto">
        <Form.TextInput
          className="font-normal py-4 px-4 border-solid rounded-none border border-black"
          labelText={"Title"}
          placeholder={"Title"}
          value={formState.title}
          onChange={(e) =>
            setFormState({ ...formState, title: e.target.value })
          }
        />
        <Form.TextArea
          className="w-96"
          labelText={"Body"}
          placeholder={"Body"}
          value={formState.content}
          onChange={(e) =>
            setFormState({ ...formState, content: e.target.value })
          }
        />
        <Form.TextInput
          className="max-w-[714] flex font-bold font-arial flex-col py-3"
          labelText={"Slops"}
          placeholder={"Add topical slops"}
          value={formState.slops}
          onChange={(e) => setFormState({ ...formState, body: e.target.value })}
        />
        <Form.TextInput
          className="max-w-[714] flex font-bold font-arial flex-col py-3"
          labelText={"Keywords"}
          placeholder={"Add topical keywords"}
          value={formState.keywords}
          onChange={(e) => setFormState({ ...formState, body: e.target.value })}
        />
      </Form>
      <div className="relative top-96 right-80 md:absolute md:bottom-0 md:left-0 md:right-0 md:top-96 xs:absolute xs:bottom-0 xs:left-0 xs:right-0 xs:top-80">
        <Form.Submit
          className="font-bold font-arial bg-white text-lg/4 text-black w-full border border-black py-4 px-4"
          title={"Save to drafts"}
          onClick={() => console.log("drafts...")}
        />
        <Form.Submit
          className="font-bold font-arial bg-yellow-400  text-lg/4 text-black w-full border border-black py-4 px-4"
          title={"Publish! "}
          onClick={onSubmit}
        />
      </div>
    </>
  );
};

export default Article;

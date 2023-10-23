import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { Form } from "../../components/form.jsx";

export const Article = () => {
  const router = useNavigate();
  const publish = () => {
    const notify = toast.info("Published article!", {
      theme: "dark",
    });
    if (notify) {
      setTimeout(() => {
        router("/blog");
      }, 7000);
    }
  };

  const drafts = () => {
    const notify = toast("Saved to Drafts!", {
      theme: "dark",
    });

    if (notify) {
      setTimeout(() => {
        router("/draft");
      }, 7000);
    }
  };

  return (
    <>
      <ToastContainer />
      <Form className="mx-auto">
        <Form.TextInput
          className="font-normal py-4 px-4 border-solid rounded-none border border-black"
          labelText={"Title"}
          placeholder={"Title"}
        />
        <Form.TextArea
          className="w-96"
          labelText={"Body"}
          placeholder={"Body"}
        />
        <Form.TextInput
          className="max-w-[714] flex font-bold font-arial flex-col py-3"
          labelText={"Slops"}
          placeholder={"Add topical slops"}
        />
        <Form.TextInput
          className="max-w-[714] flex font-bold font-arial flex-col py-3"
          labelText={"Keywords"}
          placeholder={"Add topical keywords"}
        />
      </Form>
      <div className="relative top-96 right-80 md:absolute md:bottom-0 md:left-0 md:right-0 md:top-96 xs:absolute xs:bottom-0 xs:left-0 xs:right-0 xs:top-80">
        <Form.Submit
          className="font-bold font-arial bg-white text-lg/4 text-black w-full border border-black py-4 px-4"
          title={"Save to drafts"}
          onClick={drafts}
        />
        <Form.Submit
          className="font-bold font-arial bg-yellow-400  text-lg/4 text-black w-full border border-black py-4 px-4"
          title={"Publish! "}
          onClick={publish}
        />
      </div>
    </>
  );
};

export default Article;

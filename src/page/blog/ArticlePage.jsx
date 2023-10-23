import { Form } from "../../components/form.jsx";

export const Article = () => {
  return (
    <>
      <Form className="mx-auto">
        <Form.TextInput
          className="font-normal py-4 px-4 border-solid rounded-none border border-black"
          labelText={"Title"}
          placeholder={"Title"}
        />
        <Form.TextArea labelText={"Body"} placeholder={"Body"} />
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
      <div className="relative top-96 right-80">
        <Form.Submit
          className="font-bold font-arial bg-white text-lg/4 text-black w-full border border-black py-4 px-4"
          title={"Save to drafts"}
        />
        <Form.Submit
          className="font-bold font-arial bg-yellow-400  text-lg/4 text-black w-full border border-black py-4 px-4"
          title={"Publish! "}
        />
      </div>
    </>
  );
};

export default Article;

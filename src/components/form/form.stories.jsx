import { useForm } from "react-hook-form";
import { Form } from "./form";

export default {
  title: "Components/Form",
  component: Form,
};

export const Default = () => {
  const { register, handleSubmit } = useForm();

  return (
    <Form className={"w-full max-w-lg mx-auto p-4 bg-white"}>
      <Form.TextInput id="username" labelText="Title" register={register} />
      <Form.TextArea id="comment" labelText="Description" register={register} />
      <Form.TextNumber id="number" labelText="Number" register={register} />
      <Form.Dropdown id="dropdown" labelText="Dropdown" register={register} />
      <Form.Submit className="w-full" handleSubmit={handleSubmit}>
        Yeah!
      </Form.Submit>
    </Form>
  );
};

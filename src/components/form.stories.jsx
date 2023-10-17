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
      <Form.TextInput
        className=""
        id="username"
        labelText="Title"
        register={register}
      />

      <Form.TextArea
        className=""
        id="comment"
        labelText="Description"
        register={register}
      />

      <Form.TextNumber
        className=""
        id="number"
        labelText="Number"
        register={register}
      />
      <Form.Dropdown
        className=""
        id="dropdown"
        labelText="Dropdown"
        register={register}
      />
      <Form.Submit className="" title="" handleSubmit={handleSubmit} />
    </Form>
  );
};

import { Form } from "./form";

export default {
  title: "Components/Form",
  component: Form,
};

export const Default = () => (
  <Form className={"w-full max-w-lg mx-auto p-4 bg-white"}>
    <Form.TextInput className="" id="username" labelText="Title" />

    <Form.TextArea className="" id="comment" labelText="Description" />

    <Form.TextNumber className="" id="number" labelText="Number" />
    <Form.Dropdown className="" id="dropdown" labelText="Dropdown" />
    <Form.Submit>Yeah!</Form.Submit>
  </Form>
);

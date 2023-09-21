// import { Form } from "./form";

// export default {
//   title: "Components/Form",
//   component: Form,
// };

// const Template = (args) => <Form {...args} />;

// export const TextInput = Template.bind({});
// TextInput.args = {
//   className: "h-20 text-black font-arialRegular rounded-lg",
//   id: "Title",
//   labelText: "Title",
//   placeholder: "Type",
// };

// export const TextArea = Template.bind({});
// TextArea.args = {
//   className: "h-20 text-black font-arialRegular rounded-lg",
//   id: "Title",
//   labelText: "Description",
//   placeholder: "Type",
// };
import { Form } from "./form";

export default {
  title: "Components/Form",
  component: Form,
};

export const Default = () => (
  <Form>
    <Form.TextInput className="" id="username" labelText="Title" />

    <Form.TextArea className="" id="comment" labelText="Description" />

    <Form.TextNumber className="" id="number" labelText="Number" />
    <Form.Dropdown className="" id="dropdown" labelText="Dropdown" />
    <Form.Submit>Yeah!</Form.Submit>
  </Form>
);

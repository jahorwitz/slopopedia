import { Form } from "./form";

export default {
  title: "Components/Form",
  component: Form,
};

const Template = (args) => <Form {...args} />;

export const TextInput = Template.bind({});
TextInput.args = {
  className: "h-20 text-black font-arialRegular rounded-lg",
  id: "Title",
  labelText: "Title",
  placeholder: "Type",
};

export const TextArea = Template.bind({});
TextArea.args = {
  className: "h-20 text-black font-arialRegular rounded-lg",
  id: "Title",
  labelText: "Description",
  placeholder: "Type",
};

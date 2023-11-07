import { Button } from "./Button";

export default {
  title: "Component/Button",
  component: Button,
};

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: "Primary",
  className:
    "bg-yellow-200 h-12 text-black text-center items-center w-80 border py-2 px-4",
  onClick: {
    action: "clicked",
  },
};
export const Secondary = Template.bind({});
Secondary.args = {
  title: "Secondary Button",
  className: "bg-yellow-200 w-96 h-12 text-black w-80 border py-2 px-4",
  onClick: {
    action: "clicked",
  },
};
export const Large = Template.bind({});
Large.args = {
  title: "Large Button",
  className:
    "bg-yellow-200 h-10 text-black text-lg w-36 h-10 p-2.border py-2 px-4 ",
  onClick: {
    action: "clicked",
  },
};
export const Small = Template.bind({});
Small.args = {
  title: "Small Button",
  className: "bg-yellow-200 h-10 text-black text-lg w-36 h-10 py-2",
  onClick: {
    action: "clicked",
  },
};
export const variantLink = Template.bind({});
variantLink.args = {
  title: "Variant Link",
  className: "border-b-2 border-black text-white-400 font-arialRegular",
  onClick: {
    action: "clicked",
  },
};

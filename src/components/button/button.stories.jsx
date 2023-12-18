import { Button } from "./button";

export default {
  title: "Components/Button",
  component: Button,
};

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: "Primary",
  variant: "primary",
  onClick: {
    action: "clicked",
  },
};

export const Disabled = Template.bind({});
Disabled.args = {
  children: "Disabled",
  variant: "primary",
  disabled: true,
  onClick: {
    action: "clicked",
  },
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: "Secondary Button",
  variant: "secondary",
  onClick: {
    action: "clicked",
  },
};

export const OutlineSecondary = Template.bind({});
OutlineSecondary.args = {
  children: "Outline Secondary Button",
  variant: "outline-secondary",
  onClick: {
    action: "clicked",
  },
};

export const OutlineDanger = Template.bind({});
OutlineDanger.args = {
  children: "Outline Danger Button",
  variant: "outline-danger",
  onClick: {
    action: "clicked",
  },
};

export const Danger = Template.bind({});
Danger.args = {
  children: "Danger Button",
  variant: "danger",
  onClick: {
    action: "clicked",
  },
};

export const Large = Template.bind({});
Large.args = {
  children: "Large Button",
  variant: "primary",
  size: "lg",
  onClick: {
    action: "clicked",
  },
};

export const Small = Template.bind({});
Small.args = {
  children: "Small Button",
  variant: "secondary",
  size: "sm",
  onClick: {
    action: "clicked",
  },
};

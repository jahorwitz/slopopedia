import { Modal } from "./modal";

export default {
  title: "Components/Modal",
  component: Modal,
};

export const ExampleModal = (args) => {
  return <Modal {...args}>Modal Content Goes Here</Modal>;
};

ExampleModal.args = {
  title: "Example Modal",
};

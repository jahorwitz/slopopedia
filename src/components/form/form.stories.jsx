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
      <Form.Combobox
        id="combobox"
        labelText="Combobox"
        name="combobox"
        list={[
          { id: 1, name: "Goblin 1" },
          { id: 2, name: "Goblin 2" },
          { id: 3, name: "Goblin 3" },
          { id: 4, name: "Goblin 4" },
          { id: 5, name: "Goblin 5" },
          { id: 6, name: "Goblin 6" },
        ]}
        nameKey="name"
        idKey="id"
        height={120}
      />
      <Form.Submit className="w-full" handleSubmit={handleSubmit}>
        Yeah!
      </Form.Submit>
    </Form>
  );
};

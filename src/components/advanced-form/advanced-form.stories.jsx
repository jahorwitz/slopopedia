import { AdvancedForm } from "./advanced-form";

export default {
  title: "Components/AdvancedForm",
  component: AdvancedForm,
};

export const Default = () => {
  return (
    <AdvancedForm className={"w-full max-w-lg mx-auto p-4 bg-white"}>
      <AdvancedForm.TextInput
        id="username"
        labelText="Title"
      ></AdvancedForm.TextInput>
      <AdvancedForm.TextInput
        id="password"
        labelText="Password"
        password={true}
      ></AdvancedForm.TextInput>
      <AdvancedForm.DropzoneField
        id="dropzone"
        name="dropzone"
        labelText="Dropzone"
      />
      <AdvancedForm.Slider id="slider" labelText="Slider" />
      <AdvancedForm.Dropdown id="dropdown" labelText="Dropdown" />
      <AdvancedForm.checkbox id="checkbox" labelText="Checkbox" />
      <AdvancedForm.radio id="radio" labelText="Radio" />
    </AdvancedForm>
  );
};

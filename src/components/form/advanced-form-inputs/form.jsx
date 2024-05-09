/**
 * Demo for advanced form components
 */

import { useForm } from "react-hook-form";
import { Button } from "../../button/button";
import TextInput from "./textInput";

function TestForm() {
  const form = useForm();

  const { register, handleSubmit } = form;

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={"grid grid-cols-1 max-w-md mx-auto gap-5 mt-5"}
    >
      <TextInput {...register("Name")} />
      <TextInput type="password" {...register("Password")} />
      <Button type="submit">Submit Me</Button>
    </form>
  );
}

export default TestForm;

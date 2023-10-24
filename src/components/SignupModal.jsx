import { useForm } from "react-hook-form";
import { Form } from "./form";
import { Modal } from "./Modal";

export const SignupModal = ({ closeModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(`data: ${data}`);
  console.log(errors);

  return (
    <Modal closeModal={closeModal} title="HEY YOU GOBLIN">
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className={"w-full max-w-sm mx-auto p-1.5 bg-white"}
      >
        <Form.TextInput
          register={register("gobbId", { required: "Gobb ID is required" })}
          labelText={"Gobb ID"}
        />
        {errors.gobbId && (
          <span className={"text-left text-error-message"}>
            {errors.gobbId.message}
          </span>
        )}
        <Form.TextInput
          register={register("email", {
            required: "Email is required",
          })}
          labelText={"Email"}
        />
        {errors.email && (
          <span className={"text-left text-error-message"}>
            {errors.email.message}
          </span>
        )}
        <Form.TextInput
          register={register("password", {
            required: "Password is required",
          })}
          labelText={"Password"}
        />
        {errors.password && (
          <span className={"text-left text-error-message"}>
            {errors.password.message}
          </span>
        )}
        <Form.TextInput
          register={register("confirmPassword", {
            required: "You must confirm the password",
          })}
          labelText={"Confirm password"}
        />
        {errors.confirmPassword && (
          <span className={"text-left text-error-message"}>
            {errors.confirmPassword.message}
          </span>
        )}
        <Form.Submit title={"Get to Sloppin'"} />
      </Form>
      <p className="font-arial text-lg/4 pt-0.5 pb-9 text-center">
        Already have an account? <button className="underline">Login!</button>
      </p>
    </Modal>
  );
};

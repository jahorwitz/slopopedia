import { useForm } from "react-hook-form";
import { Form } from "./form";
import { Modal } from "./Modal";

export const SignupModal = ({ closeModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm({
    defaultValues: {
      gobbId: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => console.log(`data: ${data}`);

  return (
    <Modal closeModal={closeModal} title="HEY YOU GOBLIN">
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className={"w-full max-w-sm mx-auto p-1.5 bg-white"}
      >
        <Form.TextInput
          register={register("gobbId", {
            required: "Gobb ID is required",
            pattern: { value: /^\S/, message: "Must not start with a space" },
          })}
          labelText={"Gobb ID"}
          onChange={(evt) => {
            setValue("gobbId", evt.target.value, { shouldValidate: true });
          }}
          className={errors.gobbId ? "border-error-message" : ""}
        />
        {errors.gobbId && <Form.Feedback message={errors.gobbId.message} />}
        <Form.TextInput
          register={register("email", {
            required: "Email is required",
            pattern: {
              value: /[\w\-\.]+@([\w\-]+\.)+[\w\-]{2,4}/,
              message: "Invalid Email",
            },
          })}
          labelText={"Email"}
          onChange={(evt) => {
            setValue("email", evt.target.value, {
              shouldValidate: true,
            });
          }}
          className={errors.email ? "border-error-message" : ""}
        />
        {errors.email && <Form.Feedback message={errors.email.message} />}
        <Form.TextInput
          register={register("password", {
            required: "Password is required",
          })}
          labelText={"Password"}
          onChange={(evt) => {
            setValue("password", evt.target.value, { shouldValidate: true });
          }}
          className={errors.password ? "border-error-message" : ""}
        />
        {errors.password && <Form.Feedback message={errors.password.message} />}
        <Form.TextInput
          register={register("confirmPassword", {
            required: "You must confirm the password",
            validate: (value, formValues) =>
              value === formValues.password || "Passwords do not match",
          })}
          labelText={"Confirm password"}
          onChange={(evt) => {
            setValue("confirmPassword", evt.target.value, {
              shouldValidate: true,
            });
          }}
          className={errors.confirmPassword ? "border-error-message" : ""}
        />
        {errors.confirmPassword && (
          <Form.Feedback message={errors.confirmPassword.message} />
        )}
        <Form.Submit
          className={isValid ? "" : "bg-gray-button"}
          title={"Get to Sloppin'"}
        />
      </Form>
      <p className="font-arial text-lg/4 pt-0.5 pb-9 text-center">
        Already have an account? <button className="underline">Login!</button>
      </p>
    </Modal>
  );
};

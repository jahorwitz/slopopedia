import { useMutation } from "@apollo/client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { CREATE_USER } from "../graphql/create-user";
import { useModals } from "../store/useModals";
import { Form, LoginModal, Modal } from "./index";

export const SignupModal = ({ onClose }) => {
  const [createUser, { data, loading, error }] = useMutation(CREATE_USER);
  const { registerModal, openModal, closeModal } = useModals();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = () => {
    const { username, email, password } = getValues();
    createUser({
      variables: { data: { username, email, password } },
    });
  };

  useEffect(() => {
    registerModal("signup", <LoginModal onClose={() => onclose} />);
  });

  if (data) {
    return (
      <Modal closeModal={closeModal} title="HEY YOU GOBLIN">
        <div className="pt-28">
          <p className="font-arial text-lg/4 pt-0.5 pb-40 text-center">
            Awesome! You have successfully created an account.{" "}
            <button
              type="button"
              className="underline"
              onClick={() => openModal("signin")}
              onClose={() => onClose}
            >
              Login!
            </button>
          </p>
        </div>
      </Modal>
    );
  }

  return (
    <Modal closeModal={closeModal} title="HEY YOU GOBLIN">
      <div className="text-center">
        {error && <Form.Feedback message={error.message} />}
      </div>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className={"w-full max-w-sm mx-auto p-1.5 bg-white"}
      >
        <Form.TextInput
          register={register("username", {
            required: "Gobb ID is required",
            pattern: { value: /^\S/, message: "Must not start with a space" },
          })}
          labelText={"Gobb ID"}
          onChange={(evt) => {
            setValue("username", evt.target.value, { shouldValidate: true });
          }}
          isValid={!errors.username}
        />
        {errors.username && <Form.Feedback message={errors.username.message} />}
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
          isValid={!errors.email}
        />
        {errors.email && <Form.Feedback message={errors.email.message} />}
        <Form.TextInput
          register={register("password", {
            required: "Password is required",
            minLength: {
              value: 10,
              message: "Passwords must be at least 10 characters",
            },
          })}
          labelText={"Password"}
          onChange={(evt) => {
            setValue("password", evt.target.value, { shouldValidate: true });
          }}
          isValid={!errors.password}
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
          isValid={!errors.confirmPassword}
        />
        {errors.confirmPassword && (
          <Form.Feedback message={errors.confirmPassword.message} />
        )}
        <Form.Submit disabled={!isValid} title={"Get to Sloppin'"} />
      </Form>
      <p className="font-arial text-lg/4 pt-0.5 pb-9 text-center">
        Already have an account?{" "}
        <button
          type="button"
          className="underline"
          onClick={() => openModal("signin")}
          onClose={() => onClose}
        >
          Login!
        </button>
      </p>
    </Modal>
  );
};

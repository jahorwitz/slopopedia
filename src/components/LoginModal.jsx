import { useMutation } from "@apollo/client";
import { Popover } from "@headlessui/react";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { SIGNIN } from "../graphql/signin-users";
import checkMark from "../images/check-mark-dark.svg";
import { CurrentUserContext } from "../store/CurrentUserContext";
import { useModals } from "../store/useModals";
import { Form, Modal, SignupModal } from "./index";
// import { Fragment } from "react";

export function LoginModal({ onClose }) {
  const [authenticateUserWithPassword, { username, password, error }] =
    useMutation(SIGNIN);
  const { setCurrentUser } = useContext(CurrentUserContext);

  const { registerModal, openModal, closeModal } = useModals();

  if (error) console.error(error);

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      gobbId: "",
      password: "",
    },
  });

  const adminInfo = {
    name: "Contact",
    description: "Contact an admin to reset your password",
  };

  const onSubmit = () => {
    if (username !== "" || password !== "") {
      const { gobbId, password } = getValues();
      authenticateUserWithPassword({
        variables: { username: gobbId, password: password },
      }).then(({ data }) => {
        const typename = data.authenticateUserWithPassword.__typename;
        if (typename === "UserAuthenticationWithPasswordSuccess") {
          const userData = data.authenticateUserWithPassword.item;
          const sessionToken = data.authenticateUserWithPassword.sessionToken;
          localStorage.setItem("jwt", sessionToken);
          setCurrentUser(userData);
          closeModal("signin");
        } else if (typename === "UserAuthenticationWithPasswordFailure") {
          console.log("Something went wrong");
        }
      });
    }
  };

  useEffect(() => {
    registerModal("signup", <SignupModal onClose={() => onClose} />);
  });

  return (
    <Modal title="OH HEY GOBLIN">
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className={"flex flex-col items-center p-6"}
      >
        <div className="flex flex-col">
          <Form.TextInput
            register={register("gobbId", {
              required: true,
              pattern: { value: /^\S/, message: "Must not start with a space" },
            })}
            id={"gobb-id"}
            labelText={"Gobb ID"}
            isValid={!errors.gobbId}
            className={`text-start w-[373px]`}
            onChange={(evt) => {
              setValue("gobbId", evt.target.value, { shouldValidate: true });
            }}
          />
          <Form.TextInput
            register={register("password", {
              required: true,
            })}
            id={"password"}
            labelText={"Password"}
            isValid={!errors.password}
            className={`text-start w-[373px]`}
            onChange={(evt) => {
              setValue("password", evt.target.value, { shouldValidate: true });
            }}
          />
        </div>
        <div className="flex ml-auto mr-auto w-[373px] justify-between">
          <div className="flex">
            {/* Specific design for checkbox including checkMark */}
            {/* Logic for remembering user */}
            <input
              type="checkbox"
              className={`w-[24px] h-[24px] mr-[16px] checked:bg-${checkMark}`}
            />
            <h3 className="font-arialRegular text-lg">Remember Me</h3>
          </div>
          {/* Popover to information about who to contact if password forgotten */}
          <Popover className="">
            <button
              type="button"
              className="font-arialRegular text-lg underline"
            >
              Forgot Password?
            </button>
          </Popover>
        </div>
        <div className="flex flex-col items-center">
          <Form.Submit
            title={"Get to Sloppin'"}
            className="w-[373px] h-[49px]"
            disabled={!isValid}
          />
          {(errors.gobbId || errors.password) && (
            <Form.Feedback
              message={"Incorrect Username or Password"}
              className="mb-5"
            />
          )}
          <h3 className="font-arialRegular text-lg mt-5 mb-10">
            Don't have an account? {""}
            <button
              type="button"
              className="underline"
              onClick={() => openModal("signup")}
              onClose={() => onClose}
            >
              Sign Up!
            </button>
            {/* Connects to sign up modal */}
          </h3>
        </div>
      </Form>
    </Modal>
  );
}

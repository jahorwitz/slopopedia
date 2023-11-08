import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { SIGNIN } from "../graphql/signin-users";
import checkMark from "../images/check-mark-dark.svg";
import { useModals } from "../store/useModals";
import { Form, Modal } from "./index";

export function LoginModal({ onClose }) {
  const [authenticateUserWithPassword, { username, password, error }] =
    useMutation(SIGNIN);

  const { registerModal, openModal, closeModal } = useModals();

  if (error) console.error(error);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      gobbId: "",
      password: "",
    },
  });

  const onSubmit = () => {
    if (username !== "" || password !== "") {
      const { gobbId, password } = getValues();
      authenticateUserWithPassword({
        variables: { username: gobbId, password: password },
      }).then(({ data }) => {
        const typename = data.authenticateUserWithPassword.__typename;
        if (typename === "UserAuthenticationWithPasswordSuccess") {
          const sessionToken = data.authenticateUserWithPassword.sessionToken;
          localStorage.setItem("jwt", sessionToken);
          closeModal("signin");
        } else if (typename === "UserAuthenticationWithPasswordFailure") {
          console.log("Something went wrong");
        }
      });
    }
  };

  // useEffect(() => {
  //   registerModal("signup", <SignupModal onClose={() => onClose} />);
  // });

  return (
    <Modal title="OH HEY GOBLIN">
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className={"flex flex-col items-center"}
      >
        <div className="flex flex-col">
          <Form.TextInput
            register={register("gobbId", {
              required: true,
              pattern: { value: /^\S/, message: "Must not start with a space" },
            })}
            id={"gobb-id"}
            labelText={"Gobb ID"}
            className={`text-start w-[373px] ${
              errors.gobbId
                ? "border-[#FF4040] focus:outline-[#FF4040]"
                : "border-black focus:outline-black"
            }`}
            onChange={(evt) => {
              setValue("gobbId", evt.target.value, { shouldValidate: true });
            }}
          />
          {errors.gobbId && <Form.Feedback message={"Incorrect Username"} />}
          <Form.TextInput
            register={register("password", {
              required: true,
            })}
            id={"password"}
            labelText={"Password"}
            className={`text-start w-[373px] ${
              errors.password
                ? "border-[#FF4040] focus:outline-[#FF4040]"
                : "border-black focus:outline-black"
            }`}
            onChange={(evt) => {
              setValue("password", evt.target.value, { shouldValidate: true });
            }}
          />
          {errors.password && <Form.Feedback message={"Incorrect Password"} />}
        </div>
        <div className="flex ml-auto mr-auto w-[373px] mb-[40px] justify-between">
          <div className="flex">
            {/* Specific design for checkbox including checkMark */}
            {/* Logic for remembering user */}
            <input
              type="checkbox"
              className={`w-[24px] h-[24px] mr-[16px] checked:bg-${checkMark}`}
            />
            <h3 className="font-arialRegular text-lg">Remember Me</h3>
          </div>
          {/* Link to forgot password modal(?) */}
          <button type="button" className="font-arialRegular text-lg underline">
            Forgot Password?
          </button>
        </div>
        <div className="flex flex-col items-center">
          <Form.Submit
            title={"Get to Sloppin'"}
            className="w-[373px] h-[49px]"
          />
          {(errors.gobbId || errors.password) && (
            <Form.Feedback
              message={"Incorrect Username or Password"}
              className="mt-[20px]"
            />
          )}
          <h3 className="font-arialRegular text-lg mb-[40px] mt-[40px]">
            Don't have an account? {""}
            <button
              type="button"
              className="underline"
              // onClick={() => openModal("signup")}
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

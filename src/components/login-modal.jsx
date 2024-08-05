import { useMutation } from "@apollo/client";
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { SIGNIN } from "../graphql/signin-users";
import { useClient, useCurrentUser, useModals } from "../hooks";
import { Form, Modal, SignupModal } from "./index";

export function LoginModal({ onClose }) {
  const [authenticateUserWithPassword] = useMutation(SIGNIN);
  const { setCurrentUser, setIsLoggedIn } = useCurrentUser();
  const { openModal, closeModal } = useModals();
  const { setToken } = useClient();

  function openSignUpModal() {
    openModal(<SignupModal onClose={closeModal} />);
  }

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
    setValue,
    getValues,
    setError,
  } = useForm({
    defaultValues: {
      gobbId: "",
      password: "",
    },
  });

  const onSubmit = async () => {
    const { gobbId, password } = getValues();
    try {
      const { data } = await authenticateUserWithPassword({
        variables: { username: gobbId, password },
      });

      const typename = data.authenticateUserWithPassword.__typename;
      if (typename === "UserAuthenticationWithPasswordSuccess") {
        const userData = data.authenticateUserWithPassword.item;
        const sessionToken = data.authenticateUserWithPassword.sessionToken;
        localStorage.setItem("jwt", sessionToken); // Consider using httpOnly cookies for security
        setToken(sessionToken);
        setCurrentUser(userData);
        setIsLoggedIn(true);
        closeModal();
      } else if (typename === "UserAuthenticationWithPasswordFailure") {
        console.log("Error with signin");
        setError("gobbId", { message: "Incorrect Username or Password" });
        setError("password", { message: "Incorrect Username or Password" });
      }
    } catch (error) {
      console.error("Network error or GraphQL error", error);
    }
  };

  return (
    <Modal title="OH HEY GOBLIN">
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm mx-auto p-1.5 bg-background xs:px-5"
      >
        <div className="flex flex-col">
          <Form.TextInput
            register={register("gobbId", {
              required: "Gobb ID is required",
              pattern: { value: /^\S/, message: "Must not start with a space" },
            })}
            id="gobb-id"
            labelText="Gobb ID"
            isValid={!errors.gobbId}
            onChange={(evt) =>
              setValue("gobbId", evt.target.value, { shouldValidate: true })
            }
          />
          <Form.TextInput
            register={register("password", {
              required: "Password is required",
            })}
            id="password"
            labelText="Password"
            isValid={!errors.password}
            type="password"
            onChange={(evt) =>
              setValue("password", evt.target.value, { shouldValidate: true })
            }
          />
        </div>
        <div className="flex justify-between xs:flex xs:flex-col xs:items-center">
          <div className="flex items-center">
            <input
              type="checkbox"
              className="w-6 h-6 mr-3 checked:bg-checkMark"
            />
            <h3 className="font-arialRegular text-lg">Remember Me</h3>
          </div>
          <Popover className="relative">
            {({ open }) => (
              <>
                <Popover.Button
                  type="button"
                  className={`font-arialRegular text-lg underline ${
                    open ? "text-grey" : "text-black"
                  }`}
                >
                  Forgot Password?
                </Popover.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                    <div className="overflow-hidden bg-white rounded-lg shadow-lg ring-1 ring-black/5 border">
                      <p className="p-4 font-arialRegular text-md text-center xs:text-sm">
                        Please contact admin to reset password
                      </p>
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
        </div>
        <Form.Submit
          title="Get to Sloppin'"
          className="w-full mt-4"
          disabled={!isValid}
        />
        <div className="flex flex-col items-center">
          {(errors.gobbId || errors.password) && (
            <Form.Feedback
              message={errors.gobbId?.message || errors.password?.message}
              className="font-arialRegular text-lg mt-4"
            />
          )}
          <h3 className="font-arialRegular text-lg mt-5 mb-10">
            Don't have an account?{" "}
            <button
              type="button"
              className="underline"
              onClick={openSignUpModal}
            >
              Sign Up!
            </button>
          </h3>
        </div>
      </Form>
    </Modal>
  );
}

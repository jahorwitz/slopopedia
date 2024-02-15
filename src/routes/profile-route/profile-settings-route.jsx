import { useMutation, useQuery } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMediaQuery } from "react-responsive";
import { DeleteUserModal } from "../../components/delete-user-modal";
import { Footer, Form, Header } from "../../components/index";
import { GET_USER, GET_USERS, UPDATE_USER } from "../../graphql/";
import { useModals } from "../../store";
import { CurrentUserContext } from "../../store/current-user-context";
import { ProfileHorizontalMenu, ProfileSidebar } from "./index";

export const ProfileSettingsRoute = () => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const userId = currentUser.id;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const { registerModal, openModal, closeModal } = useModals();

  const prefilledInputs = {
    username: currentUser?.username,
    email: currentUser?.email,
  };

  const userQuery = useQuery(GET_USER, {
    variables: {
      where: {
        id: userId,
      },
    },
  });

  const usersQuery = useQuery(GET_USERS, { variables: { where: {} } });

  const [updateUser, { data, loading, error }] = useMutation(UPDATE_USER, {
    refetchQueries: [GET_USER],
  });

  // - - - - - - - - - - USE EFFECT - - - - - - - - - -

  useEffect(() => {
    //obtaining values
    setUsername(currentUser?.username);
    setEmail(currentUser.email);
  }, []);

  useEffect(() => {
    registerModal("deleteUser", <DeleteUserModal onClose={closeModal} />);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      //username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = () => {
    //loading should be true
    //get values from form
    const { username, email, password } = getValues();
    //console.log({ username, email, password });
    //make sure that new username is unique
    //const usersQuery = useQuery(GET_USERS, { variables: { where: {} } });
    //usersQuery.map((username) => {
    //  console.log(username);
    //});

    updateUser({
      variables: {
        where: { id: userId },
        data: { username, email, password },
      },
    })
      .then((res) => {
        console.log(res);
        //form data is not currently refreshing after successful update
        //setUsername(res.data.updateUser.username);
        //setEmail(res.data.updateUser.email);
        setValue("username", username);
        setValue("email", email);
        setValue("password", "password has been reset");
        //loading(false);
        //probably need to change button text to "Changes Saved"?
        //push new Username to header
      })
      .catch(error);
  };

  const isDesktopSize = useMediaQuery({
    query: "(min-width: 1170px)",
  });

  return (
    <div className="max-w-[1440px] mx-auto">
      <Header>
        <Header.Logo />
        <Header.NavLinks />
        <Header.Profile />
      </Header>

      <section className="flex flex-colmax-w-[1440px] h-[900px] bg-gray-background">
        {isDesktopSize ? <ProfileSidebar /> : <ProfileHorizontalMenu />}

        <section className="mt-9">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.TextInput
              register={register("username", {
                required: "Nickname is required",
                pattern: {
                  value: /^\S/,
                  message: "Must not start with a space",
                },
              })}
              labelText={"Nickname"}
              onChange={(evt) => {
                setValue("username", evt.target.value, {
                  shouldValidate: true,
                });
              }}
              isValid={!errors.username}
              placeholder="Type here"
              prefilledInputs={prefilledInputs.username}
            />

            {errors.username && (
              <Form.Feedback message={errors.username.message} />
            )}

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
              placeholder="Type here"
              prefilledInputs={prefilledInputs.email}
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
                setValue("password", evt.target.value, {
                  shouldValidate: true,
                });
              }}
              isValid={!errors.password}
            />

            {errors.password && (
              <Form.Feedback message={errors.password.message} />
            )}

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

            <Form.Submit
              className="w-[373px]"
              disabled={!isValid}
              title={"Save"}
            />
          </Form>

          <button
            type="button"
            className="bg-transparent text-danger font-bold text-lg mt-10"
            onClick={() => {
              openModal("deleteUser");
            }}
          >
            Delete Account
          </button>
        </section>
      </section>

      <footer className="mt-5">
        <Footer></Footer>
      </footer>
    </div>
  );
};

//delete button to-do

//when clicked, opens modal that says "are you sure?
//This action cannot be undone."
// 2 options on this modal "Yes, I'm out." or "No, I don't wanna go!"

//if they click yes
// - - - send api call to delete
// - - - delete token - do I need to also Logout?
// - - - set loading page until successful response is received from server
// - - - redirect back to home page

//the click no
// - - - close modal

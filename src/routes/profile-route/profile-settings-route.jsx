import { useMutation, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMediaQuery } from "react-responsive";
import {
  DeleteConfirmationModal,
  Footer,
  Form,
  Header,
} from "../../components/index";
import { DELETE_USER, GET_USER, GET_USERS, UPDATE_USER } from "../../graphql/";
import { useCurrentUser, useModals } from "../../hooks";
import { ProfileHorizontalMenu, ProfileSidebar } from "./index";

export const ProfileSettingsRoute = () => {
  //this form eventually needs to handle the scenario where
  //the user selects a username that already exists in database.
  const { currentUser, setCurrentUser } = useCurrentUser();
  //const { userUsername, setUserUsername } = useState("");
  //const { userEmail, setUserEmail } = useState("");
  const userId = currentUser.id;

  const { registerModal, openModal, closeModal } = useModals();

  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useQuery(GET_USER, {
    variables: {
      where: {
        id: userId,
      },
    },
  });

  const usersQuery = useQuery(GET_USERS, {
    variables: { where: {} },
  });

  const [deleteUser] = useMutation(DELETE_USER);

  const [updateUser, { data, loading, error }] = useMutation(UPDATE_USER, {
    refetchQueries: [GET_USER],
  });

  const handleDeleteUserSubmit = () => {
    deleteUser({
      variables: {
        where: { id: userId },
      },
    })
      .then(({ data }) => {
        //delete stored token
        localStorage.removeItem("jwt");
        //close modal
        closeModal("deleteUser");
        //redirect to home page
        window.location.reload();
        // - - - remove "loading"
      })
      //.catch
      .catch(error);
    //.finally?
  };

  // - - - - - - - - - - USE FORM - - - - - - - - - -
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting, isSubmitSuccessful },
    setValue,
    getValues,
    control,
    reset,
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  // - - - - - - - - - - USE EFFECT - - - - - - - - - -
  useEffect(() => {
    registerModal(
      "deleteUser",
      <DeleteConfirmationModal
        onClose={closeModal}
        confirmButtonAction={handleDeleteUserSubmit}
      />
    );
  }, []);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  useEffect(
    () => {
      if (!userLoading) {
        console.log(userData.user.username);
        console.log(userData.user.email);
        setValue("username", userData.user.username);
        setValue("username", userData.user.email);
      }
    },
    [GET_USER],
    userData,
    userLoading
  );

  // useEffect(() => {
  //   const subscription = watch((value) => {
  //     const changedUsername = {
  //       username: value.username,
  //     };
  //     const existingUsernames = () => {
  //       GET_USERS({
  //         variables: {
  //           where: {},
  //           data: {
  //             username,
  //           },
  //         },
  //       }).then((data) => {
  //         console.log(data.usernames);
  //       });
  //     };
  //     console.log(existingUsernames);
  //     console.log(changedUsername);
  //   });
  //   return () => subscription.unsubscribe;
  // }, [watch]);

  //const watchForm = watch();
  //console.log(watchForm);

  const onSubmit = () => {
    //loading should be true
    //get values from form
    const { username, email, password } = getValues();
    if (password === "") {
      //const usersQuery = useQuery(GET_USERS, { variables: { where: {} } });
      //usersQuery.map((usernames) => {
      //
      //});
      updateUser({
        variables: {
          where: { id: userId },
          data: { username, email },
        },
      })
        .then((res) => {
          console.log(res.data);
          setValue("username", res.data.username);
          setValue("email", res.data.email);
          //setValue("password", "");
          //loading(false);
          //probably need to change button text to "Changes Saved" after submit?
        })
        .catch(error);
    } else {
      updateUser({
        variables: {
          where: { id: userId },
          data: { username, email, password },
        },
      })
        .then((res) => {
          console.log(res.data);
          setValue("username", res.data.username);
          setValue("email", res.data.email);
          setValue("password", "");
          //loading(false);
          //probably need to change button text to "Changes Saved" after submit?
        })
        .catch(error);
    }
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
        {!userLoading.loading && (
          <section className="mt-9">
            <Form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Form.TextInput
                {...register("username", {
                  required: "Nickname is required",
                  pattern: {
                    value: /^\S/,
                    message: "Must not start with a space",
                  },
                })}
                autocomplete="username"
                labelText={"Nickname"}
                onChange={(evt) => {
                  setValue("username", evt.target.value, {
                    shouldValidate: true,
                  });
                }}
                isValid={!errors.username}
                prefilledInputs={currentUser?.username}
              />

              {errors.username && (
                <Form.Feedback message={errors.username?.message} />
              )}

              <Form.TextInput
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /[\w\-\.]+@([\w\-]+\.)+[\w\-]{2,4}/,
                    message: "Invalid Email",
                  },
                })}
                autocomplete="username"
                labelText={"Email"}
                onChange={(evt) => {
                  setValue("email", evt.target.value, {
                    shouldValidate: true,
                  });
                }}
                isValid={!errors.email}
                prefilledInputs={currentUser?.email}
              />

              {errors.email && (
                <Form.Feedback message={errors.email?.message} />
              )}

              <Form.TextInput
                {...register("password", {
                  //required: "Password is required",
                  minLength: {
                    value: 10,
                    message: "Passwords must be at least 10 characters",
                  },
                })}
                autocomplete="new-password"
                labelText={"New Password"}
                type="password"
                onChange={(evt) => {
                  setValue("password", evt.target.value, {
                    shouldValidate: true,
                  });
                }}
                isValid={!errors.password}
              />

              {errors.password && (
                <Form.Feedback message={errors.password?.message} />
              )}

              <Form.TextInput
                register={register("confirmPassword", {
                  //required: "You must confirm the password",
                  validate: (value, formValues) =>
                    value !== "" ||
                    value === formValues.password ||
                    "Passwords do not match",
                })}
                autocomplete="confirm-new-password"
                labelText={"Confirm New Password"}
                type="password"
                onChange={(evt) => {
                  setValue("confirmPassword", evt.target.value, {
                    shouldValidate: true,
                  });
                }}
                isValid={!errors.confirmPassword}
              />

              {errors.confirmPassword && (
                <Form.Feedback message={errors.confirmPassword?.message} />
              )}

              <Form.Submit
                className="w-[373px]"
                title={"Save"}
                //disabled={!isValid}
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
        )}
      </section>

      <footer className="mt-5">
        <Footer></Footer>
      </footer>
    </div>
  );
};

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
  const userId = currentUser.id;

  const { openModal, closeModal } = useModals();

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
        localStorage.removeItem("jwt");
        closeModal("deleteUser");
        window.location.reload();
      })
      .catch(error);
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

  function openDeleteConfirmationModal(closeModal, handleDeleteUserSubmit) {
    openModal(
      <DeleteConfirmationModal
        onClose={closeModal}
        confirmButtonAction={handleDeleteUserSubmit}
      />
    );
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  useEffect(() => {
    if (userData?.user) {
      setValue("username", userData.user.username);
      setValue("email", userData.user.email);
    }
  }, [userData]);

  const onSubmit = () => {
    const { username, email, password } = getValues();
    if (password === "") {
      updateUser({
        variables: {
          where: { id: userId },
          data: { username, email },
        },
      })
        .then((res) => {
          setValue("username", res.data.username);
          setValue("email", res.data.email);
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
          setValue("username", res.data.username);
          setValue("email", res.data.email);
          setValue("password", "");
        })
        .catch(error);
    }
  };

  const isDesktopSize = useMediaQuery({
    query: "(min-width: 1170px)",
  });

  return (
    <div className="mx-auto">
      <Header>
        <Header.Logo />
        <Header.NavLinks />
        <Header.Profile />
      </Header>

      <section className="flex flex-colmax-w-[1440px] h-[900px] bg-gray-background">
        {isDesktopSize ? <ProfileSidebar /> : <ProfileHorizontalMenu />}
        {!userLoading.loading && (
          <section className="mt-9">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.TextInput
                id="username"
                labelText={"Nickname"}
                register={register("username", {
                  required: "Nickname is required",
                  pattern: {
                    value: /^\S/,
                    message: "Must not start with a space",
                  },
                })}
                autoComplete="username" //required per console error from React Hook Form
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
                labelText={"Email"}
                register={register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /[\w\-\.]+@([\w\-]+\.)+[\w\-]{2,4}/,
                    message: "Invalid Email",
                  },
                })}
                autoComplete="username" //required per console error from React Hook Form
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
                labelText={"New Password"}
                register={register("password", {
                  //required: "Password is required",
                  minLength: {
                    value: 10,
                    message: "Passwords must be at least 10 characters",
                  },
                })}
                autoComplete="new-password" //required per console error from React Hook Form
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
                labelText={"Confirm New Password"}
                register={register("confirmPassword", {
                  //required: "You must confirm the password",
                  validate: (value, formValues) =>
                    value !== "" ||
                    value === formValues.password ||
                    "Passwords do not match",
                })}
                autoComplete="confirm-new-password" //required per console error from React Hook Form
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

              <Form.Submit className="w-[373px]" title={"Save"} />
            </Form>
            <button
              type="button"
              className="bg-transparent text-danger font-bold text-lg mt-10"
              onClick={() => {
                openDeleteConfirmationModal(closeModal, handleDeleteUserSubmit);
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

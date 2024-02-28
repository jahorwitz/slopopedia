import { useMutation, useQuery } from "@apollo/client";
import { DevTool } from "@hookform/devtools";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMediaQuery } from "react-responsive";
import { GET_USERS } from "../../graphql/";

//import { DeleteUserModal } from "../../components/delete-user-modal";
import {
  DeleteConfirmationModal,
  Footer,
  Form,
  Header,
} from "../../components/index";
import { DELETE_USER, GET_USER, UPDATE_USER } from "../../graphql/";
import { useModals } from "../../store";
import { CurrentUserContext } from "../../store/current-user-context";
import { ProfileHorizontalMenu, ProfileSidebar } from "./index";

export const ProfileSettingsRoute = () => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const userId = currentUser.id;
  const { registerModal, openModal, closeModal } = useModals();
  const userQuery = useQuery(GET_USER, {
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
  const prefilledInputs = {
    username: currentUser?.username,
    email: currentUser?.email,
    password: "**********",
  };

  const [updateUser, { data, loading, error }] = useMutation(UPDATE_USER, {
    refetchQueries: [GET_USER],
  });

  const handleDeleteUserSubmit = () => {
    //loading visible
    //call deleteUser(userID)
    deleteUser({
      variables: {
        where: { id: userId },
      },
    })
      //.then(res)
      .then(({ data }) => {
        //console.log(data);
        // - - - delete stored token
        localStorage.removeItem("jwt");
        // - - - close modal
        closeModal("deleteUser");
        window.location.reload();
        // - - - remove "loading"
        // - - - redirect to home page
        // - - - or run "logout" when that is setup
      })
      //.catch
      .catch(error);
    //.finally?
  };

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

  // - - - - - - - - - - USE FORM - - - - - - - - - -
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty, dirtyFields },
    setValue,
    getValues,
    control,
    //watch,
    //onChange,
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

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

  //console.log({ dirtyFields, isDirty });

  const onSubmit = () => {
    //loading should be true
    //get values from form
    const { username, email, password } = getValues();
    //make sure that new username is unique
    //const usersQuery = useQuery(GET_USERS, { variables: { where: {} } });
    //usersQuery.map((usernames) => {
    //
    //});
    updateUser({
      variables: {
        where: { id: userId },
        data: { username, email, password },
      },
    })
      .then((res) => {
        console.log(res);
        setValue("username", res.username);
        setValue("email", res.email);
        setValue("password", "");
        //form data is not currently refreshing after successful update
        //this is because "value" is not being tracked by React Hook Form
        //loading(false);
        //probably need to change button text to "Changes Saved" after submit?
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
          <Form
            onSubmit={handleSubmit(onSubmit)}
            //onChange={onChange}
            //noValidate
          >
            <Form.TextInput
              {...register("username", {
                //required: "Nickname is required",
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
              <Form.Feedback message={errors.username?.message} />
            )}

            <Form.TextInput
              {...register("email", {
                //required: "Email is required",
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

            {errors.email && <Form.Feedback message={errors.email?.message} />}

            <Form.TextInput
              {...register("password", {
                //required: "Password is required",
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
              prefilledInputs={prefilledInputs.password}
            />

            {errors.password && (
              <Form.Feedback message={errors.password?.message} />
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
              prefilledInputs={prefilledInputs.password}
            />

            {errors.confirmPassword && (
              <Form.Feedback message={errors.confirmPassword?.message} />
            )}

            <Form.Submit
              className="w-[373px]"
              //disabled={!isValid}
              title={"Save"}
            />
          </Form>
          <DevTool control={control}></DevTool>
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

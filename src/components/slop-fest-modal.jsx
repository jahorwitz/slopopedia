import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { GET_FEST, GET_USER_FESTS } from "../graphql";
import { GET_USERS } from "../graphql/get-users";
import { CREATE_FEST, UPDATE_FEST } from "../graphql/mutations/fest";
import { useCurrentUser, useModals } from "../hooks";
import { Form, Modal } from "./index";

export function SlopFestModal({ buttonTitle, location, fest }) {
  const [users, setUsers] = useState([]);
  const { currentUser } = useCurrentUser();
  const { closeModal } = useModals();

  const festStart = new Date(fest?.data?.fest?.startDate);
  const festEnd = new Date(fest?.data?.fest?.endDate);

  useEffect(() => {
    if (location.pathname === `/fests/${fest?.data?.fest?.id}`) {
      setValue("startDate", festStart);
      setValue("endDate", festEnd);
    }
  }, [fest?.data]);

  const { data, loading, error } = useQuery(GET_USERS, {
    variables: {
      where: {
        id: {
          not: {
            equals: currentUser.id,
          },
        },
      },
    },
  });
  const [createFest, { loading: createLoading, error: createError }] =
    useMutation(CREATE_FEST, { refetchQueries: [GET_USER_FESTS] });

  const [updateFest, { loading: updateLoading, error: updateError }] =
    useMutation(UPDATE_FEST, { refetchQueries: [GET_FEST] });

  const {
    register,
    handleSubmit,
    watch,
    formState: { isValid, errors },
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      name: "",
      startDate: "",
      endDate: "",
      attendees: fest?.data?.fest?.attendees || [],
    },
  });

  useEffect(() => {
    if (data && data.users) {
      setUsers(data.users);
    }
  }, [data]);

  const userOptions = users.map((user) => ({
    username: user.username,
  }));

  const onSubmit = () => {
    const { name, attendees, startDate, endDate } = getValues();
    const startDateISO = startDate.toISOString().substring(0, 10);
    const endDateISO = endDate.toISOString().substring(0, 10);
    try {
      createFest({
        variables: {
          data: {
            name: name,
            startDate: startDateISO,
            endDate: endDateISO,
            // attendees should include creator and other usernames in attendees field
            attendees: {
              connect: [...attendees, { username: currentUser.username }],
            },
            creator: {
              connect: { id: currentUser.id },
            },
          },
        },
      }).then(() => closeModal("create"));
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  };

  return (
    <Modal title="OH WE FESTIN">
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className={"flex flex-col items-center p-6"}
      >
        <div className="flex flex-col">
          <div className="flex-col">
            <Form.TextInput
              defaultValue={fest?.data?.fest?.name || ""}
              labelText="Name it!"
              className={`w-[373px]`}
              id={"name"}
              placeholder={"Name it"}
              register={register("name", {
                required: true,
                pattern: {
                  value: /^\S/,
                  message: "Must not start with a space",
                },
              })}
              onChange={(evt) => {
                setValue("name", evt.target.value, { shouldValidate: true });
              }}
              isValid={!errors.name}
            />
            {errors.name ? (
              <Form.Feedback
                message={"Must contain more than one character"}
                className={""}
              />
            ) : (
              ""
            )}
          </div>
          <div className="flex flex-row justify-between">
            <div className="flex-col">
              <Form.DateDropdown
                labelText={"Start Date"}
                className={"w-[176px]"}
                required
                name="startDate"
                isValid={!errors.startDate}
                id={"startDate"}
                watch={watch}
                setValue={setValue}
              />
              {errors.startDate ? (
                <Form.Feedback message={"Must be a valid date"} />
              ) : (
                ""
              )}
            </div>
            <div className="flex-col">
              <Form.DateDropdown
                labelText={"End Date"}
                className={"w-[176px] h-12"}
                id={"endDate"}
                required
                watch={watch}
                setValue={setValue}
                name="endDate"
                isValid={!errors.endDate}
              />
              {errors.endDate ? (
                <Form.Feedback message={"Must be a valid date"} />
              ) : (
                ""
              )}
            </div>
          </div>
          <Form.Combobox
            setValue={setValue}
            watch={watch}
            labelText={"Goblins Attending"}
            id={"attendees"}
            list={userOptions}
            nameKey={"username"}
            idKey={"username"}
            name={"attendees"}
          />
          <Form.Submit
            title={buttonTitle}
            className={"w-[373px] mb-5 mt-5"}
            disabled={!isValid}
          />
        </div>
      </Form>
    </Modal>
  );
}

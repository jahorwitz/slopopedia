import { useMutation, useQuery } from "@apollo/client";
import { difference } from "lodash";
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
  const festId = fest?.data?.fest?.id;
  const inviteesBefore = fest?.data?.fest?.invitees;
  const festStart = new Date(fest?.data?.fest?.startDate);
  const festEnd = new Date(fest?.data?.fest?.endDate);

  useEffect(() => {
    if (location?.pathname === `/fests/${festId}`) {
      setValue("startDate", festStart);
      setValue("endDate", festEnd);
      setValue("name", fest?.data?.fest?.name);
      setValue("invitees", inviteesBefore);
    }
  }, [fest?.data]);

  // Query for getting all user info for attendees selection
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

  // Mutations for creating and updating fests
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
      invitees: [],
      //invitees: fest?.data?.fest?.invitees || [],
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
    const { name, invitees, startDate, endDate } = getValues();
    const startDateISO = startDate.toISOString().substring(0, 10);
    const endDateISO = endDate.toISOString().substring(0, 10);

    if (
      location?.pathname === `/fests/${festId}` &&
      fest?.data?.fest?.creator.id === currentUser.id
    ) {
      const inviteesData = inviteesBefore.map((invitee) => ({
        username: invitee.username,
      }));
      const inviteesUpdate = invitees.map((invitee) => ({
        username: invitee.username,
      }));
      try {
        updateFest({
          variables: {
            where: { id: festId },
            data: {
              // Only submits when the name changes
              name: name,
              startDate: startDateISO,
              endDate: endDateISO,
              invitees: {
                connect: [...inviteesUpdate],
                disconnect: difference(inviteesData, inviteesUpdate),
              },
            },
          },
        }).then((e) => {
          closeModal("edit-fest");
        });
      } catch (error) {
        console.log(`Error: ${error.message}`);
      }
    } else {
      try {
        createFest({
          variables: {
            data: {
              name: name,
              startDate: startDateISO,
              endDate: endDateISO,
              invitees: {
                connect: [...invitees, { username: currentUser.username }],
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
              prefilledInputs={fest?.data?.fest?.name}
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
              <Form.Feedback message={"Must contain more than one character"} />
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
            labelText={"Goblins Invited"}
            id={"invitees"}
            placeholder={"Choose Invitees"}
            list={users}
            nameKey={"username"}
            idKey={"username"}
            name={"invitees"}
            multiple
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

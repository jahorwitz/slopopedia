import { useMutation, useQuery } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { GET_USER_FESTS } from "../graphql";
import { GET_USERS } from "../graphql/get-users";
import { CREATE_FEST } from "../graphql/mutations/create-fest/create-fest";
import { useModals } from "../store";
import { CurrentUserContext } from "../store/current-user-context";
import { Form, Modal } from "./index";

export function SlopFestModal() {
  const { data, loading, error } = useQuery(GET_USERS);
  const [createFest, { loading: createLoading, error: createError }] =
    useMutation(CREATE_FEST, { refetchQueries: [GET_USER_FESTS] });
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      name: "",
      startDate: "",
      endDate: "",
      attendees: [],
    },
  });
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [users, setUsers] = useState([]);
  const { currentUser } = useContext(CurrentUserContext);
  const { closeModal } = useModals();

  useEffect(() => {
    if (data && data.users) {
      setUsers(data.users);
    }
  });

  const userOptions = users.map((user) => ({
    value: user.username,
    label: user.username,
  }));

  const onSubmit = () => {
    const { name, attendees } = getValues();
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
              connect: { username: currentUser.username },
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
              labelText="Name it!"
              className={`w-[373px]`}
              id={"name"}
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
              isValid={isValid}
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
                isValid={isValid}
                date={startDate}
                onChange={(date) => {
                  setStartDate(date);
                  setValue("startDate", date, {
                    shouldValidate: true,
                  });
                }}
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
                required
                name="endDate"
                isValid={isValid}
                date={endDate}
                onChange={(date) => {
                  setEndDate(date);
                  setValue("endDate", date, {
                    shouldValidate: true,
                  });
                }}
              />
              {errors.endDate ? (
                <Form.Feedback message={"Must be a valid date"} />
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="flex font-bold font-arial flex-col py-3 border-solid rounded-none border-black/[0.4]">
            <label htmlFor="attending" className="mb-1.5 text-lg">
              Goblins Attending
            </label>
            {/* will change to headless ui component */}
            <Select
              options={userOptions}
              className={"basic-multi-select"}
              classNames={{
                control: () =>
                  "w-[373px] max-h-[92px] px-2 py-2 border border-solid rounded-none border-black overflow-scroll",
              }}
              isMulti
              name="attendees"
              isSearchable={true}
              isClearable={false}
              // onChange={(evt) => {
              //   setValue("attendees", evt.target.value);
              // }}
              styles={{
                control: (base) => ({
                  ...base,
                  borderColor: "#000000",
                  borderRadius: "none",
                }),
                valueContainer2: (base) => ({
                  ...base,
                  overflow: "scroll",
                }),
                multiValueLabel: (base) => ({
                  ...base,
                  whiteSpace: "normal",
                  overflow: "visible",
                  fontFamily: "Arial",
                  fontWeight: "bold",
                  fontSize: "100%",
                }),
                indicatorSeparator: () => ({
                  container: "hidden",
                }),
                dropdownIndicator: () => ({
                  color: "#000000",
                }),
                menu: (base) => ({
                  ...base,
                  overflow: "hidden",
                  height: "140px",
                }),
              }}
            ></Select>
          </div>
          <Form.Submit
            title={"Fest On!"}
            className={"w-[373px] mb-5 mt-5"}
            disabled={!isValid}
          />
        </div>
      </Form>
    </Modal>
  );
}

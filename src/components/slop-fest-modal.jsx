import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { GET_USERS } from "../graphql/get-users";
import { Form, Modal } from "./index";

export function SlopFestModal() {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      name: "",
      date: "",
    },
  });
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [users, setUsers] = useState([]);

  const { data, loading } = useQuery(GET_USERS);

  useEffect(() => {
    if (data && data.users) {
      setUsers(data.users);
    }
  });

  const userOptions = users.map((user) => ({
    value: user.username,
    label: user.username,
  }));

  const onSubmit = () => {};

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
                isValid={isValid}
                date={startDate}
                onChange={(date) => {
                  setStartDate(date), { shouldValidate: true };
                }}
              />
              {errors.date ? (
                <Form.Feedback message={"Must be a valid date"} />
              ) : (
                ""
              )}
            </div>
            <div className="flex-col">
              <Form.DateDropdown
                labelText={"End Date"}
                className={"w-[176px] h-12"}
                isValid={isValid}
                date={endDate}
                onChange={(date) => {
                  setEndDate(date), { shouldValidate: true };
                }}
              />
              {errors.date ? (
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
            <Select
              options={userOptions}
              className={"basic-multi-select"}
              classNames={{
                control: () =>
                  "w-[373px] max-h-[92px] px-2 py-2 border border-solid rounded-none border-black overflow-scroll",
              }}
              styles={{
                control: (base) => ({
                  ...base,
                  borderColor: "#000000",
                  borderRadius: "none",
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
              isMulti
              name="attending"
              isSearchable
              isClearable={false}
            ></Select>
          </div>
          <Form.Submit title={"Fest On!"} className={"w-[373px] mb-5 mt-5"} />
        </div>
      </Form>
    </Modal>
  );
}

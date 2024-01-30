import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "../button";

export const Form = ({ className, children, onSubmit, ...rest }) => {
  return (
    <form className={className} onSubmit={onSubmit} {...rest}>
      {children}
    </form>
  );
};

Form.TextInput = ({
  className,
  labelText,
  id,
  email,
  password,
  register,
  onChange,
  isValid,
  ...rest
}) => {
  return (
    <>
      <div className="flex font-bold font-arial flex-col py-3">
        <label
          htmlFor={id}
          className={`mb-1.5 text-lg text-start ${className}`}
        >
          {labelText}
        </label>

        <input
          register={register}
          id={id}
          className={`font-normal py-3 px-4 border-solid rounded-none border ${
            isValid ? "border-black" : "border-danger focus:outline-danger"
          } `}
          type="text"
          placeholder={"Type here"}
          onChange={onChange}
          {...rest}
        />
      </div>
    </>
  );
};

Form.TextArea = ({ className, labelText, id, register, ...rest }) => {
  return (
    <>
      <div className="flex font-bold font-arial flex-col py-3">
        <label htmlFor={id} className="mb-1.5 text-lg">
          {labelText}
        </label>

        <textarea
          id={id}
          className="font-normal py-4 px-4 border-solid rounded-none border border-black"
          type="text"
          placeholder="Type"
          {...rest}
        />
      </div>
    </>
  );
};

Form.TextNumber = ({ className, labelText, id, email, password, ...rest }) => {
  return (
    <>
      <div className="flex font-bold font-arial flex-col py-3 border-solid rounded-none border-black-500">
        <label htmlFor={id} className="mb-1.5 text-lg">
          {labelText}
        </label>
        <input
          id={id}
          className="font-normal py-4 px-4 border-solid rounded-none border border-black"
          type="number"
          placeholder="Type"
          {...rest}
        />
      </div>
    </>
  );
};

Form.Dropdown = ({
  className,
  labelText,
  id,
  email,
  password,
  children,
  multiple,
  ...rest
}) => {
  return (
    <>
      <div
        className={`flex font-bold font-arial flex-col py-3 border-solid rounded-none border-black/[0.4] ${className}`}
      >
        <label htmlFor={id} className="mb-1.5 text-lg">
          {labelText}
        </label>
        <select
          id={id}
          className="py-4 px-4 border-solid rounded-none border border-black"
          type="dropdown"
          placeholder="Dropdown"
          multiple={multiple}
          {...rest}
        >
          {children}
        </select>
      </div>
    </>
  );
};

Form.DateDropdown = ({ className, labelText, id, onChange, date, ...rest }) => {
  return (
    <div
      className={`flex font-bold font-arial flex-col py-3 border-solid rounded-none border-black/[0.4] ${className}`}
    >
      <label htmlFor={id} className="mb-1.5 text-lg">
        {labelText}
      </label>
      <DatePicker
        className={
          "py-4 px-4 border-solid rounded-none border border-black w-44 h-12 flex"
        }
        onChange={onChange}
        selected={date}
        placeholderText="Select"
      />
    </div>
  );
};

Form.Submit = ({ title, className, disabled }) => {
  return (
    <div className="flex justify-center pt-8 pb-5">
      <Button
        disabled={disabled}
        variant="primary"
        children={title}
        className={`font-bold font-arial text-lg/4 border py-4 px-4 ${className}`}
        type="submit"
      >
        {title}
      </Button>
    </div>
  );
};

Form.Feedback = ({ className, message }) => {
  return (
    <>
      <p className={`text-left text-error-message text-[#FF4040] ${className}`}>
        {message}
      </p>
    </>
  );
};

import { Combobox } from "@headlessui/react";
import { useCallback, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDropzone } from "react-dropzone";
import down from "../../images/form-down-triangle.svg";
import { Button } from "../button";

export const Form = ({ className, children, onSubmit, ...rest }) => {
  return (
    <form className={className} onSubmit={onSubmit} {...rest}>
      {children}
    </form>
  );
};

Form.FileDrop = ({ id, labelText, watch, onChange, children }) => {
  const [file, setFile] = useState(null);

  const onDrop = useCallback(([acceptedFile]) => {
    setFile(acceptedFile);
    // const reader = new FileReader();

    // reader.onabort = () => console.log("file reading was aborted");
    // reader.onerror = () => console.log("file reading has failed");
    // reader.onload = () => {
    //   const binaryStr = reader.result;
    //   const blob = new Blob([binaryStr], { type: acceptedFile.type });
    //   onChange(URL.createObjectURL(blob));
    // };
    // reader.readAsArrayBuffer(acceptedFile);
    onChange(acceptedFile);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  return (
    <div className="flex font-arial flex-col py-3">
      <label htmlFor={id} className="mb-1.5 text-lg font-bold text-start">
        {labelText}
      </label>

      <div
        {...getRootProps()}
        className="w-full border border-black font-medium text-lg/4 py-3 px-4 bg-background border-solid flex justify-center items-center cursor-pointer"
      >
        <input {...getInputProps()} type="file" />
        {file?.path ?? children}
      </div>
    </div>
  );
};

Form.TextInput = ({
  className,
  labelText,
  id,
  email,
  password,
  register,
  prefilledInputs,
  onChange,
  isValid,
  placeholder,
  classNameInput,
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
          defaultValue={prefilledInputs}
          id={id}
          className={`font-normal bg-background py-3 px-4 border-solid rounded-none border ${
            isValid ? "border-black" : "border-danger focus:outline-danger"
          } ${classNameInput} `}
          type="text"
          placeholder={placeholder || "Type here"}
          onChange={onChange}
          {...rest}
        />
      </div>
    </>
  );
};

Form.TextArea = ({
  className,
  labelText,
  id,
  register,
  prefilledInputs,
  classNameTextArea,
  isValid,
  ...rest
}) => {
  return (
    <>
      <div className="flex font-bold font-arial flex-col py-3">
        <label htmlFor={id} className="mb-1.5 text-lg">
          {labelText}
        </label>

        <textarea
          defaultValue={prefilledInputs}
          register={register}
          id={id}
          className={`font-normal bg-background py-4 px-4 border-solid rounded-none border border-black ${classNameTextArea}`}
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
          className="font-normal py-3 px-4 bg-background border-solid rounded-none border border-black"
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
          className="py-4 px-4 bg-background border-solid rounded-none border border-black"
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

Form.DateDropdown = ({
  register,
  className,
  labelText,
  id,
  onChange,
  setValue,
  watch,
  name,
  ...rest
}) => {
  const selectedItem = watch(id);

  useEffect(() => {
    setValue(id, selectedItem, { shouldValidate: true });
  }, []);

  return (
    <div
      className={`relative flex font-bold font-arial flex-col py-3 border-solid rounded-none border-black/[0.4] ${className}`}
    >
      <label htmlFor={id} className="mb-1.5 text-lg">
        {labelText}
      </label>
      <DatePicker
        name={name}
        dateFormat={"MM/dd/yyyy"}
        className={
          "py-4 px-4 border-solid rounded-none border border-black w-44 h-12 flex bg-background"
        }
        onChange={(date) => setValue(id, date, { shouldValidate: true })}
        selected={selectedItem}
        placeholderText="Select"
        {...rest}
      />
      {/* <Button className="absolute right-0.5 flex top-12" variant="tertiary">
        <img src={down} className="h-2.5 w-2.5" />
      </Button> */}
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

Form.Combobox = ({
  id,
  register,
  labelText,
  placeholder,
  className,
  list,
  name,
  nameKey,
  idKey,
  watch,
  setValue,
  ...rest
}) => {
  const [selectedItems, setSelectedItems] = useState(null);
  const handleChange = (data) => {
    const itemIds = data.map((item) => item.id);
    const duplicateIds = itemIds.filter(
      (item, index) => itemIds.indexOf(item) !== index
    );
    // removes all duplicate items from the data array
    const filteredData = data.filter((item) => !duplicateIds.includes(item.id));
    setSelectedItems(filteredData);
    setValue(id, filteredData, { shouldValidate: true });
  };

  return (
    <div className={`flex font-bold font-arial flex-col py-3 ${className}`}>
      <label htmlFor={id} className={`mb-1.5 text-lg text-start `}>
        {labelText}
      </label>
      <Combobox
        value={selectedItems || watch(id) || []}
        onChange={handleChange}
        multiple
        nullable
        name={name}
        id={id}
      >
        <div className={`relative ${className}`}>
          <div
            className={`relative font-normal py-3 px-4 flex gap-2.5 flex-wrap border-solid rounded-none border border-black focus-within:ring-black focus-within:ring-1 ${className}`}
          >
            <Combobox.Input
              displayValue={(list) =>
                list
                  .map((item) => item.name || item.title || item.username)
                  .join(", ")
              }
              placeholder={placeholder}
              className="font-normal bg-background border-none focus:outline-none flex-grow flex-shrink-0 w-16"
            />
            <Combobox.Button className="absolute right-5 flex top-4">
              <img src={down} className="h-2.5 w-2.5" />
            </Combobox.Button>
          </div>
          <Combobox.Options className="absolute bg-background top-full w-full max-h-36 overflow-y-scroll border-solid border border-black">
            {list?.map((item) => (
              <Combobox.Option
                key={item[idKey]}
                value={item}
                className={({ selected, active }) =>
                  `font-normal py-3 px-4 rounded-none cursor-pointer ${
                    active ? "bg-neutral-200" : ""
                  } ${selected ? "text-black" : "text-neutral-400"}`
                }
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {item[nameKey]}
                    </span>
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </div>
      </Combobox>
    </div>
  );
};

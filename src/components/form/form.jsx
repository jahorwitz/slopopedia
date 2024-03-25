import { Combobox } from "@headlessui/react";
import { useCallback, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDropzone } from "react-dropzone";
import cross from "../../images/combo-box-cross.svg";
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
          } `}
          type="text"
          placeholder={placeholder || "Type here"}
          onChange={onChange}
          {...rest}
        />
      </div>
    </>
  );
};

Form.TextArea = ({ className, labelText, id, register, isValid, ...rest }) => {
  return (
    <>
      <div className="flex font-bold font-arial flex-col py-3">
        <label htmlFor={id} className="mb-1.5 text-lg">
          {labelText}
        </label>

        <textarea
          id={id}
          className="font-normal bg-background py-4 px-4 border-solid rounded-none border border-black"
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

Form.DateDropdown = ({ className, labelText, id, onChange, date, ...rest }) => {
  return (
    <div
      className={`relative flex font-bold font-arial flex-col py-3 border-solid rounded-none border-black/[0.4] ${className}`}
    >
      <label htmlFor={id} className="mb-1.5 text-lg">
        {labelText}
      </label>
      <DatePicker
        className={
          "py-4 px-4 border-solid rounded-none border border-black w-44 h-12 flex bg-background"
        }
        onChange={onChange}
        selected={date}
        placeholderText="Select"
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
  className,
  list,
  name,
  nameKey,
  idKey,
  watch,
  setValue,
  ...rest
}) => {
  const selectedItems = watch(id) || [];
  const [query, setQuery] = useState("");

  useEffect(() => {
    setValue(id, selectedItems);
  }, []);

  const filteredList =
    query === ""
      ? list
      : list.filter((item) => {
          return item[nameKey].toLowerCase().includes(query.toLowerCase());
        });
  return (
    <div className={`flex font-bold font-arial flex-col py-3 ${className}`}>
      <label htmlFor={id} className={`mb-1.5 text-lg text-start `}>
        {labelText}
      </label>
      <Combobox
        value={selectedItems}
        onChange={(data) => setValue(id, data)}
        multiple
        nullable
        name={name}
        id={id}
      >
        <div className={`relative ${className}`}>
          <div
            className={`relative font-normal py-3 px-4 flex gap-2.5 flex-wrap border-solid rounded-none border border-black focus-within:ring-black focus-within:ring-1 ${className}`}
          >
            {selectedItems &&
              selectedItems?.length > 0 &&
              selectedItems?.map((item) => (
                <div
                  key={item[idKey]}
                  className="flex gap-1.5 px-1.5 py-1 bg-neutral-950 bg-opacity-10"
                >
                  <span>{item[nameKey]}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setValue(
                        id,
                        selectedItems.filter((element) => element !== item)
                      );
                    }}
                  >
                    <img src={cross} />
                  </button>
                </div>
              ))}
            <Combobox.Input
              onChange={(evt) => setQuery(evt.target.value)}
              value={query}
              placeholder="Select"
              className="font-normal bg-background border-none focus:outline-none flex-grow flex-shrink-0 w-16"
            />
            <Combobox.Button className="absolute right-5 flex top-4">
              <img src={down} className="h-2.5 w-2.5" />
            </Combobox.Button>
          </div>
          <Combobox.Options className="absolute bg-background top-full w-full max-h-36 overflow-y-scroll border-solid border border-black">
            {filteredList?.map((item) => (
              <Combobox.Option
                key={item[idKey]}
                value={item}
                className={({ selected, active }) =>
                  `font-normal py-3 px-4 rounded-none cursor-pointer ${
                    active ? "bg-neutral-200" : ""
                  } ${selected ? "text-black" : "text-neutral-400"}`
                }
                onClick={() => setQuery("")}
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

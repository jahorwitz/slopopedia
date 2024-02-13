import { Combobox } from "@headlessui/react";
import { useState } from "react";
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

Form.Dropdown = ({ className, labelText, id, email, password, ...rest }) => {
  return (
    <>
      <div className="flex font-bold font-arial flex-col py-3 border-solid rounded-none border-black/[0.4]">
        <label htmlFor={id} className="mb-1.5 text-lg">
          {labelText}
        </label>
        <select
          id={id}
          className="py-4 px-4 border-solid rounded-none border border-black"
          type="dropdown"
          placeholder="Dropdown"
          {...rest}
        />
      </div>
    </>
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

Form.Combobox = ({ id, labelText, className, list, name }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [query, setQuery] = useState("");
  const filteredList =
    query === ""
      ? list
      : list.filter((item) => {
          return item.name.toLowerCase().includes(query.toLowerCase());
        });
  return (
    <div className={`flex font-bold font-arial flex-col py-3 ${className}`}>
      <label htmlFor={id} className={`mb-1.5 text-lg text-start `}>
        {labelText}
      </label>
      <Combobox
        value={selectedItems}
        onChange={setSelectedItems}
        multiple
        nullable
        name={name}
      >
        <div className=" relative font-normal py-3 px-4 border-solid rounded-none border border-black focus-within:ring-black focus-within:ring-1 flex gap-2.5 flex-wrap">
          {selectedItems.length > 0 &&
            selectedItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-1.5 bg-neutral-300 px-1.5 py-1"
              >
                <span>{item.name}</span>
                <button
                  type="click"
                  onClick={() => {
                    setSelectedItems(
                      selectedItems.filter((element) => element.id !== item.id)
                    );
                  }}
                >
                  <img src={cross} />
                </button>
              </div>
            ))}
          <Combobox.Input
            onChange={(event) => setQuery(event.target.value)}
            value={query}
            className="font-nomral border-none focus:outline-none w-0 flex-grow"
          />
          <Combobox.Button className="absolute right-2 flex top-3 pr-2">
            <img src={down} />
          </Combobox.Button>
        </div>
        <Combobox.Options>
          {filteredList.map((item) => (
            <Combobox.Option
              key={item.id}
              value={item}
              className="font-normal py-3 px-4 border-solid rounded-none border border-black"
              onClick={() => setQuery("")}
            >
              {item.name}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
    </div>
  );
};

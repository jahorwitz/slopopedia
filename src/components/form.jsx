import { Button } from "../components/Button/Button";

export const Form = ({ className, children, onSubmit, ...rest }) => {
  return (
    <form className={className} onSubmit={onSubmit} {...rest}>
      {children}
    </form>
  );
};

Form.TextInput = ({ className, labelText, id, email, password, ...rest }) => {
  return (
    <>
      <div className="flex font-bold font-arial flex-col">
        <label htmlFor={id} className="">
          {labelText}
        </label>
      </div>
      <div className="flex flex-col border-solid rounded-none border-black-500">
        <input
          id={id}
          className="flex font-normal font-arial flex-col border-solid rounded-none border-black-500"
          type="text"
          placeholder="Type"
          {...rest}
        />
      </div>
    </>
  );
};

Form.TextArea = ({ className, labelText, id, register, ...rest }) => {
  return (
    <>
      <div className="flex font-bold font-arial flex-col border-solid rounded-none border-black-500">
        <label htmlFor={id} className="">
          {labelText}
        </label>
        <textarea
          id={id}
          className="font-normal"
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
      <div className="flex font-bold font-arial flex-col border-solid rounded-none border-black-500">
        <label htmlFor={id} className="">
          {labelText}
        </label>
        <input
          id={id}
          className="font-normal"
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
      <div className="flex font-bold font-arial flex-col border-solid rounded-none border-black-500">
        <label htmlFor={id} className="">
          {labelText}
        </label>
        <select
          id={id}
          className=""
          type="dropdown"
          placeholder="Dropdown"
          {...rest}
        />
      </div>
    </>
  );
};
Form.Submit = ({ children }) => {
  return <Button type="submit">{children}</Button>;
};

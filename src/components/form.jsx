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
      <div className="flex font-bold font-arial flex-col py-3">
        <label htmlFor={id} className="mb-1.5">
          {labelText}
        </label>

        <input
          id={id}
          className="font-normal py-4 px-4 border-solid rounded-none border-2 border-black"
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
      <div className="flex font-bold font-arial flex-col py-3">
        <label htmlFor={id} className="mb-1.5">
          {labelText}
        </label>

        <textarea
          id={id}
          className="font-normal py-4 px-4 border-solid rounded-none border-2 border-black"
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
        <label htmlFor={id} className="mb-1.5">
          {labelText}
        </label>
        <input
          id={id}
          className="font-normal py-4 px-4 border-solid rounded-none border-2 border-black"
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
        <label htmlFor={id} className="mb-1.5">
          {labelText}
        </label>
        <select
          id={id}
          className="py-4 px-4 border-solid rounded-none border-2 border-black"
          type="dropdown"
          placeholder="Dropdown"
          {...rest}
        />
      </div>
    </>
  );
};
Form.Submit = ({ title, className }) => {
  return (
    <div className="flex justify-center py-3">
      <Button
        title="Yeah!"
        className="bg-yellow-400 h-12 text-black w-80 border py-4 px-4"
        type="submit"
      />
    </div>
  );
};

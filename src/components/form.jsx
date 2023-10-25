import { Button } from "../components/Button/Button";

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
  ...rest
}) => {
  return (
    <>
      <div className="flex font-bold font-arial flex-col py-2">
        <label htmlFor={id} className="mb-1.5 text-lg text-left">
          {labelText}
        </label>

        <input
          register={register}
          id={id}
          className={`font-normal py-3 px-4 border-solid rounded-none border border-black ${className}`}
          type="text"
          placeholder="Type here"
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
Form.Submit = ({ title, className }) => {
  return (
    <div className="flex justify-center pt-8 pb-10">
      <Button
        title={title}
        className={`font-bold font-arial text-lg/4 text-black w-full border py-4 px-4 bg-yellow-button ${className}`}
        type="button"
      />
    </div>
  );
};

export const Form = ({ className, children, onSubmit, ...rest }) => {
  return (
    <form className={className} onSubmit={onSubmit} {...rest}>
      {children}
    </form>
  );
};

Form.TextInput = ({ className, id, email, password, ...rest }) => {
  return (
    <>
      <div className={cx("flex flex-col", className)}>
        <label htmlFor={id} className="">
          {labelText}
        </label>
        <input
          id={id}
          className=""
          type="text"
          placeholder="Type here"
          {...rest}
        />
      </div>
    </>
  );
};

Form.TextArea = ({ className, labelText, id, register, ...rest }) => {
  return (
    <>
      <div className={cx("flex flex-col", className)}>
        <label htmlFor={id} className="">
          {labelText}
        </label>
        <textarea id={id} className="" type="text" {...rest} />
      </div>
    </>
  );
};

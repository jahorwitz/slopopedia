import { forwardRef } from "react";

/**
 * Text input component
 * @param {string|undefined} name - text for label (optional)
 * @param {"text"|"password"|"email"} type - html input type
 */

const TextInput = forwardRef(({ name, type = "text", ...rest }, ref) => {
  return (
    <>
      <label htmlFor={name} className="text-lg font-bold">
        {name}
      </label>
      <input
        type={type}
        name={name}
        className="border-black border-2 p-3 text-[18px] shadow-sm"
        placeholder="Type Here"
        ref={ref}
        autoComplete="off"
        {...rest}
      />
    </>
  );
});

export default TextInput;

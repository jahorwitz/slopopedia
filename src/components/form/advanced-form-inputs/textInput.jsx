import { forwardRef } from "react";

/**
 * Text input component
 * @param {string|undefined} name - text for label (optional)
 * @param {"text"|"password"|"email"|"number"} type - html input type
 * @param {string} label - label for the text input
 * @param {Object} rest - remaining props from react-hook-form register function
 */

const TextInput = forwardRef(
  ({ name, type = "text", label = undefined, ...rest }, ref) => {
    return (
      <>
        {label && (
          <label htmlFor={name} className="text-lg font-bold">
            {label}
          </label>
        )}
        <input
          type={type}
          name={name}
          className="border-black border-2 p-3 text-[18px] shadow-sm w-full"
          placeholder="Type Here"
          ref={ref}
          autoComplete="off"
          {...rest}
        />
      </>
    );
  }
);

export default TextInput;

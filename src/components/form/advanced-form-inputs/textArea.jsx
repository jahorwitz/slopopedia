import { forwardRef } from "react";

/**
 * Text area input component
 * @param {string|undefined} name - text for label (optional)
 * @param {string} label - label for the text area input
 * @param{string} rows - number of rows
 * @param{string} cols - number of columns
 * @param {Object} rest - remaining props from react-hook-form register function
 */

const TextArea = forwardRef(
  ({ name, label = undefined, rows = "5", cols = "33", ...rest }, ref) => {
    return (
      <>
        {label && (
          <label htmlFor={name} className="text-lg font-bold">
            {label}
          </label>
        )}
        <textarea
          id={name}
          rows={rows}
          cols={cols}
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

export default TextArea;

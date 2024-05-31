/**
 * The following is an uncontrolled checkbox component that is compatible with react-hook-form
 * @param {string} name - Should be set by the register function of react-hook-form
 * @param {string|undefined} label - Desired label for form input
 * @param {*} rest - Register props from react-hook-form
 * @param {*} ref - the ref passed by react-hook-form register function
 */
import { forwardRef } from "react";

const Checkbox = forwardRef(({ name, label = undefined, ...rest }, ref) => {
  return (
    <div className="flex flex-row-reverse justify-evenly items-center">
      {label && (
        <label htmlFor={name} className="">
          {label}
        </label>
      )}
      <input
        className="w-6 h-6 accent-black rounded-none shadow-sm border-black border-3"
        type="checkbox"
        {...rest}
        name={name}
        ref={ref}
      />
    </div>
  );
});

export default Checkbox;

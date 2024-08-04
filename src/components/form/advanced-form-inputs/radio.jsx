import { forwardRef, useId } from "react";

/**
 * The following is a Radio component that is compatible with react-hook-form
 * @param {string|undefined} label - Desired label for form input
 * @param {string} name - Should be set by the register function of react-hook-form.
 * @param {string} value - value for radio button
 * @param {*} rest - Register props from react-hook-form
 * @param {*} ref - the ref passed by react-hook-form register function
 */
const Radio = forwardRef(({ title, label, value, name, ...rest }, ref) => {
  const id = useId();
  return (
    <label
      className="font-normal text-base flex justify-end flex-row-reverse gap-2"
      htmlFor={name}
      id={id}
    >
      <span>{label}</span>
      <input
        className="accent-black shrink-0 mt-0.5 border-gray-200 rounded-full text-black checked:ring-black  disabled:opacity-50 disabled:pointer-events-none"
        type="radio"
        ref={ref}
        value={value}
        id={name}
        name={title}
        {...rest}
      />
    </label>
  );
});
export default Radio;

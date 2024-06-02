import { forwardRef } from "react";

/**
 * Slider component for react-hook-form
 * @param {string} name - name set by react-hook-form register function
 * @param {string} value - value set by react-hook-form register function
 * @param {string} min - minimum value for slider
 * @param {string|undefined} label - label for form input
 * @param {string} max - maximum value for slider
 * @param {Function} watch - watch function from react-hook-form, necessary for value preview.
 * @param {Object} rest - remaining props from react-hook-form register function
 */

const Slider = forwardRef(
  ({ name, value, min, label = undefined, max, watch = min, ...rest }, ref) => {
    return (
      <div className="flex justify-between items-center">
        {label && (
          <label htmlFor={name} className="text-lg">
            {label}
          </label>
        )}
        <input
          className="appearance-none border-[1px] border-black [&::-webkit-slider-runnable-track]:rounded-full h-[0.25rem] rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:w-[0.75rem] [&::-webkit-slider-thumb]:h-5 cursor-pointer "
          name={name}
          type="range"
          ref={ref}
          {...rest}
          min={min}
          max={max}
          defaultValue={min}
        />
        <p className="text-lg">{watch}</p>
      </div>
    );
  }
);

export default Slider;

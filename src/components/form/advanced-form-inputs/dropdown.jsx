/**
 * @typedef {Object} Option
 * @param {string} label - Label for the option (eg: "Cool String")
 * @param {string} value - Value for the option (eg: "coolString")
 */

import { Controller } from "react-hook-form";
import Select from "react-select";

/**
 * Dropdown component using react-select and the controller component from react-hook-form
 * @param {Object} control - Control object from react-hook-form useForm() hook.
 * @param {Option[]} options - Options that can be selected in the form
 * @param {Option} defaultValue - initial value for the select elemenent. (eg: options[0])
 * @param {string} name - Name to be registered to the form input
 * @param {boolean} isMulti - if true, will make the form allow multiselect
 */
export default function Dropdown({
  control,
  options,
  defaultValue,
  name,
  isMulti = false,
}) {
  return (
    <Controller
      control={control}
      defaultValue={() => {
        if (isMulti && defaultValue === undefined) {
          return [];
        } else {
          return defaultValue;
        }
      }}
      name={name}
      render={({ field: { onChange, value, ref } }) => {
        let val;
        if (isMulti) {
          val = options.filter((c) => value.includes(c.value));
        } else {
          val = options.find((c) => c.value === value);
        }
        return (
          <Select
            inputRef={ref}
            value={val}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                borderColor: state.isFocused ? "black" : "black",
                padding: ".75rem",
                fontSize: "18px",
                borderWidth: "2px",
                borderRadius: 0,
              }),
            }}
            theme={(theme) => ({
              ...theme,
              padding: 0,
              borderWidth: 0,
              colors: {
                ...theme.colors,
                primary25: "#FFD913",
                primary: "black",
              },
            })}
            onChange={(val) => {
              if (isMulti) {
                onChange(val.map((c) => c.value));
              } else {
                onChange(val.value);
              }
            }}
            options={options}
            isMulti={isMulti}
          />
        );
      }}
    />
  );
}

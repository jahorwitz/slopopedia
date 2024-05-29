import { Checkbox as HeadlessCheckbox, Field, Label } from "@headlessui/react";
import { forwardRef } from "react";

const ControlledCheckbox = forwardRef(({ value, label, onChange }, ref) => {
  return (
    <Field className="flex items-center gap-3">
      <HeadlessCheckbox
        value={value}
        ref={ref}
        onChange={onChange}
        className="group bg-white block w-6 h-6 border data-[checked]:bg-black data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[checked]:data-[disabled]:bg-gray-500"
      >
        <svg
          className="stroke-white opacity-0 group-data-[checked]:opacity-100"
          viewBox="0 0 14 14"
          fill="none"
        >
          <path
            d="M3 8L6 11L11 3.5"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </HeadlessCheckbox>
      <Label className="text-lg">{label}</Label>
    </Field>
  );
});

export default ControlledCheckbox;

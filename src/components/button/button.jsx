import cx from "classnames";

export const Button = ({
  variant = "primary",
  size = "md",
  children,
  className,
  disabled,
  ...rest
}) => {
  return (
    <button
      {...rest}
      disabled={disabled}
      className={cx(
        "text-lg font-bold leading-4",
        !disabled && variant === "primary" && "bg-yellow text-black",
        !disabled && variant === "secondary" && "bg-black text-white",
        !disabled &&
          variant === "outline-secondary" &&
          "border-dark border-[1px] text-black",
        !disabled &&
          variant === "outline-danger" &&
          "border-danger border-[1px] text-danger",
        !disabled && variant === "danger" && "text-danger",
        !disabled &&
          variant === "link" &&
          "border-b-2 border-black text-white-400 font-arialRegular",
        !disabled &&
          variant === "link-secondary" &&
          "hover:border-b-[3px] hover:border-black hover:text-black text-gray-500 text-lg font-arialBold h-6",
        !disabled &&
          variant === "minus" &&
          "bg-minus absolute top-2.5 right-2.5",
        !disabled && variant === "plus" && "bg-plus absolute top-2.5 right-2.5",
        disabled && "bg-dark/10 text-dark/60 cursor-not-allowed border-none",
        size === "md" && "p-3",
        size === "sm" && "p-2.5",
        size === "lg" && "py-4 w-full",
        size === "link" && "p-0",
        className
      )}
    >
      {children}
    </button>
  );
};

Button.displayName = "Button";

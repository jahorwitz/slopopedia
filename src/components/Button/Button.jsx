import cx from "classnames";

export const Button = ({ className, variant, children }) => {
  return (
    <button
      className={cx(
        variant === "link" &&
          "border-b-2 border-white text-white-400 font-arialRegular",
        className
      )}
    >
      {children}
    </button>
  );
};

Button.displayName = "Button";

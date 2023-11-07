import cx from "classnames";

export const Button = ({ title, className, variant }) => {
  return (
    <button
      className={cx(
        variant === "link" && "border-b-2 border-black text-white-400 font-arialRegular",
        className
      )}
    >
      {title}
    </button>
  );
};

Button.displayName = "Button";

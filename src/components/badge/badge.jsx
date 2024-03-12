import cx from "classnames";

export function Badge({ className, text, variant = "positive" }) {
  return (
    <div
      className={cx(
        "text-arialRegular p-2.5 xs:p-1.5 xs:text-sm",
        variant === "positive" && "bg-green rotate-[-8.59deg]",
        variant === "neutral" && "bg-yellow rotate-[7.3333deg]",
        variant === "negative" && "bg-danger rotate-[-5.45deg]",
        className
      )}
    >
      {text}
    </div>
  );
}

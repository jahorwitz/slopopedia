import cx from "classnames";

export function Badge({ className, text, variant = "positive" }) {
  return (
    <div
      className={cx(
        "text-arialRegular p-2.5",
        variant === "positive" && "bg-green rotate-[-8.59deg]",
        variant === "neutral" && "bg-yellow rotate-[7.3333deg]",
        variant === "negative" && "bg-red rotate-[-5.45deg]",
        className
      )}
    >
      {text}
    </div>
  );
}

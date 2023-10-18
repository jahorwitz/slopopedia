import cx from "classnames";

export function RecommendBadge({ className, text, variant = "positive" }) {
  return (
    <div
      className={cx(
        variant === "positive" && "bg-[#48FF50] rotate-[-8.59deg]",
        variant === "neutral" && "bg-[#FFD913] rotate-[7.3333deg]",
        variant === "negative" && "bg-[#FF3E13] rotate-[-5.45deg]",
        className
      )}
    >
      <p className="text-arialRegular p-2.5">{text}</p>
    </div>
  );
}

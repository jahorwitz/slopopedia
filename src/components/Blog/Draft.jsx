export const Draft = ({ title, author, date, additionalInfo, classNames }) => {
  const containerClass = classNames?.container || "";
  const titleClass = classNames?.title || "font-semibold text-base";
  const infoClass = classNames?.info || "flex gap-4";
  const smallClass = classNames?.small || "text-gray-500";
  const hrClass =
    classNames?.hr || "h-px my-3 bg-gray-200 border-0 dark:bg-gray-700";

  return (
    <div className={containerClass}>
      <h2 className={titleClass}>{title}</h2>
      <div className={infoClass}>
        <small className={smallClass}>{`By ${author}`}</small>
        {date && <small className={smallClass}>{date}</small>}
        {additionalInfo && (
          <small className={smallClass}>{additionalInfo}</small>
        )}
      </div>
      <hr className={hrClass} />
    </div>
  );
};

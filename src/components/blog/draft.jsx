import { useNavigate } from "react-router";

export const Draft = ({
  title,
  author,
  date,
  additionalInfo,
  classNames,
  id,
}) => {
  const router = useNavigate();
  const containerClass = classNames?.container || "";
  const titleClass =
    classNames?.title || "font-semibold text-base cursor-pointer";
  const infoClass =
    classNames?.info ||
    "flex font-semibold gap-4 pb-2 border-gray-400 border-b-[1px]  ";
  const smallClass = classNames?.small || "text-gray";
  const hrClass =
    classNames?.hr || "h-px my-3 bg-gray-200 border-0 dark:bg-gray-700";

  return (
    <div className={containerClass}>
      <h2 onClick={() => router(`/articles/${id}/edit`)} className={titleClass}>
        {title}
      </h2>
      <div className={infoClass}>
        {author === undefined ? (
          <small>anonymous user</small>
        ) : (
          <small className={smallClass}>{`By ${author}`}</small>
        )}
        <small className={smallClass}>{date}</small>
        {additionalInfo && (
          <small className={smallClass}>{additionalInfo}</small>
        )}
      </div>
      <hr className={hrClass} />
    </div>
  );
};

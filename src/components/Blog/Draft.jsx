export const Draft = ({ title, author, date }) => {
  return (
    <>
      <div>
        <h2 className={"font-semibold text-base"}>{title}</h2>
        <div className={"flex gap-4"}>
          <small className={"text-gray-500"}>{`By ${author}`}</small>
          <small className={"text-gray-500"}>{date}</small>
        </div>
        <hr className="h-px my-3 bg-gray-200 border-0 dark:bg-gray-700" />
      </div>
    </>
  );
};

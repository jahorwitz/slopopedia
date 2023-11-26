export const Keyword = ({ keyword, className }) => {
  return (
    <p
      className={
        "flex flex-wrap content-center p-2 h-[31px] w-max text-base font-arial " +
        className
      }
    >
      {keyword}
    </p>
  );
};

Keyword.displayName = "Keyword";

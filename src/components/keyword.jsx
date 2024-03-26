export const Keyword = ({ keyword, className }) => {
  return (
    <p
      className={`inline-flex items-center p-2 min-h-[31px] w-max text-base font-arial break-words ${className}`}
    >
      {keyword}
    </p>
  );
};

Keyword.displayName = "Keyword";

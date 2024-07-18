export const Keyword = ({ keyword, className }) => {
  return (
    <p
      className={`inline-flex items-center p-2 h-31 w-max text-base font-arial break-words leading-4 ${className}`}
      data-test-id={ "keyword-id-" + keyword }
    >
      {keyword}
    </p>
  );
};

Keyword.displayName = "Keyword";

function Keyword({ keyword, className }) {
  return (
    <p
      className={
        "flex flex-wrap content-center p-2 h-keyword w-max text-base font-arial " +
        className
      }
    >
      {keyword}
    </p>
  );
}

export default Keyword;
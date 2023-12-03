function Keyword({ keyword, className }) {
  const { id, name } = keyword;

  return (
    <div className={className} key={id}>
      <p
        className={
          "flex flex-wrap content-center p-2 h-keyword w-max text-base font-arial " +
          className
        }
      >
        {name}
      </p>
    </div>
  );
}

export default Keyword;

Keyword.displayName = "Keyword";

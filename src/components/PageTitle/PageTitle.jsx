export const PageTitle = ({ title, className }) => {
  return (
    <div>
      <h1 className={className}>
        <p>{title}</p>
      </h1>
    </div>
  );
};

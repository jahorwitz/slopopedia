export const Button = ({ title, className, onClick }) => {
  return (
    <button onClick={onClick} className={className}>
      {title}{" "}
    </button>
  );
};

Button.displayName = "Button";

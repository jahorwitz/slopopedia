export const Button = ({ title, className, onClick }) => {
  return (
    <button className={className} onClick={onClick}>
      {title}
    </button>
  );
};

Button.displayName = "Button";

export const Button = ({ title, className, onClick, disabled = false }) => {
  return (
    <button disabled={disabled} className={className} onClick={onClick}>
      {title}
    </button>
  );
};

Button.displayName = "Button";

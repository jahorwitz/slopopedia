export const Button = ({
  title,
  className,
  onClick,
  disabled = false,
  children,
}) => {
  return (
    <button disabled={disabled} className={className} onClick={onClick}>
      {children}
      {title}
    </button>
  );
};

Button.displayName = "Button";

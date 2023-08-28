export function ModalForm({ children, onSubmit, buttonText }) {
  return (
    <>
      <form
        className="flex items-center space-x-6 flex-col"
        onSubmit={onSubmit}
      >
        {children}
      </form>
      <button className="">{buttonText}</button>
    </>
  );
}

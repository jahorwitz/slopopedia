export const Footer = ({ children }) => {
  return <footer className="">{children}</footer>;
};

Footer.Content = () => {
  return (
    <div className="flex flex-row justify-between">
      <div className="font-arial text-gray text-base">
        <p className="">2023 The Slop Goblin's Web Reference</p>
      </div>
      <div className="font-arial text-gray text-base">
        <p className="">Contact: hello@theslopgoblins.com</p>
      </div>
      <div className="font-arial text-gray text-base">
        <p className="">Privacy policy</p>
      </div>
      <div className="font-arial text-gray text-base">
        <p className="">Terms & Conditions</p>
      </div>
      <div className="font-arial text-gray text-base">
        <p className="">Cookies</p>
      </div>
    </div>
  );
};

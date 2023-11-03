export const Footer = ({ children }) => {
  return <footer className="">{children}</footer>;
};

Footer.Content = () => {
  return (
    <div className="flex flex-row justify-between max-w-[989px] mx-auto xs:flex-col xs:ml-5 sm:ml-5  sm:flex-col">
      <div className="font-arial text-gray-500 text-sm xs:mb-4 sm:mb-4">
        <p className="">©2023 The Slop Goblin's Web Reference</p>
      </div>
      <div className="font-arial text-gray-500 text-sm xs:mb-4 sm:mb-4 ">
        <p className="">Contact: hello@theslopgoblins.com</p>
      </div>
      <div className="font-arial text-gray-500 text-sm xs:mb-4 sm:mb-4">
        <p className="">Privacy policy</p>
      </div>
      <div className="font-arial text-gray-500 text-sm xs:mb-4 sm:mb-4">
        <p className="">Terms & Conditions</p>
      </div>
      <div className="font-arial text-gray-500 text-sm xs:mb-4 sm:mb-4">
        <p className="">Cookies</p>
      </div>
    </div>
  );
};

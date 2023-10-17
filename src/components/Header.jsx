import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import headerArrow from "../images/global-header-arrow.svg";
import headerBook from "../images/global-header-book.svg";
import headerDoor from "../images/global-header-door.svg";
import headerLogo from "../images/global-header-logo.svg";
import headerMagnifyglass from "../images/global-header-magnifyglass.svg";
import headerNew from "../images/global-header-new.svg";
import headerSmile from "../images/global-header-smile.svg";
import headerStar from "../images/global-header-star.svg";

export const Header = ({ children }) => {
  return (
    <header className="flex flex-row w-full relative z-10  pl-5 pr-5  max-w-[1440px] mx-auto  justify-between items-center  text-lg font-arialRegular x-0   content-center h-20 bg-black text-stone-50  xs:pl-2 xs:pr-2  md: text-md md:pr-2 md:pl-2  ">
      {children}
    </header>
  );
};

Header.Logo = () => {
  return (
    <img
      className="w-80 pt-4 xs:w-60 md:w-70 "
      src={headerLogo}
      alt="slopopedia logo"
    />
  );
};

Header.NavLinks = () => {
  const [open, setOpen] = useState(false);

  const handleMenu = () => {
    setOpen((prev) => !prev);
  };

  const navLinks = [
    {
      title: "Slop Search",
      src: headerMagnifyglass,
      link: "#",
    },
    {
      title: "Submit Slop",
      src: headerArrow,
      link: "#",
    },
    {
      title: "Slop Blog",
      src: headerBook,
      link: "#",
    },
    {
      title: "I'm Feeling Sloppy",
      src: headerStar,
      link: "#",
    },
    {
      title: "Log In",
      src: headerSmile,
      link: "#",
    },
    {
      title: "Sign Up",
      src: headerDoor,
      link: "#",
    },
  ];
  return (
    <div className="h-[24px] ">
      <div className="flex flex-row h-[24px] gap-8 md:gap-4 xs:hidden sm:hidden relative ">
        {navLinks.slice(0, navLinks.length - 2).map((link, index) => (
          <div key={index} className="flex flex-row gap-2.5 ">
            <img className="w-6 h-5 mt-1.5" src={link.src} alt={link.title} />
            <a className="border-b-2 " href={link.link}>
              {link.title}
            </a>
          </div>
        ))}
        <img src={headerNew} className="absolute right-[200px] bottom-[6px]" />
      </div>
      {/* hamburger button */}
      <div className="xs: block sm:block  relative"></div>
      <div className="flex justify-end  pt-5 xs:pr-0 xs:pt-0 sm:pt-0 md:pt-0 ">
        <button
          type="button"
          onClick={handleMenu}
          className=" inline-flex items-center justify-center p-2  
                text-white-400 hover:text-grey hover:bg-gray-700 focus:ring-2 
                focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white xs:block sm:block  lg: hidden xl: hidden "
        >
          <span className="sr-only">Open Main Menu</span>
          {open == true ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      {/* hamburger-menu */}
      {open ? (
        <div className="pt-5 right-0.5 absolute  xs:block sm:block  lg: hidden xl: hidden">
          <div className=" space-y-1  ">
            {navLinks.map((link, index) => (
              <a
                key={index}
                className="text-grey-300 bg-black hover:bg-gray-700 hover:text-white
                                block px-1 py-2 text-base font-medium border-b-2 gap-2.5"
                href={link.link}
              >
                <img
                  className="w-5 h-5 inline-block mr-1 "
                  src={link.src}
                  alt={link.title}
                />
                {link.title}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

Header.Profile = () => {
  return (
    <div className="  flex flex-row h-[24px]    gap-2.5 md: gap-1 md:pl-4 md:flex  lg:flex xl:flex sm: hidden xs: hidden ">
      <a href="#" className=" border-b-2  ">
        Log in
      </a>
      <p>/</p>
      <a href="#" className=" border-b-2 ">
        Sign Up
      </a>
      <img className="w-5 h-5 mt-1" src={headerDoor} alt="door icon" />
    </div>

    // Functionality needs to be added, this will be for when a user logs in. This will take user to profile. It will replace the Log in/Sign up part of the header

    // <div className="flex flex-row h-[24px]    gap-2.5 md: gap-1 md:pl-4 md:flex  lg:flex xl:flex sm: hidden xs: hidden">
    // <a href="#" className="border-b-2 ">DanilaTing</a>
    // <img className="w-6 h-6 mt-0.5" src={headerSmile} />
    // </div>
  );
};

Header.displayName = "Header";
Header.Logo.displayName = "Header.Logo";
Header.NavLinks.displayName = "Header.NavLinks";
Header.Profile.displayName = "Header.Profile";

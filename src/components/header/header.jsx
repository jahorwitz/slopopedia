import { useQuery } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GET_USER_AUTHENTICATION } from "../../graphql/get-user-authentication";
import headerArrow from "../../images/global-header-arrow.svg";
import headerBook from "../../images/global-header-book.svg";
import headerDoor from "../../images/global-header-door.svg";
import headerLogo from "../../images/global-header-logo.svg";
import headerMagnifyglass from "../../images/global-header-magnifyglass.svg";
import headerNew from "../../images/global-header-new.svg";
import headerSmile from "../../images/global-header-smile.svg";
import headerStar from "../../images/global-header-star.svg";
import { useModals } from "../../store";
import { CurrentUserContext } from "../../store/current-user-context";
import { Button, LoginModal, SignupModal } from "../index";

export const Header = () => {
  const [token, setToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const { data, loading, error } = useQuery(GET_USER_AUTHENTICATION);
  const { registerModal, openModal, closeModal } = useModals();
  const [open, setOpen] = useState(false);
  const jwt = localStorage.getItem("jwt");

  // const isLoggedIn = useMemo(() => {
  //   return true ? token !== "" : false;
  // }, [token]);

  const handleMenu = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    registerModal("signin", <LoginModal onClose={closeModal} />);
    registerModal("signup", <SignupModal closeModal={closeModal} />);
  }, []);

  useEffect(() => {
    if (jwt) {
      setToken(jwt);
    }

    if (data && data.authenticatedItem) {
      setCurrentUser(data.authenticatedItem);
      setIsLoggedIn(true);
    }
    //needed to change value of isLoggedIn when a user logs in
    //logging in happens in login-modal.jsx and

    if (Object.values(currentUser).length > 0) {
      setIsLoggedIn(true);
    }
  }, [jwt, data, currentUser]);
  return (
    <header className="flex flex-row w-full relative z-10 pl-5 pr-5 mx-auto justify-between items-center text-lg font-arialRegular x-0 content-center h-20 bg-black text-stone-50 xs:pl-2 xs:pr-2 md:text-md md:pr-2 md:pl-2">
      <Header.Logo />
      <Header.NavLinks
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        openModal={openModal}
        handleMenu={handleMenu}
        open={open}
      />
      <Header.Profile
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        openModal={openModal}
      />
    </header>
  );
};

Header.Logo = () => {
  return (
    <Link to="/">
      <img
        className="w-80 pt-4 xs:w-60 md:w-70 "
        src={headerLogo}
        alt="slopopedia logo"
      />
    </Link>
  );
};

Header.NavLinks = ({
  isLoggedIn,
  currentUser,
  openModal,
  open,
  handleMenu,
}) => {
  const navLinks = [
    {
      title: "Slop Search",
      src: headerMagnifyglass,
      link: "/search",
    },
    {
      title: "Submit Slop",
      src: headerArrow,
      link: "/submit",
    },
    {
      title: "Slop Blog",
      src: headerBook,
      link: "/blog",
    },
    {
      title: "I'm Feeling Sloppy",
      src: headerStar,
      link: "/sounds",
    },
  ];

  const buttons = [
    {
      title: "Log In",
      src: headerSmile,
      onClick: () => {
        openModal("signin");
      },
    },
    {
      title: "Sign Up",
      src: headerDoor,
      onClick: () => {
        openModal("signup");
      },
    },
  ];

  return (
    <div className="h-[24px] ">
      <div className="flex flex-row h-[24px] gap-8 md:gap-4 xs:hidden sm:hidden relative ">
        {navLinks.map((link, index) => (
          <div key={index} className="flex flex-row gap-2.5 ">
            <img className="w-6 h-5 mt-1.5" src={link.src} alt={link.title} />
            <Link to={link.link} className="border-b-2 ">
              {link.title}
            </Link>
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
                focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white xs:block sm:block  lg:hidden xl:hidden "
        >
          <span className="sr-only">Open Main Menu</span>
          {open == true ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      {/* hamburger-menu */}
      {open ? (
        <div className="pt-5 right-0.5 absolute xs:block sm:block lg:hidden xl:hidden">
          <div className=" space-y-1  ">
            {navLinks.map((link) => (
              <Link
                key={link.title}
                className="text-grey-300 bg-black hover:bg-gray-700 hover:text-white
                                block px-1 py-2 text-base font-medium border-b-2 gap-2.5"
                to={link.link}
              >
                <img
                  className="w-5 h-5 inline-block mr-1 "
                  src={link.src}
                  alt={link.title}
                />
                {link.title}
              </Link>
            ))}
            {isLoggedIn === false ? (
              buttons.map((button) => (
                <div
                  key={button.title}
                  className="flex bg-black h-[37px] text-grey-300 hover:bg-gray-700 hover:text-white border-b-2"
                >
                  <img
                    className="w-5 h-5 mt-2 ml-1"
                    src={button.src}
                    alt={button.title}
                  />
                  <Button
                    variant="link"
                    onClick={button.onClick}
                    className="justify-self-start bg-black py-2 text-base font-medium hover:bg-gray-700 hover:text-white gap-2.5 "
                  >
                    {button.title}
                  </Button>
                </div>
              ))
            ) : (
              <div className="flex bg-black h-[37px] text-grey-300 hover:bg-gray-700 hover:text-white border-b-2">
                <img
                  className="w-5 h-5 mt-2 ml-1 mr-1"
                  src={headerSmile}
                  alt={currentUser.username}
                />
                <div className="flex flex-row h-[24px] mt-1 gap-2.5 md:gap-1 md:pl-4 md:flex lg:flex xl:flex ">
                  <a href="/profile">{currentUser.username}</a>
                </div>
              </div>
            )}
            {/* this code below needs functionality added to it when a user is logged in this should show in the hamburger menu. similar to the header.profile section below*/}
            {/* {buttons.slice(2, 3).map((button, index) => (
                <div key={index} className="flex  bg-black h-[37px] text-grey-300 hover:bg-gray-700 hover:text-white border-b-2">
                <img className="w-5 h-5  mt-2 ml-1  " src={button.src} alt={button.title} />
                <Button variant="link" title={button.title}  className="justify-self-start bg-black  py-2 text-base font-medium hover:bg-gray-700 hover:text-white gap-2.5 w-[163px] h-[37px] " />
              </div>
              ))} */}
          </div>
        </div>
      ) : null}
    </div>
  );
};

Header.Profile = ({ currentUser, isLoggedIn, openModal }) => {
  return (
    <>
      {isLoggedIn === false ? (
        <div className="flex flex-row h-[24px] gap-2.5 md:gap-1 md:pl-4 md:flex lg:flex sm:hidden xs:hidden">
          <Button
            className={"border-b-2"}
            size="base"
            variant="secondary"
            children="Log In"
            onClick={() => {
              openModal("signin");
            }}
          ></Button>
          <p>/</p>
          <Button
            className={"border-b-2"}
            size="base"
            variant="secondary"
            children="Sign Up"
            onClick={() => {
              openModal("signup");
            }}
          ></Button>
          <img className="w-5 h-5 mt-1" src={headerDoor} alt="door icon" />
        </div>
      ) : (
        <div className="flex flex-row h-[24px] gap-2.5 md:gap-1 md:pl-4 md:flex lg:flex xl:flex sm:hidden xs:hidden">
          <a href="/profile" className="border-b-2">
            {currentUser.username}
          </a>
          <img className="w-6 h-6 mt-0.5" src={headerSmile} />
        </div>
      )}
    </>
  );
};

Header.displayName = "Header";
Header.Logo.displayName = "Header.Logo";
Header.NavLinks.displayName = "Header.NavLinks";
Header.Profile.displayName = "Header.Profile";

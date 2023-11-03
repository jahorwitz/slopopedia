import { useEffect, useState } from "react";
import {
  Footer,
  Header,
  ProfileHorizontalMenu,
  ProfileSidebar,
  Tabber,
} from "./index";

export const Profile = () => {
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const sidebar = () => {
    return (
      <div className="flex flex-row mt-10">
        <div className="mr-32 ml-5 ">
          <ProfileSidebar />
        </div>
        <Tabber />
      </div>
    );
  };

  const horizontalmenu = () => {
    return (
      <div>
        <ProfileHorizontalMenu />
        <div className="mt-8 ml-5">
          <Tabber />
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-[1440px] min-h-[1023px] bg-gray-background mx-auto">
      <Header>
        <Header.Logo />
        <Header.NavLinks />
        <Header.Profile />
      </Header>
      {screenSize < 1170 ? horizontalmenu() : sidebar()}
      <div className="mt-32 ">
        <Footer>
          <Footer.Content />
        </Footer>
      </div>
    </div>
  );
};

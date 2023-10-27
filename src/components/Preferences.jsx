import { useEffect, useState } from "react";
import { Header, HorizontalMenu, PageTitle, Sidebar } from "./index";

export const Preferences = () => {
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
    const sidebarItems = [
      {
        title: "People",
        link: "#",
      },
      {
        title: "Production",
        link: "#",
      },
      {
        title: "Critters & Characters",
        link: "#",
      },
      {
        title: "Writing",
        link: "#",
      },
      {
        title: "Hairstyles",
        link: "Other Preferences",
      },
      {
        title: "Green Threshold",
        link: "#",
      },
    ];

    return (
      <div className="flex flex-row mt-10">
        <div className="xs:hidden sm:hidden md:block lg:block xl:block">
          <Sidebar />
        </div>
        <PageTitle
          title="SLOP PREFERENCES"
          className="font-arialNarrow text-xl"
        />
      </div>
    );
  };

  const horizontalmenu = () => {
    return (
      <div>
        <div className="xs:block sm:block md:hidden lg:hidden xl:hidden">
          <HorizontalMenu />
        </div>
        <PageTitle
          title="SLOP PREFERENCES"
          className="font-arialNarrow text-2xl pt-10 scale-2"
        />
      </div>
    );
  };

  return (
    <div className="max-w-[1440px] mx-auto">
      <Header>
        <Header.Logo />
        <Header.NavLinks />
        <Header.Profile />
      </Header>
      {screenSize < 1170 ? horizontalmenu() : sidebar()}
    </div>
  );
};

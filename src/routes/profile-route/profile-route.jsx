import { useMediaQuery } from "react-responsive";
import { Route, Routes } from "react-router";
import { ProfileFestsRoute } from ".";
import { Footer, Header, Tabber } from "../../components";
import { ProfileHorizontalMenu } from "./profile-horizontal-menu";
import { ProfileSidebar } from "./profile-sidebar";

export const ProfileRoute = () => {
  const isDesktopSize = useMediaQuery({
    query: "(min-width: 1170px)",
  });

  return (
    <div className="max-w-[1440px] bg-gray-background mx-auto min-h-screen relative">
      <Header>
        <Header.Logo />
        <Header.NavLinks />
        <Header.Profile />
      </Header>
      <div className={isDesktopSize ? "flex" : "flex flex-col"}>
        {isDesktopSize ? <ProfileSidebar /> : <ProfileHorizontalMenu />}
        <div className="mt-10">
          <Routes>
            <Route path="/" element={<Tabber />} />
            <Route path="/fests" element={<ProfileFestsRoute />} />
          </Routes>
        </div>
      </div>
      <div className="absolute w-full bottom-0">
        <Footer />
      </div>
    </div>
  );
};

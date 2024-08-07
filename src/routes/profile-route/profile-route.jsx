import { useMediaQuery } from "react-responsive";
import { Footer, Header } from "../../components/";
import { ProfileHorizontalMenu } from "./profile-horizontal-menu";
import { ProfileSidebar } from "./profile-sidebar";
import { WatchlistTabber } from "./watchlist-tabber";

export const ProfileRoute = () => {
  const isDesktopSize = useMediaQuery({
    query: "(min-width: 1170px)",
  });

  return (
    <div
      className="bg-gray-background mx-auto min-h-screen relative"
      data-test-id="profile-route-container"
    >
      <Header data-test-id="profile-route-header">
        <Header.Logo />
        <Header.NavLinks />
        <Header.Profile />
      </Header>
      <div className={isDesktopSize ? "flex" : "flex flex-col"}>
        {isDesktopSize ? (
          <ProfileSidebar data-test-id="profile-route-sidebar" />
        ) : (
          <ProfileHorizontalMenu data-test-id="profile-route-profile-horizantal-menue" />
        )}
        <div className="w-[950px]">
          <WatchlistTabber data-test-id="profile-route-watchlist-tabber" />
        </div>
      </div>
      <div
        className="absolute w-full bottom-0"
        data-test-id="profile-route-footer-container"
      >
        <Footer data-test-id="profile-route-footer" />
      </div>
    </div>
  );
};

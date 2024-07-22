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
      data-test-id="profil-route-container"
    >
      <Header data-test-id="profil-route-header">
        <Header.Logo />
        <Header.NavLinks />
        <Header.Profile />
      </Header>
      <div className={isDesktopSize ? "flex" : "flex flex-col"}>
        {isDesktopSize ? (
          <ProfileSidebar data-test-id="profil-route-sidebar" />
        ) : (
          <ProfileHorizontalMenu data-test-id="profil-route-profile-horizantal-menue" />
        )}
        <div className="w-[950px]">
          <WatchlistTabber data-test-id="profil-route-watchlist-tabber" />
        </div>
      </div>
      <div
        className="absolute w-full bottom-0"
        data-test-id="profil-route-footer-container"
      >
        <Footer data-test-id="profil-route-footer" />
      </div>
    </div>
  );
};

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
    <div className="max-w-[1440px] bg-gray-background mx-auto min-h-screen relative">
      <Header>
        <Header.Logo />
        <Header.NavLinks />
        <Header.Profile />
      </Header>
      <div className="flex">
        {isDesktopSize ? <ProfileSidebar /> : <ProfileHorizontalMenu />}
        <div className="w-[950px]">
          <WatchlistTabber />
        </div>
      </div>

      <div className="mt-32 ">
        <Footer />
      </div>
    </div>
  );
};

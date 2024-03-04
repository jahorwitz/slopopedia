import { useMediaQuery } from "react-responsive";
import { Footer, Header, Tabber } from "../../components";
import { ProfileHorizontalMenu } from "./profile-horizontal-menu";
import { ProfileSidebar } from "./profile-sidebar";

export const ProfileRoute = () => {
  const isDesktopSize = useMediaQuery({
    query: "(min-width: 1170px)",
  });

  return (
    <div className="max-w-[1440px] min-h-[1023px] bg-black/[0.06] mx-auto">
      <Header>
        <Header.Logo />
        <Header.NavLinks />
        <Header.Profile />
      </Header>
      <div className="flex">
        {isDesktopSize ? <ProfileSidebar /> : <ProfileHorizontalMenu />}
        <div className="mt-10">
          <Tabber />
        </div>
      </div>

      <div className="mt-32 ">
        <Footer />
      </div>
    </div>
  );
};

import { useMediaQuery } from "react-responsive";
import { NavLink } from "react-router-dom";
import { Header } from "../../components/index";
import imgPreferences from "../../images/slop-pref-icon.svg";
import { ProfileHorizontalMenu, ProfileSidebar } from "./index";

export const ProfileRecommendRoute = () => {
  const isDesktopSize = useMediaQuery({
    query: "(min-width: 1170px)",
  });

  return (
    <div className="mx-auto">
      <Header>
        <Header.Logo />
        <Header.NavLinks />
        <Header.Profile />
      </Header>
      <section
        className={`relative flex max-w-[1440px] min-h-[1023px] bg-gray-background ${
          isDesktopSize ? "" : "items-center flex-col"
        }`}
      >
        {isDesktopSize ? <ProfileSidebar /> : <ProfileHorizontalMenu />}
        <div className="flex mr-auto ml-auto flex-col w-[712px] mt-10">
          <div className="flex flex-row items-center justify-between pb-10">
            <h2 className="scale-y-2 font-arialBold w-[250px] text-xl uppercase">
              top 10 from wishlist
            </h2>
          </div>
          <div className="flex flex-col"></div>
        </div>
        <NavLink
          to="/profile/preferences"
          end
          className="absolute top-[40px] right-[20px] flex gap-5 text-lg font-arialBold decoration-solid decoration-2 hover:underline hover:opacity-100"
        >
          <img
            className="h-8 w-8 "
            src={imgPreferences}
            alt="Slop Preferences"
          />
          Slop preferences
        </NavLink>
      </section>
    </div>
  );
};

import { useMediaQuery } from "react-responsive";
import { Header } from "../../components/index";
import { ProfileHorizontalMenu, ProfileSidebar } from "./index";

export const ProfileRecommendRoute = () => {
  const isDesktopSize = useMediaQuery({
    query: "(min-width: 1170px)",
  });

  //   const preferencesLink = {
  //     title: "Slop Preferences",
  //     src: undefined,
  //     link: "/profile/preferences",
  //   };

  return (
    <div className="mx-auto">
      <Header>
        <Header.Logo />
        <Header.NavLinks />
        <Header.Profile />
      </Header>
      <section
        className={`flex max-w-[1440px] min-h-[1023px] bg-gray-background ${
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
        {/* <Sidebar.Item item={preferencesLink} /> */}
      </section>
    </div>
  );
};

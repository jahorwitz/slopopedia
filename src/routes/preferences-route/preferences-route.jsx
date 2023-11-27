import { useMediaQuery } from "react-responsive";
import { Footer, Header } from "../../components";
import { PreferencesHorizontalMenu } from "./preferences-horizontal-menu";
import { PreferencesSidebar } from "./preferences-sidebar";

export const PreferencesRoute = () => {
  const isDesktopSize = useMediaQuery({
    query: "(min-width: 1170px)",
  });

  return (
    <div className="max-w-[1440px] min-h-[1023px] bg-gray-background mx-auto">
      <Header>
        <Header.Logo />
        <Header.NavLinks />
        <Header.Profile />
      </Header>
      {isDesktopSize ? <PreferencesSidebar /> : <PreferencesHorizontalMenu />}
      <div className="mt-32">
        <Footer />
      </div>
    </div>
  );
};

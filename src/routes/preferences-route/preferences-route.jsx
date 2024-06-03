import { useMediaQuery } from "react-responsive";
import { Footer, Header } from "../../components";
// import { PreferencesHorizontalMenu } from "./preferences-horizontal-menu";
import { PreferencesSidebar } from "./preferences-sidebar";

export const PreferencesRoute = () => {
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
      <PreferencesSidebar />
      {/* {isDesktopSize ? <PreferencesSidebar /> : <PreferencesHorizontalMenu />} */}
      <div className="mt-32">
        <Footer />
      </div>
    </div>
  );
};

import { useQuery } from "@apollo/client";

import { useMediaQuery } from "react-responsive";
import { Footer, Header, Loading } from "../../components";
// import { PreferencesHorizontalMenu } from "./preferences-horizontal-menu";
import { GET_KW_TYPES } from "../../graphql";
import { PreferencesSidebar } from "./preferences-sidebar";

export const PreferencesRoute = () => {
  const isDesktopSize = useMediaQuery({
    query: "(min-width: 1170px)",
  });

  const { loading, data } = useQuery(GET_KW_TYPES);
  console.log();

  if (loading) {
    return (
      <div className="mx-auto py-10">
        <Loading />
      </div>
    );
  }

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

import { useQuery } from "@apollo/client";
import { useMediaQuery } from "react-responsive";
import { Button, Footer, Header, Loading } from "../../components";
import Radio from "../../components/form/advanced-form-inputs/radio";
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

      <div className="flex flex-row mt-10 ">
        <div className=" xs:hidden sm:hidden md:block lg:block xl:block">
          <PreferencesSidebar />
          {/* {isDesktopSize ? (
            <PreferencesSidebar />
          ) : (
            <PreferencesHorizontalMenu />
          )} */}
        </div>
        <div className="flex flex-col pl-36">
          <h1 className=" font-arialBold text-lg scale-y-[2.0]">
            SLOP PREFERENCES
          </h1>
          <div className="min-w-[600px]  mt-10 ">
            <div>
              <Radio label={"label"} />
            </div>
          </div>
        </div>
        <Button
          title="Save"
          className="bg-yellow-button w-56 h-12 font-arialBold ml-32 mt-[696px] text-lg mr-10"
        />
      </div>

      <div className="mt-32">
        <Footer />
      </div>
    </div>
  );
};

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
  console.log(data);

  if (loading) {
    return (
      <div className="mx-auto py-10">
        <Loading />
      </div>
    );
  }

  const values = [
    {
      label: "Hell Yes",
      value: 3,
    },
    {
      label: "Yes",
      value: 2,
    },
    {
      label: "Probably",
      value: 1,
    },
    {
      label: "Dun Care",
      value: 0,
    },
    {
      label: "Prob Not",
      value: -1,
    },
    {
      label: "No",
      value: -2,
    },
    {
      label: "Hell No",
      value: -3,
    },
  ];

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
          <div className="min-w-[600px] mt-10 flex flex-col gap-5">
            {data.keywordTypes.map((keyword) => {
              return (
                <div className="flex gap-4 flex-col">
                  <h2 className="font-normal">{keyword.name}</h2>
                  <div className="flex justify-between pb-4 border-b border-slate-400">
                    {values.map((item, index) => {
                      return (
                        <div key={index} className="flex  ">
                          <div className="mt-1">
                            <Radio
                              label={item.label}
                              value={item.value}
                              title={keyword.name}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
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

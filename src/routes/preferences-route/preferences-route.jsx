import { useMutation, useQuery } from "@apollo/client";
import { useContext, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Button, Footer, Header, Loading } from "../../components";
import Radio from "../../components/form/advanced-form-inputs/radio";
import { GET_KW_TYPES } from "../../graphql";
import { CREATE_USER_KEYWORD } from "../../graphql/create-user-keywords";
import { CurrentUserContext } from "../../store";
import { PreferencesSidebar } from "./preferences-sidebar";

export const PreferencesRoute = () => {
  const { currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn } =
    useContext(CurrentUserContext);

  const [preferencList, setPreferenceList] = useState([]);

  const [createUserKeyword] = useMutation(CREATE_USER_KEYWORD);

  const isDesktopSize = useMediaQuery({
    query: "(min-width: 1170px)",
  });

  const { loading, data } = useQuery(GET_KW_TYPES);

  const onSubmit = async () => {
    console.log(preferencList);

    preferencList.forEach((item) => {
      // console log left in until final code review is complete and can then be deleted
      // console.log(item);
      // console.log(currentUser.id);
      // const userId = currentUser.id;
      // console.log(userId);

      try {
        createUserKeyword({
          variables: {
            data: {
              user: {
                connect: { id: userId },
              },
              keyword: { connect: { name: item.name } },
              value: parseInt(item.value),
            },
          },
        });
      } catch (err) {
        console.error("Error in createUserKeyword request", err);
      }
      // A finaly block can be added here to clear the react state but is not necisary as the react state clears on refresh
    });
  };

  // selecting a radio button in the preference list updates the preferenceList react state which is an
  // array of objects that has the keyword and their associated values that can be used to make a graphQL call
  const onChangeValue = (event) => {
    const { name, value } = event.target;
    console.log(value);
    console.log(name);
    console.log(event.target);

    const currentList = preferencList;

    // updates the object in the array if the keyword object already exists
    const updatedList = currentList.map((item) =>
      item.name === name ? { name, value } : item
    );

    // adds the keyword object to the array if it does not already exist
    if (!currentList.some((item) => item.name === name)) {
      updatedList.push({ name, value });
    }

    setPreferenceList(updatedList);
  };

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
          <PreferencesSidebar titles={data.keywordTypes} />
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
          <div>
            {/* this mostrosity renders all kewords groupped by keword types */}
            {data.keywordTypes.map((keywordType) => {
              return (
                <div>
                  <h2>{keywordType.name}</h2>
                  <div className="min-w-[600px] mt-10 flex flex-col gap-4">
                    {keywordType.keywords.map((keyword) => {
                      return (
                        <div className="flex gap-1 flex-col" key={keyword.id}>
                          <h3 className="font-normal">{keyword.name}</h3>
                          <div className="flex justify-between pb-2 border-b border-slate-400">
                            {values.map((item, index) => {
                              return (
                                <div key={index} className="flex  ">
                                  <div className="mt-1">
                                    <Radio
                                      label={item.label}
                                      value={item.value}
                                      title={keyword.name}
                                      onChange={onChangeValue}
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
              );
            })}
          </div>
          <div className="min-w-[600px] mt-10 flex flex-col gap-4"></div>
        </div>
        <Button
          title="Save"
          className="bg-yellow-button w-56 h-12 font-arialBold ml-32 mt-[696px] text-lg mr-10"
          onClick={onSubmit}
        >
          Save
        </Button>
      </div>

      <div className="mt-32">
        <Footer />
      </div>
    </div>
  );
};

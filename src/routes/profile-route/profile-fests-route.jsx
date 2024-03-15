import { useMutation, useQuery } from "@apollo/client";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import {
  Button,
  Footer,
  Header,
  Keyword,
  SlopFestModal,
} from "../../components/index";
import { GET_FEST, GET_USER_FESTS, UPDATE_FEST } from "../../graphql";
import { useCurrentUser, useModals } from "../../hooks";
import checkMarkBlack from "../../images/check-mark-dark.svg";
import checkMarkWhite from "../../images/check-mark.svg";
import { ProfileHorizontalMenu, ProfileSidebar } from "./index";

export const ProfileFestsRoute = () => {
  //const [buttonText, setButtonText] = useState("I'm going!");
  //const [buttonVariant, setButtonVariant] = useState("outline-secondary");
  //const [buttonSrc, setButtonSrc] = useState(checkMarkWhite);
  const { currentUser } = useCurrentUser();
  console.log(currentUser.id);

  const currentDate = new Date().toLocaleString("default", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  // const changeButtonAttributes = () => {
  //   if (buttonText !== "I'm going!") {
  //     setButtonText("I'm going!");
  //     setButtonVariant("outline-secondary");
  //     setButtonSrc(checkMarkBlack);
  //   } else {
  //     setButtonText("I went");
  //     setButtonVariant("secondary");
  //     setButtonSrc(checkMarkWhite);
  //   }
  // };

  const { loading, data } = useQuery(GET_USER_FESTS, {
    variables: {
      where: {
        invitees: {
          some: {
            id: {
              equals: currentUser.id,
            },
          },
        },
      },
    },
  });

  const [
    updateFest,
    { data: updateData, loading: updateLoading, error: updateError },
  ] = useMutation(UPDATE_FEST, { refetchQueries: [GET_USER_FESTS] });

  const festQuery = useQuery(GET_FEST, { variables: { where: {} } });
  const festsQuery = useQuery(GET_USER_FESTS, { variables: { where: {} } });

  //invitees should be the default array someone is added to for a fest
  //when someone clicks I'm going, move to "attendees" array, turn button black
  //when someone clicks again,  move to "invitees" array, turn button white
  //when enddate has passed, button is "I went" for all who attended
  //otherwise button disappears completely if the fest is in the past but user did not attend

  const handleRSVPButtonClick = (festId) => {
    //isolate the fest that was clicked on only
    console.log(festId);
    //use festID to determine if they're currently attendee vs invitee
    //then update fest accordingly

    updateFest({
      variables: {
        data: {
          attendees: {
            connect: [{ id: currentUser.id }],
          },
        },
        where: {
          id: festId,
        },
      },
    });
    //need "disconnect" option as well
  };

  // useEffect(() => {
  //setup useEffect to set correct button styles at page load?
  // });

  const isDesktopSize = useMediaQuery({
    query: "(min-width: 1170px)",
  });

  const { registerModal, openModal, closeModal } = useModals();

  useEffect(() => {
    registerModal("create", <SlopFestModal onClose={closeModal} />);
  }, []);

  return (
    <div className="max-w-[1440px] mx-auto">
      <Header>
        <Header.Logo />
        <Header.NavLinks />
        <Header.Profile />
      </Header>
      <section className="flex max-w-[1440px] min-h-[1023px] bg-gray-background">
        {isDesktopSize ? <ProfileSidebar /> : <ProfileHorizontalMenu />}
        <div className="flex flex-col w-[712px] mt-10">
          <div className="flex flex-row items-center justify-between pb-10">
            <h2 className="scale-y-2 font-arialBold w-[250px] text-xl">
              {!loading && data.fests.length === 0
                ? "YOU HAVE NO FESTS :("
                : "YOUR FESTS"}
            </h2>
            <Button
              variant="primary"
              className="w-[224px]"
              onClick={() => {
                openModal("create");
              }}
            >
              New Fest!
            </Button>
          </div>
          <div className="flex flex-col">
            {!loading &&
              data.fests.map((items, index) => {
                const startDate = new Intl.DateTimeFormat("en-US").format(
                  new Date(items.startDate)
                );
                const endDate = new Intl.DateTimeFormat("en-US").format(
                  new Date(items.endDate)
                );
                // const isClicked = items.some((click) => click.id === items.id);
                return (
                  <div
                    key={index}
                    className="flex flex-row justify-between mb-5 border-b border-black"
                  >
                    <div className="mb-5">
                      <h3 className="font-arialBold mb-2.5">
                        <Link to={`/fests/${items.id}`}>{items.name}</Link>
                      </h3>
                      <p className="font-arialRegular mb-2.5">
                        {startDate + " - " + endDate}
                      </p>
                      <div className="mt-3">
                        <h3>Fest Invitees</h3>
                        <div className="flex flex-row">
                          {items.invitees.length <= 4
                            ? items.invitees?.map((invitee) => {
                                return (
                                  <Keyword
                                    key={invitee.username}
                                    className="h-31px space-x-2 space-y-2 bg-gray xs:space-x-2 xs:space-y-2 text-black text-center mr-2.5"
                                    keyword={invitee.username}
                                  />
                                );
                              })
                            : items.invitees.slice(0, 4).map((invitee) => {
                                // needs to have {+ invitees.length - 5} to show how many invitees after 5
                                return (
                                  <>
                                    <div>
                                      <Keyword
                                        key={invitee.username}
                                        className="h-31px space-x-2 space-y-2 bg-gray xs:space-x-2 xs:space-y-2 text-black text-center mr-2.5"
                                        keyword={invitee.username}
                                      />
                                    </div>
                                  </>
                                );
                              })}
                          {items.invitees.length > 4 ? (
                            <Keyword
                              key={index}
                              className="h-31px space-x-2 space-y-2 bg-gray xs:space-x-2 xs:space-y-2 text-black text-center mr-2.5"
                              keyword={`+ ${items.invitees.length - 4} more`}
                            />
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div className="mt-3">
                        <h3>Fest Attendees</h3>
                        <div className="flex flex-row">
                          {items.attendees.length <= 4
                            ? items.attendees?.map((attendee) => {
                                return (
                                  <Keyword
                                    key={attendee.username}
                                    className="h-31px space-x-2 space-y-2 bg-gray xs:space-x-2 xs:space-y-2 text-black text-center mr-2.5"
                                    keyword={attendee.username}
                                  />
                                );
                              })
                            : items.attendees.slice(0, 4).map((attendee) => {
                                // needs to have {+ attendees.length - 5} to show how many attendees after 5
                                return (
                                  <>
                                    <div>
                                      <Keyword
                                        key={attendee.username}
                                        className="h-31px space-x-2 space-y-2 bg-gray xs:space-x-2 xs:space-y-2 text-black text-center mr-2.5"
                                        keyword={attendee.username}
                                      />
                                    </div>
                                  </>
                                );
                              })}
                          {items.attendees.length > 4 ? (
                            <Keyword
                              key={index}
                              className="h-31px space-x-2 space-y-2 bg-gray xs:space-x-2 xs:space-y-2 text-black text-center mr-2.5"
                              keyword={`+ ${items.attendees.length - 4} more`}
                            />
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                    {/* Button may need to be changed in future updates to include onClick functionality */}
                    {/* Currently going and went states are based off endDate vs currentDate */}
                    {dayjs().isAfter(items.endDate) ? (
                      <Button
                        variant={"secondary"}
                        className="flex flex-row mb-5 h-10"
                        size="sm"
                        // onClick={""}
                      >
                        <img
                          src={checkMarkWhite}
                          alt="check mark"
                          className="mr-2.5"
                        />
                        I went
                      </Button>
                    ) : (
                      <Button
                        variant={"outline-secondary"}
                        className="flex flex-row mb-5 h-10"
                        size="sm"
                        onClick={() => handleRSVPButtonClick(items.id)}
                      >
                        <img
                          src={checkMarkBlack}
                          alt="check mark"
                          className="mr-2.5"
                        />
                        I'm going!
                      </Button>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </section>
      <div className="mt-32 ">
        <Footer />
      </div>
    </div>
  );
};

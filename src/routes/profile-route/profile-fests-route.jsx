import { useMutation, useQuery } from "@apollo/client";
import dayjs from "dayjs";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { Button, Header, Keyword, SlopFestModal } from "../../components/index";
import { GET_USER_FESTS, UPDATE_FEST } from "../../graphql";
import { useCurrentUser, useModals } from "../../hooks";
import checkMarkBlack from "../../images/check-mark-dark.svg";
import checkMarkWhite from "../../images/check-mark.svg";
import { ProfileHorizontalMenu, ProfileSidebar } from "./index";

export const ProfileFestsRoute = () => {
  const { currentUser } = useCurrentUser();
  const { openModal, closeModal } = useModals();
  const isDesktopSize = useMediaQuery({
    query: "(min-width: 1170px)",
  });
  const { loading, data } = useQuery(GET_USER_FESTS, {
    variables: {
      where: {
        OR: [
          {
            invitees: {
              some: {
                id: {
                  equals: currentUser.id,
                },
              },
            },
          },
          {
            attendees: {
              some: {
                id: {
                  equals: currentUser.id,
                },
              },
            },
          },
        ],
      },
    },
  });

  const [updateFest] = useMutation(UPDATE_FEST, {
    refetchQueries: [GET_USER_FESTS],
  });

  function openSlopFestModal() {
    openModal(<SlopFestModal buttonTitle={"Fest on!"} onClose={closeModal} />);
  }

  // - - - - - HANDLER
  const handleRSVPButtonClick = (fest, attendeestatus) => {
    if (attendeestatus === false) {
      updateFest({
        variables: {
          data: {
            attendees: {
              connect: [{ id: currentUser.id }],
            },
            invitees: {
              disconnect: [{ id: currentUser.id }],
            },
          },
          where: {
            id: fest.id,
          },
        },
      });
    } else {
      updateFest({
        variables: {
          data: {
            invitees: {
              connect: [{ id: currentUser.id }],
            },
            attendees: {
              disconnect: [{ id: currentUser.id }],
            },
          },
          where: {
            id: fest.id,
          },
        },
      });
    }
  };

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
            <h2 className="scale-y-2 font-arialBold w-[250px] text-xl">
              {!loading && data?.fests?.length === 0
                ? "YOU HAVE NO FESTS :("
                : "YOUR FESTS"}
            </h2>
            <Button
              variant="primary"
              className="w-[224px]"
              onClick={openSlopFestModal}
            >
              New Fest!
            </Button>
          </div>
          <div className="flex flex-col">
            {!loading &&
              data?.fests?.map((fest) => {
                const startDate = new Intl.DateTimeFormat("en-US").format(
                  new Date(fest.startDate.replace(/-/g, "/"))
                );
                const endDate = new Intl.DateTimeFormat("en-US").format(
                  new Date(fest.endDate.replace(/-/g, "/"))
                );
                const attendeeStatus = fest.attendees.some(
                  (attendee) => attendee.username === currentUser.username
                );
                const festDateInFuture = dayjs().isBefore(fest.endDate);
                // const isClicked = fest.some((click) => click.id === fest.id);
                return (
                  <div
                    key={fest.id}
                    className="flex flex-row justify-between mb-5 border-b border-black relative"
                  >
                    <div className="mb-5">
                      <h3 className="font-arialBold mb-2.5 text-lg">
                        <Link to={`/fests/${fest.id}`}>{fest.name}</Link>
                      </h3>
                      <p className="font-arialRegular mb-2.5 opacity-60 text-lg">
                        {startDate + " - " + endDate}
                      </p>
                      <div>
                        <div className="flex flex-row">
                          {[...(fest.attendees ?? []), ...(fest.invitees ?? [])]
                            .slice(0, 4)
                            .map((person, index) => (
                              <Keyword
                                key={person.id}
                                className={`h-31px space-x-2 space-y-2 ${
                                  index < fest.attendees?.length
                                    ? "bg-yellow"
                                    : "bg-gray"
                                } xs:space-x-2 xs:space-y-2 text-black text-center mr-2.5`}
                                keyword={person.username}
                              />
                            ))}

                          {fest.attendees?.length + fest.invitees?.length >
                            4 && (
                            <Keyword
                              key={fest.id}
                              className="h-31px space-x-2 space-y-2 bg-gray xs:space-x-2 xs:space-y-2 text-black text-center mr-2.5"
                              keyword={`+ ${
                                fest.attendees?.length +
                                fest.invitees?.length -
                                4
                              } more`}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    {(attendeeStatus || festDateInFuture) && (
                      <Button
                        variant={
                          attendeeStatus ? "secondary" : "outline-secondary"
                        }
                        className={`absolute right-0 ${
                          festDateInFuture
                            ? "flex flex-row mb-5 h-10"
                            : "flex flex-row mb-5 h-10 cursor-auto"
                        }`}
                        size="sm"
                        onClick={
                          festDateInFuture
                            ? () => handleRSVPButtonClick(fest, attendeeStatus)
                            : () => {}
                        }
                      >
                        <img
                          src={attendeeStatus ? checkMarkWhite : checkMarkBlack}
                          alt="check mark"
                          className="mr-2.5"
                        />
                        {festDateInFuture ? "I'm going" : "I went"}
                      </Button>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </div>
  );
};

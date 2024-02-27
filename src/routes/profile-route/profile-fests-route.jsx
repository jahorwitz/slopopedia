import { useQuery } from "@apollo/client";
import dayjs from "dayjs";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Keyword } from "../../components/index";
import { GET_USER_FESTS } from "../../graphql/get-user-fests";
import checkMark from "../../images/check-mark-dark.svg";
import checkMarkWhite from "../../images/check-mark.svg";
import { CurrentUserContext } from "../../store/current-user-context";

export const ProfileFestsRoute = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleString("default", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
  const { loading, data } = useQuery(GET_USER_FESTS, {
    variables: {
      where: {
        attendees: {
          some: {
            id: {
              equals: currentUser.id,
            },
          },
        },
      },
    },
  });

  return (
    <div className="flex flex-col w-[712px] mt-10">
      <div className="flex flex-row items-center justify-between pb-10">
        <h2 className="scale-y-2 font-arialBold w-[250px] text-xl">
          {!loading && data.fests.length === 0
            ? "YOU HAVE NO FESTS :("
            : "YOUR FESTS"}
        </h2>
        <Button variant="primary" className="w-[224px]">
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
                  <div className="flex flex-row">
                    {items.attendees.length <= 4
                      ? items.attendees?.map((attendee, index) => {
                          return (
                            <Keyword
                              key={index}
                              className="h-31px space-x-2 space-y-2 bg-gray xs:space-x-2 xs:space-y-2 text-black text-center mr-2.5"
                              keyword={attendee.username}
                            />
                          );
                        })
                      : items.slice(0, 4).map((attendee, index) => {
                          // needs to have {+ attendees.length - 5} to show how many attendees after 5
                          return (
                            <>
                              <div>
                                <Keyword
                                  key={index}
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
                        keyword={items.attendees.length - 4}
                      />
                    ) : (
                      ""
                    )}
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
                    // onClick={""}
                  >
                    <img src={checkMark} alt="check mark" className="mr-2.5" />
                    I'm going!
                  </Button>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

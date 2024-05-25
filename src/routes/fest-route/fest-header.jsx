import { useMutation } from "@apollo/client";
import { Button, Keyword } from "../../components";
import { UPDATE_FEST } from "../../graphql";
import { useCurrentUser } from "../../hooks";
import checkMarkBlack from "../../images/check-mark-dark.svg";
import checkMarkWhite from "../../images/check-mark.svg";

export const FestHeader = ({ fest }) => {
  let { name, invitees, startDate, endDate, attendees, id: festId } = fest;
  startDate = new Intl.DateTimeFormat("en-US").format(new Date(startDate));
  endDate = new Intl.DateTimeFormat("en-US").format(new Date(endDate));
  const { currentUser } = useCurrentUser();
  const userId = currentUser?.id;

  const ownerIsGoing = fest?.attendees?.map(
    (person) => person?.id === userId
  )[0];

  const [updateFest] = useMutation(UPDATE_FEST, {});

  const isAttendee = attendees.some((user) => user.id === currentUser.id);
  const isInvitee = invitees.some((user) => user.id === currentUser.id);

  const handleRSVPButtonClick = () => {
    // if invited, add user to attendees, and remove user from invitees
    if (isInvitee) {
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
            id: festId,
          },
        },
      }).catch((err) => {
        console.error(
          err,
          "Failed to add current user as an attendee of this fest."
        );
      });
    } else {
      // if and attendee, add user to invitees, and remove user from attendees
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
            id: festId,
          },
        },
      }).catch((err) => {
        console.error(
          err,
          "Failed to add current user as an invitee of this fest."
        );
      });
    }
  };

  return (
    <div className="flex flex-col gap-y-4 py-10">
      <div className="flex justify-between items-center">
        <h1 className="font-arial scale-y-2 font-bold">{name.toUpperCase()}</h1>

        {(isAttendee || isInvitee) && (
          <Button
            variant={ownerIsGoing ? "secondary" : "outline-secondary"}
            size="sm"
            className="flex items-center gap-x-2.5 pb-3 cursor-default"
            onClick={handleRSVPButtonClick}
          >
            <img
              src={ownerIsGoing ? checkMarkWhite : checkMarkBlack}
              className="w-4 h-3"
              alt="white check mark"
            />
            I'm going!
          </Button>
        )}
      </div>
      <div className="flex justify-between items-center">
        <div className="flex flex-wrap gap-2.5 max-w-lg">
          {attendees.map((attendee, index) => (
            <Keyword
              className="bg-yellow"
              key={index}
              keyword={attendee.username}
            />
          ))}
          {invitees.map((invitee, index) => (
            <Keyword
              className="bg-gray"
              key={index}
              keyword={invitee.username}
            />
          ))}
        </div>
        <p className="font-arial text-lg/4 opacity-60">
          {startDate} ~ {endDate}
        </p>
      </div>
    </div>
  );
};

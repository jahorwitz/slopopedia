import { Button, Keyword } from "../../components";
import { useCurrentUser } from "../../hooks";
import checkMarkBlack from "../../images/check-mark-dark.svg";
import checkMarkWhite from "../../images/check-mark.svg";

export const FestHeader = ({ fest }) => {
  let { name, invitees, startDate, endDate, attendees } = fest;
  startDate = new Intl.DateTimeFormat("en-US").format(new Date(startDate));
  endDate = new Intl.DateTimeFormat("en-US").format(new Date(endDate));
  const { currentUser } = useCurrentUser();
  const userId = currentUser?.id;

  const ownerIsGoing = fest?.attendees?.map(
    (person) => person?.id === userId
  )[0];

  return (
    <div className="flex flex-col gap-y-4 py-10">
      <div className="flex justify-between items-center">
        <h1 className="font-arial scale-y-2 font-bold">{name.toUpperCase()}</h1>
        <Button
          variant={ownerIsGoing ? "secondary" : "outline-secondary"}
          size="sm"
          className="flex items-center gap-x-2.5 pb-3 cursor-default"
        >
          <img
            src={ownerIsGoing ? checkMarkWhite : checkMarkBlack}
            className="w-4 h-3"
            alt="white check mark"
          />
          I'm going!
        </Button>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex flex-wrap gap-2.5 max-w-lg">
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

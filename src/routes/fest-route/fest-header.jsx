import { Button, Keyword } from "../../components";

import checkMark from "../../images/check-mark.svg";

export const FestHeader = ({ fest }) => {
  let { name, attendees, startDate, endDate } = fest;
  startDate = new Intl.DateTimeFormat("en-US").format(new Date(startDate));
  endDate = new Intl.DateTimeFormat("en-US").format(new Date(endDate));

  return (
    <div className="flex flex-col gap-y-4 py-10">
      <div className="flex justify-between items-center">
        <h1 className="font-arial scale-y-2 font-bold">{name.toUpperCase()}</h1>
        <Button
          variant="secondary"
          size="sm"
          className="flex items-center gap-x-2.5 pb-3"
        >
          <img src={checkMark} className="w-4 h-3" alt="white check mark" />
          I'm going!
        </Button>
      </div>
      <div className="flex justify-between items-start">
        <div className="flex flex-wrap gap-2.5 max-w-lg">
          {attendees.map((attendee, index) => (
            <Keyword
              className="bg-gray"
              key={index}
              keyword={attendee.username}
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

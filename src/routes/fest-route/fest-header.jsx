const fest = {
  name: "Gobb Fest",
  attendees: [
    {
      name: "frank",
      id: "",
    },
    {
      name: "frank2",
      id: "",
    },
    {
      name: "frank3",
      id: "",
    },
    {
      name: "frank4",
      id: "",
    },
  ],
  startDate: "2023-11-25",
  endDate: "2023-11-30",
};

export const FestHeader = () => {
  return (
    <div>
      <div>
        <h1>{fest.name}</h1>
        {/* map of array of attendees */}
      </div>
      <div>
        {/* going button */}
        {/* start and end dates */}
      </div>
    </div>
  );
};

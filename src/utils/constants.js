// col-span-3 is the possible column span size that
// can be applied to the cards. This is used to specify basically
// that a card should span three columns in a grid layout.
// the goal is to create a variation in the appearance of cards
// within the grid since we are visually randomizing the cards.
export const getRandomColumns = () => {
  //possible solution?
  const colSizes = [
    { class: "col-span-1", size: 1 },
    { class: "col-span-2", size: 2 },
    { class: "col-span-3", size: 3 },
  ];

  const randIdx = Math.floor(Math.random() * colSizes.length);
  return colSizes[randIdx];

  //old code for reference:
  // const colSizes = ["col-span-1", "col-span-2", "col-span-3"];

  // const randIdx = Math.floor(Math.random() * colSizes.length);
  // const randSize = colSizes[randIdx];

  // const cardClass = `${randSize}`;

  // return cardClass;
};

export function formatDateTime(dateTimeString) {
  const date = new Date(dateTimeString);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    millisecond: "numeric",
    timeZoneName: "short",
  };

  const formattedDateTime = date.toLocaleDateString("en-US", options);
  return formattedDateTime;
}

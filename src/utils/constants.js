//movieInfo represents the Movie object that will be retrieved from a GET request to the backend
export const movieInfo = {
  image:
    "https://images.squarespace-cdn.com/content/v1/51cdafc4e4b09eb676a64e68/1618602532707-3OAII3QVHYKCW3KJ1HJU/cars_boast.jpg",
  title: "Cars",
  keywords: ["pixar", "cars", "family friendly", "classic", "heartwarming"],
  releaseYear: "2006",
  runtimeInMinutes: "117 minutes",
  rottenTomatoesScore: undefined,
  howToWatch: undefined,
  description: undefined,
};

export const sizes = {
  small: 1,
  medium: 2,
  large: 3,
};

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

// Custom merge function
export const mergeObject = {
  typePolicies: {
    Post: {
      fields: {
        keywords: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        movies: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
    User: {
      fields: {
        watched: {
          merge(existing, incoming, { mergeObjects }) {
            return incoming;
          },
        },
        wishlist: {
          merge(existing, incoming, { mergeObjects }) {
            return incoming;
          },
        },
      },
    },
    Fest: {
      fields: {
        attendees: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        invitees: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
};

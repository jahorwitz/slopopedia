import { gql } from "@apollo/client";

export const GET_FEST = gql`
  query GetFest($where: FestWhereUniqueInput!) {
    fest(where: $where) {
      attendees {
        id
        username
      }
      movies {
        id
        description
        keywords {
          name
        }
        photo {
          url
        }
        runtime
        releaseYear
        title
        tomatoScore
      }
      startDate
      endDate
      creator {
        id
      }
      name
      festVotes {
        movie {
          id
        }
      }
    }
  }
`;

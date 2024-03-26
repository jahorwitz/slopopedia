import { gql } from "@apollo/client";

// 'attendees' is needed for the fest discussion board logic
export const GET_FEST = gql`
  query GetFest($where: FestWhereUniqueInput!) {
    fest(where: $where) {
      id
      invitees {
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
      attendees {
        id
        username
      }
    }
  }
`;

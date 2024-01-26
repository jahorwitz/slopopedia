import { gql } from "@apollo/client";
export const DELETE_FEST = gql`
  mutation Mutation($where: FestWhereUniqueInput!) {
    deleteFest(where: $where) {
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

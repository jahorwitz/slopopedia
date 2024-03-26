import { gql } from "@apollo/client";

export const UPDATE_FEST = gql`
  mutation UpdateFestMovies(
    $where: FestWhereUniqueInput!
    $data: FestUpdateInput!
  ) {
    updateFest(where: $where, data: $data) {
      attendees {
        id
        username
      }
      invitees {
        id
        username
      }
      movies {
        id
        title
        description
        keywords {
          name
        }
        photo {
          url
        }
        runtime
        releaseYear
        tomatoScore
      }
      name
      id
      startDate
      endDate
      creator {
        id
      }
      festVotes {
        movie {
          id
        }
      }
    }
  }
`;

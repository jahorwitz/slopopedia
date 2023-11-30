import { useQuery } from "@apollo/client";
import { useParams } from "react-router";
import { Header } from "../../components";
import { GET_FEST } from "../../graphql/get-fest";

export const FestRoute = () => {
  const { festId } = useParams();
  const { data, loading, error } = useQuery(GET_FEST, {
    variables: {
      where: {
        id: festId,
      },
    },
  });
  console.log(festId);
  console.log(data);
  return (
    <>
      <Header>
        <Header.Logo />
        <Header.NavLinks />
        <Header.Profile />
      </Header>
      {/* fest name, going button, attendees, start and end dates */}
      {/* fest-sidebar */}
    </>
  );
};

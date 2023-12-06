import { useQuery } from "@apollo/client";
import { useLocation, useParams } from "react-router";
import { Header } from "../../components";
import { GET_FEST } from "../../graphql/get-fest";
import { FestSidebar } from "./fest-sidebar";

export const FestRoute = () => {
  const { festId } = useParams();
  const location = useLocation();
  const { data, loading, error } = useQuery(GET_FEST, {
    variables: {
      where: {
        id: festId,
      },
    },
  });
  console.log(location);
  // console.log(data);
  return (
    <>
      <Header>
        <Header.Logo />
        <Header.NavLinks />
        <Header.Profile />
      </Header>
      <FestSidebar />
      {/* fest name, going button, attendees, start and end dates */}
    </>
  );
};

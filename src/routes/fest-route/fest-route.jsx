import { useQuery } from "@apollo/client";
import { useState } from "react";
import { useLocation, useParams } from "react-router";
import { Header } from "../../components";
import { GET_FEST } from "../../graphql/get-fest";
import { FestHeader } from "./fest-header";
import { FestSidebar } from "./fest-sidebar";

export const FestRoute = () => {
  const { festId } = useParams();
  const location = useLocation();
  const [fest, setFest] = useState({});
  const { data, loading, error } = useQuery(GET_FEST, {
    variables: {
      where: {
        id: festId,
      },
    },
  });

  return (
    <>
      <Header>
        <Header.Logo />
        <Header.NavLinks />
        <Header.Profile />
      </Header>
      <div className=" max-w-[1200px] my-0 mx-auto box-border">
        {!loading && <FestHeader fest={data.fest} />}
        <FestSidebar />
      </div>
    </>
  );
};

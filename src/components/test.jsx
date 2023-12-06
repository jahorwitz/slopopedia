import { useLocation, useParams } from "react-router";
import { FestSidebar } from "../routes/fest-route/fest-sidebar";
import { Header } from "./header";

export const Test = () => {
  const location = useLocation();
  const params = useParams();

  console.log(location);
  console.log(params);

  return (
    <>
      <Header>
        <Header.Logo />
        <Header.NavLinks />
        <Header.Profile />
      </Header>

      <FestSidebar />
    </>
  );
};

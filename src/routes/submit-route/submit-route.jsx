import { Footer, SubmitSlopForm } from "../../components";
import { Header } from "../../components/header";

export const SubmitRoute = () => {
  return (
    <>
      <Header>
        <Header.Logo />
        <Header.NavLinks />
        <Header.Profile />
      </Header>
      <SubmitSlopForm />
      <Footer />
    </>
  );
};

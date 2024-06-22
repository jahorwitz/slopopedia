import { Footer } from "../../components";
import { Header } from "../../components/header";
import SubmitSlopForm from "./submit-slop-form";

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

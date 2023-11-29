import { Header } from "../index";

export default {
  title: "Components/Header",
  component: Header,
};

export const ExampleHeader = () => (
  <Header>
    <Header.Logo />
    <Header.NavLinks />
    <Header.Profile />
  </Header>
);

import { BrowserRouter } from "react-router-dom";
import { ModalContextProvider } from "../../store";
import { Header } from "./index";

export default {
  title: "Components/Header",
  component: Header,
};

export const Default = () => (
  <ModalContextProvider>
    <BrowserRouter>
      <Header>
        <Header.Logo />
        <Header.NavLinks />
        <Header.Profile />
      </Header>
    </BrowserRouter>
  </ModalContextProvider>
);

import { Header, Tabber } from "./index";

export const Profile = () => {
  return (
    <div className="max-w-[1440px] mx-auto">
      <Header>
        <Header.Logo />
        <Header.NavLinks />
        <Header.Profile />
      </Header>
      <div className="flex flex-row mt-10">
        <div className="border border-black w-72 h-72 mr-32 ml-5 "></div>
        <Tabber />
      </div>
    </div>
  );
};

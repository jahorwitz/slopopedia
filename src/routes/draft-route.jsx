import { Header } from "../components/index";
import DraftPage from "../page/blog/DraftPage";

export default function DraftRoute() {
  return (
    <>
      <div className="relative">
        <Header>
          <Header.Logo />
          <Header.NavLinks />
          <Header.Profile />
        </Header>
      </div>
      <div className="relative float-right -top-10left-3/4 mr-32 mt-10 flex">
        <a href="#" className="underline">
          Drafts
        </a>
        <a href="#" className="underline ml-5">
          + New Entry
        </a>
      </div>
      <div className="w-full max-w-[1440px] -top-5 mx-auto p-20 flex flex-row relative">
        <DraftPage />
      </div>
    </>
  );
}

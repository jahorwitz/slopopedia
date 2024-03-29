import { Link } from "react-router-dom";
import { Footer, Header } from "../../components";
import DraftPage from "../../page/blog/draft-page";

export function DraftRoute() {
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
        <Link to={"/draft"} className="underline">
          Drafts
        </Link>
        <Link to={"/articles/create"} className="underline ml-5 cursor-pointer">
          + New Entry
        </Link>
      </div>
      <div className="w-full max-w-[1440px] -top-5 mx-auto p-20 flex flex-row relative">
        <DraftPage />
      </div>
      <div className="absolute bottom-0 w-full max-w-[989] mx-auto p-10">
        <Footer>{/* <Footer.Content></Footer.Content>{" "} */}</Footer>
      </div>
    </>
  );
}

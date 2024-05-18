import { Link } from "react-router-dom";
import { Footer, Header } from "../../components";
import { useCurrentUser } from "../../hooks";
import DraftPage from "../../page/blog/draft-page";

export function DraftRoute() {
  const { isLoggedIn } = useCurrentUser();
  return (
    <>
      <div className="relative">
        <Header>
          <Header.Logo />
          <Header.NavLinks />
          <Header.Profile />
        </Header>
      </div>
      {isLoggedIn && (
        <div className="z-10 relative float-right -top-10left-3/4 mr-32 mt-10 flex">
          <Link to={"/draft"} className="underline">
            Drafts
          </Link>
          <Link
            to={"/articles/create"}
            className="underline ml-5 cursor-pointer"
          >
            + New Entry
          </Link>
        </div>
      )}
      <div className="w-full max-w-[1440px] -top-5 mx-auto p-20 flex flex-row relative">
        <DraftPage />
      </div>
      <div className="-z-10 absolute bottom-0 w-full max-w-[989] mx-auto p-10">
        <Footer>{/* <Footer.Content></Footer.Content>{" "} */}</Footer>
      </div>
    </>
  );
}

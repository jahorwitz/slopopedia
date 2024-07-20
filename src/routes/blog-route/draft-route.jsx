import { Link } from "react-router-dom";
import { Footer, Header } from "../../components";
import { useCurrentUser } from "../../hooks";
import DraftPage from "../../page/blog/draft-page";

export function DraftRoute() {
  const { isLoggedIn } = useCurrentUser();
  return (
    <>
      <div className="relative" data-test-id="draft-header">
        <Header data-test-id="draft-header">
          <Header.Logo />
          <Header.NavLinks />
          <Header.Profile />
        </Header>
      </div>
      {isLoggedIn && (
        <div
          className="z-10 relative float-right -top-10left-3/4 mr-32 mt-10 flex"
          data-test-id="draft-links-loggedIn"
        >
          <Link
            to={"/draft"}
            className="underline"
            data-test-id="draft-link-loggedIn-drafts"
          >
            Drafts
          </Link>
          <Link
            to={"/articles/create"}
            className="underline ml-5 cursor-pointer"
            data-test-id="draft-link-loggedIn-new-entry"
          >
            + New Entry
          </Link>
        </div>
      )}
      <div
        className="w-full max-w-[1440px] -top-5 mx-auto p-20 flex flex-row relative"
        data-test-id="draft-DraftPage"
      >
        <DraftPage data-test-id="draft-page" />
      </div>
      <div
        className="-z-10 absolute bottom-0 w-full max-w-[989] mx-auto p-10"
        data-test-id="draft-Footer"
      >
        <Footer data-test-id="draft-footer">
          {/* <Footer.Content></Footer.Content>{" "} */}
        </Footer>
      </div>
    </>
  );
}

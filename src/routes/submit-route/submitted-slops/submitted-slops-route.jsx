import { Link } from "react-router-dom";
import { Footer, Header } from "../../../components";
import { SubmittedList } from "./submitted-list";

export const SubmittedSlopsRoute = () => {
  return (
    <>
      <Header>
        <Header.Logo />
        <Header.NavLinks />
        <Header.Profile />
      </Header>
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col justify-center items-center relative">
          <Link
            to={"/submit"}
            className="absolute left-10 top-10 xs:left-4 sm:left-4 xs:top-4 sm:top-4 xs:text-sm border-b-2 border-black"
          >
            Back to submit page
          </Link>
          <div className="flex flex-col max-w-[453px] sm:mt-16 xs:mt-16">
            <h1 className="self-center my-10 pl-10 xs:pl-2 xs:pr-2 font-bold text-xl xs:my-4">
              SLOPS SUBMITTED BY USERS
            </h1>
            <SubmittedList />
          </div>
        </div>
      </div>
      <div className="w-full max-w-[989] mx-auto pt-[120px] pb-10 px-5 sm:pt-10 xs:pt-10">
        <Footer>
          <Footer.Content></Footer.Content>
        </Footer>
      </div>
    </>
  );
};

//* TODO:
// - Clicking on the slop image / title / details will open the slop preview modal MOCK

// - This should be re-used from elsewhere, we already have a slop preview modal like this.

// - The publish / delete buttons should invoke API calls to execute that action.

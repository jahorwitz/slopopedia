import { useContext } from "react";
import { Link } from "react-router-dom";
import { Footer, Header } from "../../../components";
import { CurrentUserContext } from "../../../store/current-user-context";
import { SubmittedList } from "./submitted-list";

// - THOUGHTS:
// - This page should have a filter for approved and unapproved slops for the user

// - The admin should show one for their own slops instead of unnapproved slops, and slops should be auto approved for admins

// - Should users be able to delete their own slops after they're approved?

// - After an approved slop is edited a copy should be submitted as a draft, if the draft is approved it should update the approved slop

// - It would be better for UX if submit slop, submitted slops, "approve slops", and "my slops" routes were all selectors in a sidebar

// NOTES:
// 1. The header doesn't show login or signup at full screen width
// 2. The logout button doesn't work
// 3. In hamburger nav, login and signup show instead of logged in user
// 4. Should we create a modals folder in components when we clean up the names?
// 5. There are 2 Tabber components, one at /components, and one at /components/tabber
// 6. We should set max heights for each image size displayed on home page
// 7. Some movies can't be edited through keystone as they say they "may not exist"

export const SubmittedSlopsRoute = () => {
  const { currentUser } = useContext(CurrentUserContext);

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
              {currentUser.isAdmin
                ? "SLOPS SUBMITTED BY USERS"
                : "YOUR SUBMITTED SLOPS"}
            </h1>
            <SubmittedList currentUser={currentUser} />
          </div>
        </div>
      </div>
      <div className="w-full max-w-[989] mx-auto pt-[120px] pb-10 px-5 sm:pt-10 xs:pt-10">
        <Footer />
      </div>
    </>
  );
};

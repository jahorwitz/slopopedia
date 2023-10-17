import { Link } from "react-router-dom";
import { Header } from "./index";

export const SubmitList = () => {
  return (
    <>
      <Header>
        <Header.Logo />
        <Header.NavLinks />
        <Header.Profile />
      </Header>
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col justify-center items-center relative ">
          <h1 className="mb-10 mt-10 xs:self-end xs:pl-2 xs:pr-2  ">
            //Add PageTitle component here
          </h1>
          <Link
            to={"/submit"}
            className="absolute left-10 xs:left-4 sm:left-4 xs:text-sm top-[40px] border-b-2 border-black"
          >
            Back to submit page
          </Link>
          <div className="max-w-[453px] h-[728px] ">
            //Add the submitted slops Component Here
          </div>
          <div className="mb-10 mt-24">//add footer component here//</div>
        </div>
      </div>
    </>
  );
};

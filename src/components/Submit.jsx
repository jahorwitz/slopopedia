import { useState } from "react";
import { Link } from "react-router-dom";
import { useModals } from "../hooks";
import { Button } from "./button";
import { Header } from "./header";
import { MoviePreviewModal } from "./movie-preview-modal";

export const Submit = ({ children }) => {
  const { closeModal, openModal } = useModals();
  const [isSubmitted, setIsSubmitted] = useState(false);

  function openMovieModal() {
    openModal(
      <MoviePreviewModal closeModal={closeModal} howToWatch whiteButton />
    );
  }

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  return (
    <>
      <Header>
        <Header.Logo />
        <Header.NavLinks />
        <Header.Profile />
      </Header>
      {isSubmitted ? <submitForm /> : <Form onFormSubmit={handleSubmit} />}
      <Button
        onClick={() => {
          openModal("preview");
        }}
      >
        CLICK ME
      </Button>
    </>
  );
};

const Form = () => {
  return (
    <div className="max-w-[1440px] mx-auto">
      <div className="flex flex-col justify-center items-center relative ">
        <h1 className="mb-10 mt-10 xs:self-start xs:pl-2 ">
          //PageTitle component here
        </h1>
        <Link
          to={"/submitted-list"}
          className="absolute right-10 xs:right-4 xs:text-sm sm:right-4 top-[38.5px] border-b-2 border-black"
        >
          view submitted
        </Link>
        <div className="max-w-[453px] h-[728px] ">
          //Add Form Component Here
        </div>
        <div className="mb-10 mt-24">//add footer component here//</div>
      </div>
    </div>
  );
};

const submitForm = () => {
  return (
    <div className="max-w-[1440px] mx-auto ">
      <div className="flex flex-col justify-center items-center xs:px-5 sm:px-5">
        <h1 className="mb-40 mt-10">//Add PageTitle component here</h1>
        <p className="max-w-[627px] xs:text-sm sm:text-center md:text-center lg:text-center font-arialBold">
          Thanks for submitting a slop to our platform, dear goblin!
        </p>
        <p className="max-w-[632px] xs:text-sm font-arialBold ">
          Our team of professional slop goblins will review your submission and
          publish it, if your slop is actually sloppy, and doesn't repeat movies
          already published here.
        </p>
        <div className="mt-40 xs:mt-16 ">
          <Button
            className="w-[400px] h-10 bg-yellow border text-lg font-arialBold xs:text-sm xs:w-[285px]"
            title="Submit another one?"
          ></Button>
        </div>
        <div className="mb-10 mt-40">//add footer component here//</div>
      </div>
    </div>
  );
};

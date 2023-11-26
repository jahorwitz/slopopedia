import checkMark from "../images/check-mark-dark.svg";
import logoutButton from "../images/logout-button.svg";
import meGoblin from "../images/me-goblin.svg";
import slopFests from "../images/profile-slop.svg";
import recommendButton from "../images/recommend.svg";
import settings from "../images/settings.svg";
import { Button } from "./button";
import { Footer } from "./footer";
import { Header } from "./header";

export const ProfileSlopFests = () => {
  return (
    <>
      <Header>
        <Header.Logo />
        <Header.NavLinks />
        <Header.Profile />
      </Header>
      <section className="flex mt-10 xl:justify-center">
        <div className="flex flex-col mr-[129px] ml-5 font-arialRegular">
          <button type="button" className="flex flex-row items-center pb-2.5">
            <img src={meGoblin} className="pr-2.5" />
            Me Goblin
          </button>
          <button type="button" className="flex flex-row items-center pb-2.5">
            <img src={slopFests} className="pr-2.5" />
            Slop Fests
          </button>
          <button type="button" className="flex flex-row items-center pb-2.5">
            <img src={recommendButton} className="pr-2.5" />
            Recommend-A-Slop
          </button>
          <button type="button" className="flex flex-row items-center pb-2.5">
            <img src={settings} className="pr-2.5" />
            Settings
          </button>
          <button type="button" className="flex flex-row items-center pb-2.5">
            <img src={logoutButton} className="pr-2.5" />
            Log out
          </button>
        </div>
        <div className="flex flex-col w-[712px]">
          <div className="flex flex-row items-center justify-between pb-10">
            <h2 className="scale-y-2 font-arialBold w-[113px] text-xl">
              Your Fests
            </h2>
            <Button variant="primary" className="w-[224px]">
              New Fest!
            </Button>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row justify-between mb-5">
              <div>
                <h3 className="font-arialBold">Gobbb Fest</h3>
                <p className="">12/08/2023 - 16/08/2023</p>
                <div className="flex flex-row">
                  {/* Button functionality when new slop fest created? */}
                  {/* Button creation with new slops? */}
                  {/* Keyword, button, something else? List of people attending. More than 5? */}
                  {/* <Keyword>Goblin 1</Keyword>
                <Keyword>Goblin 2</Keyword>
                <Keyword>Goblin 3</Keyword>
                <Keyword>Goblin 4</Keyword> */}
                </div>
              </div>
              <Button variant="outline-secondary" className="flex flex-row">
                <img src={checkMark} alt="check mark" className="mr-2.5" />
                I'm going!
              </Button>
            </div>
            <div className="flex flex-row justify-between">
              <div>
                <h3 className="font-arialBold">Title</h3>
                <p className="">Dates</p>
                <div className="flex flex-row">
                  {/* <Keyword>Goblin 1</Keyword>
                <Keyword>Goblin 2</Keyword>
                <Keyword>Goblin 3</Keyword>
                <Keyword>Goblin 4</Keyword> */}
                </div>
              </div>
              <Button variant="outline-secondary" className="flex flex-row">
                <img src={checkMark} alt="check mark" className="mr-2.5" />
                I'm going!
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

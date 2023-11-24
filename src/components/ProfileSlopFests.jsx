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
      <div className="flex mt-10">
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
            <div className="flex flex-row justify-between">
              <div>
                <h3 className="">Title</h3>
                <p className="">Dates</p>
                <div className="flex flex-row">
                  {/* Keyword, button, something else? List of people attending? */}
                  {/* <Keyword>Goblin 1</Keyword>
                <Keyword>Goblin 2</Keyword>
                <Keyword>Goblin 3</Keyword>
                <Keyword>Goblin 4</Keyword> */}
                </div>
              </div>
              <Button variant="secondary">I'm going!</Button>
              {/* Button functionality when new slop fest created? */}
              {/* Button creation with new slops? */}
            </div>
            <div>
              <div>
                <h3 className="">Title</h3>
                <p className="">Dates</p>
                <div className="flex flex-row">
                  {/* <Keyword>Goblin 1</Keyword>
                <Keyword>Goblin 2</Keyword>
                <Keyword>Goblin 3</Keyword>
                <Keyword>Goblin 4</Keyword> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

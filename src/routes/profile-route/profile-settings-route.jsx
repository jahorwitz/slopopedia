import { useContext, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Footer, Header } from "../../components/index";
import { CurrentUserContext } from "../../store/current-user-context";
import { ProfileHorizontalMenu, ProfileSidebar } from "./index";

export const ProfileSettingsRoute = () => {
  const token = localStorage.getItem("jwt");
  const currentUser = useContext(CurrentUserContext);
  const isDesktopSize = useMediaQuery({
    query: "(min-width: 1170px)",
  });

  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  // - - - - - - Handlers - - - - - -

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault;
    //onSubmit(nickname, email, password, token);
    //console.log("handle save profile submit needs setup");
  };

  return (
    <div className="max-w-[1440px] mx-auto">
      <Header>
        <Header.Logo />
        <Header.NavLinks />
        <Header.Profile />
      </Header>
      <section className="flex flex-colmax-w-[1440px] h-[900px] bg-gray-background">
        {isDesktopSize ? <ProfileSidebar /> : <ProfileHorizontalMenu />}
        <form
          className="mt-8 flex flex-col w-[468px] h-[521px] gap-4"
          onSubmit={handleSubmit(nickname, email, password, token)}
        >
          <ul>
            <label className="flex flex-col text-lg leading-4 font-bold font-arial">
              Nickname
              <input
                className="w-[100%] h-12 gap-2.5 px-5 py-4 border-x border-y font-normal mt-4 mb-8"
                type="text"
                name="nickname"
                placeholder="Nickname"
                minLength="1"
                maxLength="30"
                value={nickname}
                onChange={handleNicknameChange}
              ></input>
            </label>
            <label className="flex flex-col text-lg leading-4 font-bold">
              Email
              <input
                className="w-[100%] h-12 gap-2.5 px-5 py-4 border-x border-y font-normal mt-4 mb-8"
                type="text"
                name="email"
                placeholder="Email"
                minLength="5"
                maxLength="50"
                value={email}
                onChange={handleEmailChange}
              ></input>
            </label>
            <label className="flex flex-col text-lg leading-4 font-bold">
              Password
              <input
                className="w-[100%] h-12 gap-2.5 px-5 py-4 border-x border-y font-normal mt-4 mb-8"
                type="text"
                name="password"
                placeholder="Password"
                minLength="8"
                maxLength="16"
              ></input>
            </label>
            <label className="flex flex-col text-lg leading-4 font-bold">
              Repeat Password
              <input
                className="w-[100%] h-12 gap-2.5 px-5 py-4 border-x border-y font-normal mt-4 mb-8"
                type="text"
                name="password"
                placeholder="Repeat Password"
                minLength="8"
                maxLength="16"
              ></input>
            </label>
          </ul>
          <button
            type="submit"
            className="bg-yellow 
            w-[100%] h-[100%]
            px-5 py-4 
            font-bold text-lg 
            text-center 
            font-arial 
            items-center
            "
          >
            Save
          </button>
          <button
            type="button"
            className="max-w-32 font-bold text-lg text-nowrap font-arial mt-20 text-danger text-left"
          >
            Delete Account
          </button>
        </form>
      </section>
      <footer className="mt-5">
        <Footer></Footer>
      </footer>
    </div>
  );
};

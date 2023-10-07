import { Header, Post } from "../components";

export function BlogRoute() {
  return (
    <>
      <div className="relative">
        <Header>
          <Header.Logo />
          <Header.NavLinks />
          <Header.Profile />
        </Header>
      </div>
      <div className="float-right mr-32 mt-10 flex">
        <a href="#" className="underline">
          Drafts
        </a>
        <a href="#" className="underline ml-5">
          + New Entry
        </a>
      </div>
      <div className="w-full max-w-[1440px] mx-auto p-20 flex">
        {/* <! -- Row 1 --> */}
        <Post
          title={"MERELY COMPETENT MOVIES"}
          btnTitle={"Not Slop"}
          content={
            "Oscar Wilde, in one of his more soulful moods, said that there are as many types of perfection as there are imperfect men. But a movie, unlike a man, exists for a reason..."
          }
          date={"5/06/22"}
          author={"By Sean"}
        />
      </div>
    </>
  );
}

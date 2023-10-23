import { Footer, Header, Image, Post } from "../components";
import image from "../images/image17.png";

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
        <a href="/draft" className="underline">
          Drafts
        </a>
        <a href="/article" className="underline ml-5">
          + New Entry
        </a>
      </div>
      <div className="w-full max-w-[1440px] mx-auto p-20 flex flex-col">
        {/* <! -- Row 1 --> */}
        <div>
          <Post
            title={"MERELY COMPETENT MOVIES"}
            btnTitle={"Not Slop"}
            content={
              "Oscar Wilde, in one of his more soulful moods, said that there are as many types of perfection as there are imperfect men. But a movie, unlike a man, exists for a reason..."
            }
            date={"5/06/22"}
            author={"By Sean"}
          />
          <div className="w-1/4 pr-20 float-right relative -top-60 left-40">
            <Image className={"h-18 w-22"} src={image} alt="Post Image" />
          </div>
        </div>
        {/* <! -- Row 2 --> */}
        <div className="flex flex-row-reverse">
          <Post
            className={"left-60 relative"}
            title={"MERELY COMPETENT MOVIES"}
            btnTitle={"Not Slop"}
            content={
              "Oscar Wilde, in one of his more soulful moods, said that there are as many types of perfection as there are imperfect men. But a movie, unlike a man, exists for a reason..."
            }
            date={"5/06/22"}
            author={"By Sean"}
          />
          <div className="w-1/4 float-left relative right-80">
            <Image className={"h-18 w-22"} src={image} alt="Post Image" />
          </div>
        </div>

        {/* <! -- Row 3 --> */}
        <div>
          <Post
            title={"MERELY COMPETENT MOVIES"}
            btnTitle={"Not Slop"}
            content={
              "Oscar Wilde, in one of his more soulful moods, said that there are as many types of perfection as there are imperfect men. But a movie, unlike a man, exists for a reason..."
            }
            date={"5/06/22"}
            author={"By Sean"}
          />
          <div className="w-1/4 pr-20 float-right relative -top-60 left-40">
            <Image className={"h-18 w-22"} src={image} alt="Post Image" />
          </div>
        </div>
        {/* <! -- Row 4 --> */}
        <div className="flex flex-row-reverse">
          <Post
            className={"left-60 relative"}
            title={"MERELY COMPETENT MOVIES"}
            btnTitle={"Not Slop"}
            content={
              "Oscar Wilde, in one of his more soulful moods, said that there are as many types of perfection as there are imperfect men. But a movie, unlike a man, exists for a reason..."
            }
            date={"5/06/22"}
            author={"By Sean"}
          />
          <div className="w-1/4 float-left relative right-80">
            <Image className={"h-18 w-22"} src={image} alt="Post Image" />
          </div>
        </div>
      </div>

      {/* <Drafts /> */}
      <div className="w-full max-w-[989] mx-auto p-20">
        <Footer>
          <Footer.Content></Footer.Content>{" "}
        </Footer>
      </div>
    </>
  );
}

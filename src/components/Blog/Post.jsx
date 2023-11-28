import { useNavigate } from "react-router";
import image from "../../images/image17.png";
import { Button, Image } from "../index";

export const Post = ({ className, title, content, date, author, btnTitle }) => {
  const router = useNavigate();
  return (
    <>
      <div className={`${className} w-96 -top-14 relative`}>
        <h2
          onClick={() => router("/draft")}
          className="font-semibold text-2xl tracking-tighter mb-4 cursor-pointer"
        >
          {title}
        </h2>
        <Button
          className="bg-yellow-button text-sm h-8 w-30 text-black text-center items-center border mb-4 py-2 px-2"
          title={btnTitle}
        />
        <p className="break-word text-sm font-normal mb-4">{content}</p>
        <div className="flex justify-between">
          {date === null ? (
            <small>"no published date"</small>
          ) : (
            <small className="text-gray-500">{date}</small>
          )}
          {author && <small className="text-gray-500">{`By ${author}`}</small>}
        </div>
      </div>
      <div className="w-1/4 pr-20 float-right relative -top-60 left-40">
        <Image className={"h-18 w-22"} src={image} alt="Post Image" />
      </div>
    </>
  );
};

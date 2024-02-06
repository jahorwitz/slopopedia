import { useNavigate } from "react-router";
import { Keyword } from "../keyword";

export const Post = ({
  key,
  className,
  title,
  content,
  date,
  author,
  id,
  keywords,
}) => {
  const router = useNavigate();

  let keywordsList = [];

  keywords.forEach((word) => {
    keywordsList.push(
      <Keyword
        keyword={`${word?.name}`}
        className="bg-yellow text-sm font-bold p-2.5 h-8 w-30 text-black text-center items-center border mb-4 py-0 px-2"
      />
    );
  });

  return (
    <>
      <div className={`${className} w-96 -top-14 relative`}>
        <h2
          onClick={() => router(`/articles/${id}`)}
          className="font-semibold text-2xl tracking-tighter mb-4 cursor-pointer"
        >
          {title}
        </h2>
        {keywordsList}
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
        {/*<Image className={"h-18 w-22"} src={image} alt="Post Image" />*/}
      </div>
    </>
  );
};

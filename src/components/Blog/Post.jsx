import { useNavigate } from "react-router";
import image from "../../images/image17.png";
import { Button, Image } from "../index";

// export const renderers =  DocumentRendererProps['renderers'] = {
//   // use your editor's autocomplete to see what other renderers you can override
//   inline: {
//     bold: ({ children }) => {
//       return <strong>{children}</strong>;
//     },
//   },
//   block: {
//     paragraph: ({ children, textAlign }) => {
//       return <p style={{ textAlign }}>{children}</p>;
//     },
//   },
// };
export const Post = ({ title, content, date, author, btnTitle }) => {
  const router = useNavigate();
  return (
    <>
      <div className="w-96 -top-14 relative">
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
        <p className="break-word text-sm font-normal mb-4">
          {/*<DocumentRenderer document={content} renderers={renderers}/>;*/}
          {content}
        </p>
        <div className="flex justify-between">
          <small className="text-gray-500">{date}</small>
          <small className="text-gray-500">{`By ${author}`}</small>
        </div>
      </div>
      <div className="w-1/4 pr-20 float-right relative -top-60 left-40">
        <Image className={"h-18 w-22"} src={image} alt="Post Image" />
      </div>
    </>
  );
};

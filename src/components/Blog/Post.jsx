import { Button } from "../index";

export const Post = ({ title, content, date, author, btnTitle }) => {
  return (
    <>
      <div className="w-96 -top-14 relative">
        <h2 className="font-semibold text-2xl tracking-tighter mb-4">
          {title}
        </h2>
        <Button
          className="bg-yellow-button text-sm h-8 w-30 text-black text-center items-center border mb-4 py-2 px-2"
          title={btnTitle}
        />
        <p className="break-word text-sm font-normal mb-4">{content}</p>cod e
        <div className="flex justify-between">
          <small className="text-gray-500">{date}</small>
          <small className="text-gray-500">{`By ${author}`}</small>
        </div>
      </div>
    </>
  );
};

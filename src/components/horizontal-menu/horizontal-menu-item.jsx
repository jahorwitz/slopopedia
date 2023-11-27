import { Link } from "react-router-dom";

export const HorizontalMenuItem = ({ link, title }) => {
  return (
    <li className="my-5 whitespace-nowrap ">
      <Link to={link}>
        <span className="hover:border-b-[3px] hover:border-black hover:text-black text-gray-500 text-md font-arialBold">
          {title}
        </span>
      </Link>
    </li>
  );
};

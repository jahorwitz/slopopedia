import cx from "classnames";
import { Link } from "react-router-dom";

export const SidebarItem = ({ link, title, className }) => {
  return (
    <Link to={link} className={cx("gap-5 ml-5", className)}>
      <span className="hover:border-b-[3px] hover:border-black hover:text-black text-gray-500 text-lg font-arialBold">
        {title}
      </span>
    </Link>
  );
};

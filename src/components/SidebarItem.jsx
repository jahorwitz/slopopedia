import { Link } from "react-router-dom";

export const SidebarItem = ({link, title}) => {
    return (
        <Link to={link} className="gap-5 ml-5 ">
            <span className="hover:border-b-[3px] hover:border-black hover:text-black text-gray-500 text-md font-arialBold">{title}</span>
        </Link>
    )
}
import cx from "classnames";
import { NavLink } from "react-router-dom";

export const SidebarItem = ({ item, className }) => {
  return (
    <NavLink
      to={item.link}
      end
      className={({ isActive }) =>
        cx(
          "flex gap-5 text-lg font-arialBold decoration-solid decoration-2 hover:underline hover:opacity-100",
          className,
          {
            "underline opacity-100 ": isActive,
            "opacity-60": !isActive,
          }
        )
      }
    >
      <img className="h-8 w-8 " src={item.src} alt={item.title} />
      {item.title}
    </NavLink>
  );
};

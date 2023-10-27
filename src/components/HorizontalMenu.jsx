import { Link } from "react-router-dom";

export const HorizontalMenu = ({ className }) => {
  const menuItems = [
    {
      title: "People",
      link: "#",
    },
    {
      title: "Production",
      link: "#",
    },
    {
      title: "Critters & Characters",
      link: "#",
    },
    {
      title: "Writing",
      link: "#",
    },
    {
      title: "Hairstyles",
      link: "Other Preferences",
    },
    {
      title: "Green Threshold",
      link: "#",
    },
  ];

  return (
    <div className=" border max-w-screen-lg h-18 overflow-x-auto overscroll-x-contain px-5 ">
      <ul className="flex flex-row gap-14 ">
        {menuItems.map((item) => (
          <li className="my-5 border-b-2 border-black text-lg whitespace-nowrap ">
            <Link to={item.link} className={className}>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

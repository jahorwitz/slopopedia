import { Link } from "react-router-dom";

export const Sidebar = () => {
  const sidebarItems = [
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
    <div className="flex flex-col gap-4">
      {sidebarItems.map((item) => (
        <Link to={item.link} className="gap-5 mr-32 ml-5" key={item.title}>
          {item.title}
        </Link>
      ))}
    </div>
  );
};

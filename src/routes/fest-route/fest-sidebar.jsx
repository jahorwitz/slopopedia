import { useLocation } from "react-router";
import { Button, Sidebar } from "../../components";

export const FestSidebar = () => {
  const location = useLocation();
  const sidebarItems = [
    {
      title: "Slops to watch",
      link: `${location.pathname}`,
    },
    {
      title: "Discussion",
      link: `${location.pathname}/discussion`,
    },
    {
      title: "Edit dates & guests",
      link: "",
    },
  ];

  return (
    <div>
      <div className="ml-[-1.25rem]">
        <Sidebar>
          {sidebarItems.map((item, index) => (
            <Sidebar.Item key={index} link={item.link} title={item.title} />
          ))}
        </Sidebar>
      </div>
      <div>
        <Button variant="danger" className="pl-0 pt-16">
          Delete
        </Button>
      </div>
    </div>
  );
};

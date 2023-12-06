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
      <div>
        <Sidebar>
          {sidebarItems.map((item, index) => (
            <Sidebar.Item key={index} link={item.link} title={item.title} />
          ))}
        </Sidebar>
      </div>
      <div>
        <Button variant="danger">Delete</Button>
      </div>
    </div>
  );
};

import { Sidebar } from "../../components";

export const FestSidebar = () => {
  const sidebarItems = [
    {
      title: "Slops to watch",
      link: "",
    },
    {
      title: "Discussion",
      link: "",
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
        <Button>Delete</Button>
      </div>
    </div>
  );
};

import { Sidebar } from "../../components";

export const PreferencesSidebar = () => {
  const sidebarItems = [
    {
      title: "People",
      value: 1,
    },
    {
      title: "Production",
      value: 2,
    },
    {
      title: "Critters & Characters",
      value: 3,
    },
    {
      title: "Writing",
      value: 4,
    },
    {
      title: "Hairstyles",
      value: 5,
    },
    {
      title: "Green Threshold",
      value: 6,
    },
  ];

  return (
    <Sidebar>
      {sidebarItems.map((item, index) => {
        return (
          <div key={index} className="flex  ">
            <div className="mt-1">
              <Sidebar.Item item={item} />
            </div>
          </div>
        );
      })}
    </Sidebar>
  );
};

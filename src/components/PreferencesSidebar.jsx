import { useParams } from "react-router";
import { Sidebar, SidebarItem } from "./index";

export const PreferencesSidebar = () => {
  const { value } = useParams();

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
        return <SidebarItem key={index} link={item.value} title={item.title} />;
      })}
    </Sidebar>
  );
};

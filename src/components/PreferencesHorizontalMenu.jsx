import { HorizontalMenu, HorizontalMenuItem } from "./index";


export const PreferencesHorizontalMenu = () => {
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
    <HorizontalMenu>
      {menuItems.map((item, index) => {
        return (
          <HorizontalMenuItem key={index} link={item.link} title={item.title} />
        );
      })}
    </HorizontalMenu>
  );
};

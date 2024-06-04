import { HorizontalMenu } from "../../components";

export const PreferencesHorizontalMenu = () => {
  const menuItems = [
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
    <div>
      <div>
        <HorizontalMenu>
          {menuItems.map((item) => {
            return (
              <HorizontalMenu.Item
                key={item.title}
                link={item.link}
                title={item.title}
              />
            );
          })}
        </HorizontalMenu>
      </div>
    </div>
  );
};

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
      <div className="flex flex-col pt-12 justify-center  pl-2">
        <h1 className="sm:text-md xs:text-sm font-arialBold text-lg scale-y-[2.0]  ">
          SLOP PREFERENCES
        </h1>
        <div className=" mt-10 ml-2 mr-12 xs:mr-12">
          {/*insert Advanced Form Here*/}
        </div>
        <Button
          title="Save"
          className=" bg-yellow-button w-56 h-12 font-arialBold  mt-12 text-lg "
        />
      </div>
    </div>
  );
};

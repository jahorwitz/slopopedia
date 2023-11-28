import { Button, Sidebar } from "../../components";

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
    <div className="flex flex-row mt-10 ">
      <div className=" xs:hidden sm:hidden md:block lg:block xl:block">
        <Sidebar>
          {sidebarItems.map((item) => {
            return (
              <Sidebar.Item
                key={item.title}
                link={item.value}
                title={item.title}
              />
            );
          })}
        </Sidebar>
      </div>
      <div className="flex flex-col pl-36">
        <h1 className=" font-arialBold text-lg scale-y-[2.0]">
          SLOP PREFERENCES
        </h1>
        <div className="min-w-[600px]  mt-10 ">
          {/*insert Advanced Form Here*/}
        </div>
      </div>
      <Button
        title="Save"
        className="bg-yellow-button w-56 h-12 font-arialBold ml-32 mt-[696px] text-lg mr-10"
      />
    </div>
  );
};

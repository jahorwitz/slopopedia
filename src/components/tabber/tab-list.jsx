import { Tab } from "@headlessui/react";
export const TabList = () => {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <div>
      <Tab.List
        as="h3"
        className={cx(
          "flex mb-8 gap-12 text-xl scale-y-2 font-arialBold font-medium text-grey-900 text-center pt-6 my-4"
        )}
      >
        {tabs.map((tab) => (
          <Tab
            key={uniqueId(tab)}
            data-testid={tab}
            className={({ selected }) =>
              cx(selected ? "border-b-2 border-slate-950 " : "text-slate-500")
            }
          >
            {tab}
          </Tab>
        ))}
      </Tab.List>
    </div>
  );
};

TabList.displayName = "TabList";

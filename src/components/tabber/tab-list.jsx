import { Tab } from "@headlessui/react";
export const TabList = () => {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <div>
      <Tab.List className={classNames("flex gap-12")}>
        <Tab
          data-testid="tab1"
          className={({ selected }) =>
            classNames(
              selected ? "border-b-2 border-slate-950 " : "text-slate-500"
            )
          }
        >
          SLOPS TO GOBBLE()
        </Tab>
        <Tab
          data-testid="tab2"
          className={({ selected }) =>
            classNames(
              selected ? "border-b-2 border-slate-950 " : "text-slate-500"
            )
          }
        >
          SLOPS IVE GOBBLED()
        </Tab>
      </Tab.List>
    </div>
  );
};

TabList.displayName = "TabList";

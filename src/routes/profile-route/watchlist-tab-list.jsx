import { Tab } from "@headlessui/react";

export const TabList = ({ wishList, watchedList }) => {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <div>
      <Tab.List
        as="h3"
        className={classNames(
          "flex mb-8 gap-12 text-xl scale-y-2 font-arialBold font-medium text-grey-900 text-center pt-6 my-4"
        )}
      >
        <Tab
          data-testid="tab1"
          className={({ selected }) =>
            classNames(
              selected ? "border-b-2 border-slate-950 " : "text-slate-500"
            )
          }
        >
          SLOPS TO GOBBLE({wishList?.length})
        </Tab>
        <Tab
          data-testid="tab2"
          className={({ selected }) =>
            classNames(
              selected ? "border-b-2 border-slate-950 " : "text-slate-500"
            )
          }
        >
          SLOPS IVE GOBBLED({watchedList?.length})
        </Tab>
      </Tab.List>
    </div>
  );
};

TabList.displayName = "TabList";

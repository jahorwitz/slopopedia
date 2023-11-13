import { Tab } from "@headlessui/react";
import cx from "classnames";
import { uniqueId } from "lodash";

export const TabList = ({ tabs }) => {
  return (
    <div>
      <Tab.List className={cx("flex gap-12")}>
        {tabs.map((tab) => (
          <Tab
            key={uniqueId(tab)}
            data-testId={tab}
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

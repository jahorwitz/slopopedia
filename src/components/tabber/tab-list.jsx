import { Tab } from "@headlessui/react";
import cx from "classnames";
import { uniqueId } from "lodash";

export const TabList = ({ tabs }) => {
  return (
    <div>
      <Tab.List className={cx("flex gap-12 mb-8")}>
        {tabs.map((tab) => (
          <Tab
            key={uniqueId(tab)}
            data-testid={tab}
            className={({ selected }) =>
              cx(
                "font-bold text-3xl uppercase",
                selected ? "border-b-2 border-dark text-dark" : "text-dark/60"
              )
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

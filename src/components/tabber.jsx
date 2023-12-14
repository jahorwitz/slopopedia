import { Tab } from "@headlessui/react";
import { TabList } from "./tab-list";
import { TabPanels } from "./tab-panels";

export const Tabber = () => {
  return (
    <Tab.Group>
      <TabList />
      <TabPanels />
    </Tab.Group>
  );
};

Tabber.displayName = "Tabber";

import { Tab } from "@headlessui/react";
import { TabList } from "./tab-list";
import { TabPanel } from "./tab-panel";
import { TabPanels } from "./tab-panels";

export const Tabber = ({ children }) => {
  return <Tab.Group>{children}</Tab.Group>;
};

Tabber.displayName = "Tabber";
Tabber.TabList = TabList;
Tabber.TabPanels = TabPanels;
Tabber.TabPanel = TabPanel;

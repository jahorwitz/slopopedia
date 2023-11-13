import { Tab } from "@headlessui/react";

export const TabPanel = ({ children }) => {
  return <Tab.Panel>{children}</Tab.Panel>;
};

TabPanel.displayName = "TabPanel";

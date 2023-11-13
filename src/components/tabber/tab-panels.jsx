import { Tab } from "@headlessui/react";

export const TabPanels = ({ children }) => {
  return <Tab.Panels>{children}</Tab.Panels>;
};

TabPanels.displayName = "TabPanels";

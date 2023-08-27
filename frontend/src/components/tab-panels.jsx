import { Tab } from "@headlessui/react";

export const TabPanels = ({ children = "content 1" }) => {
  return (
    <Tab.Panels>
      <Tab.Panel>{children}</Tab.Panel>
      <Tab.Panel></Tab.Panel>
    </Tab.Panels>
  );
};

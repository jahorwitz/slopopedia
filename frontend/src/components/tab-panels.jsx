import { Tab } from "@headlessui/react";

export const TabPanels = ({
  children = "content 1",
  child = "content 434",
}) => {
  return (
    <Tab.Panels>
      <Tab.Panel>{children}</Tab.Panel>
      <Tab.Panel>{child}</Tab.Panel>
    </Tab.Panels>
  );
};

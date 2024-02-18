import { Tab } from "@headlessui/react";
import { MovieCardList } from "../MovieCardList";

export const TabPanels = ({ wishList, watchedList }) => {
  return (
    <Tab.Panels>
      <Tab.Panel>
        <MovieCardList movies={wishList} colSpanOne />
      </Tab.Panel>
      <Tab.Panel>
        <MovieCardList movies={watchedList} colSpanOne />
      </Tab.Panel>
    </Tab.Panels>
  );
};

TabPanels.displayName = "TabPanels";

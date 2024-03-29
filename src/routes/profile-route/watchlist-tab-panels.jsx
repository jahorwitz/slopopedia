import { MovieCardList, Tabber } from "../../components";

export const WatchlistTabPanels = ({ wishList, watchedList }) => {
  return (
    <Tabber.TabPanels>
      <Tabber.TabPanel>
        <MovieCardList movies={wishList} colSpanOne />
      </Tabber.TabPanel>
      <Tabber.TabPanel>
        <MovieCardList movies={watchedList} colSpanOne />
      </Tabber.TabPanel>
    </Tabber.TabPanels>
  );
};

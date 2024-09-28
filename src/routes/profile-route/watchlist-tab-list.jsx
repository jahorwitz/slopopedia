import { Tabber } from "../../components";

export const WatchlistTabList = ({ wishList, watchedList }) => {
  return (
    <div data-test-id="watchlist-tab-list-tabber-container">
      <Tabber.TabList
        tabs={[
          `SLOPS TO GOBBLE(${wishList?.length ?? 0})`,
          `SLOPS IVE GOBBLED(${watchedList?.length ?? 0})`,
        ]}
      />
    </div>
  );
};

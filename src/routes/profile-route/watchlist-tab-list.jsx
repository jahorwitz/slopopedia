import { Tabber } from "../../components";

export const WatchlistTabList = ({ wishList, watchedList }) => {
  return (
    <div>
      <Tabber.TabList
        tabs={[
          `SLOPS TO GOBBLE(${wishList?.length ?? 0})`,
          `SLOPS IVE GOBBLED(${watchedList?.length ?? 0})`,
        ]}
      />
    </div>
  );
};

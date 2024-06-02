import { Tabber } from "../../components";
import { useCurrentUser } from "../../hooks";
import { WatchlistTabList } from "./watchlist-tab-list";
import { WatchlistTabPanels } from "./watchlist-tab-panels";

export const WatchlistTabber = () => {
  const { currentUser } = useCurrentUser();

  const wishList = currentUser?.wishlist;

  const watchedList = currentUser?.watched;

  return (
    <Tabber>
      <WatchlistTabList wishList={wishList} watchedList={watchedList} />
      <WatchlistTabPanels wishList={wishList} watchedList={watchedList} />
    </Tabber>
  );
};

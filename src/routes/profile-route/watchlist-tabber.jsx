import { Tabber } from "../../components";
import { useCurrentUser } from "../../hooks";
import { WatchlistTabList } from "./watchlist-tab-list";
import { WatchlistTabPanels } from "./watchlist-tab-panels";

export const WatchlistTabber = () => {
  const { currentUser } = useCurrentUser();

  const wishList = currentUser?.wishlist;

  const watchedList = currentUser?.watched;

  return (
    <Tabber data-test-id="watchlist-tabber">
      <WatchlistTabList
        wishList={wishList}
        watchedList={watchedList}
        data-test-id="watchlist-tabber-tab-list"
      />
      <WatchlistTabPanels
        wishList={wishList}
        watchedList={watchedList}
        data-test-id="watchlist-tabber-tab-panels"
      />
    </Tabber>
  );
};

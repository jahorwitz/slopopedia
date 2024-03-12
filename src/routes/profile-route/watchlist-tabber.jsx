import { useQuery } from "@apollo/client";
import { useMemo } from "react";
import { Tabber } from "../../components";
import { GET_USER_WATCHLIST } from "../../graphql";
import { useCurrentUser } from "../../hooks";
import { WatchlistTabList } from "./watchlist-tab-list";
import { WatchlistTabPanels } from "./watchlist-tab-panels";

export const WatchlistTabber = () => {
  const { currentUser } = useCurrentUser;

  const watchlistQuery = useQuery(GET_USER_WATCHLIST, {
    variables: { where: { id: currentUser?.id } },
  });

  const wishList = useMemo(() => {
    return watchlistQuery.data?.user?.wishlist?.map((movie) => {
      return { ...movie, size: 1 };
    });
  }, [watchlistQuery.data]);

  const watchedList = useMemo(() => {
    return watchlistQuery.data?.user?.watched?.map((movie) => {
      return { ...movie, size: 1 };
    });
  }, [watchlistQuery.data]);

  return (
    <Tabber>
      <WatchlistTabList wishList={wishList} watchedList={watchedList} />
      <WatchlistTabPanels wishList={wishList} watchedList={watchedList} />
    </Tabber>
  );
};

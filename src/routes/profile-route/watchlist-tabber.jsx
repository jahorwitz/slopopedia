import { useQuery } from "@apollo/client";
import { Tab } from "@headlessui/react";
import { useContext, useMemo } from "react";
import { GET_USER_WATCHLIST } from "../../graphql";
import { CurrentUserContext } from "../../store/current-user-context";
import { TabList } from "./watchlist-tab-list";
import { TabPanels } from "./watchlist-tab-panels";

export const Tabber = () => {
  const { currentUser } = useContext(CurrentUserContext);

  const watchlistQuery = useQuery(GET_USER_WATCHLIST, {
    variables: { where: { id: currentUser.id } },
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
    <Tab.Group>
      <TabList wishList={wishList} watchedList={watchedList} />
      <TabPanels wishList={wishList} watchedList={watchedList} />
    </Tab.Group>
  );
};

Tabber.displayName = "Tabber";

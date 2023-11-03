import sidebarCamera from "../images/sidebar-camera.svg";
import sidebarCrown from "../images/sidebar-crown.svg";
import sidebarHeart from "../images/sidebar-heart.svg";
import sidebarMagnify from "../images/sidebar-magnify.svg";
import { HorizontalMenu, HorizontalMenuItem } from "./index";

export const ProfileHorizontalMenu = () => {
  const menuItems = [
    {
      title: "Me goblin",
      src: sidebarCrown,
      link: "/profile",
    },
    {
      title: "Slop fests",
      src: sidebarCamera,
      link: "/fests",
    },
    {
      title: "Recommended-A-Slop",
      src: sidebarHeart,
      link: "/recommend",
    },
    {
      title: "Settings",
      src: sidebarMagnify,
      link: "/profile-settings",
    },
  ];

  return (
    <HorizontalMenu>
      {menuItems.map((item, index) => {
        return (
          <HorizontalMenuItem key={index} link={item.link} title={item.title} />
        );
      })}
    </HorizontalMenu>
  );
};

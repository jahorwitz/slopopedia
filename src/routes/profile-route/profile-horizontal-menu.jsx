import { HorizontalMenu, Tabber } from "../../components";
import sidebarCamera from "../../images/sidebar-camera.svg";
import sidebarCrown from "../../images/sidebar-crown.svg";
import sidebarHeart from "../../images/sidebar-heart.svg";
import sidebarMagnify from "../../images/sidebar-magnify.svg";

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
    <div>
      <HorizontalMenu>
        {menuItems.map((item) => {
          return (
            <HorizontalMenu.Item
              key={item.title}
              link={item.link}
              title={item.title}
            />
          );
        })}
      </HorizontalMenu>
      <div className="mt-8 ml-5">
        <Tabber />
      </div>
    </div>
  );
};

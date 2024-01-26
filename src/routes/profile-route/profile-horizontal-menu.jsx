import { HorizontalMenu } from "../../components";
import sidebarCamera from "../../images/sidebar-camera.svg";
import sidebarCrown from "../../images/sidebar-crown.svg";
import sidebarHeart from "../../images/sidebar-heart.svg";
import sidebarWrench from "../../images/sidebar-wrench.svg";

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
      link: "/profile/fests",
    },
    {
      title: "Recommended-A-Slop",
      src: sidebarHeart,
      link: "/profile/recommend",
    },
    {
      title: "Settings",
      src: sidebarWrench,
      link: "/profile/settings",
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
      <div className="mt-8 ml-5"></div>
    </div>
  );
};

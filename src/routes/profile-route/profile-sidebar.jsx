import { Button, Sidebar } from "../../components";
import sidebarArrow from "../../images/sidebar-arrow.svg";
import sidebarCamera from "../../images/sidebar-camera.svg";
import sidebarCrown from "../../images/sidebar-crown.svg";
import sidebarHeart from "../../images/sidebar-heart.svg";
import sidebarWrench from "../../images/sidebar-wrench.svg";

export const ProfileSidebar = () => {
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
    {
      title: "Logout",
      src: sidebarArrow,
      type: Button,
    },
  ];

  return (
    <div className="flex flex-row mt-10">
      <div className="mr-32 ml-5 ">
        <Sidebar>
          {menuItems.map((item, index) => {
            return (
              <div key={index} className="flex  ">
                <img className="h-8 w-8 " src={item.src} alt={item.title} />
                <div className="mt-1">
                  <Sidebar.Item link={item.link} title={item.title} />
                </div>
              </div>
            );
          })}
        </Sidebar>
      </div>
    </div>
  );
};

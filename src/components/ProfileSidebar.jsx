import sidebarArrow from "../images/sidebar-arrow.svg";
import sidebarCamera from "../images/sidebar-camera.svg";
import sidebarCrown from "../images/sidebar-crown.svg";
import sidebarHeart from "../images/sidebar-heart.svg";
import sidebarMagnify from "../images/sidebar-magnify.svg";
import { Button, Sidebar, SidebarItem } from "./index";

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
    <Sidebar>
      {menuItems.map((item, index) => {
        return (
          <div key={index} className="flex  ">
            <img className="h-8 w-8 " src={item.src} alt={item.title} />
            <div className="mt-1">
              <SidebarItem link={item.link} title={item.title} />
            </div>
          </div>
        );
      })}
      <div className="flex flex-row">
        <img className="h-8 w-8 mr-4" src={sidebarArrow} />
        <Button
          title="Log out"
          className="hover:border-b-[3px] mb-6 hover:border-black hover:text-black text-gray-500 text-md font-arialBold"
        >
          Log out
        </Button>
      </div>
    </Sidebar>
  );
};

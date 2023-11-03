import { HorizontalMenu, HorizontalMenuItem} from "./index";
import sidebarCamera from "../images/sidebar-camera.svg";
import sidebarCrown from "../images/sidebar-crown.svg";
import sidebarHeart from "../images/sidebar-heart.svg";
import sidebarMagnify from "../images/sidebar-magnify.svg";

export const ProfileHorizontalMenu = () => {

    const menuItems = [
        {
            title: "Me goblin",
            src: sidebarCrown,
            link: "#"
        },
        {
            title: "Slop fests",
            src: sidebarCamera,
            link: "#"
        },
        {
            title: "Recommended-A-Slop",
            src: sidebarHeart,
            link: "#"
        },
        {
            title: "Settings",
            src: sidebarMagnify,
            link: "#",
        }
    ]

    return (
        <HorizontalMenu>
          {menuItems.map((item, index) => {
            return (
              <HorizontalMenuItem key={index} link={item.link} title={item.title} />
            );
          })}
        </HorizontalMenu>
    );
}
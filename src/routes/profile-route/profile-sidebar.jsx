import { useMutation } from "@apollo/client";
import { Sidebar } from "../../components";
import { END_SESSION, GET_USER_AUTHENTICATION } from "../../graphql";
import { useClient, useCurrentUser } from "../../hooks";
import sidebarCamera from "../../images/sidebar-camera.svg";
import sidebarCrown from "../../images/sidebar-crown.svg";
import sidebarHeart from "../../images/sidebar-heart.svg";
import sidebarWrench from "../../images/sidebar-wrench.svg";

export const ProfileSidebar = () => {
  const { setIsLoggedIn } = useCurrentUser();
  const { setToken, client } = useClient();
  const [endSession, { data, loading, error }] = useMutation(END_SESSION, {
    refetchQueries: [GET_USER_AUTHENTICATION],
  });
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

  const handleLogout = () => {
    endSession();
    localStorage.removeItem("jwt");
    setToken(null);
    setIsLoggedIn(false);
    client.resetStore();
    location.reload();
  };

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
          <div className="flex">
            <img
              src="/src/images/sidebar-arrow.svg"
              alt="sidebar arrow"
              className="h-8 w-8"
            ></img>

            <button onClick={handleLogout} className="gap-5 ml-5">
              <span className="font-arialBold text-lg hover:border-b-[3px] hover:border-black">
                Logout
              </span>
            </button>
          </div>
        </Sidebar>
      </div>
    </div>
  );
};

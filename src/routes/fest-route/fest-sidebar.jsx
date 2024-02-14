import { useContext, useEffect } from "react";
import { useLocation } from "react-router";
import { Button, DeleteConfirmationModal, Sidebar } from "../../components";
import { useModals } from "../../store";
import { CurrentUserContext } from "../../store/current-user-context.js";

export const FestSidebar = ({ removeFest, festQuery }) => {
  const { openModal, closeModal, registerModal } = useModals();
  const { currentUser } = useContext(CurrentUserContext);

  const location = useLocation();

  const sidebarItems = [
    {
      title: "Slops to watch",
      link: `${location.pathname}`,
    },
    {
      title: "Discussion",
      link: `${location.pathname}/discussion`,
    },
    {
      title: "Edit dates & guests",
      link: "",
    },
  ];

  useEffect(() => {
    registerModal(
      "confirmation",
      <DeleteConfirmationModal confirmButtonAction={removeFest} />
    );
  }, []);

  return (
    <div>
      <div className="ml-[-1.25rem]">
        <Sidebar>
          {sidebarItems.map((item, index) => (
            <Sidebar.Item key={index} link={item.link} title={item.title} />
          ))}
        </Sidebar>
      </div>
      {currentUser.id === festQuery.data.fest.creator.id ? (
        <div>
          <Button
            type="button"
            variant="danger"
            className="pl-0 pt-16"
            onClick={() => {
              openModal("confirmation");
            }}
          >
            Delete
          </Button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

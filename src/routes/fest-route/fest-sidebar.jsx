import { useEffect } from "react";
import { useLocation } from "react-router";
import { Button, DeleteConfirmationModal, Sidebar } from "../../components";
import { useModals } from "../../store";

export const FestSidebar = () => {
  const { openModal, closeModal, registerModal } = useModals();

  useEffect(() => {
    registerModal(
      "confirmation",
      <DeleteConfirmationModal closeModal={closeModal} buttons whiteButton />
    );
  }, []);

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

  return (
    <div>
      <div className="ml-[-1.25rem]">
        <Sidebar>
          {sidebarItems.map((item, index) => (
            <Sidebar.Item key={index} link={item.link} title={item.title} />
          ))}
        </Sidebar>
      </div>
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
    </div>
  );
};

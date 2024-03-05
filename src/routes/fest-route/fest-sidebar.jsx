import { useMutation } from "@apollo/client";
import { useContext, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import {
  Button,
  DeleteConfirmationModal,
  Sidebar,
  SlopFestModal,
} from "../../components";
import { DELETE_FEST, GET_USER_FESTS } from "../../graphql/";
import { useModals } from "../../store";
import { CurrentUserContext } from "../../store/current-user-context.js";

export const FestSidebar = ({ festQuery }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const { openModal, closeModal, registerModal } = useModals();
  const location = useLocation();
  const festId = useParams().festId;
  const navigate = useNavigate();

  // Mutation to remove fests from server
  const [deleteFest, { data, loading, error }] = useMutation(DELETE_FEST, {
    refetchQueries: [GET_USER_FESTS],
  });

  // Function to remove a Fest from server when 'delete' button is clicked
  const removeFest = () => {
    if (currentUser.id === festQuery.data.fest.creator.id) {
      deleteFest({ variables: { where: { id: festId } } });
      if (loading) return "Submitting...";
      if (error) return `Submission error! ${error.message}`;
      closeModal();
      navigate("/profile/fests");
    }
  };

  const sidebarItems = [
    {
      title: "Slops to watch",
      link: `/fests/${festId}`,
    },
    {
      title: "Discussion",
      link: `/fests/${festId}/discussion`,
    },
  ];

  // Load Delete Confirmation Modal on page load
  useEffect(() => {
    registerModal(
      "confirmation",
      <DeleteConfirmationModal confirmButtonAction={removeFest} />
    );
  }, []);

  useEffect(() => {
    registerModal(
      "edit-fest",
      <SlopFestModal buttonTitle={"Save edits"} onClose={closeModal} />
    );
  }, []);

  return (
    <div>
      <div className="ml-[-1.25rem]">
        <Sidebar>
          {sidebarItems.map((item, index) => (
            <Sidebar.Item key={index} link={item.link} title={item.title} />
          ))}
          <Button
            variant="link-secondary"
            className={"ml-5"}
            size="link"
            onClick={() => openModal("edit-fest")}
          >
            Edit dates & guests
          </Button>
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

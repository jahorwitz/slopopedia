import { useMutation } from "@apollo/client";
import { useNavigate, useParams } from "react-router";
import {
  Button,
  DeleteConfirmationModal,
  Sidebar,
  SlopFestModal,
} from "../../components";
import { DELETE_FEST, GET_USER_FESTS } from "../../graphql";
import { useCurrentUser, useModals } from "../../hooks";

export const FestSidebar = ({ festQuery }) => {
  const { currentUser } = useCurrentUser();
  const { openModal, closeModal } = useModals();
  const festId = useParams().festId;
  const navigate = useNavigate();
  const festCreatorId = festQuery?.data?.fest?.creator?.id;
  const isFestCreator = currentUser.id === festCreatorId;

  // Mutation to remove fests from server
  const [deleteFest, { data, loading, error }] = useMutation(DELETE_FEST, {
    refetchQueries: [GET_USER_FESTS],
  });

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

  function openDeleteConfirmationModal() {
    openModal(<DeleteConfirmationModal confirmButtonAction={removeFest} />);
  }

  function openEditModal() {
    openModal(
      <SlopFestModal
        buttonTitle={"Save edits"}
        location={location}
        fest={festQuery}
        onClose={closeModal}
      />
    );
  }

  return (
    <div>
      <div className="ml-[-1.25rem]">
        <Sidebar>
          {sidebarItems.map((item, index) => (
            <Sidebar.Item key={index} item={item} />
          ))}
          {isFestCreator && (
            <Button
              variant="link-secondary"
              className={"ml-5"}
              size="link"
              onClick={openEditModal}
            >
              Edit dates & guests
            </Button>
          )}
        </Sidebar>
      </div>
      {isFestCreator ? (
        <div>
          <Button
            type="button"
            variant="danger"
            className="pl-0 pt-16"
            onClick={openDeleteConfirmationModal}
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

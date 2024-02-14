import { useMutation } from "@apollo/client";
import { useContext } from "react";
import { DELETE_USER } from "../graphql/delete-user";
import { CurrentUserContext } from "../store/current-user-context";
import { Button } from "./button";
import { Modal } from "./modal";

export function DeleteUserModal({ onClose }) {
  const token = localStorage.getItem("jwt");
  const [deleteUser, { data, loading, error }] = useMutation(DELETE_USER);
  const { currentUser } = useContext(CurrentUserContext);
  const userId = currentUser.id;

  const handleCloseModal = () => {
    onClose();
  };

  const handleDeleteUserSubmit = () => {
    //loading visible
    //call deleteUser(userID)
    deleteUser({
      variables: {
        where: { id: userId },
      },
    })
      //.then(res)
      .then(({ data }) => {
        //console.log(data);
        // - - - delete stored token
        localStorage.removeItem("jwt");
        // - - - close modal
        handleCloseModal();
        window.location.reload();
        // - - - remove "loading"
        // - - - redirect to home page
        // - - - or run "logout" when that is setup
      })
      //.catch
      .catch(err);
    //.finally?
  };

  return (
    <Modal title="Are you sure?">
      <h2>This action cannot be undone</h2>
      <div>
        <Button variant="outline-danger" onClick={handleDeleteUserSubmit}>
          Yep, I'm outta here.
        </Button>
        <Button onClick={onClose}> No, I wanna stay!</Button>
      </div>
    </Modal>
  );
}

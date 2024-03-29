import { Button } from "../components/index";
import { useModals } from "../hooks";
import { Modal } from "./index";

export function DeleteConfirmationModal({ confirmButtonAction }) {
  const { closeModal } = useModals();

  return (
    <>
      <Modal title="Are you sure you want to delete?">
        <p className="text-xl font-arialRegular text-center pt-6 pb-2">
          There is no way to undo this action...
        </p>
        <div className="flex flex-row justify-center mt-6 mb-10">
          <Button
            variant="danger"
            size="sm"
            className="font-arialBold mr-2"
            onClick={confirmButtonAction}
          >
            Confirm
          </Button>
          <Button
            variant="primary"
            size="sm"
            className="font-arialBold mr-2"
            onClick={() => closeModal()}
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
}

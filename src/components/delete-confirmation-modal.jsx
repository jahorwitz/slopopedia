import { useModals } from "../store";
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
          <button
            type="button"
            className="text-danger font-arialBold mr-2"
            onClick={confirmButtonAction}
          >
            Confirm
          </button>
          <button
            type="button"
            className="text-dark font-arialBold mr-2 bg-yellow p-1 "
            onClick={() => closeModal("")}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </>
  );
}

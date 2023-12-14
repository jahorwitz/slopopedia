import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import closeButton from "../../images/close-button.png";
import whiteCloseButton from "../../images/whiteCloseButton.svg";
import { useModals } from "../../store";

export function Modal({ children, title, whiteButton }) {
  let [isOpen, setIsOpen] = useState(true);

  const { closeModal } = useModals();

  function closeThisModal() {
    setIsOpen(false);
    setTimeout(() => {
      closeModal();
    }, 250);
  }

  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center">
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeThisModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-lg-card transform overflow-hidden bg-white align-middle shadow-xl transition-all box-border">
                    <button
                      className={`w-5 h-5 absolute z-50 ${
                        whiteButton ? "top-5 right-5" : "top-10 right-10"
                      } `}
                      onClick={closeThisModal}
                    >
                      <img
                        src={whiteButton ? whiteCloseButton : closeButton}
                        alt="close-button"
                      />
                    </button>
                    {title && (
                      <Dialog.Title
                        as="h3"
                        className="text-xl scale-y-2 font-arialBold font-medium text-grey-900 text-center pt-6 my-4"
                      >
                        {title}
                      </Dialog.Title>
                    )}
                    {children}
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </>
  );
}

Modal.displayName = "Modal";

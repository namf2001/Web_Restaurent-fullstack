import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import PropTypes from "prop-types";

const Modal = ({ modalOpen, setModalOpen, children }) => {
    const cancelButtonRef = useRef(null);

    return (
        <Transition.Root show={modalOpen} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-10"
                initialFocus={cancelButtonRef}
                onClose={setModalOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-base/dark-bg-1-18 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl">
                                {children}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

Modal.propTypes = {
    modalOpen: PropTypes.bool.isRequired,
    setModalOpen: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

Modal.defaultProps = {
    children: null,
};
export default Modal;

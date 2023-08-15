import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import PropTypes from "prop-types";
import LogIn from "../LogIn";
import Register from "../Register";

const ModalAuth = ({ modalOpen, setModalOpen }) => {
    const [isLogin, setIsLogin] = useState(true);
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
                {isLogin ? (
                    <LogIn handleSwitch={() => setIsLogin(!isLogin)} />
                ) : (
                    <Register handleSwitch={() => setIsLogin(!isLogin)} />
                )}
            </Dialog>
        </Transition.Root>
    );
};

ModalAuth.propTypes = {
    modalOpen: PropTypes.bool.isRequired,
    setModalOpen: PropTypes.func.isRequired,
};

export default ModalAuth;

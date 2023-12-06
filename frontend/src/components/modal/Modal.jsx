/** @format */

import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";

const Modal = ({ modalOpen, children }) => {

    return (
        <AnimatePresence>
            {modalOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-50">
                    <motion.div
                        initial={{ opacity: 0, translateY: "4%" }}
                        animate={{ opacity: 1, translateY: "0%" }}
                        exit={{ opacity: 0, translateY: "4%" }}
                        transition={{ ease: "easeOut", duration: 0.3 }}
                        className="fixed inset-0 z-20 overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 z-20">
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    translateY: "4%",
                                    scale: 0.95,
                                }}
                                animate={{
                                    opacity: 1,
                                    translateY: "0%",
                                    scale: 1,
                                }}
                                exit={{
                                    opacity: 0,
                                    translateY: "4%",
                                    scale: 0.95,
                                }}
                                transition={{ ease: "easeOut", duration: 0.3 }}
                                className="relative transform overflow-hidden rounded-lg text-left transition-all h-auto sm:my-8 sm:w-full sm:max-w-6xl z-20">
                                {children}
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
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

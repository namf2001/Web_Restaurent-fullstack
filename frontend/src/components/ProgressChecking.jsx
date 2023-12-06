/** @format */
import lottie from "lottie-web";
import { defineElement } from "lord-icon-element"; // define "lord-icon" custom element with default properties
defineElement(lottie.loadAnimation);
import { motion } from "framer-motion";
import PropTypes from "prop-types";

const ProgressChecking = ({ status, isTable }) => {
    return (
        <div className="flex flex-row gap-6 w-full items-center justify-between px-2 my-4">
            <div className="flex flex-col mr-2 gap-2 w-24 shrink-0 items-center">
                <div className="w-4 h-4 rounded-full bg-primary-color"></div>
                <div className="text-xs font-medium self-start">
                    Riverside Flamez
                </div>
            </div>
            <div className="flex-1 relative mb-3">
                <div className="absolute w-full h-1 border-0 border-t-8 border-dotted border-t-white top-1/2 transform -translate-y-1/2"></div>
                <motion.div
                    variants={
                        status === "pending"
                            ? {
                                  hidden: {
                                      width: "0%",
                                  },
                                  visible: {
                                      width: "0%",
                                  },
                              }
                            : status === "confirmed"
                            ? {
                                  hidden: {
                                      width: "0%",
                                  },
                                  visible: {
                                      width: "20%",
                                  },
                              }
                            : {
                                  hidden: {
                                      width: "0%",
                                  },
                                  visible: {
                                      width: "100%",
                                  },
                              }
                    }
                    initial="hidden"
                    animate="visible"
                    transition={{
                        duration: 1,
                    }}
                    className="absolute w-1/4 h-1 border-0 border-t-[10px] border-t-primary-color rounded-s-full top-1/2 transform -translate-y-1/2"></motion.div>
                <motion.div
                    variants={
                        status === "pending"
                            ? {
                                  hidden: {
                                      left: "0%",
                                  },
                                  visible: {
                                      left: "0%",
                                  },
                              }
                            : status === "confirmed"
                            ? {
                                  hidden: {
                                      left: "0%",
                                  },
                                  visible: {
                                      left: "20%",
                                  },
                              }
                            : {
                                  hidden: {
                                      left: "0%",
                                  },
                                  visible: {
                                      left: "100%",
                                  },
                              }
                    }
                    initial="hidden"
                    animate="visible"
                    transition={{
                        duration: 1,
                    }}
                    className="absolute w-20 h-20 transform -translate-y-1/2 -translate-x-1/2 -top-1">
                    <lord-icon
                        // src="https://cdn.lordicon.com/fevpdbjk.json"
                        src={`
                            ${
                                !isTable
                                    ? "https://cdn.lordicon.com/fevpdbjk.json"
                                    : "https://cdn.lordicon.com/knfxypdv.json"
                            }
                        `}
                        trigger="loop"
                        colors="primary:#121331,secondary:#3a3347,tertiary:#646e78,quaternary:#ffc738,quinary:#2ca58d,senary:#f9c9c0,septenary:#f24c00,octonary:#ebe6ef"
                        stroke="0"
                        style={{
                            width: "100%",
                            height: "100%",
                        }}></lord-icon>
                </motion.div>
            </div>
            <div className="flex flex-col gap-2 w-5 shrink-0 items-center">
                <div className="w-4 h-4 rounded-full bg-primary-color"></div>
                <div className="text-xs font-medium self-start">You</div>
            </div>
        </div>
    );
};

ProgressChecking.propTypes = {
    status: PropTypes.string,
    isTable: PropTypes.bool,
};

export default ProgressChecking;

/** @format */

import { useState } from "react";
// import ModalAuth from "../components/modal/ModalAuth";
import Modal from "../components/modal/Modal";
import { FormAuth } from "../components/form";
import { AiFillGooglePlusCircle } from "react-icons/ai";

const Login = () => {
    const [modalOpen, setModalOpen] = useState(false);
    return (
        <>
            <div>
                <hr className="h-[2px] bg-base/dark-line-1 dark:bg-light-bg-1 border-0 w-[calc(100%-3rem)] mx-auto" />
                <div className="bg-[#1f1d2b] dark:bg-light-bg-2 flex flex-col justify-center w-[calc(100%-3rem)] mx-auto h-32 px-2 rounded-lg mt-2">
                    <button
                        type="button"
                        className="border-solid border-[#abbbc2] bg-[#252836] dark:bg-light-bg-1 flex flex-col justify-center gap-px h-20 shrink-0 items-center border rounded-lg"
                        onClick={() => setModalOpen(true)}
                        onKeyDown={(event) => {
                            if (event.key === "Enter" || event.key === " ") {
                                setModalOpen(true);
                            }
                        }}
                        tabIndex={0}>
                        <AiFillGooglePlusCircle className="text-4xl dark:text-dark"/>
                        <div className="text-center whitespace-nowrap text-sm font-medium leading-[18.2px] text-white dark:text-dark w-[113px]">
                            Log in with Google
                        </div>
                    </button>
                </div>
            </div>
            {/* <ModalAuth modalOpen={modalOpen} setModalOpen={setModalOpen} /> */}
            <Modal
                modalOpen={modalOpen}
                setModalOpen={() => setModalOpen(false)}>
                <FormAuth />
            </Modal>
        </>
    );
};

export default Login;

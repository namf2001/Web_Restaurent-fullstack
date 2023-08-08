// import React from "react";

import { useState } from "react";
import ModalAuth from "../components/ModalAuth";

const Customer = () => {
    const [modalOpen, setModalOpen] = useState(false);
    return (
        <>
            <div>
                <hr className="h-[1px] bg-base/dark-line-1 border-0 w-[calc(100%-3rem)] mx-auto" />
                <div className="bg-[#1f1d2b] flex flex-col justify-center w-[calc(100%-3rem)] mx-auto h-32 px-2 rounded-lg mt-2">
                    <div
                        className="border-solid border-[#abbbc2] bg-[#252836] flex flex-col justify-center gap-px h-20 shrink-0 items-center border rounded-lg"
                        onClick={() => setModalOpen(true)}>
                        <img
                            src="https://file.rendit.io/n/RFkeD8iOuztFbD7irZ5C.svg"
                            className="w-6"
                        />
                        <div className="text-center whitespace-nowrap text-sm font-medium leading-[18.2px] text-white w-[113px]">
                            Log in with Google
                        </div>
                    </div>
                </div>
            </div>
            <ModalAuth modalOpen={modalOpen} setModalOpen={setModalOpen} />
        </>
    );
};

export default Customer;

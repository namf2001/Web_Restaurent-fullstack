/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Button from "./Button";
import Cover from "../assets/images/toping.png";
import Modal from "./modal/Modal";
import FormProduct from "./form/FormProduct";

const Product = (props) => {
    const [modalOpen, setModalOpen] = useState(false);
    useEffect(() => {
        AOS.init({ once: true });
    }, []);

    return (
        <>
            <div className="flex flex-col justify-between items-center bg-base/dark-bg-2-14 rounded-2xl w-[192px] h-[273px] mt-[34px] lg:mt-[55px] p-4 lg:w-[230px] lg:h-[327px] z-10 relative product-hover hover:scale-95 transition-transform">
                <div className="mt-[-34px] lg:mt-[-50px] relative overflow-visible">
                    {/* Sản phẩm */}
                    <img
                        src={props.image}
                        alt={props.name}
                        className="product-img-1 left-50% w-[132px] h-[132px] lg:w-[160px] lg:h-[160px] object-cover sticky z-50 rounded-full"
                    />
                    {/* Toping */}
                    <img
                        src={Cover}
                        alt="/"
                        className="product-img-2 object-cover w-[132px] h-[132px] lg:w-[160px] lg:h-[160px] scale-75 absolute top-0 -z-10"
                    />
                </div>
                <div className="flex flex-col justify-center items-center gap-2">
                    <h3 className="text-sm font-semibold">{props.name}</h3>
                    <p className="text-sm font-light">$ {props.price}</p>
                    <p className="text-sm font-extralight text-light">
                        {props.quantity} Bowls available
                    </p>
                </div>
                <div className="w-full">
                    <Button
                        btnText="Order Now"
                        handler={() => {
                            setModalOpen(true);
                        }}
                    />
                </div>
            </div>
            <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
                <FormProduct
                    setModalOpen={() => {
                        setModalOpen(false);
                    }}
                    foodDetail={props}
                />
            </Modal>
        </>
    );
};

export default Product;
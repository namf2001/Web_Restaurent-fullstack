import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import authApi from "../api/authApi";
import { format } from "date-fns";
import { setUser } from "../redux/features/userSlice";
import { resizeAndCompressImage, convertFileToBase64 } from "../utils/image";

const timeout = 500;
let timer = null;
let avatar;

const Customer = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState("");
    const [date, setDate] = useState(new Date());
    const [error, setError] = useState("");

    useEffect(() => {
        setName(user !== undefined ? user.username : "");
        setEmail(user !== undefined ? user.email : "");
        setImage(user !== undefined ? user?.avatar : "");
        setDate(user !== undefined ? user.createdAt : "");
        console.log("user.createdAt:", user.createdAt);
    }, [user]);

    const navigate = useNavigate();
    useEffect(() => {
        // if user is not defined, navigate to login page
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    const handleUpdate = async (e) => {
        const { name, value } = e.target;
        if (name === "username") setName(value);
        if (name === "email") setEmail(value);
        if (name === "avatar") setImage(avatar === "" ? setImage(user.avatar) : setImage(avatar))

        if (timer) {
            clearTimeout(timer);
        }

        dispatch(setUser({ ...user, [name]: name === "avatar" ? avatar : value }));
        timer = setTimeout(() => {
            authApi
                .updateUser(user._id, {
                    [name]: name === "avatar" ? avatar : value,
                })
                .then((res) => {
                    setError("");
                    console.log(res);
                })
                .catch((error) => {
                    setError(error.data.errors[0].msg);
                });
        }, timeout);
    };

    const handleFileUpload = async (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            try {
                const compressedBlob = await resizeAndCompressImage(
                    selectedFile,
                    600,
                    600
                ); // Adjust maxWidth and maxHeight as needed
                avatar = await convertFileToBase64(compressedBlob);
                setImage(avatar);
            } catch (error) {
                console.error("Error converting to Base64:", error);
            }
        }
    };

    return (
        <div className="p-6">
            <div className="flex gap-6">
                <div
                    className="bg-base/dark-bg-2-14 flex flex-col gap-4 flex-1 h-[347px] p-6 rounded-lg"
                    id="OrderReportRoot">
                    <div className="self-start flex flex-row gap-4  items-center">
                        <label htmlFor="avatar">
                            <img
                                src={
                                    image ||
                                    "https://file.rendit.io/n/ohCGcOg1sN0JskqKa05n.png"
                                }
                                className="bg-cover bg-blend-normal object-cover bg-no-repeat self-start w-20 h-20 shrink-0 rounded-full"
                                id="Element1"
                                alt="avatar"
                            />
                        </label>
                        <input
                            type="file"
                            name="avatar"
                            id="avatar"
                            className="hidden"
                            onChange={async (e) => {
                                await handleFileUpload(e);
                                handleUpdate(e);
                            }}
                        />
                        <div className="flex flex-col gap-2 items-start">
                            <div className="font-semibold leading-[22.4px] text-white">
                                {name}
                            </div>
                            <div className=" font-semibold leading-[19.6px] text-[#abbbc2] min-w-max">
                                Member since{" "}
                                {format(new Date(date), "d MMM yyyy")}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 items-start">
                        <div className="flex justify-between w-full">
                            <span className=" font-medium text-white">
                                Name
                            </span>
                            {error && (
                                <span className="text-red-500 text-sm">
                                    {error}
                                </span>
                            )}
                        </div>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            value={name}
                            onChange={handleUpdate}
                            className={`border-solid ${
                                error ? "border-red-500" : "border-[#393c49]"
                            } bg-[#2d303e]
                            } self-stretch flex flex-col justify-center pl-3 h-12 shrink-0 items-start border rounded-lg focus:outline-none`}
                        />
                    </div>
                    <div className="flex flex-col gap-2 items-start">
                        <div className=" font-medium text-white">Email</div>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={email}
                            disabled
                            className="border-solid border-[#393c49] bg-[#2d303e] self-stretch flex flex-col justify-center pl-3 h-12 shrink-0 items-start border rounded-lg focus:outline-none"
                        />
                    </div>
                </div>
                <div
                    className="bg-base/dark-bg-2-14 flex flex-col justify-center gap-5 flex-1 p-6 rounded-lg"
                    id="MostOrderedRoot">
                    <div
                        className=" bg-base/dark-bg-2-14 flex flex-row justify-between items-center"
                        id="Header">
                        <div className="text-xl  font-semibold leading-[28px] text-white">
                            Most Ordered
                        </div>
                        <div className="border-solid border-[#393c49]  bg-base/dark-bg-2-14 self-start flex flex-row justify-center gap-2 w-24 shrink-0 h-12 items-center border rounded-lg">
                            <img
                                src="https://file.rendit.io/n/GJoiqpYsnTg9PcFIboW4.svg"
                                className="w-5 shrink-0"
                            />
                            <div
                                className="text-sm  font-medium text-white"
                                id="DineIn">
                                Today
                            </div>
                        </div>
                    </div>
                    <hr className="h-[1px] bg-base/dark-line border-0" />
                    <div className=" flex flex-col justify-start items-start gap-6 w-full">
                        <div
                            className="flex flex-row gap-4 w-full items-start"
                            id="ContentMostOrderedRoot">
                            <img
                                src="https://file.rendit.io/n/ib3pwzALIoQ357QMdYfn.svg"
                                className="w-12 shrink-0"
                                id="Image1"
                            />
                            <div className="flex flex-col gap-1 items-start">
                                <div className="text-sm font-medium text-[#e0e6e9]">
                                    Salted pasta with mushroom sauce
                                </div>
                                <div
                                    className="text-xs leading-[16.8px] text-[#abbbc2]"
                                    id="DishesOrdered">
                                    120 dishes ordered
                                </div>
                            </div>
                        </div>
                        <div
                            className="flex flex-row gap-4 w-full items-start"
                            id="ContentMostOrderedRoot">
                            <img
                                src="https://file.rendit.io/n/ib3pwzALIoQ357QMdYfn.svg"
                                className="w-12 shrink-0"
                                id="Image1"
                            />
                            <div className="flex flex-col gap-1 items-start">
                                <div className="text-sm font-medium text-[#e0e6e9]">
                                    Salted pasta with mushroom sauce
                                </div>
                                <div
                                    className="text-xs leading-[16.8px] text-[#abbbc2]"
                                    id="DishesOrdered">
                                    120 dishes ordered
                                </div>
                            </div>
                        </div>

                        <div
                            className="flex flex-row gap-4 w-full items-start"
                            id="ContentMostOrderedRoot">
                            <img
                                src="https://file.rendit.io/n/ib3pwzALIoQ357QMdYfn.svg"
                                className="w-12 shrink-0"
                                id="Image1"
                            />
                            <div className="flex flex-col gap-1 items-start">
                                <div className="text-sm font-medium text-[#e0e6e9]">
                                    Salted pasta with mushroom sauce
                                </div>
                                <div
                                    className="text-xs leading-[16.8px] text-[#abbbc2]"
                                    id="DishesOrdered">
                                    120 dishes ordered
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="bg-base/dark-bg-2-14 flex flex-col gap-2 w-full p-6 mt-6 rounded-lg"
                id="OrderReportRoot">
                <div className="flex flex-row justify-between items-start mb-1">
                    <div className="text-xl font-semibold leading-[28px] text-white mt-2">
                        {name}
                    </div>
                    <div className="border-solid border-[#393c49] flex flex-row gap-3 h-12 items-center pl-4 pr-8 py-3 border rounded-lg">
                        <img
                            src="https://file.rendit.io/n/dxfs6sbHZxPmbGuAiDCk.svg"
                            className="w-4 shrink-0"
                        />
                        <div
                            className="text-sm font-medium text-white"
                            id="DineIn">
                            Filter Order
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-4">
                    <div className="text-sm font-semibold leading-[19.6px] text-white">
                        Customer
                    </div>
                    <div className="text-sm font-semibold leading-[19.6px] text-white">
                        Menu
                    </div>
                    <div className="text-sm font-semibold leading-[19.6px] text-white">
                        Total Payment
                    </div>
                    <div className="text-sm font-semibold leading-[19.6px] text-white">
                        Status
                    </div>
                </div>
                <hr className="border-0 bg-base/dark-line h-[1px]" />
                <div className="grid grid-cols-4 h-12 shrink-0 pt-2" id="Row">
                    <div className="text-xl font-semibold leading-[28px] text-white self-center">
                        Orders #34562
                    </div>
                    <div className="text-sm leading-[19.6px] text-[#e0e6e9] mr-10">
                        Spicy seasoned seafood noodles{" "}
                    </div>
                    <div className="text-sm leading-[19.6px] text-[#e0e6e9]">
                        $20.56
                    </div>
                    <div className="bg-[rgba(235,_150,_106,_0.24)] h-6  py-1 rounded-3xl text-center text-sm font-medium text-[#ffb572]">
                        Preparing
                    </div>
                </div>
                <div className="grid grid-cols-4 h-12 shrink-0 pt-2" id="Row1">
                    <div
                        className="text-xl font-semibold leading-[28px] text-white self-center"
                        id="Orders1">
                        Orders #33212
                    </div>
                    <div className="text-sm leading-[19.6px] text-[#e0e6e9]">
                        Spicy seasoned seafood noodles{" "}
                    </div>
                    <div
                        className="text-sm leading-[19.6px] text-[#e0e6e9]"
                        id="Element2">
                        $12.56
                    </div>
                    <span className="bg-[rgba(107,_226,_190,_0.24)] h-6 py-1 rounded-3xl text-center text-sm font-medium text-[#50d1aa]">
                        Completed
                    </span>
                </div>
                <div className="grid grid-cols-4 h-12 shrink-0 pt-2" id="Row2">
                    <div className="text-xl font-semibold leading-[28px] text-white self-center">
                        Orders #33155
                    </div>
                    <div className="text-sm leading-[19.6px] text-[#e0e6e9]">
                        Spicy seasoned seafood noodles{" "}
                    </div>
                    <div className="text-sm leading-[19.6px] text-[#e0e6e9]">
                        $10.56
                    </div>
                    <span className="bg-[rgba(107,_226,_190,_0.24)] h-6 py-1 rounded-3xl text-center text-sm font-medium text-[#50d1aa]">
                        Completed
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Customer;

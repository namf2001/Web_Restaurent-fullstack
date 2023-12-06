/** @format */

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import authApi from "../../../api/authApi";
import { format } from "date-fns";
import { setUser } from "../../../redux/features/userSlice";
import {
    resizeAndCompressImage,
    convertFileToBase64,
} from "../../../utils/image";

const timeout = 500;
let timer = null;
let avatar;

const FormUser = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [date, setDate] = useState(new Date());
    const [error, setError] = useState("");

    useEffect(() => {
        setName(user !== undefined ? user.username : "");
        setEmail(user !== undefined ? user.email : "");
        setImage(user !== undefined ? user?.avatar : "");
        setDate(user !== undefined ? user.createdAt : "");
        setPhone(user !== undefined ? user.phone : "");
        setAddress(user !== undefined ? user.address : "");
    }, [user]);

    const handleUpdate = async (e) => {
        const { name, value } = e.target;
        if (name === "username") setName(value);
        if (name === "email") setEmail(value);
        if (name === "phone") setPhone(value);
        if (name === "address") setAddress(value);
        if (name === "avatar")
            setImage(avatar === "" ? setImage(user.avatar) : setImage(avatar));
        if (timer) {
            clearTimeout(timer);
        }

        dispatch(
            setUser({ ...user, [name]: name === "avatar" ? avatar : value })
        );
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
                    console.log(error);
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
        <div className="bg-base/dark-bg-2-14 dark:bg-light-bg-1 dark:text-dark flex flex-col gap-4 flex-1 h-[347px] p-6 rounded-lg">
            <div className="self-start flex flex-row gap-4  items-center">
                <label htmlFor="avatar">
                    <img
                        src={
                            image ||
                            "https://file.rendit.io/n/ohCGcOg1sN0JskqKa05n.png"
                        }
                        className="bg-cover bg-blend-normal object-cover bg-no-repeat self-start w-20 h-20 shrink-0 rounded-full"
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
                    <div className="font-semibold leading-[22.4px]">{name}</div>
                    <div className=" font-semibold leading-[19.6px] text-[#abbbc2] dark:text-slate-600 min-w-max">
                        Member since {format(new Date(date), "d MMM yyyy")}
                    </div>
                </div>
            </div>
            <div className="flex w-full gap-4">
                <div className="flex flex-col gap-2 items-start flex-1">
                    <div className="flex justify-between w-full">
                        <span className=" font-medium">Tên người dùng</span>
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
                        } bg-[#2d303e]  dark:bg-light-bg
                            self-stretch flex flex-col justify-center pl-3 h-12 shrink-0 items-start border rounded-lg focus:outline-none`}
                    />
                </div>
                <div className="flex flex-col gap-2 items-start flex-1">
                    <div className="flex justify-between w-full">
                        <span className=" font-medium">Số điện thoại</span>
                    </div>
                    <input
                        type="text"
                        name="phone"
                        id="phone"
                        value={phone}
                        onChange={handleUpdate}
                        className={`border-solid bg-[#2d303e] border-[#393c49]  dark:bg-light-bg self-stretch flex flex-col justify-center pl-3 h-12 shrink-0 items-start border rounded-lg focus:outline-none`}
                    />
                </div>
            </div>
            <div className="flex w-full gap-4">
                <div className="flex flex-col gap-2 items-start flex-1">
                    <div className=" font-medium">Email</div>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        disabled
                        className="border-solid border-[#393c49] bg-[#2d303e] dark:bg-light-bg self-stretch flex flex-col justify-center pl-3 h-12 shrink-0 items-start border rounded-lg focus:outline-none"
                    />
                </div>
                <div className="flex flex-col gap-2 items-start flex-1">
                    <div className=" font-medium">Địa chỉ</div>
                    <input
                        type="text"
                        name="address"
                        id="address"
                        value={address}
                        onChange={handleUpdate}
                        className="border-solid border-[#393c49] bg-[#2d303e] dark:bg-light-bg self-stretch flex flex-col justify-center pl-3 h-12 shrink-0 items-start border rounded-lg focus:outline-none"
                    />
                </div>
            </div>
        </div>
    );
};

export default FormUser;

/** @format */

import Button from "../Button";
import { useState } from "react";
import Logo from "../../assets/images/LogoRestaurant.svg";
import authApi from "../../api/authApi";
import { useNavigate } from "react-router-dom";
import propTypes from "prop-types";

const FormAuth = () => {
    const [isSignUpActive, setIsSignUpActive] = useState(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [usernameErrText, setUsernameErrText] = useState("");
    const [emailErrText, setEmailErrText] = useState("");
    const [passwordErrText, setPasswordErrText] = useState("");
    const [confirmPasswordErrText, setConfirmPasswordErrText] = useState("");

    const [emailErrTextLogin, setEmailErrTextLogin] = useState("");
    const [passwordErrTextLogin, setPasswordErrTextLogin] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        setUsernameErrText("");
        setEmailErrText("");
        setPasswordErrText("");
        setConfirmPasswordErrText("");
        const data = new FormData(e.target);
        const username = data.get("username").trim();
        const email = data.get("email").trim();
        const password = data.get("password").trim();
        const confirmPassword = data.get("confirmPassword").trim();
        let err = false;
        if (username === "") {
            err = true;
            setUsernameErrText("Please fill this field");
        }
        if (email === "") {
            err = true;
            setEmailErrText("Please fill this field");
        }
        if (password === "") {
            err = true;
            setPasswordErrText("Please fill this field");
        }
        if (confirmPassword === "") {
            err = true;
            setConfirmPasswordErrText("Please fill this field");
        }
        if (err) return;
        setLoading(true);
        try {
            const res = await authApi.signup({
                username,
                email,
                password,
                confirmPassword,
            });
            setLoading(false);
            localStorage.setItem("token", res.token);
            navigate("/user/");
        } catch (err) {
            const errors = err.data.errors;
            console.log(errors)
            errors.forEach((e) => {
                if (e.path === "username") {
                    setUsernameErrText(e.msg);
                }
                if (e.path === "email") {
                    setEmailErrText(e.msg);
                }
                if (e.path === "password") {
                    setPasswordErrText(e.msg);
                }
                if (e.path === "confirmPassword") {
                    setConfirmPasswordErrText(e.msg);
                }
            });
            setLoading(false);
        }
    };

    const handleLogIn = async (e) => {
        e.preventDefault();
        setEmailErrTextLogin("");
        setPasswordErrTextLogin("");
        const data = new FormData(e.target);
        const email = data.get("email").trim();
        const password = data.get("password").trim();
        let err = false;
        if (email === "") {
            err = true;
            setEmailErrTextLogin("Please fill this field");
        }
        if (password === "") {
            err = true;
            setPasswordErrTextLogin("Please fill this field");
        }
        if (err) return;
        setLoading(true);
        try {
            const res = await authApi.login({ email, password });
            setLoading(false);
            localStorage.setItem("token", res.token);
            navigate("/user/");
        } catch (err) {
            const errors = err.data.errors;
            errors.forEach((e) => {
                if (e.path === "email") {
                    setEmailErrTextLogin(e.msg);
                }
                if (e.path === "password") {
                    setPasswordErrTextLogin(e.msg);
                }
            });
            setLoading(false);
        }
    };
    return (
        <div
            className={`container mx-auto ${
                isSignUpActive ? "right-panel-active" : ""
            }`}>
            <div className="form-container flex justify-center sign-up-container bg-base/dark-bg-2-14">
                <form
                    onSubmit={handleRegister}
                    className="flex items-center justify-center flex-col gap-6 text-center w-4/5">
                    <div className="social-container">
                        <img
                            className="mx-auto h-10 w-auto"
                            src={Logo}
                            alt="Your Company"
                        />
                    </div>
                    <h1 className="text-3xl font-bold">Tạo tài khoản mới</h1>
                    <span className="text-xs">
                        or use your email for registration
                    </span>
                    <Input
                        type="text"
                        name="username"
                        placeholder="Username"
                        errText={usernameErrText}
                        handler={(e) => {
                            e.preventDefault();
                            setUsernameErrText("");
                        }}
                    />
                    <Input
                        type="email"
                        name="email"
                        placeholder="Email"
                        errText={emailErrText}
                        handler={(e) => {
                            e.preventDefault();
                            setEmailErrText("");
                        }}
                    />
                    <Input
                        type="password"
                        name="password"
                        placeholder="Password"
                        errText={passwordErrText}
                        handler={(e) => {
                            e.preventDefault();
                            setPasswordErrText("");
                        }}
                    />
                    <Input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        errText={confirmPasswordErrText}
                        handler={(e) => {
                            e.preventDefault();
                            setConfirmPasswordErrText("");
                        }}
                    />
                    {!loading ? (
                        <button className="flex w-full justify-center rounded-md bg-primary-color px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-color-67 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Đăng ký
                        </button>
                    ) : (
                        // loading button
                        <button className="flex w-full justify-center rounded-md bg-primary-color px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-color-67 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            <div
                                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                role="status">
                                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                                    Loading...
                                </span>
                            </div>
                        </button>
                    )}
                </form>
            </div>
            <div className="form-container sign-in-container flex justify-center">
                <form
                    onSubmit={handleLogIn}
                    className=" flex items-center justify-center gap-6 flex-col text-center w-4/5">
                    <div className="social-container">
                        <img
                            className="mx-auto h-10 w-auto"
                            src={Logo}
                            alt="Your Company"
                        />
                    </div>
                    <h1 className="text-3xl font-bold">Đăng Nhập</h1>
                    <span className="text-xs">or use your account</span>
                    <Input
                        type="email"
                        name="email"
                        placeholder="Email"
                        errText={emailErrTextLogin}
                        handler={(e) => {
                            e.preventDefault();
                            setEmailErrTextLogin("");
                        }}
                    />
                    <Input
                        type="password"
                        name="password"
                        placeholder="Password"
                        errText={passwordErrTextLogin}
                        handler={(e) => {
                            e.preventDefault();
                            setPasswordErrTextLogin("");
                        }}
                    />
                    <p className="my-4">Forgot your password?</p>
                    {!loading ? (
                        <button className="flex w-full justify-center rounded-md bg-primary-color px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-color-67 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Đăng nhập
                        </button>
                    ) : (
                        // loading button
                        <button className="flex w-full justify-center rounded-md bg-primary-color px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-color-67 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            <div
                                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                role="status">
                                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                                    Loading...
                                </span>
                            </div>
                        </button>
                    )}
                </form>
            </div>
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1 className="text-3xl font-bold">Chào mừng quý khách!</h1>
                        <em className="font-light  leading-5 tracking-wider my-20 mt-30">
                            Để giữ kết nối với chúng tôi, vui lòng đăng nhập với
                            thông tin cá nhân của bạn
                        </em>
                        <Button
                            btnText="Đăng nhập"
                            handler={() => setIsSignUpActive(false)}
                        />
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1 className="text-3xl font-bold">Hello, Friend!</h1>
                        <em className="font-light leading-5 tracking-wider my-20 mt-30">
                            Nhập chi tiết cá nhân của bạn và bắt đầu hành trình
                            với chúng tôi
                        </em>
                        <Button
                            btnText="Đăng ký"
                            handler={() => setIsSignUpActive(true)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const Input = ({ type, placeholder, name, errText, handler }) => {
    return (
        <div className="w-full relative">
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                onFocus={handler}
                className={`
                border-2
                ${
                    errText
                        ? "border-red-500 placeholder:text-red-500"
                        : "placeholder:text-light"
                }
                bg-base/dark-line block rounded-md border-0 py-1.5 pl-4 w-full h-12 text-light ring-1 ring-inset ring-gray-700  focus:ring-2 focus:ring-inset focus:ring-offset-gray-950 focus:outline-none text-sm leading-6`}
            />
            {errText && (
                <span className="text-red-500 text-sm absolute right-0">
                    {errText}
                </span>
            )}
        </div>
    );
};

Input.propTypes = {
    type: propTypes.string.isRequired,
    placeholder: propTypes.string.isRequired,
    name: propTypes.string.isRequired,
    errText: propTypes.string.isRequired,
    handler: propTypes.func,
};

export default FormAuth;

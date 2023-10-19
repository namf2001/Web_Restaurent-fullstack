import { Fragment, useState } from "react";
import Logo from "../assets/images/LogoRestaurant.svg";
import { Dialog, Transition } from "@headlessui/react";
import PropTypes from "prop-types";
import authApi from "../api/authApi";
import { useNavigate } from "react-router-dom";

const LogIn = ({ handleSwitch }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [emailErrText, setEmailErrText] = useState("");
    const [passwordErrText, setPasswordErrText] = useState("");

    const handleLogIn = async (e) => {
        e.preventDefault();
        setEmailErrText("");
        setPasswordErrText("");

        const data = new FormData(e.target);
        const email = data.get("email").trim();
        const password = data.get("password").trim();

        let err = false;

        if (email === "") {
            err = true;
            setEmailErrText("Please fill this field");
        }
        if (password === "") {
            err = true;
            setPasswordErrText("Please fill this field");
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
                if (e.param === "email") {
                    setEmailErrText(e.msg);
                }
                if (e.param === "password") {
                    setPasswordErrText(e.msg);
                }
            });
            setLoading(false);
        }
    };
    return (
        <>
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
                        <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-base/dark-bg-1-18 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            {/* form login */}
                            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                                    <img
                                        className="mx-auto h-10 w-auto"
                                        src={Logo}
                                        alt="Your Company"
                                    />
                                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                                        Log in to your account
                                    </h2>
                                </div>

                                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                                    <form
                                        className="space-y-6"
                                        onSubmit={handleLogIn}>
                                        <div>
                                            <label
                                                htmlFor="email"
                                                className="block text-sm font-medium leading-6 text-white">
                                                Email address
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    autoComplete="email"
                                                    required
                                                    className="bg-base/dark-line block rounded-md border-0 py-1.5 pl-3 w-full text-light ring-1 ring-inset ring-gray-700 placeholder:text-light focus:ring-2 focus:ring-inset focus:ring-offset-gray-950 focus:outline-none text-sm leading-6"
                                                />
                                            </div>
                                            {/* error */}
                                            <div className="text-sm text-red-500">
                                                {emailErrText}
                                            </div>
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="password"
                                                className="block text-sm font-medium leading-6 text-white">
                                                Password
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="password"
                                                    name="password"
                                                    type="password"
                                                    autoComplete="current-password"
                                                    className="bg-base/dark-line block rounded-md border-0 py-1.5 pl-3 w-full text-light ring-1 ring-inset ring-gray-700 placeholder:text-light focus:ring-2 focus:ring-inset focus:ring-offset-gray-950 focus:outline-none text-sm leading-6"
                                                />
                                            </div>
                                            {/* error */}
                                            <div className="text-sm text-red-500">
                                                {passwordErrText}
                                            </div>
                                        </div>
                                        <div>
                                            {!loading ? (
                                                <button className="flex w-full justify-center rounded-md bg-primary-color px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-color-67 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                                    Log in
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
                                        </div>
                                    </form>

                                    <p className="mt-10 text-center text-sm text-gray-500">
                                        Not a member?{" "}
                                        <a
                                            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                                            onClick={handleSwitch}>
                                            Register now
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </div>
        </>
    );
};

LogIn.propTypes = {
    handleSwitch: PropTypes.func,
};

export default LogIn;

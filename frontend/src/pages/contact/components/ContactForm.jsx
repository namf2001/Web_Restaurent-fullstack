/** @format */

import { useState } from "react";
import { Button } from "../../../components";

const ContactForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    return (
        <div className="w-full">
            <form>
                <div className="w-full mb-8">
                    <label htmlFor="name" className="text-xl dark:text-dark">
                        Tên của bạn
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter your name"
                            className="w-full p-4 text-gray-400 dark:text-slate-600 bg-base/dark-bg-2-14 dark:bg-light-bg-1 rounded-lg outline-none mt-4 focus:ring-2 focus:ring-primary-color focus:ring-opacity-50 dark:placeholder:text-slate-600"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                </div>
                <div className="w-full mb-8">
                    <label htmlFor="email" className="text-xl dark:text-dark">
                        Email của bạn
                        <input
                            type="text"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            className="w-full p-4 text-gray-400 dark:text-slate-600 bg-base/dark-bg-2-14 dark:bg-light-bg-1 rounded-lg outline-none mt-4 focus:ring-2 focus:ring-primary-color focus:ring-opacity-50 dark:placeholder:text-slate-600"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                </div>
                <div className="w-full mb-8">
                    <label htmlFor="message" className="text-xl dark:text-dark">
                        Your message
                        <textarea
                            id="message"
                            name="message"
                            placeholder="Enter your message"
                            className="w-full p-4 text-gray-400 dark:text-slate-600 bg-base/dark-bg-2-14 dark:bg-light-bg-1 rounded-lg outline-none mt-4 focus:ring-2 focus:ring-primary-color focus:ring-opacity-50 min-h-[250px] resize-y dark:placeholder:text-slate-600"
                            value={message}
                            onChange={(e) =>
                                setMessage(e.target.value)
                            }></textarea>
                    </label>
                </div>
                <div className="w-60">
                    <Button btnText="Gửi" btnRounded="rounded-full" />
                </div>
            </form>
        </div>
    );
};

export default ContactForm;

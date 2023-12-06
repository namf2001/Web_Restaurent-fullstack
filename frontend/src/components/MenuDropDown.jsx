/* eslint-disable react/prop-types */
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef } from "react";
import { FaChevronDown } from "react-icons/fa";

const MenuDropDown = (props) => {
	const { option, options, setOptions } = props;
	const menuButtonRef = useRef(null);
	useEffect(() => {
		document.addEventListener("mousedown", handleOutsideClick);
		return () => {
			document.removeEventListener("mousedown", handleOutsideClick);
		};
	}, []);

	const handleOutsideClick = (event) => {
		if (
			menuButtonRef.current &&
			!menuButtonRef.current.contains(event.target)
		) {
			// Click outside the menu, close it or perform any other action
		}
	};

	return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex w-full justify-center rounded-md bg-base/dark-bg-2-14 dark:bg-light-bg-1 px-4 py-3 text-sm font-semibold text-white dark:text-dark shadow-sm hover:ring-2 ring-inset ring-gray-700 dark:ring-orange-200 hover:bg-gray-700">
                    <FaChevronDown
                        className="mr-1 h-5 w-5"
                        aria-hidden="true"
                    />
                    {options}
                </Menu.Button>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95">
                <Menu.Items className="absolute right-0 z-40 mt-2 w-56 origin-top-right rounded-md bg-base/dark-bg-2-14 dark:bg-light-bg-1 shadow-lg hover:ring-1 ring-black ring-opacity-5 focus:outline-none px-0">
                    <ul className="max-h-40 overflow-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-primary-color scrollbar-thumb-rounded-full">
                        {option.map((item) => {
                            return (
                                <Menu.Item key={item}>
                                    {({ active }) => (
                                        <li
                                            key={item}
                                            className={`block px-4 py-2 text-sm ${
                                                active
                                                    ? "bg-gray-700 dark:bg-orange-200 rounded-lg  text-primary-color"
                                                    : "text-white dark:text-dark"
                                            }`}
                                            tabIndex="0"
                                            onClick={() => setOptions(item)}
                                            onKeyDown={(event) => {
                                                if (event.key === "Enter" || event.key === " ") {
                                                    setOptions(item);
                                                }
                                            }}>
                                            {item}
                                        </li>
                                    )}
                                </Menu.Item>
                            );
                        })}
                    </ul>
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

export default MenuDropDown;

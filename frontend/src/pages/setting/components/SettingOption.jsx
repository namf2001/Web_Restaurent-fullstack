import PropTypes from "prop-types";
import { SettingOption as options } from "../../../assets/data/index";

const SettingOption = ({ handleOption, optionComponent }) => {
    return (
        <div className="bg-base/dark-bg-2-14 dark:bg-light-bg-1 flex  flex-col shrink-0 items-start rounded-lg h-max min-w-[275px] dark:text-dark">
            {options.map((option) => (
                <button
                    className={`relative group flex items-center gap-2 p-6 rounded-lg w-full h-full transition duration-300 ease-in-out transform hover:bg-primary-color/25 hover:text-primary-color ${
                        option.component === optionComponent
                            ? "text-primary-color bg-primary-color/25"
                            : ""
                    }`}
                    key={option.name}
                    onClick={() => handleOption(option.component)}
                    onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                            handleOption(option.component);
                        }
                    }}
                    type="button">
                    <div className="overflow-hidden bg-black/0 self-start flex flex-col mt-px w-6 h-6 shrink-0 items-center p-px">
                        {option.icon}
                    </div>
                    <div>
                        <div className="text-sm font-medium mr-8">
                            {option.name}
                        </div>
                        <div className="whitespace-nowrap text-xs text-light dark:text-slate-600">
                            {option.description}
                        </div>
                    </div>
                    {option.component === optionComponent && (
                        <p className="w-1 h-3/5 items-end bg-primary-color absolute right-0 rounded-tl rounded-bl transition-all duration-300"></p>
                    )}
                </button>
            ))}
        </div>
    );
};

SettingOption.propTypes = {
    handleOption: PropTypes.func.isRequired,
    optionComponent: PropTypes.string.isRequired,
};

export default SettingOption;

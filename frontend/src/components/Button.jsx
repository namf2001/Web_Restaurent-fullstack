/** @format */
import PropTypes from "prop-types";
import { motion } from "framer-motion";

const Button = ({
    btnText = "test",
    outline = false,
    handler = null,
    btnType = "button",
    color = "",
}) => {
    return (
        <motion.button
            type={btnType}
            className={`p-4 inline-flex items-center justify-center rounded-lg w-full text-white text-sm hover:shadow-xl transition-all ${color} ${
                outline ? "border-2 border-color" : "bg-primary-color"
            } `}
            onClick={handler}
            whileHover={{ scale: 0.9 }}
            whileTap={{ scale: 0.8 }} // Apply the hover animation
        >
            {btnText}
        </motion.button>
    );
};

Button.propTypes = {
    btnText: PropTypes.string.isRequired,
    outline: PropTypes.bool,
    handler: PropTypes.func,
    btnType: PropTypes.string,
    color: PropTypes.string,
};

export default Button;

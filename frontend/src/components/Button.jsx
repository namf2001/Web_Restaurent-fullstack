/** @format */
import PropTypes from "prop-types";
import { motion } from "framer-motion";

const Button = ({
    btnText = "test",
    outline = false,
    handler = null,
    btnType = "button",
    color = "",
    btnRounded = "rounded-lg",
}) => {
    return (
        <motion.button
            type={btnType}
            className={`p-4 inline-flex items-center justify-center ${btnRounded} w-full  font-bold hover:shadow-xl transition-all ${
                outline
                    ? "border-2 border-color text-primary-color"
                    : color || "bg-primary-color text-white"
            } `}
            onClick={handler}
            whileHover={{ opacity: 0.8 }}>
            {btnText}
        </motion.button>
    );
};

Button.propTypes = {
    // btnText: có thể là text hoặc icon
    btnText: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    outline: PropTypes.bool,
    handler: PropTypes.func,
    btnType: PropTypes.string,
    color: PropTypes.string,
    btnRounded: PropTypes.string,
};

export default Button;

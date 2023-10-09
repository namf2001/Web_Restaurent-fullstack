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
            className={`p-4 inline-flex items-center justify-center rounded-lg w-full text-white text-sm hover:shadow-xl transition-all ${
                outline
                    ? "border-2 border-color"
                    : color
                    ? color
                    : "bg-primary-color"
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
};

export default Button;

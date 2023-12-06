/** @format */
import { motion, useSpring } from "framer-motion";
import propTypes from "prop-types";

const ProgressBar = ({ scrollYProgress }) => {
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });
    return <motion.div className="fixed bottom-0 left-0 right-0 h-2 bg-primary-color origin-[0%] z-50" style={{ scaleX }} />;
};

ProgressBar.propTypes = {
    scrollYProgress: propTypes.object.isRequired,
};

export default ProgressBar;

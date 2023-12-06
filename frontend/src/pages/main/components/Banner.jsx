/** @format */

import { useRef } from "react";
import {
    motion,
    useSpring,
    useTransform,
    useMotionValue,
    useVelocity,
    useAnimationFrame,
} from "framer-motion";
import { wrap } from "@motionone/utils";

import propTypes from "prop-types";


function ParallaxText({ children, baseVelocity = 100, scrollY }) {
    const baseX = useMotionValue(0);

    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400,
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false,
    });

    /**
     * This is a magic wrapping for the length of the text - you
     * have to replace for wrapping that works for you or dynamically
     * calculate
     */
    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

    const directionFactor = useRef(1);
    useAnimationFrame((t, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

        /**
         * This is what changes the direction of the scroll once we
         * switch scrolling directions.
         */
        if (velocityFactor.get() < 0) {
            directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1;
        }
        moveBy += directionFactor.current * moveBy * velocityFactor.get();

        baseX.set(baseX.get() + moveBy);
    });

    /**
     * The number of times to repeat the child text should be dynamically calculated
     * based on the size of the text and viewport. Likewise, the x motion value is
     * currently wrapped between -20 and -45% - this 25% is derived from the fact
     * we have four children (100% / 4). This would also want deriving from the
     * dynamically generated number of children.
     */
    return (
        <div className="overflow-hidden m-0 whitespace-nowrap flex flex-nowrap">
            <motion.div
                className="font-bold uppercase text-7xl flex whitespace-nowrap flex-nowrap font-['Plaster'] dark:text-black"
                style={{ x }}>
                <span className="block mr-8">{children} </span>
                <span className="block mr-8">{children} </span>
                <span className="block mr-8">{children} </span>
                <span className="block mr-8">{children} </span>
            </motion.div>
        </div>
    );
}
const Banner = ({ scrollY }) => {
    console.log(scrollY);
    return (
        <section className="relative w-[calc(100vw-100px)] mt-24">
            <ParallaxText scrollY={scrollY} baseVelocity={-5}>
                Framer Motion
            </ParallaxText>
            <ParallaxText scrollY={scrollY} baseVelocity={5}>
                Scroll velocity
            </ParallaxText>
        </section>
    );
};

Banner.propTypes = {
    scrollY: propTypes.object,
};

ParallaxText.propTypes = {
    children: propTypes.string.isRequired,
    baseVelocity: propTypes.number,
    scrollY: propTypes.object,
};

export default Banner;

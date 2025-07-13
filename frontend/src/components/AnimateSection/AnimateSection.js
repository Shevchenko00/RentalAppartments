import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const AnimatedSection = ({
                             children,
                             direction = "left",
                             distance = 100,
                             duration = 0.6,
                             delay = 0,
                         }) => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

    const getInitialPosition = () => {
        switch (direction) {
            case "right":
                return { x: distance, opacity: 0 };
            case "top":
                return { y: -distance, opacity: 0 };
            case "bottom":
                return { y: distance, opacity: 0 };
            case "left":
            default:
                return { x: -distance, opacity: 0 };
        }
    };

    const finalState = { x: 0, y: 0, opacity: 1 };

    return (
        <motion.div
            ref={ref}
            initial={getInitialPosition()}
            animate={inView ? finalState : {}}
            transition={{ duration, delay, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    );
};

export default AnimatedSection;

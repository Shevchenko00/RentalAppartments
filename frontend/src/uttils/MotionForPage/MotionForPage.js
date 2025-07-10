'use client'
import { motion, useReducedMotion } from "framer-motion";

const MotionForPage = ({ children }) => {
    const reduceMotion = useReducedMotion();

    return (
        <motion.div
            initial={reduceMotion ? {} : {opacity: 0.95}}
            animate={reduceMotion ? {} : {opacity: 1}}
            exit={reduceMotion ? {} : {opacity: 0.95}}
            transition={{duration: 0.5, ease: "easeInOut"}}
            style={{
                willChange: "opacity",
            }}
        >
            {children}
        </motion.div>
    );
}

export default MotionForPage;
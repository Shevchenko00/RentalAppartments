'use client';
import { AnimatePresence } from 'framer-motion';

export default function ClientWrapper({ children }) {
    return <AnimatePresence mode="wait">{children}</AnimatePresence>;
}

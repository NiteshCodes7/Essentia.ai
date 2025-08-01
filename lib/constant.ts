import { Variants } from "motion";

export const containerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.2,
      duration: 0.6,
      ease: "easeInOut",
    },
  },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
};

export const pulseButtonVariants: Variants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

export const buttonVariants: Variants = {
  initial: {
    scale: 1,
    opacity: 0,
    y: 20,
  },
  animate: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      duration: 0.6,
    },
  },
  hover: {
    scale: 1.05,
    filter: "drop-shadow(0px 0px 10px rgba(255, 0, 122, 0.6))",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  tap: {
    scale: 0.95,
  },
};

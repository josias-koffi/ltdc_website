"use client";
import { motion } from "framer-motion";
import { Box } from "@mui/material";

// Defined at module level — never inside a component body — to avoid
// React treating each render as a new component type (causes remount).
const MotionBox = motion(Box);

export default MotionBox;

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const ScrollIndicator = () => {
  return (
    <motion.div
      className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer z-20"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.6 }}
      onClick={() => {
        document.getElementById("symptoms")?.scrollIntoView({ behavior: "smooth" });
      }}
    >
      <motion.div
        className="flex flex-col items-center gap-2 text-white"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-sm font-medium tracking-wider">SCROLL TO EXPLORE</span>
        <ChevronDown className="w-6 h-6" />
      </motion.div>
    </motion.div>
  );
};

export default ScrollIndicator;

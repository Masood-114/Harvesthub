import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";

const SuccessToast = ({ show, message, className }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.4 }}
          className={`fixed top-6 right-6 z-50 flex items-center gap-3
             bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-xl ${className}`}
        >
          <CheckCircle className="w-5 h-5" />
          <span className="text-sm font-medium">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuccessToast;

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { Card } from "./ui/card";
import { MdOutlineDelete } from "react-icons/md";

const ConfirmDelete = ({ open, onClose, onConfirm }) => {
  if (!open) return null;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: -50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: -50 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <Card className="w-full max-w-sm p-6 space-y-4 relative">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 p-1 rounded hover:bg-slate-100"
              >
                <X size={20} />
              </button>

              {/* Logo / Illustration */}
              <div className="flex justify-center">
                <MdOutlineDelete className="text-3xl text-red-600" />
              </div>

              {/* Header */}
              <h3 className="text-xl font-bold text-center text-slate-900">
                Delete Product?
              </h3>

              {/* Description */}
              <p className="text-center text-sm text-slate-500">
                This action is permanent and cannot be undone.
              </p>

              {/* Action Buttons */}
              <div className="flex justify-center gap-4 mt-4">
                <Button variant="outline" onClick={onClose} className="w-1/2">
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={onConfirm}
                  className="w-1/2"
                >
                  Delete
                </Button>
              </div>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ConfirmDelete;

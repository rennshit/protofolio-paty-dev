import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import Button from "./Button";

export default function ConfirmDialog({ open, title, description, onConfirm, onCancel, busy }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
          onClick={onCancel}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-strong w-full max-w-sm rounded-2xl p-6"
            role="alertdialog"
            aria-modal="true"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/10">
              <AlertTriangle className="h-5 w-5 text-red-400" />
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold">{title}</h3>
            <p className="mt-1.5 text-sm text-muted">{description}</p>
            <div className="mt-6 flex justify-end gap-2">
              <Button variant="ghost" size="sm" onClick={onCancel} disabled={busy}>
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={onConfirm}
                disabled={busy}
                className="bg-red-500 text-white hover:bg-red-500/90"
              >
                {busy ? "Deleting…" : "Delete"}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

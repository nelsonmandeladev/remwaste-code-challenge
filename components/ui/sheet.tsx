import { cn } from "libs";
import { IconX } from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";

interface SheetProps extends Omit<React.ComponentProps<"div">, "children"> {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const Sheet = ({
  className,
  children,
  isOpen,
  setIsOpen,
  ...props
}: SheetProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/20 z-[99]"
          />
          {/* Sheet */}
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            className={cn(
              "fixed h-full inset-y-0 right-0 z-[100] flex flex-col",
              className
            )}
          >
            <div className="w-full md:w-[400px] h-full bg-white shadow-lg relative">
              <div className="absolute top-0 right-0 z-30 px-4 pt-1 flex justify-end">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 bg-neutral-100 rounded-full transition-colors cursor-pointer text-slate-500"
                  aria-label="Close sheet"
                >
                  <IconX className="w-5 h-5" />
                </button>
              </div>
              <div className="h-full overflow-y-auto">
                {children}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
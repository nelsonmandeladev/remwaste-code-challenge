import React, { useState, createContext, useContext } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  IconAdjustmentsHorizontal,
  IconLayoutSidebarRightCollapse,
  IconX,
} from "@tabler/icons-react";
import { cn } from "libs";
import { Render } from "components/renderers/conditional";

interface Links {
  label: string;
  href: string;
  icon: React.JSX.Element | React.ReactNode;
}

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined,
);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  const [openState, setOpenState] = useState(false);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate: animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};

export const SidebarBody = ({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
} & Omit<React.ComponentProps<typeof motion.div>, "children">) => {
  return (
    <>
      <DesktopSidebar className={className} {...props}>
        {children}
      </DesktopSidebar>
      <MobileSidebar
        className={className}
        {...(props as React.ComponentProps<"div">)}
      >
        {children}
      </MobileSidebar>
    </>
  );
};

export const DesktopSidebar = ({
  className,
  children,
  ...props
}: {
  className?: string;
  children: React.ReactNode;
} & Omit<React.ComponentProps<typeof motion.div>, "children" | "animate">) => {
  const { open, setOpen, animate } = useSidebar();
  return (
    <>
      <motion.div
        className={cn(
          "h-full hidden md:flex md:flex-col bg-white w-[300px] shrink-0 relative",
          {
            "p-4": open,
          },
          className,
        )}
        animate={{
          width: animate ? (open ? "300px" : "0px") : "300px",
        }}
        {...(props as any)}
      >
        <button
          onClick={() => setOpen(!open)}
          className={cn(
            "absolute top-4 z-30 bg-white-100 rounded-full size-12 flex items-center justify-center shadow-xl bg-white transition-colors cursor-pointer",
            {
              "-right-6": open,
              "md:-right-16 xl:-right-20": !open,
            },
          )}
          aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
        >
          <Render>
            <Render.If isTrue={open}>
              <IconLayoutSidebarRightCollapse
                className="text-blue-800 transition-transform"
                size={25}
              />
            </Render.If>
            <Render.Else>
              <IconAdjustmentsHorizontal
                className="text-blue-800 transition-transform"
                size={25}
              />
            </Render.Else>
          </Render>
        </button>
        <div
          className={cn(
            "transition-opacity duration-200",
            open ? "opacity-100" : "opacity-0 pointer-events-none",
          )}
        >
          {children}
        </div>
      </motion.div>
    </>
  );
};

export const MobileSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => {
  const { open, setOpen } = useSidebar();
  return (
    <>
      <div
        className={cn("absolute left-4 top-4 z-30 flex md:hidden")}
        {...props}
      >
        <button
          onClick={() => setOpen(!open)}
          className={cn(
            "bg-white-100 rounded-full size-12 flex items-center justify-center shadow-xl bg-white transition-colors",
          )}
          aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
        >
          <IconAdjustmentsHorizontal
            className={cn("text-blue-800 transition-transform")}
            size={25}
          />
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className={cn(
                "fixed h-full w-full inset-0 bg-white p-6 z-[100] flex flex-col justify-between",
                className,
              )}
            >
              <div
                className="absolute right-4 top-4 z-50"
                onClick={() => setOpen(!open)}
              >
                <IconX />
              </div>
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

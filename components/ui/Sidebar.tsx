"use client";
import { cn } from "../../lib/utils";
import React, { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconMenu2, IconX } from "@tabler/icons-react";

interface SidebarContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  animate: boolean;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

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
  animate = true
}: { children: ReactNode; open?: boolean; setOpen?: (open: boolean) => void; animate?: boolean; }) => {
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
  animate
}: { children: ReactNode; open?: boolean; setOpen?: (open: boolean) => void; animate?: boolean; }) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};

export const SidebarBody = ({ className, children }: { children: ReactNode; className?: string; }) => {
  return (
    <>
      <DesktopSidebar className={className}>{children}</DesktopSidebar>
      <MobileSidebar>{children}</MobileSidebar>
    </>
  );
};

export const DesktopSidebar = ({
  className,
  children,
  ...props
}: { className?: string; children: ReactNode; }) => {
  const { open, setOpen, animate } = useSidebar();
  return (
    <>
      <motion.div
        className={cn(
          "h-full px-4 py-4 hidden md:flex md:flex-col bg-neutral-950/95 backdrop-blur-sm w-[300px] shrink-0 z-10",
          className
        )}
        animate={{
          width: animate ? (open ? "300px" : "80px") : "300px",
        }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        {...props}>
        {children}
      </motion.div>
    </>
  );
};

export const MobileSidebar = ({
  children,
}: { children: ReactNode; }) => {
  const { open, setOpen } = useSidebar();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div
        className="fixed top-0 left-0 right-0 h-14 px-4 py-3 flex items-center justify-between bg-neutral-950/90 backdrop-blur-sm w-full z-50 shadow-md md:hidden"
      >
        <button
          className="p-2 rounded-md bg-neutral-900/80 text-white hover:bg-neutral-800 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Menu mobile"
        >
          <IconMenu2 className="text-neutral-100" />
        </button>
        <span className="text-sm font-semibold text-white">Menu</span>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="sidebar-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/40 z-[95] md:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.div
              key="sidebar-panel"
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed top-0 left-0 bottom-0 w-[min(90vw,320px)] bg-neutral-950 p-4 pt-5 z-[100] shadow-2xl overflow-y-auto md:hidden"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-lg font-semibold text-white">Navigation</span>
                <button
                  className="p-2 rounded-md bg-neutral-900/80 text-white hover:bg-neutral-800 transition-colors"
                  onClick={() => setOpen(false)}
                  aria-label="Fermer le menu mobile"
                >
                  <IconX />
                </button>
              </div>
              <div className="flex flex-col gap-4">
                {children}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export const SidebarLink = ({
  link,
  className,
  ...props
}: { link: { label: string; href: string; icon: ReactNode; }; className?: string; }) => {
  const { open, animate } = useSidebar();
  return (
    <a
      href={link.href}
      className={cn("flex w-full items-center justify-start gap-4 group/sidebar py-4", className)}
      {...props}>
      {link.icon && <div className="w-12 h-1 flex items-center justify-center flex-shrink-0">{link.icon}</div>}
      <span className="text-white text-2xl font-semibold group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0">
        {link.label}
      </span>
    </a>
  );
};

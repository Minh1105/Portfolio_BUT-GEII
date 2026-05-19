"use client";
import { cn } from "../../lib/utils";
import React, { useState, createContext, useContext, ReactNode } from "react";
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

export const SidebarBody = (props: { children: ReactNode; className?: string; }) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...(props)} />
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
          "h-full px-4 py-4 hidden md:flex md:flex-col bg-neutral-100/50 dark:bg-neutral-800/50 backdrop-blur-sm w-[300px] shrink-0 z-10",
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
  className,
  children,
  ...props
}: { className?: string; children: ReactNode; }) => {
  const { open, setOpen } = useSidebar();
  return (
    <>
      <div
        className={cn(
          "h-10 px-4 py-4 flex flex-row md:hidden items-center justify-between bg-neutral-100/50 dark:bg-neutral-800/50 backdrop-blur-sm w-full z-10",
          className
        )}
        {...props}>
        <div className="flex justify-between items-center w-full gap-3">
          <button
            className="p-2 rounded-md bg-neutral-900/80 text-white hover:bg-neutral-800 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Menu mobile"
          >
            <IconMenu2 className="text-neutral-100" />
          </button>
          <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">Menu</span>
        </div>
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
                "fixed inset-0 h-full w-full bg-white dark:bg-neutral-900 p-4 sm:p-6 z-[100] flex flex-col justify-between overflow-y-auto",
                className
              )}>
              <div className="flex items-center justify-between mb-6">
                <span className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Navigation</span>
                <button
                  className="p-2 rounded-md bg-neutral-900/80 text-white hover:bg-neutral-800 transition-colors"
                  onClick={() => setOpen(false)}
                  aria-label="Fermer le menu mobile"
                >
                  <IconX />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
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
      className={cn("flex w-full items-center justify-start gap-2 group/sidebar py-2", className)}
      {...props}>
      {link.icon}
      <motion.span
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        className="text-neutral-700 dark:text-neutral-200 text-xl group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0">
        {link.label}
      </motion.span>
    </a>
  );
};

import './App.css'
import LiquidChrome from './components/LiquidChrome';
import { Sidebar, SidebarBody } from './components/ui/Sidebar'
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "./lib/utils";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconHome,
  IconX,
  IconUserBolt,
} from "@tabler/icons-react";
import CardSwap, { Card } from './components/CardSwap';

// Données des liens de la sidebar (déplacées en dehors du composant pour l'optimisation)
const links = [
  {
    label: "Accueil",
    href: "#accueil",
    icon: (
      <IconHome className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Projets",
    href: "#projets",
    icon: (
      <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Mes stages",
    href: "#stage",
    icon: (
      <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Compétences",
    href: "#competences",
    icon: (
      <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Contacts",
    href: "#contacts",
    icon: (
      <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
];
function App() {


  const appRef = useRef(null); // Référence pour le conteneur principal de l'application

  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div ref={appRef} className="flex h-screen bg-white dark:bg-neutral-950">
      {/* 1. Sidebar */}
      <Sidebar>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto">
            <Logo />
            {/* Les liens ont été retirés car les sections n'existent plus */}
          </div>
          <div>
            <UserProfile />
          </div>
        </SidebarBody>
      </Sidebar>

      {/* 2. Contenu principal */}
      <div className="flex-1 overflow-hidden relative">
        <div className="relative z-10 h-full w-full">
          {/* Le fond LiquidChrome est maintenant directement ici */}
          <LiquidChrome
            baseColor={[0.02, 0.05, 0.2]}
            speed={0.04}
            amplitude={0.3}
            interactive={false}
          />

          {/* 3. CardSwap en bas à droite (toujours visible) */}
          <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-8 right-8 z-30 card-swap-container"
              >
                <div style={{ height: '600px', position: 'relative' }}>
                  <CardSwap cardDistance={70} verticalDistance={100} delay={5000} pauseOnHover={false}>
                    <Card>
                      <h3>Projet de la carte basse consomation et communication UHF</h3>
                      <p>Your content here</p>
                    </Card>
                    <Card>
                      <h3>Projet ...</h3>
                      <p>Your content here</p>
                    </Card>
                    <Card>
                      <h3>Projet ... </h3>
                      <p>Your content here</p>
                    </Card>
                  </CardSwap>
                </div>
              </motion.div>
          </AnimatePresence>
        </div>

        {/* 4. Modale de projet */}
        <AnimatePresence>
          {selectedProject && (
            <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export const Logo = () => {
  return (
    <div
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
      style={{ cursor: 'pointer' }}
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Portfolio
      </motion.span>
    </div>
  );
};

export const LogoIcon = () => {
  return (
    <div
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
      style={{ cursor: 'pointer' }}
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </div>
  );
};

const UserProfile = () => {
  return (
    <div>
      <a
        href="https://www.linkedin.com/in/minh-quan-ly-1111m2005a"
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "flex items-center justify-start gap-2  group/sidebar py-2"
        )}
      >
        <img
          src="https://assets.aceternity.com/manu.png"
          className="h-7 w-7 flex-shrink-0 rounded-full"
          width={50}
          height={50}
          alt="Avatar"
        />
        <AnimatePresence>
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-neutral-700 dark:text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition-transform duration-150 whitespace-pre inline-block">Ly Minh-Quan</motion.span>
        </AnimatePresence>
      </a>
    </div>
  );
};

export default App

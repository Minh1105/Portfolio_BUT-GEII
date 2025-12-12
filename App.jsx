import './App.css'
import LiquidChrome from './components/LiquidChrome';
import { Sidebar, SidebarBody, SidebarLink } from './components/ui/Sidebar'
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "./lib/utils";
import {
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
  IconArrowLeft,
} from "@tabler/icons-react";



function App() {
  const links = [
    {
      label: "Dashboard",
      href: "#",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      href: "#",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      href: "#",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);

  return (
    // Ajout du style pour le défilement fluide
    <div className="relative w-full h-screen" style={{ scrollBehavior: "smooth" }}>
      {/* 1. Sidebar avec un fond solide */}
      <div className="absolute top-0 left-0 h-full z-20">
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Manu Arora",
                href: "#",
                icon: (
                  <img
                    src="https://assets.aceternity.com/manu.png"
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
        </Sidebar>
      </div>

      {/* 2. Dashboard contenant le fond Plasma et le contenu */}
      <Dashboard scrollRef={scrollContainerRef} />

      {/* 3. CardSwap en bas à droite */}
      <AnimatePresence>
        {showCardSwap && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-8 right-8 z-30 card-swap-container"
          >
            <div style={{ height: '600px', position: 'relative' }}>
              <CardSwap cardDistance={60} verticalDistance={70} delay={7000} pauseOnHover={false}>
                <Card>
                  <h3>Card 1</h3>
                  <p>Your content here</p>
                </Card>
                <Card>
                  <h3>Card 2</h3>
                  <p>Your content here</p>
                </Card>
                <Card>
                  <h3>Card 3</h3>
                  <p>Your content here</p>
                </Card>
              </CardSwap>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export const Logo = () => {
  return (
    <a
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Acet Labs
      </motion.span>
    </a>
  );
};

export const LogoIcon = () => {
  return (
    <a
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </a>
  );
};

// Définir la couleur de base ici pour qu'elle soit stable
const liquidChromeBaseColor = [0, 0, 0.1];

// Composant Dashboard factice
const Dashboard = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full">
      {/* Le fond Plasma est maintenant ici */}
      <LiquidChrome
        baseColor={liquidChromeBaseColor}
        speed={0.05}
        amplitude={0.3}
        interactive={true}
      />
      {/* Le contenu du dashboard est par-dessus */}
      <div ref={scrollRef} className="absolute inset-0 z-10 overflow-y-auto md:pl-[60px] no-scrollbar">
        {/* Conteneur pour toutes les sections */}
        <div className="p-8 text-white">
          {/* Section Accueil */}
          <section id="accueil" className="min-h-screen flex flex-col justify-center items-center text-center">
            <div>
              <h1 className="text-5xl md:text-7xl font-bold mb-4">Ly Minh-Quan</h1>
              <p className="text-xl md:text-2xl text-neutral-300">Développeur passionné</p>
            </div>
          </section>

          {/* Section Projets */}
          <section id="projets" className="min-h-screen pt-16">
            <h2 className="text-3xl font-bold mb-8">Mes Projets</h2>
            {/* Carrousel style Netflix */}
            <InfiniteCarousel />
          </section>

          {/* Section Stage */}
          <section id="stage" className="min-h-screen pt-16">
            <h2 className="text-3xl font-bold">Mon Stage</h2>
            <p className="mt-4">Contenu sur votre stage...</p>
          </section>

          {/* Section Compétences */}
          <section id="competences" className="min-h-screen pt-16">
            <h2 className="text-3xl font-bold">Compétences</h2>
            <p className="mt-4">Liste de vos compétences...</p>
          </section>

          {/* Section Contacts */}
          <section id="contacts" className="min-h-screen pt-16">
            <h2 className="text-3xl font-bold">Contacts</h2>
            <p className="mt-4">Formulaire de contact ou informations...</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default App

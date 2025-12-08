import './App.css'
import LiquidChrome from './components/LiquidChrome';
import { Sidebar, SidebarBody, SidebarLink } from './components/ui/Sidebar'
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "./lib/utils";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconHome,
  IconUserBolt,
} from "@tabler/icons-react";
import CardSwap, { Card } from './components/CardSwap';


function App() {
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
      label: "Mon stage",
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
  const [open, setOpen] = useState(false);
  const [showCardSwap, setShowCardSwap] = useState(true);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const container = scrollContainerRef.current;

    // Gère la visibilité du CardSwap
    const handleScroll = () => {
      if (container) {
        // Si on a scrollé de plus de 50px, on cache le CardSwap
        setShowCardSwap(container.scrollTop < 50);
      }
    };

    // Bloque le défilement à la molette sauf sur les éléments autorisés
    const handleWheel = (event) => {
      const scrollableParent = event.target.closest('.allow-scroll');
      const cardSwapParent = event.target.closest('.card-swap-container');

      if (scrollableParent) {
        // Si on est sur le carrousel, on empêche la page de bouger
        // et on applique le défilement de la molette horizontalement.
        event.preventDefault();
        scrollableParent.scrollLeft += event.deltaY;
      } else if (cardSwapParent || !scrollableParent) {
        // Si on est sur le CardSwap ou n'importe où ailleurs, on bloque le défilement.
        event.preventDefault();
      }
    };

    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
      container.addEventListener("scroll", handleScroll);
    }

    // Nettoyage de l'écouteur d'événement
    return () => {
      container?.removeEventListener("wheel", handleWheel);
      container?.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
                <div key={idx} onClick={() => setOpen(false)}>
                  <SidebarLink link={link} />
                </div>
              ))}
            </div>
          </div>
          <div>
            <div onClick={() => setOpen(false)}>
              {/* Ce lien est maintenant un <a> standard pour permettre target="_blank" */}
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
                {open && (
                  <span className="text-neutral-700 dark:text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition-transform duration-150 whitespace-pre inline-block">Ly Minh-Quan</span>
                )}
              </a>
            </div>
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
      href="#accueil"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Portfolio
      </motion.span>
    </a>
  );
};

export const LogoIcon = () => {
  return (
    <a
      href="#accueil"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </a>
  );
};

// Composant pour le carrousel infini
const InfiniteCarousel = () => {
  const carouselRef = useRef(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let scrollInterval;

    const startScrolling = () => {
      scrollInterval = setInterval(() => {
        // Si on a atteint la fin, on revient au début
        if (carousel.scrollLeft >= carousel.scrollWidth / 2) {
          carousel.scrollLeft = 0;
        } else {
          carousel.scrollLeft += 1; // Vitesse de défilement
        }
      }, 25); // Intervalle pour un défilement fluide
    };

    const stopScrolling = () => {
      clearInterval(scrollInterval);
    };

    // Démarrer le défilement
    startScrolling();

    // Mettre en pause au survol
    carousel.addEventListener('mouseenter', stopScrolling);
    carousel.addEventListener('mouseleave', startScrolling);

    // Nettoyage
    return () => {
      stopScrolling();
      carousel.removeEventListener('mouseenter', stopScrolling);
      carousel.removeEventListener('mouseleave', startScrolling);
    };
  }, []);

  return (
    <div ref={carouselRef} className="flex overflow-x-auto space-x-4 p-4 allow-scroll hide-scrollbar">
      {/* Le contenu est dupliqué pour l'effet de boucle */}
      <CarouselItems />
      <CarouselItems />
    </div>
  );
};

// Items du carrousel pour éviter la répétition
const CarouselItems = () => (
  <>
    <div className="flex-shrink-0 w-80 h-48 bg-neutral-800 rounded-lg flex items-center justify-center">
      <p>Projet 1 (Image/PDF/Texte)</p>
    </div>
    <div className="flex-shrink-0 w-80 h-48 bg-neutral-800 rounded-lg flex items-center justify-center">
      <p>Projet 2</p>
    </div>
    <div className="flex-shrink-0 w-80 h-48 bg-neutral-800 rounded-lg flex items-center justify-center">
      <p>Projet 3</p>
    </div>
    <div className="flex-shrink-0 w-80 h-48 bg-neutral-800 rounded-lg flex items-center justify-center">
      <p>Projet 4</p>
    </div>
  </>
);

// Définir la couleur de base ici pour qu'elle soit stable RGB
const liquidChromeBaseColor = [0.02, 0.05, 0.2];

// Composant Dashboard factice
const Dashboard = ({ scrollRef }) => {
  return (
    <div className="w-full h-full relative">
      {/* Le fond Plasma est maintenant ici */}
      <LiquidChrome
        baseColor={liquidChromeBaseColor}
        speed={0.08}
        amplitude={0.3}
        interactive={false}
      />
      {/* Le contenu du dashboard est par-dessus */}
      <div ref={scrollRef} className="absolute inset-0 z-10 overflow-y-auto md:pl-[60px] no-scrollbar">
        {/* Conteneur pour toutes les sections */}
        <div className="p-8 text-white">
          {/* Section Accueil */}
          <section id="accueil" className="min-h-screen flex flex-col justify-center items-center text-center">
            <div>
              <h1 className="text-5xl md:text-7xl font-bold mb-4">Ly Minh-Quan</h1>
              <p className="text-xl md:text-2xl text-neutral-300"></p>
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

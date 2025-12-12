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
    // Le conteneur principal est maintenant le Dashboard lui-même.
    // La Sidebar sera positionnée par-dessus grâce à son z-index interne.
    <div className="bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center w-full h-screen relative">
      <Dashboard />
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

<<<<<<< HEAD
// Définir la couleur de base ici pour qu'elle soit stable
const liquidChromeBaseColor = [0, 0, 0.1];
=======
// Composant pour le carrousel infini
const InfiniteCarousel = ({ projects, onProjectClick, isModalOpen }) => {
  const carouselRef = useRef(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let animationFrameId;
    let timeoutId;

    // Fonction pour le défilement automatique
    const autoScroll = () => {
      const scrollWidth = carousel.scrollWidth / 2;
      // Si on atteint la fin de la première copie, on revient au début pour la boucle.
      if (carousel.scrollLeft >= scrollWidth) {
        carousel.scrollLeft -= scrollWidth;
      }
      carousel.scrollLeft += 0.1; // Vitesse de défilement encore plus ralentie
      animationFrameId = requestAnimationFrame(autoScroll);
    };

    // Démarre le défilement automatique
    const startAutoScroll = () => {
      cancelAnimationFrame(animationFrameId); // Assure qu'il n'y a pas de doublon
      animationFrameId = requestAnimationFrame(autoScroll);
    };

    // Arrête le défilement
    const stopAutoScroll = () => {
      cancelAnimationFrame(animationFrameId);
    };

    // Positionne le scroll au tout début.
    if (!isModalOpen) startAutoScroll();

    const handleScroll = () => {
      if (!carousel) return; // Garde-fou
      const scrollWidth = carousel.scrollWidth / 2;

      // Gère le défilement "à l'envers" avec la molette
      if (carousel.scrollLeft < 0) { // Gère le cas où la molette crée un scroll négatif
        // On se positionne juste avant la fin de la première copie pour que le dernier élément soit visible.
        carousel.scrollLeft = scrollWidth - 1;
      }
    };
    const handleMouseLeave = () => {
      // Ne reprend le défilement que si la modale n'est pas ouverte
      if (!isModalOpen) {
        startAutoScroll();
      }
    };

    carousel.addEventListener("scroll", handleScroll);
    carousel.addEventListener("mouseenter", stopAutoScroll); // Pause au survol
    carousel.addEventListener("mouseleave", handleMouseLeave);

    // Nettoyage
    return () => {
      cancelAnimationFrame(animationFrameId);
      carousel.removeEventListener("scroll", handleScroll);
      carousel.removeEventListener("mouseenter", stopAutoScroll);
      carousel.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isModalOpen]); // On ajoute isModalOpen aux dépendances pour gérer la pause/reprise

  return (
    <div ref={carouselRef} className="flex overflow-x-auto space-x-4 p-4 allow-scroll">
      {/* Le contenu est dupliqué pour l'effet de boucle */}
      <CarouselItems projects={projects} onProjectClick={onProjectClick} />
      <CarouselItems projects={projects} onProjectClick={onProjectClick} />
    </div>
  );
};

// Items du carrousel pour éviter la répétition
const CarouselItems = ({ projects, onProjectClick }) => (
  <>
    {projects.map((project) => (
      <motion.div
        key={project.id}
        className="flex-shrink-0 w-80 h-48 bg-neutral-800 rounded-lg flex items-center justify-center cursor-pointer"
        onClick={() => onProjectClick(project)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <p className="text-xl font-bold">{project.title}</p>
      </motion.div>
    ))}
  </>
);

// Définir la couleur de base ici pour qu'elle soit stable RGB
const liquidChromeBaseColor = [0.02, 0.05, 0.2];
>>>>>>> parent of 89a47f0 (Version Carousel / fond (Fonctionne) V2)

// Composant Dashboard factice
const Dashboard = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full">
      {/* Le fond Plasma est maintenant ici */}
      <LiquidChrome
        baseColor={liquidChromeBaseColor}
<<<<<<< HEAD
        speed={0.05}
        amplitude={0.3}
        interactive={true}
=======
        speed={0.04}
        amplitude={0.3}
        interactive={false}
>>>>>>> parent of 89a47f0 (Version Carousel / fond (Fonctionne) V2)
      />
      {/* Le contenu du dashboard est par-dessus. Le z-index le place au-dessus du fond. */}
      <div className="w-full h-full z-10 overflow-y-auto">
        <div className="p-8 pl-20 md:pl-24">
          <h1 className="text-2xl md:text-4xl font-bold text-white">
            Dashboard
          </h1>
        </div>
      </div>
    </div>
  );
};

export default App

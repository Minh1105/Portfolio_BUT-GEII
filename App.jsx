import './App.css'
import { Sidebar, SidebarBody, SidebarLink } from './components/ui/Sidebar'
import { useState, useRef, useEffect } from "react";
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
import { useOutsideClick } from './components/use-outside-click';


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

  // Données pour les projets (à remplir avec vos vraies données)
  const projectsData = [
    {
      id: 1,
      title: "Projet 1",
      image: "https://via.placeholder.com/400x200.png/1a1a1a/ffffff?text=Image+Projet+1",
      description: "Description détaillée du projet 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit, adipiscing nec, ultricies sed, dolor.",
      skills: ["React", "Node.js", "UHF"]
    },
    {
      id: 2,
      title: "Projet 2",
      image: "https://via.placeholder.com/400x200.png/1a1a1a/ffffff?text=Image+Projet+2",
      description: "Description détaillée du projet 2. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Cras ultricies ligula sed magna dictum porta.",
      skills: ["Python", "Flask", "Machine Learning"]
    },
    {
      id: 3,
      title: "Projet 3",
      image: "https://via.placeholder.com/400x200.png/1a1a1a/ffffff?text=Image+Projet+3",
      description: "Description détaillée du projet 3. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.",
      skills: ["C++", "Arduino", "Electronique"]
    },
    {
      id: 4,
      title: "Projet 4",
      image: "https://via.placeholder.com/400x200.png/1a1a1a/ffffff?text=Image+Projet+4",
      description: "Description détaillée du projet 4. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Proin eget tortor risus.",
      skills: ["JavaScript", "TailwindCSS", "Vite"]
    },
    {
      id: 5,
      title: "Projet 5",
      image: "https://via.placeholder.com/400x200.png/1a1a1a/ffffff?text=Image+Projet+5",
      description: "Description détaillée du projet 5. Pellentesque in ipsum id orci porta dapibus. Quisque velit nisi, pretium ut lacinia in, elementum id enim.",
      skills: ["Figma", "UI/UX", "Design"]
    },
    {
      id: 6,
      title: "Projet 6",
      image: "https://via.placeholder.com/400x200.png/1a1a1a/ffffff?text=Image+Projet+6",
      description: "Description détaillée du projet 6. Nulla porttitor accumsan tincidunt. Cras ultricies ligula sed magna dictum porta.",
      skills: ["STM32", "C", "RTOS"]
    },
  ];

  const [open, setOpen] = useState(false);
  const appRef = useRef(null); // Référence pour le conteneur principal de l'application

  useEffect(() => {
    // Le gestionnaire de molette a été retiré pour restaurer le défilement vertical normal.
  }, []);

  const [selectedProject, setSelectedProject] = useState(null);

  return (
    // Ajout du style pour le défilement fluide
    <div ref={appRef} className="relative w-full h-screen" style={{ scrollBehavior: "smooth" }}>
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
      <Dashboard projects={projectsData} onProjectClick={setSelectedProject} isModalOpen={!!selectedProject} />

      {/* 4. Modale de projet */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
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

// Composant Dashboard factice
const Dashboard = ({ projects, onProjectClick, isModalOpen }) => {
  return (
    // On ajoute un fond en dégradé directement ici.
    <div className="w-full h-full relative bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800">
      {/* Le contenu du dashboard est par-dessus. La classe 'no-scrollbar' a été retirée. */}
      <div className="dashboard-scroll-container absolute inset-0 z-10 overflow-y-auto md:ml-[60px]">
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
            {/* Grille de projets */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  className="bg-neutral-800 rounded-lg cursor-pointer overflow-hidden"
                  onClick={() => onProjectClick(project)}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <img src={project.image} alt={project.title} className="w-full h-40 object-cover" />
                  <h3 className="text-xl font-bold p-4">{project.title}</h3>
                </motion.div>
              ))}
            </div>
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

// Composant pour la modale de projet
const ProjectModal = ({ project, onClose }) => {
  const modalRef = useRef(null);
  useOutsideClick(modalRef, onClose);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center p-4"
    >
      <motion.div
        ref={modalRef}
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-neutral-900/80 border border-neutral-700 rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 relative"
      >
        {/* Bouton de fermeture */}
        <button onClick={onClose} className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors">
          <IconX size={24} />
        </button>

        {/* Contenu de la modale */}
        <h2 className="text-3xl font-bold mb-4 pr-8">{project.title}</h2>

        {/* Image(s) */}
        <div className="mb-6">
          <img src={project.image} alt={project.title} className="w-full h-auto object-cover rounded-lg" />
        </div>

        {/* Texte */}
        <div className="mb-6">
          <p className="text-neutral-300">{project.description}</p>
        </div>

        {/* Pins de compétences */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Compétences utilisées</h3>
          <div className="flex flex-wrap gap-2">
            {project.skills.map((skill, index) => (
              <span key={index} className="bg-blue-500/20 text-blue-300 text-xs font-medium px-2.5 py-1 rounded-full">{skill}</span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default App

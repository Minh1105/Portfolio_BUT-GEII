import './App.css'
import { Sidebar, SidebarBody, SidebarLink } from './components/ui/Sidebar'
import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "./lib/utils";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconHome,
  IconChevronLeft, IconChevronRight,
  IconX,
  IconUserBolt,
  IconFileTypePdf,
} from "@tabler/icons-react";
import { useOutsideClick } from './components/use-outside-click';

// 1. Importez vos images locales ici
// Créez un dossier `src/assets/images` et placez-y vos images.
import robot1 from './assets/images/robot1.png';
import robot2 from './assets/images/robot2.png';
import robot3 from './assets/images/robot3.png';
import photo_profil from './assets/images/photo_profil.png'; // 1. Importez votre photo de profil ici (corrigez le nom du fichier si besoin)

function App() {
  const links = [
    {
      label: "Accueil",
      href: "#accueil",
      icon: (
        <IconHome className="text-neutral-700 dark:text-neutral-200 h-9 w-9 flex-shrink-0" />
      ),
    },
    {
      label: "Projets",
      href: "#projets",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-9 w-9 flex-shrink-0" />
      ),
    },
    {
      label: "Mes stages",
      href: "#stage",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-9 w-9 flex-shrink-0" />
      ),
    },
    {
      label: "Compétences",
      href: "#competences",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-9 w-9 flex-shrink-0" />
      ),
    },
    {
      label: "Contacts",
      href: "#contacts",
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-9 w-9 flex-shrink-0" />
      ),
    },
  ];

  // Données pour les projets (à remplir avec vos vraies données)
  const projectsData = [
    {
      id: 1,
      title: "Projet 1",
      images: [robot1, robot2], // 2. Utilisez les variables d'image importées
      description: "Description détaillée du projet 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit, adipiscing nec, ultricies sed, dolor.",
      skills: ["React", "Node.js", "UHF"],
      pdf: "/path/to/rapport_projet1.pdf"
    },
    {
      id: 2,
      title: "Projet 2",
      images: [
        robot3, // Exemple avec une seule image
      ],
      description: "Description détaillée du projet 2. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Cras ultricies ligula sed magna dictum porta.",
      skills: ["Python", "Flask", "Machine Learning"],
      pdf: "/path/to/rapport_projet2.pdf"
    },
    {
      id: 3,
      title: "Projet 3",
      images: [
        "https://via.placeholder.com/800x450.png/1a1a1a/ffffff?text=Projet+3+-+Image+1",
      ],
      description: "Description détaillée du projet 3. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.",
      skills: ["C++", "Arduino", "Electronique"],
      pdf: "/path/to/rapport_projet3.pdf"
    },
    {
      id: 4,
      title: "Projet 4",
      images: [
        "https://via.placeholder.com/800x450.png/1a1a1a/ffffff?text=Projet+4+-+Image+1",
        "https://via.placeholder.com/800x450.png/2a2a2a/ffffff?text=Projet+4+-+Image+2",
        "https://via.placeholder.com/800x450.png/3a3a3a/ffffff?text=Projet+4+-+Image+3",
      ],
      description: "Description détaillée du projet 4. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Proin eget tortor risus.",
      skills: ["JavaScript", "TailwindCSS", "Vite"],
      pdf: "/path/to/rapport_projet4.pdf"
    },
    {
      id: 5,
      title: "Projet 5",
      images: [
        "https://via.placeholder.com/800x450.png/1a1a1a/ffffff?text=Projet+5+-+Image+1",
        "https://via.placeholder.com/800x450.png/2a2a2a/ffffff?text=Projet+5+-+Image+2",
      ],
      description: "Description détaillée du projet 5. Pellentesque in ipsum id orci porta dapibus. Quisque velit nisi, pretium ut lacinia in, elementum id enim.",
      skills: ["Figma", "UI/UX", "Design"],
      pdf: "/path/to/rapport_projet5.pdf"
    },
    {
      id: 6,
      title: "Projet 6",
      images: [
        "https://via.placeholder.com/800x450.png/1a1a1a/ffffff?text=Projet+6+-+Image+1",
      ],
      description: "Description détaillée du projet 6. Nulla porttitor accumsan tincidunt. Cras ultricies ligula sed magna dictum porta.",
      skills: ["STM32", "C", "RTOS"],
      pdf: "/path/to/rapport_projet6.pdf"
    },
    {
      id: 7,
      title: "Projet 7",
      images: [
        "https://via.placeholder.com/800x450.png/1a1a1a/ffffff?text=Projet+7+-+Image+1",
        "https://via.placeholder.com/800x450.png/2a2a2a/ffffff?text=Projet+7+-+Image+2",
      ],
      description: "Description détaillée du projet 7. Pellentesque in ipsum id orci porta dapibus. Quisque velit nisi, pretium ut lacinia in, elementum id enim.",
      skills: ["Java", "Spring Boot", "SQL"],
      pdf: "/path/to/rapport_projet7.pdf"
    },
    {
      id: 8,
      title: "Projet 8",
      images: [
        "https://via.placeholder.com/800x450.png/1a1a1a/ffffff?text=Projet+8+-+Image+1",
        "https://via.placeholder.com/800x450.png/2a2a2a/ffffff?text=Projet+8+-+Image+2",
        "https://via.placeholder.com/800x450.png/3a3a3a/ffffff?text=Projet+8+-+Image+3",
      ],
      description: "Description détaillée du projet 8. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Proin eget tortor risus.",
      skills: ["Docker", "Kubernetes", "CI/CD"],
      pdf: "/path/to/rapport_projet8.pdf"
    },
    {
      id: 9,
      title: "Projet 9",
      images: [
        "https://via.placeholder.com/800x450.png/1a1a1a/ffffff?text=Projet+9+-+Image+1",
        "https://via.placeholder.com/800x450.png/2a2a2a/ffffff?text=Projet+9+-+Image+2",
      ],
      description: "Description détaillée du projet 9. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.",
      skills: ["Vue.js", "Firebase", "GraphQL"],
      pdf: "/path/to/rapport_projet9.pdf"
    },
    {
      id: 10,
      title: "Projet 10",
      images: [
        "https://via.placeholder.com/800x450.png/1a1a1a/ffffff?text=Projet+10+-+Image+1",
      ],
      description: "Description détaillée du projet 10. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Cras ultricies ligula sed magna dictum porta.",
      skills: ["Angular", "TypeScript", "RxJS"],
      pdf: "/path/to/rapport_projet10.pdf"
    },
  ];

  // Données pour le stage (structure identique aux projets pour la compatibilité)
  const internshipData = [
    {
      id: "stage-1",
      title: "Stage BUT GEII",
      images: [
        "https://via.placeholder.com/800x450.png/1a1a1a/ffffff?text=Introduction+Stage",
        "https://via.placeholder.com/800x450.png/2a2a2a/ffffff?text=Developpement+Qt",
        "https://via.placeholder.com/800x450.png/3a3a3a/ffffff?text=Reseau+et+Serveur",
        "https://via.placeholder.com/800x450.png/4a4a4a/ffffff?text=Bilan+et+Resultats",
      ],
      description: "Stage de fin d'études. Cliquez pour découvrir le déroulement du stage étape par étape.",
      skills: ["C++", "Qt", "Réseaux"],
      pdf: "/path/to/rapport_stage.pdf",
      // Données spécifiques pour le mode 'Story' (par image)
      descriptions: [
        "Introduction et Contexte :\n\nDurant ce stage de 10 semaines, j'ai intégré l'équipe R&D de l'entreprise. L'objectif principal était de moderniser l'interface de contrôle d'un robot industriel.\n\nJ'ai commencé par :\n- Analyser l'existant et les besoins des opérateurs.\n- Mettre en place l'environnement de développement (Linux, Qt).\n- Définir l'architecture logicielle du nouveau module.",
        
        "Développement de l'Interface (IHM) :\n\nLa première phase technique a consisté à développer l'interface graphique avec le framework Qt (C++). J'ai créé des widgets personnalisés pour afficher les capteurs du robot en temps réel.\n\nChallenges relevés :\n- Gestion du rafraîchissement fluide des graphiques.\n- Création d'un design ergonomique et sombre pour réduire la fatigue visuelle.",
        
        "Communication Réseau & Backend :\n\nPour que l'interface communique avec le robot, j'ai implémenté un client TCP/IP asynchrone. Le robot agit comme un serveur envoyant des trames de données structurées.\n\nJ'ai dû décoder ces trames binaires, gérer les erreurs de connexion et assurer la reconnexion automatique en cas de perte de signal.",
        
        "Bilan et Compétences Acquises :\n\nCe stage m'a permis de consolider mes compétences en C++ orienté objet et en programmation événementielle. J'ai aussi appris à travailler avec des outils de versionning (Git) dans un contexte professionnel.\n\nLe projet a été validé par l'équipe et sera déployé sur la prochaine version des robots."
      ],
      skillsList: [
        ["Analyse", "UML", "Linux"],
        ["C++", "Qt Widgets", "UI Design"],
        ["TCP/IP", "Sockets", "Wireshark"],
        ["Git", "Communication", "Autonomie"]
      ]
    }
  ];

  const [open, setOpen] = useState(false);
  const appRef = useRef(null); // Référence pour le conteneur principal de l'application

  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const handleWheel = (e) => {
      // On empêche le défilement par défaut sur toute la page uniquement si aucun projet n'est ouvert
      if (!selectedProject) {
        e.preventDefault();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [selectedProject]);

  return (
    // Ajout du style pour le défilement fluide
    <div ref={appRef} className="flex flex-col md:flex-row w-full h-screen overflow-hidden bg-neutral-900" style={{ scrollBehavior: "smooth" }}>
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
                  src={photo_profil} // 2. Utilisez l'image importée
                  className={cn("flex-shrink-0 rounded-full transition-all", open ? "h-12 w-12" : "h-10 w-10")}
                  width={50}
                  height={50}
                  alt="Avatar"
                />
                {open && (
                  <span className="text-neutral-700 dark:text-neutral-200 text-xl group-hover/sidebar:translate-x-1 transition-transform duration-150 whitespace-pre inline-block">Ly Minh-Quan</span>
                )}
              </a>
            </div>
          </div>
        </SidebarBody>
      </Sidebar>

      {/* 2. Dashboard contenant le fond Plasma et le contenu */}
      <Dashboard projects={projectsData} internship={internshipData} onProjectClick={setSelectedProject} isModalOpen={!!selectedProject} />

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
      className="font-normal flex space-x-2 items-center text-xl text-white py-1 relative z-20"
    >
      <div className="h-10 w-11 bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-white whitespace-pre"
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
      className="font-normal flex space-x-2 items-center text-lg text-white py-1 relative z-20"
    >
      <div className="h-9 w-10 bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </a>
  );
};

// Composant Dashboard factice
const Dashboard = ({ projects, internship, onProjectClick, isModalOpen }) => {
  return (
    // On ajoute un fond en dégradé directement ici.
    <div className="flex-1 h-full relative bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 overflow-hidden">
      {/* Le contenu du dashboard est par-dessus. La classe 'no-scrollbar' a été retirée. */}
      <div className="w-full h-full overflow-y-auto">
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
          <section id="projets" className="min-h-screen pt-5">
            <h2 className="text-3xl font-bold mb-4">Mes Projets</h2>
            <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-6 mb-8 max-w-3xl backdrop-blur-sm">
              <p className="text-neutral-300">
                Voici une sélection de mes projets académiques et personnels. Ils illustrent mes compétences techniques et ma capacité à mener à bien des réalisations concrètes, du développement logiciel à l'électronique embarquée.
              </p>
            </div>
            {/* Grille de projets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  className="bg-neutral-800 rounded-lg cursor-pointer overflow-hidden"
                  onClick={() => {
                    // Si la modale est déjà ouverte, le clic sur un projet en arrière-plan la fermera.
                    // Sinon, on ouvre la modale du projet cliqué.
                    if (isModalOpen) return;
                    onProjectClick(project);
                  }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <img src={project.images[0]} alt={project.title} className="w-full h-40 object-cover" />
                  <h3 className="text-xl font-bold p-4">{project.title}</h3>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Section Stage */}
          <section id="stage" className="min-h-screen pt-5">
            <h2 className="text-3xl font-bold mb-4">Mon Stage</h2>
            <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-6 mb-8 max-w-3xl backdrop-blur-sm">
              <p className="text-neutral-300">
                Cette section détaille mon expérience professionnelle acquise lors de mon stage de fin d'études. Vous y découvrirez le contexte, mes missions, ainsi que les compétences mises en œuvre en situation réelle.
              </p>
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3">
              {internship && internship.map((stage) => (
                <motion.div
                  key={stage.id}
                  className="bg-neutral-800 rounded-lg cursor-pointer overflow-hidden"
                  onClick={() => {
                    if (isModalOpen) return;
                    onProjectClick(stage);
                  }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <img src={stage.images[0]} alt={stage.title} className="w-full h-40 object-cover" />
                  <h3 className="text-xl font-bold p-4">{stage.title}</h3>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Section Compétences */}
          <section id="competences" className="min-h-screen pt-5">
            <h2 className="text-3xl font-bold">Compétences</h2>
            <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-6 mt-4 max-w-3xl backdrop-blur-sm">
              <p className="text-neutral-300">
                Retrouvez ici l'ensemble des compétences techniques et transversales que j'ai développées au cours de ma formation et de mes expériences. Elles couvrent le développement, l'électronique, et la gestion de projet.
              </p>
            </div>
          </section>

          {/* Section Contacts */}
          <section id="contacts" className="min-h-screen pt-5">
            <h2 className="text-3xl font-bold">Contacts</h2>
            <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-6 mt-4 max-w-3xl backdrop-blur-sm">
              <p className="text-neutral-300">
                N'hésitez pas à me contacter pour toute opportunité professionnelle ou question sur mon parcours. Je suis joignable par email ou via LinkedIn.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

// Animation pour le carrousel d'images
const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

// Composant pour la modale de projet
const ProjectModal = ({ project, onClose }) => {
  const modalRef = useRef(null);
  useOutsideClick(modalRef, onClose);

  const [[page, direction], setPage] = useState([0, 0]);
  const [isHovering, setIsHovering] = useState(false);

  // Détection du mode "Story" (pour le stage) si des descriptions multiples existent
  const isStoryMode = Array.isArray(project.descriptions);

  const imageIndex = (page % project.images.length + project.images.length) % project.images.length;

  const paginate = useCallback((newDirection) => {
    setPage([page + newDirection, newDirection]);
  }, [page]);

  useEffect(() => {
    // Désactiver le défilement automatique si on est en mode Story ou s'il n'y a qu'une image
    if (project.images.length <= 1 || isHovering || isStoryMode) return;
    const autoplay = setInterval(() => paginate(1), 4000); // Défilement toutes les 3 secondes
    return () => clearInterval(autoplay);
  }, [isHovering, paginate, project.images.length, isStoryMode]);

  // Sélection du contenu en fonction du mode
  const currentDescription = isStoryMode ? project.descriptions[imageIndex] : project.description;
  const currentSkills = isStoryMode ? (project.skillsList[imageIndex] || []) : project.skills;

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
        className="bg-neutral-900/80 border border-neutral-700 rounded-xl w-full max-w-7xl h-[80vh] relative flex flex-col overflow-hidden"
      >
        {/* Bouton de fermeture */}
        <button onClick={onClose} className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors z-20 p-1 rounded-full hover:bg-neutral-800">
          <IconX size={24} />
        </button>

        {/* Conteneur défilable pour le contenu */}
        <div className="overflow-y-auto p-6 flex-1">
        {/* Layout en colonne pour le contenu de la modale */}
        <div className="flex flex-col gap-8">
          {/* Carrousel centré en haut */}
          <div className="w-full max-w-2xl mx-auto">
            <div 
              className="relative w-full aspect-video overflow-hidden rounded-lg bg-neutral-800"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <AnimatePresence initial={false} custom={direction}>
                <motion.img
                  key={page}
                  src={project.images[imageIndex]}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  alt={`${project.title} - Image ${imageIndex + 1}`}
                  className="absolute w-full h-full object-contain"
                />
              </AnimatePresence>

              {/* Boutons de navigation du carrousel */}
              {project.images.length > 1 && (
                <>
                  <button onClick={() => paginate(-1)} className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/30 text-white p-1 rounded-full hover:bg-black/50 transition-colors z-10">
                    <IconChevronLeft size={24} />
                  </button>
                  <button onClick={() => paginate(1)} className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/30 text-white p-1 rounded-full hover:bg-black/50 transition-colors z-10">
                    <IconChevronRight size={24} />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Informations en bas */}
          <div className="w-full flex flex-col">
            <h2 className="text-3xl font-bold mb-4 pr-8">{project.title}</h2>
            
            {/* Texte */}
            <div className="mb-6">
              <p className="text-neutral-300 whitespace-pre-wrap">{currentDescription}</p>
            </div>

            {/* Pins de compétences */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Compétences utilisées</h3>
              <div className="flex flex-wrap gap-2">
                {currentSkills.map((skill, index) => (
                  <span key={index} className="bg-blue-500/20 text-blue-300 text-xs font-medium px-2.5 py-1 rounded-full">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
        </div>

        {/* Bouton PDF flottant en bas à droite */}
        {project.pdf && (
          <div className="absolute bottom-6 right-6 z-50 group">
            {/* Tooltip (Note explicative) */}
            <div className="absolute bottom-full right-0 mb-2 w-64 p-3 bg-neutral-900 border border-neutral-700 text-neutral-200 text-xs rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Pour plus de précision sur le projet, vous pouvez consulter le rapport ou compte rendu téléchargeable ici.
            </div>
            {/* Bouton de téléchargement */}
            <a 
              href={project.pdf} 
              download 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 bg-neutral-700 hover:bg-neutral-600 text-white rounded-full shadow-lg transition-all hover:scale-110"
            >
              <IconFileTypePdf size={24} />
            </a>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default App

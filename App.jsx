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
  IconLanguage,
  IconBrandLinkedin,
  IconMail,
  IconHeart,
  IconChefHat,
  IconChess,
  IconBarbell,
  IconActivity,
  IconAddressBook,
} from "@tabler/icons-react";
import { useOutsideClick } from './components/use-outside-click';

// 1. Importez vos images locales ici
// Créez un dossier `src/assets/images` et placez-y vos images.
import SmartLight from './assets/images/SmartLight.jpg';

import CarteDomotique from './assets/images/CarteDomotique.png';

import RobotGies1 from './assets/images/RobotGies1.png';
import RobotGies2 from './assets/images/RobotGies2.png';
import RobotGies3Cote from './assets/images/RobotGies3Cote.jpg';
import RobotGies4_ESP from './assets/images/RobotGies4_ESP.jpg';
import AffichageVS from './assets/images/AffichageVS.png';

import CarteBasseConso3D from './assets/images/CarteBasseConso3D.png';
import SchématiqueBasseConso from './assets/images/SchématiqueBasseConso.png';
import PCBBasseConso from './assets/images/PCBBasseConso.png';


import VérifierMaintenance1 from './assets/images/VérifierMaintenance1.jpg';
import VérifierMaintenance2 from './assets/images/VérifierMaintenance2.jpg';


import LR_logical from './assets/images/LR_logical.png';
import Stage_PCB_Kicad from './assets/images/Stage_PCB_Kicad.png';


import EmissionReception1 from './assets/images/EmissionReception1.jpg';
import EmissionReception2 from './assets/images/EmissionReception2.jpg';
import EmissionReceptionBrea3 from './assets/images/EmissionReceptionBread3.jpg';
/*

import robot3 from './assets/images/robot3.png';
import robot3 from './assets/images/robot3.png';
*/



import photo_profil from './assets/images/photo_profil.png'; // 1. Importez votre photo de profil ici (corrigez le nom du fichier si besoin)

function App() {
  const [language, setLanguage] = useState('fr');
  const [activeTab, setActiveTab] = useState(() => {
    const hash = window.location.hash.replace('#', '');
    return hash || 'accueil';
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) setActiveTab(hash);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const translations = {
    sidebar: { home: "Accueil", experiences: "Mes Expériences", skills: "Compétences", interests: "Centres d'intérêts", contact: "Contacts" },
    sections: {
      experiences: { title: "Mes Expériences", desc: "Voici une sélection de mes projets académiques, personnels et de mes stages. Ils illustrent mes compétences techniques et ma capacité à mener à bien des réalisations concrètes, du développement logiciel à l'électronique embarquée." },
      skills: { title: "Compétences", desc: "Retrouvez ici l'ensemble des compétences techniques et transversales que j'ai développées au cours de ma formation et de mes expériences. Elles couvrent le développement, l'électronique, et la gestion de projet." },
      interests: { title: "Centres d'intérêts", desc: "Au-delà de la technique, je cultive des passions qui nourrissent ma curiosité et mon équilibre personnel." },
      contact: { title: "Contacts", desc: "N'hésitez pas à me contacter pour toute opportunité professionnelle ou question sur mon parcours. Je suis joignable par email ou via LinkedIn.", linkedinTooltip: "En cliquant ici, vous allez être redirigé vers LinkedIn" }
    },
    modal: { 
      skills: "Compétences utilisées", 
      tooltip: "Pour plus de précision sur le projet, vous pouvez consulter le rapport ou compte rendu téléchargeable ici.", 
      projectFeedback: "Ressenti du projet",
      difficulties: "Difficultés rencontrées",
      takeaways: "Apports et satisfactions",
      extensions: "Prolongements possibles",
      yearTime: "Année et Temps", year: "Année de réalisation", 
      duration: "Temps de conception",
 }
  };

  const links = [
    {
      label: translations.sidebar.home,
      href: "#accueil",
      icon: (
        <IconHome className="text-neutral-700 dark:text-neutral-200 h-9 w-9 flex-shrink-0" />
      ),
    },
    {
      label: translations.sidebar.experiences,
      href: "#experiences",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-9 w-9 flex-shrink-0" />
      ),
    },
    {
      label: translations.sidebar.skills,
      href: "#competences",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-9 w-9 flex-shrink-0" />
      ),
    },
    {
      label: translations.sidebar.interests,
      href: "#interets",
      icon: (
        <IconHeart className="text-neutral-700 dark:text-neutral-200 h-9 w-9 flex-shrink-0" />
      ),
    },
    {
      label: translations.sidebar.contact,
      href: "#contacts",
      icon: (
        <IconAddressBook className="text-neutral-700 dark:text-neutral-200 h-9 w-9 flex-shrink-0" />
      ),
    },
  ];

  // Données pour les projets (à remplir avec vos vraies données)
  const projectsData = [
    {
      id: 1,
      title: "Projet SmartLight",
      year: "2023",
      duration: "50 heures",
      images: [SmartLight], // 2. Utilisez les variables d'image importées
      description: "Description détaillée du projet 1...",
      skills: ["Arduino IDE", "C++", "Lecture de datasheets", "Electronique", "Travail d'équipe",
         "Rédaction de rapports", "Microsoft Office", "LaTeX / Overleaf", "Rapports & CR", "Tests & Vérif.", "Datasheets"],
      pdf: "/path/to/rapport_projet1.pdf",
      feedback: {
        difficulties: "La principale difficulté a été de gérer la communication sans fil de manière fiable entre les différents modules, notamment à cause des interférences.",
        takeaways: "J'ai particulièrement apprécié la phase de conception du PCB et la résolution des problèmes liés à l'alimentation. Ce projet m'a permis de monter en compétence sur la programmation C++ embarquée.",
        extensions: "Une amélioration possible serait d'ajouter une interface web pour contrôler les lumières à distance via Wi-Fi."
      }
    },
    {
      id: 2,
      title: "Projet de conception d'un assistant domotique",
      year: "2024",
      duration: "35 heures",
      images: [
        CarteDomotique, 
      ],
      description: "Description détaillée du projet 2...",
      skills: ["Arduino IDE", "C/C++", "Electronique",  "LaTeX / Overleaf", "Rapports & CR", "Tests & Vérif.", "Datasheets", "Autonomie"],
      pdf: "/path/to/rapport_projet2.pdf",
      feedback: {
        difficulties: "Difficulté à trouver des composants qui respectent les contraintes du cahier des charges.",
        takeaways: "Ce que j'ai aimé faire c'est la conception de la carte sur Kicad et la programmation du microcontrôleur pour gérer tous les capteurs ensemblent.",
        extensions: "Intégration d'un assistant vocal pour le contrôle des périphériques."
      }
    },
    {
      id: 3,
      title: "Conception d'un robot mobile autonome",
      year: "2026-2024",
      duration: "+120 heures",
      images: [
        RobotGies1,
        RobotGies2,
        RobotGies3Cote,
        RobotGies4_ESP,
        AffichageVS,
      ],
      description: [
        {
          period: "2024-2025",
          title: "Conception Matérielle et Autonomie",
          text: "Ce projet porte sur la création d'un robot mobile articulé autour d'un microcontrôleur dsPIC33EP512MU814 et programmé via l'environnement MPLAB. Le robot utilise cinq télémètres infrarouges connectés à des entrées ADC pour convertir les distances en données numériques exploitables. La propulsion est assurée par des moteurs pilotés en PWM, incluant des rampes d'accélération pour éviter les changements brusques de vitesse. L'évitement d'obstacles repose sur une méthode numérique traitant 32 combinaisons de capteurs (2^5) afin de déterminer une action précise, comme tourner ou reculer, en fonction de la proximité des obstacles."
        },
        {
          period: "2025-2026",
          title: "Interface et Pilotage Manuel",
          text: "Une interface graphique développée en C# (WPF) permet de visualiser les données du robot, telles que la vitesse et la distance des capteurs, tout en lui transmettant des ordres. La communication entre le PC et le robot s'effectue par liaison série UART à 115 200 bauds, sécurisée par un protocole incluant un 'checksum' pour vérifier l'intégrité des messages. Pour un contrôle plus intuitif, un module ESP32 a été ajouté afin de connecter une manette de PS4 via Bluetooth. Ce système permet de diriger le robot manuellement en utilisant les gâchettes pour l'accélération proportionnelle et le joystick pour la direction."
        }
      ],
      skills: ["C/C++", "Electronique", "LaTeX / Overleaf", "Rapports & CR", "Tests & Vérif.", "Datasheets", "Python", "Autonomie"],
      pdf: "/assets/pdf/ProjetRobotGiesRapport.pdf",
      feedback: {
        difficulties: "La gestion de la communication UART avec un protocole fiable (checksum) a été un défi technique intéressant à relever.",
        takeaways: "Le développement de l'interface en C# et l'intégration du contrôle par manette PS4 ont été les parties les plus gratifiantes, car elles ont rendu le robot interactif et plus facile à piloter.",
        extensions: "Implémentation d'un algorithme de cartographie (SLAM) pour permettre au robot de se repérer dans son environnement."
      }
    },
    {
      id: 4,
      title: "Conception d'un carte à transmission radio à basse consommation",
      year: "2025",
      duration: "+90 heures",
      images: [
        CarteBasseConso3D,
        SchématiqueBasseConso,
        PCBBasseConso,
      ],
      description: "Description détaillée du projet 4...",
      skills: ["JavaScript", "TailwindCSS", "Vite", "LaTeX / Overleaf", "Rapports & CR", "Tests & Vérif.", "Datasheets", "Autonomie"],
      pdf: "/path/to/rapport_projet4.pdf",
      feedback: {
        difficulties: "L'optimisation de la consommation d'énergie pour atteindre les objectifs de basse consommation a nécessité de nombreuses itérations et tests. De plus, il y eut quelques difficultés à trouver des composants qui respectent les contraintes du cahier des charges (soit des composants qui consome le moins possible) s'ajoute à cela la difficulté de la communication radio dans la bonne fréquence.",
        takeaways: "J'ai beaucoup appris sur les techniques de conception de circuits à faible consommation et sur les protocoles de communication radio. La phase de routage du PCB a été particulièrement instructive.",
        extensions: "Développement d'un réseau maillé pour étendre la portée de la communication ou encore trouver des composants qui consomment encore moins d'énergie pour faire durée plus longtemps la carte."
      }
    },
    {
      id: 5,
      title: "Projet de maintenance et vérification d'un système de domotique",
      year: "2023",
      duration: "20 heures",
      images: [
        VérifierMaintenance1,
        VérifierMaintenance2,
      ],
      description: "Description détaillée du projet 5...",
      skills: ["Microsoft Office", "Rapports & CR", "Tests & Vérif.", "Datasheets"],
      pdf: "/path/to/rapport_projet5.pdf",
      feedback: {
        difficulties: "Diagnostiquer la cause racine des pannes intermittentes a été complexe et a demandé une approche méthodique.",
        takeaways: "Ce projet m'a permis de développer mes compétences en dépannage et en analyse de systèmes existants. J'ai apprécié le côté 'enquête' pour trouver la solution.",
        extensions: "Mise en place d'un système de maintenance prédictive basé sur l'analyse des données de fonctionnement."
      }
    },
    {
      id: 6,
      title: "Conception d'une carte d'émission réception sonore",
      year: "2023",
      duration: "70 heures",
      images: [
        EmissionReceptionBrea3,
        EmissionReception1,
        EmissionReception2,
      ],
      description: "Description détaillée du projet 6...",
      skills: ["Electronique", "LaTeX / Overleaf", "Rapports & CR", "Tests & Vérif.", "Datasheets"],
      pdf: "/path/to/rapport_projet6.pdf",
      feedback: {
        difficulties: "La prise en main d'un système d'exploitation temps réel (RTOS) et la gestion des tâches concurrentes ont représenté une courbe d'apprentissage abrupte.",
        takeaways: "J'ai adoré programmer à un niveau plus proche du matériel avec le STM32. Comprendre et maîtriser les contraintes temps réel a été une expérience très enrichissante.",
        extensions: "Portage du code sur une architecture multi-cœur pour améliorer les performances."
      }
    },
    {
      id: 7,
      title: "Projet 7",
      year: "2022",
      duration: "200 heures",
      images: [
        "https://via.placeholder.com/800x450.png/1a1a1a/ffffff?text=Projet+7+-+Image+1",
        "https://via.placeholder.com/800x450.png/2a2a2a/ffffff?text=Projet+7+-+Image+2",
      ],
      description: "Description détaillée du projet 7...",
      skills: ["Java", "Spring Boot", "SQL", "LaTeX / Overleaf", "Rapports & CR", "Tests & Vérif.", "Datasheets"],
      pdf: "/path/to/rapport_projet7.pdf",
      feedback: {
        difficulties: "La configuration de l'environnement Spring Boot et la connexion à la base de données ont posé quelques problèmes initiaux.",
        takeaways: "Développer une application web complète avec un backend robuste a été très satisfaisant. J'ai particulièrement aimé la conception du modèle de données et la création des API REST.",
        extensions: "Ajout de fonctionnalités de sécurité avancées (OAuth2) et déploiement sur le cloud."
      }
    },
    {
      id: 8,
      title: "Projet 8",
      year: "2024",
      duration: "140 heures",
      images: [
        "https://via.placeholder.com/800x450.png/1a1a1a/ffffff?text=Projet+8+-+Image+1",
        "https://via.placeholder.com/800x450.png/2a2a2a/ffffff?text=Projet+8+-+Image+2",
        "https://via.placeholder.com/800x450.png/3a3a3a/ffffff?text=Projet+8+-+Image+3",
      ],
      description: "Description détaillée du projet 8...",
      skills: ["Docker", "Kubernetes", "CI/CD", "LaTeX / Overleaf", "Rapports & CR", "Tests & Vérif.", "Datasheets"],
      pdf: "/path/to/rapport_projet8.pdf",
      feedback: {
        difficulties: "La courbe d'apprentissage de Kubernetes et la rédaction des fichiers de configuration YAML étaient importantes.",
        takeaways: "Mettre en place un pipeline CI/CD complet et voir le déploiement automatisé de l'application a été une grande réussite. J'ai pris goût à l'automatisation et à l'infrastructure as code.",
        extensions: "Mise en place d'un monitoring avancé avec Prometheus et Grafana."
      }
    },
    {
      id: 9,
      title: "Projet 9",
      year: "2023",
      duration: "350 heures",
      images: [
        "https://via.placeholder.com/800x450.png/1a1a1a/ffffff?text=Projet+9+-+Image+1",
        "https://via.placeholder.com/800x450.png/2a2a2a/ffffff?text=Projet+9+-+Image+2",
      ],
      description: "Description détaillée du projet 9...",
      skills: ["Vue.js", "Firebase", "GraphQL", "LaTeX / Overleaf", "Rapports & CR", "Tests & Vérif.", "Datasheets"],
      pdf: "/path/to/rapport_projet9.pdf",
      feedback: {
        difficulties: "Comprendre le fonctionnement de GraphQL et l'intégrer avec Firebase a demandé du temps de recherche et d'expérimentation.",
        takeaways: "Créer une interface utilisateur réactive et dynamique avec Vue.js était très plaisant. La facilité d'utilisation de Firebase pour le backend a permis de se concentrer sur l'expérience utilisateur.",
        extensions: "Développement d'une application mobile native avec React Native ou Flutter."
      }
    },
    {
      id: 10,
      title: "Projet 10",
      year: "2022",
      duration: "60 heures",
      images: [
        "https://via.placeholder.com/800x450.png/1a1a1a/ffffff?text=Projet+10+-+Image+1",
      ],
      description: "Description détaillée du projet 10...",
      skills: ["Angular", "TypeScript", "RxJS", "LaTeX / Overleaf", "Rapports & CR", "Tests & Vérif.", "Datasheets"],
      pdf: "/path/to/rapport_projet10.pdf",
      feedback: {
        difficulties: "La programmation réactive avec RxJS est puissante mais complexe à maîtriser. Le débogage des flux de données asynchrones était un défi.",
        takeaways: "J'ai apprécié la structure et la rigueur qu'apporte Angular au développement front-end. L'utilisation de TypeScript a grandement amélioré la qualité et la maintenabilité du code.",
        extensions: "Migration vers la dernière version d'Angular et utilisation de composants standalone."
      }
    },
  ].sort((a, b) => parseInt(b.year) - parseInt(a.year));

  // Données pour le stage (structure identique aux projets pour la compatibilité)
  const internshipData = [
    {
      id: "stage-1",
      title: "Stage BUT GEII",
      year: "2025",
      duration: "8 semaines",
      images: [
        LR_logical,
        Stage_PCB_Kicad,
        "https://via.placeholder.com/800x450.png/3a3a3a/ffffff?text=Reseau+et+Serveur",
        "https://via.placeholder.com/800x450.png/4a4a4a/ffffff?text=Bilan+et+Resultats",
      ],
      description: "Stage de fin d'études. Cliquez pour découvrir le déroulement du stage étape par étape.",
      skills: ["C/C++", "Qt", "Autonomie", "Travail d'équipe", "Datasheets","Linux","Wireshark", "GitHub", "Analyse"],
      pdf: "/assets/pdf/Extrait_Rapport_de_Stage_2e_annee_GEII_Ly_Minh-Quan.pdf",
      feedback: {
        difficulties: "L'adaptation à un codebase existant et complexe a été un défi initial. Comprendre l'architecture logicielle et les interactions entre les modules a demandé une période d'analyse intensive.",
        takeaways: "J'ai adoré travailler sur une application concrète avec un impact direct pour les utilisateurs. La collaboration avec l'équipe R&D et l'apprentissage des bonnes pratiques de développement en entreprise (versioning, tests) ont été très formateurs.",
        extensions: "Le projet pourrait être étendu en ajoutant des fonctionnalités de contrôle à distance via une application mobile."
      },
      // Données spécifiques pour le mode 'Story' (par image)
      descriptions: [
        "Introduction et Contexte :\n\nDurant ce stage de 10 semaines, j'ai intégré l'équipe R&D de l'entreprise. L'objectif principal était de moderniser l'interface de contrôle d'un robot industriel.\n\nJ'ai commencé par :\n- Analyser l'existant et les besoins des opérateurs.\n- Mettre en place l'environnement de développement (Linux, Qt).\n- Définir l'architecture logicielle du nouveau module.",
        "Développement de l'Interface (IHM) :\n\nLa première phase technique a consisté à développer l'interface graphique avec le framework Qt (C++). J'ai créé des widgets personnalisés pour afficher les capteurs du robot en temps réel.\n\nChallenges relevés :\n- Gestion du rafraîchissement fluide des graphiques.\n- Création d'un design ergonomique et sombre pour réduire la fatigue visuelle.",
        "Communication Réseau & Backend :\n\nPour que l'interface communique avec le robot, j'ai implémenté un client TCP/IP asynchrone. Le robot agit comme un serveur envoyant des trames de données structurées.\n\nJ'ai dû décoder ces trames binaires, gérer les erreurs de connexion et assurer la reconnexion automatique en cas de perte de signal.",
        "Bilan et Compétences Acquises :\n\nCe stage m'a permis de consolider mes compétences en C++ orienté objet et en programmation événementielle. J'ai aussi appris à travailler avec des outils de versionning (Git) dans un contexte professionnel.\n\nLe projet a été validé par l'équipe et sera déployé sur la prochaine version des robots."
      ],
      skillsList: [

      ]
    }
  ];

  // Liste des compétences avec descriptions (Carte blanche)
  const skillsList = [
    { 
      name: "Electronique", 
      level: "Avancée",
      desc: "Conception de circuits et systèmes embarqués.",
      category: "hard"
    },
    { 
      name: "Prog. Embarquée", 
      level: "Avancée",
      desc: "Développement de logiciels pour systèmes à contraintes.",
      category: "hard"
    },
    { 
      name: "C/C++", 
      level: "Avancée",
      desc: "Développement système performant et bas niveau.",
      category: "hard"
    },
    { 
      name: "Arduino IDE", 
      level: "Avancée",
      desc: "Prototypage rapide sur microcontrôleurs.",
      category: "hard"
    },
    { 
      name: "Microsoft Office", 
      level: "Avancée",
      desc: "Word, PowerPoint, Excel pour documentation et présentation.",
      category: "hard"
    },
    { 
      name: "Datasheets", 
      level: "Avancée",
      desc: "Lecture et analyse de spécifications techniques.",
      category: "hard"
    },
    { 
      name: "Rapports & CR", 
      desc: "Rédaction technique, comptes rendus et documentation.",
      category: "soft"
    },
    { 
      name: "STM32", 
      level: "Intermédiaire",
      desc: "Programmation de microcontrôleurs pour l'embarqué.",
      category: "hard"
    },
    { 
      name: "Travail d'équipe", 
      desc: "Collaboration efficace et gestion de projet agile.",
      category: "soft"
    },
    { 
      name: "Tests & Vérif.", 
      level: "Intermédiaire",
      desc: "Validation de systèmes et protocoles de test.",
      category: "hard"
    },
    { 
      name: "Linux", 
      level: "Intermédiaire",
      desc: "Maîtrise de la ligne de commande (Bash) et administration système.",
      category: "hard"
    },
    { 
      name: "LaTeX / Overleaf", 
      level: "Intermédiaire",
      desc: "Rédaction de documents scientifiques et techniques structurés.",
      category: "hard"
    },
    { 
      name: "GitHub", 
      level: "Intermédiaire",
      desc: "Gestion de version et travail collaboratif.",
      category: "hard"
    },
    { 
      name: "Wireshark", 
      level: "Notions",
      desc: "Analyse de protocoles réseau et diagnostic de trafic.",
      category: "hard"
    },
    { 
      name: "Analyse", 
      desc: "Capacité d'audit, de synthèse et résolution de problèmes.",
      category: "soft"
    },
    { 
      name: "Autonomie", 
      desc: "Capacité à prioriser les tâches et à s'auto-former.",
      category: "soft"
    },
    { 
    name: "Qt", 
    level: "Notions",
    desc: "Développement d'interfaces graphiques et d'applications multiplateformes.",
    category: "hard"
    },
    { 
      name: "Communication", 
      desc: "Transmission claire d'informations techniques.",
      category: "soft"
    },
    { 
      name: "Python", 
      level: "Intermédiaire",
      desc: "Analyse de données, IA et scripting polyvalent.",
      category: "hard"
    },
    { 
      name: "JavaScript", 
      level: "Intermédiaire",
      desc: "Langage de script essentiel pour le web interactif.",
      category: "hard"
    },
    { 
      name: "SQL", 
      level: "Notions",
      desc: "Gestion et interrogation de bases de données relationnelles.",
      category: "hard"
    },
  ].sort((a, b) => {
    const order = { "Avancée": 1, "Intermédiaire": 2, "Notions": 3 };
    const levelDiff = (order[a.level] || 4) - (order[b.level] || 4);
    return levelDiff !== 0 ? levelDiff : a.name.localeCompare(b.name);
  });

  const [open, setOpen] = useState(false);
  const appRef = useRef(null); // Référence pour le conteneur principal de l'application

  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);

  return (
    // Ajout du style pour le défilement fluide
    <div ref={appRef} className="flex flex-col md:flex-row w-full h-screen overflow-hidden bg-neutral-900" style={{ scrollBehavior: "smooth" }}>
      <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto">
            <div className="flex flex-col gap-2 pt-4">
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
      <Dashboard 
        projects={projectsData} 
        internship={internshipData} 
        onProjectClick={setSelectedProject} 
        onSkillClick={setSelectedSkill}
        isModalOpen={!!selectedProject || !!selectedSkill} 
        language={language} 
        setLanguage={setLanguage} 
        translations={translations} 
        activeTab={activeTab} 
        skillsList={skillsList}
      />

      {/* 4. Modale de projet */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
            language={language} 
            translations={translations} 
            skillsList={skillsList}
            onSkillClick={(skill) => {
              setSelectedProject(null);
              setSelectedSkill(skill);
            }}
          />
        )}
        {selectedSkill && (
          <SkillModal 
            skill={selectedSkill} 
            projects={[...projectsData, ...internshipData]} 
            onClose={() => setSelectedSkill(null)} 
            onProjectClick={(project) => {
              setSelectedSkill(null);
              setSelectedProject(project);
            }}
          />
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
const Dashboard = ({ projects, internship, onProjectClick, onSkillClick, isModalOpen, language, setLanguage, translations, activeTab, skillsList }) => {
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const allProjectsAndInternships = [...projects, ...(internship || [])];
  const allExperiences = [...allProjectsAndInternships].sort((a, b) => parseInt(b.year) - parseInt(a.year));

  // Données pour les compétences spéciales GEII
  // TODO: Ajustez les pourcentages de maîtrise (propriété 'percentage') selon votre évaluation
  const geiiSkills = [
    { 
      name: "Concevoir", 
      color: "blue", 
      levels: [
        
        { id: 1, 
          desc: "Mener une conception partielle intégrant une démarche projet.", 
          percentage: 90, 
          explanation: "Je suis capable de concevoir et mener à bien une conception d'un projet tout en respectant un cahier des charges précis et dans un temps imparti.", 
          projectIds: [1,2,3,"stage-1"] },
        
          { id: 2,
          desc: "Concevoir un système en fiabilisant les solutions.", 
          percentage: 90, 
          explanation: "Mes conceptions sont fiables, mais je dois faire plus attention au côté concret. Parfois, je reste trop dans la théorie et j'oublie des détails de terrain. J'apprends à mieux imaginer l'utilisation finale pour éviter ces petites erreurs. ", 
          projectIds: [2,"stage-1"] },
        
          { id: 3, 
          desc: "Concevoir un système en adoptant une approche sélective dans ses choix technologiques.", 
          percentage: 90, 
          explanation: "Le niveau est de 90% car je pense être en capacité de concevoir des systèmes complexes, en choisissant les composants et logiciels adaptés, mais il me manque encore de l'expérience pratique pour atteindre une maîtrise totale.", 
          projectIds: [2,4,6] 
        }
      ]
    },
    { 
      name: "Vérifier", 
      color: "green", 
      levels: [
        { id: 1, 
          desc: "Effectuer les tests et mesures nécessaires à une vérification d’un système.", 
          percentage: 90, 
          explanation: "Je maîtrise des appareils de mesure standards (tel que l'oscilloscope, le multimètre) validée en TP mais aussi dans tous mes projets. Je les maitrises certes mais pas à 100%, je dois encore m'améliorer sur certains appareil (comme le RIGOL ou l'utilisation plus poussée de l'oscilloscope).", 
          projectIds: [1,2, 3, 4, 5, 6, 7, 8, 9, 10, "stage-1"] },
        
        { id: 2, 
          desc: "Mettre en place un protocole de tests pour valider le fonctionnement d’un système.", 
          percentage: 80, 
          explanation: "Élaboration de plans de tests pour valider les prototypes fonctionnels.", 
          projectIds: [1, 2, 4, 3, 4, 5, 6, 7, 8, 9, 10,"stage-1"] },
        
        { id: 3, 
          desc: "Élaborer une procédure intégrant une démarche qualité pour valider le fonctionnement d’un système.", 
          percentage: 90, 
          explanation: "Mise en place de procédures de validation qualité en entreprise.", 
          projectIds: ["stage-1"] }
      ]
    },
    { 
      name: "Maintenir", 
      color: "yellow", 
      levels: [
        { id: 1, 
          desc: "Intervenir sur un système pour effectuer une opération de maintenance.", 
          percentage: 90, 
          explanation: "Capacité à identifier et remplacer des composants défectueux sur des cartes électroniques.", 
          projectIds: [3, 10] },
        { id: 2, 
          desc: "Mettre en place une stratégie de maintenance pour garantir un fonctionnement optimal.", 
          percentage: 75, 
          explanation: "Analyse approfondie de dysfonctionnements sur des systèmes embarqués temps réel.", 
          projectIds: [6, 8] }
      ]
    },
    { 
      name: "Implanter", 
      color: "red", 
      levels: [
        { id: 1, 
          desc: "Réaliser un système en mettant en place une démarche qualité en conformité avec le dossier de fabrication.", 
          percentage: 100, 
          explanation: "Réalisation de câblages d'armoires et de cartes électroniques en respectant les normes.", 
          projectIds: [1, 5] },
        { id: 2, 
          desc: "Interagir avec les différents acteurs, lors de l’installation et de la mise en service d’un système, dans une démarche qualité.", 
          percentage: 95, 
          explanation: "Déploiement et configuration de réseaux de capteurs et d'architectures IoT.", 
          projectIds: [8, 9] }
      ]
    },
  ];

  const colorClasses = {
    blue: { text: "text-blue-400", bg: "bg-blue-400" },
    green: { text: "text-green-400", bg: "bg-green-400" },
    yellow: { text: "text-yellow-400", bg: "bg-yellow-400" },
    red: { text: "text-red-400", bg: "bg-red-400" },
  };

  const skillSections = [
    { title: "Compétences Techniques", skills: skillsList.filter(s => s.category === 'hard') },
    { title: "Compétences Transversales", skills: skillsList.filter(s => s.category === 'soft') }
  ];

  const interestsData = [
    {
      title: "Cuisine",
      date: "Passion de toujours",
      description: "Je suis passionné per la cuisine depuis toujours, découvrir et faire de nouveaux plats, c'est sa que j'aime.",
      icon: <IconChefHat size={32} className="text-orange-400" />,
      level: null
    },
    {
      title: "Échecs",
      date: "Depuis 2018",
      description: "Jeu de stratégie pratiqué occasionnellemet pour développer la réflexion tactique.",
      icon: <IconChess size={32} className="text-white" />,
      level: "Intermédiaire"
    },
    {
      title: "Musculation",
      date: "En 2023",
      description: "Je faisais de la musculation en 2023, mais par manque de temps j'ai arrêté.",
      icon: <IconBarbell size={32} className="text-red-400" />,
      level: null
    },
    {
      title: "Badminton",
      date: "Loisir occasionnel",
      description: "Un très bon sport qui regroupe le travail d'équipe et la réactivité.",
      icon: <IconActivity size={32} className="text-green-400" />,
      level: null
    }
  ];

  return (
    // On ajoute un fond en dégradé directement ici.
    <div className="flex-1 h-full relative bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 overflow-hidden">
      
      {/* Bouton de changement de langue */}
      <div className="absolute top-4 right-4 z-50">
        <div className="relative">
          <button 
            onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
            className="p-2 bg-neutral-800/80 backdrop-blur-sm border border-neutral-700 rounded-full text-white hover:bg-neutral-700 transition-colors"
            title="Changer de langue"
          >
            <IconLanguage size={24} />
          </button>
          
          {isLangMenuOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-neutral-800 border border-neutral-700 rounded-md shadow-lg py-1">
              <button onClick={() => { setLanguage('fr'); setIsLangMenuOpen(false); }} className={`block w-full text-left px-4 py-2 text-sm hover:bg-neutral-700 ${language === 'fr' ? 'text-blue-400 font-bold' : 'text-neutral-200'}`}>Français</button>
              <button onClick={() => { setLanguage('en'); setIsLangMenuOpen(false); }} className={`block w-full text-left px-4 py-2 text-sm hover:bg-neutral-700 ${language === 'en' ? 'text-blue-400 font-bold' : 'text-neutral-200'}`}>English</button>
              <button onClick={() => { setLanguage('vi'); setIsLangMenuOpen(false); }} className={`block w-full text-left px-4 py-2 text-sm hover:bg-neutral-700 ${language === 'vi' ? 'text-blue-400 font-bold' : 'text-neutral-200'}`}>Tiếng Việt</button>
            </div>
          )}
        </div>
      </div>

      {/* Le contenu du dashboard est par-dessus. La classe 'no-scrollbar' a été retirée. */}
      <div className="w-full h-full overflow-hidden">
          {/* Section Accueil */}
          {activeTab === 'accueil' && (
            <section id="accueil" className="w-full h-full overflow-y-auto p-4 md:p-8 text-white flex flex-col justify-center items-center text-center">
              <div className="flex flex-col items-center gap-6 max-w-4xl mx-auto">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <img 
                    src={photo_profil} 
                    alt="Ly Minh-Quan" 
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-neutral-700 shadow-lg" 
                  />
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                >
                  <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-2">Ly Minh-Quan</h1>
                  <p className="text-lg md:text-xl lg:text-2xl text-blue-400 font-medium">Étudiant en Génie Électrique et Informatique Industrielle (GEII)</p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
                  className="max-w-3xl mt-4 bg-neutral-800/50 border border-neutral-700 rounded-xl p-6 backdrop-blur-sm"
                >
                  <p className="text-neutral-300 text-left md:text-center text-base md:text-lg">
                    Passionné par la robotique depuis mon très jeune âge, je suis actuellement étudiant en BUT GEII spécialisé en Electroniques et Systèmes Embarqués (ESE), où je développe mes compétences en électronique, informatique et automatique. Curieux et rigoureux, je suis constamment à la recherche de nouveaux défis pour transformer des idées innovantes en solutions concrètes.
                  </p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
                  className="flex flex-wrap justify-center gap-4 mt-6"
                >
                  <a href="#experiences" className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-lg flex items-center gap-2"><IconBrandTabler size={20} /> Découvrir mes projets</a>
                  <a href="assets/pdf/CV Ly Minh-Quan.pdf" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-neutral-700 text-white font-semibold rounded-lg hover:bg-neutral-600 transition-colors shadow-md flex items-center gap-2" title="Ouvrir le CV dans un nouvel onglet"><IconFileTypePdf size={20} /> Voir mon CV</a>
                </motion.div>
              </div>
            </section>
          )}

          {/* Section Expériences */}
          {activeTab === 'experiences' && (
          <section id="experiences" className="w-full h-full overflow-y-auto p-4 md:p-8 text-white pt-20 md:pt-5">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{translations.sections.experiences.title}</h2>
            <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-4 md:p-6 mb-6 md:mb-8 max-w-3xl backdrop-blur-sm">
              <p className="text-sm md:text-base text-neutral-300">{translations.sections.experiences.desc}</p>
            </div>
            {/* Grille d'expériences */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pb-10">
              {allExperiences.map((item) => (
                <motion.div
                  key={item.id}
                  className="bg-neutral-800 rounded-lg cursor-pointer overflow-hidden"
                  onClick={() => {
                    // Si la modale est déjà ouverte, le clic sur un projet en arrière-plan la fermera.
                    // Sinon, on ouvre la modale du projet cliqué.
                    if (isModalOpen) return;
                    onProjectClick(item);
                  }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <img src={item.images[0]} alt={item.title} className="w-full h-40 object-cover" />
                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <div className="flex justify-between text-sm text-neutral-400">
                      <span>{item.year}</span>
                      <span>{item.duration}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
          )}

          {/* Section Compétences */}
          {activeTab === 'competences' && (
          <section id="competences" className="w-full h-full overflow-y-auto p-4 md:p-8 text-white pt-20 md:pt-5">
            <h2 className="text-2xl md:text-3xl font-bold">{translations.sections.skills.title}</h2>
            <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-4 md:p-6 mt-4 mb-8 max-w-3xl backdrop-blur-sm">
              <p className="text-sm md:text-base text-neutral-300">{translations.sections.skills.desc}</p>
            </div>

            {/* Section spéciale Compétences GEII */}
            <div className="mb-10">
              <h3 className="text-xl md:text-2xl font-semibold mb-4 text-neutral-200">Compétences du Référentiel GEII</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {geiiSkills.map((skill, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-neutral-800 border border-neutral-700 rounded-xl p-5 flex flex-col justify-center items-center gap-2 cursor-pointer hover:bg-neutral-750 transition-colors hover:border-neutral-500/50 min-h-[120px]"
                    onClick={() => {
                      if (isModalOpen) return;
                      onSkillClick(skill);
                    }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <h4 className={`text-2xl font-bold ${colorClasses[skill.color].text}`}>{skill.name}</h4>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Grilles de compétences séparées */}
            <div className="flex flex-col gap-10 pb-10">
              {skillSections.map((section, sectionIdx) => (
                <div key={sectionIdx}>
                  <h3 className="text-xl md:text-2xl font-semibold mb-4 text-neutral-200">{section.title}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {section.skills.map((skill, idx) => {
                      // Trouver les projets qui utilisent cette compétence
                      const relatedProjects = allProjectsAndInternships.filter(p => p.skills && p.skills.includes(skill.name));
                      
                      return (
                        <motion.div 
                          key={idx}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="bg-neutral-800 border border-neutral-700 rounded-xl p-5 flex flex-col gap-3 hover:bg-neutral-750 transition-colors cursor-pointer hover:border-blue-500/30 group"
                          onClick={() => {
                            if (isModalOpen) return;
                            onSkillClick(skill);
                          }}
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="flex justify-between items-start">
                            <h3 className="text-xl font-bold text-blue-400 group-hover:text-blue-300 transition-colors">{skill.name}</h3>
                            {skill.level && (
                            <span className={`text-xs font-medium px-2 py-1 rounded border ${
                              skill.level === "Avancée" 
                                ? "bg-green-500/10 text-green-400 border-green-500/20" 
                                : skill.level === "Intermédiaire" 
                                  ? "bg-blue-500/10 text-blue-400 border-blue-500/20" 
                                  : "bg-neutral-500/10 text-neutral-400 border-neutral-500/20"
                            }`}>
                              {skill.level}
                            </span>
                            )}
                          </div>
                          <p className="text-sm text-neutral-300 flex-1 group-hover:text-neutral-200 transition-colors">{skill.desc}</p>
                          
                          {/* Indicateur de projets */}
                          {relatedProjects.length > 0 && (
                            <div className="mt-auto pt-3 border-t border-neutral-700/50 flex items-center gap-2 text-xs text-neutral-500">
                              <IconBrandTabler size={14} />
                              <span>{relatedProjects.length} projet{relatedProjects.length > 1 ? 's' : ''} associé{relatedProjects.length > 1 ? 's' : ''}</span>
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>
          )}

          {/* Section Centres d'intérêts */}
          {activeTab === 'interets' && (
          <section id="interets" className="w-full h-full overflow-y-auto p-4 md:p-8 text-white pt-20 md:pt-5">
            <h2 className="text-2xl md:text-3xl font-bold">{translations.sections.interests.title}</h2>
            <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-4 md:p-6 mt-4 mb-8 max-w-3xl backdrop-blur-sm">
              <p className="text-sm md:text-base text-neutral-300">{translations.sections.interests.desc}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-10">
              {interestsData.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-neutral-800 border border-neutral-700 rounded-xl p-6 flex flex-col gap-4 hover:bg-neutral-750 transition-colors hover:border-blue-500/30 group"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex justify-between items-start">
                    <div className="p-3 bg-neutral-900 rounded-lg border border-neutral-700 group-hover:border-blue-500/50 transition-colors">
                      {item.icon}
                    </div>
                    <span className="text-xs font-mono text-neutral-400 bg-neutral-900/50 px-2 py-1 rounded border border-neutral-700/50">
                      {item.date}
                    </span>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-neutral-200 group-hover:text-blue-400 transition-colors">{item.title}</h3>
                      {item.level && (
                        <span className="text-xs font-medium px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                          {item.level}
                        </span>
                      )}
                    </div>
                    <p className="text-neutral-400 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
          )}

          {/* Section Contacts */}
          {activeTab === 'contacts' && (
          <section id="contacts" className="w-full h-full overflow-y-auto p-4 md:p-8 text-white pt-20 md:pt-5">
            <h2 className="text-2xl md:text-3xl font-bold">{translations.sections.contact.title}</h2>
            <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-4 md:p-6 mt-4 max-w-3xl backdrop-blur-sm">
              <p className="text-sm md:text-base text-neutral-300">{translations.sections.contact.desc}</p>
            </div>

            {/* Cadre avec liens et QR Codes */}
            <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-4 md:p-6 mt-4 max-w-3xl backdrop-blur-sm flex flex-col gap-8">
              
              {/* LinkedIn */}
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="bg-white p-2 rounded-lg flex-shrink-0">
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent("https://www.linkedin.com/in/minh-quan-ly-1111m2005a")}`} 
                    alt="LinkedIn QR Code" 
                    className="w-24 h-24 md:w-32 md:h-32"
                  />
                </div>
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                  <a href="https://www.linkedin.com/in/minh-quan-ly-1111m2005a" target="_blank" rel="noopener noreferrer" className="relative group flex items-center gap-2 mb-2 text-blue-400 hover:text-blue-300 transition-colors">
                    <IconBrandLinkedin size={32} />
                    <h3 className="text-xl font-bold">LinkedIn</h3>
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-full mb-2 ml-2 w-48 p-2 
                    bg-neutral-900 border border-neutral-700 text-neutral-200 
                    text-xs rounded-lg shadow-xl opacity-0 group-hover:opacity-100 
                    transition-opacity pointer-events-none text-center z-10">
                      {translations.sections.contact.linkedinTooltip}
                    </div>
                  </a>
                </div>
              </div>

              {/* Séparateur */}
              <div className="w-full h-px bg-neutral-700/50"></div>

              {/* Email */}
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="bg-white p-2 rounded-lg flex-shrink-0">
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent("mailto:minhquan.ly.pro@outlook.com")}`} 
                    alt="Email QR Code" 
                    className="w-24 h-24 md:w-32 md:h-32"
                  />
                </div>
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                  <div className="flex items-center gap-2 mb-2 text-emerald-400">
                    <IconMail size={32} />
                    <h3 className="text-xl font-bold">Email</h3>
                  </div>
                  <a href="mailto:minhquan.ly.pro@outlook.com" className="text-neutral-300 hover:text-white hover:underline transition-colors break-all">
                    minhquan.ly.pro@outlook.com
                  </a>
                </div>
              </div>

            </div>
          </section>
          )}
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
const ProjectModal = ({ project, onClose, language, translations, skillsList, onSkillClick }) => {
  const modalRef = useRef(null);
  const [showPdfPreview, setShowPdfPreview] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);
  useOutsideClick(modalRef, () => {
    if (!showPdfPreview && !showLightbox) onClose();
  });

  const [[page, direction], setPage] = useState([0, 0]);
  const [isHovering, setIsHovering] = useState(false);

  // Détection du mode "Story" (pour le stage) si des descriptions multiples existent
  const isStoryMode = project.descriptions && Array.isArray(project.descriptions);

  const imageIndex = (page % project.images.length + project.images.length) % project.images.length;

  const paginate = useCallback((newDirection) => {
    setPage([page + newDirection, newDirection]);
  }, [page]);

  useEffect(() => {
    // Désactiver le défilement automatique si on est en mode Story ou s'il n'y a qu'une image
    if (project.images.length <= 1 || isHovering || isStoryMode) return;
    const autoplay = setInterval(() => paginate(1), 5000); // Défilement toutes les 3 secondes
    return () => clearInterval(autoplay);
  }, [isHovering, paginate, project.images.length, isStoryMode]);

  // Sélection du contenu en fonction du mode
  const currentDescription = isStoryMode ? project.descriptions[imageIndex] : project.description;
  const currentSkills = project.skills || [];

  const hardSkills = currentSkills.filter(skillName => {
    const s = skillsList.find(sk => sk.name === skillName);
    return s && s.category === 'hard';
  });

  const softSkills = currentSkills.filter(skillName => {
    const s = skillsList.find(sk => sk.name === skillName);
    return s && s.category === 'soft';
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center p-2 md:p-4"
    >
      <motion.div
        ref={modalRef}
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-neutral-900/80 border border-neutral-700 rounded-xl w-full max-w-7xl h-[90vh] md:h-[80vh] relative flex flex-col overflow-hidden"
      >
        {/* Bouton de fermeture */}
        <button onClick={onClose} className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors z-20 p-1 rounded-full hover:bg-neutral-800">
          <IconX size={24} />
        </button>

        {/* Conteneur défilable pour le contenu */}
        <div className="overflow-y-auto p-4 md:p-6 flex-1">
        {/* Layout en colonne pour le contenu de la modale */}
        <div className="flex flex-col gap-4 md:gap-8">
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
                  className="absolute w-full h-full object-contain cursor-zoom-in"
                  onClick={() => setShowLightbox(true)}
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

            {/* Indicateurs (Dots) */}
            {project.images.length > 1 && (
              <div className="flex justify-center gap-2 mt-4">
                {project.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      const direction = idx > imageIndex ? 1 : -1;
                      setPage([page + (idx - imageIndex), direction]);
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === imageIndex ? "w-8 bg-white" : "w-2 bg-neutral-600 hover:bg-neutral-500"
                    }`}
                    aria-label={`Voir l'image ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Informations en bas */}
          <div className="w-full flex flex-col">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 pr-8">{project.title}</h2>

            {/* Texte */}
            <div className="mb-4 md:mb-6">
              {Array.isArray(currentDescription) && typeof currentDescription[0] === 'object' ? (
                <div className="flex flex-col gap-4">
                  {currentDescription.map((section, idx) => (
                    <div key={idx} className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-5 shadow-sm">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2 border-b border-neutral-700/50 pb-2">
                        <h4 className="text-xl font-bold text-blue-400">{section.title}</h4>
                        {section.period && (
                          <span className="text-xs font-mono bg-neutral-700 px-2 py-1 rounded text-neutral-300 whitespace-nowrap">
                            {section.period}
                          </span>
                        )}
                      </div>
                      <p className="text-sm md:text-base text-neutral-300 whitespace-pre-wrap leading-relaxed">
                        {section.text}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-neutral-800/30 p-4 rounded-lg border border-neutral-700/50">
                  <p className="text-sm md:text-base text-neutral-300 whitespace-pre-wrap">
                    {Array.isArray(currentDescription) ? currentDescription.join("") : currentDescription}
                  </p>
                </div>
              )}
            </div>

            {/* Ressenti du projet */}
            {project.feedback && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-white">{translations.modal.projectFeedback}</h3>
                <div className="flex flex-col gap-4">
                  {project.feedback.difficulties && (
                    <div className="bg-neutral-800/50 p-4 rounded-lg border border-neutral-700/50">
                      <h4 className="text-md font-semibold mb-2 text-red-400">{translations.modal.difficulties}</h4>
                      <p className="text-sm text-neutral-300 whitespace-pre-wrap">{project.feedback.difficulties}</p>
                    </div>
                  )}
                  {project.feedback.takeaways && (
                    <div className="bg-neutral-800/50 p-4 rounded-lg border border-neutral-700/50">
                      <h4 className="text-md font-semibold mb-2 text-green-400">{translations.modal.takeaways}</h4>
                      <p className="text-sm text-neutral-300 whitespace-pre-wrap">{project.feedback.takeaways}</p>
                    </div>
                  )}
                  {project.feedback.extensions && (
                    <div className="bg-neutral-800/50 p-4 rounded-lg border border-neutral-700/50">
                      <h4 className="text-md font-semibold mb-2 text-blue-400">{translations.modal.extensions}</h4>
                      <p className="text-sm text-neutral-300 whitespace-pre-wrap">{project.feedback.extensions}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Sous-titre Année et Temps */}
            <div className="mb-6 bg-neutral-800/30 p-4 rounded-lg border border-neutral-700/50">
                <h3 className="text-lg font-semibold mb-3 text-white">{translations.modal.yearTime}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <span className="text-neutral-400 text-sm">{translations.modal.year}</span>
                        <span className="text-neutral-200 font-medium">{project.year}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-neutral-400 text-sm">{translations.modal.duration}</span>
                        <span className="text-neutral-200 font-medium">{project.duration}</span>
                    </div>
                </div>
            </div>

            {/* Pins de compétences */}
            <div>
              <h3 className="text-lg font-semibold mb-3">{translations.modal.skills}</h3>
              
              <div className="flex flex-col gap-4">
                {hardSkills.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-neutral-400 mb-2 uppercase tracking-wider">Compétences Techniques</h4>
                    <div className="flex flex-wrap gap-2">
                      {hardSkills.map((skillName, index) => (
                        <button key={index} onClick={() => onSkillClick(skillsList.find(s => s.name === skillName))} className="bg-blue-500/20 text-blue-300 text-xs font-medium px-2.5 py-1 rounded-full hover:bg-blue-500/40 transition-colors cursor-pointer">
                          {skillName}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {softSkills.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-neutral-400 mb-2 uppercase tracking-wider">Compétences Transversales</h4>
                    <div className="flex flex-wrap gap-2">
                      {softSkills.map((skillName, index) => (
                        <button key={index} onClick={() => onSkillClick(skillsList.find(s => s.name === skillName))} className="bg-neutral-500/20 text-neutral-300 text-xs font-medium px-2.5 py-1 rounded-full hover:bg-neutral-500/40 transition-colors cursor-pointer">
                          {skillName}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        </div>

        {/* Bouton PDF flottant en bas à droite */}
        {project.pdf && (
          <div className="absolute bottom-6 right-6 z-50 group">
            {/* Tooltip (Note explicative) */}
            <div className="absolute bottom-full right-0 mb-2 w-64 p-3 bg-neutral-900 border 
            border-neutral-700 text-neutral-200 text-xs rounded-lg shadow-xl opacity-0 
            group-hover:opacity-100 transition-opacity pointer-events-none">
              {translations.modal.tooltip}
            </div>
            {/* Bouton de prévisualisation */}
            <button 
              onClick={() => setShowPdfPreview(true)}
              className="flex items-center justify-center w-15 h-15 bg-neutral-700 
              hover:bg-neutral-600 text-white rounded-full shadow-lg transition-all hover:scale-110"
            >
              <IconFileTypePdf size={30} />
            </button>
          </div>
        )}
      </motion.div>

      {/* Lightbox (Image en grand) */}
      <AnimatePresence>
        {showLightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex justify-center items-center"
            onClick={() => setShowLightbox(false)}
          >
            {/* Bouton fermer */}
            <button 
              className="absolute top-4 right-4 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors z-50"
              onClick={() => setShowLightbox(false)}
            >
              <IconX size={32} />
            </button>

            {/* Image en grand */}
            <motion.img
              key={page}
              src={project.images[imageIndex]}
              alt={project.title}
              className="max-w-[95vw] max-h-[95vh] object-contain select-none"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            />

            {/* Navigation Lightbox */}
            {project.images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); paginate(-1); }}
                  className="absolute left-4 text-white/70 hover:text-white p-3 rounded-full hover:bg-white/10 transition-colors z-50"
                >
                  <IconChevronLeft size={40} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); paginate(1); }}
                  className="absolute right-4 text-white/70 hover:text-white p-3 rounded-full hover:bg-white/10 transition-colors z-50"
                >
                  <IconChevronRight size={40} />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modale de prévisualisation PDF */}
      <AnimatePresence>
        {showPdfPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex justify-center items-center p-4 md:p-8"
            onClick={() => setShowPdfPreview(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-neutral-900 w-full h-full max-w-6xl rounded-xl border border-neutral-700 flex flex-col overflow-hidden shadow-2xl"
            >
              <div className="flex justify-between items-center p-4 bg-neutral-800 border-b border-neutral-700">
                <h3 className="text-white font-bold text-lg truncate pr-4">{project.title} - Document</h3>
                <div className="flex items-center gap-3">
                  <a 
                    href={project.pdf} 
                    download
                    className="px-4 py-2 bg-neutral-200 hover:bg-white text-neutral-900 rounded-lg text-sm font-bold transition-colors flex items-center gap-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <IconFileTypePdf size={20} />
                    <span className="hidden sm:inline">Télécharger</span>
                  </a>
                  <button 
                    onClick={() => setShowPdfPreview(false)}
                    className="p-2 hover:bg-neutral-700 rounded-full text-neutral-400 hover:text-white transition-colors"
                  >
                    <IconX size={24} />
                  </button>
                </div>
              </div>
              <div className="flex-1 bg-neutral-800 relative">
                <iframe 
                  src={project.pdf} 
                  className="w-full h-full absolute inset-0" 
                  title="PDF Preview"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Composant pour la modale de compétence
const SkillModal = ({ skill, projects, onClose, onProjectClick }) => {
  const modalRef = useRef(null);
  useOutsideClick(modalRef, onClose);
  const [selectedLevel, setSelectedLevel] = useState(null);

  // Filtrer les projets qui utilisent cette compétence (pour les compétences standards uniquement)
  const isGeiiSkill = !!skill.levels;
  const relatedProjects = isGeiiSkill ? [] : projects.filter(p => p.skills && p.skills.includes(skill.name));
  const levelProjects = selectedLevel && selectedLevel.projectIds ? projects.filter(p => selectedLevel.projectIds.includes(p.id)) : [];

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
        className="bg-neutral-900/90 border border-neutral-700 rounded-xl w-full max-w-5xl max-h-[85vh] relative flex flex-col overflow-hidden shadow-2xl"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors z-20 p-1 rounded-full hover:bg-neutral-800">
          <IconX size={24} />
        </button>

        <div className="p-6 overflow-y-auto h-full">
          <AnimatePresence mode="wait">
          {selectedLevel ? (
            <motion.div 
              key="level-detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-6 pt-2"
            >
              <div className="flex items-center gap-3 mb-2">
                <button 
                  onClick={() => setSelectedLevel(null)}
                  className="p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors"
                >
                  <IconArrowLeft size={20} />
                </button>
                <h2 className="text-2xl font-bold text-white">Niveau {selectedLevel.id} - Détails</h2>
              </div>

              <div className="bg-neutral-800/50 p-6 rounded-xl border border-neutral-700">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-blue-400">Maîtrise : {selectedLevel.percentage}%</h3>
                </div>
                <p className="text-neutral-300 mb-6 text-lg">{selectedLevel.desc}</p>
                
                {selectedLevel.explanation && (
                  <div className="p-4 bg-neutral-900/50 rounded-lg border-l-4 border-blue-500 mb-2">
                      <h4 className="text-sm font-bold text-neutral-400 mb-2 uppercase tracking-wider">Pourquoi ce niveau ?</h4>
                      <p className="text-neutral-200 italic">"{selectedLevel.explanation}"</p>
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <IconBrandTabler size={24} className="text-neutral-400" />
                  Projets associés au niveau {selectedLevel.id}
                </h3>
                {levelProjects.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {levelProjects.map(project => (
                      <div 
                        key={project.id}
                        onClick={() => onProjectClick(project)}
                        className="group flex items-center gap-3 p-3 rounded-lg bg-neutral-800/50 border border-neutral-700 hover:bg-neutral-800 hover:border-blue-500/50 cursor-pointer transition-all"
                      >
                        <img 
                          src={project.images[0]} 
                          alt={project.title} 
                          className="w-12 h-12 rounded object-cover bg-neutral-900"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-neutral-200 group-hover:text-blue-400 truncate transition-colors">
                            {project.title}
                          </h4>
                          <p className="text-xs text-neutral-500">{project.year}</p>
                        </div>
                        <IconChevronRight size={16} className="text-neutral-600 group-hover:text-blue-400 transition-colors" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-neutral-500 italic">Aucun projet spécifique associé à ce niveau.</p>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="skill-overview"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-6"
            >
            {/* En-tête */}
            <div>
              <div className="flex items-center gap-4 mb-4 pr-12">
                <h2 className="text-3xl font-bold text-blue-400">{skill.name}</h2>
                {/* Affichage du badge de niveau uniquement pour les compétences standards */}
                {skill.level && typeof skill.level === 'string' && (
                  <span className={`text-sm font-medium px-3 py-1 rounded-full border ${
                    skill.level === "Avancée" 
                      ? "bg-green-500/10 text-green-400 border-green-500/20" 
                      : skill.level === "Intermédiaire" 
                        ? "bg-blue-500/10 text-blue-400 border-blue-500/20" 
                        : "bg-neutral-500/10 text-neutral-400 border-neutral-500/20"
                  }`}>
                    {skill.level}
                  </span>
                )}
              </div>
              
              {/* Affichage conditionnel : Niveaux détaillés (GEII) ou Description simple (Standard) */}
              {skill.levels ? (
                <div className="flex flex-col gap-6">
                  {skill.levels.map((lvl) => {
                    return (
                    <div 
                      key={lvl.id} 
                      onClick={() => setSelectedLevel(lvl)}
                      className="bg-neutral-800/50 p-4 rounded-lg border border-neutral-700 hover:bg-neutral-800 hover:border-blue-500/50 cursor-pointer transition-all group"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">Niveau {lvl.id}</h4>
                        <span className="text-sm font-mono text-neutral-400">{lvl.percentage}%</span>
                      </div>
                      <p className="text-neutral-300 text-sm mb-3">{lvl.desc}</p>

                      <div className="w-full bg-neutral-700 rounded-full h-2.5 mb-4">
                        <div 
                          className={`h-2.5 rounded-full ${
                            skill.color === 'blue' ? 'bg-blue-400' : 
                            skill.color === 'green' ? 'bg-green-400' : 
                            skill.color === 'yellow' ? 'bg-yellow-400' : 
                            skill.color === 'red' ? 'bg-red-400' : 'bg-blue-500'
                          }`}
                          style={{ width: `${lvl.percentage}%` }}
                        ></div>
                      </div>
                      
                      <div className="text-xs text-blue-400 font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        Voir les détails et projets associés <IconChevronRight size={14} />
                      </div>
                    </div>
                  )})}
                </div>
              ) : (
                <p className="text-neutral-300 text-lg">{skill.desc}</p>
              )}
            </div>

            {/* Liste des projets */}
            {!isGeiiSkill && (
            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <IconBrandTabler size={24} className="text-neutral-400" />
                Projets associés
              </h3>
              
              {relatedProjects.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {relatedProjects.map(project => (
                    <div 
                      key={project.id}
                      onClick={() => onProjectClick(project)}
                      className="group flex items-center gap-3 p-3 rounded-lg bg-neutral-800/50 border border-neutral-700 hover:bg-neutral-800 hover:border-blue-500/50 cursor-pointer transition-all"
                    >
                      <img 
                        src={project.images[0]} 
                        alt={project.title} 
                        className="w-12 h-12 rounded object-cover bg-neutral-900"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-neutral-200 group-hover:text-blue-400 truncate transition-colors">
                          {project.title}
                        </h4>
                        <p className="text-xs text-neutral-500">{project.year}</p>
                      </div>
                      <IconChevronRight size={16} className="text-neutral-600 group-hover:text-blue-400 transition-colors" />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-neutral-500 italic">Aucun projet listé pour cette compétence.</p>
              )}
            </div>
            )}
            </motion.div>
          )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default App

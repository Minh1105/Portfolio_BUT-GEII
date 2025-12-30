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
} from "@tabler/icons-react";
import { useOutsideClick } from './components/use-outside-click';

// 1. Importez vos images locales ici
// Créez un dossier `src/assets/images` et placez-y vos images.
import robot1 from './assets/images/robot1.png';
import robot2 from './assets/images/robot2.png';
import robot3 from './assets/images/robot3.png';
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
    fr: {
      sidebar: { home: "Accueil", projects: "Projets", internship: "Mes stages", skills: "Compétences", contact: "Contacts" },
      sections: {
        projects: { title: "Mes Projets", desc: "Voici une sélection de mes projets académiques et personnels. Ils illustrent mes compétences techniques et ma capacité à mener à bien des réalisations concrètes, du développement logiciel à l'électronique embarquée." },
        internship: { title: "Mon Stage", desc: "Cette section détaille mon expérience professionnelle acquise lors de mon stage de fin d'études. Vous y découvrirez le contexte, mes missions, ainsi que les compétences mises en œuvre en situation réelle." },
        skills: { title: "Compétences", desc: "Retrouvez ici l'ensemble des compétences techniques et transversales que j'ai développées au cours de ma formation et de mes expériences. Elles couvrent le développement, l'électronique, et la gestion de projet." },
        contact: { title: "Contacts", desc: "N'hésitez pas à me contacter pour toute opportunité professionnelle ou question sur mon parcours. Je suis joignable par email ou via LinkedIn." }
      },
      modal: { skills: "Compétences utilisées", tooltip: "Pour plus de précision sur le projet, vous pouvez consulter le rapport ou compte rendu téléchargeable ici." }
    },
    en: {
      sidebar: { home: "Home", projects: "Projects", internship: "Internships", skills: "Skills", contact: "Contact" },
      sections: {
        projects: { title: "My Projects", desc: "Here is a selection of my academic and personal projects. They illustrate my technical skills and my ability to carry out concrete achievements, from software development to embedded electronics." },
        internship: { title: "My Internship", desc: "This section details my professional experience acquired during my end-of-studies internship. You will discover the context, my missions, as well as the skills implemented in real situations." },
        skills: { title: "Skills", desc: "Here you will find all the technical and transversal skills that I developed during my training and my experiences. They cover development, electronics, and project management." },
        contact: { title: "Contact", desc: "Do not hesitate to contact me for any professional opportunity or question about my background. I am reachable by email or via LinkedIn." }
      },
      modal: { skills: "Skills used", tooltip: "For more details on the project, you can download the report here." }
    },
    vi: {
      sidebar: { home: "Trang chủ", projects: "Dự án", internship: "Thực tập", skills: "Kỹ năng", contact: "Liên hệ" },
      sections: {
        projects: { title: "Dự án của tôi", desc: "Đây là tuyển tập các dự án học thuật và cá nhân của tôi. Chúng minh họa các kỹ năng kỹ thuật và khả năng thực hiện các thành tựu cụ thể của tôi, từ phát triển phần mềm đến điện tử nhúng." },
        internship: { title: "Kỳ thực tập", desc: "Phần này chi tiết về kinh nghiệm làm việc chuyên nghiệp của tôi trong kỳ thực tập cuối khóa. Bạn sẽ khám phá bối cảnh, nhiệm vụ của tôi, cũng như các kỹ năng được áp dụng trong thực tế." },
        skills: { title: "Kỹ năng", desc: "Tại đây bạn sẽ tìm thấy tất cả các kỹ năng kỹ thuật và kỹ năng mềm mà tôi đã phát triển trong quá trình đào tạo và kinh nghiệm của mình. Chúng bao gồm phát triển, điện tử và quản lý dự án." },
        contact: { title: "Liên hệ", desc: "Đừng ngần ngại liên hệ với tôi cho bất kỳ cơ hội nghề nghiệp hoặc câu hỏi nào về quá trình của tôi. Tôi có thể được liên hệ qua email hoặc LinkedIn." }
      },
      modal: { skills: "Kỹ năng sử dụng", tooltip: "Để biết thêm chi tiết về dự án, bạn có thể tải xuống báo cáo tại đây." }
    }
  };

  const links = [
    {
      label: translations[language].sidebar.home,
      href: "#accueil",
      icon: (
        <IconHome className="text-neutral-700 dark:text-neutral-200 h-9 w-9 flex-shrink-0" />
      ),
    },
    {
      label: translations[language].sidebar.projects,
      href: "#projets",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-9 w-9 flex-shrink-0" />
      ),
    },
    {
      label: translations[language].sidebar.internship,
      href: "#stage",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-9 w-9 flex-shrink-0" />
      ),
    },
    {
      label: translations[language].sidebar.skills,
      href: "#competences",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-9 w-9 flex-shrink-0" />
      ),
    },
    {
      label: translations[language].sidebar.contact,
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
      title: { fr: "Projet 1", en: "Project 1", vi: "Dự án 1" },
      images: [robot1, robot2], // 2. Utilisez les variables d'image importées
      description: { fr: "Description détaillée du projet 1. Lorem ipsum dolor sit amet...", en: "Detailed description of project 1...", vi: "Mô tả chi tiết dự án 1..." },
      skills: ["React", "Node.js", "UHF"],
      pdf: "/path/to/rapport_projet1.pdf"
    },
    {
      id: 2,
      title: { fr: "Projet 2", en: "Project 2", vi: "Dự án 2" },
      images: [
        robot3, // Exemple avec une seule image
      ],
      description: { fr: "Description détaillée du projet 2...", en: "Detailed description of project 2...", vi: "Mô tả chi tiết dự án 2..." },
      skills: ["Python", "Flask", "Machine Learning"],
      pdf: "/path/to/rapport_projet2.pdf"
    },
    {
      id: 3,
      title: { fr: "Projet 3", en: "Project 3", vi: "Dự án 3" },
      images: [
        "https://via.placeholder.com/800x450.png/1a1a1a/ffffff?text=Projet+3+-+Image+1",
      ],
      description: { fr: "Description détaillée du projet 3...", en: "Detailed description of project 3...", vi: "Mô tả chi tiết dự án 3..." },
      skills: ["C++", "Arduino", "Electronique"],
      pdf: "/path/to/rapport_projet3.pdf"
    },
    {
      id: 4,
      title: { fr: "Projet 4", en: "Project 4", vi: "Dự án 4" },
      images: [
        "https://via.placeholder.com/800x450.png/1a1a1a/ffffff?text=Projet+4+-+Image+1",
        "https://via.placeholder.com/800x450.png/2a2a2a/ffffff?text=Projet+4+-+Image+2",
        "https://via.placeholder.com/800x450.png/3a3a3a/ffffff?text=Projet+4+-+Image+3",
      ],
      description: { fr: "Description détaillée du projet 4...", en: "Detailed description of project 4...", vi: "Mô tả chi tiết dự án 4..." },
      skills: ["JavaScript", "TailwindCSS", "Vite"],
      pdf: "/path/to/rapport_projet4.pdf"
    },
    {
      id: 5,
      title: { fr: "Projet 5", en: "Project 5", vi: "Dự án 5" },
      images: [
        "https://via.placeholder.com/800x450.png/1a1a1a/ffffff?text=Projet+5+-+Image+1",
        "https://via.placeholder.com/800x450.png/2a2a2a/ffffff?text=Projet+5+-+Image+2",
      ],
      description: { fr: "Description détaillée du projet 5...", en: "Detailed description of project 5...", vi: "Mô tả chi tiết dự án 5..." },
      skills: ["Figma", "UI/UX", "Design"],
      pdf: "/path/to/rapport_projet5.pdf"
    },
    {
      id: 6,
      title: { fr: "Projet 6", en: "Project 6", vi: "Dự án 6" },
      images: [
        "https://via.placeholder.com/800x450.png/1a1a1a/ffffff?text=Projet+6+-+Image+1",
      ],
      description: { fr: "Description détaillée du projet 6...", en: "Detailed description of project 6...", vi: "Mô tả chi tiết dự án 6..." },
      skills: ["STM32", "C", "RTOS"],
      pdf: "/path/to/rapport_projet6.pdf"
    },
    {
      id: 7,
      title: { fr: "Projet 7", en: "Project 7", vi: "Dự án 7" },
      images: [
        "https://via.placeholder.com/800x450.png/1a1a1a/ffffff?text=Projet+7+-+Image+1",
        "https://via.placeholder.com/800x450.png/2a2a2a/ffffff?text=Projet+7+-+Image+2",
      ],
      description: { fr: "Description détaillée du projet 7...", en: "Detailed description of project 7...", vi: "Mô tả chi tiết dự án 7..." },
      skills: ["Java", "Spring Boot", "SQL"],
      pdf: "/path/to/rapport_projet7.pdf"
    },
    {
      id: 8,
      title: { fr: "Projet 8", en: "Project 8", vi: "Dự án 8" },
      images: [
        "https://via.placeholder.com/800x450.png/1a1a1a/ffffff?text=Projet+8+-+Image+1",
        "https://via.placeholder.com/800x450.png/2a2a2a/ffffff?text=Projet+8+-+Image+2",
        "https://via.placeholder.com/800x450.png/3a3a3a/ffffff?text=Projet+8+-+Image+3",
      ],
      description: { fr: "Description détaillée du projet 8...", en: "Detailed description of project 8...", vi: "Mô tả chi tiết dự án 8..." },
      skills: ["Docker", "Kubernetes", "CI/CD"],
      pdf: "/path/to/rapport_projet8.pdf"
    },
    {
      id: 9,
      title: { fr: "Projet 9", en: "Project 9", vi: "Dự án 9" },
      images: [
        "https://via.placeholder.com/800x450.png/1a1a1a/ffffff?text=Projet+9+-+Image+1",
        "https://via.placeholder.com/800x450.png/2a2a2a/ffffff?text=Projet+9+-+Image+2",
      ],
      description: { fr: "Description détaillée du projet 9...", en: "Detailed description of project 9...", vi: "Mô tả chi tiết dự án 9..." },
      skills: ["Vue.js", "Firebase", "GraphQL"],
      pdf: "/path/to/rapport_projet9.pdf"
    },
    {
      id: 10,
      title: { fr: "Projet 10", en: "Project 10", vi: "Dự án 10" },
      images: [
        "https://via.placeholder.com/800x450.png/1a1a1a/ffffff?text=Projet+10+-+Image+1",
      ],
      description: { fr: "Description détaillée du projet 10...", en: "Detailed description of project 10...", vi: "Mô tả chi tiết dự án 10..." },
      skills: ["Angular", "TypeScript", "RxJS"],
      pdf: "/path/to/rapport_projet10.pdf"
    },
  ];

  // Données pour le stage (structure identique aux projets pour la compatibilité)
  const internshipData = [
    {
      id: "stage-1",
      title: { fr: "Stage BUT GEII", en: "BUT GEII Internship", vi: "Thực tập BUT GEII" },
      images: [
        "https://via.placeholder.com/800x450.png/1a1a1a/ffffff?text=Introduction+Stage",
        "https://via.placeholder.com/800x450.png/2a2a2a/ffffff?text=Developpement+Qt",
        "https://via.placeholder.com/800x450.png/3a3a3a/ffffff?text=Reseau+et+Serveur",
        "https://via.placeholder.com/800x450.png/4a4a4a/ffffff?text=Bilan+et+Resultats",
      ],
      description: { fr: "Stage de fin d'études. Cliquez pour découvrir le déroulement du stage étape par étape.", en: "End of studies internship. Click to discover the internship process step by step.", vi: "Thực tập cuối khóa. Nhấp để khám phá quá trình thực tập từng bước." },
      skills: ["C++", "Qt", "Réseaux"],
      pdf: "/path/to/rapport_stage.pdf",
      // Données spécifiques pour le mode 'Story' (par image)
      descriptions: {
        fr: [
          "Introduction et Contexte :\n\nDurant ce stage de 10 semaines, j'ai intégré l'équipe R&D de l'entreprise. L'objectif principal était de moderniser l'interface de contrôle d'un robot industriel.\n\nJ'ai commencé par :\n- Analyser l'existant et les besoins des opérateurs.\n- Mettre en place l'environnement de développement (Linux, Qt).\n- Définir l'architecture logicielle du nouveau module.",
          "Développement de l'Interface (IHM) :\n\nLa première phase technique a consisté à développer l'interface graphique avec le framework Qt (C++). J'ai créé des widgets personnalisés pour afficher les capteurs du robot en temps réel.\n\nChallenges relevés :\n- Gestion du rafraîchissement fluide des graphiques.\n- Création d'un design ergonomique et sombre pour réduire la fatigue visuelle.",
          "Communication Réseau & Backend :\n\nPour que l'interface communique avec le robot, j'ai implémenté un client TCP/IP asynchrone. Le robot agit comme un serveur envoyant des trames de données structurées.\n\nJ'ai dû décoder ces trames binaires, gérer les erreurs de connexion et assurer la reconnexion automatique en cas de perte de signal.",
          "Bilan et Compétences Acquises :\n\nCe stage m'a permis de consolider mes compétences en C++ orienté objet et en programmation événementielle. J'ai aussi appris à travailler avec des outils de versionning (Git) dans un contexte professionnel.\n\nLe projet a été validé par l'équipe et sera déployé sur la prochaine version des robots."
        ],
        en: [
          "Introduction and Context:\n\nDuring this 10-week internship, I joined the company's R&D team. The main objective was to modernize the control interface of an industrial robot.\n\nI started by:\n- Analyzing the existing system and operator needs.\n- Setting up the development environment (Linux, Qt).\n- Defining the software architecture of the new module.",
          "Interface Development (HMI):\n\nThe first technical phase consisted of developing the graphical interface with the Qt framework (C++). I created custom widgets to display robot sensors in real time.\n\nChallenges met:\n- Managing fluid graphics refresh.\n- Creating an ergonomic and dark design to reduce visual fatigue.",
          "Network Communication & Backend:\n\nFor the interface to communicate with the robot, I implemented an asynchronous TCP/IP client. The robot acts as a server sending structured data frames.\n\nI had to decode these binary frames, handle connection errors, and ensure automatic reconnection in case of signal loss.",
          "Assessment and Skills Acquired:\n\nThis internship allowed me to consolidate my skills in object-oriented C++ and event-driven programming. I also learned to work with versioning tools (Git) in a professional context.\n\nThe project was validated by the team and will be deployed on the next version of the robots."
        ],
        vi: [
          "Giới thiệu và Bối cảnh:\n\nTrong kỳ thực tập 10 tuần này, tôi đã tham gia nhóm R&D của công ty. Mục tiêu chính là hiện đại hóa giao diện điều khiển của một robot công nghiệp.\n\nTôi bắt đầu bằng cách:\n- Phân tích hệ thống hiện có và nhu cầu của người vận hành.\n- Thiết lập môi trường phát triển (Linux, Qt).\n- Xác định kiến trúc phần mềm của mô-đun mới.",
          "Phát triển Giao diện (HMI):\n\nGiai đoạn kỹ thuật đầu tiên bao gồm phát triển giao diện đồ họa với framework Qt (C++). Tôi đã tạo các widget tùy chỉnh để hiển thị cảm biến robot trong thời gian thực.\n\nThách thức:\n- Quản lý làm mới đồ họa mượt mà.\n- Tạo thiết kế công thái học và tối để giảm mỏi mắt.",
          "Giao tiếp Mạng & Backend:\n\nĐể giao diện giao tiếp với robot, tôi đã triển khai một client TCP/IP bất đồng bộ. Robot hoạt động như một máy chủ gửi các khung dữ liệu có cấu trúc.\n\nTôi phải giải mã các khung nhị phân này, xử lý lỗi kết nối và đảm bảo kết nối lại tự động trong trường hợp mất tín hiệu.",
          "Đánh giá và Kỹ năng đạt được:\n\nKỳ thực tập này cho phép tôi củng cố các kỹ năng về C++ hướng đối tượng và lập trình hướng sự kiện. Tôi cũng học cách làm việc với các công cụ quản lý phiên bản (Git) trong bối cảnh chuyên nghiệp.\n\nDự án đã được nhóm phê duyệt và sẽ được triển khai trên phiên bản robot tiếp theo."
        ]
      },
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
      <Dashboard projects={projectsData} internship={internshipData} onProjectClick={setSelectedProject} isModalOpen={!!selectedProject} language={language} setLanguage={setLanguage} translations={translations[language]} activeTab={activeTab} />

      {/* 4. Modale de projet */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} language={language} translations={translations[language]} />
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
const Dashboard = ({ projects, internship, onProjectClick, isModalOpen, language, setLanguage, translations, activeTab }) => {
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

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
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-4">Ly Minh-Quan</h1>
              <p className="text-lg md:text-xl lg:text-2xl text-neutral-300"></p>
            </div>
          </section>
          )}

          {/* Section Projets */}
          {activeTab === 'projets' && (
          <section id="projets" className="w-full h-full overflow-y-auto p-4 md:p-8 text-white pt-20 md:pt-5">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{translations.sections.projects.title}</h2>
            <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-4 md:p-6 mb-6 md:mb-8 max-w-3xl backdrop-blur-sm">
              <p className="text-sm md:text-base text-neutral-300">{translations.sections.projects.desc}</p>
            </div>
            {/* Grille de projets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pb-10">
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
                  <img src={project.images[0]} alt={project.title[language]} className="w-full h-40 object-cover" />
                  <h3 className="text-xl font-bold p-4">{project.title[language]}</h3>
                </motion.div>
              ))}
            </div>
          </section>
          )}

          {/* Section Stage */}
          {activeTab === 'stage' && (
          <section id="stage" className="w-full h-full overflow-y-auto p-4 md:p-8 text-white pt-20 md:pt-5">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{translations.sections.internship.title}</h2>
            <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-4 md:p-6 mb-6 md:mb-8 max-w-3xl backdrop-blur-sm">
              <p className="text-sm md:text-base text-neutral-300">{translations.sections.internship.desc}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 pb-10">
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
                  <img src={stage.images[0]} alt={stage.title[language]} className="w-full h-40 object-cover" />
                  <h3 className="text-xl font-bold p-4">{stage.title[language]}</h3>
                </motion.div>
              ))}
            </div>
          </section>
          )}

          {/* Section Compétences */}
          {activeTab === 'competences' && (
          <section id="competences" className="w-full h-full overflow-y-auto p-4 md:p-8 text-white pt-20 md:pt-5">
            <h2 className="text-2xl md:text-3xl font-bold">{translations.sections.skills.title}</h2>
            <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-4 md:p-6 mt-4 max-w-3xl backdrop-blur-sm">
              <p className="text-sm md:text-base text-neutral-300">{translations.sections.skills.desc}</p>
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
const ProjectModal = ({ project, onClose, language, translations }) => {
  const modalRef = useRef(null);
  useOutsideClick(modalRef, onClose);

  const [[page, direction], setPage] = useState([0, 0]);
  const [isHovering, setIsHovering] = useState(false);

  // Détection du mode "Story" (pour le stage) si des descriptions multiples existent
  const isStoryMode = project.descriptions && typeof project.descriptions === 'object' && !Array.isArray(project.descriptions) && Array.isArray(project.descriptions[language]);

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
  const currentDescription = isStoryMode ? project.descriptions[language][imageIndex] : project.description[language];
  const currentSkills = isStoryMode ? (project.skillsList[imageIndex] || []) : project.skills;

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
                  alt={`${project.title[language]} - Image ${imageIndex + 1}`}
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
            <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4 pr-8">{project.title[language]}</h2>
            
            {/* Texte */}
            <div className="mb-4 md:mb-6">
              <p className="text-sm md:text-base text-neutral-300 whitespace-pre-wrap">{currentDescription}</p>
            </div>

            {/* Pins de compétences */}
            <div>
              <h3 className="text-lg font-semibold mb-3">{translations.modal.skills}</h3>
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
              {translations.modal.tooltip}
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

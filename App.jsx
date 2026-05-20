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
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
  IconHeart,
  IconChefHat,
  IconChess,
  IconBarbell,
  IconActivity,
  IconAddressBook,
  IconPlayerPlay,
  IconZoomIn,
} from "@tabler/icons-react";
import { useOutsideClick } from './components/use-outside-click';

// 1. Importez vos images locales ici
// Créez un dossier `src/assets/images` et placez-y vos images.
import SmartLight from './assets/images/SmartLight.jpg';
import SmatLightInfographie from './assets/images/SmatLightInfographie.jpg';


import CarteDomotique from './assets/images/CarteDomotique.png';
import DomotiqueWeb from './assets/images/DomotiqueWeb.png';

import RobotGies1 from './assets/images/RobotGies1.png';
import RobotGies2 from './assets/images/RobotGies2.png';
import RobotGies3Cote from './assets/images/RobotGies3Cote.jpg';
import RobotGies4_ESP from './assets/images/RobotGies4_ESP.jpg';
import AffichageVS from './assets/images/AffichageVS.png';

import CarteBasseConso3D from './assets/images/CarteBasseConso3D.png';
import SchématiqueBasseConso from './assets/images/SchématiqueBasseConso.png';
import PCBBasseConso from './assets/images/PCBBasseConso.png';
import InfographieBasConso from './assets/images/InfographieBasConso.png';


import VérifierMaintenance1 from './assets/images/VérifierMaintenance1.jpg';
import VérifierMaintenance2 from './assets/images/VérifierMaintenance2.jpg';



import LR_logical from './assets/images/LR_logical.png';
import Stage_PCB_Kicad from './assets/images/Stage_PCB_Kicad.png';
import StageEpreuve from './assets/images/StageEpreuve.jpg';
import LIS from './assets/images/LIS.png';


import EmissionReception1 from './assets/images/EmissionReception1.jpg';
import EmissionReception2 from './assets/images/EmissionReception2.jpg';
import EmissionReceptionBrea3 from './assets/images/EmissionReceptionBread3.jpg';

import Alim_USB_PPS from './assets/images/Alim_USB_PPS.jpg';
import Arlo_Resultat_Oscillo from './assets/images/Arlo_Resultat_Oscillo.jpg';
import SAE_Arlo_VOUT_PPS from './assets/images/SAE_Arlo_VOUT_PPS.png';
import Arlo_scope_2 from './assets/images/Arlo_scope_2.png';

import Optiplant0 from './assets/images/Optiplant0.jpg';
import Optiplant1 from './assets/images/Optiplant1.png';
import Optiplant2 from './assets/images/Optiplant2.png';
import Optiplant3 from './assets/images/Optiplant3.png';
import Optiplant4 from './assets/images/Optiplant4.png';

import RobotObst1 from './assets/images/RobotObst1.jpg';
import ConcoursRobotS1 from './assets/images/ConcoursRobotS1.mp4';

/*
import  from './assets/images/.jpg';
import  from './assets/images/.jpg';
*/



import photo_profil from './assets/images/photo_profil.png'; // 1. Importez votre photo de profil ici (corrigez le nom du fichier si besoin)

function App() {
  const [language, setLanguage] = useState('fr');
  const validTabs = ['accueil', 'experiences', 'competences', 'interets', 'contacts'];
  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window === 'undefined') return 'accueil';
    const hash = window.location.hash.replace('#', '');
    return validTabs.includes(hash) ? hash : 'accueil';
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      setActiveTab(validTabs.includes(hash) ? hash : 'accueil');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const translationsAll = {
    fr: {
      sidebar: { home: "Accueil", experiences: "Mes Expériences", skills: "Compétences", interests: "Centres d'intérêts", contact: "Contacts" },
      sections: {
        experiences: { title: "Mes Expériences", desc: "Voici une sélection de mes projets académiques, personnels et de mes stages. Ils illustrent mes compétences techniques et ma capacité à mener à bien des réalisations concrètes, du développement logiciel à l'électronique embarquée." },
        skills: { title: "Compétences", desc: "Ici vous trouverez les compétences techniques et humaines que j'ai développées au cours de mes études et de mes projets. Elles couvrent le développement, l'électronique et la gestion de projet." },
        interests: { title: "Centres d'intérêts", desc: "Au-delà de la technique, je cultive des passions qui nourrissent ma curiosité et mon équilibre personnel." },
        contact: { title: "Contacts", desc: "N'hésitez pas à me contacter pour toute opportunité professionnelle ou question sur mon parcours. Je suis joignable par email ou via LinkedIn.", linkedinTooltip: "En cliquant ici, vous allez être redirigé vers LinkedIn", githubTooltip: "En cliquant ici, vous allez être redirigé vers mon profil GitHub." }
      },
      modal: {
        skills: "Compétences utilisées",
        tooltip: "Pour plus de précision sur le projet, vous pouvez consulter le rapport ou compte rendu téléchargeable ici.",
        projectFeedback: "Ressenti du projet",
        difficulties: "Difficultés rencontrées",
        takeaways: "Apports et satisfactions",
        extensions: "Prolongements possibles",
        yearTime: "Année et Temps",
        year: "Année de réalisation",
        duration: "Temps de conception"
      },
      skillModal: {
        levelDetails: "Détails du niveau",
        mastery: "Maîtrise",
        whyLevel: "Pourquoi ce niveau ?",
        associatedProjects: "Projets associés au niveau {level}",
        noAssociatedProjects: "Aucun projet spécifique associé à ce niveau.",
        skillAssociatedProjects: "Projets associés",
        noSkillProjects: "Aucun projet listé pour cette compétence.",
        seeDetails: "Voir les détails et projets associés"
      },
      ui: {
        portfolio: "Portfolio",
        studentTitle: "Étudiant en Génie Électrique et Informatique Industrielle (GEII)",
        intro: "Passionné par la robotique depuis mon très jeune âge, je suis actuellement étudiant en BUT GEII spécialisé en Electroniques et Systèmes Embarqués (ESE), où je développe mes compétences en électronique, informatique et automatique. Curieux et rigoureux, je suis constamment à la recherche de nouveaux défis pour transformer des idées innovantes en solutions concrètes.",
        discoverProjects: "Découvrir mes projets",
        viewCV: "Voir mon CV",
        openCVTitle: "Ouvrir le CV dans un nouvel onglet",
        myInternships: "Mes Stages",
        myProjects: "Mes Projets",
        geiiHeading: "Compétences du Référentiel GEII",
        technicalSkills: "Compétences Techniques",
        transversalSkills: "Compétences Transversales",
        changeLanguage: "Changer de langue",
        projectsAssociated: (n) => `${n} projet${n>1 ? "s" : ""} associé${n>1 ? "s" : ""}`,
        download: "Télécharger"
      }
    },
    en: {
      sidebar: { home: "Home", experiences: "My Experiences", skills: "Skills", interests: "Interests", contact: "Contact" },
      sections: {
        experiences: { title: "My Experiences", desc: "A selection of my academic, personal projects and internships. They showcase my technical skills and ability to deliver concrete results, from software development to embedded electronics." },
        skills: { title: "Skills", desc: "Here you can find the technical and soft skills I developed during my studies and projects. They cover development, electronics, and project management." },
        interests: { title: "Interests", desc: "Beyond technical work, I pursue passions that nurture my curiosity and personal balance." },
        contact: { title: "Contact", desc: "Feel free to contact me for professional opportunities or questions about my background. I'm reachable by email or via LinkedIn.", linkedinTooltip: "Clicking here will open LinkedIn", githubTooltip: "Clicking here will open my GitHub profile." }
      },
      modal: {
        skills: "Used skills",
        tooltip: "For more details about the project, you can consult the downloadable report here.",
        projectFeedback: "Project feedback",
        difficulties: "Difficulties encountered",
        takeaways: "Learnings and outcomes",
        extensions: "Possible extensions",
        yearTime: "Year and Time",
        year: "Year of realization",
        duration: "Design time"
      },
      skillModal: {
        levelDetails: "Level details",
        mastery: "Mastery",
        whyLevel: "Why this level?",
        associatedProjects: "Projects associated with level {level}",
        noAssociatedProjects: "No specific projects associated with this level.",
        skillAssociatedProjects: "Associated Projects",
        noSkillProjects: "No projects listed for this skill.",
        seeDetails: "See details and associated projects"
      },
      ui: {
        portfolio: "Portfolio",
        studentTitle: "Student in Electrical Engineering and Industrial Computing (GEII)",
        intro: "Passionate about robotics since my childhood, I am currently a student in BUT GEII specialized in Electronics and Embedded Systems (ESE), where I develop skills in electronics, computing and control systems. Curious and rigorous, I constantly seek new challenges to turn innovative ideas into concrete solutions.",
        discoverProjects: "Discover my projects",
        viewCV: "View my CV",
        openCVTitle: "Open CV in a new tab",
        myInternships: "My Internships",
        myProjects: "My Projects",
        geiiHeading: "GEII Reference Skills",
        technicalSkills: "Technical Skills",
        transversalSkills: "Cross-cutting Skills",
        changeLanguage: "Change language",
        projectsAssociated: (n) => `${n} project${n>1 ? "s" : ""} associated`,
        download: "Download"
      }
    },
    vi: {
      sidebar: { home: "Trang chủ", experiences: "Kinh nghiệm", skills: "Kỹ năng", interests: "Sở thích", contact: "Liên hệ" },
      sections: {
        experiences: { title: "Kinh nghiệm của tôi", desc: "Một số dự án học thuật, cá nhân và thực tập của tôi. Chúng minh họa kỹ năng kỹ thuật của tôi và khả năng thực hiện các sản phẩm thực tế, từ phát triển phần mềm đến điện tử nhúng." },
        skills: { title: "Kỹ năng", desc: "Tại đây bạn có thể tìm thấy các kỹ năng kỹ thuật và mềm mà tôi đã phát triển trong quá trình học và thực hành. Chúng bao gồm phát triển, điện tử và quản lý dự án." },
        interests: { title: "Sở thích", desc: "Ngoài công việc kỹ thuật, tôi có những sở thích nuôi dưỡng sự tò mò và cân bằng cá nhân." },
        contact: { title: "Liên hệ", desc: "Hãy liên hệ với tôi cho các cơ hội nghề nghiệp hoặc câu hỏi về quá trình của tôi. Tôi có thể liên lạc qua email hoặc LinkedIn.", linkedinTooltip: "Nhấn vào đây để mở LinkedIn", githubTooltip: "Nhấn vào đây để mở hồ sơ GitHub của tôi." }
      },
      modal: {
        skills: "Kỹ năng sử dụng",
        tooltip: "Để biết chi tiết về dự án, bạn có thể xem báo cáo tải xuống ở đây.",
        projectFeedback: "Phản hồi dự án",
        difficulties: "Khó khăn gặp phải",
        takeaways: "Bài học và kết quả",
        extensions: "Mở rộng có thể thực hiện",
        yearTime: "Năm và Thời gian",
        year: "Năm thực hiện",
        duration: "Thời gian thiết kế"
      },
      skillModal: {
        levelDetails: "Chi tiết cấp độ",
        mastery: "Mức độ thành thạo",
        whyLevel: "Tại sao ở cấp độ này?",
        associatedProjects: "Dự án liên quan đến cấp độ {level}",
        noAssociatedProjects: "Không có dự án cụ thể nào liên quan đến cấp độ này.",
        skillAssociatedProjects: "Các dự án liên quan",
        noSkillProjects: "Không có dự án nào được liệt kê cho kỹ năng này.",
        seeDetails: "Xem chi tiết và các dự án liên quan"
      },
      ui: {
        portfolio: "Portfolio",
        studentTitle: "Sinh viên Kỹ thuật Điện và Tin học Công nghiệp (GEII)",
        intro: "Đam mê robot từ nhỏ, hiện tôi là sinh viên BUT GEII chuyên ngành Điện tử và Hệ thống nhúng (ESE), phát triển kỹ năng về điện tử, lập trình và điều khiển. Tò mò và kỷ luật, tôi luôn tìm kiếm thử thách mới để biến ý tưởng thành giải pháp thực tế.",
        discoverProjects: "Khám phá dự án của tôi",
        viewCV: "Xem CV",
        openCVTitle: "Mở CV trong tab mới",
        myInternships: "Thực tập của tôi",
        myProjects: "Các dự án của tôi",
        geiiHeading: "Kỹ năng tham chiếu GEII",
        technicalSkills: "Kỹ năng kỹ thuật",
        transversalSkills: "Kỹ năng mềm",
        changeLanguage: "Thay đổi ngôn ngữ",
        projectsAssociated: (n) => `${n} dự án liên quan`,
        download: "Tải xuống"
      }
    }
  };
  const translations = translationsAll[language] || translationsAll.fr;

  const links = [
    {
      label: translations.sidebar.home,
      href: "#accueil",
      icon: (
        <IconHome className="text-white h-12 w-12 flex-shrink-0" />
      ),
    },
    {
      label: translations.sidebar.experiences,
      href: "#experiences",
      icon: (
        <IconBrandTabler className="text-white h-12 w-12 flex-shrink-0" />
      ),
    },
    {
      label: translations.sidebar.skills,
      href: "#competences",
      icon: (
        <IconSettings className="text-white h-12 w-12 flex-shrink-0" />
      ),
    },
    {
      label: translations.sidebar.interests,
      href: "#interets",
      icon: (
        <IconHeart className="text-white h-12 w-12 flex-shrink-0" />
      ),
    },
    {
      label: translations.sidebar.contact,
      href: "#contacts",
      icon: (
        <IconAddressBook className="text-white h-12 w-12 flex-shrink-0" />
      ),
    },
  ];

  // Données pour les projets (à remplir avec vos vraies données)
  const projectsData = [
    {
      id: 1,
      title: "Projet SmartLight",
      year: "2023",
      duration: "70 heures",
      images: [
        SmartLight,
        SmatLightInfographie
      ], 
      description: "Le projet SmartLight consiste à créer une lampe intelligente et polyvalente pilotée par une carte Arduino. Le système permet de régler l'ambiance lumineuse de plusieurs façons : on peut faire varier l'intensité d'une lampe principale, changer les couleurs d'une LED RGB ou utiliser des petites LEDs de signalisation. Pour interagir avec la lampe, l'utilisateur dispose de deux boutons-poussoirs physiques et d'une télécommande infrarouge pour un contrôle à distance. La lampe est également autonome grâce à différents capteurs qui mesurent la lumière ambiante pour adapter l'éclairage automatiquement. Enfin, l'ensemble du programme est conçu pour gérer toutes ces fonctions en même temps, assurant une réponse fluide aux commandes tout en surveillant la luminosité de la pièce.",
      skills: ["Arduino IDE", "C/C++", "Datasheets", "Electronique", "Rédaction de rapports", "Microsoft Office", "Rapports & CR", "Tests & Vérif.", "Analyse", "Autonomie", "Communication"],
      //pdf: "/path/to/rapport_projet1.pdf",
      feedback: {
        difficulties: "",
        takeaways: "",
        extensions: ""
      }
      ,
      translations: {
        en: {
          title: "SmartLight Project",
          description: "The SmartLight project creates an intelligent, versatile lamp controlled by an Arduino board. The system allows adjusting the lighting atmosphere in several ways: varying the main lamp intensity, changing RGB LED colors, or using small indicator LEDs. The user interacts via two physical push-buttons and an infrared remote for remote control. The lamp is also autonomous thanks to sensors measuring ambient light to adapt illumination automatically. The program is designed to manage all these functions concurrently, ensuring smooth responses while monitoring room brightness.",
        },
        vi: {
          title: "Dự án SmartLight",
          description: "Dự án SmartLight tạo ra một đèn thông minh, linh hoạt điều khiển bằng Arduino. Hệ thống cho phép điều chỉnh ánh sáng theo nhiều cách: thay đổi cường độ đèn chính, đổi màu LED RGB, hoặc dùng LED báo hiệu. Người dùng tương tác bằng hai nút nhấn và điều khiển từ xa hồng ngoại. Đèn cũng hoạt động tự động nhờ cảm biến đo ánh sáng môi trường để điều chỉnh ánh sáng. Chương trình quản lý đồng thời các chức năng để phản hồi mượt mà đồng thời giám sát độ sáng phòng."
        }
      }
    },
    {
      id: 2,
      title: "Projet de conception d'un assistant domotique",
      year: "2024",
      duration: "40 heures",
      images: [
        CarteDomotique, 
        DomotiqueWeb,
      ],
      description: [
        {
          title: "Description Globale du projet",
          text: "Ce projet consiste en la conception d'un assistant domotique pour l'habitat, articulé autour d'un microcontrôleur ESP32-C6 qui centralise les données de divers capteurs (température, pression, luminosité, qualité de l'air et lecteur RFID). L'appareil dispose d'une interface utilisateur double : un écran tactile TFT local pour l'affichage en temps réel et le contrôle direct, ainsi qu'une page web hébergée localement permettant de surveiller et de piloter à distance des équipements via un relais. L'ensemble du système est programmé avec l'IDE Arduino et utilise des technologies web standards (HTML, JavaScript, CSS)."
        },
        {
          title: "Détails Techniques",
          text: "Le système est articulé autour d'un microcontrôleur ESP32-C6 (Wi-Fi 6 / Matter). Il intègre des capteurs de température, pression, luminosité, qualité de l'air et un lecteur RFID pour le contrôle d'accès. L'interface locale utilise un écran tactile TFT, tandis que le pilotage s'effectue via un serveur web asynchrone codé en HTML, CSS et JavaScript."
        }
      ],
      skills: ["Arduino IDE", "C/C++", "Electronique", "LaTeX / Overleaf", "Rapports & CR", "Tests & Vérif.", "Datasheets", "Autonomie", "Analyse"],
      pdf: "/assets/pdf/Rapport_Domotique.pdf",
      feedback: {
        difficulties: "Difficulté à faire fonctionner les différents modules ensemble (surtout l'écran TFT et le lecteur RFID). Il y avait aussi l'autonomie qu'il fallait gérer ",
        takeaways: "C'est l'un des premiers projets où j'ai réussi à intégrer plusieurs capteurs/modules et interfaces dans un même système fonctionnel, ce qui m'a beaucoup appris sur la gestion de projets et à gérer mon autonomie.",
        extensions: "Ce petit projet isolé pourrait être intégré dans un projet plus global de maison connectée, en ajoutant par exemple des fonctionnalités de contrôle vocal ou d'intégration avec des assistants virtuels comme Alexa ou Google Home avec un site web qui centralise le tout."
      },
      translations: {
        en: {
          title: "Design of a Home Automation Assistant",
          description: [
            {
              title: "Overall Project Description",
              text: "This project consists of designing a home automation assistant for housing, built around an ESP32-C6 microcontroller that centralizes data from various sensors (temperature, pressure, light, air quality, and RFID reader). The device has a dual user interface: a local TFT touchscreen for real-time display and direct control, and a locally hosted web page to monitor and control devices remotely via a relay. The system is programmed using the Arduino IDE and uses standard web technologies (HTML, JavaScript, CSS)."
            },
            {
              title: "Technical Details",
              text: "The system is organized around an ESP32-C6 microcontroller (Wi-Fi 6 / Matter). It includes sensors for temperature, pressure, light, air quality, and an RFID reader for access control. The local interface uses a TFT touchscreen, while operation is handled by an asynchronous web server coded in HTML, CSS and JavaScript."
            }
          ],
          difficulties: "Difficulty making the different modules work together (especially the TFT screen and the RFID reader). Power autonomy also had to be managed.",
          takeaways: "This is one of the first projects where I successfully integrated several sensors/modules and interfaces into a single functional system, which taught me a lot about project management and autonomy.",
          extensions: "This small standalone project could be integrated into a larger connected home project, for example by adding voice control features or integration with virtual assistants like Alexa or Google Home along with a centralized website."
        },
        vi: {
          title: "Thiết kế trợ lý tự động hóa nhà",
          description: [
            {
              title: "Mô tả chung về dự án",
              text: "Dự án này thiết kế một trợ lý nhà thông minh cho gia đình, dựa trên vi điều khiển ESP32-C6 tổng hợp dữ liệu từ các cảm biến khác nhau (nhiệt độ, áp suất, ánh sáng, chất lượng không khí và đầu đọc RFID). Thiết bị có giao diện người dùng kép: màn hình cảm ứng TFT cục bộ để hiển thị thời gian thực và điều khiển trực tiếp, cùng một trang web lưu trữ cục bộ để giám sát và điều khiển thiết bị từ xa qua relay. Hệ thống được lập trình bằng Arduino IDE và sử dụng các công nghệ web tiêu chuẩn (HTML, JavaScript, CSS)."
            },
            {
              title: "Chi tiết kỹ thuật",
              text: "Hệ thống được xây dựng xung quanh vi điều khiển ESP32-C6 (Wi-Fi 6 / Matter). Nó bao gồm các cảm biến nhiệt độ, áp suất, ánh sáng, chất lượng không khí và đầu đọc RFID cho điều khiển truy cập. Giao diện cục bộ dùng màn hình cảm ứng TFT, trong khi điều khiển thực hiện bằng một máy chủ web bất đồng bộ viết bằng HTML, CSS và JavaScript."
            }
          ],
          difficulties: "Khó khăn khi làm cho các module khác nhau hoạt động cùng nhau (đặc biệt là màn hình TFT và đầu đọc RFID). Vấn đề năng lượng cũng cần được quản lý.",
          takeaways: "Đây là một trong những dự án đầu tiên mà tôi tích hợp thành công nhiều cảm biến/module và giao diện vào một hệ thống hoạt động, điều đó dạy tôi nhiều về quản lý dự án và tính tự chủ.",
          extensions: "Dự án nhỏ này có thể tích hợp vào một dự án nhà kết nối lớn hơn, ví dụ bằng cách thêm tính năng điều khiển giọng nói hoặc tích hợp với trợ lý ảo như Alexa hoặc Google Home cùng một trang web tập trung."
        }
      }
    },
    {
      id: 3,
      title: "Conception d'un robot mobile autonome",
      year: "2026-2024",
      duration: "+130 heures",
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
      skills: ["C/C++", "Electronique", "LaTeX / Overleaf", "Rapports & CR", "Tests & Vérif.", "Datasheets", "Python", "Autonomie", "Matlab", "Travail d'équipe", "Analyse", "Communication"],
      pdf: "/assets/pdf/ProjetRobotGiesRapport.pdf",
      feedback: {
        difficulties: "La gestion de la communication UART avec un protocole fiable (checksum) a été un défi technique intéressant à relever.",
        takeaways: "Le développement de l'interface en C# et l'intégration du contrôle par manette PS4 ont été les parties les plus gratifiantes, car elles ont rendu le robot interactif et plus facile à piloter.",
        extensions: "Implémentation d'un algorithme de cartographie (SLAM) pour permettre au robot de se repérer dans son environnement."
      },
      translations: {
        en: {
          title: "Design of an Autonomous Mobile Robot",
          description: [
            {
              period: "2024-2025",
              title: "Hardware Design and Autonomy",
              text: "This project focuses on developing an autonomous mobile robot based on a dsPIC33EP512MU814 microcontroller programmed via the MPLAB environment. The robot uses five infrared range sensors connected to ADC inputs to convert distances into usable digital data. Propulsion is provided by PWM-driven motors, including acceleration ramps to avoid abrupt speed changes. Obstacle avoidance relies on a numerical method processing 32 sensor combinations (2^5) to decide precise actions like turning or reversing depending on obstacle proximity."
            },
            {
              period: "2025-2026",
              title: "Interface and Manual Control",
              text: "A C# (WPF) graphical interface allows visualizing the robot's data such as speed and sensor distance while transmitting commands. Communication between the PC and the robot takes place via UART serial link at 115,200 baud, secured by a protocol including a checksum to verify message integrity. For more intuitive control, an ESP32 module was added to connect a PS4 controller via Bluetooth. This system allows manual operation with triggers controlling proportional acceleration and the joystick steering."
            }
          ],
          difficulties: "Managing UART communication with a reliable checksum protocol was an interesting technical challenge.",
          takeaways: "Developing the C# interface and integrating PS4 controller support were the most rewarding parts, making the robot interactive and easier to control.",
          extensions: "Implementing a mapping algorithm (SLAM) would allow the robot to localize itself in its environment."
        },
        vi: {
          title: "Thiết kế Robot Di động Tự hành",
          description: [
            {
              period: "2024-2025",
              title: "Thiết kế Phần cứng và Tự chủ",
              text: "Dự án này tập trung vào việc phát triển một robot di động tự hành dựa trên vi điều khiển dsPIC33EP512MU814 lập trình qua môi trường MPLAB. Robot sử dụng năm cảm biến khoảng cách hồng ngoại nối với đầu vào ADC để chuyển đổi khoảng cách thành dữ liệu số dùng được. Động lực được cung cấp bởi động cơ điều khiển PWM, bao gồm các ramp gia tốc để tránh thay đổi tốc độ đột ngột. Tránh chướng ngại vật dựa trên phương pháp số xử lý 32 tổ hợp cảm biến (2^5) để quyết định hành động chính xác như quay hoặc lùi tùy theo độ gần chướng ngại vật."
            },
            {
              period: "2025-2026",
              title: "Giao diện và Điều khiển Thủ công",
              text: "Giao diện đồ họa C# (WPF) cho phép trực quan hóa dữ liệu robot như tốc độ và khoảng cách cảm biến trong khi truyền lệnh. Giao tiếp giữa PC và robot diễn ra qua kết nối UART ở 115.200 baud, được bảo mật bằng giao thức có checksum để kiểm tra tính toàn vẹn của thông điệp. Để điều khiển trực quan hơn, một module ESP32 được thêm vào để kết nối bộ điều khiển PS4 qua Bluetooth. Hệ thống này cho phép điều khiển thủ công với nút kích hoạt điều khiển gia tốc tỷ lệ và joystick điều khiển hướng."
            }
          ],
          difficulties: "Quản lý giao tiếp UART với giao thức checksum đáng tin cậy là một thách thức kỹ thuật thú vị.",
          takeaways: "Phát triển giao diện C# và tích hợp điều khiển bộ điều khiển PS4 là phần thưởng nhất, giúp robot tương tác và dễ điều khiển hơn.",
          extensions: "Việc triển khai thuật toán lập bản đồ (SLAM) sẽ cho phép robot định vị trong môi trường của nó."
        }
      }
    },
    {
      id: 4,
      title: "Conception d'une carte à transmission radio à basse consommation",
      year: "2025",
      duration: "+90 heures",
      images: [
        CarteBasseConso3D,
        SchématiqueBasseConso,
        PCBBasseConso,
        InfographieBasConso,
      ],
      description: [
        {
          title: "Description Globale du projet",
          text: "L'objectif central de ce projet est la conception d'un module d'envoi de données par radio à très faible consommation. Le système est conçu pour être alimenté par des piles de type AA avec une contrainte d'autonomie majeure : fonctionner de manière autonome pendant deux ans.\n\nLa démarche a suivi un cycle de développement complet, allant de la définition d'une architecture théorique et du choix de composants spécifiques, jusqu'à la réalisation d'une carte électronique (PCB) dédiée. Le projet a abouti à un prototype fonctionnel et industriellement viable, validant l'utilisation de modes de veille profonde pour atteindre les objectifs énergétiques fixés."
        },
        {
          title: "Détails Techniques",
          text: "L'architecture matérielle repose sur le microcontrôleur STM32G031K8T6, choisi pour son mode « Shutdown » performant qui permet de réduire la consommation à environ 350 nA à température ambiante. Pour assurer cette sobriété, le système intègre un régulateur LDO XC6223H331MRG possédant un courant de repos quasi nul de 0,01 µA, ainsi qu'un Load Switch AP22913W67. Ce dernier joue un rôle crucial en isolant physiquement le pont diviseur de tension lorsqu'il n'est pas utilisé, éliminant ainsi toute fuite de courant inutile vers la mesure de la batterie. L'ensemble de la carte a été conçu sous KiCad, avec un soin particulier apporté au placement du quartz de 32,768 kHz et des condensateurs de découplage au plus près du microcontrôleur pour minimiser les parasites.\n\nLa transmission des données est assurée par un module LoRa RA-02 communiquant via un bus SPI, tandis qu'un module HC-12 agissant comme un pont UART transparent a également été étudié pour sa simplicité d'intégration. Deux scénarios d'utilisation valident l'autonomie de deux ans : le premier prévoit un envoi toutes les 5 minutes à une puissance de +14 dBm pour une portée locale, tandis que le second autorise une portée allant jusqu'à 10 km avec un envoi toutes les 35 minutes à +17 dBm. Dans les deux cas, le courant moyen consommé reste inférieur au seuil critique (environ 0,14 mA), confirmant que la gestion logicielle des modes de veille et le choix des composants passifs, comme les résistances du pont diviseur calibrées à 12 kΩ et 4,2 kΩ, sont parfaitement adaptés aux enjeux du projet."
        }
      ],
      skills: ["Kicad", "JavaScript", "LaTeX / Overleaf", "Rapports & CR", "Tests & Vérif.", "Datasheets", "Autonomie", "Travail d'équipe", "Analyse", "Communication"],
      pdf: "/asset/pdf/Extrait_Rapport_SAE_Capteur_Basse_Conso.pdf",
      feedback: {
        difficulties: "L'optimisation de la consommation d'énergie pour atteindre les objectifs de basse consommation a nécessité de nombreuses itérations et tests. De plus, il y eut quelques difficultés à trouver des composants qui respectent les contraintes du cahier des charges (soit des composants qui consome le moins possible) s'ajoute à cela la difficulté de la communication radio dans la bonne fréquence.",
        takeaways: "J'ai beaucoup appris sur les techniques de conception de circuits à faible consommation et sur les protocoles de communication radio. La phase de routage du PCB a été particulièrement instructive.",
        extensions: "Développement d'un réseau maillé pour étendre la portée de la communication ou encore trouver des composants qui consomment encore moins d'énergie pour faire durée plus longtemps la carte. Et une application est de pouvoir ce servir de la carte pour contrôler un robot mobile autonome, par exemple, grâce à l'envoie de données que la carte peut faire, on pourrait faire en sorte que le robot puisse recevoir des ordres à distance pour se déplacer ou faire des actions spécifiques."
      },
      translations: {
        en: {
          title: "Design of a Low-Power Radio Transmission Board",
          description: [
            {
              title: "Overall Project Description",
              text: "The central goal of this project was to design a very low-power radio data transmission module. The system is designed to be powered by AA batteries with a major autonomy requirement: operate independently for two years. The development cycle covered theoretic architecture, component selection, and the production of a dedicated PCB. The project produced a functional, industrially viable prototype, validating the use of deep sleep modes to meet energy objectives."
            },
            {
              title: "Technical Details",
              text: "The hardware architecture is based on the STM32G031K8T6 microcontroller, chosen for its high-performance Shutdown mode that reduces consumption to about 350 nA at room temperature. To achieve this efficiency, the system includes an LDO regulator XC6223H331MRG with near-zero quiescent current of 0.01 µA and an AP22913W67 load switch. The switch isolates the voltage divider when unused, eliminating wasteful leakage currents to the battery measurement. The board was designed in KiCad with careful quartz and decoupling capacitor placement close to the microcontroller to minimize interference. Data transmission uses a LoRa RA-02 module over SPI, and an HC-12 transparent UART bridge was also studied for its integration simplicity. Two use cases validate the two-year autonomy: one sending every 5 minutes at +14 dBm for local range, the other every 35 minutes at +17 dBm for up to 10 km. In both cases, average current stays below the critical threshold (~0.14 mA), confirming that sleep mode management and passive component choices are well suited to the project goals."
            }
          ],
          difficulties: "Optimizing power consumption to meet low-power targets required many iterations and tests. It was also difficult to find components that met the strict energy budget and to manage radio communication at the correct frequency.",
          takeaways: "I learned a lot about low-power circuit design and radio communication protocols. The PCB routing phase was especially instructive.",
          extensions: "A mesh network could extend communication range and component selection could be further optimized for even lower energy consumption. One application could be using the board to control an autonomous mobile robot remotely via data transmission."
        },
        vi: {
          title: "Thiết kế bo truyền radio tiêu thụ thấp",
          description: [
            {
              title: "Mô tả dự án tổng quan",
              text: "Mục tiêu chính của dự án này là thiết kế một module truyền dữ liệu radio tiêu thụ rất thấp. Hệ thống được thiết kế để sử dụng pin AA với yêu cầu quan trọng: hoạt động độc lập trong hai năm. Chu trình phát triển bao gồm kiến trúc lý thuyết, chọn linh kiện và sản xuất PCB chuyên dụng. Dự án tạo ra một nguyên mẫu chức năng và khả thi về mặt công nghiệp, xác nhận việc sử dụng chế độ ngủ sâu để đạt được mục tiêu năng lượng."
            },
            {
              title: "Chi tiết kỹ thuật",
              text: "Kiến trúc phần cứng dựa trên vi điều khiển STM32G031K8T6, được chọn vì chế độ Shutdown hiệu quả cho phép giảm tiêu thụ xuống khoảng 350 nA ở nhiệt độ phòng. Để đạt được độ hiệu quả này, hệ thống tích hợp bộ điều chỉnh LDO XC6223H331MRG với dòng nghỉ gần bằng 0,01 µA và công tắc tải AP22913W67. Công tắc cách ly cầu chia điện áp khi không sử dụng, loại bỏ dòng rò lãng phí đến phép đo pin. Bo mạch được thiết kế bằng KiCad với việc đặt thạch anh và tụ lọc gần vi điều khiển để giảm nhiễu. Truyền dữ liệu sử dụng module LoRa RA-02 qua SPI, và một giải pháp cầu UART HC-12 cũng được khảo sát vì tính đơn giản trong tích hợp. Hai kịch bản sử dụng xác nhận độ tự chủ hai năm: một gửi mỗi 5 phút ở +14 dBm cho phạm vi cục bộ, một gửi mỗi 35 phút ở +17 dBm cho khoảng cách tới 10 km. Trong cả hai trường hợp, dòng trung bình dưới ngưỡng quan trọng (~0,14 mA), xác nhận quản lý chế độ ngủ và lựa chọn linh kiện thụ động phù hợp với mục tiêu dự án."
            }
          ],
          difficulties: "Tối ưu hóa tiêu thụ năng lượng để đạt mục tiêu tiêu thụ thấp đòi hỏi nhiều lần lặp và thử nghiệm. Cũng khó tìm linh kiện đáp ứng ngân sách năng lượng nghiêm ngặt và quản lý giao tiếp radio ở tần số chính xác.",
          takeaways: "Tôi đã học được nhiều về thiết kế mạch tiêu thụ thấp và giao thức truyền thông radio. Giai đoạn đi dây PCB đặc biệt hữu ích.",
          extensions: "Một mạng lưới mesh có thể mở rộng phạm vi truyền thông và lựa chọn linh kiện có thể được tối ưu thêm để tiêu thụ điện năng thấp hơn nữa. Một ứng dụng có thể là sử dụng bo mạch để điều khiển robot di động tự hành từ xa qua truyền dữ liệu."
        }
      }
    },
    {
      id: 5,
      title: "Projet de maintenance et vérification d'un système de domotique",
      year: "2023",
      duration: "30 heures",
      images: [
        VérifierMaintenance1,
        VérifierMaintenance2,
      ],
      description: "Ce projet consiste en une analyse approfondie d'une maquette technique industrielle afin d'en maîtriser parfaitement le fonctionnement. J'ai commencé par identifier et étudier chaque composant du système, notamment l'unité centrale de commande (automate Unitronics avec écran IHM tacticle), les modules d'alimentation rail DIN (24V et 12V), les interfaces de puissance (relais, gradateur LED CVDIM1), ainsi que les actionneurs finaux, à savoir un banc de trois lampes halogènes et des ventilateurs de refroidissement. L'objectif était de cartographier les interactions et les flux d'énergie entre ces éléments.\n\nDans un second temps, le projet a consisté à appliquer des protocoles de maintenance rigoureux pour diagnostiquer précisément l'origine de pannes potentielles. En utilisant des outils de mesure sur le bornier de raccordement et en analysant le comportement de l'interface de commande, j'ai dû mener de véritables enquêtes techniques pour isoler l'élément défaillant (par exemple, tester le fusible de protection transparent ou valider la commande d'un relais). ",
      skills: ["Microsoft Office", "Kicad", "LaTeX / Overleaf", "Rapports & CR", "Tests & Vérif.", "Datasheets", "Travail d'équipe", "Analyse", "Autonomie", "Communication"],

      feedback: {
        difficulties: "Diagnostiquer la cause racine des pannes intermittentes a été complexe et a demandé une approche méthodique.",
        takeaways: "Ce projet m'a permis de développer mes compétences en dépannage et en analyse de systèmes existants. J'ai apprécié le côté 'enquête' pour trouver la solution.",
        extensions: "Mise en place d'un système de maintenance prédictive basé sur l'analyse des données de fonctionnement."
      },
      translations: {
        en: {
          title: "Maintenance and Verification of a Home Automation System",
          description: "This project involved a deep analysis of an industrial technical model to fully master its operation. I began by identifying and studying every component of the system, including the central control unit (Unitronics PLC with touchscreen HMI), DIN rail power supply modules (24V and 12V), power interfaces (relays, CVDIM1 LED dimmer), and final actuators such as a bank of three halogen lamps and cooling fans. The goal was to map the interactions and energy flows between these elements. In the second phase, the project applied rigorous maintenance protocols to diagnose the root causes of potential failures. Using measurement tools on the connection terminal, I analyzed the control interface behavior and conducted technical investigations to isolate the faulty element (for example testing the transparent protective fuse or validating a relay command).",
          difficulties: "Diagnosing intermittent failure root causes was complex and required a methodical approach.",
          takeaways: "This project helped me develop troubleshooting skills and system analysis. I enjoyed the investigative aspect of finding the solution.",
          extensions: "Implementing a predictive maintenance system based on operating data analysis."
        },
        vi: {
          title: "Bảo trì và xác nhận hệ thống tự động hóa nhà",
          description: "Dự án này bao gồm phân tích sâu một mô hình kỹ thuật công nghiệp để nắm vững hoạt động của nó. Tôi bắt đầu bằng cách xác định và nghiên cứu từng thành phần của hệ thống, bao gồm bộ điều khiển trung tâm (PLC Unitronics với HMI màn hình cảm ứng), mô-đun nguồn rail DIN (24V và 12V), giao diện công suất (rơ le, bộ điều chỉnh độ sáng LED CVDIM1) và cơ cấu chấp hành cuối cùng như cụm ba đèn halogen và quạt làm mát. Mục tiêu là lập bản đồ tương tác và luồng năng lượng giữa các phần tử này. Trong giai đoạn thứ hai, dự án áp dụng các quy trình bảo trì nghiêm ngặt để chẩn đoán nguyên nhân gốc rễ của các hỏng hóc tiềm ẩn. Sử dụng dụng cụ đo trên đầu nối, tôi phân tích hành vi giao diện điều khiển và tiến hành điều tra kỹ thuật để cô lập phần tử bị lỗi (ví dụ kiểm tra cầu chì bảo vệ trong suốt hoặc xác minh lệnh rơ le).",
          difficulties: "Chẩn đoán nguyên nhân gốc rễ của các hỏng hóc ngắt quãng rất phức tạp và đòi hỏi phương pháp tiếp cận có hệ thống.",
          takeaways: "Dự án này giúp tôi phát triển kỹ năng khắc phục sự cố và phân tích hệ thống. Tôi thích khía cạnh điều tra của việc tìm ra giải pháp.",
          extensions: "Triển khai một hệ thống bảo trì dự đoán dựa trên phân tích dữ liệu vận hành."
        }
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
      description: [
        {
          title: "Description Globale du projet",
          text: "Ce projet a porté sur la conception et la réalisation d'un système de télécommande acoustique permettant le pilotage à distance d'un robot mobile. L'objectif principal était de générer et de traiter un signal sonore spécifique à 3 kHz pour déclencher des actions automatiques. Au sein du groupe de travail, la responsabilité de la partie émettrice m'a été confiée intégralement. Ce module d'émission a été conçu pour produire une onde stable et suffisamment puissante pour être capté par un récepteur distant, tout en respectant les contraintes de filtrage pour éviter les perturbations sonores parasites. Cette réalisation a permis de valider la mise en œuvre d'une chaîne de transmission analogique complète, du signal électronique jusqu'à sa diffusion acoustique.",
        },
        {
          title: "Partie émettrice",
          text: "J'ai réalisé la conception de la chaîne d'émission sonore. Elle débute par un générateur astable à base d'AOP qui produit un signal carré stable à 2,26 kHz. Ce signal est ensuite épuré par un filtre actif de Sallen-Key d'ordre 2 (passe-bas) pour ne conserver que la fondamentale sinusoïdale, puis amplifié en courant par un étage de puissance Push-Pull (transistors complémentaires) afin de commander le haut-parleur sans écraser la tension du filtre."
        },
        {
          title: "Partie réceptrice",
          text: "Le signal est capté par un microphone électret et amplifié par un préamplificateur non-inverseur. Il subit ensuite un filtrage passe-bande étroit pour éliminer les parasites, avant d'être traité par un redresseur double alternance et un comparateur à hystérésis (MCP6541) qui convertit l'enveloppe du signal en une commande logique stable pour le robot."
        }
        
      ],
      skills: ["Electronique", "Kicad", "LaTeX / Overleaf", "Rapports & CR", "Tests & Vérif.", "Datasheets", "Travail d'équipe", "Analyse", "Autonomie", "Communication"],
      pdf: "/assets/pdf/EmetteurRecepteurRobotS2.pdf",
      feedback: {
        difficulties: "Le principal défi a été l'accordage précis entre la fréquence de l'astable et la fréquence de coupure du filtre pour garantir un signal pur. Il a également fallu stabiliser l'étage de puissance pour éviter toute distorsion sonore lors de l'émission.",
        takeaways: "Ce projet m'a permis de maîtriser la conception de circuits analogiques, du calcul théorique à la validation expérimentale. J'ai eu la satisfaction de voir mon émetteur commander avec succès le robot à distance.",
        extensions: "Le système pourrait être amélioré par l'ajout d'un codage numérique du signal pour éviter les déclenchements par des bruits ambiants. On pourrait aussi optimiser la consommation d'énergie pour augmenter l'autonomie de la télécommande."
      },
      translations: {
        en: {
          title: "Design of a Sound Transmission and Reception Board",
          description: [
            {
              title: "Overall Project Description",
              text: "This project involved designing and building an acoustic remote control system capable of commanding a mobile robot remotely. The main goal was to generate and process a specific 3 kHz sound signal to trigger automated actions. In the team, I was fully responsible for the transmitter side. This transmitter module was designed to produce a stable, sufficiently powerful wave to be captured by a remote receiver while respecting filtering constraints to avoid parasitic acoustic noise. This work validated a complete analog transmission chain from the electronic signal to acoustic emission."
            },
            {
              title: "Transmitter Section",
              text: "I designed the sound transmission chain starting with an op-amp based astable oscillator that produces a stable square wave at 2.26 kHz. This signal is then cleaned by a second-order Sallen-Key active low-pass filter to retain only the sine wave fundamental, then current-amplified by a push-pull power stage (complementary transistors) to drive the speaker without overloading the filter voltage."
            },
            {
              title: "Receiver Section",
              text: "The signal is captured by an electret microphone and amplified by a non-inverting preamplifier. It then undergoes narrowband band-pass filtering to eliminate noise before being processed by a full-wave rectifier and a hysteresis comparator (MCP6541) that converts the signal envelope into a stable logic command for the robot."
            }
          ],
          difficulties: "The main challenge was precisely tuning the astable oscillator frequency to the filter cutoff frequency to ensure a pure signal. It was also necessary to stabilize the power stage to avoid audio distortion during transmission.",
          takeaways: "This project allowed me to master analog circuit design from theoretical calculation to experimental validation. I was satisfied to see my transmitter successfully control the robot remotely.",
          extensions: "The system could be improved by adding digital signal encoding to avoid false triggers from ambient noise. It could also be optimized for lower power consumption to extend remote control autonomy."
        },
        vi: {
          title: "Thiết kế bo thu phát âm thanh",
          description: [
            {
              title: "Mô tả dự án tổng quan",
              text: "Dự án này thiết kế và xây dựng một hệ thống điều khiển từ xa bằng âm thanh cho robot di động. Mục tiêu chính là tạo và xử lý một tín hiệu âm thanh 3 kHz cụ thể để kích hoạt các hành động tự động. Trong nhóm, tôi chịu trách nhiệm hoàn toàn về phía bộ phát. Module bộ phát này được thiết kế để tạo ra một sóng ổn định, đủ mạnh để bộ thu từ xa nhận được, đồng thời tuân thủ các yêu cầu lọc để tránh nhiễu âm thanh không mong muốn. Công việc này xác nhận chuỗi truyền dẫn analog hoàn chỉnh từ tín hiệu điện đến phát âm thanh."
            },
            {
              title: "Phần phát",
              text: "Tôi thiết kế chuỗi truyền âm thanh bắt đầu từ một dao động astable dựa trên AOP tạo ra sóng vuông ổn định ở 2,26 kHz. Tín hiệu này sau đó được lọc sạch bằng bộ lọc thông thấp chủ động Sallen-Key bậc hai để chỉ giữ thành phần cơ bản sin, rồi khuếch đại dòng bởi tầng công suất Push-Pull (cặp transistor bổ sung) để điều khiển loa mà không làm quá tải điện áp của bộ lọc."
            },
            {
              title: "Phần thu",
              text: "Tín hiệu được thu bởi micro electret và khuếch đại bởi bộ tiền khuếch đại không đảo. Sau đó nó trải qua lọc băng thông hẹp để loại bỏ nhiễu trước khi được xử lý bởi mạch chỉnh lưu toàn sóng và so sánh có độ trễ (MCP6541) nhằm chuyển đổi bao tín hiệu thành lệnh logic ổn định cho robot."
            }
          ],
          difficulties: "Thách thức chính là tinh chỉnh chính xác tần số dao động astable với tần số cắt của bộ lọc để đảm bảo tín hiệu tinh khiết. Cũng cần ổn định tầng công suất để tránh méo tiếng trong quá trình truyền.",
          takeaways: "Dự án giúp tôi thành thạo thiết kế mạch analog từ tính toán lý thuyết đến xác nhận thực nghiệm. Tôi hài lòng khi thấy bộ phát điều khiển robot thành công từ xa.",
          extensions: "Hệ thống có thể cải thiện bằng cách thêm mã hóa tín hiệu kỹ thuật số để tránh kích hoạt nhầm do tiếng ồn môi trường. Nó cũng có thể tối ưu để tiêu thụ điện năng thấp hơn nhằm tăng thời gian sử dụng điều khiển từ xa."
        }
      }
    },
    {
      id: 8,
      title: "Alimentation Programmable avec un chargeur USB-C PPS",
      year: "2025",
      duration: "60 heures",
      images: [
        Alim_USB_PPS,
        Arlo_Resultat_Oscillo,
        SAE_Arlo_VOUT_PPS,
        Arlo_scope_2,

      ],
      description: "La conception d’une alimentation portable et peu coûteuse est détaillée dans ce rapport, s’appuyant sur l’utilisation d’un chargeur USB-C et du protocole Power Delivery. Le système est piloté par une carte Arduino Nano qui communique avec un module AP33772S via un bus I2C. Grâce au mode PPS, une tension précise peut être demandée au chargeur par pas de 20 mV. Le fonctionnement des trames de communication a été analysé et vérifié à l'aide d'un oscilloscope pour garantir la cohérence des commandes envoyées.",
      skills: ["Electronique", "LaTeX / Overleaf", "Rapports & CR", "Tests & Vérif.", "Datasheets", "Travail d'équipe", "Analyse", "Autonomie", "Communication"],
      pdf: "/assets/pdf/Rapport_SAE_LY_Moreau_.pdf",
      feedback: {
        difficulties: "Outre la configuration de STM32CubeIDE, nous avons été confrontés à l'instabilité de la tension de sortie (oscillations de 40 mV) et à l'impossibilité technique de brider l'intensité via le programme.",
        takeaways: "Nous avons réussi à piloter le module AP33772 via le bus I2C pour obtenir une tension précise pour respecter le cahier des charges.",
        extensions: "Il serait pertinent d'ajouter un étage de filtrage pour stabiliser la tension. Et d'avoir une carte PCB personnalisée pour intégrer tous les composants de manière plus compacte et sécurisée."
      },
      translations: {
        en: {
          title: "Programmable Power Supply with USB-C PPS Charger",
          description: "The report details the design of a low-cost, portable power supply using a USB-C charger and Power Delivery protocol. The system is controlled by an Arduino Nano communicating with an AP33772S module over I2C. Thanks to PPS mode, a precise voltage can be requested from the charger in 20 mV steps. The communication frames were analyzed and verified with an oscilloscope to ensure command consistency.",
          difficulties: "Beyond STM32CubeIDE configuration, we faced output voltage instability (40 mV oscillations) and the technical impossibility of limiting current through the firmware.",
          takeaways: "We managed to control the AP33772 module via I2C to achieve a precise voltage that met the requirements.",
          extensions: "It would be useful to add a filtering stage to stabilize the voltage and a custom PCB to integrate all components more compactly and securely."
        },
        vi: {
          title: "Nguồn lập trình với bộ sạc USB-C PPS",
          description: "Báo cáo trình bày thiết kế một nguồn di động giá rẻ sử dụng bộ sạc USB-C và giao thức Power Delivery. Hệ thống được điều khiển bằng Arduino Nano giao tiếp với module AP33772S qua I2C. Nhờ chế độ PPS, có thể yêu cầu điện áp chính xác từ bộ sạc theo bước 20 mV. Các khung truyền thông đã được phân tích và xác minh bằng oscilloscope để đảm bảo tính nhất quán của lệnh.",
          difficulties: "Ngoài cấu hình STM32CubeIDE, chúng tôi gặp sự không ổn định của điện áp đầu ra (dao động 40 mV) và không thể kỹ thuật giới hạn dòng qua chương trình.",
          takeaways: "Chúng tôi đã điều khiển module AP33772 qua I2C để đạt được điện áp chính xác đáp ứng yêu cầu.",
          extensions: "Cần thêm tầng lọc để ổn định điện áp và một PCB tùy chỉnh để tích hợp các thành phần một cách nhỏ gọn và an toàn hơn."
        }
      }
    },
    {
      id: 9,
      title: "Optiplant - Application de suivi de plantes en temps réel",
      year: "2026",
      duration: "50 heures",
      images: [
        Optiplant0,
        Optiplant1,
        Optiplant2,
        Optiplant3,
        Optiplant4,
      ],
      description: [
        {
          title: "Description Globale du projet",
          text: "Le projet Optiplant propose un système hydroponique innovant. Cette méthode écologique permet de cultiver des plantes de manière efficace, en assurant un apport optimal en nutriments essentiels, ce qui favorise une croissance accrue et une production améliorée des plantes. Pour renforcer cette optimisation, des ombrières automatisées ont été intégrées, permettant un réglage précis de l'exposition au soleil des cultures. De plus, le système utilise un réservoir pour la récupération de l'eau de pluie, rendant l'irrigation partiellement autonome en eau. Des panneaux solaires installés sur la structure rendent également le projet autonome en électricité. \n\nAinsi le projet est séparé en plusieurs parties : \n- La partie communication automate / IHM, \n- La partie base de données, \n- La partie site web pour le suivi des plantes."
        },
        {
          title: "Communication Automate / IHM",
          text: "Ma contribution sur ce projet a été de développer la partie communication entre l'automate et l'interface homme-machine (IHM). J'ai mis en place le protocole Modbus pour assurer une transmission des données fiable et en temps réel codé en Python, c'est une partie très importante du projet car sans elle, il n'y aurait pas de réel suivi du système hydroponique."
        },
        {
          title: "Détails Techniques",
          text: "Pour le projet OptiPlant, j'ai conçu l'interface de communication en développant un client Modbus TCP/IP sous Python pour interroger un automate Schneider. Mon travail a consisté à mapper précisément les registres de maintien (Holding Registers) de l'automate afin d'extraire les données brutes des capteurs, tout en gérant les types de données (Integer/Float) pour assurer la précision des mesures de pH et d'humidité. J'ai configuré la gestion des trames pour permettre une lecture cyclique fiable et l'écriture de commandes de pilotage vers les sorties de l'automate, isolant ainsi la logique de contrôle du reste de l'infrastructure logicielle (SQL/InfluxDB) qui vient simplement consommer ces données.",
        }
        
      ],
      skills: ["Python", "CoDeSys", "MQTT", "LaTeX / Overleaf", "Rapports & CR", "Tests & Vérif.", "Datasheets", "Travail d'équipe", "Analyse", "Autonomie", "Communication"],
      pdf: "/assets/pdf/Rapport_Optiplant_vf_Partiel.pdf",
      feedback: {
        difficulties: "Le choix du protocole de communication entre la base de données et l'interface homme machine (MQTT, MySQL, et Modbus). Le travail d'équipe (9 personnes) est aussi une difficulté car il faut gérer son temps pour ne pas retarder les autres parties / groupe.",
        takeaways: "J'ai apprécié faire la partie de communication entre la base de données et l'interface homme machine, en utilisant le protocole Modbus pour assurer une transmission efficace et simple des données en temps réel.",
        extensions: "Le projet sera repris pour être amélioré et optimisé dans le but d'avoir un fonctionnement autonome."
      },
      translations: {
        en: {
          title: "Optiplant - Real-Time Plant Monitoring Application",
          description: [
            {
              title: "Overall Project Description",
              text: "The Optiplant project offers an innovative hydroponic system. This ecological method allows efficient plant cultivation by providing optimal essential nutrients, resulting in increased growth and higher yields. To enhance this optimization, automated shade structures were integrated to precisely adjust plant sunlight exposure. The system also uses a rainwater recovery tank, making irrigation partially water-autonomous. Solar panels installed on the structure provide electrical autonomy.\n\nThe project is divided into several parts:\n- PLC / HMI communication,\n- database backend,\n- web application for plant monitoring."
            },
            {
              title: "PLC / HMI Communication",
              text: "My contribution was developing the communication layer between the PLC and the human-machine interface (HMI). I implemented the Modbus protocol to ensure reliable, real-time data transmission coded in Python. This is a critical part of the project because without it there would be no real monitoring of the hydroponic system."
            },
            {
              title: "Technical Details",
              text: "For OptiPlant, I designed the communication interface by developing a Modbus TCP/IP client in Python to query a Schneider PLC. My work involved mapping PLC holding registers precisely to extract raw sensor data while handling data types (Integer/Float) to ensure accurate pH and humidity measurements. I configured frame handling to allow reliable cyclic reads and command writes to the PLC outputs, isolating control logic from the remaining SQL/InfluxDB infrastructure that simply consumes the data."
            }
          ],
          difficulties: "Choosing the communication protocol between the database and the HMI (MQTT, MySQL, and Modbus) was challenging. Teamwork with nine people also made time management difficult to avoid delaying other parts of the project.",
          takeaways: "I enjoyed working on the communication layer between the database and the HMI, using Modbus to ensure efficient, simple real-time data transmission.",
          extensions: "The project will be continued to improve and optimize it toward autonomous operation."
        },
        vi: {
          title: "Optiplant - Ứng dụng giám sát cây trồng thời gian thực",
          description: [
            {
              title: "Mô tả tổng quan dự án",
              text: "Dự án Optiplant cung cấp một hệ thống thủy canh sáng tạo. Phương pháp sinh thái này cho phép trồng cây hiệu quả bằng cách cung cấp dinh dưỡng thiết yếu tối ưu, giúp tăng trưởng và năng suất. Để tăng cường tối ưu này, đã tích hợp các cấu trúc che tự động để điều chỉnh chính xác ánh sáng mặt trời cho cây trồng. Hệ thống cũng sử dụng bể thu hồi nước mưa, khiến tưới tiêu phần nào tự động về nước. Các tấm năng lượng mặt trời lắp trên cấu trúc cũng cung cấp tính tự chủ về điện.\n\nDự án được chia thành nhiều phần:\n- giao tiếp PLC / HMI,\n- cơ sở dữ liệu,\n- ứng dụng web để theo dõi cây trồng."
            },
            {
              title: "Giao tiếp PLC / HMI",
              text: "Đóng góp của tôi là phát triển lớp giao tiếp giữa PLC và giao diện người-máy (HMI). Tôi đã triển khai giao thức Modbus để đảm bảo truyền dữ liệu thời gian thực đáng tin cậy bằng Python. Đây là phần quan trọng của dự án vì nếu không có nó, sẽ không có giám sát thực sự của hệ thống thủy canh."
            },
            {
              title: "Chi tiết kỹ thuật",
              text: "Đối với OptiPlant, tôi thiết kế giao diện giao tiếp bằng cách phát triển client Modbus TCP/IP bằng Python để truy vấn PLC Schneider. Công việc của tôi bao gồm ánh xạ chính xác các thanh ghi giữ (Holding Registers) của PLC để trích xuất dữ liệu cảm biến thô đồng thời xử lý các loại dữ liệu (Integer/Float) để đảm bảo đo pH và độ ẩm chính xác. Tôi cấu hình xử lý khung để cho phép đọc tuần hoàn đáng tin cậy và ghi lệnh đến đầu ra PLC, tách biệt logic điều khiển khỏi phần còn lại của cơ sở hạ tầng SQL/InfluxDB chỉ đơn giản tiêu thụ dữ liệu."
            }
          ],
          difficulties: "Việc lựa chọn giao thức truyền thông giữa cơ sở dữ liệu và HMI (MQTT, MySQL, và Modbus) là thách thức. Làm việc theo nhóm 9 người cũng ảnh hưởng đến quản lý thời gian để tránh trì hoãn phần khác của dự án.",
          takeaways: "Tôi thích làm việc về lớp giao tiếp giữa cơ sở dữ liệu và HMI, sử dụng Modbus để đảm bảo truyền dữ liệu hiệu quả và đơn giản theo thời gian thực.",
          extensions: "Dự án sẽ được tiếp tục để cải tiến và tối ưu nhằm hướng tới vận hành tự động."
        }
      }
    },
    {
      id: 10,
      title: "Robot détecteur d'obstacle",
      year: "2022",
      duration: "60 heures",
      images: [
        RobotObst1,
        ConcoursRobotS1,
      ],
      description: [
        {
          title: "Description Globale du projet",
          text: "Ce projet consiste en la conception et la réalisation d'un robot mobile autonome capable de détecter et d'éviter des obstacles en temps réel. Il s'agit d'un système mécatronique complet où une unité de contrôle (type Arduino) traite les données provenant de capteurs de distance (infrarouge et ultrason) pour piloter deux moteurs à courant continu via une interface de puissance. Le robot est conçu pour fonctionner soit de manière totalement autonome en analysant son environnement, soit en mode manuel grâce à une interface de radiocommande, garantissant ainsi une navigation fluide et sécurisée dans un espace donné."
        },
        {
          title: "Détails Techniques",
          text: "Le projet s'appuie sur plusieurs piliers fondamentaux : l'alimentation est assurée par une batterie au plomb de 12V dont la durée de vie est optimisée par une gestion précise des cycles de charge. La propulsion repose sur des moteurs à courant continu pilotés par un pont en H, une structure électronique permettant de varier la vitesse par modulation de largeur d'impulsion (PWM) et d'inverser le sens de marche. Pour la perception, le robot combine un télémètre ultrason, idéal pour mesurer des distances par écho acoustique, et un télémètre infrarouge SHARP qui utilise la triangulation lumineuse pour une détection de proximité précise. Enfin, le pilotage est rendu possible par un récepteur radio captant des signaux PPM (Pulse Position Modulation), permettant au programme de basculer entre le mode manuel et l'algorithme d'évitement d'obstacles automatique."
        }
      ],
      skills: ["Arduino IDE", "C/C++", "Microsoft Office", "Rapports & CR", "Tests & Vérif.", "Datasheets", "Travail d'équipe", "Analyse", "Autonomie", "Communication"],
      feedback: {
        difficulties: "La principale complexité réside dans la gestion de la batterie au plomb pour éviter les décharges profondes fatales et dans le traitement des signaux non linéaires du télémètre infrarouge. Mais aussi la logique de contrôle pour l'évitement d'obstacles.",
        takeaways: "Ce projet était le premier projet de robotique que j'ai réalisé, j'y ai découvert les bases de la programmation de microcontrôleurs en embarqués, la gestion de capteurs et la logique de contrôle pour l'évitement d'obstacles, ce qui a été très enrichissant. En particulier, le petit concours en fin de semestre était très amusant.",
        extensions: "Une évolution possible serait l'ajout d'un module Bluetooth pour le retour de données en temps réel ou l'implémentation d'un asservissement PID pour stabiliser la vitesse du robot."
      },
      translations: {
        en: {
          title: "Obstacle Detection Robot",
          description: [
            {
              title: "Overall Project Description",
              text: "This project consists of designing and building an autonomous mobile robot capable of detecting and avoiding obstacles in real time. It is a complete mechatronic system where a control unit (Arduino-based) processes distance sensor data (infrared and ultrasonic) to drive two DC motors through a power stage. The robot is designed to operate either fully autonomously by analyzing its environment or manually via a radio control interface, ensuring smooth and safe navigation within a given space."
            },
            {
              title: "Technical Details",
              text: "The project relies on several core pillars: power is supplied by a 12V lead-acid battery whose lifespan is optimized through precise charge cycle management. Propulsion uses PWM-driven DC motors with an H-bridge to vary speed and reverse direction. For perception, the robot combines an ultrasonic ranger for echo-based distance measurement and a SHARP infrared ranger using triangulation for accurate proximity detection. Finally, control is enabled by a radio receiver capturing PPM signals, allowing the program to switch between manual mode and the automatic obstacle avoidance algorithm."
            }
          ],
          difficulties: "The main complexity was managing the lead-acid battery to avoid fatal deep discharges and handling the non-linear signals from the infrared ranger. Control logic for obstacle avoidance was also challenging.",
          takeaways: "This was the first robotics project I completed, and I learned the fundamentals of embedded microcontroller programming, sensor management, and obstacle avoidance logic. The end-of-semester competition was especially fun.",
          extensions: "A possible evolution would be adding a Bluetooth module for real-time telemetry or implementing PID control to stabilize robot speed."
        },
        vi: {
          title: "Robot Phát hiện Chướng ngại vật",
          description: [
            {
              title: "Mô tả dự án tổng quan",
              text: "Dự án này gồm thiết kế và xây dựng một robot di động tự hành có khả năng phát hiện và tránh chướng ngại vật trong thời gian thực. Đây là một hệ thống cơ điện tử hoàn chỉnh, nơi bộ điều khiển (dựa trên Arduino) xử lý dữ liệu cảm biến khoảng cách (hồng ngoại và siêu âm) để điều khiển hai động cơ DC qua tầng công suất. Robot được thiết kế để hoạt động tự động hoàn toàn bằng cách phân tích môi trường hoặc điều khiển thủ công qua giao diện điều khiển radio, đảm bảo điều hướng mượt mà và an toàn trong không gian nhất định."
            },
            {
              title: "Chi tiết kỹ thuật",
              text: "Dự án dựa trên một số trụ cột chính: nguồn được cung cấp bởi pin axit-chì 12V với tuổi thọ được tối ưu hóa bằng quản lý chu kỳ sạc chính xác. Động lực sử dụng động cơ DC điều khiển PWM với cầu H để thay đổi tốc độ và đảo chiều. Về cảm biến, robot kết hợp bộ đo khoảng cách siêu âm cho đo khoảng cách bằng phản xạ và bộ đo hồng ngoại SHARP sử dụng tam giác hóa để phát hiện độ gần chính xác. Cuối cùng, điều khiển được kích hoạt bằng bộ thu radio nhận tín hiệu PPM, cho phép chương trình chuyển giữa chế độ thủ công và thuật toán tránh chướng ngại vật tự động."
            }
          ],
          difficulties: "Khó khăn chính là quản lý pin axit-chì để tránh xả sâu mất mát và xử lý các tín hiệu phi tuyến từ bộ đo hồng ngoại. Logic điều khiển tránh chướng ngại vật cũng đầy thách thức.",
          takeaways: "Đây là dự án robot đầu tiên tôi hoàn thành, và tôi đã học được các nguyên tắc lập trình vi điều khiển nhúng, quản lý cảm biến và logic tránh chướng ngại vật. Cuộc thi cuối kỳ đặc biệt rất vui.",
          extensions: "Một cải tiến có thể là thêm module Bluetooth để truyền dữ liệu thời gian thực hoặc triển khai điều khiển PID để ổn định tốc độ robot."
        }
      }
    },
  ].sort((a, b) => parseInt(b.year) - parseInt(a.year));

  // Données pour le stage (structure identique aux projets pour la compatibilité)
  const internshipData = [
    {
      id: 7,
      title: "Stage à ATEM RF & Microwaves (BUT3)",
      year: "2026",
      duration: "14 semaines",
      // L'image ici sert de miniature pour la grille principale
      images: ["https://via.placeholder.com/800x450.png/1a1a1a/ffffff?text=Stage+ATEM+RF"],
      description: "Stage de fin d'études. Cliquez pour découvrir le déroulement du stage étape par étape.",
      skills: ["Linux", "Prog. Embarquée", "Electronique", "LaTeX / Overleaf", "Rapports & CR", "Tests & Vérif.", "Datasheets", "Travail d'équipe", "Analyse", "Autonomie", "Communication"],
      pdf: "/assets/pdf/Rapport_Stage_ATEM_RF_Microwaves.pdf",
      feedback: {
        difficulties: "",
        takeaways: "",
        extensions: ""
      },
      // Descriptions spécifiques par image pour le mode Story
      descriptions: [
        { title: "Introduction et Contexte", 
          text: "Introduction et Contexte du stage à ATEM RF & Microwaves.",
          images: ["https://via.placeholder.com/800x450.png/1a1a1a/ffffff?text=Intro+Image+1", "https://via.placeholder.com/800x450.png/1a1a1a/ffffff?text=Intro+Image+2"]
        },
        { title: "Réhabilitation de l'enceinte climatique : remise en service et optimisation du pilotage", 
          text: "Travail technique sur l'enceinte climatique.",
          images: ["https://via.placeholder.com/800x450.png/2a2a2a/ffffff?text=Enceinte+Climatique"]
        },
        { title: "Tiroir démonstrateur GPS : conception et intégration matérielle", 
          text: "Détails sur la conception du tiroir GPS.",
          images: ["https://via.placeholder.com/800x450.png/3a3a3a/ffffff?text=Tiroir+GPS"]
        },
        { title: "Bilan et Résultats", 
          text: "Bilan, compétences acquises et résultats concrets obtenus durant le stage.",
          images: ["https://via.placeholder.com/800x450.png/4a4a4a/ffffff?text=Bilan"]
        }
      ]
      ,
      translations: {
        en: {
          title: "Internship at ATEM RF & Microwaves (Final Year)",
          description: "Final year internship. Click to discover the internship steps and details.",
          descriptions: [
            { title: "Introduction and Context", text: "Introduction and context of the internship at ATEM RF & Microwaves." },
            { title: "Rehabilitation of the climatic chamber: recommissioning and control optimization", text: "Technical work on the climatic chamber." },
            { title: "GPS demonstrator drawer: design and hardware integration", text: "Details on the GPS drawer design." },
            { title: "Summary and Results", text: "Summary, skills acquired and concrete results obtained during the internship." }
          ]
        },
        vi: {
          title: "Thực tập tại ATEM RF & Microwaves (Năm kết thúc)",
          description: "Thực tập tốt nghiệp. Nhấn để xem các bước và chi tiết của kỳ thực tập.",
          descriptions: [
            { title: "Giới thiệu và Bối cảnh", text: "Giới thiệu và bối cảnh của kỳ thực tập tại ATEM RF & Microwaves." },
            { title: "Phục hồi buồng khí hậu: đưa vào hoạt động lại và tối ưu hóa điều khiển", text: "Công việc kỹ thuật trên buồng khí hậu." },
            { title: "Ngăn kéo trình diễn GPS: thiết kế và tích hợp phần cứng", text: "Chi tiết về thiết kế ngăn kéo GPS." },
            { title: "Tổng kết và Kết quả", text: "Tổng kết, kỹ năng đạt được và kết quả cụ thể trong kỳ thực tập." }
          ]
        }
      }
    },
    {
      id: "stage-1",
      title: "Stage au Laboratoire du LIS (BUT2)",
      year: "2025",
      duration: "8 semaines",
      images: [LR_logical],
      description: "Stage de fin d'études. Cliquez pour découvrir le déroulement du stage étape par étape.",
      skills: ["C/C++", "Qt", "Prog. Embarquée", "Kicad", "Electronique", "Autonomie", "Travail d'équipe", "Datasheets", "Linux", "Wireshark", "Analyse", "Rapports & CR", "Communication"],
      pdf: "/assets/pdf/Extrait_Rapport_de_Stage_2e_annee_GEII_Ly_Minh-Quan.pdf",
      feedback: {
        difficulties: "Plusieurs choses ont été difficiles : la prise en main d'un projet existant avec une documentation limitée, la configuration du Raspberry Pi pour le déploiement de l'Escape Game (car je ne l'avais jamais fait auparavant), et la mise en œuvre de protocoles de communication pour les épreuves techniques.",
        takeaways: "J'ai pu développer mes compétences en électronique et en programmation embarquée, tout en apprenant à travailler de manière autonome sur un projet complexe. J'ai également amélioré ma capacité à documenter techniquement les systèmes que je développe. Mais aussi, savoir que ce que j'ai fait sera réutilisé est déjà un résultat très gratifiant.",
        extensions: "Ce projet pourrait être étendu en ajoutant de nouvelles épreuves techniques à l'Escape Game, ou en développant une interface de gestion pour les enseignants afin de personnaliser les épreuves et suivre les performances des étudiants."
      },
      // Données spécifiques pour le mode 'Story' (par image)
      descriptions: [
        {
          title: "Introduction et Contexte",
          text: "Durant ce stage de 8 semaines au laboratoire LIS, j'ai participé au développement d'un Escape Game pédagogique pour le département GEII de l'IUT de Toulon.\n\nMa mission consistait à reprendre un projet existant (pas terminer) pour le fiabiliser et documenter les différentes épreuves techniques mais aussi participer à la réalisation à l'aide à un cahier des charges. ",
          images: [LIS]
        },
        {
          title: "Configuration Système & Partitionnement",
          text: "Une étape cruciale a été la préparation du nano-ordinateur Raspberry Pi 4. J'ai utilisé l'outil Gparted pour créer un système d'exploitation (Raspbian) partitionné de manière optimale (30 Go).\n\nCela permettait d'assurer une sauvegarde fiable de l'image système et une duplication facile sur plusieurs cartes SD pour le déploiement de l'Escape Game.",
          images: [Stage_PCB_Kicad]
        },
        {
          title: "Épreuves Techniques & Documentation",
          text: "J'ai travaillé sur plusieurs modules techniques : \n- Analyse de trafic réseau avec Wireshark.\n- Mise en œuvre de signaux PWM pour le contrôle de puissance.\n- Programmation d'épreuves basées sur l'affichage LED et la restitution sonore.\n\nChaque épreuve a été rigoureusement testée et documentée pour garantir sa maintenance.",
          images: [StageEpreuve]
        },
        {
          title: "Bilan et Compétences Acquises",
          text: "Ce stage a été une réelle opportunité de mettre en pratique mes connaissances en électronique et informatique industrielle dans un cadre de recherche et développement.\n\nJ'ai développé mon autonomie face à des systèmes complexes et consolidé ma méthodologie de rédaction technique (LaTeX).",
          images: [LR_logical]
        }
      ]
      ,
      translations: {
        en: {
          title: "Internship at LIS Laboratory (2nd Year)",
          description: "Internship. Click to discover the internship steps and details.",
          descriptions: [
            { title: "Introduction and Context", text: "During this 8-week internship at the LIS laboratory, I participated in the development of an educational Escape Game for the GEII department..." },
            { title: "System Configuration & Partitioning", text: "A crucial step was preparing the Raspberry Pi 4 system and partitioning it using Gparted." },
            { title: "Technical Challenges & Documentation", text: "I worked on several technical modules: network traffic analysis with Wireshark, PWM signal implementation, and programming challenges." },
            { title: "Summary and Acquired Skills", text: "This internship was an opportunity to apply my electronics and industrial computing knowledge." }
          ]
        },
        vi: {
          title: "Thực tập tại Phòng thí nghiệm LIS (Năm 2)",
          description: "Thực tập. Nhấn để xem các bước và chi tiết của kỳ thực tập.",
          descriptions: [
            { title: "Giới thiệu và Bối cảnh", text: "Trong 8 tuần thực tập tại phòng thí nghiệm LIS, tôi đã tham gia phát triển một Escape Game giáo dục cho khoa GEII..." },
            { title: "Cấu hình hệ thống & Phân vùng", text: "Bước then chốt là chuẩn bị Raspberry Pi 4 và phân vùng bằng Gparted." },
            { title: "Thách thức kỹ thuật & Tài liệu", text: "Tôi làm việc trên nhiều module kỹ thuật: phân tích lưu lượng mạng với Wireshark, triển khai tín hiệu PWM, và lập trình các thử thách." },
            { title: "Tổng kết và Kỹ năng đạt được", text: "Kỳ thực tập này là cơ hội để áp dụng kiến thức điện tử và tin học công nghiệp." }
          ]
        }
      }
    }
  ];

  // Liste des compétences avec descriptions (Carte blanche)
  const skillsList = [
    { 
      name: "Electronique", 
      level: "Avancée",
      desc: "Conception de circuits et systèmes embarqués.",
      category: "hard",
      translations: { en: { name: "Electronics", desc: "Design of circuits and embedded systems." }, vi: { name: "Điện tử", desc: "Thiết kế mạch và hệ thống nhúng." } }
    },
    { 
      name: "Prog. Embarquée", 
      level: "Avancée",
      desc: "Développement de logiciels pour systèmes à contraintes.",
      category: "hard",
      translations: { en: { name: "Embedded Programming", desc: "Software development for constrained systems." }, vi: { name: "Lập trình nhúng", desc: "Phát triển phần mềm cho các hệ thống giới hạn tài nguyên." } }
    },
    { 
      name: "C/C++", 
      aliases: ["C++"],
      level: "Avancée",
      desc: "Développement système performant et bas niveau.",
      category: "hard",
      translations: { en: { name: "C/C++", desc: "High-performance low-level system development." }, vi: { name: "C/C++", desc: "Phát triển hệ thống hiệu năng cao ở mức thấp." } }
    },
    { 
      name: "Arduino IDE", 
      level: "Avancée",
      desc: "Prototypage rapide sur microcontrôleurs.",
      category: "hard",
      translations: { en: { name: "Arduino IDE", desc: "Rapid prototyping on microcontrollers." }, vi: { name: "Arduino IDE", desc: "Nhanh chóng tạo mẫu trên vi điều khiển." } }
    },
    { 
      name: "Microsoft Office", 
      level: "Avancée",
      desc: "Word, PowerPoint, Excel pour documentation et présentation.",
      category: "hard",
      translations: { en: { name: "Microsoft Office", desc: "Word, PowerPoint, Excel for documentation and presentation." }, vi: { name: "Microsoft Office", desc: "Word, PowerPoint, Excel cho tài liệu và thuyết trình." } }
    },
    { 
      name: "Datasheets", 
      aliases: ["Lecture de datasheets"],
      level: "Avancée",
      desc: "Lecture et analyse de spécifications techniques.",
      category: "hard",
      translations: { en: { name: "Datasheets", desc: "Reading and analyzing technical specifications." }, vi: { name: "Datasheets", desc: "Đọc và phân tích thông số kỹ thuật." } }
    },
    {
      name: "Kicad",
      level: "Avancée",
      desc: "Conception de schémas électroniques et de circuits imprimés (PCB).",
      category: "hard",
      translations: { en: { name: "Kicad", desc: "Design of electronic schematics and printed circuit boards (PCB)." }, vi: { name: "Kicad", desc: "Thiết kế sơ đồ điện tử và mạch in (PCB)." } }
    },
    { 
      name: "Rapports & CR", 
      desc: "Rédaction technique, comptes rendus et documentation.",
      category: "soft",
      translations: { en: { name: "Reports & Minutes", desc: "Technical writing, reports and documentation." }, vi: { name: "Báo cáo & Biên bản", desc: "Viết kỹ thuật, báo cáo và tài liệu." } }
    },
    { 
      name: "STM32", 
      level: "Intermédiaire",
      desc: "Programmation de microcontrôleurs pour l'embarqué.",
      category: "hard",
      translations: { en: { name: "STM32", desc: "Microcontroller programming for embedded systems." }, vi: { name: "STM32", desc: "Lập trình vi điều khiển cho hệ thống nhúng." } }
    },
    { 
      name: "Travail d'équipe", 
      desc: "Collaboration efficace et gestion de projet agile.",
      category: "soft",
      translations: { en: { name: "Teamwork", desc: "Effective collaboration and agile project management." }, vi: { name: "Làm việc nhóm", desc: "Hợp tác hiệu quả và quản lý dự án linh hoạt." } }
    },
    { 
      name: "Tests & Vérif.", 
      level: "Intermédiaire",
      desc: "Validation de systèmes et protocoles de test.",
      category: "hard",
      translations: { en: { name: "Testing & Verification", desc: "System validation and test protocols." }, vi: { name: "Kiểm thử & Xác minh", desc: "Xác thực hệ thống và quy trình kiểm thử." } }
    },
    { 
      name: "Linux", 
      level: "Avancée",
      desc: "Maîtrise de la ligne de commande (Bash) et administration système.",
      category: "hard",
      translations: { en: { name: "Linux", desc: "Command-line proficiency (Bash) and system administration." }, vi: { name: "Linux", desc: "Thành thạo dòng lệnh (Bash) và quản trị hệ thống." } }
    },
    { 
      name: "LaTeX / Overleaf", 
      level: "Avancée",
      desc: "Rédaction de documents scientifiques et techniques structurés.",
      category: "hard",
      translations: { en: { name: "LaTeX / Overleaf", desc: "Authoring structured scientific and technical documents." }, vi: { name: "LaTeX / Overleaf", desc: "Soạn thảo tài liệu khoa học và kỹ thuật có cấu trúc." } }
    },
    { 
      name: "GitHub", 
      level: "Intermédiaire",
      desc: "Gestion de version et travail collaboratif.",
      category: "hard",
      translations: { en: { name: "GitHub", desc: "Version control and collaborative work." }, vi: { name: "GitHub", desc: "Quản lý phiên bản và làm việc cộng tác." } }
    },
    { 
      name: "Wireshark", 
      level: "Notions",
      desc: "Analyse de protocoles réseau et diagnostic de trafic.",
      category: "hard",
      translations: { en: { name: "Wireshark", desc: "Network protocol analysis and traffic diagnosis." }, vi: { name: "Wireshark", desc: "Phân tích giao thức mạng và chẩn đoán lưu lượng." } }
    },
    { 
      name: "Analyse", 
      desc: "Capacité d'audit, de synthèse et résolution de problèmes.",
      category: "soft",
      translations: { en: { name: "Analysis", desc: "Ability to audit, synthesize and solve problems." }, vi: { name: "Phân tích", desc: "Khả năng đánh giá, tổng hợp và giải quyết vấn đề." } }
    },
    { 
      name: "Autonomie", 
      desc: "Capacité à prioriser les tâches et à s'auto-former.",
      category: "soft",
      translations: { en: { name: "Autonomy", desc: "Ability to prioritize tasks and self-train." }, vi: { name: "Tự chủ", desc: "Khả năng ưu tiên công việc và tự học." } }
    },
    { 
    name: "Qt", 
    level: "Notions",
    desc: "Développement d'interfaces graphiques et d'applications multiplateformes.",
    category: "hard",
    translations: { en: { name: "Qt", desc: "GUI development and cross-platform application development." }, vi: { name: "Qt", desc: "Phát triển giao diện đồ họa và ứng dụng đa nền tảng." } }
    },
    { 
      name: "Communication", 
      desc: "Transmission claire d'informations techniques.",
      category: "soft",
      translations: { en: { name: "Communication", desc: "Clear transmission of technical information." }, vi: { name: "Giao tiếp", desc: "Truyền đạt thông tin kỹ thuật rõ ràng." } }
    },
    { 
      name: "Python", 
      level: "Intermédiaire",
      desc: "Analyse de données, IA et scripting polyvalent.",
      category: "hard",
      translations: { en: { name: "Python", desc: "Data analysis, AI and versatile scripting." }, vi: { name: "Python", desc: "Phân tích dữ liệu, AI và scripting đa năng." } }
    },
    { 
      name: "JavaScript", 
      level: "Intermédiaire",
      desc: "Langage de script essentiel pour le web interactif.",
      category: "hard",
      translations: { en: { name: "JavaScript", desc: "Essential scripting language for interactive web." }, vi: { name: "JavaScript", desc: "Ngôn ngữ kịch bản cần thiết cho web tương tác." } }
    },
    { 
      name: "SQL", 
      level: "Notions",
      desc: "Gestion et interrogation de bases de données relationnelles.",
      category: "hard",
      translations: { en: { name: "SQL", desc: "Management and querying of relational databases." }, vi: { name: "SQL", desc: "Quản lý và truy vấn cơ sở dữ liệu quan hệ." } }
    },
    { 
      name: "MQTT", 
      level: "Notions",
      desc: "Protocole de messagerie publish-subscribe pour l'IoT.",
      category: "hard",
      translations: { en: { name: "MQTT", desc: "Publish-subscribe messaging protocol for IoT." }, vi: { name: "MQTT", desc: "Giao thức nhắn tin publish-subscribe cho IoT." } }
    },
    { 
      name: "CoDeSys", 
      aliases: ["CodeSys"],
      level: "Notions",
      desc: "Environnement de développement pour automates programmables.",
      category: "hard",
      translations: { en: { name: "CoDeSys", desc: "Development environment for programmable logic controllers." }, vi: { name: "CoDeSys", desc: "Môi trường phát triển cho bộ điều khiển logic lập trình được." } }
    },
    { 
      name: "Base de données", 
      level: "Intermédiaire",
      desc: "Conception et gestion de bases de données.",
      category: "hard",
      translations: { en: { name: "Databases", desc: "Design and management of databases." }, vi: { name: "Cơ sở dữ liệu", desc: "Thiết kế và quản lý cơ sở dữ liệu." } }
    },
    { 
      name: "Grafana", 
      level: "Notions",
      desc: "Outil de visualisation et de monitoring de données.",
      category: "hard",
      translations: { en: { name: "Grafana", desc: "Data visualization and monitoring tool." }, vi: { name: "Grafana", desc: "Công cụ trực quan hóa và giám sát dữ liệu." } }
    },
    { 
      name: "Matlab", 
      level: "Intermédiaire",
      desc: "Calcul numérique, modélisation et simulation.",
      category: "hard",
      translations: { en: { name: "Matlab", desc: "Numerical computing, modeling and simulation." }, vi: { name: "Matlab", desc: "Tính toán số, mô hình hóa và mô phỏng." } }
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
          <SidebarBody className="justify-between gap-4 md:gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto">
            <div className="flex flex-col gap-2 pt-4">
              {links.map((link, idx) => (
                <div key={idx} onClick={() => setOpen(false)}>
                  <SidebarLink
                    link={link}
                    onClick={() => setActiveTab(link.href.replace('#', ''))}
                  />
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
                  "flex items-center justify-start gap-2 group/sidebar py-2"
                )}
              >
                <img
                  src={photo_profil} // 2. Utilisez l'image importée
                  className={cn("flex-shrink-0 rounded-full transition-all", open ? "h-16 w-16" : "h-12 w-12")}
                  width={50}
                  height={50}
                  alt="Avatar"
                />
                {open && (
                  <span className="text-white text-lg font-semibold group-hover/sidebar:translate-x-1 transition-transform duration-150 whitespace-pre inline-block">Ly Minh-Quan</span>
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
            language={language}
            translations={translations}
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
  const internships = internship;
  const academicProjects = projects.sort((a, b) => parseInt(b.year) - parseInt(a.year));

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
          projectIds: [1,2,3,"stage-1"],
          translations: { en: { desc: "Carry out partial design using a project-based approach.", explanation: "I can design and complete a project while respecting a precise specification and time constraints." }, vi: { desc: "Tiến hành thiết kế một phần với phương pháp tiếp cận theo dự án.", explanation: "Tôi có thể thiết kế và hoàn thành một dự án trong khi tuân thủ yêu cầu và thời gian đã định." } }
        },
        
          { id: 2,
          desc: "Concevoir un système en fiabilisant les solutions.", 
          percentage: 90, 
          explanation: "Mes conceptions sont fiables, mais je dois faire plus attention au côté concret. Parfois, je reste trop dans la théorie et j'oublie des détails de terrain. J'apprends à mieux imaginer l'utilisation finale pour éviter ces petites erreurs. ", 
          projectIds: [2, 4, 6, 9,"stage-1"],
          translations: { en: { desc: "Design a system while ensuring solution reliability.", explanation: "My designs are reliable, but I need to pay more attention to the practical side. Sometimes I stay too theoretical and miss field details. I am learning to better imagine final use to avoid these small errors." }, vi: { desc: "Thiết kế một hệ thống đồng thời đảm bảo độ tin cậy của giải pháp.", explanation: "Thiết kế của tôi đáng tin cậy, nhưng tôi cần chú ý hơn đến khía cạnh thực tế. Đôi khi tôi vẫn quá lý thuyết và bỏ lỡ các chi tiết hiện trường. Tôi đang học cách tưởng tượng tốt hơn về việc sử dụng cuối cùng để tránh những lỗi nhỏ này." } }
        },
        
          { id: 3, 
          desc: "Concevoir un système en adoptant une approche sélective dans ses choix technologiques.",
          percentage: 90, 
          explanation: "Le niveau est de 90% car je pense être en capacité de concevoir des systèmes complexes, en choisissant les composants et logiciels adaptés, mais il me manque encore de l'expérience pratique pour atteindre une maîtrise totale.", 
          projectIds: [2,4,6],
          translations: { en: { desc: "Design a system with a selective approach to technological choices.", explanation: "This level is 90% because I can design complex systems with appropriate components and software, but I still lack enough practical experience to achieve full mastery." }, vi: { desc: "Thiết kế một hệ thống với phương pháp chọn lọc các lựa chọn công nghệ.", explanation: "Mức này là 90% vì tôi có thể thiết kế các hệ thống phức tạp với các thành phần và phần mềm phù hợp, nhưng tôi vẫn thiếu kinh nghiệm thực hành để đạt được sự thành thạo hoàn toàn." } }
        }
      ],
      translations: { en: { name: "Conception", desc: "Carry out partial design with a project approach." }, vi: { name: "Thiết kế", desc: "Tiến hành thiết kế một phần với phương pháp dự án." } }
    },
    { 
      name: "Vérifier", 
      color: "green", 
      levels: [
        { id: 1, 
          desc: "Effectuer les tests et mesures nécessaires à une vérification d’un système.", 
          percentage: 80, 
          explanation: "Je maîtrise des appareils de mesure standards (tel que l'oscilloscope, le multimètre) validée en TP mais aussi dans tous mes projets. Je les maitrises certes mais pas à 100%, je dois encore m'améliorer sur certains appareil (comme le RIGOL ou l'utilisation plus poussée de l'oscilloscope).", 
          projectIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "stage-1"],
          translations: { en: { desc: "Carry out the tests and measurements necessary to verify a system.", explanation: "I master standard measurement devices (such as oscilloscopes and multimeters), validated in labs and projects. I am proficient but not 100%; I still need to improve on some devices like RIGOL or advanced oscilloscope use." }, vi: { desc: "Thực hiện các phép thử và đo lường cần thiết để xác minh một hệ thống.", explanation: "Tôi thành thạo các thiết bị đo tiêu chuẩn (như oscilloscope và đồng hồ vạn năng), được xác thực trong lab và dự án. Tôi giỏi nhưng chưa 100%; tôi vẫn cần cải thiện với một số thiết bị như RIGOL hoặc sử dụng oscilloscope nâng cao." } }
        },
        
        { id: 2, 
          desc: "Mettre en place un protocole de tests pour valider le fonctionnement d’un système.", 
          percentage: 90, 
          explanation: "Je suis en capacité de mettre en place un protocole de test pour valider le fonctionnement d'un système, mais je dois encore améliorer ma rigueur et ma méthodologie pour atteindre une maîtrise totale.", 
          projectIds: [1, 2, 4, 3, 4, 5, 6, 7, 8, 9, 10,"stage-1"],
          translations: { en: { desc: "Implement a test protocol to validate a system's operation.", explanation: "I can set up a test protocol to validate a system's operation, but I still need to improve my rigor and methodology to reach full mastery." }, vi: { desc: "Triển khai một quy trình kiểm thử để xác minh hoạt động của hệ thống.", explanation: "Tôi có thể thiết lập một quy trình kiểm thử để xác minh hoạt động của hệ thống, nhưng tôi vẫn cần cải thiện sự nghiêm ngặt và phương pháp để đạt thành thạo hoàn toàn." } }
        },
        
        { id: 3, 
          desc: "Élaborer une procédure intégrant une démarche qualité pour valider le fonctionnement d’un système.", 
          percentage: 90, 
          explanation: "J'ai acquis une solide maîtrise dans la rédaction de protocoles de tests rigoureux. Lors de mes projets, je veille systématiquement à ce que chaque étape de validation respecte les normes de qualité pour garantir la fiabilité du système électronique final.", 
          projectIds: [4, 7, 9, "stage-1"],
          translations: { en: { desc: "Develop a procedure integrating a quality approach to validate a system.", explanation: "I have gained strong mastery in writing rigorous test protocols. In my projects, I ensure every validation step follows quality standards to guarantee the reliability of the final electronic system." }, vi: { desc: "Xây dựng một quy trình tích hợp phương pháp chất lượng để xác minh một hệ thống.", explanation: "Tôi đã đạt được sự thành thạo vững chắc trong việc viết các quy trình kiểm thử nghiêm ngặt. Trong các dự án của mình, tôi đảm bảo mỗi bước xác minh tuân thủ tiêu chuẩn chất lượng để đảm bảo độ tin cậy của hệ thống điện tử cuối cùng." } }
        }
      ],
      translations: { en: { name: "Verify", desc: "Perform tests and measurements to verify a system." }, vi: { name: "Xác minh", desc: "Thực hiện kiểm thử và đo lường để xác minh hệ thống." } }
    },
    { 
      name: "Maintenir", 
      color: "yellow", 
      levels: [
        { id: 1, 
          desc: "Intervenir sur un système pour effectuer une opération de maintenance.", 
          percentage:80, 
          explanation: "Quand un système tombe en panne, je sais mettre les mains dedans pour trouver d'où vient le problème et le changer. Je suis efficace pour réparer et remettre en service, même si je dois faire l'effort de mieux noter ce que j'ai fait pour que le suivant comprenne mon intervention.", 
          projectIds: [5, 7, "stage-1"],
          translations: { en: { desc: "Intervene on a system to perform maintenance operations.", explanation: "When a system fails, I know how to dig in to identify the issue and fix it. I can repair and restore service effectively, though I should improve documenting my actions so the next person understands the intervention." }, vi: { desc: "Can thiệp vào hệ thống để thực hiện hoạt động bảo trì.", explanation: "Khi hệ thống gặp sự cố, tôi biết cách xử lý để xác định và sửa lỗi. Tôi có thể sửa chữa và khôi phục hoạt động hiệu quả, dù tôi nên cải thiện việc ghi chép lại hành động để người tiếp theo hiểu can thiệp." } }
        },
        { id: 2, 
          desc: "Mettre en place une stratégie de maintenance pour garantir un fonctionnement optimal.", 
          percentage: 75, 
          explanation: "Je sais identifier les points sensibles de mes systèmes pour prévenir les pannes avant qu'elles n'arrivent. J'applique les bases de la maintenance préventive pour que mes montages restent fiables dans le temps, même si je dois encore m'améliorer sur la rédaction de procédures de dépannage plus détaillées pour faciliter le travail des autres.", 
          projectIds: [6, 7, 9, "stage-1"],
          translations: { en: { desc: "Set up a maintenance strategy to ensure optimal operation.", explanation: "I can identify sensitive points in my systems to prevent failures before they occur. I apply preventive maintenance basics to keep my assemblies reliable over time, though I still need to improve writing more detailed troubleshooting procedures for others." }, vi: { desc: "Thiết lập chiến lược bảo trì để đảm bảo hoạt động tối ưu.", explanation: "Tôi có thể xác định các điểm nhạy cảm trong hệ thống để ngăn ngừa sự cố trước khi xảy ra. Tôi áp dụng các nguyên tắc bảo trì phòng ngừa để giữ cho lắp ráp hoạt động ổn định theo thời gian, dù tôi vẫn cần cải thiện việc viết quy trình xử lý chi tiết hơn cho người khác." } }
        }
      ],
      translations: { en: { name: "Maintain", desc: "Perform maintenance operations on systems." }, vi: { name: "Bảo trì", desc: "Thực hiện các hoạt động bảo trì trên hệ thống." } }
    },
    { 
      name: "Implanter", 
      color: "red", 
      levels: [
        { id: 1, 
          desc: "Réaliser un système en mettant en place une démarche qualité en conformité avec le dossier de fabrication.", 
          percentage: 80, 
          explanation: "Je sais transformer un dossier technique en un prototype réel qui fonctionne. Je suis rigoureux sur le câblage et la soudure pour que ce soit conforme à ce qui est demandé, même si je dois encore gagner en fluidité pour passer plus vite de la théorie à la réalisation pratique.", 
          projectIds: [1, 2, 3, 4, 7, 8, 9, 10, "stage-1"],
          translations: { en: { desc: "Build a system with a quality approach in accordance with the manufacturing dossier.", explanation: "I can turn a technical dossier into a working real prototype. I am rigorous in wiring and soldering to meet requirements, though I still need to improve my fluency to move faster from theory to practical realization." }, vi: { desc: "Thực hiện một hệ thống bằng cách áp dụng phương pháp chất lượng phù hợp với hồ sơ sản xuất.", explanation: "Tôi có thể biến hồ sơ kỹ thuật thành nguyên mẫu thực tế hoạt động. Tôi cẩn trọng về đi dây và hàn để đáp ứng yêu cầu, dù tôi vẫn cần cải thiện để chuyển nhanh hơn từ lý thuyết đến thực tế." } }
        },
        { id: 2, 
          desc: "Interagir avec les différents acteurs, lors de l’installation et de la mise en service d’un système, dans une démarche qualité.", 
          percentage: 90, 
          explanation: "Même si c'était en TP, j'ai toujours livré des programmes et des modules fonctionnels. Je communique bien avec les profs pour valider mon travail, mais je dois apprendre à mieux anticiper les contraintes du \"monde réel\" au-delà du laboratoire pour que l'installation soit parfaite du premier coup.", 
          projectIds: [2, 4, 8, 9, "stage-1"],
          translations: { en: { desc: "Interact with stakeholders during installation and commissioning in a quality approach.", explanation: "Even if it was in labs, I always delivered functional programs and modules. I communicate well with supervisors to validate my work, but I need to better anticipate real-world constraints beyond the lab so the installation is right first time." }, vi: { desc: "Tương tác với các bên liên quan trong quá trình lắp đặt và đưa vào vận hành theo phương pháp chất lượng.", explanation: "Dù là trong phòng thí nghiệm, tôi luôn giao chương trình và module hoạt động. Tôi giao tiếp tốt với giáo viên để xác nhận công việc, nhưng tôi cần dự đoán tốt hơn các hạn chế thực tế ngoài phòng lab để lắp đặt đúng ngay lần đầu." } }
        }
      ],
      translations: { en: { name: "Deploy", desc: "Implement a system with quality conforming to the manufacturing dossier." }, vi: { name: "Triển khai", desc: "Triển khai hệ thống với chất lượng phù hợp hồ sơ sản xuất." } }
    },
  ];

  const colorClasses = {
    blue: { text: "text-blue-400", bg: "bg-blue-400" },
    green: { text: "text-green-400", bg: "bg-green-400" },
    yellow: { text: "text-yellow-400", bg: "bg-yellow-400" },
    red: { text: "text-red-400", bg: "bg-red-400" },
  };

  const skillSections = [
    { title: translations.ui.technicalSkills, skills: skillsList.filter(s => s.category === 'hard') },
    { title: translations.ui.transversalSkills, skills: skillsList.filter(s => s.category === 'soft') }
  ];

  const interestsData = [
    {
      title: "Cuisine",
      date: "Passion de toujours",
      description: "Je suis passionné per la cuisine depuis toujours, découvrir et faire de nouveaux plats, c'est sa que j'aime.",
      icon: <IconChefHat size={32} className="text-orange-400" />,
      level: null,
      translations: {
        en: { title: "Cooking", date: "Lifelong passion", description: "I have been passionate about cooking for as long as I can remember; discovering and making new dishes is what I love." },
        vi: { title: "Nấu ăn", date: "Đam mê từ nhỏ", description: "Tôi đam mê nấu ăn từ khi còn nhỏ; khám phá và làm những món ăn mới là điều tôi thích." }
      }
    },
    {
      title: "Échecs",
      date: "Depuis 2018",
      description: "Jeu de stratégie pratiqué occasionnellemet pour développer la réflexion tactique.",
      icon: <IconChess size={32} className="text-white" />,
      level: "Intermédiaire",
      translations: {
        en: { title: "Chess", date: "Since 2018", description: "A strategic game practiced occasionally to develop tactical thinking." },
        vi: { title: "Cờ vua", date: "Từ 2018", description: "Trò chơi chiến lược được chơi thỉnh thoảng để phát triển tư duy chiến thuật." }
      }
    },
    {
      title: "Musculation",
      date: "Actuellement",
      description: "J'ai fais de la musculation en 2023 mais j'ai arrêté par manque de temps. Puis j'ai repris en 2026 pour me remettre en forme après une période de sédentarité.",
      icon: <IconBarbell size={32} className="text-red-400" />,
      level: null,
      translations: {
        en: { title: "Weight Training", date: "Actually", description: "I did weight training in 2023 but stopped due to lack of time. Then I started again in 2026 to get back in shape after a period of inactivity." },
        vi: { title: "Tập gym", date: "Hiện nay", description: "Tôi từng tập tạ vào năm 2023 nhưng đã dừng lại vì thiếu thời gian. Sau đó, tôi bắt đầu lại vào năm 2026 để lấy lại vóc dáng sau một thời gian không hoạt động." }
      }
    },
    {
      title: "Badminton",
      date: "Loisir occasionnel",
      description: "Un très bon sport qui regroupe le travail d'équipe et la réactivité.",
      icon: <IconActivity size={32} className="text-green-400" />,
      level: null,
      translations: {
        en: { title: "Badminton", date: "Occasional hobby", description: "A great sport combining teamwork and quick reactions." },
        vi: { title: "Cầu lông", date: "Sở thích thỉnh thoảng", description: "Một môn thể thao tuyệt vời kết hợp làm việc nhóm và phản xạ nhanh." }
      }
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
            title={translations.ui.changeLanguage}
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
      <div className="w-full h-full overflow-auto pt-16 md:pt-0">
          {/* Section Accueil */}
          {activeTab === 'accueil' && (
            <section id="accueil" className="w-full min-h-screen p-4 md:p-8 text-white flex flex-col justify-center items-center text-center">
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
                  <p className="text-lg md:text-xl lg:text-2xl text-blue-400 font-medium">{translations.ui.studentTitle}</p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
                  className="max-w-3xl mt-4 bg-neutral-800/50 border border-neutral-700 rounded-xl p-6 backdrop-blur-sm"
                >
                  <p className="text-neutral-300 text-left md:text-center text-base md:text-lg">
                    {translations.ui.intro}
                  </p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
                  className="flex flex-wrap justify-center gap-4 mt-6"
                >
                  <a href="#experiences" className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-lg flex items-center gap-2"><IconBrandTabler size={20} /> {translations.ui.discoverProjects}</a>
                  <a href="assets/pdf/CV Ly Minh-Quan.pdf" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-neutral-700 text-white font-semibold rounded-lg hover:bg-neutral-600 transition-colors shadow-md flex items-center gap-2" title={translations.ui.openCVTitle}><IconFileTypePdf size={20} /> {translations.ui.viewCV}</a>
                </motion.div>
              </div>
            </section>
          )}

          {/* Section Expériences */}
          {activeTab === 'experiences' && (
          <section id="experiences" className="w-full min-h-screen p-4 md:p-8 text-white pt-20 md:pt-5">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{translations.sections.experiences.title}</h2>
            <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-4 md:p-6 mb-6 md:mb-8 max-w-3xl backdrop-blur-sm">
              <p className="text-sm md:text-base text-neutral-300">{translations.sections.experiences.desc}</p>
            </div>

            {/* Section Stages */}
            {internships.length > 0 && (
              <div className="mb-10">
                <h3 className="text-xl md:text-2xl font-semibold mb-4 text-neutral-200">{translations.ui.myInternships}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pb-10">
                  {internships.map((item) => (
                    <motion.div
                      key={item.id}
                      className="bg-neutral-800 rounded-lg cursor-pointer overflow-hidden"
                      onClick={() => {
                        if (isModalOpen) return;
                        onProjectClick(item);
                      }}
                      whileHover={{ 
                        scale: 1.02, 
                        y: -5, 
                        boxShadow: "0px 0px 15px rgba(59, 130, 246, 0.3)" // Léger glow bleu
                      }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 300, 
                        damping: 20,
                        boxShadow: { duration: 0.2 } // Transition plus rapide pour le boxShadow
                      }}
                    >
                      <img src={item.images[0]} alt={getText(item,'title',language)} className="w-full h-40 object-cover" />
                      <div className="p-4">
                        <h3 className="text-xl font-bold mb-2">{getText(item,'title',language)}</h3>
                        <div className="flex justify-between text-sm text-neutral-400">
                          <span>{item.year}</span>
                          <span>{translateDuration(getText(item, 'duration', language) || item.duration, language)}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Section Projets */}
            {academicProjects.length > 0 && (
              <div className="mb-10">
                <h3 className="text-xl md:text-2xl font-semibold mb-4 text-neutral-200">{translations.ui.myProjects}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pb-10">
                  {academicProjects.map((item) => (
                    <motion.div
                      key={item.id}
                      className="bg-neutral-800 rounded-lg cursor-pointer overflow-hidden"
                      onClick={() => {
                        if (isModalOpen) return;
                        onProjectClick(item);
                      }}
                      whileHover={{ 
                        scale: 1.02, 
                        y: -5, 
                        boxShadow: "0px 0px 15px rgba(59, 130, 246, 0.3)" // Léger glow bleu
                      }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 300, 
                        damping: 20,
                        boxShadow: { duration: 0.2 } // Transition plus rapide pour le boxShadow
                      }}
                    >
                      <img src={item.images[0]} alt={getText(item,'title',language)} className="w-full h-40 object-cover" />
                      <div className="p-4">
                        <h3 className="text-xl font-bold mb-2">{getText(item,'title',language)}</h3>
                        <div className="flex justify-between text-sm text-neutral-400">
                          <span>{item.year}</span>
                          <span>{translateDuration(getText(item, 'duration', language) || item.duration, language)}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </section>
          )}

          {/* Section Compétences */}
          {activeTab === 'competences' && (
          <section id="competences" className="w-full min-h-screen p-4 md:p-8 text-white pt-20 md:pt-5">
            <h2 className="text-2xl md:text-3xl font-bold">{translations.sections.skills.title}</h2>
            <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-4 md:p-6 mt-4 mb-8 max-w-3xl backdrop-blur-sm">
              <p className="text-sm md:text-base text-neutral-300">{translations.sections.skills.desc}</p>
            </div>
            {/* Section spéciale Compétences GEII */}
            <div className="mb-10">
              <h3 className="text-xl md:text-2xl font-semibold mb-4 text-neutral-200">{translations.ui.geiiHeading}</h3>
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
                    whileHover={{ 
                      scale: 1.02, 
                      boxShadow: "0px 0px 15px rgba(59, 130, 246, 0.3)" // Léger glow bleu
                    }}
                  >
                    <h4 className={`text-2xl font-bold ${colorClasses[skill.color].text}`}>{getText(skill,'name',language)}</h4>
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
                      const relatedProjects = [...internships, ...academicProjects].filter(p => p.skills && p.skills.includes(skill.name));
                      
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
                          whileHover={{ 
                            scale: 1.02, 
                            boxShadow: "0px 0px 15px rgba(59, 130, 246, 0.3)" // Léger glow bleu
                          }}
                        >
                          <div className="flex justify-between items-start">
                            <h3 className="text-xl font-bold text-blue-400 group-hover:text-blue-300 transition-colors">{getText(skill,'name',language)}</h3>
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
                          <p className="text-sm text-neutral-300 flex-1 group-hover:text-neutral-200 transition-colors">{getText(skill,'desc',language)}</p>
                          
                          {/* Indicateur de projets */}
                          {relatedProjects.length > 0 && (
                            <div className="mt-auto pt-3 border-t border-neutral-700/50 flex items-center gap-2 text-xs text-neutral-500">
                              <IconBrandTabler size={14} />
                              <span>{translations.ui.projectsAssociated(relatedProjects.length)}</span>
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
          <section id="interets" className="w-full min-h-screen p-4 md:p-8 text-white pt-20 md:pt-5">
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
                      {getText(item,'date',language) || item.date}
                    </span>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-neutral-200 group-hover:text-blue-400 transition-colors">{getText(item,'title',language)}</h3>
                      {item.level && (
                        <span className="text-xs font-medium px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                          {item.level}
                        </span>
                      )}
                    </div>
                    <p className="text-neutral-400 text-sm leading-relaxed">
                      {getText(item,'description',language)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
          )}

          {/* Section Contacts */}
          {activeTab === 'contacts' && (
          <section id="contacts" className="w-full min-h-screen p-4 md:p-8 text-white pt-20 md:pt-5">
            <h2 className="text-2xl md:text-3xl font-bold">{translations.sections.contact.title}</h2>
            <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-4 md:p-6 mt-4 max-w-3xl backdrop-blur-sm">
              <p className="text-sm md:text-base text-neutral-300">{translations.sections.contact.desc}</p>
            </div>

            {/* Cadre avec liens et QR Codes */}
            <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-4 md:p-6 mt-4 max-w-3xl backdrop-blur-sm flex flex-col gap-8">
              
              {/* LinkedIn */}
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="bg-neutral-900 p-2 rounded-lg flex-shrink-0 border border-neutral-700">
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

              {/* GitHub */}
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="bg-neutral-900 p-2 rounded-lg flex-shrink-0 border border-neutral-700">
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent("https://github.com/Minh1105")}`} 
                    alt="GitHub QR Code" 
                    className="w-24 h-24 md:w-32 md:h-32"
                  />
                </div>
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                  <a href="https://github.com/Minh1105" target="_blank" rel="noopener noreferrer" className="relative group flex items-center gap-2 mb-2 text-neutral-300 hover:text-white transition-colors">
                    <IconBrandGithub size={32} />
                    <h3 className="text-xl font-bold">GitHub</h3>
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-full mb-2 ml-2 w-48 p-2 
                    bg-neutral-900 border border-neutral-700 text-neutral-200 
                    text-xs rounded-lg shadow-xl opacity-0 group-hover:opacity-100 
                    transition-opacity pointer-events-none text-center z-10">
                      {translations.sections.contact.githubTooltip}
                    </div>
                  </a>
                </div>
              </div>

              {/* Séparateur */}
              <div className="w-full h-px bg-neutral-700/50"></div>

              {/* Email */}
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="bg-neutral-900 p-2 rounded-lg flex-shrink-0 border border-neutral-700">
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

function getProjectFeedbackText(project, field, language) {
  if (!project || !project.feedback) return '';
  return project.translations?.[language]?.[field] ?? project.feedback[field] ?? '';
}

// Helper pour récupérer le texte selon la langue (fallback à la valeur par défaut)
function getText(item, field, language) {
  if (!item) return '';
  // supporter les champs directement sur l'objet translations
  if (item.translations && item.translations[language]) {
    const val = item.translations[language][field];
    if (val !== undefined) return val;
  }
  // support nested translations for objects like feedback
  if (item[field + '_translations'] && item[field + '_translations'][language]) {
    return item[field + '_translations'][language];
  }
  return item[field] !== undefined ? item[field] : '';
}

function translateDuration(duration, language) {
  if (!duration) return '';
  const input = String(duration).trim();

  if (language === 'fr') return input;

  const translations = {
    en: {
      heures: 'hours',
      heure: 'hour',
      semaines: 'weeks',
      semaine: 'week'
    },
    vi: {
      heures: 'giờ',
      heure: 'giờ',
      semaines: 'tuần',
      semaine: 'tuần'
    }
  };

  const mapping = translations[language] || translations.en;
  return input
    .replace(/(\+?\s*\d+)\s*heures?\b/gi, (match, amount) => `${amount} ${mapping.heures}`)
    .replace(/(\+?\s*\d+)\s*semaines?\b/gi, (match, amount) => `${amount} ${mapping.semaines}`);
}

// Composant pour la modale de projet
const ProjectModal = ({ project, onClose, language, translations, skillsList, onSkillClick }) => {
  if (!project) return null;
  const modalRef = useRef(null);
  const videoRef = useRef(null);
  const [showPdfPreview, setShowPdfPreview] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);
  useOutsideClick(modalRef, () => {
    if (!showPdfPreview && !showLightbox) onClose();
  });

  const [[page, direction], setPage] = useState([0, 0]);
  const [isHovering, setIsHovering] = useState(false);
  const [isCarouselVideoPlaying, setIsCarouselVideoPlaying] = useState(true);

  // Détection du mode "Story" (pour le stage) si des descriptions multiples existent
  // On vérifie de façon défensive si au moins une description contient des images
  const isStoryMode = Array.isArray(project.descriptions) && project.descriptions.some(d => Array.isArray(d.images) && d.images.length > 0);

  // Préparation des images pour le carrousel
  let modalImages = isStoryMode
    ? (project.descriptions || []).flatMap(d => d.images || [])
    : (project.images || []);

  // Fallback si aucune image/vidéo n'est disponible
  if (!Array.isArray(modalImages) || modalImages.length === 0) {
    modalImages = [photo_profil];
  }

  const imageIndex = modalImages.length > 0 
    ? (page % modalImages.length + modalImages.length) % modalImages.length 
    : 0;
  
  const currentMedia = modalImages[imageIndex];
  const isVideo = typeof currentMedia === 'string' && (currentMedia.endsWith('.mp4') || currentMedia.endsWith('.webm') || currentMedia.endsWith('.ogg'));

  // Détermination de la description à afficher (soit globale, soit par étape)
  // attempt to use translated description when available
  let currentDescription = getText(project,'description',language) || project.description;
  if (isStoryMode) {
    let cumulative = 0;
    // support translated step descriptions array; ensure descs est un tableau
    const descs = (project.translations && project.translations[language] && Array.isArray(project.translations[language].descriptions))
      ? project.translations[language].descriptions
      : (Array.isArray(project.descriptions) ? project.descriptions : []);
    for (const desc of descs) {
      cumulative += (Array.isArray(desc.images) ? desc.images.length : 0);
      if (imageIndex < cumulative) {
        currentDescription = desc;
        break;
      }
    }
  }

  const paginate = useCallback((newDirection) => {
    setPage([page + newDirection, newDirection]); }, [page]);

  // Gère la fin de la vidéo dans le carrousel pour passer au slide suivant
  const handleVideoEnd = () => {
    paginate(1);
  };

  // Gère le clic sur la vidéo du carrousel pour la mettre en pause/lecture
  const toggleCarouselVideo = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  useEffect(() => {
    // Désactiver le défilement automatique si on est en mode Story ou s'il n'y a qu'une image
    if (modalImages.length <= 1 || isHovering || isStoryMode || isVideo) return;
    const autoplay = setInterval(() => paginate(1), 7000); // Défilement toutes les X secondes
    return () => clearInterval(autoplay);
  }, [isHovering, paginate, modalImages.length, isStoryMode, isVideo]);

  const normalizeSkillKey = (value) => String(value || '').trim().toLowerCase().replace(/[^a-z0-9]/g, '');
  const findSkillByName = (skillName) => {
    const normalized = normalizeSkillKey(skillName);
    return skillsList.find(skill =>
      normalizeSkillKey(skill.name) === normalized ||
      (skill.aliases || []).some(alias => normalizeSkillKey(alias) === normalized) ||
      (skill.translations && Object.values(skill.translations).some(translation => normalizeSkillKey(translation.name) === normalized))
    ) || null;
  };

  const currentSkills = project.skills || [];
  const hardSkills = currentSkills
    .map(findSkillByName)
    .filter(skill => skill && skill.category === 'hard');
  const softSkills = currentSkills
    .map(findSkillByName)
    .filter(skill => skill && skill.category === 'soft');

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
        <button onClick={onClose} className="absolute top-4 right-4 text-white bg-neutral-900/80 hover:bg-neutral-800 transition-colors z-20 p-1 rounded-full">
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
                    {isVideo ? (
                  <div className="absolute w-full h-full cursor-pointer" onClick={toggleCarouselVideo}>
                    <motion.video
                      ref={videoRef}
                      key={page}
                      src={currentMedia}
                      custom={direction}
                      variants={variants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 },
                      }}
                      className="absolute w-full h-full object-contain"
                      autoPlay
                      muted
                      playsInline
                      onPlay={() => setIsCarouselVideoPlaying(true)}
                      onPause={() => setIsCarouselVideoPlaying(false)}
                      onEnded={handleVideoEnd}
                    />
                    {!isCarouselVideoPlaying && (
                      <div className="absolute inset-0 flex justify-center items-center bg-black/30 pointer-events-none">
                        <IconPlayerPlay size={48} className="text-white" />
                      </div>
                    )}
                    {isHovering && (
                       <button
                         onClick={(e) => { e.stopPropagation(); setShowLightbox(true); }}
                         className="absolute top-2 right-2 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                         title="Agrandir"
                       >
                         <IconZoomIn size={20} />
                       </button>
                    )}
                  </div>
                ) : (
                  <motion.img
                    key={page}
                    src={currentMedia}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 },
                    }}
                    alt={`${getText(project,'title',language)} - Image ${imageIndex + 1}`}
                    className="absolute w-full h-full object-contain cursor-zoom-in"
                    onClick={() => setShowLightbox(true)}
                  />
                )}
              </AnimatePresence>

              {/* Boutons de navigation du carrousel */}
              {modalImages.length > 1 && (
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
            {modalImages.length > 1 && (
              <div className="flex justify-center gap-2 mt-4">
                {modalImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      const direction = idx > imageIndex ? 1 : -1;
                      setPage([page + (idx - imageIndex), direction]);
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === imageIndex ? "w-8 bg-neutral-400" : "w-2 bg-neutral-700 hover:bg-neutral-600"
                    }`}
                    aria-label={`Voir l'image ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Informations en bas */}
          <div className="w-full flex flex-col">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 pr-8 text-white">{getText(project,'title',language)}</h2>

            {/* Texte */}
            <div className="mb-4 md:mb-6">
              {Array.isArray(currentDescription) && typeof currentDescription[0] === 'object' ? (
                <div className="flex flex-col gap-4">
                  {currentDescription.map((section, idx) => (
                    <div key={idx} className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-5 shadow-sm">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2 border-b border-neutral-700/50 pb-2">
                        <h4 className="text-xl font-bold text-blue-400">{getText(section,'title',language) || section.title}</h4>
                        {section.period && (
                          <span className="text-xs font-mono bg-neutral-700 px-2 py-1 rounded text-neutral-300 whitespace-nowrap">
                            {section.period}
                          </span>
                        )}
                      </div>
                      <p className="text-sm md:text-base text-neutral-300 whitespace-pre-wrap leading-relaxed">
                          {getText(section,'text',language) || section.text}
                        </p>
                    </div>
                  ))}
                </div>
              ) : typeof currentDescription === 'object' && currentDescription !== null ? (
                <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-5 shadow-sm">
                  <div className="mb-3 border-b border-neutral-700/50 pb-2">
                    <h4 className="text-xl font-bold text-blue-400">{getText(currentDescription,'title',language) || currentDescription.title}</h4>
                  </div>
                  <p className="text-sm md:text-base text-neutral-300 whitespace-pre-wrap leading-relaxed">
                    {getText(currentDescription,'text',language) || currentDescription.text}
                  </p>
                </div>
              ) : (
                <div className="bg-neutral-800/30 p-4 rounded-lg border border-neutral-700/50">
                  <p className="text-sm md:text-base text-neutral-300 whitespace-pre-wrap">
                    {Array.isArray(currentDescription) ? currentDescription.join("") : (getText({text: currentDescription},'text',language) || currentDescription)}
                  </p>
                </div>
              )}
            </div>

            {/* Ressenti du projet */}
            {project.feedback && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-white">{translations.modal.projectFeedback}</h3>
                <div className="flex flex-col gap-4">
                  {getProjectFeedbackText(project,'difficulties',language) && (
                    <div className="bg-neutral-800/50 p-4 rounded-lg border border-neutral-700/50">
                      <h4 className="text-md font-semibold mb-2 text-red-400">{translations.modal.difficulties}</h4>
                      <p className="text-sm text-neutral-300 whitespace-pre-wrap">{getProjectFeedbackText(project,'difficulties',language)}</p>
                    </div>
                  )}
                  {getProjectFeedbackText(project,'takeaways',language) && (
                    <div className="bg-neutral-800/50 p-4 rounded-lg border border-neutral-700/50">
                      <h4 className="text-md font-semibold mb-2 text-green-400">{translations.modal.takeaways}</h4>
                      <p className="text-sm text-neutral-300 whitespace-pre-wrap">{getProjectFeedbackText(project,'takeaways',language)}</p>
                    </div>
                  )}
                  {getProjectFeedbackText(project,'extensions',language) && (
                    <div className="bg-neutral-800/50 p-4 rounded-lg border border-neutral-700/50">
                      <h4 className="text-md font-semibold mb-2 text-blue-400">{translations.modal.extensions}</h4>
                      <p className="text-sm text-neutral-300 whitespace-pre-wrap">{getProjectFeedbackText(project,'extensions',language)}</p>
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
                        <span className="text-neutral-200 font-medium">{translateDuration(getText(project, 'duration', language) || project.duration, language)}</span>
                    </div>
                </div>
            </div>

            {/* Pins de compétences */}
            <div>
              <h3 className="text-lg md:text-xl font-semibold mb-3 text-white">{translations.modal.skills}</h3>
              
              <div className="flex flex-col gap-4">
                {hardSkills.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-neutral-400 mb-2 uppercase tracking-[0.22em]">{translations.ui.technicalSkills}</h4>
                    <div className="flex flex-wrap gap-2">
                      {hardSkills.map((skill, index) => (
                        <button key={index} onClick={() => onSkillClick(skill)} className="bg-blue-500/20 text-blue-300 text-xs font-medium px-2.5 py-1 rounded-full hover:bg-blue-500/40 transition-colors cursor-pointer border border-blue-500/20">
                          {getText(skill, 'name', language) || skill.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {softSkills.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-neutral-400 mb-2 uppercase tracking-[0.22em]">{translations.ui.transversalSkills}</h4>
                    <div className="flex flex-wrap gap-2">
                      {softSkills.map((skill, index) => (
                        <button key={index} onClick={() => onSkillClick(skill)} className="bg-neutral-500/20 text-neutral-200 text-xs font-medium px-2.5 py-1 rounded-full hover:bg-neutral-500/30 transition-colors cursor-pointer border border-neutral-500/20">
                          {getText(skill, 'name', language) || skill.name}
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
              className="absolute top-4 right-4 text-white bg-neutral-900/80 hover:bg-neutral-800 p-2 rounded-full transition-colors z-50"
              onClick={() => setShowLightbox(false)}
            >
              <IconX size={32} />
            </button>

            {/* Image en grand */}
            {isVideo ? (
              <motion.video
                key={page}
                src={currentMedia}
                className="max-w-[95vw] max-h-[95vh] object-contain select-none"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                onClick={(e) => e.stopPropagation()}
                autoPlay
                loop
                playsInline
                controls
              />
            ) : (
              <motion.img
                key={page}
                src={currentMedia}
                className="max-w-[95vw] max-h-[95vh] object-contain select-none"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                onClick={(e) => e.stopPropagation()}
              />
            )}

            {/* Navigation Lightbox */}
            {modalImages.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); paginate(-1); }}
                  className="absolute left-4 text-white bg-neutral-900/80 hover:bg-neutral-800 p-3 rounded-full transition-colors z-50"
                >
                  <IconChevronLeft size={40} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); paginate(1); }}
                  className="absolute right-4 text-white bg-neutral-900/80 hover:bg-neutral-800 p-3 rounded-full transition-colors z-50"
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
                <h3 className="text-white font-bold text-lg truncate pr-4">{getText(project,'title',language)} - Document</h3>
                <div className="flex items-center gap-3">
                  <a 
                    href={project.pdf} 
                    download
                    className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-sm font-bold transition-colors flex items-center gap-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <IconFileTypePdf size={20} />
                    <span className="hidden sm:inline">{translations.ui.download}</span>
                  </a>
                  <button 
                    onClick={() => setShowPdfPreview(false)}
                    className="p-2 bg-neutral-900/80 hover:bg-neutral-800 rounded-full text-white transition-colors"
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
const SkillModal = ({ skill, projects, onClose, onProjectClick, language, translations }) => {
  if (!skill) return null;
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
        <button onClick={onClose} className="absolute top-4 right-4 text-white bg-neutral-900/80 hover:bg-neutral-800 transition-colors z-20 p-1 rounded-full">
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
                <h2 className="text-2xl font-bold text-white">{translations.skillModal.levelDetails} {selectedLevel.id}</h2>
              </div>

              <div className="bg-neutral-800/50 p-6 rounded-xl border border-neutral-700">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-blue-400">{translations.skillModal.mastery} : {selectedLevel.percentage}%</h3>
                </div>
                <p className="text-neutral-300 mb-6 text-lg">{getText(selectedLevel,'desc',language) || selectedLevel.desc}</p>
                
                {selectedLevel.explanation && (
                  <div className="p-4 bg-neutral-900/50 rounded-lg border-l-4 border-blue-500 mb-2">
                      <h4 className="text-sm font-bold text-neutral-400 mb-2 uppercase tracking-wider">{translations.skillModal.whyLevel}</h4>
                      <p className="text-neutral-200 italic">"{getText(selectedLevel,'explanation',language) || selectedLevel.explanation}"</p>
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <IconBrandTabler size={24} className="text-neutral-400" />
                  {translations.skillModal.associatedProjects.replace('{level}', selectedLevel.id)}
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
                          alt={getText(project,'title',language)} 
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
                  <p className="text-neutral-500 italic">{translations.skillModal.noAssociatedProjects}</p>
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
                <h2 className="text-3xl font-bold text-blue-400">{getText(skill,'name',language)}</h2>
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
                      <p className="text-neutral-300 text-sm mb-3">{getText(lvl,'desc',language) || lvl.desc}</p>

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
                        {translations.skillModal.seeDetails} <IconChevronRight size={14} />
                      </div>
                    </div>
                  )})}
                </div>
              ) : (
                <p className="text-neutral-300 text-lg">{getText(skill, 'desc', language) || skill.desc}</p>
              )}
            </div>

            {/* Liste des projets */}
            {!isGeiiSkill && (
            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <IconBrandTabler size={24} className="text-neutral-400" />
                {translations.skillModal.skillAssociatedProjects}
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
                        alt={getText(project,'title',language)} 
                        className="w-12 h-12 rounded object-cover bg-neutral-900"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-neutral-200 group-hover:text-blue-400 truncate transition-colors">
                          {getText(project,'title',language)}
                        </h4>
                        <p className="text-xs text-neutral-500">{project.year}</p>
                      </div>
                      <IconChevronRight size={16} className="text-neutral-600 group-hover:text-blue-400 transition-colors" />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-neutral-500 italic">{translations.skillModal.noSkillProjects}</p>
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

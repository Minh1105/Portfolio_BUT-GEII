import './App.css'
import Plasma from './components/Plasma'
import { Sidebar, SidebarBody, SidebarLink } from './components/ui/Sidebar'
import {
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
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
  ];

  return (
    <div className="min-h-screen w-full relative">
      {/* Arrière-plan animé */}
      <Plasma color="#f37244ff" speed={0.5} opacity={0.8} />

      {/* Barre latérale */}
      <div className="absolute top-0 left-0 h-full z-20">
        <Sidebar>
          <SidebarBody className="justify-between gap-10">
            <div className="flex flex-col flex-1 overflow-y-auto">
              <div className="mt-8 flex flex-col gap-2">
                {links.map((link, idx) => (
                  <SidebarLink key={idx} link={link} />
                ))}
              </div>
            </div>
          </SidebarBody>
        </Sidebar>
      </div>

      {/* Contenu principal */}
      <div className="p-8 text-white md:ml-[60px]">
        <h1 className="text-2xl font-bold">Contenu Principal</h1>
        <p>Votre contenu ira ici.</p>
      </div>
    </div>
  )
}

export default App

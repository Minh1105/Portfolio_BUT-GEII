import './App.css'
import CallToActionCardImage from './components/ResponsiveImage'
import Plasma from './components/Plasma'
import { NavbarDemo } from './components/resizable-navbar'

function App() {
  return (
    <>
      {/* Le composant NavbarDemo contient déjà une barre de navigation et du contenu de démonstration.
          Vous pouvez le personnaliser dans src/components/resizable-navbar.jsx */}
      <NavbarDemo />
      {/* J'ai commenté les composants ci-dessous car NavbarDemo rend déjà une page complète.
          Vous pouvez les décommenter si vous souhaitez les intégrer différemment. */}
      {/* <CallToActionCardImage /> */}
      <Plasma />
    </>
  )
}

export default App

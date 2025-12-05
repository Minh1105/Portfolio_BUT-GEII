import './App.css'
import Plasma from './components/Plasma'




function App() {
  return (
    // Le conteneur principal de votre application
    // J'ai ajouté une couleur de fond sombre pour un meilleur contrast

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <Plasma 
    color="#f37244ff"
    speed={0.5}
    direction="forward"
    scale={1.1}
    opacity={0.8}
    mouseInteractive={true}
  />
</div>


  )
}

export default App

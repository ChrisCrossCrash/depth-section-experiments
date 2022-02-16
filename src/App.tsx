import { Canvas } from '@react-three/fiber'
import './App.css'
import { Game } from './Game'

const App = () => {
  return (
    <div style={{ height: '100vh' }}>
      <Canvas shadows>
        <Game />
      </Canvas>
    </div>
  )
}

export default App

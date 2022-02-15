import { useRef } from 'react'
import { Torus } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { DepthSection, getCameraAimPos } from 'depth-section'
import './App.css'
import type { Mesh } from 'three'

const Floaty = () => {
  const ref = useRef<Mesh>()
  useFrame((state) => {
    if (!ref.current) return
    const [x, y] = getCameraAimPos(state)
    ref.current.position.x = x
    ref.current.position.y = y
    ref.current.rotation.y = state.clock.getElapsedTime()
  })

  return (
    <Torus args={[0.5, 0.2, 32, 32]} ref={ref}>
      <meshStandardMaterial color='red' roughness={0.15} />
    </Torus>
  )
}

function App() {
  // const gltf = useLoader(GLTFLoader, '/donut.glb')
  return (
    <>
      <div style={{ height: '100vh' }} />
      <div
        style={{
          height: '100vh',
          backgroundColor: 'orange',
        }}
      >
        <DepthSection>
          <Floaty />
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} />
        </DepthSection>
      </div>
      <div style={{ height: '100vh' }} />
    </>
  )
}

export default App

import { Suspense } from 'react'
import { Environment, Plane, Sphere } from '@react-three/drei'
import { FirstPersonWalkingControls } from './FirstPersonWalkingControls'

const hdriUrl =
  'https://chriscrosscrash.github.io/depth-section/public/lebombo_1k.hdr'

export const Game = () => {
  return (
    <>
      <Plane
        args={[100, 100]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.5, 0]}
        receiveShadow
      >
        <meshStandardMaterial color='red' />
      </Plane>
      <Sphere position={[0, 1.5, 0]} castShadow>
        <meshStandardMaterial color='blue' metalness={1} roughness={0.1} />
      </Sphere>
      <Sphere scale={5} position={[-5, -1.5, -8]} castShadow>
        <meshStandardMaterial color='green' metalness={1} roughness={0.1} />
      </Sphere>
      <ambientLight intensity={1} />
      <pointLight position={[10, 10, 10]} intensity={5} />
      <Suspense fallback={null}>
        <Environment files={hdriUrl} />
      </Suspense>
      <FirstPersonWalkingControls />
    </>
  )
}

import { useRef, useEffect, Suspense } from 'react'
import {
  Environment,
  Plane,
  PointerLockControls,
  Sphere,
} from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

const hdriUrl =
  'https://chriscrosscrash.github.io/depth-section/public/lebombo_1k.hdr'

interface keyState {
  w: boolean
  a: boolean
  s: boolean
  d: boolean
}

const listenedKeys = ['w', 'a', 's', 'd'] as const

const handleKeyDown = (
  e: KeyboardEvent,
  keyRef: React.MutableRefObject<keyState>
) => {
  const key = e.key as keyof keyState
  if (listenedKeys.includes(key)) {
    keyRef.current[key] = true
  }
}

const handleKeyUp = (
  e: KeyboardEvent,
  keyRef: React.MutableRefObject<keyState>
) => {
  const key = e.key as keyof keyState
  if (listenedKeys.includes(key)) {
    keyRef.current[key] = false
  }
}

export const Game = () => {
  const keyRef = useRef<keyState>({ w: false, a: false, s: false, d: false })

  useEffect(() => {
    document.addEventListener('keydown', (e) => handleKeyDown(e, keyRef))
    document.addEventListener('keyup', (e) => handleKeyUp(e, keyRef))

    return () => {
      document.removeEventListener('keydown', (e) => handleKeyDown(e, keyRef))
      document.removeEventListener('keyup', (e) => handleKeyUp(e, keyRef))
    }
  })

  useFrame((state, delta) => {
    const { camera } = state
    const { current } = keyRef
    const speed = delta * 10

    if (current.w) camera.translateZ(-speed)
    if (current.s) camera.translateZ(speed)
    if (current.a) camera.translateX(-speed)
    if (current.d) camera.translateX(speed)
    camera.position.y = 1.5
  })

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
      <PointerLockControls />
      <ambientLight intensity={1} />
      <pointLight position={[10, 10, 10]} intensity={5} />
      <Suspense fallback={null}>
        <Environment files={hdriUrl} />
      </Suspense>
    </>
  )
}

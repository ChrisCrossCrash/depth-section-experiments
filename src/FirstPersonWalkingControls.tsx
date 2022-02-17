import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { PointerLockControls } from '@react-three/drei'
import * as THREE from 'three'

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

type FirstPersonWalkingControlsProps = {
  /** The height of the character in meters. */
  height?: number
}

export const FirstPersonWalkingControls = (
  props: FirstPersonWalkingControlsProps
) => {
  const keysRef = useRef<keyState>({ w: false, a: false, s: false, d: false })
  const cameraDirRef = useRef(new THREE.Vector3())

  useEffect(() => {
    document.addEventListener('keydown', (e) => handleKeyDown(e, keysRef))
    document.addEventListener('keyup', (e) => handleKeyUp(e, keysRef))

    return () => {
      document.removeEventListener('keydown', (e) => handleKeyDown(e, keysRef))
      document.removeEventListener('keyup', (e) => handleKeyUp(e, keysRef))
    }
  })

  useFrame((state, delta) => {
    const { camera } = state
    const keys = keysRef.current
    const cameraDir = cameraDirRef.current
    const speed = delta * 10

    camera.position.y = props.height || 1.5
    camera.getWorldDirection(cameraDir)
    cameraDir.y = 0
    cameraDir.normalize()
    cameraDir.multiplyScalar(speed)

    if (keys.w) {
      camera.position.add(cameraDir)
    }
    if (keys.s) {
      camera.position.sub(cameraDir)
    }
    if (keys.a) {
      camera.position.sub(cameraDir.clone().cross(new THREE.Vector3(0, 1, 0)))
    }
    if (keys.d) {
      camera.position.add(cameraDir.clone().cross(new THREE.Vector3(0, 1, 0)))
    }
  })

  return <PointerLockControls />
}

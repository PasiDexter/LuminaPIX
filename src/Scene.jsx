import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useScroll, Image, Text, Environment } from '@react-three/drei'
import * as THREE from 'three'

const IMAGES = [
  "/wedding.jpg",
  "/event.jpg",
  "/birthday.jpg",
  "/others.jpg"
]

function GalleryItem({ url, position, scale, text, fontSize = 0.3 }) {
  const ref = useRef()
  
  useFrame((state) => {
    if (!ref.current) return
    // Subtle floating animation
    const t = state.clock.getElapsedTime()
    ref.current.position.y = position[1] + Math.sin(t + position[0]) * 0.08
    // Look at camera slightly
    ref.current.lookAt(state.camera.position)
  })

  return (
    <group position={position}>
      <Image ref={ref} url={url} scale={scale} transparent opacity={0.92} />
      <Text 
        position={[0, -scale[1]/2 - 0.4, 0.1]}
        fontSize={fontSize}
        color="white"
        anchorX="center"
        anchorY="top"
        maxWidth={scale[0] * 1.2}
        textAlign="center"
      >
        {text}
      </Text>
    </group>
  )
}

function CameraRig() {
  const scroll = useScroll()
  const hasRedirected = useRef(false)
  const { viewport } = useThree()
  const isMobile = viewport.width < 5.5
  
  useFrame((state) => {
    // Redirect when scrolling reaches the end
    if (scroll.offset > 0.95 && !hasRedirected.current) {
      hasRedirected.current = true
      // Redirect to the Luminapix Studio page
      window.location.href = "/matrix.html";
    }

    // As user scrolls down (0 to 1), move camera on Z axis deeply into the scene
    const targetZ = -scroll.offset * 24
    
    // Smooth camera interpolation
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.1)
    
    // Add subtle wobble (calibrated for mobile viewport to prevent clipping)
    const t = state.clock.getElapsedTime()
    const wobbleFactor = isMobile ? 0.15 : 0.5
    state.camera.position.x = Math.sin(t * 0.5) * wobbleFactor
    state.camera.position.y = Math.cos(t * 0.3) * wobbleFactor
  })
  return null
}

export default function Scene() {
  const { viewport } = useThree()
  const isMobile = viewport.width < 5.5

  // Mobile-responsive scale: fit snugly inside narrow screens without clipping
  const cardScale = isMobile
    ? [Math.min(2.7, viewport.width * 0.86), Math.min(2.7, viewport.width * 0.86)]
    : [4, 4]
  const textSize = isMobile ? 0.22 : 0.3

  // On mobile screens, center items horizontally so they stay 100% visible
  const pos0 = isMobile ? [0, 0, 0] : [-2, 0, 0]
  const pos1 = isMobile ? [0, 0.2, -7] : [2.5, 1, -7]
  const pos2 = isMobile ? [0, -0.2, -14] : [-3, -1, -14]
  const pos3 = isMobile ? [0, 0, -21] : [3, 0, -21]

  return (
    <>
      <color attach="background" args={['#020202']} />
      
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      
      {/* Fog to hide objects in distance */}
      <fog attach="fog" args={['#020202', 10, 50]} />

      <group position={[0, 0, -2]}>
        <GalleryItem url={IMAGES[0]} position={pos0} scale={cardScale} text="01 // WEDDING" fontSize={textSize} />
        <GalleryItem url={IMAGES[1]} position={pos1} scale={cardScale} text="02 // EVENT" fontSize={textSize} />
        <GalleryItem url={IMAGES[2]} position={pos2} scale={cardScale} text="03 // BIRTHDAY SHOOT" fontSize={textSize} />
        <GalleryItem url={IMAGES[3]} position={pos3} scale={cardScale} text="04 // OTHERS" fontSize={textSize} />
      </group>
      
      {/* Floating particles */}
      <instancedMesh args={[null, null, isMobile ? 60 : 100]} position={[0,0,-10]}>
        <sphereGeometry args={[0.02]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
      </instancedMesh>
      
      <CameraRig />
      
      <Environment preset="city" />
    </>
  )
}

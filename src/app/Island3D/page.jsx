'use client'

import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

// Simple test component
function Box() {
  const [hovered, setHovered] = useState(false)
  
  return (
    <mesh
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

export default function Island3D() {
  return (
    <div className="w-full h-screen bg-gray-900">
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Box />
        <OrbitControls />
      </Canvas>
      
      <div className="absolute top-4 left-4 text-white bg-black/50 p-4 rounded">
        <h1 className="text-2xl font-bold">3D Test Scene</h1>
        <p>If you see an orange box, Three.js is working!</p>
      </div>
    </div>
  )
}

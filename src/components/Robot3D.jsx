import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'

function RobotModel({ mousePosition }) {
  const groupRef = useRef()
  const headRef = useRef()
  const leftEyeRef = useRef()
  const rightEyeRef = useRef()

  useFrame((state) => {
    if (groupRef.current) {
      // Smooth rotation based on mouse
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mousePosition.x * 0.5,
        0.1
      )
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        mousePosition.y * 0.3,
        0.1
      )
    }

    // Head follows mouse more
    if (headRef.current) {
      headRef.current.rotation.y = mousePosition.x * 0.3
      headRef.current.rotation.x = mousePosition.y * 0.2
    }

    // Eyes look at mouse
    if (leftEyeRef.current && rightEyeRef.current) {
      const eyeX = mousePosition.x * 0.1
      const eyeY = mousePosition.y * 0.1
      leftEyeRef.current.position.x = eyeX
      leftEyeRef.current.position.y = eyeY
      rightEyeRef.current.position.x = eyeX
      rightEyeRef.current.position.y = eyeY
    }

    // Floating animation
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Head */}
      <group ref={headRef} position={[0, 1.2, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.8, 0.8, 0.8]} />
          <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Antenna */}
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.3]} />
          <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={0.5} />
        </mesh>
        <mesh position={[0, 0.7, 0]}>
          <sphereGeometry args={[0.08]} />
          <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={1} />
        </mesh>

        {/* Eyes */}
        <group position={[-0.2, 0.1, 0.41]}>
          <mesh>
            <boxGeometry args={[0.15, 0.2, 0.05]} />
            <meshStandardMaterial color="#000000" />
          </mesh>
          <mesh ref={leftEyeRef} position={[0, 0, 0.03]}>
            <sphereGeometry args={[0.06]} />
            <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.8} />
          </mesh>
        </group>
        
        <group position={[0.2, 0.1, 0.41]}>
          <mesh>
            <boxGeometry args={[0.15, 0.2, 0.05]} />
            <meshStandardMaterial color="#000000" />
          </mesh>
          <mesh ref={rightEyeRef} position={[0, 0, 0.03]}>
            <sphereGeometry args={[0.06]} />
            <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.8} />
          </mesh>
        </group>

        {/* Mouth */}
        <mesh position={[0, -0.2, 0.41]}>
          <boxGeometry args={[0.3, 0.08, 0.05]} />
          <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={0.3} />
        </mesh>
      </group>

      {/* Neck */}
      <mesh position={[0, 0.9, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.2]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Body */}
      <mesh position={[0, 0.4, 0]} castShadow>
        <boxGeometry args={[1, 0.8, 0.6]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Chest Panel */}
      <mesh position={[0, 0.4, 0.31]}>
        <boxGeometry args={[0.6, 0.5, 0.05]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Status Lights */}
      {[-0.15, 0, 0.15].map((x, i) => (
        <mesh key={i} position={[x, 0.55, 0.34]}>
          <sphereGeometry args={[0.04]} />
          <meshStandardMaterial 
            color={i === 0 ? "#a855f7" : i === 1 ? "#ec4899" : "#06b6d4"}
            emissive={i === 0 ? "#a855f7" : i === 1 ? "#ec4899" : "#06b6d4"}
            emissiveIntensity={0.8}
          />
        </mesh>
      ))}

      {/* Arms */}
      <group position={[-0.6, 0.5, 0]}>
        <mesh rotation={[0, 0, 0.3]}>
          <cylinderGeometry args={[0.08, 0.08, 0.6]} />
          <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, -0.4, 0]}>
          <sphereGeometry args={[0.12]} />
          <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>

      <group position={[0.6, 0.5, 0]}>
        <mesh rotation={[0, 0, -0.3]}>
          <cylinderGeometry args={[0.08, 0.08, 0.6]} />
          <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, -0.4, 0]}>
          <sphereGeometry args={[0.12]} />
          <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>

      {/* Legs */}
      <group position={[-0.25, -0.3, 0]}>
        <mesh>
          <cylinderGeometry args={[0.12, 0.12, 0.6]} />
          <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, -0.4, 0]}>
          <boxGeometry args={[0.2, 0.1, 0.3]} />
          <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>

      <group position={[0.25, -0.3, 0]}>
        <mesh>
          <cylinderGeometry args={[0.12, 0.12, 0.6]} />
          <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, -0.4, 0]}>
          <boxGeometry args={[0.2, 0.1, 0.3]} />
          <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
    </group>
  )
}

export default function Robot3D() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    setMousePosition({
      x: (e.clientX / window.innerWidth - 0.5) * 2,
      y: -(e.clientY / window.innerHeight - 0.5) * 2,
    })
  }

  return (
    <div 
      className="fixed bottom-0 right-0 w-96 h-96 pointer-events-none z-40 hidden lg:block"
      onMouseMove={handleMouseMove}
    >
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 1, 4]} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <RobotModel mousePosition={mousePosition} />
      </Canvas>
    </div>
  )
}

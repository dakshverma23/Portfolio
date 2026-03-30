import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

const Character = ({ position = [0, 0.5, 0] }) => {
  const characterRef = useRef()

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    // Subtle breathing animation
    characterRef.current.scale.y = 1 + Math.sin(time * 2) * 0.02
  })

  return (
    <group ref={characterRef} position={position}>
      {/* Body */}
      <mesh position={[0, 0.3, 0]} castShadow>
        <capsuleGeometry args={[0.15, 0.4, 8, 16]} />
        <meshStandardMaterial color="#3b82f6" roughness={0.5} />
      </mesh>

      {/* Head */}
      <mesh position={[0, 0.8, 0]} castShadow>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#fbbf24" roughness={0.4} />
      </mesh>

      {/* Arms */}
      <mesh position={[-0.2, 0.4, 0]} rotation={[0, 0, 0.3]} castShadow>
        <capsuleGeometry args={[0.05, 0.3, 8, 16]} />
        <meshStandardMaterial color="#3b82f6" roughness={0.5} />
      </mesh>
      <mesh position={[0.2, 0.4, 0]} rotation={[0, 0, -0.3]} castShadow>
        <capsuleGeometry args={[0.05, 0.3, 8, 16]} />
        <meshStandardMaterial color="#3b82f6" roughness={0.5} />
      </mesh>

      {/* Legs */}
      <mesh position={[-0.08, 0, 0]} castShadow>
        <capsuleGeometry args={[0.06, 0.25, 8, 16]} />
        <meshStandardMaterial color="#1e40af" roughness={0.5} />
      </mesh>
      <mesh position={[0.08, 0, 0]} castShadow>
        <capsuleGeometry args={[0.06, 0.25, 8, 16]} />
        <meshStandardMaterial color="#1e40af" roughness={0.5} />
      </mesh>
    </group>
  )
}

export default Character

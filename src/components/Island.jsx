import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

const Island = () => {
  const islandRef = useRef()
  const grassRef = useRef()

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    // Floating animation
    if (islandRef.current) {
      islandRef.current.position.y = Math.sin(time * 0.5) * 0.1
    }
  })

  return (
    <group ref={islandRef}>
      {/* Main island base */}
      <mesh position={[0, -0.5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[2, 1.5, 1, 8]} />
        <meshStandardMaterial color="#8B7355" roughness={0.8} />
      </mesh>

      {/* Grass top */}
      <mesh ref={grassRef} position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[2.1, 2, 0.2, 32]} />
        <meshStandardMaterial color="#4a7c59" roughness={0.9} />
      </mesh>

      {/* Rocks */}
      <mesh position={[-1.2, 0.1, 0.8]} castShadow>
        <dodecahedronGeometry args={[0.15, 0]} />
        <meshStandardMaterial color="#6B6B6B" roughness={0.7} />
      </mesh>
      <mesh position={[1.5, 0.1, -0.5]} castShadow>
        <dodecahedronGeometry args={[0.12, 0]} />
        <meshStandardMaterial color="#7A7A7A" roughness={0.7} />
      </mesh>

      {/* Small trees */}
      {[...Array(5)].map((_, i) => {
        const angle = (i / 5) * Math.PI * 2
        const radius = 1.3 + Math.random() * 0.3
        return (
          <group key={i} position={[Math.cos(angle) * radius, 0.2, Math.sin(angle) * radius]}>
            {/* Tree trunk */}
            <mesh castShadow>
              <cylinderGeometry args={[0.05, 0.05, 0.3, 8]} />
              <meshStandardMaterial color="#5C4033" />
            </mesh>
            {/* Tree foliage */}
            <mesh position={[0, 0.3, 0]} castShadow>
              <coneGeometry args={[0.15, 0.3, 8]} />
              <meshStandardMaterial color="#2d5016" />
            </mesh>
          </group>
        )
      })}
    </group>
  )
}

export default Island

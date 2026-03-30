import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, RoundedBox } from '@react-three/drei'

const ProjectBoard = ({ project, position = [0, 1.2, 0.3], onClick }) => {
  const boardRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    // Gentle glow pulse
    if (boardRef.current) {
      boardRef.current.material.emissiveIntensity = 0.2 + Math.sin(time * 2) * 0.1
    }
  })

  return (
    <group position={position}>
      {/* Board stand */}
      <mesh position={[0, -0.3, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.6, 8]} />
        <meshStandardMaterial color="#4a5568" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Board */}
      <RoundedBox
        ref={boardRef}
        args={[1.2, 0.7, 0.05]}
        radius={0.05}
        smoothness={4}
        castShadow
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onClick}
      >
        <meshStandardMaterial
          color={hovered ? "#60a5fa" : "#1e293b"}
          emissive="#06b6d4"
          emissiveIntensity={0.2}
          metalness={0.3}
          roughness={0.4}
          transparent
          opacity={0.95}
        />
      </RoundedBox>

      {/* Project Title */}
      <Text
        position={[0, 0.15, 0.03]}
        fontSize={0.12}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={1}
      >
        {project.title}
      </Text>

      {/* GitHub Icon/Text */}
      <Text
        position={[0, -0.1, 0.03]}
        fontSize={0.08}
        color="#a855f7"
        anchorX="center"
        anchorY="middle"
      >
        🔗 GitHub
      </Text>

      {/* Glow effect border */}
      {hovered && (
        <RoundedBox args={[1.25, 0.75, 0.04]} radius={0.05} smoothness={4}>
          <meshBasicMaterial color="#06b6d4" transparent opacity={0.3} />
        </RoundedBox>
      )}
    </group>
  )
}

export default ProjectBoard

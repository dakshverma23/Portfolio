import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'

const ProjectImage = ({ position = [3, 0.5, 0], project }) => {
  const imageRef = useRef()

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    // Floating animation
    imageRef.current.position.y = position[1] + Math.sin(time * 0.8) * 0.1
  })

  return (
    <group ref={imageRef} position={position}>
      {/* Image frame */}
      <RoundedBox args={[1.6, 1.2, 0.1]} radius={0.05} smoothness={4} castShadow>
        <meshStandardMaterial
          color="#1e293b"
          metalness={0.5}
          roughness={0.3}
          emissive="#a855f7"
          emissiveIntensity={0.1}
        />
      </RoundedBox>

      {/* Image placeholder (you can replace with actual texture) */}
      <mesh position={[0, 0, 0.06]}>
        <planeGeometry args={[1.4, 1]} />
        <meshStandardMaterial color="#334155" />
      </mesh>

      {/* Glow border */}
      <RoundedBox args={[1.65, 1.25, 0.08]} radius={0.05} smoothness={4}>
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.2} />
      </RoundedBox>
    </group>
  )
}

export default ProjectImage

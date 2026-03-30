import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'

function SimpleIsland() {
  return (
    <group>
      {/* Island base */}
      <mesh position={[0, -0.5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[2, 1.5, 1, 8]} />
        <meshStandardMaterial color="#8B7355" />
      </mesh>

      {/* Grass top */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[2.1, 2, 0.2, 32]} />
        <meshStandardMaterial color="#4a7c59" />
      </mesh>

      {/* Character */}
      <group position={[0, 0.5, 0]}>
        <mesh position={[0, 0.3, 0]} castShadow>
          <capsuleGeometry args={[0.15, 0.4, 8, 16]} />
          <meshStandardMaterial color="#3b82f6" />
        </mesh>
        <mesh position={[0, 0.8, 0]} castShadow>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#fbbf24" />
        </mesh>
      </group>
    </group>
  )
}

const Simple3DIsland = () => {
  return (
    <div className="w-full h-screen bg-gradient-to-b from-[#0a0a0f] via-[#1a1a2e] to-[#0a0a0f]">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 3, 8]} fov={50} />
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
          <SimpleIsland />
          <OrbitControls enablePan={false} />
        </Suspense>
      </Canvas>
      
      <div className="absolute top-8 left-8 glass backdrop-blur-xl rounded-2xl px-6 py-4 border border-white/20">
        <h2 className="text-white text-2xl font-bold mb-2">3D Island Portfolio</h2>
        <p className="text-gray-300">Drag to rotate • Scroll to zoom</p>
      </div>
    </div>
  )
}

export default Simple3DIsland

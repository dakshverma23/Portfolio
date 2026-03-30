import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment, Stars } from '@react-three/drei'
import * as THREE from 'three'

// Low-poly island with smooth colors
function Island() {
  const islandRef = useRef()
  
  useFrame((state) => {
    if (islandRef.current) {
      islandRef.current.rotation.y += 0.002
      islandRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05
    }
  })

  return (
    <group ref={islandRef}>
      {/* Main island base - underwater part */}
      <mesh position={[0, -1.5, 0]} castShadow receiveShadow>
        <coneGeometry args={[3, 3, 6]} />
        <meshStandardMaterial color="#4a5f8f" flatShading />
      </mesh>

      {/* Island surface */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[2.5, 2.8, 0.5, 6]} />
        <meshStandardMaterial color="#5a7fb8" flatShading />
      </mesh>

      {/* Grass layer */}
      <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[2.5, 2.5, 0.1, 6]} />
        <meshStandardMaterial color="#6b8fc9" flatShading />
      </mesh>

      {/* Trees */}
      {[
        { pos: [-1.2, 0.3, 0.8], scale: 1 },
        { pos: [1.5, 0.3, -0.5], scale: 0.8 },
        { pos: [0.5, 0.3, 1.5], scale: 1.2 },
        { pos: [-1, 0.3, -1.2], scale: 0.9 },
        { pos: [1.8, 0.3, 1], scale: 0.7 },
      ].map((tree, i) => (
        <group key={i} position={tree.pos} scale={tree.scale}>
          {/* Trunk */}
          <mesh castShadow>
            <cylinderGeometry args={[0.08, 0.1, 0.6, 5]} />
            <meshStandardMaterial color="#3d4d6b" flatShading />
          </mesh>
          {/* Foliage - cone shape */}
          <mesh position={[0, 0.5, 0]} castShadow>
            <coneGeometry args={[0.3, 0.8, 5]} />
            <meshStandardMaterial color="#2d3d5b" flatShading />
          </mesh>
        </group>
      ))}

      {/* Small rocks */}
      {[
        { pos: [-1.8, 0.35, 0.3], scale: 0.15 },
        { pos: [1.2, 0.35, 1.2], scale: 0.12 },
        { pos: [-0.5, 0.35, -1.5], scale: 0.18 },
      ].map((rock, i) => (
        <mesh key={i} position={rock.pos} castShadow scale={rock.scale}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#4a5a7a" flatShading />
        </mesh>
      ))}

      {/* Character on island */}
      <group position={[0.5, 0.5, 0.5]}>
        {/* Body */}
        <mesh castShadow>
          <boxGeometry args={[0.3, 0.5, 0.2]} />
          <meshStandardMaterial color="#e67e5f" flatShading />
        </mesh>
        {/* Head */}
        <mesh position={[0, 0.4, 0]} castShadow>
          <boxGeometry args={[0.25, 0.25, 0.25]} />
          <meshStandardMaterial color="#f5a88f" flatShading />
        </mesh>
        {/* Arms */}
        <mesh position={[-0.2, 0, 0]} castShadow>
          <boxGeometry args={[0.1, 0.4, 0.1]} />
          <meshStandardMaterial color="#e67e5f" flatShading />
        </mesh>
        <mesh position={[0.2, 0, 0]} castShadow>
          <boxGeometry args={[0.1, 0.4, 0.1]} />
          <meshStandardMaterial color="#e67e5f" flatShading />
        </mesh>
      </group>

      {/* Small house */}
      <group position={[-1, 0.3, 0]}>
        {/* House base */}
        <mesh castShadow>
          <boxGeometry args={[0.8, 0.6, 0.6]} />
          <meshStandardMaterial color="#c85a4a" flatShading />
        </mesh>
        {/* Roof */}
        <mesh position={[0, 0.5, 0]} castShadow>
          <coneGeometry args={[0.6, 0.4, 4]} />
          <meshStandardMaterial color="#a84a3a" flatShading />
        </mesh>
        {/* Door */}
        <mesh position={[0.41, -0.1, 0]} castShadow>
          <boxGeometry args={[0.02, 0.3, 0.2]} />
          <meshStandardMaterial color="#3d4d6b" flatShading />
        </mesh>
      </group>
    </group>
  )
}

// Floating particles
function FloatingParticles() {
  const particlesRef = useRef()
  
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < 50; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 15,
          Math.random() * 8,
          (Math.random() - 0.5) * 15
        ],
        scale: Math.random() * 0.5 + 0.1
      })
    }
    return temp
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.children.forEach((particle, i) => {
        particle.position.y += Math.sin(state.clock.elapsedTime + i) * 0.001
        if (particle.position.y > 8) particle.position.y = 0
      })
    }
  })

  return (
    <group ref={particlesRef}>
      {particles.map((particle, i) => (
        <mesh key={i} position={particle.position} scale={particle.scale}>
          <sphereGeometry args={[0.05, 4, 4]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  )
}

// Water plane
function Water() {
  const waterRef = useRef()
  
  useFrame((state) => {
    if (waterRef.current) {
      waterRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05 - 0.5
    }
  })

  return (
    <mesh ref={waterRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
      <circleGeometry args={[10, 32]} />
      <meshStandardMaterial 
        color="#3d5a8f" 
        transparent 
        opacity={0.8}
        flatShading
      />
    </mesh>
  )
}

const BeautifulIsland = () => {
  return (
    <div className="w-full h-screen bg-gradient-to-b from-[#5a7fb8] via-[#6b8fc9] to-[#7a9fd9]">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[5, 4, 8]} fov={50} />
        
        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <pointLight position={[-5, 5, -5]} intensity={0.3} color="#a8c0ff" />

        {/* Stars background */}
        <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={0.5} />

        {/* Scene elements */}
        <Island />
        <Water />
        <FloatingParticles />

        {/* Controls */}
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={6}
          maxDistance={15}
          maxPolarAngle={Math.PI / 2.2}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>

      {/* UI Overlay */}
      <div className="absolute top-8 left-8 glass backdrop-blur-xl rounded-2xl px-6 py-4 border border-white/30 max-w-md">
        <h2 className="text-white text-3xl font-bold mb-2">3D Portfolio Island</h2>
        <p className="text-white/90 text-sm mb-3">
          Explore my projects in an immersive 3D environment
        </p>
        <div className="flex gap-2 text-xs text-white/70">
          <span>🖱️ Drag to rotate</span>
          <span>•</span>
          <span>🔍 Scroll to zoom</span>
        </div>
      </div>

      {/* Project info card */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 glass backdrop-blur-xl rounded-2xl px-8 py-6 border border-white/30 max-w-2xl">
        <h3 className="text-white text-2xl font-bold mb-2">Featured Project</h3>
        <p className="text-white/90 mb-4">
          Interactive 3D portfolio showcasing projects in a beautiful low-poly island environment
        </p>
        <div className="flex gap-3">
          <button className="px-6 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white transition-all">
            View Project
          </button>
          <button className="px-6 py-2 bg-gradient-to-r from-purple-500/80 to-pink-500/80 hover:from-purple-600/80 hover:to-pink-600/80 rounded-lg text-white transition-all">
            GitHub
          </button>
        </div>
      </div>
    </div>
  )
}

export default BeautifulIsland

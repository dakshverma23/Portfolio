import { useState, useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, PerspectiveCamera, Cloud } from '@react-three/drei'
import { AnimatePresence } from 'framer-motion'
import Island from './Island'
import Character from './Character'
import ProjectBoard from './ProjectBoard'
import ProjectImage from './ProjectImage'
import ProjectDetails from './ProjectDetails'
import Particles from './Particles'
import { islandProjects } from '../data/islandProjects'

const RotatingGroup = ({ children, autoRotate }) => {
  const groupRef = useRef()

  useFrame(() => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += 0.003
    }
  })

  return <group ref={groupRef}>{children}</group>
}

const IslandScene = () => {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0)
  const [autoRotate, setAutoRotate] = useState(true)

  const currentProject = islandProjects[currentProjectIndex]

  const handleBoardClick = () => {
    window.open(currentProject.github, '_blank')
  }

  const handleNextProject = () => {
    setCurrentProjectIndex((prev) => (prev + 1) % islandProjects.length)
  }

  const handlePrevProject = () => {
    setCurrentProjectIndex((prev) => (prev - 1 + islandProjects.length) % islandProjects.length)
  }

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-[#0a0a0f] via-[#1a1a2e] to-[#0a0a0f]">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 3, 8]} fov={50} />
        
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <pointLight position={[-5, 3, -5]} intensity={0.5} color="#a855f7" />
          <pointLight position={[5, 3, 5]} intensity={0.5} color="#ec4899" />

          {/* Environment */}
          <Environment preset="sunset" />
          
          {/* Clouds */}
          <Cloud position={[-4, 2, -5]} speed={0.2} opacity={0.3} />
          <Cloud position={[4, 3, -6]} speed={0.3} opacity={0.25} />
          <Cloud position={[0, 4, -8]} speed={0.25} opacity={0.2} />

          {/* Particles */}
          <Particles count={150} />

          {/* Main rotating group */}
          <RotatingGroup autoRotate={autoRotate}>
            <Island />
            <Character position={[-0.5, 0.5, 0]} />
            <ProjectBoard
              project={currentProject}
              position={[0.3, 1.2, 0.3]}
              onClick={handleBoardClick}
            />
            <ProjectImage position={[3, 0.5, 0]} project={currentProject} />
          </RotatingGroup>

          {/* Controls */}
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={5}
            maxDistance={15}
            maxPolarAngle={Math.PI / 2}
            onStart={() => setAutoRotate(false)}
            onEnd={() => setAutoRotate(true)}
          />
        </Suspense>
      </Canvas>

      {/* UI Overlay */}
      <AnimatePresence mode="wait">
        <ProjectDetails key={currentProject.id} project={currentProject} />
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2 flex flex-col gap-4 z-20">
        <button
          onClick={handlePrevProject}
          className="w-12 h-12 rounded-full glass backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-all duration-300 hover:scale-110"
          aria-label="Previous project"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={handleNextProject}
          className="w-12 h-12 rounded-full glass backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-all duration-300 hover:scale-110"
          aria-label="Next project"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Project Counter */}
      <div className="absolute top-8 right-8 glass backdrop-blur-xl rounded-full px-6 py-3 border border-white/20">
        <span className="text-white font-semibold">
          {currentProjectIndex + 1} / {islandProjects.length}
        </span>
      </div>

      {/* Instructions */}
      <div className="absolute top-8 left-8 glass backdrop-blur-xl rounded-2xl px-6 py-4 border border-white/20 max-w-xs">
        <p className="text-white text-sm">
          🖱️ Drag to rotate • 🔍 Scroll to zoom • 🎯 Click board to visit GitHub
        </p>
      </div>
    </div>
  )
}

export default IslandScene

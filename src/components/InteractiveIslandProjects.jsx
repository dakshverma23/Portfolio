'use client'

import { useRef, useState, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Stars, Html } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, X, Image as ImageIcon } from 'lucide-react'

const projectsData = [
  {
    id: 1,
    title: 'Human Activity Recognition (HAR) - Deep Learning',
    description: 'Advanced deep learning system for recognizing human activities from video sequences using CNN-LSTM architecture. Implements state-of-the-art techniques for temporal feature extraction and classification with high accuracy on benchmark datasets.',
    technologies: ['Python', 'TensorFlow', 'Keras', 'Deep Learning', 'CNN-LSTM', 'OpenCV'],
    github: 'https://github.com/dakshverma23/HAR-DL',
    image: '/project-images/har.jpg',
    color: '#a855f7',
    position: [-1.8, 0.3, 0.8],
  },
  {
    id: 2,
    title: 'CBIR - Content-Based Image Retrieval',
    description: 'Intelligent image retrieval system using deep learning and computer vision. Implements feature extraction with CNNs, similarity metrics, and efficient indexing for large-scale image search applications.',
    technologies: ['Python', 'Deep Learning', 'Computer Vision', 'OpenCV', 'NumPy', 'TensorFlow'],
    github: 'https://github.com/dakshverma23/CBIR',
    image: '/project-images/cbir.jpg',
    color: '#ec4899',
    position: [1.8, 0.3, -0.5],
  },
  {
    id: 3,
    title: 'E-BloodBank',
    description: 'Full-stack healthcare platform for blood bank management with donor registration, inventory tracking, and emergency request handling. Features real-time notifications, secure authentication, and admin dashboard.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Firebase', 'REST API'],
    github: 'https://github.com/dakshverma23/E-BloodBank',
    image: '/project-images/bloodbank.jpg',
    color: '#06b6d4',
    position: [0.5, 0.3, 1.8],
  },
  {
    id: 4,
    title: 'Food Ordering Platform',
    description: 'Modern e-commerce platform for online food ordering with dynamic menu management, shopping cart, order tracking, and payment integration. Built with responsive design and optimized performance.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'JavaScript', 'CSS3'],
    github: 'https://github.com/dakshverma23/Food-Ordering-Website',
    image: '/project-images/food.jpg',
    color: '#f59e0b',
    position: [-1.5, 0.3, -1.5],
  },
  {
    id: 5,
    title: 'BmuNest',
    description: 'Community platform for university students with content management, user authentication, and real-time updates. Features modern UI/UX and efficient data handling.',
    technologies: ['React', 'Node.js', 'JavaScript', 'CSS3', 'MongoDB'],
    github: 'https://github.com/dakshverma23/BmuNest',
    image: '/project-images/bmunest.jpg',
    color: '#10b981',
    position: [1.5, 0.3, 1.5],
  },
]

// Realistic Tree
function ProjectTree({ project, onClick, isSelected }) {
  const treeRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (treeRef.current) {
      treeRef.current.rotation.z = Math.sin(state.clock.elapsedTime + project.id) * 0.05
      
      if (isSelected) {
        treeRef.current.scale.setScalar(1.3 + Math.sin(state.clock.elapsedTime * 3) * 0.05)
      } else if (hovered) {
        treeRef.current.scale.setScalar(1.15)
      } else {
        treeRef.current.scale.setScalar(1)
      }
    }
  })

  return (
    <group
      ref={treeRef}
      position={project.position}
      onClick={(e) => {
        e.stopPropagation()
        onClick(project)
      }}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(true)
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        setHovered(false)
        document.body.style.cursor = 'auto'
      }}
    >
      <mesh castShadow position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.06, 0.12, 0.8, 8]} />
        <meshStandardMaterial color="#4a3728" roughness={0.9} />
      </mesh>
      
      <mesh position={[0, 0.7, 0]} castShadow>
        <coneGeometry args={[0.4, 0.6, 8]} />
        <meshStandardMaterial 
          color={isSelected || hovered ? project.color : '#2d5016'} 
          roughness={0.8}
          emissive={isSelected || hovered ? project.color : '#000000'}
          emissiveIntensity={isSelected || hovered ? 0.4 : 0}
        />
      </mesh>
      <mesh position={[0, 0.95, 0]} castShadow>
        <coneGeometry args={[0.32, 0.5, 8]} />
        <meshStandardMaterial 
          color={isSelected || hovered ? project.color : '#3a6b1f'} 
          roughness={0.8}
          emissive={isSelected || hovered ? project.color : '#000000'}
          emissiveIntensity={isSelected || hovered ? 0.3 : 0}
        />
      </mesh>
      <mesh position={[0, 1.15, 0]} castShadow>
        <coneGeometry args={[0.22, 0.4, 8]} />
        <meshStandardMaterial 
          color={isSelected || hovered ? project.color : '#4a7c28'} 
          roughness={0.8}
          emissive={isSelected || hovered ? project.color : '#000000'}
          emissiveIntensity={isSelected || hovered ? 0.2 : 0}
        />
      </mesh>

      {isSelected && (
        <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.5, 0.6, 32]} />
          <meshBasicMaterial color={project.color} transparent opacity={0.5} />
        </mesh>
      )}

      {hovered && !isSelected && (
        <Html position={[0, 1.6, 0]} center>
          <div className="bg-gray-900/90 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap pointer-events-none border border-purple-500/50 shadow-lg">
            {project.title}
          </div>
        </Html>
      )}
    </group>
  )
}

function Island({ onIslandClick }) {
  const islandRef = useRef()
  
  useFrame((state) => {
    if (islandRef.current) {
      islandRef.current.rotation.y += 0.001
      islandRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.03
    }
  })

  return (
    <group ref={islandRef} onClick={onIslandClick}>
      <mesh position={[0, -1.8, 0]} castShadow receiveShadow>
        <coneGeometry args={[3.5, 3.5, 8]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.9} />
      </mesh>
      <mesh position={[0, -0.3, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[3, 3.2, 1.2, 8]} />
        <meshStandardMaterial color="#2a2a3e" roughness={0.85} />
      </mesh>
      <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[2.8, 3, 0.3, 8]} />
        <meshStandardMaterial color="#3a3a4e" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[2.7, 2.7, 0.15, 32]} />
        <meshStandardMaterial color="#4a7c28" roughness={0.9} />
      </mesh>
      {[
        { pos: [-2, 0.4, 0.5], scale: 0.2 },
        { pos: [2.2, 0.4, -0.8], scale: 0.18 },
        { pos: [-1.5, 0.4, -1.8], scale: 0.15 },
        { pos: [1.8, 0.4, 1.5], scale: 0.22 },
      ].map((rock, i) => (
        <mesh key={i} position={rock.pos} castShadow scale={rock.scale}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#5a5a6a" roughness={0.9} />
        </mesh>
      ))}
      <group position={[0, 0.4, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.5, 0.4, 0.4]} />
          <meshStandardMaterial color="#6a4a3a" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.35, 0]} castShadow>
          <coneGeometry args={[0.4, 0.3, 4]} />
          <meshStandardMaterial color="#8a5a4a" roughness={0.8} />
        </mesh>
      </group>
    </group>
  )
}

function Water() {
  const waterRef = useRef()
  
  useFrame((state) => {
    if (waterRef.current) {
      waterRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.08 - 0.8
      waterRef.current.material.opacity = 0.7 + Math.sin(state.clock.elapsedTime) * 0.05
    }
  })

  return (
    <mesh ref={waterRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.8, 0]} receiveShadow>
      <circleGeometry args={[12, 64]} />
      <meshStandardMaterial 
        color="#1a3a5a" 
        transparent 
        opacity={0.7}
        roughness={0.1}
        metalness={0.3}
      />
    </mesh>
  )
}

function Ship({ position, rotation }) {
  const shipRef = useRef()
  
  useFrame((state) => {
    if (shipRef.current) {
      shipRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8 + position[0]) * 0.1
      shipRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.8) * 0.05
    }
  })

  return (
    <group ref={shipRef} position={position} rotation={[0, rotation, 0]}>
      <mesh castShadow>
        <boxGeometry args={[0.8, 0.3, 0.4]} />
        <meshStandardMaterial color="#5a3a2a" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 0.8, 8]} />
        <meshStandardMaterial color="#4a3a2a" />
      </mesh>
      <mesh position={[0, 0.5, 0.15]} castShadow>
        <boxGeometry args={[0.5, 0.6, 0.02]} />
        <meshStandardMaterial color="#e8d8c8" roughness={0.9} />
      </mesh>
    </group>
  )
}

function FloatingParticles() {
  const particlesRef = useRef()
  
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < 40; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 20,
          Math.random() * 10,
          (Math.random() - 0.5) * 20
        ],
      })
    }
    return temp
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.children.forEach((particle, i) => {
        particle.position.y += Math.sin(state.clock.elapsedTime + i) * 0.002
        if (particle.position.y > 10) particle.position.y = 0
      })
    }
  })

  return (
    <group ref={particlesRef}>
      {particles.map((particle, i) => (
        <mesh key={i} position={particle.position}>
          <sphereGeometry args={[0.04, 6, 6]} />
          <meshBasicMaterial color="#a8c0ff" transparent opacity={0.4} />
        </mesh>
      ))}
    </group>
  )
}

const InteractiveIslandProjects = () => {
  const [selectedProject, setSelectedProject] = useState(null)
  const controlsRef = useRef()

  const handleTreeClick = (project) => {
    setSelectedProject(project)
  }

  const handleCloseProject = () => {
    setSelectedProject(null)
  }

  return (
    <section id="projects" className="relative w-full h-screen bg-gradient-to-b from-[#0a0a0f] via-[#1a1a2e] to-[#0a0a0f]">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[6, 5, 10]} fov={50} />
        
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-8, 3, -8]} intensity={0.5} color="#a855f7" />
        <pointLight position={[8, 3, 8]} intensity={0.5} color="#06b6d4" />

        <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />

        <Island onIslandClick={() => setSelectedProject(null)} />
        <Water />
        <FloatingParticles />

        <Ship position={[-7, -0.5, 3]} rotation={Math.PI / 4} />
        <Ship position={[8, -0.5, -4]} rotation={-Math.PI / 3} />
        <Ship position={[5, -0.5, 8]} rotation={Math.PI / 2} />

        {projectsData.map((project) => (
          <ProjectTree
            key={project.id}
            project={project}
            onClick={handleTreeClick}
            isSelected={selectedProject?.id === project.id}
          />
        ))}

        <OrbitControls
          ref={controlsRef}
          enablePan={false}
          enableZoom={false}
          enableRotate={true}
          minDistance={7}
          maxDistance={18}
          maxPolarAngle={Math.PI / 2.2}
          autoRotate={!selectedProject}
          autoRotateSpeed={0.3}
          enableDamping={true}
          dampingFactor={0.05}
        />
      </Canvas>

      <AnimatePresence mode="wait">
        {selectedProject && (
          <motion.div
            key={selectedProject.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md z-50"
            onClick={handleCloseProject}
          >
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              exit={{ y: 20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="glass backdrop-blur-xl rounded-3xl p-8 border border-purple-500/50 shadow-2xl shadow-purple-500/20 relative max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleCloseProject}
                className="absolute top-6 right-6 p-2 hover:bg-white/20 rounded-full transition-all z-10"
              >
                <X size={24} className="text-white" />
              </button>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="relative">
                  <div className="aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center">
                    {selectedProject.image ? (
                      <img 
                        src={selectedProject.image} 
                        alt={selectedProject.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none'
                          e.target.nextSibling.style.display = 'flex'
                        }}
                      />
                    ) : null}
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <ImageIcon size={48} className="mb-2 opacity-50" />
                      <p className="text-sm">Project Image</p>
                      <p className="text-xs mt-1">Add to: /public/project-images/</p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-start gap-3 mb-4">
                    <div
                      className="w-4 h-4 rounded-full mt-1 flex-shrink-0"
                      style={{ 
                        backgroundColor: selectedProject.color, 
                        boxShadow: `0 0 20px ${selectedProject.color}` 
                      }}
                    />
                    <h3 className="text-white text-3xl font-bold leading-tight">
                      {selectedProject.title}
                    </h3>
                  </div>

                  <p className="text-gray-300 leading-relaxed mb-6">
                    {selectedProject.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="text-white font-semibold mb-3">Technologies Used:</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 bg-purple-500/20 text-purple-300 rounded-lg text-sm border border-purple-500/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-purple-500/50"
                  >
                    <Github size={24} />
                    <span className="font-semibold">View on GitHub</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default InteractiveIslandProjects

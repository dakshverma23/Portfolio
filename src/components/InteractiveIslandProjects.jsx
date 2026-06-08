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
    position: [-1.7, 0.3, 0.9],
  },
  {
    id: 2,
    title: 'CBIR - Content-Based Image Retrieval',
    description: 'Intelligent image retrieval system using deep learning and computer vision. Implements feature extraction with CNNs, similarity metrics, and efficient indexing for large-scale image search applications.',
    technologies: ['Python', 'Deep Learning', 'Computer Vision', 'OpenCV', 'NumPy', 'TensorFlow'],
    github: 'https://github.com/dakshverma23/CBIR',
    image: '/project-images/cbir.jpg',
    color: '#ec4899',
    position: [1.7, 0.3, -0.7],
  },
  {
    id: 3,
    title: 'E-BloodBank',
    description: 'Full-stack healthcare platform for blood bank management with donor registration, inventory tracking, and emergency request handling. Features real-time notifications, secure authentication, and admin dashboard.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Firebase', 'REST API'],
    github: 'https://github.com/dakshverma23/E-BloodBank',
    image: '/project-images/bloodbank.jpg',
    color: '#06b6d4',
    position: [0.6, 0.3, 1.8],
  },
  {
    id: 4,
    title: 'Food Ordering Platform',
    description: 'Modern e-commerce platform for online food ordering with dynamic menu management, shopping cart, order tracking, and payment integration. Built with responsive design and optimized performance.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'JavaScript', 'CSS3'],
    github: 'https://github.com/dakshverma23/Food-Ordering-Website',
    image: '/project-images/food.jpg',
    color: '#f59e0b',
    position: [-1.4, 0.3, -1.4],
  },
  {
    id: 5,
    title: 'BmuNest',
    description: 'Community platform for university students with content management, user authentication, and real-time updates. Features modern UI/UX and efficient data handling.',
    technologies: ['React', 'Node.js', 'JavaScript', 'CSS3', 'MongoDB'],
    github: 'https://github.com/dakshverma23/BmuNest',
    image: '/project-images/bmunest.jpg',
    color: '#10b981',
    position: [1.5, 0.3, 1.3],
  },
  {
    id: 6,
    title: 'Closet Rush',
    description: 'An interactive digital wardrobe planner and clothing organization assistant. Enables users to upload and organize their clothing items, design outfits, track item wear metrics, and gain personalized styling suggestions.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'TailwindCSS', 'Context API'],
    github: 'https://github.com/dakshverma23/ClosetRush',
    image: '/project-images/closetrush.jpg',
    color: '#f59e0b',
    position: [-1.8, 0.3, -0.4],
  },
  {
    id: 7,
    title: 'See Mee - Ethnic Fashion E-commerce',
    description: 'A comprehensive full-stack e-commerce experience showcasing women\'s ethnic suits. Adopts warm retro beach aesthetics and features shopping cart management, payment workflows, and an administrative control panel.',
    technologies: ['React 18', 'Vite', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Cloudinary', 'Framer Motion'],
    github: 'https://github.com/dakshverma23/SM',
    image: '/project-images/seemee.jpg',
    color: '#fb7185',
    position: [0.9, 0.3, -1.7],
  },
  {
    id: 8,
    title: 'ResearchAI - Autonomous Research Agent',
    description: 'An intelligent AI research companion that autonomously scans web data, Wikipedia articles, and news articles on any subject. Synthesizes findings using LLMs (Claude/GPT-4/Llama) and formats structured markdown reports.',
    technologies: ['React 18', 'TypeScript', 'TailwindCSS', 'Node.js', 'Express', 'OpenRouter API', 'Vite'],
    github: 'https://github.com/dakshverma23/Research_Assistant',
    image: '/project-images/research.jpg',
    color: '#6366f1',
    position: [-0.5, 0.3, 1.8],
  },
]

// Stylized Organic Deciduous Tree Model
function ProjectTree({ project, onClick, isSelected }) {
  const treeRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (treeRef.current) {
      // Wind sway animation
      treeRef.current.rotation.z = Math.sin(state.clock.elapsedTime + project.id) * 0.03
      treeRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.7 + project.id) * 0.02
      
      // Selection scaling bounce
      if (isSelected) {
        treeRef.current.scale.setScalar(1.25 + Math.sin(state.clock.elapsedTime * 3) * 0.04)
      } else if (hovered) {
        treeRef.current.scale.setScalar(1.12)
      } else {
        treeRef.current.scale.setScalar(1)
      }
    }
  })

  // Foliage cluster configurations
  const leafClusters = [
    { pos: [0, 0.85, 0], radius: 0.36, shadowOffset: 0 },
    { pos: [-0.22, 0.68, 0.06], radius: 0.25, shadowOffset: -1 }, // shadow (lower)
    { pos: [0.22, 0.74, 0.14], radius: 0.25, shadowOffset: -1 },  // shadow (lower)
    { pos: [0, 1.1, 0], radius: 0.28, shadowOffset: 1 },          // sunlight (top)
    { pos: [0.12, 0.82, 0.2], radius: 0.2, shadowOffset: 0 },
    { pos: [-0.12, 0.82, -0.2], radius: 0.2, shadowOffset: 0 },
  ]

  const getLeafColor = (cluster) => {
    if (isSelected || hovered) return project.color
    
    // Natural organic forest green shading
    if (cluster.shadowOffset === 1) return '#3d7b36' // bright crown
    if (cluster.shadowOffset === -1) return '#1b3e18' // dark base
    return '#295424' // standard mid-green
  }

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
      {/* Main Trunk */}
      <mesh castShadow position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.07, 0.11, 0.5, 8]} />
        <meshStandardMaterial color="#4a3525" roughness={0.9} />
      </mesh>

      {/* Trunk Branch Left */}
      <mesh castShadow position={[-0.1, 0.45, 0]} rotation={[0, 0, Math.PI / 6]}>
        <cylinderGeometry args={[0.045, 0.06, 0.3, 8]} />
        <meshStandardMaterial color="#4a3525" roughness={0.9} />
      </mesh>

      {/* Trunk Branch Right */}
      <mesh castShadow position={[0.1, 0.52, 0.08]} rotation={[-Math.PI / 9, 0, -Math.PI / 5]}>
        <cylinderGeometry args={[0.04, 0.055, 0.3, 8]} />
        <meshStandardMaterial color="#4a3525" roughness={0.9} />
      </mesh>

      {/* Foliage Clusters */}
      {leafClusters.map((cluster, index) => (
        <mesh 
          key={index} 
          position={cluster.pos} 
          castShadow
        >
          <sphereGeometry args={[cluster.radius, 12, 12]} />
          <meshStandardMaterial 
            color={getLeafColor(cluster)} 
            roughness={0.9}
            emissive={isSelected || hovered ? project.color : '#000000'}
            emissiveIntensity={isSelected || hovered ? 0.55 : 0}
          />
        </mesh>
      ))}

      {/* Selection Ring */}
      {isSelected && (
        <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.48, 0.56, 32]} />
          <meshBasicMaterial color={project.color} transparent opacity={0.65} />
        </mesh>
      )}

      {/* Hover Card */}
      {hovered && !isSelected && (
        <Html position={[0, 1.5, 0]} center>
          <div className="bg-gray-900/90 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap pointer-events-none border border-purple-500/50 shadow-lg select-none">
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
      islandRef.current.rotation.y += 0.0006
      islandRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.025
    }
  })

  return (
    <group ref={islandRef} onClick={onIslandClick}>
      {/* Lower dirt base */}
      <mesh position={[0, -1.8, 0]} castShadow receiveShadow>
        <coneGeometry args={[3.5, 3.5, 8]} />
        <meshStandardMaterial color="#1f1a26" roughness={0.95} />
      </mesh>
      <mesh position={[0, -0.3, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[3, 3.2, 1.2, 8]} />
        <meshStandardMaterial color="#2d2836" roughness={0.9} />
      </mesh>
      
      {/* Stone layers */}
      <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[2.8, 3, 0.3, 8]} />
        <meshStandardMaterial color="#3c3846" roughness={0.85} />
      </mesh>
      
      {/* Grass Top */}
      <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[2.7, 2.7, 0.15, 32]} />
        <meshStandardMaterial color="#3d6c28" roughness={0.92} />
      </mesh>

      {/* Land Rocks */}
      {[
        { pos: [-2, 0.4, 0.5], scale: 0.2 },
        { pos: [2.2, 0.4, -0.8], scale: 0.18 },
        { pos: [-1.5, 0.4, -1.8], scale: 0.15 },
        { pos: [1.8, 0.4, 1.5], scale: 0.22 },
      ].map((rock, i) => (
        <mesh key={i} position={rock.pos} castShadow scale={rock.scale}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#555562" roughness={0.85} />
        </mesh>
      ))}

      {/* Cozy Cottage/House */}
      <group position={[0, 0.4, 0]}>
        {/* Walls */}
        <mesh castShadow position={[0, 0.15, 0]}>
          <boxGeometry args={[0.45, 0.3, 0.45]} />
          <meshStandardMaterial color="#dfd8c7" roughness={0.7} />
        </mesh>
        
        {/* Wooden Door */}
        <mesh position={[0, 0.08, 0.226]}>
          <boxGeometry args={[0.12, 0.18, 0.02]} />
          <meshStandardMaterial color="#5a3d1b" roughness={0.85} />
        </mesh>
        
        {/* Windows with warm glow */}
        <mesh position={[0.226, 0.15, 0]}>
          <boxGeometry args={[0.02, 0.09, 0.12]} />
          <meshStandardMaterial color="#ffdf6d" roughness={0.2} emissive="#ffdf6d" emissiveIntensity={0.4} />
        </mesh>
        <mesh position={[-0.226, 0.15, 0]}>
          <boxGeometry args={[0.02, 0.09, 0.12]} />
          <meshStandardMaterial color="#ffdf6d" roughness={0.2} emissive="#ffdf6d" emissiveIntensity={0.4} />
        </mesh>

        {/* Roof (Clay shingle style) */}
        <mesh position={[0, 0.38, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
          <coneGeometry args={[0.38, 0.25, 4]} />
          <meshStandardMaterial color="#b24f2b" roughness={0.8} />
        </mesh>

        {/* Chimney */}
        <mesh position={[0.11, 0.32, 0.11]} castShadow>
          <cylinderGeometry args={[0.025, 0.025, 0.18, 8]} />
          <meshStandardMaterial color="#7a6b5a" roughness={0.9} />
        </mesh>
      </group>
    </group>
  )
}

function Water() {
  const waterRef = useRef()
  
  useFrame((state) => {
    if (waterRef.current) {
      // Gentle swell
      waterRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.05 - 0.78
      waterRef.current.material.opacity = 0.8 + Math.sin(state.clock.elapsedTime * 0.8) * 0.03
    }
  })

  return (
    <mesh ref={waterRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.78, 0]} receiveShadow>
      <circleGeometry args={[14, 64]} />
      {/* Highly reflective, deep metalness water for premium realism */}
      <meshStandardMaterial 
        color="#0b233a" 
        transparent 
        opacity={0.8}
        roughness={0.06}
        metalness={0.75}
      />
    </mesh>
  )
}

// Detailed wind-billowing sailboat model
function Ship({ position, rotation }) {
  const shipRef = useRef()
  
  useFrame((state) => {
    if (shipRef.current) {
      // Natural aquatic floating/tilting physics
      shipRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.7 + position[0]) * 0.04
      shipRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.7 + position[0]) * 0.03
      shipRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.5 + position[2]) * 0.02
    }
  })

  return (
    <group ref={shipRef} position={position} rotation={[0, rotation, 0]}>
      {/* Hull Main Deck */}
      <mesh castShadow position={[0, 0.05, 0]}>
        <boxGeometry args={[0.9, 0.12, 0.45]} />
        <meshStandardMaterial color="#543c2e" roughness={0.8} />
      </mesh>
      
      {/* Hull Pointed Nose (Bow) */}
      <mesh castShadow position={[0.42, 0.05, 0]} rotation={[0, Math.PI / 4, 0]}>
        <boxGeometry args={[0.32, 0.12, 0.32]} />
        <meshStandardMaterial color="#543c2e" roughness={0.8} />
      </mesh>
      
      {/* Cabin Structure */}
      <mesh castShadow position={[-0.15, 0.17, 0]}>
        <boxGeometry args={[0.4, 0.14, 0.3]} />
        <meshStandardMaterial color="#eae5d9" roughness={0.65} />
      </mesh>
      
      {/* Cabin Windows (Glass wrap) */}
      <mesh position={[-0.15, 0.17, 0]} scale={[1.02, 0.5, 1.02]}>
        <boxGeometry args={[0.3, 0.14, 0.3]} />
        <meshStandardMaterial color="#aeddec" roughness={0.15} metalness={0.9} transparent opacity={0.6} />
      </mesh>

      {/* Stern Board (Back) */}
      <mesh castShadow position={[-0.45, 0.08, 0]}>
        <boxGeometry args={[0.06, 0.18, 0.45]} />
        <meshStandardMaterial color="#3a2a20" roughness={0.8} />
      </mesh>

      {/* Mast (Main Pole) */}
      <mesh castShadow position={[0.15, 0.7, 0]}>
        <cylinderGeometry args={[0.012, 0.022, 1.3, 8]} />
        <meshStandardMaterial color="#2d1f10" roughness={0.9} />
      </mesh>

      {/* Boom (Horizontal Yard) */}
      <mesh castShadow position={[-0.15, 0.2, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.009, 0.009, 0.6, 8]} />
        <meshStandardMaterial color="#2d1f10" roughness={0.9} />
      </mesh>

      {/* Billowing Main Sail (Curved fabric cylinder - open-ended) */}
      <mesh castShadow position={[-0.12, 0.75, 0.02]} rotation={[0, -Math.PI / 6, 0]}>
        {/* cylinderGeometry args: [radTop, radBot, height, radialSeg, heightSeg, openEnded, thetaStart, thetaLength] */}
        <cylinderGeometry args={[0.02, 0.28, 1.0, 16, 1, true, 0, Math.PI / 1.5]} />
        {/* side={2} specifies DoubleSide so sails render from any camera viewpoint */}
        <meshStandardMaterial color="#f7f6f0" roughness={0.98} side={2} />
      </mesh>

      {/* Billowing Jib Sail (Front wind-catcher) */}
      <mesh castShadow position={[0.28, 0.6, 0.04]} rotation={[0, -Math.PI / 12, 0]}>
        <cylinderGeometry args={[0.01, 0.16, 0.7, 16, 1, true, 0, Math.PI / 1.5]} />
        <meshStandardMaterial color="#f7f6f0" roughness={0.98} side={2} />
      </mesh>

      {/* Small mast flag */}
      <mesh position={[0.15, 1.33, -0.04]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[0.04, 0.14, 3]} />
        <meshStandardMaterial color="#8a2be2" roughness={0.7} />
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
          Math.random() * 8,
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
        if (particle.position.y > 8) particle.position.y = 0
      })
    }
  })

  return (
    <group ref={particlesRef}>
      {particles.map((particle, i) => (
        <mesh key={i} position={particle.position}>
          <sphereGeometry args={[0.04, 6, 6]} />
          <meshBasicMaterial color="#a0c5fa" transparent opacity={0.4} />
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
          intensity={1.2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-8, 3, -8]} intensity={0.6} color="#a855f7" />
        <pointLight position={[8, 3, 8]} intensity={0.6} color="#06b6d4" />

        <Stars radius={100} depth={50} count={2200} factor={4.5} saturation={0} fade speed={1} />

        <Island onIslandClick={() => setSelectedProject(null)} />
        <Water />
        <FloatingParticles />

        {/* Sailboats drifting in the sea */}
        <Ship position={[-7.5, -0.5, 3.5]} rotation={Math.PI / 4} />
        <Ship position={[8.5, -0.5, -4.5]} rotation={-Math.PI / 3} />
        <Ship position={[5.5, -0.5, 8.5]} rotation={Math.PI / 2} />

        {/* 8 project trees placed harmoniously */}
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
          autoRotateSpeed={0.35}
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

import { useState, useEffect, useRef } from 'react'
import { Github, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import SectionTitle from './SectionTitle'

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredCard, setHoveredCard] = useState(null)
  const [showLava, setShowLava] = useState(false)
  const [revealedProjects, setRevealedProjects] = useState([])
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          setShowLava(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const handleLavaComplete = (projectId) => {
    setRevealedProjects(prev => [...prev, projectId])
  }

  const projects = [
    {
      id: 1,
      title: 'Human Activity Recognition (HAR) - Deep Learning',
      description: 'Advanced deep learning system for recognizing human activities from video sequences using CNN-LSTM architecture. Implements state-of-the-art techniques for temporal feature extraction and classification with high accuracy on benchmark datasets.',
      technologies: ['Python', 'TensorFlow', 'Keras', 'Deep Learning', 'CNN-LSTM', 'OpenCV'],
      github: 'https://github.com/dakshverma23/HAR-DL',
      demo: null,
      hasDemo: false,
      featured: true,
    },
    {
      id: 2,
      title: 'CBIR - Content-Based Image Retrieval',
      description: 'Intelligent image retrieval system using deep learning and computer vision. Implements feature extraction with CNNs, similarity metrics, and efficient indexing for large-scale image search applications.',
      technologies: ['Python', 'Deep Learning', 'Computer Vision', 'OpenCV', 'NumPy', 'TensorFlow'],
      github: 'https://github.com/dakshverma23/CBIR',
      demo: null,
      hasDemo: false,
      featured: true,
    },
    {
      id: 3,
      title: 'E-BloodBank',
      description: 'Full-stack healthcare platform for blood bank management with donor registration, inventory tracking, and emergency request handling. Features real-time notifications, secure authentication, and admin dashboard.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Firebase', 'REST API'],
      github: 'https://github.com/dakshverma23/E-BloodBank',
      demo: null,
      hasDemo: false,
      featured: true,
    },
    {
      id: 4,
      title: 'Food Ordering Platform',
      description: 'Modern e-commerce platform for online food ordering with dynamic menu management, shopping cart, order tracking, and payment integration. Built with responsive design and optimized performance.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'JavaScript', 'CSS3'],
      github: 'https://github.com/dakshverma23/Food-Ordering-Website',
      demo: null,
      hasDemo: false,
    },
    {
      id: 5,
      title: 'BmuNest',
      description: 'Community platform for university students with content management, user authentication, and real-time updates. Features modern UI/UX and efficient data handling.',
      technologies: ['React', 'Node.js', 'JavaScript', 'CSS3', 'MongoDB'],
      github: 'https://github.com/dakshverma23/BmuNest',
      demo: null,
      hasDemo: false,
    },
    {
      id: 6,
      title: 'Damn-k',
      description: 'Creative web showcase demonstrating advanced CSS animations, transitions, and modern UI patterns. Highlights expertise in frontend design and interactive user experiences.',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Animations'],
      github: 'https://github.com/dakshverma23/Damn-k',
      demo: null,
      hasDemo: false,
    },
  ]

  return (
    <section
      id="projects"
      ref={sectionRef}
      className={`py-20 px-6 relative bg-gradient-to-b from-gray-900 to-gray-800 transition-opacity duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="container mx-auto max-w-7xl">
        <SectionTitle subtitle="A collection of projects showcasing my skills in full-stack development and machine learning">
          My <span className="gradient-text">Projects</span>
        </SectionTitle>

        {/* Optimized Lava source */}
        {showLava && (
          <motion.div
            className="relative mx-auto w-24 h-24 mb-16"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Simplified volcanic crater */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(255, 120, 0, 0.8) 0%, rgba(200, 50, 0, 0.4) 60%, transparent 100%)',
                boxShadow: '0 0 40px rgba(255, 100, 0, 0.6)',
              }}
              animate={{
                scale: [1, 1.08, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Reduced bubbles - only 3 */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: '15px',
                  height: '15px',
                  background: 'radial-gradient(circle, rgba(255, 180, 0, 0.7), rgba(255, 80, 0, 0.3))',
                  left: `${30 + i * 20}%`,
                  top: `${40}%`,
                }}
                animate={{
                  y: [0, -8, 0],
                  scale: [1, 1.15, 1],
                  opacity: [0.5, 0.9, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              />
            ))}
          </motion.div>
        )}

        <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-700 relative ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          {projects.map((project, index) => (
            <div key={project.id} className="relative">
              {/* Smooth realistic lava flow */}
              {showLava && !revealedProjects.includes(project.id) && (
                <motion.div
                  className="absolute inset-0 z-20 flex items-center justify-center"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                >
                  {/* Realistic lava blob with smooth morphing */}
                  <motion.div
                    className="w-full h-full"
                    initial={{ 
                      scale: 0,
                      y: -150,
                      opacity: 0,
                    }}
                    animate={{ 
                      scale: [0, 0.4, 0.7, 1, 1],
                      y: [-150, -80, -40, 0, 0],
                      opacity: [0, 1, 1, 1, 0],
                    }}
                    transition={{
                      duration: 1.8,
                      delay: index * 0.35,
                      ease: [0.34, 1.56, 0.64, 1],
                    }}
                    onAnimationComplete={() => handleLavaComplete(project.id)}
                  >
                    {/* Lava blob with organic shape */}
                    <motion.div
                      className="w-full h-full rounded-2xl relative"
                      animate={{
                        borderRadius: [
                          '60% 40% 30% 70% / 60% 30% 70% 40%',
                          '40% 60% 50% 50% / 50% 60% 40% 60%',
                          '50% 50% 40% 60% / 55% 45% 55% 45%',
                          '20px',
                        ],
                      }}
                      transition={{
                        duration: 1.8,
                        delay: index * 0.35,
                        ease: "easeInOut"
                      }}
                      style={{
                        background: 'linear-gradient(135deg, #ff8800 0%, #ff4400 40%, #cc0000 100%)',
                        boxShadow: '0 0 50px rgba(255, 100, 0, 0.7), 0 0 80px rgba(255, 50, 0, 0.3)',
                      }}
                    >
                      {/* Inner glow for depth */}
                      <motion.div
                        className="absolute inset-4 rounded-2xl"
                        animate={{
                          opacity: [0.4, 0.7, 0.4],
                        }}
                        transition={{
                          duration: 1.2,
                          repeat: Infinity,
                        }}
                        style={{
                          background: 'radial-gradient(circle at 40% 40%, rgba(255, 220, 100, 0.5) 0%, transparent 60%)',
                        }}
                      />
                      
                      {/* Reduced sparks - only 6 */}
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1.5 h-1.5 rounded-full"
                          style={{
                            background: 'radial-gradient(circle, #ffee00, #ff6600)',
                            top: '50%',
                            left: '50%',
                          }}
                          animate={{
                            x: [0, (Math.cos(i * Math.PI / 3) * 60)],
                            y: [0, (Math.sin(i * Math.PI / 3) * 60)],
                            opacity: [1, 0],
                            scale: [1, 0.3],
                          }}
                          transition={{
                            duration: 1.2,
                            delay: index * 0.35 + 0.8,
                            ease: "easeOut"
                          }}
                        />
                      ))}
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}

              {/* Project card - revealed after lava animation */}
              <motion.div
                className={`group glass rounded-2xl p-6 transition-all duration-300 relative overflow-hidden ${
                  project.featured ? 'ring-2 ring-purple-500/50' : ''
                }`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={revealedProjects.includes(project.id) ? { 
                  opacity: 1, 
                  scale: 1,
                } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  rotateX: 5,
                  boxShadow: "0 20px 60px rgba(168, 85, 247, 0.4)"
                }}
                onHoverStart={() => setHoveredCard(project.id)}
                onHoverEnd={() => setHoveredCard(null)}
                style={{
                  transformStyle: "preserve-3d",
                  perspective: "1000px"
                }}
              >
                {/* Holographic overlay on hover */}
                {hoveredCard === project.id && (
                  <motion.div
                    className="absolute inset-0 holographic rounded-2xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    exit={{ opacity: 0 }}
                  />
                )}
                
                <div className="flex items-start justify-between mb-3">
                  <motion.h3 
                    className="text-2xl font-semibold text-purple-400 group-hover:text-purple-300 transition-colors flex-1"
                    animate={hoveredCard === project.id ? { x: [0, 5, 0] } : {}}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  >
                    {project.title}
                  </motion.h3>
                  {project.featured && (
                    <motion.span 
                      className="px-2 py-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded text-xs font-semibold"
                      animate={{ 
                        scale: hoveredCard === project.id ? [1, 1.1, 1] : 1,
                      }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    >
                      Featured
                    </motion.span>
                  )}
                </div>
                
                <p className="text-gray-300 mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-xs text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 glass rounded-lg"
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github size={18} />
                    <span className="text-sm">Code</span>
                  </motion.a>
                  {project.hasDemo && (
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg"
                      whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(168, 85, 247, 0.5)" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink size={18} />
                      <span className="text-sm">Live Demo</span>
                    </motion.a>
                  )}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects

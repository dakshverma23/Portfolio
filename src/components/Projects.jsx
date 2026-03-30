import { useState, useEffect, useRef } from 'react'
import { Github, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import SectionTitle from './SectionTitle'

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredCard, setHoveredCard] = useState(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
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

        <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-700 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className={`group glass rounded-2xl p-6 transition-all duration-300 relative overflow-hidden ${
                project.featured ? 'ring-2 ring-purple-500/50' : ''
              }`}
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
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
                  <motion.span
                    key={techIndex}
                    className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-xs text-gray-300"
                    whileHover={{ 
                      scale: 1.1,
                      borderColor: "rgba(168, 85, 247, 0.6)",
                    }}
                  >
                    {tech}
                  </motion.span>
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
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects

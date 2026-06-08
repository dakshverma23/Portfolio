'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { 
  SiReact, SiNodedotjs, SiPython, SiTensorflow, SiMongodb, 
  SiPytorch, SiJavascript, SiExpress, SiTailwindcss, SiPostgresql,
  SiKeras, SiDocker, SiGit, SiOpencv, SiTypescript, SiFirebase,
  SiHtml5, SiVite, SiPostman
} from 'react-icons/si'
import { FaBrain, FaCamera, FaNetworkWired, FaCss3Alt } from 'react-icons/fa'

const TechSphere = () => {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.15 })

  const allSkills = [
    { name: 'React', icon: SiReact, color: '#61dafb' },
    { name: 'Node.js', icon: SiNodedotjs, color: '#68a063' },
    { name: 'Python', icon: SiPython, color: '#3776ab' },
    { name: 'TensorFlow', icon: SiTensorflow, color: '#ff6f00' },
    { name: 'MongoDB', icon: SiMongodb, color: '#47a248' },
    { name: 'PyTorch', icon: SiPytorch, color: '#ee4c2c' },
    { name: 'JavaScript', icon: SiJavascript, color: '#f7df1e' },
    { name: 'Express', icon: SiExpress, color: '#ffffff' },
    { name: 'Tailwind', icon: SiTailwindcss, color: '#06b6d4' },
    { name: 'PostgreSQL', icon: SiPostgresql, color: '#336791' },
    { name: 'Keras', icon: SiKeras, color: '#d00000' },
    { name: 'Docker', icon: SiDocker, color: '#2496ed' },
    { name: 'Git', icon: SiGit, color: '#f05032' },
    { name: 'OpenCV', icon: SiOpencv, color: '#5c3ee8' },
    { name: 'TypeScript', icon: SiTypescript, color: '#3178c6' },
    { name: 'Firebase', icon: SiFirebase, color: '#ffca28' },
    { name: 'Deep Learning', icon: FaBrain, color: '#a855f7' },
    { name: 'Computer Vision', icon: FaCamera, color: '#ec4899' },
    { name: 'REST API', icon: FaNetworkWired, color: '#10b981' },
    { name: 'HTML', icon: SiHtml5, color: '#e34f26' },
    { name: 'CSS', icon: FaCss3Alt, color: '#1572b6' },
    { name: 'Vite', icon: SiVite, color: '#646cff' },
    { name: 'Postman', icon: SiPostman, color: '#ff6c37' },
  ]

  // Hexagonal grid positions (honeycomb pattern)
  const getHexPosition = (index) => {
    const spacing = 75
    
    const positions = [
      { q: 0, r: 0 },
      { q: 1, r: 0 }, { q: 1, r: -1 }, { q: 0, r: -1 },
      { q: -1, r: 0 }, { q: -1, r: 1 }, { q: 0, r: 1 },
      { q: 2, r: 0 }, { q: 2, r: -1 }, { q: 2, r: -2 },
      { q: 1, r: -2 }, { q: 0, r: -2 }, { q: -1, r: -1 },
      { q: -2, r: 0 }, { q: -2, r: 1 }, { q: -2, r: 2 },
      { q: -1, r: 2 }, { q: 0, r: 2 }, { q: 1, r: 1 },
      { q: 3, r: -1 }, { q: 2, r: 1 }, { q: 1, r: 2 },
      { q: -1, r: 3 }, { q: -2, r: 3 }
    ]

    const pos = positions[index] || { q: 0, r: 0 }
    const x = spacing * (3/2 * pos.q)
    const y = spacing * (Math.sqrt(3)/2 * pos.q + Math.sqrt(3) * pos.r)
    
    return { x, y }
  }

  return (
    <div ref={containerRef} className="relative min-h-[600px] flex items-center justify-center py-12 overflow-hidden">
      {/* Mobile & Tablet layout (below xl: 1280px) */}
      <div className="xl:hidden w-full max-w-4xl px-4 flex flex-col items-center gap-10">
        {/* Text Section */}
        <motion.div 
          className="w-full text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="glass rounded-2xl p-6 md:p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 gradient-text">
              Tech Arsenal
            </h3>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base">
              My expertise spans across full-stack web development with React and Node.js, 
              deep learning frameworks including TensorFlow and PyTorch, and specialized domains 
              like computer vision and AI. Proficient in modern DevOps tools, database management, 
              and building scalable REST APIs for production-ready applications.
            </p>
          </div>
        </motion.div>

        {/* Skills Grid */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 w-full max-w-3xl">
          {allSkills.map((skill, index) => {
            const IconComponent = skill.icon
            return (
              <motion.div
                key={`mobile-${skill.name}`}
                className="flex flex-col items-center gap-2"
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  type: "spring",
                  stiffness: 100,
                  damping: 12,
                  delay: index * 0.015 
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <div
                  className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-full transition-all duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${skill.color}30, ${skill.color}15)`,
                    border: `2px solid ${skill.color}`,
                    boxShadow: `0 0 15px ${skill.color}20, inset 0 0 15px ${skill.color}15`,
                  }}
                >
                  <IconComponent className="text-white" size={24} />
                </div>
                <span className="text-[10px] sm:text-xs font-semibold text-gray-400">{skill.name}</span>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Large Desktop layout (xl: 1280px and above) */}
      <div className="hidden xl:flex w-full max-w-7xl items-center gap-12 px-6">
        {/* Text Section - 30% */}
        <motion.div 
          className="w-[30%] flex-shrink-0"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="glass rounded-2xl p-8">
            <h3 className="text-3xl font-bold mb-6 gradient-text">
              Tech Arsenal
            </h3>
            <p className="text-gray-300 leading-relaxed text-lg">
              My expertise spans across full-stack web development with React and Node.js, 
              deep learning frameworks including TensorFlow and PyTorch, and specialized domains 
              like computer vision and AI. Proficient in modern DevOps tools, database management, 
              and building scalable REST APIs for production-ready applications.
            </p>
          </div>
        </motion.div>

        {/* Sphere Section - 70% */}
        <div className="relative w-[70%] h-[700px] flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: '1200px' }}>
            {allSkills.map((skill, index) => {
              const IconComponent = skill.icon
              const targetPos = getHexPosition(index)
              
              return (
                <motion.div
                  key={`desktop-${skill.name}`}
                  className="absolute group"
                  initial={{ x: 0, y: 0, scale: 0.3, opacity: 0 }}
                  animate={isInView ? {
                    x: targetPos.x,
                    y: targetPos.y,
                    scale: 1,
                    opacity: 1
                  } : {
                    x: 0,
                    y: 0,
                    scale: 0.3,
                    opacity: 0
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 70,
                    damping: 15,
                    delay: index * 0.02
                  }}
                >
                  <motion.div
                    className="relative cursor-pointer"
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="relative w-16 h-16 flex items-center justify-center rounded-full"
                      style={{
                        background: `linear-gradient(135deg, ${skill.color}40, ${skill.color}20)`,
                        border: `3px solid ${skill.color}`,
                        boxShadow: `0 0 20px ${skill.color}40, inset 0 0 20px ${skill.color}20`,
                      }}
                      whileHover={{
                        boxShadow: `0 0 40px ${skill.color}80, inset 0 0 30px ${skill.color}40`,
                        background: `linear-gradient(135deg, ${skill.color}60, ${skill.color}40)`,
                      }}
                    >
                      <IconComponent 
                        className="text-white" 
                        size={28}
                        style={{
                          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                        }}
                      />
                    </motion.div>

                    {/* Label on hover */}
                    <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-200 z-[9999]">
                      <div 
                        className="px-3 py-1.5 rounded-full text-xs font-bold shadow-2xl"
                        style={{
                          background: `linear-gradient(135deg, ${skill.color}, ${skill.color}dd)`,
                          color: skill.color === '#f7df1e' || skill.color === '#ffca28' ? '#000' : '#fff',
                          boxShadow: `0 8px 32px ${skill.color}80`,
                        }}
                      >
                        {skill.name}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )
            })}

            {/* Center hint text */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              initial={{ opacity: 1, scale: 1 }}
              animate={isInView ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="text-center">
                <motion.div
                  className="text-5xl font-bold mb-4 gradient-text"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  Tech Stack
                </motion.div>
                <p className="text-gray-400 text-base">Scroll to explore</p>
              </div>
            </motion.div>

            {/* Expanded state hint */}
            <motion.div
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <p className="text-gray-400 text-sm">Hover over icons to see details</p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TechSphere

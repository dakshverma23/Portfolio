'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { 
  SiReact, SiNodedotjs, SiPython, SiTensorflow, SiMongodb, 
  SiPytorch, SiJavascript, SiExpress, SiTailwindcss, SiPostgresql,
  SiKeras, SiDocker, SiGit, SiOpencv, SiTypescript, SiFirebase,
  SiHtml5, SiVite, SiPostman
} from 'react-icons/si'
import { FaBrain, FaCamera, FaNetworkWired, FaCss3Alt } from 'react-icons/fa'

const TechSphere = () => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Smooth spring animation for expansion
  const rawExpansion = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0])
  const expansion = useSpring(rawExpansion, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const allSkills = [
    { name: 'React', icon: SiReact, color: '#61dafb', type: 'icon' },
    { name: 'Node.js', icon: SiNodedotjs, color: '#68a063', type: 'icon' },
    { name: 'Python', icon: SiPython, color: '#3776ab', type: 'icon' },
    { name: 'TensorFlow', icon: SiTensorflow, color: '#ff6f00', type: 'icon' },
    { name: 'MongoDB', icon: SiMongodb, color: '#47a248', type: 'icon' },
    { name: 'PyTorch', icon: SiPytorch, color: '#ee4c2c', type: 'icon' },
    { name: 'JavaScript', icon: SiJavascript, color: '#f7df1e', type: 'icon' },
    { name: 'Express', icon: SiExpress, color: '#ffffff', type: 'icon' },
    { name: 'Tailwind', icon: SiTailwindcss, color: '#06b6d4', type: 'icon' },
    { name: 'PostgreSQL', icon: SiPostgresql, color: '#336791', type: 'icon' },
    { name: 'Keras', icon: SiKeras, color: '#d00000', type: 'icon' },
    { name: 'Docker', icon: SiDocker, color: '#2496ed', type: 'icon' },
    { name: 'Git', icon: SiGit, color: '#f05032', type: 'icon' },
    { name: 'OpenCV', icon: SiOpencv, color: '#5c3ee8', type: 'icon' },
    { name: 'TypeScript', icon: SiTypescript, color: '#3178c6', type: 'icon' },
    { name: 'Firebase', icon: SiFirebase, color: '#ffca28', type: 'icon' },
    { name: 'Deep Learning', icon: FaBrain, color: '#a855f7', type: 'icon' },
    { name: 'Computer Vision', icon: FaCamera, color: '#ec4899', type: 'icon' },
    { name: 'REST API', icon: FaNetworkWired, color: '#10b981', type: 'icon' },
    { name: 'HTML', icon: SiHtml5, color: '#e34f26', type: 'icon' },
    { name: 'CSS', icon: FaCss3Alt, color: '#1572b6', type: 'icon' },
    { name: 'Vite', icon: SiVite, color: '#646cff', type: 'icon' },
    { name: 'Postman', icon: SiPostman, color: '#ff6c37', type: 'icon' },
  ]

  // Hexagonal grid positions (honeycomb pattern)
  const getHexPosition = (index, expansionValue) => {
    const hexRadius = 60 + (expansionValue * 40)
    const spacing = hexRadius * 1.8
    
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
    const x = spacing * (3/2 * pos.q) * expansionValue
    const y = spacing * (Math.sqrt(3)/2 * pos.q + Math.sqrt(3) * pos.r) * expansionValue
    
    return { x, y }
  }

  return (
    <div ref={containerRef} className="relative min-h-screen flex items-center justify-center py-20">
      <div className="relative w-full max-w-7xl flex items-center gap-12">
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
        <div className="relative w-[70%] h-[900px] flex items-center justify-center">
          <motion.div 
            className="relative w-full h-full flex items-center justify-center"
            style={{ perspective: '1200px' }}
          >
            {allSkills.map((skill, index) => {
            const IconComponent = skill.icon
            
            return (
              <motion.div
                key={skill.name}
                className="absolute group"
                style={{
                  x: useTransform(expansion, (v) => getHexPosition(index, v).x),
                  y: useTransform(expansion, (v) => getHexPosition(index, v).y),
                  scale: useTransform(expansion, [0, 0.5, 1], [0.4, 1, 1]),
                  opacity: useTransform(expansion, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]),
                }}
              >
                <motion.div
                  className="relative cursor-pointer"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="relative w-24 h-24 flex items-center justify-center rounded-full"
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
                      size={40}
                      style={{
                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                      }}
                    />
                  </motion.div>

                  {/* Label on hover */}
                  <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-200 z-[9999]">
                    <div 
                      className="px-4 py-2 rounded-full text-sm font-bold shadow-2xl"
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
        </motion.div>

        {/* Center hint text */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            opacity: useTransform(expansion, [0, 0.2], [1, 0]),
            scale: useTransform(expansion, [0, 0.2], [1, 0.8]),
          }}
        >
          <div className="text-center">
            <motion.div
              className="text-7xl font-bold mb-4 gradient-text"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              Tech Stack
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="text-4xl mb-2"
            >
              ⬇️
            </motion.div>
            <p className="text-gray-400 text-lg">Scroll to explore</p>
          </div>
        </motion.div>

        {/* Expanded state hint */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 pointer-events-none"
          style={{ opacity: useTransform(expansion, [0.4, 0.6], [0, 1]) }}
        >
          <p className="text-gray-400 text-sm">Hover over icons to see details</p>
        </motion.div>
      </div>
      </div>
    </div>
  )
}

export default TechSphere

import { Github, Linkedin, Mail, Download, ChevronDown } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const Hero = () => {
  const [showResumeMenu, setShowResumeMenu] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowResumeMenu(false)
      }
    }

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    document.addEventListener('mousedown', handleClickOutside)
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const handleDownloadCV = (resumeType) => {
    const link = document.createElement('a')
    if (resumeType === 'fullstack') {
      link.href = '/Daksh_CV.pdf'
      link.download = 'Daksh_Verma_FullStack_Resume.pdf'
    } else {
      link.href = '/DakshVerma_ML.pdf'
      link.download = 'Daksh_Verma_AI_ML_Resume.pdf'
    }
    link.click()
    setShowResumeMenu(false)
  }

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      {/* Minimal particles - only 8 */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${3 + Math.random() * 2}px`,
            height: `${3 + Math.random() * 2}px`,
            background: i % 3 === 0 ? '#a855f7' : i % 3 === 1 ? '#ec4899' : '#06b6d4',
            boxShadow: `0 0 ${10 + Math.random() * 10}px currentColor`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 5 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Hi, I'm <motion.span 
              className="gradient-text inline-block text-6xl md:text-8xl"
              animate={{ 
                scale: [1, 1.02, 1],
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Daksh Verma
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Full Stack Developer & Deep Learning Engineer
          </motion.p>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Building intelligent systems and scalable web applications with cutting-edge technologies. 
            Specializing in deep learning, computer vision, and modern full-stack development.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="relative" ref={dropdownRef}>
              <motion.button
                onClick={() => setShowResumeMenu(!showResumeMenu)}
                className="group relative px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold text-white overflow-hidden w-full sm:w-auto"
                whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(168, 85, 247, 0.5)" }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Download size={20} />
                  Download Resume
                  <motion.div
                    animate={{ rotate: showResumeMenu ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown size={18} />
                  </motion.div>
                </span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
              
              {/* Dropdown Menu */}
              {showResumeMenu && (
                <motion.div 
                  className="absolute top-full mt-2 left-0 right-0 glass rounded-lg overflow-hidden shadow-xl z-50 min-w-[280px]"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.button
                    onClick={() => handleDownloadCV('fullstack')}
                    className="w-full px-6 py-3 text-left hover:bg-white/20 transition-all flex items-center gap-3 group/item"
                    whileHover={{ x: 5 }}
                  >
                    <Download size={18} className="text-purple-400" />
                    <div>
                      <div className="font-semibold text-white group-hover/item:text-purple-300">Full Stack Developer</div>
                      <div className="text-xs text-gray-400">Web Development Resume</div>
                    </div>
                  </motion.button>
                  <div className="border-t border-white/10"></div>
                  <motion.button
                    onClick={() => handleDownloadCV('aiml')}
                    className="w-full px-6 py-3 text-left hover:bg-white/20 transition-all flex items-center gap-3 group/item"
                    whileHover={{ x: 5 }}
                  >
                    <Download size={18} className="text-pink-400" />
                    <div>
                      <div className="font-semibold text-white group-hover/item:text-pink-300">AI/ML Engineer</div>
                      <div className="text-xs text-gray-400">Machine Learning Resume</div>
                    </div>
                  </motion.button>
                </motion.div>
              )}
            </div>
            <motion.button
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="px-8 py-4 glass rounded-lg font-semibold text-white"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.button>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            className="flex justify-center gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {[
              { href: "https://github.com/dakshverma23", icon: Github, label: "GitHub" },
              { href: "https://www.linkedin.com/in/daksh-verma-580326199/", icon: Linkedin, label: "LinkedIn" },
              { href: "mailto:dakshverma633@gmail.com", icon: Mail, label: "Email" }
            ].map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target={social.label !== "Email" ? "_blank" : undefined}
                rel={social.label !== "Email" ? "noopener noreferrer" : undefined}
                className="p-3 glass rounded-full"
                aria-label={social.label}
                whileHover={{ 
                  scale: 1.2, 
                  rotate: 360,
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  boxShadow: "0 0 20px rgba(168, 85, 247, 0.5)"
                }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <social.icon size={24} />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ 
          y: [0, 10, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <motion.div 
            className="w-1 h-3 bg-gray-400 rounded-full mt-2"
            animate={{
              y: [0, 12, 0],
              opacity: [1, 0, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          />
        </div>
      </motion.div>
    </section>
  )
}

export default Hero


import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import TechSphere from './TechSphere'

const About = () => {
  const [isVisible, setIsVisible] = useState(false)
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

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 px-6 relative min-h-screen flex items-center"
    >
      <div className="container mx-auto max-w-6xl">
        {/* About Me Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl">
            A little bit about who I am and what I do.
          </p>
        </motion.div>

        {/* Bio Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <div className="glass rounded-2xl p-8 md:p-12">
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              I'm a full-stack developer and deep learning engineer with expertise in building intelligent 
              systems and scalable web applications. My work bridges the gap between cutting-edge AI research 
              and practical software solutions that solve real-world problems.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              With a strong foundation in deep learning frameworks like TensorFlow and PyTorch, combined with 
              modern web technologies, I specialize in computer vision, human activity recognition, and 
              content-based retrieval systems. My projects demonstrate proficiency in both research-oriented 
              ML implementations and production-ready full-stack applications.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              When I'm not coding, you can find me exploring new frameworks, working on ML models, 
              contributing to open-source projects, or sharing knowledge with the developer community.
            </p>
          </div>
        </motion.div>

        {/* Tech Stack Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-4xl font-bold mb-4 text-center">
            Tech <span className="gradient-text">Stack</span>
          </h3>
          
          <TechSphere />
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 grid grid-cols-3 gap-6"
        >
          {[
            { value: "15+", label: "Projects" },
            { value: "3+", label: "Tech Domains" },
            { value: "100%", label: "Dedication" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="glass rounded-xl p-6 text-center"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(168, 85, 247, 0.3)"
              }}
            >
              <motion.div 
                className="text-4xl font-bold gradient-text mb-2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: 0.8 + index * 0.1,
                  type: "spring",
                  stiffness: 200
                }}
              >
                {stat.value}
              </motion.div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default About

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import SectionTitle from './SectionTitle'

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

  const skills = [
    'React', 'TypeScript', 'Node.js', 'Python', 'JavaScript',
    'TensorFlow', 'PyTorch', 'Deep Learning', 'Computer Vision', 'OpenCV',
    'Tailwind CSS', 'MongoDB', 'PostgreSQL', 'Express', 'REST APIs',
    'Git', 'Docker', 'Firebase', 'Flask', 'FastAPI', 'NumPy', 'Pandas'
  ]

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`py-20 px-6 relative transition-opacity duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="container mx-auto max-w-6xl">
        <SectionTitle>
          About <span className="gradient-text">Me</span>
        </SectionTitle>

        <div className={`grid md:grid-cols-2 gap-12 items-center transition-all duration-700 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          {/* Bio Section */}
          <div className="space-y-6">
            <div className="glass rounded-2xl p-8 hover:bg-white/15 transition-all">
              <h3 className="text-2xl font-semibold mb-4 text-purple-400">Professional Bio</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                I'm a full-stack developer and deep learning engineer with expertise in building intelligent 
                systems and scalable web applications. My work bridges the gap between cutting-edge AI research 
                and practical software solutions that solve real-world problems.
              </p>
              <p className="text-gray-300 leading-relaxed mb-4">
                With a strong foundation in deep learning frameworks like TensorFlow and PyTorch, combined with 
                modern web technologies, I specialize in computer vision, human activity recognition, and 
                content-based retrieval systems. My projects demonstrate proficiency in both research-oriented 
                ML implementations and production-ready full-stack applications.
              </p>
              <p className="text-gray-300 leading-relaxed">
                I'm passionate about leveraging AI to create meaningful impact, whether it's through healthcare 
                applications, intelligent search systems, or user-centric web platforms. Always eager to explore 
                emerging technologies and contribute to innovative projects.
              </p>
            </div>

            {/* Key Achievements */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: "15+", label: "Projects" },
                { value: "3+", label: "Domains" },
                { value: "100%", label: "Dedication" }
              ].map((stat, index) => (
                <motion.div 
                  key={stat.label}
                  className="glass rounded-xl p-6 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  whileHover={{ 
                    scale: 1.1,
                    rotate: [0, -5, 5, 0],
                    boxShadow: "0 10px 30px rgba(168, 85, 247, 0.3)"
                  }}
                >
                  <motion.div 
                    className="text-3xl font-bold gradient-text mb-2"
                    animate={{ 
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3
                    }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Skills Section */}
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-purple-400">Skills & Technologies</h3>
            <div className="glass rounded-2xl p-8">
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <motion.span
                    key={index}
                    className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full text-sm font-medium text-gray-200 cursor-default"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ 
                      scale: 1.2, 
                      rotate: [0, -5, 5, 0],
                      borderColor: "rgba(168, 85, 247, 0.8)",
                      boxShadow: "0 0 20px rgba(168, 85, 247, 0.5)"
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About


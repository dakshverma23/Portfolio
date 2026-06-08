'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Brain, Code2, Bot } from 'lucide-react'
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

        {/* Core Focus Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            {
              title: "AI & Deep Learning",
              icon: Brain,
              color: "#a855f7",
              glow: "shadow-purple-500/10 border-purple-500/20",
              bullets: [
                "Computer Vision & Video Analysis",
                "CNN-LSTM Neural Networks",
                "TensorFlow, PyTorch, OpenCV",
                "HAR (Activity Recognition)"
              ],
              description: "Bridging mathematical ML theory with structured model deployment to build systems that see and interpret the world."
            },
            {
              title: "Full-Stack Systems",
              icon: Code2,
              color: "#06b6d4",
              glow: "shadow-cyan-500/10 border-cyan-500/20",
              bullets: [
                "Single Page Web Apps (React)",
                "Scalable REST Backends (Express)",
                "Robust Data Modeling (MongoDB)",
                "Inventory & Platform Security"
              ],
              description: "Crafting robust server schemas, secure authentication, and responsive, fluid user interfaces designed for production."
            },
            {
              title: "Autonomous Agents",
              icon: Bot,
              color: "#ec4899",
              glow: "shadow-pink-500/10 border-pink-500/20",
              bullets: [
                "Agentic Research Orchestration",
                "LLM Integrations (Claude/GPT)",
                "Wikipedia & Web Search Scraping",
                "AI-Driven Document Synthesis"
              ],
              description: "Designing self-directed software agents that autonomously gather information, evaluate sources, and write reports."
            }
          ].map((pillar, idx) => {
            const Icon = pillar.icon
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + idx * 0.15 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className={`glass rounded-2xl p-6 border flex flex-col justify-between shadow-lg hover:shadow-2xl transition-all duration-300 ${pillar.glow}`}
              >
                <div>
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                    style={{
                      background: `rgba(${pillar.color === '#a855f7' ? '168,85,247' : pillar.color === '#06b6d4' ? '6,182,212' : '236,72,153'}, 0.15)`,
                      border: `1px solid ${pillar.color}`
                    }}
                  >
                    <Icon size={24} style={{ color: pillar.color }} />
                  </div>
                  <h4 className="text-xl font-bold mb-3 text-white">{pillar.title}</h4>
                  <p className="text-sm text-gray-400 mb-6 leading-relaxed">{pillar.description}</p>
                </div>
                
                <ul className="space-y-2 border-t border-white/5 pt-4">
                  {pillar.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="text-xs text-gray-300 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: pillar.color }} />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>

        {/* Development Workflow Pipeline ("How I Build") */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="mb-24"
        >
          <div className="glass rounded-2xl p-8 md:p-10 border border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-cyan-500/5 pointer-events-none" />
            
            <h4 className="text-2xl font-bold mb-8 text-center text-white">
              My Engineering <span className="gradient-text">Workflow</span>
            </h4>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 relative z-10">
              {[
                {
                  step: "01",
                  title: "Research & Design",
                  description: "Analyzing technical literature, planning CNN/LSTM architectures, modeling dataset features, and designing SQL/NoSQL schemas.",
                  color: "#a855f7"
                },
                {
                  step: "02",
                  title: "Train & Build",
                  description: "Writing clean backend APIs in Node/Express, scripting neural networks in PyTorch, training models, and tuning hyper-parameters.",
                  color: "#ec4899"
                },
                {
                  step: "03",
                  title: "Integrate & Deploy",
                  description: "Connecting deep learning models to fluid React web interfaces, optimizing rendering pathways, and deploying static/server instances.",
                  color: "#06b6d4"
                }
              ].map((phase, pIdx) => (
                <div key={phase.step} className="flex flex-col relative group">
                  {/* Step bubble */}
                  <div className="flex items-center gap-4 mb-4">
                    <span 
                      className="text-4xl font-black opacity-30 select-none transition-all duration-300 group-hover:opacity-80"
                      style={{ color: phase.color }}
                    >
                      {phase.step}
                    </span>
                    <h5 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                      {phase.title}
                    </h5>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed pl-2">
                    {phase.description}
                  </p>
                  
                  {/* Connection arrow for large screens */}
                  {pIdx < 2 && (
                    <div className="hidden lg:block absolute top-6 -right-8 text-white/20 select-none">
                      →
                    </div>
                  )}
                </div>
              ))}
            </div>
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
          className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6"
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

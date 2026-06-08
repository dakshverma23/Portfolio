'use client'

import { motion } from 'framer-motion'

const SectionTitle = ({ children, subtitle }) => {
  return (
    <div className="text-center mb-16 relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 relative inline-block">
          {children}
          
          {/* Decorative elements */}
          <motion.div
            className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-purple-400"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          />
          <motion.div
            className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-pink-400"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
          />
        </h2>
        
        {/* Animated underline */}
        <motion.div 
          className="w-24 h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 mx-auto rounded-full mb-4"
          initial={{ width: 0 }}
          whileInView={{ width: 96 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
        />
        
        {subtitle && (
          <motion.p 
            className="text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {subtitle}
          </motion.p>
        )}
      </motion.div>
      
      {/* Floating decorative circles */}
      <motion.div
        className="absolute top-0 left-1/4 w-2 h-2 rounded-full bg-purple-400/50"
        animate={{
          y: [0, -10, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute top-0 right-1/4 w-2 h-2 rounded-full bg-pink-400/50"
        animate={{
          y: [0, -10, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: 1,
          ease: "easeInOut"
        }}
      />
    </div>
  )
}

export default SectionTitle

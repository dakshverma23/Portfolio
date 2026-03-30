import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const InteractiveRobot = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Calculate rotation based on mouse position
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      
      const rotateY = ((e.clientX - centerX) / centerX) * 15
      const rotateX = ((e.clientY - centerY) / centerY) * -10
      
      setRotation({ x: rotateX, y: rotateY })
      
      // Eye tracking
      const x = (e.clientX / window.innerWidth - 0.5) * 6
      const y = (e.clientY / window.innerHeight - 0.5) * 6
      setMousePosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="fixed bottom-12 right-12 z-40 pointer-events-none hidden md:block">
      <motion.div
        animate={{
          rotateX: rotation.x,
          rotateY: rotation.y,
        }}
        transition={{
          type: "spring",
          stiffness: 50,
          damping: 15,
        }}
        style={{
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
        className="relative"
      >
        {/* Robot Container */}
        <motion.div
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative w-40 h-52"
        >
          {/* Head */}
          <div className="relative w-28 h-28 mx-auto">
            {/* Head shape - rounded rectangle */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl border-2 border-gray-700 shadow-2xl">
              {/* Inner glow */}
              <div className="absolute inset-1 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-3xl" />
              
              {/* Antenna */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-gradient-to-t from-gray-700 to-transparent" />
              <motion.div
                className="absolute -top-8 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-purple-500"
                animate={{
                  boxShadow: [
                    "0 0 5px rgba(168, 85, 247, 0.5)",
                    "0 0 15px rgba(168, 85, 247, 1)",
                    "0 0 5px rgba(168, 85, 247, 0.5)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />

              {/* Eyes */}
              <div className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-4">
                {/* Left Eye */}
                <div className="relative w-6 h-8 bg-gray-900 rounded-full overflow-hidden border border-gray-700">
                  <motion.div
                    className="absolute w-3 h-3 bg-cyan-400 rounded-full top-1/2 left-1/2"
                    animate={{
                      x: mousePosition.x - 6,
                      y: mousePosition.y - 6,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 150,
                      damping: 15,
                    }}
                  >
                    <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white rounded-full" />
                  </motion.div>
                </div>

                {/* Right Eye */}
                <div className="relative w-6 h-8 bg-gray-900 rounded-full overflow-hidden border border-gray-700">
                  <motion.div
                    className="absolute w-3 h-3 bg-cyan-400 rounded-full top-1/2 left-1/2"
                    animate={{
                      x: mousePosition.x - 6,
                      y: mousePosition.y - 6,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 150,
                      damping: 15,
                    }}
                  >
                    <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white rounded-full" />
                  </motion.div>
                </div>
              </div>

              {/* Mouth */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-12 h-2 bg-gray-900 rounded-full border border-gray-700 overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Neck */}
          <div className="w-6 h-3 mx-auto bg-gradient-to-b from-gray-800 to-gray-900 border-x border-gray-700" />

          {/* Body */}
          <div className="relative w-32 h-24 mx-auto bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border-2 border-gray-700 shadow-2xl">
            {/* Inner glow */}
            <div className="absolute inset-1 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl" />
            
            {/* Chest panel */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-14 bg-gray-900/50 rounded-lg border border-gray-700">
              {/* Status indicators */}
              <div className="flex gap-1.5 justify-center mt-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      background: i === 0 ? '#a855f7' : i === 1 ? '#ec4899' : '#06b6d4',
                    }}
                    animate={{
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.4,
                    }}
                  />
                ))}
              </div>
              
              {/* Display lines */}
              <div className="mt-2 space-y-1 px-3">
                <div className="h-0.5 w-full bg-gray-700 rounded" />
                <div className="h-0.5 w-3/4 bg-gray-700 rounded" />
                <div className="h-0.5 w-full bg-gray-700 rounded" />
              </div>
            </div>

            {/* Shoulders */}
            <div className="absolute -left-2 top-2 w-3 h-3 bg-gray-800 rounded-full border border-gray-700" />
            <div className="absolute -right-2 top-2 w-3 h-3 bg-gray-800 rounded-full border border-gray-700" />
          </div>

          {/* Arms */}
          <div className="absolute top-32 left-0 right-0 flex justify-between px-1">
            {/* Left Arm */}
            <motion.div
              className="w-2 h-10 bg-gradient-to-b from-gray-800 to-gray-900 rounded-full border border-gray-700"
              animate={{
                rotate: [0, -8, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-gray-800 rounded-full border border-gray-700" />
            </motion.div>

            {/* Right Arm */}
            <motion.div
              className="w-2 h-10 bg-gradient-to-b from-gray-800 to-gray-900 rounded-full border border-gray-700"
              animate={{
                rotate: [0, 8, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
            >
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-gray-800 rounded-full border border-gray-700" />
            </motion.div>
          </div>

          {/* Shadow */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-2 bg-black/20 rounded-full blur-sm" />
        </motion.div>
      </motion.div>
    </div>
  )
}

export default InteractiveRobot

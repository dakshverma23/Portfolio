import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const InteractiveRobot = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30
      const y = (e.clientY / window.innerHeight - 0.5) * 30
      
      setMousePosition({ x, y })
      
      // Calculate eye movement (more restricted range)
      const eyeX = (e.clientX / window.innerWidth - 0.5) * 8
      const eyeY = (e.clientY / window.innerHeight - 0.5) * 8
      setEyePosition({ x: eyeX, y: eyeY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="fixed bottom-8 right-8 z-40 pointer-events-none">
      <motion.div
        animate={{
          rotateY: mousePosition.x * 0.5,
          rotateX: -mousePosition.y * 0.3,
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
        }}
        style={{
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
        className="relative w-48 h-48"
      >
        {/* Robot Body */}
        <motion.div
          className="relative"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Head */}
          <div className="relative">
            {/* Main head structure */}
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl border-2 border-purple-400/40 backdrop-blur-sm relative overflow-hidden">
              {/* Antenna */}
              <motion.div
                className="absolute -top-8 left-1/2 -translate-x-1/2 w-1 h-8 bg-gradient-to-t from-purple-400 to-transparent"
                animate={{
                  scaleY: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                <motion.div
                  className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-purple-400"
                  animate={{
                    boxShadow: [
                      "0 0 10px rgba(168, 85, 247, 0.5)",
                      "0 0 20px rgba(168, 85, 247, 0.8)",
                      "0 0 10px rgba(168, 85, 247, 0.5)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
              </motion.div>

              {/* Eyes */}
              <div className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-6">
                {/* Left Eye */}
                <div className="relative w-8 h-10 bg-white/10 rounded-full border border-purple-300/30 overflow-hidden">
                  <motion.div
                    className="absolute top-1/2 left-1/2 w-4 h-4 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full"
                    animate={{
                      x: eyePosition.x - 8,
                      y: eyePosition.y - 8,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                    }}
                  >
                    <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-white rounded-full" />
                  </motion.div>
                </div>

                {/* Right Eye */}
                <div className="relative w-8 h-10 bg-white/10 rounded-full border border-purple-300/30 overflow-hidden">
                  <motion.div
                    className="absolute top-1/2 left-1/2 w-4 h-4 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full"
                    animate={{
                      x: eyePosition.x - 8,
                      y: eyePosition.y - 8,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                    }}
                  >
                    <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-white rounded-full" />
                  </motion.div>
                </div>
              </div>

              {/* Mouth/Display */}
              <motion.div
                className="absolute bottom-6 left-1/2 -translate-x-1/2 w-16 h-3 bg-purple-400/30 rounded-full border border-purple-400/50"
                animate={{
                  scaleX: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/50 to-transparent"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </motion.div>

              {/* Decorative elements */}
              <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-pink-400/50" />
              <div className="absolute top-4 left-2 w-1.5 h-1.5 rounded-full bg-cyan-400/50" />
            </div>

            {/* Neck */}
            <div className="w-8 h-4 mx-auto bg-gradient-to-b from-purple-500/20 to-transparent border-x-2 border-purple-400/30" />
          </div>

          {/* Body */}
          <div className="w-24 h-20 mx-auto bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl border-2 border-purple-400/40 backdrop-blur-sm relative">
            {/* Chest panel */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-12 bg-white/5 rounded-lg border border-purple-300/20">
              {/* Status lights */}
              <div className="flex gap-1 justify-center mt-2">
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
                      delay: i * 0.3,
                    }}
                  />
                ))}
              </div>
              
              {/* Code lines */}
              <div className="mt-2 space-y-1 px-2">
                <div className="h-0.5 w-8 bg-purple-400/30 rounded" />
                <div className="h-0.5 w-6 bg-pink-400/30 rounded" />
                <div className="h-0.5 w-10 bg-cyan-400/30 rounded" />
              </div>
            </div>
          </div>

          {/* Arms */}
          <div className="absolute top-32 left-0 right-0 flex justify-between px-2">
            {/* Left Arm */}
            <motion.div
              className="w-3 h-12 bg-gradient-to-b from-purple-500/20 to-pink-500/20 rounded-full border border-purple-400/30"
              animate={{
                rotate: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-purple-400/30 rounded-full border border-purple-400/40" />
            </motion.div>

            {/* Right Arm */}
            <motion.div
              className="w-3 h-12 bg-gradient-to-b from-purple-500/20 to-pink-500/20 rounded-full border border-purple-400/30"
              animate={{
                rotate: [0, 10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5,
              }}
            >
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-purple-400/30 rounded-full border border-purple-400/40" />
            </motion.div>
          </div>
        </motion.div>

        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 -z-10"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, transparent 70%)',
            filter: 'blur(30px)',
          }}
        />
      </motion.div>
    </div>
  )
}

export default InteractiveRobot

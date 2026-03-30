import { motion } from 'framer-motion'

const LavaFlow = ({ index, onComplete }) => {
  return (
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden">
      {/* Lava source at top */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.3 }}
      >
        {/* Glowing lava source */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255, 100, 0, 0.8) 0%, rgba(255, 50, 0, 0.4) 50%, transparent 100%)',
            filter: 'blur(20px)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Lava drip/blob falling */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2"
        initial={{ 
          top: 0,
          scale: 0,
          opacity: 0,
        }}
        animate={{ 
          top: ['0%', '20%', '40%', '60%', '80%'],
          scale: [0, 0.5, 0.8, 1, 1.2],
          opacity: [0, 1, 1, 1, 0],
        }}
        transition={{
          duration: 2,
          delay: index * 0.3,
          ease: "easeIn",
          times: [0, 0.2, 0.4, 0.6, 1]
        }}
        onAnimationComplete={onComplete}
      >
        {/* Lava blob with liquid effect */}
        <motion.div
          className="relative w-24 h-24"
          animate={{
            borderRadius: [
              '60% 40% 30% 70% / 60% 30% 70% 40%',
              '30% 60% 70% 40% / 50% 60% 30% 60%',
              '60% 40% 30% 70% / 60% 30% 70% 40%',
            ],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            background: 'linear-gradient(135deg, #ff6600 0%, #ff3300 50%, #ff0000 100%)',
            boxShadow: '0 0 40px rgba(255, 100, 0, 0.8), 0 0 80px rgba(255, 50, 0, 0.4)',
          }}
        >
          {/* Inner glow */}
          <motion.div
            className="absolute inset-2 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255, 200, 0, 0.6) 0%, transparent 70%)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          />
          
          {/* Sparks */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-yellow-300"
              style={{
                top: '50%',
                left: '50%',
              }}
              animate={{
                x: [0, (Math.cos(i * Math.PI / 4) * 30)],
                y: [0, (Math.sin(i * Math.PI / 4) * 30)],
                opacity: [1, 0],
                scale: [1, 0],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </motion.div>

        {/* Dripping trail */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-2"
          style={{
            height: '100px',
            background: 'linear-gradient(to bottom, rgba(255, 100, 0, 0.8), transparent)',
            filter: 'blur(2px)',
          }}
          animate={{
            scaleY: [0, 1, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
          }}
        />
      </motion.div>
    </div>
  )
}

export default LavaFlow

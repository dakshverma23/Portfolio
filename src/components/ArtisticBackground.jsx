import { motion } from 'framer-motion'

const ArtisticBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Mesh Gradient Base - Simplified */}
      <div className="absolute inset-0 mesh-gradient opacity-40" />
      
      {/* Reduced Liquid Blobs - Only 2 instead of 3 */}
      <motion.div
        className="absolute top-0 left-0 w-[500px] h-[500px] liquid-blob"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, -80, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-0 right-0 w-[600px] h-[600px] liquid-blob"
        style={{
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Reduced Floating Shapes - Only 8 instead of 15 */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${30 + Math.random() * 30}px`,
            height: `${30 + Math.random() * 30}px`,
          }}
          animate={{
            y: [0, -80, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 15 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut"
          }}
        >
          {i % 2 === 0 ? (
            <div className="w-full h-full border border-purple-400/10 rounded-full" />
          ) : (
            <div className="w-full h-full border border-pink-400/10 rotate-45" />
          )}
        </motion.div>
      ))}

      {/* Simplified Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(168, 85, 247, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(168, 85, 247, 0.2) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  )
}

export default ArtisticBackground

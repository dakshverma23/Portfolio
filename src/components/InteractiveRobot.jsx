import { useState, useEffect, useRef } from 'react'

const InteractiveRobot = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const canvasRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20
      const y = (e.clientY / window.innerHeight - 0.5) * 20
      setRotation({ x: y, y: x })
    }

    document.addEventListener('mousemove', handleMouseMove)
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles = []

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1
      }

      draw() {
        ctx.fillStyle = 'rgba(0, 255, 255, 0.7)'
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    for (let i = 0; i < 120; i++) {
      particles.push(new Particle())
    }

    let animationId
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.update()
        p.draw()
      })
      animationId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-30">
      {/* Background Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0" />
      
      {/* Robot */}
      <div className="flex items-center justify-center w-full h-full">
        <div 
          className="robot-container"
          style={{
            transform: `translate(-50%, -50%) rotateY(${rotation.y}deg) rotateX(${rotation.x}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Head */}
          <div className="robot-head">
            {/* Eyes */}
            <div className="robot-eye left"></div>
            <div className="robot-eye right"></div>
            
            {/* Antenna */}
            <div className="robot-antenna">
              <div className="antenna-tip"></div>
            </div>
          </div>

          {/* Body */}
          <div className="robot-body">
            {/* Chest panel */}
            <div className="chest-panel">
              <div className="status-light" style={{ background: '#a855f7' }}></div>
              <div className="status-light" style={{ background: '#ec4899' }}></div>
              <div className="status-light" style={{ background: '#06b6d4' }}></div>
            </div>
          </div>

          {/* Arms */}
          <div className="robot-arm left"></div>
          <div className="robot-arm right"></div>
        </div>
      </div>
    </div>
  )
}

export default InteractiveRobot

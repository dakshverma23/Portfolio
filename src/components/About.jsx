import { useState, useEffect, useRef } from 'react'

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
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full"></div>
        </div>

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
              <div className="glass rounded-xl p-6 text-center hover:scale-105 transition-transform">
                <div className="text-3xl font-bold gradient-text mb-2">15+</div>
                <div className="text-sm text-gray-400">Projects</div>
              </div>
              <div className="glass rounded-xl p-6 text-center hover:scale-105 transition-transform">
                <div className="text-3xl font-bold gradient-text mb-2">3+</div>
                <div className="text-sm text-gray-400">Domains</div>
              </div>
              <div className="glass rounded-xl p-6 text-center hover:scale-105 transition-transform">
                <div className="text-3xl font-bold gradient-text mb-2">100%</div>
                <div className="text-sm text-gray-400">Dedication</div>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-purple-400">Skills & Technologies</h3>
            <div className="glass rounded-2xl p-8">
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full text-sm font-medium text-gray-200 hover:scale-110 hover:border-purple-400 transition-all cursor-default"
                  >
                    {skill}
                  </span>
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


import { Github, Linkedin, Mail, Download, ChevronDown } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

const Hero = () => {
  const [showResumeMenu, setShowResumeMenu] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowResumeMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleDownloadCV = (resumeType) => {
    const link = document.createElement('a')
    if (resumeType === 'fullstack') {
      link.href = '/Daksh_CV.pdf'
      link.download = 'Daksh_Verma_FullStack_Resume.pdf'
    } else {
      link.href = '/DakshVerma_ML.pdf'
      link.download = 'Daksh_Verma_AI_ML_Resume.pdf'
    }
    link.click()
    setShowResumeMenu(false)
  }

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-blue-900/20 animate-gradient"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
      
      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 text-center animate-fade-in">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
            Hi, I'm <span className="gradient-text">Daksh Verma</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Full Stack Developer & Deep Learning Engineer
          </p>
          <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Building intelligent systems and scalable web applications with cutting-edge technologies. 
            Specializing in deep learning, computer vision, and modern full-stack development.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowResumeMenu(!showResumeMenu)}
                className="group relative px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold text-white overflow-hidden transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 w-full sm:w-auto"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Download size={20} />
                  Download Resume
                  <ChevronDown size={18} className={`transition-transform ${showResumeMenu ? 'rotate-180' : ''}`} />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
              
              {/* Dropdown Menu */}
              {showResumeMenu && (
                <div className="absolute top-full mt-2 left-0 right-0 glass rounded-lg overflow-hidden shadow-xl z-50 animate-slide-down min-w-[280px]">
                  <button
                    onClick={() => handleDownloadCV('fullstack')}
                    className="w-full px-6 py-3 text-left hover:bg-white/20 transition-all flex items-center gap-3 group/item"
                  >
                    <Download size={18} className="text-purple-400" />
                    <div>
                      <div className="font-semibold text-white group-hover/item:text-purple-300">Full Stack Developer</div>
                      <div className="text-xs text-gray-400">Web Development Resume</div>
                    </div>
                  </button>
                  <div className="border-t border-white/10"></div>
                  <button
                    onClick={() => handleDownloadCV('aiml')}
                    className="w-full px-6 py-3 text-left hover:bg-white/20 transition-all flex items-center gap-3 group/item"
                  >
                    <Download size={18} className="text-pink-400" />
                    <div>
                      <div className="font-semibold text-white group-hover/item:text-pink-300">AI/ML Engineer</div>
                      <div className="text-xs text-gray-400">Machine Learning Resume</div>
                    </div>
                  </button>
                </div>
              )}
            </div>
            <button
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="px-8 py-4 glass rounded-lg font-semibold text-white hover:bg-white/20 transition-all hover:scale-105"
            >
              Get In Touch
            </button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-6 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <a
              href="https://github.com/dakshverma23"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 glass rounded-full hover:bg-white/20 transition-all hover:scale-110 hover:shadow-lg"
              aria-label="GitHub"
            >
              <Github size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/daksh-verma-580326199/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 glass rounded-full hover:bg-white/20 transition-all hover:scale-110 hover:shadow-lg"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="mailto:dakshverma633@gmail.com"
              className="p-3 glass rounded-full hover:bg-white/20 transition-all hover:scale-110 hover:shadow-lg"
              aria-label="Email"
            >
              <Mail size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  )
}

export default Hero


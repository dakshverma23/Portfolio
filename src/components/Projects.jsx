import { useState, useEffect, useRef } from 'react'
import { Github, ExternalLink } from 'lucide-react'

const Projects = () => {
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

  const projects = [
    {
      id: 1,
      title: 'Human Activity Recognition (HAR) - Deep Learning',
      description: 'Advanced deep learning system for recognizing human activities from video sequences using CNN-LSTM architecture. Implements state-of-the-art techniques for temporal feature extraction and classification with high accuracy on benchmark datasets.',
      technologies: ['Python', 'TensorFlow', 'Keras', 'Deep Learning', 'CNN-LSTM', 'OpenCV'],
      github: 'https://github.com/dakshverma23/HAR-DL',
      demo: null,
      hasDemo: false,
      featured: true,
    },
    {
      id: 2,
      title: 'CBIR - Content-Based Image Retrieval',
      description: 'Intelligent image retrieval system using deep learning and computer vision. Implements feature extraction with CNNs, similarity metrics, and efficient indexing for large-scale image search applications.',
      technologies: ['Python', 'Deep Learning', 'Computer Vision', 'OpenCV', 'NumPy', 'TensorFlow'],
      github: 'https://github.com/dakshverma23/CBIR',
      demo: null,
      hasDemo: false,
      featured: true,
    },
    {
      id: 3,
      title: 'E-BloodBank',
      description: 'Full-stack healthcare platform for blood bank management with donor registration, inventory tracking, and emergency request handling. Features real-time notifications, secure authentication, and admin dashboard.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Firebase', 'REST API'],
      github: 'https://github.com/dakshverma23/E-BloodBank',
      demo: null,
      hasDemo: false,
      featured: true,
    },
    {
      id: 4,
      title: 'Food Ordering Platform',
      description: 'Modern e-commerce platform for online food ordering with dynamic menu management, shopping cart, order tracking, and payment integration. Built with responsive design and optimized performance.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'JavaScript', 'CSS3'],
      github: 'https://github.com/dakshverma23/Food-Ordering-Website',
      demo: null,
      hasDemo: false,
    },
    {
      id: 5,
      title: 'BmuNest',
      description: 'Community platform for university students with content management, user authentication, and real-time updates. Features modern UI/UX and efficient data handling.',
      technologies: ['React', 'Node.js', 'JavaScript', 'CSS3', 'MongoDB'],
      github: 'https://github.com/dakshverma23/BmuNest',
      demo: null,
      hasDemo: false,
    },
    {
      id: 6,
      title: 'Damn-k',
      description: 'Creative web showcase demonstrating advanced CSS animations, transitions, and modern UI patterns. Highlights expertise in frontend design and interactive user experiences.',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Animations'],
      github: 'https://github.com/dakshverma23/Damn-k',
      demo: null,
      hasDemo: false,
    },
  ]

  return (
    <section
      id="projects"
      ref={sectionRef}
      className={`py-20 px-6 relative bg-gradient-to-b from-gray-900 to-gray-800 transition-opacity duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full mb-4"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A collection of projects showcasing my skills in full-stack development and machine learning
          </p>
        </div>

        <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-700 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`group glass rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 ${
                project.featured ? 'ring-2 ring-purple-500/30' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-2xl font-semibold text-purple-400 group-hover:text-purple-300 transition-colors flex-1">
                  {project.title}
                </h3>
                {project.featured && (
                  <span className="px-2 py-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded text-xs font-semibold">
                    Featured
                  </span>
                )}
              </div>
              <p className="text-gray-300 mb-4 leading-relaxed">
                {project.description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-xs text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-4">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 glass rounded-lg hover:bg-white/20 transition-all group/link"
                >
                  <Github size={18} />
                  <span className="text-sm">Code</span>
                </a>
                {project.hasDemo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all group/link"
                  >
                    <ExternalLink size={18} />
                    <span className="text-sm">Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects


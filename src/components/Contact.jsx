'use client'

import { useState, useEffect, useRef } from 'react'
import { Github, Linkedin, Mail, MapPin, Send } from 'lucide-react'
import { motion } from 'framer-motion'
import SectionTitle from './SectionTitle'

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [emailGlow, setEmailGlow] = useState(false)
  const sectionRef = useRef(null)
  const emailRef = useRef(null)

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

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch('https://formspree.io/f/xanyqbpv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _replyto: formData.email,
        }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', message: '' })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleEmailClick = () => {
    setEmailGlow(true)
    // Scroll to email if not visible
    if (emailRef.current) {
      emailRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
    // Remove glow after 2 seconds
    setTimeout(() => {
      setEmailGlow(false)
    }, 2000)
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`py-20 px-6 relative transition-opacity duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="container mx-auto max-w-6xl">
        <SectionTitle subtitle="I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.">
          Get In <span className="gradient-text">Touch</span>
        </SectionTitle>

        <div className={`grid md:grid-cols-2 gap-12 transition-all duration-700 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          {/* Contact Information */}
          <div className="space-y-6">
            <div className="glass rounded-2xl p-8">
              <h3 className="text-2xl font-semibold mb-6 text-purple-400">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-purple-500/20 rounded-lg">
                    <Mail className="text-purple-400" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Email</h4>
                    <motion.a
                      ref={emailRef}
                      href="mailto:dakshverma633@gmail.com"
                      className="text-gray-300 hover:text-purple-400 transition-colors"
                      animate={emailGlow ? {
                        scale: [1, 1.1, 1],
                        color: ['#d1d5db', '#a855f7', '#d1d5db'],
                        textShadow: [
                          '0 0 0px rgba(168, 85, 247, 0)',
                          '0 0 20px rgba(168, 85, 247, 1), 0 0 40px rgba(168, 85, 247, 0.8)',
                          '0 0 0px rgba(168, 85, 247, 0)'
                        ]
                      } : {}}
                      transition={{ duration: 2 }}
                    >
                      dakshverma633@gmail.com
                    </motion.a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-purple-500/20 rounded-lg">
                    <MapPin className="text-purple-400" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Location</h4>
                    <p className="text-gray-300">Available for Remote Work</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-8 border-t border-white/10">
                <h4 className="font-semibold mb-4">Follow Me</h4>
                <div className="flex gap-4">
                  {[
                    { href: "https://github.com/dakshverma23", icon: Github, label: "GitHub" },
                    { href: "https://www.linkedin.com/in/daksh-verma-580326199/", icon: Linkedin, label: "LinkedIn" },
                    { href: "mailto:dakshverma633@gmail.com", icon: Mail, label: "Email", onClick: handleEmailClick }
                  ].map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target={social.label !== "Email" ? "_blank" : undefined}
                      rel={social.label !== "Email" ? "noopener noreferrer" : undefined}
                      onClick={(e) => {
                        if (social.onClick) {
                          e.preventDefault()
                          social.onClick()
                        }
                      }}
                      className="p-3 glass rounded-lg"
                      aria-label={social.label}
                      whileHover={{ 
                        scale: 1.2,
                        rotate: 360,
                        backgroundColor: "rgba(255, 255, 255, 0.2)"
                      }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      <social.icon size={20} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass rounded-2xl p-8">
            <h3 className="text-2xl font-semibold mb-6 text-purple-400">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all text-gray-100"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all text-gray-100"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-300">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all text-gray-100 resize-none"
                  placeholder="Your message here..."
                ></textarea>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold text-white flex items-center justify-center gap-2 ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                whileHover={!isSubmitting ? { 
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(168, 85, 247, 0.6)"
                } : {}}
                whileTap={!isSubmitting ? { scale: 0.95 } : {}}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <Send size={20} />
                    </motion.div>
                    Send Message
                  </>
                )}
              </motion.button>

              {/* Success/Error Messages */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300 text-sm"
                >
                  ✓ Message sent successfully! I'll get back to you soon.
                </motion.div>
              )}
              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm"
                >
                  ✗ Failed to send message. Please try again or email me directly.
                </motion.div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact


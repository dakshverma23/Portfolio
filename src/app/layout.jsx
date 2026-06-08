import './globals.css'

export const metadata = {
  title: 'Daksh Verma - Portfolio',
  description: 'Building intelligent systems and scalable web applications with cutting-edge technologies. Specializing in deep learning, computer vision, and modern full-stack development.',
  icons: {
    icon: '/vite.svg',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-gray-900 text-gray-100 antialiased">
        <div id="root">{children}</div>
      </body>
    </html>
  )
}

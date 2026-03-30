# Modern Portfolio Website

A stunning, responsive portfolio website built with React, Tailwind CSS, and Lucide React icons.

## Features

- 🎨 **Modern Design**: Glassmorphism effects, gradient backgrounds, and smooth animations
- 📱 **Fully Responsive**: Works seamlessly on mobile, tablet, and desktop
- 🎯 **Smooth Navigation**: Fixed navigation bar with active section highlighting
- ⚡ **Performance**: Optimized with React hooks and efficient rendering
- 🎭 **Interactive Elements**: Hover effects, scroll animations, and transitions
- 🚀 **Production Ready**: Configured for Vercel deployment

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Deploy to Vercel

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts to complete deployment

### Option 2: Deploy via Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Vite configuration
6. Click "Deploy"

The `vercel.json` file is already configured for optimal deployment.

## Customization

### Update Personal Information

1. **Hero Section** (`src/components/Hero.jsx`):
   - Change name, title, and tagline
   - Update social media links
   - Add your CV file to the `public` folder and update the path

2. **About Section** (`src/components/About.jsx`):
   - Update bio text
   - Modify skills array
   - Adjust years of experience and achievements

3. **Projects Section** (`src/components/Projects.jsx`):
   - Replace sample projects with your own
   - Update GitHub and demo links
   - Modify project descriptions and technologies

4. **Contact Section** (`src/components/Contact.jsx`):
   - Update email, phone, and location
   - Modify social media links
   - Connect form to your backend/email service

### Color Scheme

The color scheme uses purple, pink, and blue gradients. To customize:

1. Edit `tailwind.config.js` to add custom colors
2. Update gradient classes in components
3. Modify `src/index.css` for global color changes

## Project Structure

```
portfolio/
├── public/
│   └── resume.pdf          # Add your CV here
├── src/
│   ├── components/
│   │   ├── Navigation.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Projects.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── vercel.json
```

## License

This project is open source and available for personal and commercial use.



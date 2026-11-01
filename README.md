# Mohit mishra - Full Stack Developer Portfolio

A modern, responsive portfolio website built with Next.js and Tailwind CSS, showcasing the work and experience of Web Development Himanshi Gupta.

## Features

- 🎨 Modern, clean design inspired by professional portfolio layouts
- 📱 Fully responsive design that works on all devices
- ⚡ Built with Next.js 15 and Tailwind CSS 4
- 🎭 Smooth animations powered by Framer Motion
- 🌊 Smooth scrolling with Lenis
- 🎯 Optimized for performance and SEO
- 🔗 Interactive contact links and social media integration
- 📂 Project showcase with hover effects and animations

## Sections

1. **Header** - Portfolio title with year and avatar
2. **Introduction** - Personal bio with photo and lanyard design
3. **Experience** - Professional experience and roles
4. **Contact** - Social media links and contact information
5. **Software Skills** - Design software proficiency icons
6. **Projects** - Showcase of 5 key projects with descriptions

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open () in your browser.

## Customization

### Personal Information
Update the following in `app/componenets/home.jsx`:
- Name and title (currently set to Mohit mishra)
- Personal bio (currently set to ai & ml )
- Experience details
- Contact links
- Project information

### Styling
- Colors and themes can be modified in the Tailwind classes
- Custom CSS animations are in `app/globals.css`
- Font families can be changed in the global CSS


### Projects
Each project card can be customized with:
- Different background colors
- Project screenshots
- Project descriptions
- Links to live demos or case studies

## Project Structure

```
portfolio/
├── app/
│   ├── componenets/
│   │   └── home.jsx          # Main portfolio component
│   ├── globals.css           # Global styles and animations
│   ├── layout.jsx            # Root layout
│   └── page.jsx              # Main page
├── public/                   # Static assets
├── package.json
└── README.md
```

## Technologies Used

- **Next.js 15** - React framework
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion** - Animation library for React
- **Lenis** - Smooth scrolling library
- **React 19** - UI library
- **JavaScript/JSX** - Programming language

## Deployment

The portfolio can be deployed to various platforms:


### Netlify
```bash
npm run build
# Deploy the .next folder
```

### Other Platforms
Build the project and deploy the static files:
```bash
npm run build
npm run export
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

For questions or support, reach out to:
- Email: [Your email here]
- LinkedIn: [Your LinkedIn profile]
- GitHub: [Your GitHub profile]

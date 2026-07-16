import { useState } from 'react';
import { ExternalLink, Github, Filter } from 'lucide-react';

export const PROJECTS = [
  {
    id: 1,
    name: 'AdVision',
    fullName: 'AdVision – Multi-Modal Generative AI Advertising Platform',
    desc: 'A multi-modal Generative AI platform generating ad copy via LLM integration (DeepSeek V3) and marketing visuals via Stability AI & Pollinations AI. Features a Django REST API, JWT authentication, Fernet-encrypted API keys, and a scikit-learn ML pipeline for campaign performance forecasting and A/B testing dashboards.',
    tech: ['Django', 'PostgreSQL', 'React.js', 'scikit-learn', 'DeepSeek V3', 'Stability AI', 'Cloudinary', 'TailwindCSS', 'Recharts'],
    category: ['Python/Django', 'Generative AI/ML'],
    image: '/advision.png',
    github: 'https://github.com/Raghavv1206/Advision',
    live: 'https://advision-frontend.vercel.app/'
  },
  {
    id: 2,
    name: 'Get Me A Chai',
    fullName: 'Get Me A Chai – AI-Powered Creator Monetization Platform',
    desc: 'A Next.js 15 crowdfunding platform featuring a 200-frame Canvas API scrollytelling landing page, custom smooth scrolling, and NextAuth.js role-based auth. Engineered contextual chatbots and prompt-driven campaign wizards using the OpenRouter API, integrated with Razorpay webhooks, Chart.js, and PDF exports.',
    tech: ['Next.js 15', 'React', 'MongoDB', 'Razorpay', 'NextAuth.js', 'OpenRouter API', 'HTML5 Canvas', 'Lenis', 'TailwindCSS', 'Zod', 'Recharts'],
    category: ['Next.js/React', 'Generative AI/ML'],
    image: '/getmeachai.png',
    github: 'https://github.com/Raghavv1206/get-me-a-chai-version-2',
    live: 'https://raghavs-get-me-a-chai.vercel.app/'
  },
  {
    id: 3,
    name: 'PromptPal',
    fullName: 'PromptPal – AI-Powered Prompt Crafting & Optimization Studio',
    desc: 'Built a Next.js 15 platform for experimenting with, refining, and analyzing AI prompts through an interactive dashboard with real-time analytics and a 3D-enhanced interface. Implemented multi-provider authentication (NextAuth.js, JWT, bcrypt) and integrated the OpenAI API for prompt generation and optimization, with usage visualized via Chart.js, Recharts, and a calendar-heatmap activity tracker.',
    tech: ['Next.js 15', 'React 19', 'MongoDB', 'NextAuth.js', 'OpenAI API', 'Chart.js', 'Recharts', 'Framer Motion', 'Spline (3D)', 'TailwindCSS'],
    category: ['Next.js/React', 'Generative AI/ML'],
    image: '/promptpal.png',
    github: 'https://github.com/Raghavv1206/PROMPTPAL',
    live: 'https://promptpal-phi.vercel.app/'
  },
  {
    id: 4,
    name: 'MediMate AI',
    fullName: 'MediMate AI – AI-Powered Medication Adherence Platform',
    desc: 'Built a medication adherence platform for elderly and chronic-illness patients in India, delivering WhatsApp and voice-based reminders via APScheduler-driven scheduling. Designed a 5-factor risk scoring engine and a 3-tier escalation chain to flag missed doses and alert caregivers, with a Hugging Face GPT-2 model powering conversational support; built in a 7-day hackathon sprint for Capgemini.',
    tech: ['Django', 'React', 'APScheduler', 'Hugging Face', 'Vercel', 'Render', 'Llama 3.3', 'Twillio', 'whatsapp- meta api'],
    category: ['Python/Django', 'Generative AI/ML'],
    image: '/medimate.png',
    github: 'https://github.com/Raghavv1206/Medimate-AI',
    live: '#'
  },
  {
    id: 5,
    name: 'TrailTribal',
    fullName: 'TrailTribal – Immersive Destination Discovery & Artisan Marketplace',
    desc: 'Built a Next.js 15 platform combining trip planning, offbeat/tribal destination discovery, and a traveler community with 360° place previews for immersive exploration. Developed an integrated e-commerce marketplace for local artisans to sell directly to tourists, alongside a government-facing analytics dashboard surfacing visitor interaction insights for tourism planning.',
    tech: ['Next.js 15', 'React 19', 'MongoDB', 'NextAuth.js', 'Firebase', 'Recharts', 'Framer Motion', 'TailwindCSS'],
    category: ['Next.js/React'],
    image: '/trailtribal.png',
    github: 'https://github.com/Raghavv1206/SIH-2025',
    live: '#'
  }
];

export default function Projects() {
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Python/Django', 'Next.js/React', 'Generative AI/ML'];

  const filteredProjects = filter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category.includes(filter));

  return (
    <div className="flex flex-col gap-4 text-gray-800 h-full p-2 overflow-hidden">
      {/* Header */}
      <h2 className="text-xl font-bold border-b border-gray-300 pb-2 flex items-center justify-between flex-shrink-0">
        <span className="text-blue-900">Projects Portfolio</span>
        <span className="text-xs font-normal bg-blue-100 text-blue-800 px-2 py-1 rounded">
          {filteredProjects.length} Items Found
        </span>
      </h2>

      {/* Filter Buttons */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 flex-shrink-0">
        <Filter className="w-3.5 h-3.5 text-gray-500" />
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`text-xs px-2.5 py-1 rounded transition border ${
              filter === cat 
                ? 'bg-blue-600 border-blue-600 text-white font-semibold' 
                : 'bg-white border-gray-300 hover:bg-gray-50 text-gray-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      
      {/* Projects List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto pb-6 flex-1 pr-1">
        {filteredProjects.map(proj => (
          <div key={proj.id} className="border border-gray-300 rounded overflow-hidden shadow-sm hover:shadow-md relative group transition-all bg-white flex flex-col">
            {/* Project Image */}
            <div className="w-full h-36 bg-gray-200 border-b border-gray-300 overflow-hidden relative">
               <img 
                 src={proj.image} 
                 alt={proj.name} 
                 className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300" 
                 onError={(e) => {
                   // Fallback to high quality screen mockup in case image fails
                   e.target.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500";
                 }}
               />
               <div className="absolute top-2 right-2 flex gap-1">
                 {proj.category.map(cat => (
                   <span key={cat} className="text-[9px] bg-blue-900/90 text-white px-1.5 py-0.5 rounded backdrop-blur-sm">
                     {cat}
                   </span>
                 ))}
               </div>
            </div>
            
            {/* Project Details */}
            <div className="p-3 flex flex-col flex-1 min-h-0">
              <h3 className="font-bold text-md text-blue-900 leading-tight">{proj.fullName}</h3>
              <p className="text-xs text-gray-600 mt-2 mb-3 leading-relaxed flex-1 overflow-y-auto scrollbar-thin">
                {proj.desc}
              </p>
              
              {/* Tech Badges */}
              <div className="flex flex-wrap gap-1 mb-3 mt-auto">
                {proj.tech.map(t => (
                  <span key={t} className="text-[10px] bg-blue-50 border border-blue-100 px-1.5 py-0.5 text-blue-800 rounded-sm">
                    {t}
                  </span>
                ))}
              </div>

              {/* Actions Links */}
              <div className="flex gap-2 text-xs font-semibold border-t border-gray-100 pt-2.5">
                <button 
                  onClick={() => window.open(proj.github, '_blank', 'noopener,noreferrer')}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-blue-50 text-blue-700 py-1.5 rounded hover:bg-blue-100 active:scale-98 transition border border-blue-200"
                >
                  <Github className="w-3.5 h-3.5" /> Code Repo
                </button>
                {proj.live && proj.live !== '#' && (
                  <button 
                    onClick={() => window.open(proj.live, '_blank', 'noopener,noreferrer')}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-green-50 text-green-700 py-1.5 rounded hover:bg-green-100 active:scale-98 transition border border-green-200"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

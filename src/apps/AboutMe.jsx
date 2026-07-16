import { User, Code, Terminal, MonitorSmartphone, Database, BrainCircuit, Wrench, Briefcase, GraduationCap, Award, Flag } from 'lucide-react';

export default function AboutMe() {
  return (
    <div className="flex flex-col gap-6 text-gray-800 p-4 overflow-y-auto h-full pb-8 select-text">
      {/* Profile Header */}
      <div className="flex gap-4 items-center mb-2 select-text">
        <div className="w-24 h-24 rounded shadow-md overflow-hidden border-2 border-gray-300 flex-shrink-0 bg-white">
          <img src="/avatar.jpg" alt="Raghav Mishra" className="w-full h-full object-cover" />
        </div>
        <div className="select-text">
          <h1 className="text-3xl font-bold font-serif mb-1 text-blue-900">Raghav Mishra</h1>
          <p className="text-lg text-gray-600 font-medium font-sans">Full Stack & AI Engineer</p>
          <p className="text-xs text-gray-500 font-sans">Bhopal, India • +91-9301563593 • raghavm205@gmail.com</p>
          <p className="text-xs text-blue-800 font-medium font-mono mt-0.5">github.com/Raghavv1206 | linkedin.com/in/raghav-mishra-677418316</p>
        </div>
      </div>

      {/* Description Bio / Profile Summary */}
      <div className="p-4 rounded border border-blue-200 bg-blue-50/50 text-sm leading-relaxed text-black font-sans select-text">
        <p>
          Final-year CS student with production-grade full-stack experience across internships at Newrise Technosys and BHEL, alongside AI-powered web applications built with FastAPI, Django, React, and Next.js. CGPA 8.25. Interested in Full-Stack Development, Backend Engineering, and AI Engineering roles.
        </p>
      </div>

      {/* Experience */}
      <div className="select-text">
        <h2 className="text-lg font-bold border-b border-gray-300 pb-1.5 mb-3.5 flex items-center gap-2 text-blue-900">
          <Briefcase className="w-5 h-5 text-blue-800" /> Experience
        </h2>
        <div className="space-y-4 select-text">
          <div>
            <div className="flex justify-between items-baseline mb-1">
              <h3 className="font-bold text-gray-900 text-sm">Full Stack Developer Intern</h3>
              <span className="text-xs text-gray-500 font-mono">July 2026 – Present</span>
            </div>
            <div className="text-xs font-semibold text-blue-800 mb-1.5">
              Newrise Technosys Pvt. Ltd. | Bhopal, India
            </div>
            <ul className="list-disc list-outside text-xs text-gray-700 space-y-1.5 ml-4">
              <li>Implemented the Project Management module for a production-grade Multi-Tenant Payroll & HR Management System using FastAPI, SQLAlchemy, React, TypeScript, and MySQL.</li>
              <li>Extended the existing relational database schema and developed and integrated REST API endpoints supporting clients, projects, team assignments, milestones, and task workflows.</li>
              <li>Developed responsive React (TypeScript) interfaces for project dashboards, client management, and milestone/task workflows, integrated with the platform’s existing RBAC framework.</li>
            </ul>
          </div>

          <div>
            <div className="flex justify-between items-baseline mb-1">
              <h3 className="font-bold text-gray-900 text-sm">Industrial Trainee, DTG Department</h3>
              <span className="text-xs text-gray-500 font-mono">June 2026</span>
            </div>
            <div className="text-xs font-semibold text-blue-800 mb-1.5">
              Bharat Heavy Electricals Ltd. (BHEL), Bhopal | Bhopal, India
            </div>
            <ul className="list-disc list-outside text-xs text-gray-700 space-y-1.5 ml-4">
              <li>Developed BHEL Connect, an internal employee marketplace and group-buying platform using Django REST Framework, React 18+, PostgreSQL, and Redis — deployed on Vercel and Render.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="select-text">
        <h2 className="text-lg font-bold border-b border-gray-300 pb-1.5 mb-4 flex items-center gap-2 text-blue-900">
          <Code className="w-5 h-5 text-blue-800" /> Technical Skills
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold select-text">
          {/* Languages */}
          <div className="bg-orange-50 border border-orange-200 rounded p-2.5 flex flex-col gap-1.5 shadow-sm">
            <div className="flex items-center gap-1.5 text-orange-800 font-bold">
              <Terminal className="w-4 h-4" />
              <span>Programming Languages</span>
            </div>
            <div className="flex flex-wrap gap-1 mt-1">
              {['Python', 'JavaScript', 'TypeScript', 'C++', 'SQL'].map(t => (
                <span key={t} className="bg-orange-600 text-white px-2 py-0.5 rounded-sm">{t}</span>
              ))}
            </div>
          </div>
          
          {/* Backend */}
          <div className="bg-green-50 border border-green-200 rounded p-2.5 flex flex-col gap-1.5 shadow-sm">
            <div className="flex items-center gap-1.5 text-green-800 font-bold">
              <Database className="w-4 h-4" />
              <span>Backend Engineering</span>
            </div>
            <div className="flex flex-wrap gap-1 mt-1">
              {['FastAPI', 'SQLAlchemy', 'Django', 'Django REST Framework', 'Node.js', 'Express.js'].map(t => (
                <span key={t} className="bg-green-700 text-white px-2 py-0.5 rounded-sm">{t}</span>
              ))}
            </div>
          </div>
          
          {/* Frontend */}
          <div className="bg-blue-50 border border-blue-200 rounded p-2.5 flex flex-col gap-1.5 shadow-sm">
            <div className="flex items-center gap-1.5 text-blue-800 font-bold">
              <MonitorSmartphone className="w-4 h-4" />
              <span>Frontend Development</span>
            </div>
            <div className="flex flex-wrap gap-1 mt-1">
              {['React.js', 'Next.js', 'TailwindCSS', 'Redux', 'HTML5', 'CSS3'].map(t => (
                <span key={t} className="bg-blue-600 text-white px-2 py-0.5 rounded-sm">{t}</span>
              ))}
            </div>
          </div>

          {/* Databases */}
          <div className="bg-teal-50 border border-teal-200 rounded p-2.5 flex flex-col gap-1.5 shadow-sm">
            <div className="flex items-center gap-1.5 text-teal-800 font-bold">
              <Database className="w-4 h-4" />
              <span>Databases</span>
            </div>
            <div className="flex flex-wrap gap-1 mt-1">
              {['PostgreSQL', 'MongoDB', 'MySQL'].map(t => (
                <span key={t} className="bg-teal-600 text-white px-2 py-0.5 rounded-sm">{t}</span>
              ))}
            </div>
          </div>

          {/* Generative AI & ML */}
          <div className="bg-purple-50 border border-purple-200 rounded p-2.5 flex flex-col gap-1.5 shadow-sm">
            <div className="flex items-center gap-1.5 text-purple-800 font-bold">
              <BrainCircuit className="w-4 h-4" />
              <span>Generative AI & ML</span>
            </div>
            <div className="flex flex-wrap gap-1 mt-1">
              {['LLM Integration', 'Prompt Engineering', 'AI Image Generation', 'ML Pipelines', 'scikit-learn'].map(t => (
                <span key={t} className="bg-purple-700 text-white px-2 py-0.5 rounded-sm">{t}</span>
              ))}
            </div>
          </div>

          {/* Tools & Platforms */}
          <div className="bg-gray-50 border border-gray-200 rounded p-2.5 flex flex-col gap-1.5 shadow-sm">
            <div className="flex items-center gap-1.5 text-gray-800 font-bold">
              <Wrench className="w-4 h-4" />
              <span>Tools & Platforms</span>
            </div>
            <div className="flex flex-wrap gap-1 mt-1">
              {['Git', 'Docker', 'Vercel', 'Railway', 'Cloudinary', 'Postman'].map(t => (
                <span key={t} className="bg-gray-600 text-white px-2 py-0.5 rounded-sm">{t}</span>
              ))}
            </div>
          </div>

          {/* Problem Solving */}
          <div className="bg-indigo-50 border border-indigo-200 rounded p-2.5 flex flex-col gap-1.5 shadow-sm">
            <div className="flex items-center gap-1.5 text-indigo-800 font-bold">
              <User className="w-4 h-4" />
              <span>Problem Solving</span>
            </div>
            <div className="flex flex-wrap gap-1 mt-1">
              <span className="bg-indigo-600 text-white px-2 py-0.5 rounded-sm">350+ DSA problems solved (LeetCode, Code360, GFG)</span>
            </div>
          </div>

          {/* Salesforce */}
          <div className="bg-rose-50 border border-rose-200 rounded p-2.5 flex flex-col gap-1.5 shadow-sm">
            <div className="flex items-center gap-1.5 text-rose-800 font-bold">
              <BrainCircuit className="w-4 h-4" />
              <span>Salesforce</span>
            </div>
            <div className="flex flex-wrap gap-1 mt-1">
              {['Apex', 'Lightning Web Components'].map(t => (
                <span key={t} className="bg-rose-600 text-white px-2 py-0.5 rounded-sm">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Certifications & Education Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 select-text">
        {/* Certifications */}
        <div>
          <h2 className="text-lg font-bold border-b border-gray-300 pb-1.5 mb-3.5 flex items-center gap-2 text-blue-900">
            <Award className="w-5 h-5 text-blue-800" /> Certifications
          </h2>
          <ul className="list-disc list-outside text-xs text-gray-700 space-y-2 ml-4">
            <li><strong>AWS:</strong> Generative AI Foundations</li>
            <li><strong>Google for Developers:</strong> AI-ML Virtual Internship (10-week program via EduSkills)</li>
            <li><strong>Salesforce:</strong> Agentforce Specialist, Platform Developer 1</li>
            <li><strong>GeeksForGeeks:</strong> GfG 160 - 160 Days of Problem Solving</li>
          </ul>
        </div>

        {/* Education */}
        <div>
          <h2 className="text-lg font-bold border-b border-gray-300 pb-1.5 mb-3.5 flex items-center gap-2 text-blue-900">
            <GraduationCap className="w-5 h-5 text-blue-800" /> Education
          </h2>
          <div>
            <h3 className="font-bold text-gray-900 text-sm">B.Tech in Computer Science Engineering</h3>
            <div className="text-xs text-blue-800 font-semibold mt-0.5">
              LNCT University, Bhopal
            </div>
            <div className="text-xs text-gray-500 font-mono mt-0.5">
              2023 – 2027 | CGPA: 8.25/10.0
            </div>
          </div>
        </div>
      </div>

      {/* Leadership & Achievements */}
      <div className="select-text">
        <h2 className="text-lg font-bold border-b border-gray-300 pb-1.5 mb-3.5 flex items-center gap-2 text-blue-900">
          <Flag className="w-5 h-5 text-blue-800" /> Leadership & Achievements
        </h2>
        <div>
          <div className="flex justify-between items-baseline mb-1">
            <h3 className="font-bold text-gray-900 text-sm">Vice President, E-Cell</h3>
            <span className="text-xs text-gray-500 font-mono">2024 - 2025</span>
          </div>
          <div className="text-xs font-semibold text-blue-800 mb-1.5">
            LNCT University
          </div>
          <ul className="list-disc list-outside text-xs text-gray-700 ml-4">
            <li>Organized startup competitions and connected 15+ student founders with industry mentors across 200+ participants.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

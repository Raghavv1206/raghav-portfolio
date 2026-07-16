import { useState } from 'react';
import { Send, Linkedin, Github, Mail } from 'lucide-react';
import emailjs from '@emailjs/browser';

export default function ContactMe() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus({ type: 'loading', message: 'Sending message...' });

    // Retrieve EmailJS configuration from environment variables (Vite specific)
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus({
        type: 'error',
        message: 'EmailJS credentials are not configured. Please see the `.env.example` file in the project root to set up your keys.'
      });
      return;
    }

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
    };

    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log('EmailJS Success:', response.status, response.text);
        setStatus({ type: 'success', message: 'Your message has been sent successfully!' });
        setFormData({ name: '', email: '', message: '' });
        // Clear message after 5 seconds
        setTimeout(() => setStatus({ type: '', message: '' }), 5000);
      }, (err) => {
        console.error('EmailJS Error:', err);
        setStatus({ type: 'error', message: `Failed to send message: ${err.text || 'Unknown error'}` });
      });
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 h-full text-black p-2 overflow-y-auto pb-8">
      
      {/* Contact Form */}
      <div className="flex-1 bg-white p-6 shadow-sm border border-gray-200 rounded flex flex-col">
        <h2 className="text-2xl font-bold mb-1 font-serif text-blue-900">Get In Touch</h2>
        <p className="text-sm text-gray-500 mb-6">Drop Raghav a line, and he will get back to you ASAP.</p>
        
        {status.message && (
          <div className={`px-4 py-2 rounded mb-4 text-sm font-medium border ${
            status.type === 'success' ? 'bg-green-100 border-green-400 text-green-700' :
            status.type === 'error' ? 'bg-red-100 border-red-400 text-red-700' :
            'bg-blue-100 border-blue-400 text-blue-700 animate-pulse'
          }`}>
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1">
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Your Name</label>
            <input 
              type="text" 
              required
              disabled={status.type === 'loading'}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition shadow-inner bg-gray-50 focus:bg-white disabled:opacity-50"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="e.g. John Doe"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Email Address</label>
            <input 
              type="email" 
              required
              disabled={status.type === 'loading'}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition shadow-inner bg-gray-50 focus:bg-white disabled:opacity-50"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="e.g. johndoe@example.com"
            />
          </div>
          <div className="flex-1 flex flex-col min-h-[120px]">
            <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Message</label>
            <textarea 
              required
              disabled={status.type === 'loading'}
              className="w-full flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition shadow-inner bg-gray-50 focus:bg-white resize-none disabled:opacity-50"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              placeholder="How can I help you?"
            ></textarea>
          </div>
          
          <button 
            type="submit"
            disabled={status.type === 'loading'}
            className={`mt-2 text-white font-bold py-2 px-4 rounded shadow flex items-center justify-center gap-2 transition ${
              status.type === 'loading' ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            <Send className="w-4 h-4" /> {status.type === 'loading' ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>

      {/* Social Side Panel */}
      <div className="w-full md:w-1/3 bg-gray-50 border border-gray-200 rounded p-6 flex flex-col items-center justify-center text-center gap-5">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-2 shadow-sm border border-blue-200">
          <Mail className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h3 className="font-bold text-gray-800 text-md">Direct Email</h3>
          <a href="mailto:raghavm205@gmail.com" className="text-sm text-blue-600 hover:underline font-semibold">
            raghavm205@gmail.com
          </a>
        </div>

        {/* Social Links */}
        <div className="flex flex-col gap-3 w-full mt-4">
          <a 
            href="https://github.com/Raghavv1206" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-full py-2 px-4 bg-white border border-gray-300 rounded flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors shadow-sm"
          >
            <Github className="w-4 h-4 text-black" />
            <span className="text-xs font-bold text-gray-700">Github Profile</span>
          </a>
          
          <a 
            href="https://linkedin.com/in/raghav-mishra-677418316" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-full py-2 px-4 bg-white border border-gray-300 rounded flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors shadow-sm"
          >
            <Linkedin className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-bold text-gray-700">LinkedIn Connection</span>
          </a>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Brain, MessageSquare, BarChart2, Activity, PenLine, Leaf } from 'lucide-react';

const projects = [
  { id: 1, title: 'Explainable Fuzzy Vision Transformer', subtitle: 'Temporal Ergonomic Risk Prediction', year: '2026 · Ongoing', type: 'Final Year Research', description: 'AI-based ergonomic risk assessment framework using Computer Vision, Temporal Vision Transformers, and Explainable AI. End-to-end pipeline for pose extraction, REBA-based risk labelling, and temporal sequence modelling from workplace video data.', tags: ['Python', 'TensorFlow', 'MediaPipe', 'OpenCV', 'Scikit-Fuzzy', 'Streamlit'], icon: Brain },
  { id: 2, title: 'ChatMate', subtitle: 'AI-Powered Educational Chatbot', year: '2025 · Ongoing', type: 'Individual Project', description: 'Full-stack AI chatbot for enhanced education. Built with MERN stack, with authentication and LangChain-based RAG model for contextual, accurate responses.', tags: ['React', 'Node.js', 'MongoDB', 'LangChain', 'RAG', 'OpenAI'], icon: MessageSquare },
  { id: 3, title: 'Financial Forecasting Tool', subtitle: 'Time Series Budget Management', year: '2023 – 2024', type: '2nd Year Project · Zone24x7', description: 'Financial management tool for budget planning based on cash and bank transactions. Uses time series models for future financial predictions.', tags: ['React Native', 'NativeBase', 'MongoDB', 'FastAPI', 'Time Series'], icon: BarChart2 },
  { id: 4, title: 'Ergonomic Posture Scorer', subtitle: 'Computer Vision Assessment Tool', year: '2025', type: 'Individual Project', description: 'Ergonomic assessment tool to analyze weightlifter posture. Evaluates joint strain and classifies posture on a scale of 1–9 using computer vision and deep learning.', tags: ['OpenCV', 'MediaPipe Pose', 'YOLOv5', 'PyTorch', 'NumPy'], icon: Activity },
  { id: 5, title: 'Shakespeare LSTM Generator', subtitle: 'Neural Text Generation Model', year: '2024', type: 'Individual Project', description: 'LSTM-based text generation model producing Shakespearean text by predicting the next character in a sequence to emulate his poetic structure.', tags: ['Python', 'TensorFlow', 'LSTM Neural Networks'], icon: PenLine },
  { id: 6, title: 'Carbon Footprint Expert System', subtitle: 'Rule-Based Environmental Advisor', year: '2024', type: 'Individual Project', description: 'Web-based expert system assessing carbon footprints across Energy, Transportation, and Waste Management with rule-based recommendations.', tags: ['Python', 'Streamlit', 'Experta'], icon: Leaf },
];

const variants = {
  enter: (d) => ({ x: d > 0 ? 250 : -250, opacity: 0, scale: 0.97 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (d) => ({ x: d > 0 ? -250 : 250, opacity: 0, scale: 0.97 }),
};

export default function Projects() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = (d) => { setDirection(d); setCurrent((p) => (p + d + projects.length) % projects.length); };

  return (
    <section id="projects" style={{ padding: '120px 0', position: 'relative', background: '#E7DDD6' }}>
      <hr className="section-divider-light" style={{ position: 'absolute', top: 0, left: 0, right: 0 }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="eyebrow-light" style={{ marginBottom: 12 }}>What I've built</span>
          <h2 className="section-heading font-serif" style={{ color: '#1a0008' }}>
            Featured <em style={{ color: '#5B0017', fontStyle: 'italic' }}>Projects</em>
          </h2>
        </motion.div>

        {/* Carousel card */}
        <div className="card-light" style={{ overflow: 'hidden', minHeight: 360, marginBottom: 20, position: 'relative', border: '1px solid rgba(91,0,23,0.14)' }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div key={current} custom={direction} variants={variants} initial="enter" animate="center" exit="exit"
              transition={{ type: 'spring', stiffness: 280, damping: 28 }}
              className="carousel-inner" style={{ padding: '48px 52px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}
            >
              {/* Left */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(91,0,23,0.08)', border: '1px solid rgba(91,0,23,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5B0017', flexShrink: 0 }}>
                    {React.createElement(projects[current].icon, { size: 22 })}
                  </div>
                  <span className="chip-light">{projects[current].type}</span>
                </div>
                <h3 className="font-serif" style={{ fontSize: '1.8rem', fontWeight: 700, color: '#1a0008', marginBottom: 8, lineHeight: 1.2 }}>{projects[current].title}</h3>
                <p style={{ fontSize: '0.9rem', color: '#5B0017', fontWeight: 500, marginBottom: 6 }}>{projects[current].subtitle}</p>
                <p style={{ fontSize: '0.72rem', color: 'rgba(40,10,20,0.35)', marginBottom: 20 }}>{projects[current].year}</p>
                <p style={{ fontSize: '0.87rem', lineHeight: 1.85, color: 'rgba(40,10,20,0.62)', marginBottom: 24 }}>{projects[current].description}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {projects[current].tags.map(tag => <span key={tag} className="chip-light">{tag}</span>)}
                </div>
              </div>
              {/* Right visual */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <motion.div animate={{ rotate: [0, 2, -2, 0], scale: [1, 1.02, 1] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ width: 210, height: 210, borderRadius: 28, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'linear-gradient(135deg, #F5F1ED, #E7DDD6)',
                    border: '1.5px solid rgba(91,0,23,0.20)',
                    boxShadow: '0 20px 60px rgba(91,0,23,0.14)', color: '#5B0017',
                  }}>
                  {React.createElement(projects[current].icon, { size: 72, strokeWidth: 1.2 })}
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 48 }}>
          <motion.button onClick={() => paginate(-1)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            style={{ width: 44, height: 44, borderRadius: '50%', border: '1.5px solid rgba(91,0,23,0.28)', background: '#F5F1ED', color: '#5B0017', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 10px rgba(91,0,23,0.10)' }}
          ><ChevronLeft size={20} /></motion.button>

          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {projects.map((_, i) => (
              <motion.button key={i} onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                animate={{ width: i === current ? 26 : 8, opacity: i === current ? 1 : 0.35 }}
                style={{ height: 8, borderRadius: 4, border: 'none', background: i === current ? '#5B0017' : 'rgba(91,0,23,0.38)', cursor: 'pointer', padding: 0 }}
              />
            ))}
          </div>

          <motion.button onClick={() => paginate(1)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            style={{ width: 44, height: 44, borderRadius: '50%', border: '1.5px solid rgba(91,0,23,0.28)', background: '#F5F1ED', color: '#5B0017', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 10px rgba(91,0,23,0.10)' }}
          ><ChevronRight size={20} /></motion.button>
        </div>

        {/* Grid */}
        <div className="proj-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {projects.map((proj, i) => (
            <motion.div key={proj.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`project-thumb ${current === i ? 'active' : ''}`}
              onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); window.scrollTo({ top: document.getElementById('projects').offsetTop - 100, behavior: 'smooth' }); }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
                <div style={{ width: 32, height: 32, borderRadius: 10, background: 'rgba(91,0,23,0.08)', border: '1px solid rgba(91,0,23,0.16)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5B0017', flexShrink: 0 }}>
                  {React.createElement(proj.icon, { size: 16 })}
                </div>
                <div style={{ minWidth: 0 }}>
                  <p className="font-serif" style={{ fontWeight: 600, fontSize: '0.84rem', color: '#1a0008', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{proj.title}</p>
                  <p style={{ fontSize: '0.70rem', color: 'rgba(91,0,23,0.60)', marginTop: 3 }}>{proj.year}</p>
                </div>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {proj.tags.slice(0, 3).map(tag => <span key={tag} className="chip-light" style={{ fontSize: '0.65rem', padding: '3px 10px' }}>{tag}</span>)}
                {proj.tags.length > 3 && <span className="chip-light" style={{ fontSize: '0.65rem', padding: '3px 10px' }}>+{proj.tags.length - 3}</span>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <hr className="section-divider-light" style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }} />
    </section>
  );
}

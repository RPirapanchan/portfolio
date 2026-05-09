import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, Brain, Globe, Settings, Database, Wrench } from 'lucide-react';

const skillGroups = [
  { category: 'Programming Languages', icon: <Monitor size={16} />, skills: ['Python', 'Java', 'C', 'JavaScript'] },
  { category: 'AI & ML Libraries', icon: <Brain size={16} />, skills: ['TensorFlow', 'PyTorch', 'Scikit-Learn', 'NumPy', 'Pandas', 'Matplotlib', 'OpenCV', 'MediaPipe'] },
  { category: 'Web Development', icon: <Globe size={16} />, skills: ['React', 'React Native', 'HTML', 'CSS', 'JavaScript'] },
  { category: 'Backend & APIs', icon: <Settings size={16} />, skills: ['FastAPI', 'Node.js', 'Express.js'] },
  { category: 'Databases', icon: <Database size={16} />, skills: ['MySQL', 'MongoDB'] },
  { category: 'Tools & DevOps', icon: <Wrench size={16} />, skills: ['Git', 'Streamlit', 'NativeBase', 'LangChain', 'RAG'] },
];

const bars = [
  { skill: 'Python', level: 90 },
  { skill: 'TensorFlow / PyTorch', level: 80 },
  { skill: 'Computer Vision (OpenCV / MediaPipe)', level: 85 },
  { skill: 'React / React Native', level: 75 },
  { skill: 'FastAPI / Node.js', level: 70 },
  { skill: 'MongoDB / MySQL', level: 65 },
];

export default function Skills() {
  return (
    <section id="skills" style={{ padding: '120px 0', position: 'relative', background: '#E7DDD6' }}>
      <hr className="section-divider-light" style={{ position: 'absolute', top: 0, left: 0, right: 0 }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: 72 }}>
          <span className="eyebrow-light" style={{ marginBottom: 12 }}>My Toolkit</span>
          <h2 className="section-heading font-serif" style={{ color: '#1a0008' }}>
            Technical <em style={{ color: '#5B0017', fontStyle: 'italic' }}>Skills</em>
          </h2>
        </motion.div>

        <div className="skills-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'start' }}>
          {/* Skill group cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {skillGroups.map((group, gi) => (
              <motion.div key={gi} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: gi * 0.07 }}
                className="card-light" style={{ padding: '22px 26px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                  <span style={{ color: '#5B0017', opacity: 0.75, flexShrink: 0 }}>{group.icon}</span>
                  <span style={{ fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(91,0,23,0.70)', fontWeight: 600 }}>{group.category}</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {group.skills.map(skill => <span key={skill} className="chip-light">{skill}</span>)}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bars + Soft Skills */}
          <div>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              style={{ fontSize: '0.68rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(91,0,23,0.60)', marginBottom: 32, fontWeight: 600 }}>
              Core Proficiencies
            </motion.p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {bars.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: i * 0.08 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontSize: '0.87rem', color: 'rgba(40,10,20,0.75)' }}>{item.skill}</span>
                    <span style={{ fontSize: '0.78rem', color: '#5B0017', fontWeight: 600 }}>{item.level}%</span>
                  </div>
                  <div className="progress-track">
                    <motion.div className="progress-fill"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: i * 0.1 + 0.3, ease: 'easeOut' }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Soft Skills */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.5 }}
              className="card-light" style={{ padding: '22px 26px', marginTop: 36 }}>
              <p style={{ fontSize: '0.68rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(91,0,23,0.60)', marginBottom: 14, fontWeight: 600 }}>Soft Skills</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {['Teamwork', 'Communication', 'Problem Solving', 'Creativity', 'Adaptability'].map(s => (
                  <span key={s} className="chip-light">{s}</span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <hr className="section-divider-light" style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }} />
    </section>
  );
}

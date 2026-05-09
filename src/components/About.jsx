import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { value: '4+', label: 'Projects Built' },
  { value: 'AI', label: 'Specialization' },
  { value: '2026', label: 'Graduating' },
  { value: '6mo', label: 'Internship' },
];

const infoRows = [
  ['🎓', 'University of Moratuwa'],
  ['📍', 'Sri Lanka'],
  ['💼', 'AI Engineer Intern @ Techorin'],
  ['📧', 'pirapanchanraghavan@gmail.com'],
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" className="section-cream" style={{ padding: '120px 0', position: 'relative' }}>
      <hr className="section-divider-light" style={{ position: 'absolute', top: 0, left: 0, right: 0 }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: 72 }}>
          <span className="eyebrow-light" style={{ marginBottom: 12 }}>Get to know me</span>
          <h2 className="section-heading font-serif text-dark-heading">
            About <em style={{ color: '#5B0017', fontStyle: 'italic' }}>Me</em>
          </h2>
        </motion.div>

        <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }} ref={ref}>
          {/* Profile Card */}
          <motion.div initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }} style={{ position: 'relative' }}>
            <div className="card-light" style={{ padding: 44, textAlign: 'center' }}>
              {/* Avatar */}
              <div style={{ width: 110, height: 110, borderRadius: '50%', margin: '0 auto 24px', background: 'linear-gradient(135deg, #5B0017, #700020)', boxShadow: '0 12px 50px rgba(91,0,23,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', fontWeight: 700, color: '#F5F1ED' }}>
                RP
              </div>
              <h3 className="font-serif" style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1a0008', marginBottom: 6 }}>Raghavan Pirapanchan</h3>
              <p style={{ fontSize: '0.82rem', color: '#5B0017', marginBottom: 28, fontWeight: 500 }}>AI Engineer · Computer Vision · NLP</p>

              {infoRows.map(([icon, text], i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12, textAlign: 'left' }}>
                  <span style={{ fontSize: '1rem', flexShrink: 0 }}>{icon}</span>
                  <span style={{ fontSize: '0.83rem', color: 'rgba(40,10,20,0.62)' }}>{text}</span>
                </div>
              ))}

              <div style={{ display: 'flex', gap: 8, marginTop: 20, flexWrap: 'wrap' }}>
                {['English', 'Tamil'].map(lang => <span key={lang} className="chip-light">{lang}</span>)}
              </div>
            </div>
            {/* Offset decorative border */}
            <div style={{ position: 'absolute', inset: 0, borderRadius: 20, border: '1px solid rgba(91,0,23,0.12)', transform: 'translate(10px, 10px)', zIndex: -1 }} />
          </motion.div>

          {/* Text */}
          <div>
            <motion.h3 initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }}
              className="font-serif" style={{ fontSize: '1.75rem', fontWeight: 600, color: '#1a0008', lineHeight: 1.3, marginBottom: 20 }}>
              Passionate about building <em style={{ color: '#5B0017' }}>intelligent</em> solutions
            </motion.h3>

            <motion.p initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.12 }}
              style={{ fontSize: '0.95rem', lineHeight: 1.85, color: 'rgba(40,10,20,0.62)', marginBottom: 16 }}>
              I am an AI undergraduate at the University of Moratuwa, passionate about creating innovative solutions and improving intelligent systems. I excel at solving complex problems by breaking them down into effective, elegant solutions.
            </motion.p>

            <motion.p initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.24 }}
              style={{ fontSize: '0.95rem', lineHeight: 1.85, color: 'rgba(40,10,20,0.62)', marginBottom: 36 }}>
              My research focuses on <span style={{ color: '#5B0017', fontWeight: 600 }}>Temporal Vision Transformers</span> for ergonomic risk prediction — combining Computer Vision, Explainable AI, and Fuzzy Inference Systems to make workplaces safer.
            </motion.p>

            {/* Stats */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.36 }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
              {stats.map((s, i) => (
                <div key={i} className="stat-card-light">
                  <div className="stat-value-light">{s.value}</div>
                  <div className="stat-label-light">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <hr className="section-divider-light" style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }} />
    </section>
  );
}

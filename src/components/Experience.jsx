import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';

const experiences = [
  {
    company: 'Techorin',
    role: 'AI Engineer Intern',
    period: 'March 2025 – September 2025',
    type: 'Internship',
    description: 'Designed and developed AI-driven solutions focused on computer vision-based detection systems. Collaborated with cross-functional teams to implement vision models for real-world applications and gained hands-on experience in deploying and optimizing AI solutions.',
    tags: ['Computer Vision', 'AI Systems', 'Model Deployment', 'Cross-functional Teams'],
  },
];

const education = [
  { institution: 'University of Moratuwa', degree: 'BSc (Hons) in Artificial Intelligence', period: 'May 2022 – 2026', detail: 'Faculty of Information Technology' },
  { institution: 'Jaffna Hindu College', degree: 'G.C.E. Advanced Level', period: '2010 – 2020', detail: 'Combined Maths - A · Physics - C · Chemistry - C · Z-Score: 1.2001' },
];

export default function Experience() {
  return (
    <section id="experience" style={{ padding: '120px 0', position: 'relative', background: '#E7DDD6' }}>
      <hr className="section-divider-light" style={{ position: 'absolute', top: 0, left: 0, right: 0 }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: 72 }}>
          <span className="eyebrow-light" style={{ marginBottom: 12 }}>My Journey</span>
          <h2 className="section-heading font-serif" style={{ color: '#1a0008' }}>
            Experience &amp; <em style={{ color: '#5B0017', fontStyle: 'italic' }}>Education</em>
          </h2>
        </motion.div>

        <div className="exp-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56 }}>
          {/* Work */}
          <div>
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
              <Briefcase size={15} style={{ color: 'rgba(91,0,23,0.60)' }} />
              <span style={{ fontSize: '0.68rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(91,0,23,0.60)', fontWeight: 600 }}>Work Experience</span>
            </motion.div>

            <div style={{ position: 'relative', paddingLeft: 28 }}>
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 1.5, background: 'linear-gradient(180deg, #5B0017 0%, rgba(91,0,23,0.15) 100%)' }} />
              {experiences.map((exp, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.15 }} style={{ position: 'relative', marginBottom: 20 }}>
                  <div className="timeline-dot-light" style={{ position: 'absolute', left: -35, top: 22 }} />
                  <div className="card-light" style={{ padding: '28px 30px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
                      <div>
                        <h4 className="font-serif" style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1a0008', marginBottom: 4 }}>{exp.role}</h4>
                        <p style={{ fontSize: '0.87rem', fontWeight: 600, color: '#5B0017' }}>{exp.company}</p>
                      </div>
                      <span className="chip-light" style={{ flexShrink: 0 }}>{exp.type}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14 }}>
                      <Calendar size={12} style={{ color: 'rgba(40,10,20,0.38)' }} />
                      <span style={{ fontSize: '0.75rem', color: 'rgba(40,10,20,0.40)' }}>{exp.period}</span>
                    </div>
                    <p style={{ fontSize: '0.87rem', lineHeight: 1.8, color: 'rgba(40,10,20,0.62)', marginBottom: 18 }}>{exp.description}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {exp.tags.map(tag => <span key={tag} className="chip-light">{tag}</span>)}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
              <span>🎓</span>
              <span style={{ fontSize: '0.68rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(91,0,23,0.60)', fontWeight: 600 }}>Education</span>
            </motion.div>

            <div style={{ position: 'relative', paddingLeft: 28 }}>
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 1.5, background: 'linear-gradient(180deg, #5B0017 0%, rgba(91,0,23,0.15) 100%)' }} />
              {education.map((edu, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.15 }} style={{ position: 'relative', marginBottom: 20 }}>
                  <div className="timeline-dot-light" style={{ position: 'absolute', left: -35, top: 22 }} />
                  <div className="card-light" style={{ padding: '28px 30px' }}>
                    <h4 className="font-serif" style={{ fontSize: '1.05rem', fontWeight: 600, color: '#1a0008', marginBottom: 6 }}>{edu.institution}</h4>
                    <p style={{ fontSize: '0.87rem', fontWeight: 500, color: '#5B0017', marginBottom: 8 }}>{edu.degree}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                      <Calendar size={12} style={{ color: 'rgba(40,10,20,0.38)' }} />
                      <span style={{ fontSize: '0.75rem', color: 'rgba(40,10,20,0.40)' }}>{edu.period}</span>
                    </div>
                    <p style={{ fontSize: '0.80rem', color: 'rgba(40,10,20,0.50)' }}>{edu.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <hr className="section-divider-light" style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }} />
    </section>
  );
}

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail, GitFork, Link2, ChevronDown } from 'lucide-react';

const socials = [
  { icon: <Mail size={18} />, href: 'mailto:pirapanchanraghavan@gmail.com', label: 'Email' },
  { icon: <GitFork size={18} />, href: 'https://github.com/RaghavanPirapanchan', label: 'GitHub' },
  { icon: <Link2 size={18} />, href: 'https://www.linkedin.com/in/raghavan-pirapanchan', label: 'LinkedIn' },
];

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section id="home" ref={ref} style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: 'linear-gradient(135deg, #0a0005 0%, #1c0009 45%, #0a0005 100%)' }}>

      {/* Orbs */}
      <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.18, 0.30, 0.18] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="orb orb-burgundy" style={{ width: 500, height: 500, top: '15%', left: '10%' }} />
      <motion.div animate={{ scale: [1.2, 1, 1.2], opacity: [0.12, 0.22, 0.12] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="orb orb-maroon" style={{ width: 420, height: 420, bottom: '10%', right: '8%' }} />

      {/* Grid */}
      <div className="grid-overlay" />

      {/* Floating cards */}
      <motion.div animate={{ y: [-10, 10, -10], rotate: [-1.5, 1.5, -1.5] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="floating-card" style={{ position: 'absolute', top: '14%', right: '6%', display: 'none' }} id="fc1"
      >
        <p className="eyebrow" style={{ marginBottom: 6 }}>Currently</p>
        <p style={{ fontWeight: 600, color: '#F5F1ED', fontSize: '0.875rem' }}>Final Year Research</p>
        <p style={{ fontSize: '0.75rem', color: 'rgba(232,180,184,0.85)', marginTop: 4 }}>Temporal ViT Ergonomics</p>
      </motion.div>

      <motion.div animate={{ y: [10, -10, 10], rotate: [1.5, -1.5, 1.5] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="floating-card" style={{ position: 'absolute', bottom: '14%', left: '6%', display: 'none' }} id="fc2"
      >
        <p className="eyebrow" style={{ marginBottom: 6 }}>University</p>
        <p style={{ fontWeight: 600, color: '#F5F1ED', fontSize: '0.875rem' }}>Moratuwa, Sri Lanka</p>
        <p style={{ fontSize: '0.75rem', color: 'rgba(232,180,184,0.85)', marginTop: 4 }}>BSc Hons in AI · 2026</p>
      </motion.div>

      {/* Main content */}
      <motion.div style={{ y, opacity, position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 24px', maxWidth: 860, margin: '0 auto' }}>

        {/* Eyebrow */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginBottom: 32 }}
        >
          <span style={{ height: 1, width: 50, background: 'linear-gradient(90deg, transparent, #5B0017)' }} />
          <span className="eyebrow">AI Engineer & Researcher</span>
          <span style={{ height: 1, width: 50, background: 'linear-gradient(90deg, #5B0017, transparent)' }} />
        </motion.div>

        {/* Name */}
        <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }}
          className="font-serif gradient-text-main"
          style={{ fontSize: 'clamp(3.2rem, 10vw, 7.5rem)', fontWeight: 700, lineHeight: 1.04, letterSpacing: '-0.02em', marginBottom: 12 }}
        >
          Raghavan
          <br />
          <span className="gradient-text-accent">Pirapanchan</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }}
          style={{ maxWidth: 580, margin: '24px auto 0', fontSize: '1.05rem', fontWeight: 300, color: 'rgba(245,241,237,0.60)', lineHeight: 1.75 }}
        >
          Crafting intelligent systems at the intersection of{' '}
          <span style={{ color: '#e8b4b8' }}>Computer Vision</span>,{' '}
          <span style={{ color: '#e8b4b8' }}>Deep Learning</span>, and{' '}
          <span style={{ color: '#e8b4b8' }}>Explainable AI</span>.
        </motion.p>

        {/* CTAs */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.9 }}
          style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 44 }}
        >
          <a href="#projects" className="btn-primary">View Projects</a>
          <a href="#contact" className="btn-secondary">Contact Me</a>
        </motion.div>

        {/* Socials */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.1 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginTop: 40 }}
        >
          {socials.map((s, i) => (
            <motion.a key={i} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
              whileHover={{ scale: 1.15, y: -4 }} whileTap={{ scale: 0.9 }} className="social-icon"
            >{s.icon}</motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
        style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
      >
        <span style={{ fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(245,241,237,0.28)' }}>Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ color: 'rgba(91,0,23,0.7)' }}>
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>

      {/* Show floating cards on wide screens */}
      <style>{`
        @media (min-width: 1200px) { #fc1, #fc2 { display: block !important; } }
      `}</style>
    </section>
  );
}

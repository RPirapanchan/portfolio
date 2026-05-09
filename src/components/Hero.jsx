import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/* ── Generate random particles once ─────────────────── */
const particles = Array.from({ length: 55 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2.8 + 0.8,
  duration: Math.random() * 12 + 8,
  delay: Math.random() * 6,
  opacity: Math.random() * 0.45 + 0.10,
  xDrift: (Math.random() - 0.5) * 60,
  yDrift: (Math.random() - 0.5) * 60,
}));

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: 640,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0a0005 0%, #1c0009 45%, #0a0005 100%)',
      }}
    >
      {/* ── Deep glow orbs ── */}
      <motion.div
        animate={{ scale: [1, 1.25, 1], opacity: [0.20, 0.35, 0.20] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="orb orb-burgundy"
        style={{ width: 580, height: 580, top: '5%', left: '0%' }}
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.12, 0.25, 0.12] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="orb orb-maroon"
        style={{ width: 480, height: 480, bottom: '0%', right: '0%' }}
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.08, 0.18, 0.08] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        className="orb orb-burgundy"
        style={{ width: 350, height: 350, top: '40%', right: '15%' }}
      />

      {/* ── Animated floating particles ── */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          animate={{
            x: [0, p.xDrift, 0],
            y: [0, p.yDrift, 0],
            opacity: [p.opacity * 0.4, p.opacity, p.opacity * 0.4],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: p.id % 3 === 0
              ? 'rgba(232,180,184,0.9)'
              : p.id % 3 === 1
              ? 'rgba(180,0,50,0.7)'
              : 'rgba(245,241,237,0.6)',
            boxShadow: `0 0 ${p.size * 3}px ${p.size}px ${
              p.id % 3 === 0 ? 'rgba(232,180,184,0.35)' : 'rgba(91,0,23,0.35)'
            }`,
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* ── Diagonal decorative lines ── */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.06 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="diag" width="60" height="60" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
            <line x1="0" y1="0" x2="0" y2="60" stroke="#e8b4b8" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#diag)" />
      </svg>

      {/* ── Floating info cards (wide screens only) ── */}
      <motion.div
        animate={{ y: [-8, 8, -8], rotate: [-1, 1, -1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="floating-card"
        style={{ position: 'absolute', top: '18%', right: '5%', display: 'none' }}
        id="fc1"
      >
        <p className="eyebrow-dark" style={{ marginBottom: 6 }}>Currently</p>
        <p style={{ fontWeight: 600, color: '#F5F1ED', fontSize: '0.875rem' }}>Final Year Research</p>
        <p style={{ fontSize: '0.75rem', color: 'rgba(232,180,184,0.85)', marginTop: 4 }}>Temporal ViT Ergonomics</p>
      </motion.div>

      <motion.div
        animate={{ y: [8, -8, 8], rotate: [1, -1, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="floating-card"
        style={{ position: 'absolute', bottom: '20%', left: '5%', display: 'none' }}
        id="fc2"
      >
        <p className="eyebrow-dark" style={{ marginBottom: 6 }}>University</p>
        <p style={{ fontWeight: 600, color: '#F5F1ED', fontSize: '0.875rem' }}>Moratuwa, Sri Lanka</p>
        <p style={{ fontSize: '0.75rem', color: 'rgba(232,180,184,0.85)', marginTop: 4 }}>BSc Hons in AI · 2026</p>
      </motion.div>

      {/* ── Main parallax content ── */}
      <motion.div
        style={{
          y, opacity,
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          padding: '0 24px',
          maxWidth: 860,
          width: '100%',
        }}
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginBottom: 28 }}
        >
          <span style={{ height: 1, width: 44, background: 'linear-gradient(90deg, transparent, rgba(232,180,184,0.7))' }} />
          <span className="eyebrow-dark">AI Engineer &amp; Researcher</span>
          <span style={{ height: 1, width: 44, background: 'linear-gradient(90deg, rgba(232,180,184,0.7), transparent)' }} />
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-serif gradient-text-main"
          style={{ fontSize: 'clamp(2.8rem, 9vw, 7rem)', fontWeight: 700, lineHeight: 1.04, letterSpacing: '-0.02em', marginBottom: 10 }}
        >
          Raghavan
          <br />
          <span className="gradient-text-accent">Pirapanchan</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          style={{ maxWidth: 560, margin: '20px auto 0', fontSize: '1rem', fontWeight: 300, color: 'rgba(245,241,237,0.55)', lineHeight: 1.8 }}
        >
          Crafting intelligent systems at the intersection of{' '}
          <span style={{ color: '#e8b4b8' }}>Computer Vision</span>,{' '}
          <span style={{ color: '#e8b4b8' }}>Deep Learning</span>, and{' '}
          <span style={{ color: '#e8b4b8' }}>Explainable AI</span>.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 14, marginTop: 36 }}
        >
          <a href="#projects" className="btn-primary">View Projects</a>
          <a href="#contact" className="btn-secondary">Contact Me</a>
        </motion.div>
      </motion.div>

      <style>{`
        @media (min-width: 1200px) { #fc1, #fc2 { display: block !important; } }
      `}</style>
    </section>
  );
}

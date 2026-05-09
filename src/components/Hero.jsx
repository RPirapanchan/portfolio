import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/* ── Floating particles ─────────────────────────── */
const particles = Array.from({ length: 45 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2.5 + 0.8,
  duration: Math.random() * 12 + 8,
  delay: Math.random() * 6,
  opacity: Math.random() * 0.40 + 0.10,
  xDrift: (Math.random() - 0.5) * 55,
  yDrift: (Math.random() - 0.5) * 55,
}));

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
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
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0a0005 0%, #1c0009 45%, #0a0005 100%)',
      }}
    >
      {/* ── Orbs ── */}
      <motion.div animate={{ scale: [1, 1.25, 1], opacity: [0.20, 0.35, 0.20] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="orb orb-burgundy" style={{ width: 580, height: 580, top: '5%', left: '-5%' }} />
      <motion.div animate={{ scale: [1.2, 1, 1.2], opacity: [0.12, 0.25, 0.12] }} transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="orb orb-maroon" style={{ width: 460, height: 460, bottom: '-5%', right: '-2%' }} />

      {/* ── Particles ── */}
      {particles.map((p) => (
        <motion.div key={p.id}
          animate={{ x: [0, p.xDrift, 0], y: [0, p.yDrift, 0], opacity: [p.opacity * 0.4, p.opacity, p.opacity * 0.4], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', left: `${p.x}%`, top: `${p.y}%`,
            width: p.size, height: p.size, borderRadius: '50%', pointerEvents: 'none',
            background: p.id % 3 === 0 ? 'rgba(232,180,184,0.9)' : p.id % 3 === 1 ? 'rgba(180,0,50,0.7)' : 'rgba(245,241,237,0.6)',
            boxShadow: `0 0 ${p.size * 3}px ${p.size}px ${p.id % 3 === 0 ? 'rgba(232,180,184,0.3)' : 'rgba(91,0,23,0.3)'}`,
          }}
        />
      ))}

      {/* ── Diagonal SVG lines ── */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.055 }}>
        <defs>
          <pattern id="diag" width="60" height="60" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
            <line x1="0" y1="0" x2="0" y2="60" stroke="#e8b4b8" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#diag)" />
      </svg>

      {/* ── Floating info cards (wide screens) ── */}
      <motion.div animate={{ y: [-8, 8, -8], rotate: [-1, 1, -1] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="floating-card" style={{ position: 'absolute', top: '12%', left: '5%', display: 'none' }} id="fc2">
        <p className="eyebrow-dark" style={{ marginBottom: 6 }}>University</p>
        <p style={{ fontWeight: 600, color: '#F5F1ED', fontSize: '0.875rem' }}>Moratuwa, Sri Lanka</p>
        <p style={{ fontSize: '0.75rem', color: 'rgba(232,180,184,0.85)', marginTop: 4 }}>BSc Hons in AI · 2026</p>
      </motion.div>

      <motion.div animate={{ y: [8, -8, 8], rotate: [1, -1, 1] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="floating-card" style={{ position: 'absolute', bottom: '14%', left: '5%', display: 'none' }} id="fc1">
        <p className="eyebrow-dark" style={{ marginBottom: 6 }}>Internship</p>
        <p style={{ fontWeight: 600, color: '#F5F1ED', fontSize: '0.875rem' }}>AI Engineer Intern</p>
        <p style={{ fontSize: '0.75rem', color: 'rgba(232,180,184,0.85)', marginTop: 4 }}>Techorin · 2025</p>
      </motion.div>

      {/* ══════════════════════════════════════
          CENTERED TEXT + RIGHT PHOTO LAYOUT
      ══════════════════════════════════════ */}
      <motion.div style={{ y, opacity, position: 'relative', zIndex: 10, width: '100%', maxWidth: 1200, padding: '0 40px' }}>
        <div className="hero-layout">

          {/* ── CENTER: Text (full width feel, slightly left of photo) ── */}
          <div style={{ flex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            {/* Eyebrow */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
              style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
              <span style={{ height: 1, width: 44, background: 'linear-gradient(90deg, transparent, rgba(232,180,184,0.7))' }} />
              <span className="eyebrow-dark">AI Engineer &amp; Researcher</span>
              <span style={{ height: 1, width: 44, background: 'linear-gradient(90deg, rgba(232,180,184,0.7), transparent)' }} />
            </motion.div>

            {/* Name */}
            <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }}
              className="font-serif gradient-text-main"
              style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)', fontWeight: 700, lineHeight: 1.04, letterSpacing: '-0.02em', marginBottom: 12 }}>
              Raghavan
              <br />
              <span className="gradient-text-accent">Pirapanchan</span>
            </motion.h1>

            {/* Tagline */}
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }}
              style={{ maxWidth: 520, fontSize: '1rem', fontWeight: 300, color: 'rgba(245,241,237,0.55)', lineHeight: 1.82, marginBottom: 36 }}>
              Crafting intelligent systems at the intersection of{' '}
              <span style={{ color: '#e8b4b8' }}>Computer Vision</span>,{' '}
              <span style={{ color: '#e8b4b8' }}>Deep Learning</span>, and{' '}
              <span style={{ color: '#e8b4b8' }}>Explainable AI</span>.
            </motion.p>

            {/* CTAs */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.9 }}
              style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center' }}>
              <a href="#projects" className="btn-primary">View Projects</a>
              <a href="#contact" className="btn-secondary">Contact Me</a>
            </motion.div>
          </div>

          {/* ── RIGHT: Circular Photo ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.55, ease: 'easeOut' }}
            style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}
          >
            {/* Rotating ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute',
                width: 310, height: 310,
                borderRadius: '50%',
                background: 'conic-gradient(from 0deg, rgba(91,0,23,0.0) 0%, rgba(232,180,184,0.65) 35%, rgba(91,0,23,0.8) 65%, rgba(232,180,184,0.65) 85%, rgba(91,0,23,0.0) 100%)',
                padding: 2,
              }}
            />
            {/* Glow */}
            <div style={{
              position: 'absolute',
              width: 300, height: 300,
              borderRadius: '50%',
              boxShadow: '0 0 55px 18px rgba(91,0,23,0.50), 0 0 110px 35px rgba(91,0,23,0.22)',
            }} />
            {/* Photo circle */}
            <div style={{
              width: 300, height: 300,
              borderRadius: '50%',
              overflow: 'hidden',
              border: '3px solid rgba(232,180,184,0.30)',
              position: 'relative',
              background: 'linear-gradient(135deg, #1c0009, #0a0005)',
              zIndex: 1,
            }}>
              <img
                src="/profile.png"
                alt="Raghavan Pirapanchan"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
              />
            </div>
          </motion.div>

        </div>
      </motion.div>

      <style>{`
        .hero-layout {
          display: flex;
          align-items: center;
          gap: 72px;
        }
        @media (max-width: 860px) {
          .hero-layout {
            flex-direction: column-reverse;
            gap: 32px;
          }
          .hero-layout > div:first-child { align-items: center !important; }
        }
        @media (min-width: 1200px) { #fc1, #fc2 { display: block !important; } }
      `}</style>
    </section>
  );
}

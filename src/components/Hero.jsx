import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

/* ── Particles ── */
const particles = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2.5 + 0.8,
  duration: Math.random() * 10 + 10,
  delay: Math.random() * 5,
  opacity: Math.random() * 0.35 + 0.10,
  xDrift: (Math.random() - 0.5) * 35,
  yDrift: (Math.random() - 0.5) * 35,
}));

/* ── Photo Portal Modal ── */
function PhotoPortal({ onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <motion.div
      key="portal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backdropFilter: 'blur(22px)',
        WebkitBackdropFilter: 'blur(22px)',
        background: 'rgba(10,0,5,0.65)',
        cursor: 'zoom-out',
      }}
    >
      {/* Close hint */}
      <motion.p
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{
          position: 'absolute', top: 32,
          fontSize: '0.68rem', letterSpacing: '0.25em',
          textTransform: 'uppercase', color: 'rgba(232,180,184,0.55)',
        }}
      >
        Click anywhere · ESC to close
      </motion.p>

      {/* Photo */}
      <motion.div
        initial={{ scale: 0.55, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.55, opacity: 0, y: 30 }}
        transition={{ type: 'spring', stiffness: 220, damping: 22 }}
        onClick={(e) => e.stopPropagation()}
        style={{ position: 'relative', cursor: 'default' }}
      >
        {/* Rotating ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute', inset: -8, borderRadius: '50%',
            background: 'conic-gradient(from 0deg, rgba(91,0,23,0.0) 0%, rgba(232,180,184,0.75) 35%, rgba(91,0,23,0.9) 65%, rgba(232,180,184,0.75) 85%, rgba(91,0,23,0.0) 100%)',
          }}
        />
        {/* Glow */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          boxShadow: '0 0 80px 30px rgba(91,0,23,0.55), 0 0 160px 60px rgba(91,0,23,0.22)',
        }} />
        {/* Image */}
        <div style={{
          width: 'clamp(260px, 36vw, 420px)',
          height: 'clamp(260px, 36vw, 420px)',
          borderRadius: '50%', overflow: 'hidden',
          border: '4px solid rgba(232,180,184,0.40)',
          position: 'relative', zIndex: 1,
        }}>
          <img
            src="/profile.png"
            alt="Raghavan Pirapanchan"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
          />
        </div>
        {/* Name below */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="font-serif"
          style={{
            textAlign: 'center', marginTop: 24,
            fontSize: '1.2rem', fontWeight: 600, color: '#F5F1ED',
            letterSpacing: '0.05em',
          }}
        >
          Raghavan Pirapanchan
        </motion.p>
        <p style={{ textAlign: 'center', fontSize: '0.72rem', color: 'rgba(232,180,184,0.65)', marginTop: 6, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          AI Engineer · Researcher
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const [portalOpen, setPortalOpen] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const opacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  return (
    <>
      {/* ── Photo Portal Overlay ── */}
      <AnimatePresence>
        {portalOpen && <PhotoPortal onClose={() => setPortalOpen(false)} />}
      </AnimatePresence>

      <section
        id="home"
        ref={ref}
        style={{
          position: 'relative', height: '100vh', minHeight: 640,
          overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center',
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
            animate={{ x: [0, p.xDrift, 0], y: [0, p.yDrift, 0], opacity: [p.opacity * 0.4, p.opacity, p.opacity * 0.4] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute', left: `${p.x}%`, top: `${p.y}%`,
              width: p.size, height: p.size, borderRadius: '50%', pointerEvents: 'none',
              willChange: 'transform, opacity',
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

        {/* ── Floating info cards ── */}
        <motion.div animate={{ y: [-8, 8, -8], rotate: [-1, 1, -1] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="floating-card" style={{ position: 'absolute', top: '12%', left: '5%', display: 'none' }} id="fc2">
          <p className="eyebrow-dark" style={{ marginBottom: 6 }}>University</p>
          <p style={{ fontWeight: 600, color: '#F5F1ED', fontSize: '0.875rem' }}>Moratuwa, Sri Lanka</p>
          <p style={{ fontSize: '0.75rem', color: 'rgba(232,180,184,0.85)', marginTop: 4 }}>BSc Hons in AI · 2026</p>
        </motion.div>

        <motion.div animate={{ y: [8, -8, 8], rotate: [1, -1, 1] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="floating-card" style={{ position: 'absolute', bottom: '14%', right: '5%', display: 'none' }} id="fc1">
          <p className="eyebrow-dark" style={{ marginBottom: 6 }}>Internship</p>
          <p style={{ fontWeight: 600, color: '#F5F1ED', fontSize: '0.875rem' }}>AI Engineer Intern</p>
          <p style={{ fontSize: '0.75rem', color: 'rgba(232,180,184,0.85)', marginTop: 4 }}>Techorin · 2025</p>
        </motion.div>

        {/* ── Portal trigger — bottom right of hero ── */}
        <motion.button
          onClick={() => setPortalOpen(true)}
          animate={{ boxShadow: ['0 0 0 0 rgba(232,180,184,0.0)', '0 0 0 14px rgba(232,180,184,0.18)', '0 0 0 0 rgba(232,180,184,0.0)'] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          title="Meet me"
          style={{
            position: 'absolute', bottom: '8%', right: '5%',
            width: 70, height: 70, borderRadius: '50%',
            overflow: 'hidden', cursor: 'zoom-in', zIndex: 20,
            border: '2.5px solid rgba(232,180,184,0.50)',
            background: 'linear-gradient(135deg, #1c0009, #0a0005)',
            padding: 0, outline: 'none',
          }}
        >
          <img src="/profile.png" alt="Open portal" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
        </motion.button>

        {/* ── Portal label ── */}
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
          style={{
            position: 'absolute', bottom: 'calc(8% - 22px)', right: '5%',
            fontSize: '0.58rem', letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'rgba(232,180,184,0.45)', zIndex: 20, textAlign: 'center', width: 70,
          }}
        >
          Meet me
        </motion.p>

        {/* ── Centered Text ── */}
        <motion.div style={{ y, opacity, position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 24px', maxWidth: 860, width: '100%' }}>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginBottom: 28 }}>
            <span style={{ height: 1, width: 44, background: 'linear-gradient(90deg, transparent, rgba(232,180,184,0.7))' }} />
            <span className="eyebrow-dark">AI Engineer &amp; Researcher</span>
            <span style={{ height: 1, width: 44, background: 'linear-gradient(90deg, rgba(232,180,184,0.7), transparent)' }} />
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }}
            className="font-serif gradient-text-main"
            style={{ fontSize: 'clamp(3rem, 9vw, 7rem)', fontWeight: 700, lineHeight: 1.04, letterSpacing: '-0.02em', marginBottom: 12 }}>
            Raghavan
            <br />
            <span className="gradient-text-accent">Pirapanchan</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }}
            style={{ maxWidth: 520, margin: '0 auto 36px', fontSize: '1rem', fontWeight: 300, color: 'rgba(245,241,237,0.55)', lineHeight: 1.82 }}>
            Crafting intelligent systems at the intersection of{' '}
            <span style={{ color: '#e8b4b8' }}>Computer Vision</span>,{' '}
            <span style={{ color: '#e8b4b8' }}>Deep Learning</span>, and{' '}
            <span style={{ color: '#e8b4b8' }}>Explainable AI</span>.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.9 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center' }}>
            <a href="#projects" className="btn-primary">View Projects</a>
            <a href="#contact" className="btn-secondary">Contact Me</a>
          </motion.div>
        </motion.div>

        <style>{`
          @media (min-width: 1200px) { #fc1, #fc2 { display: block !important; } }
        `}</style>
      </section>
    </>
  );
}

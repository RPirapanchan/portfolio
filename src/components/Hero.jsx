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

/* ── Burst particles that fly out on portal open ── */
const burstDots = Array.from({ length: 12 }, (_, i) => ({
  angle: (i / 12) * 360,
  dist: 120 + Math.random() * 60,
  size: 3 + Math.random() * 4,
}));

/* ════════════════════════════════════════
   PHOTO PORTAL MODAL
════════════════════════════════════════ */
function PhotoPortal({ onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      key="portal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 300,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backdropFilter: 'blur(28px)',
        WebkitBackdropFilter: 'blur(28px)',
        background: 'radial-gradient(ellipse at center, rgba(91,0,23,0.35) 0%, rgba(10,0,5,0.80) 100%)',
        cursor: 'zoom-out',
      }}
    >
      {/* Scanline texture overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.012) 0px, rgba(255,255,255,0.012) 1px, transparent 1px, transparent 3px)',
      }} />

      {/* Close hint */}
      <motion.p
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        style={{
          position: 'absolute', top: 28, left: '50%', transform: 'translateX(-50%)',
          fontSize: '0.63rem', letterSpacing: '0.3em',
          textTransform: 'uppercase', color: 'rgba(232,180,184,0.45)',
          zIndex: 10, whiteSpace: 'nowrap',
        }}
      >
        Press ESC or click to close
      </motion.p>

      {/* ── Main portal content ── */}
      <motion.div
        initial={{ scale: 0.3, opacity: 0, filter: 'blur(20px)' }}
        animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
        exit={{ scale: 0.3, opacity: 0, filter: 'blur(20px)' }}
        transition={{ type: 'spring', stiffness: 180, damping: 20, duration: 0.6 }}
        onClick={(e) => e.stopPropagation()}
        style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'default', zIndex: 10 }}
      >
        {/* Burst particles */}
        {burstDots.map((dot, i) => {
          const rad = (dot.angle * Math.PI) / 180;
          return (
            <motion.div key={i}
              initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
              animate={{ x: Math.cos(rad) * dot.dist, y: Math.sin(rad) * dot.dist, opacity: [0, 0.8, 0], scale: [0, 1, 0] }}
              transition={{ duration: 1.0, delay: 0.1 + i * 0.03, ease: 'easeOut' }}
              style={{
                position: 'absolute', top: '50%', left: '50%',
                width: dot.size, height: dot.size, borderRadius: '50%',
                background: i % 2 === 0 ? 'rgba(232,180,184,0.9)' : 'rgba(91,0,23,0.9)',
                pointerEvents: 'none', zIndex: 5,
                marginLeft: -dot.size / 2, marginTop: -dot.size / 2,
              }}
            />
          );
        })}

        {/* Outer slow ring */}
        <motion.div
          initial={{ rotate: 0, opacity: 0, scale: 0.4 }}
          animate={{ rotate: 360, opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.4 }}
          transition={{ rotate: { duration: 14, repeat: Infinity, ease: 'linear' }, opacity: { duration: 0.5, delay: 0.2 }, scale: { duration: 0.5, delay: 0.2 } }}
          style={{
            position: 'absolute',
            width: 'clamp(300px, 42vw, 490px)',
            height: 'clamp(300px, 42vw, 490px)',
            borderRadius: '50%',
            border: '1px dashed rgba(232,180,184,0.25)',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* Inner fast ring (conic) */}
        <motion.div
          initial={{ rotate: 0, opacity: 0, scale: 0.4 }}
          animate={{ rotate: -360, opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.4 }}
          transition={{ rotate: { duration: 9, repeat: Infinity, ease: 'linear' }, opacity: { duration: 0.4, delay: 0.15 }, scale: { duration: 0.4, delay: 0.15 } }}
          style={{
            position: 'absolute',
            width: 'clamp(272px, 38vw, 450px)',
            height: 'clamp(272px, 38vw, 450px)',
            borderRadius: '50%',
            background: 'conic-gradient(from 0deg, rgba(91,0,23,0.0) 0%, rgba(232,180,184,0.80) 25%, rgba(91,0,23,0.9) 55%, rgba(232,180,184,0.80) 80%, rgba(91,0,23,0.0) 100%)',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* Glow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
          style={{
            position: 'absolute',
            width: 'clamp(260px, 36vw, 420px)',
            height: 'clamp(260px, 36vw, 420px)',
            borderRadius: '50%',
            boxShadow: '0 0 90px 35px rgba(91,0,23,0.60), 0 0 180px 70px rgba(91,0,23,0.22)',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* Photo frame */}
        <motion.div
          initial={{ scale: 0.6, rotate: -8 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0.6, rotate: 8 }}
          transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.08 }}
          style={{
            width: 'clamp(256px, 35vw, 410px)',
            height: 'clamp(256px, 35vw, 410px)',
            borderRadius: '50%', overflow: 'hidden',
            border: '4px solid rgba(232,180,184,0.45)',
            position: 'relative', zIndex: 2,
            boxShadow: 'inset 0 0 40px rgba(91,0,23,0.3)',
          }}
        >
          <img
            src="/profile.png"
            alt="Raghavan Pirapanchan"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
          />
        </motion.div>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          style={{ textAlign: 'center', marginTop: 28, zIndex: 10 }}
        >
          <p className="font-serif" style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.45rem)', fontWeight: 700, color: '#F5F1ED', letterSpacing: '0.05em', marginBottom: 8 }}>
            Raghavan Pirapanchan
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 6 }}>
            <span style={{ height: 1, width: 30, background: 'linear-gradient(90deg, transparent, rgba(232,180,184,0.6))' }} />
            <p style={{ fontSize: '0.7rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(232,180,184,0.70)' }}>
              AI Engineer · Researcher
            </p>
            <span style={{ height: 1, width: 30, background: 'linear-gradient(90deg, rgba(232,180,184,0.6), transparent)' }} />
          </div>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(245,241,237,0.28)' }}>
            University of Moratuwa · 2026
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* ════════════════════════════════════════
   HERO
════════════════════════════════════════ */
export default function Hero() {
  const ref = useRef(null);
  const [portalOpen, setPortalOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const opacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  return (
    <>
      <AnimatePresence>{portalOpen && <PhotoPortal onClose={() => setPortalOpen(false)} />}</AnimatePresence>

      <section id="home" ref={ref} style={{
        position: 'relative', height: '100vh', minHeight: 640,
        overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(135deg, #0a0005 0%, #1c0009 45%, #0a0005 100%)',
      }}>
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

        {/* ── Floating cards — LEFT side only to avoid portal overlap ── */}
        <motion.div animate={{ y: [-8, 8, -8], rotate: [-1, 1, -1] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="floating-card" style={{ position: 'absolute', top: '18%', left: '4%', display: 'none' }} id="fc2">
          <p className="eyebrow-dark" style={{ marginBottom: 6 }}>University</p>
          <p style={{ fontWeight: 600, color: '#F5F1ED', fontSize: '0.875rem' }}>Moratuwa, Sri Lanka</p>
          <p style={{ fontSize: '0.75rem', color: 'rgba(232,180,184,0.85)', marginTop: 4 }}>BSc Hons in AI · 2026</p>
        </motion.div>

        <motion.div animate={{ y: [8, -8, 8], rotate: [1, -1, 1] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="floating-card" style={{ position: 'absolute', bottom: '20%', left: '4%', display: 'none' }} id="fc1">
          <p className="eyebrow-dark" style={{ marginBottom: 6 }}>Internship</p>
          <p style={{ fontWeight: 600, color: '#F5F1ED', fontSize: '0.875rem' }}>AI Engineer Intern</p>
          <p style={{ fontSize: '0.75rem', color: 'rgba(232,180,184,0.85)', marginTop: 4 }}>Techorin · 2025</p>
        </motion.div>

        {/* ══════════════════════════════════════════
            STYLISH PORTAL TRIGGER — bottom right
        ══════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.6, type: 'spring' }}
          style={{ position: 'absolute', bottom: '7%', right: '5%', zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}
        >
          {/* Label above */}
          <motion.div
            animate={{ opacity: hovered ? 1 : 0.55, y: hovered ? -2 : 0 }}
            transition={{ duration: 0.25 }}
            style={{ display: 'flex', alignItems: 'center', gap: 7 }}
          >
            <span style={{ height: '1px', width: 18, background: 'rgba(232,180,184,0.5)' }} />
            <span style={{ fontSize: '0.58rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(232,180,184,0.8)', fontWeight: 600 }}>Meet Me</span>
            <span style={{ height: '1px', width: 18, background: 'rgba(232,180,184,0.5)' }} />
          </motion.div>

          {/* Portal button */}
          <div style={{ position: 'relative', width: 82, height: 82 }}>
            {/* Outer pulse ring */}
            <motion.div
              animate={{ scale: [1, 1.45, 1], opacity: [0.55, 0, 0.55] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
              style={{
                position: 'absolute', inset: -6, borderRadius: '50%',
                border: '1.5px solid rgba(232,180,184,0.60)',
              }}
            />
            {/* Second pulse ring */}
            <motion.div
              animate={{ scale: [1, 1.28, 1], opacity: [0.35, 0, 0.35] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut', delay: 0.7 }}
              style={{
                position: 'absolute', inset: -2, borderRadius: '50%',
                border: '1.5px solid rgba(232,180,184,0.40)',
              }}
            />
            {/* Rotating conic ring */}
            <motion.div
              animate={{ rotate: hovered ? 360 : 90 }}
              transition={{ duration: hovered ? 2 : 8, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute', inset: -4, borderRadius: '50%',
                background: 'conic-gradient(from 0deg, rgba(232,180,184,0.0) 0%, rgba(232,180,184,0.75) 30%, rgba(91,0,23,0.8) 60%, rgba(232,180,184,0.0) 100%)',
              }}
            />
            {/* Photo circle */}
            <motion.button
              onClick={() => setPortalOpen(true)}
              onHoverStart={() => setHovered(true)}
              onHoverEnd={() => setHovered(false)}
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.93 }}
              style={{
                position: 'relative', zIndex: 2,
                width: 82, height: 82, borderRadius: '50%',
                overflow: 'hidden', cursor: 'zoom-in',
                border: '2.5px solid rgba(232,180,184,0.45)',
                background: 'linear-gradient(135deg, #1c0009, #0a0005)',
                padding: 0, outline: 'none',
              }}
            >
              <img src="/profile.png" alt="Open portal" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
              {/* Hover overlay */}
              <motion.div
                animate={{ opacity: hovered ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  position: 'absolute', inset: 0, borderRadius: '50%',
                  background: 'rgba(91,0,23,0.45)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(232,180,184,0.95)" strokeWidth="1.8">
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                  <line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              </motion.div>
            </motion.button>
          </div>
        </motion.div>

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
            Raghavan<br />
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

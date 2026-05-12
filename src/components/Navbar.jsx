import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        transition: 'background 0.4s, box-shadow 0.4s',
        background: scrolled ? 'rgba(10,0,5,0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(91,0,23,0.30)' : 'none',
        boxShadow: scrolled ? '0 4px 30px rgba(91,0,23,0.12)' : 'none',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '18px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <motion.a href="#home" whileHover={{ opacity: 0.8 }} style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.25rem', fontWeight: 700, letterSpacing: '0.22em', color: '#F5F1ED', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          R<span style={{ color: '#5B0017' }}>.</span>P
        </motion.a>

        {/* Desktop Links */}
        <ul style={{ display: 'flex', alignItems: 'center', gap: 36, listStyle: 'none', padding: 0 }} className="hide-mobile">
          {navLinks.map((link) => (
            <motion.li key={link.label} whileHover={{ y: -2 }}>
              <a href={link.href} style={{ fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(245,241,237,0.65)', textDecoration: 'none', transition: 'color 0.25s' }}
                onMouseEnter={e => e.target.style.color = '#e8b4b8'}
                onMouseLeave={e => e.target.style.color = 'rgba(245,241,237,0.65)'}
              >{link.label}</a>
            </motion.li>
          ))}
        </ul>

        {/* Right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <motion.a href="/R_Pirapanchan (2).pdf" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-primary hide-mobile" style={{ padding: '10px 24px' }}>
            Resume
          </motion.a>

          <button onClick={() => setMenuOpen(!menuOpen)} style={{ display: 'none', color: '#F5F1ED', background: 'none', border: 'none', cursor: 'pointer' }} className="show-mobile">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            style={{ overflow: 'hidden', background: 'rgba(10,0,5,0.96)', borderTop: '1px solid rgba(91,0,23,0.3)' }}
          >
            <div style={{ padding: '20px 32px', display: 'flex', flexDirection: 'column', gap: 18 }}>
              {navLinks.map(link => (
                <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)}
                  style={{ fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(245,241,237,0.75)', textDecoration: 'none' }}
                >{link.label}</a>
              ))}
              <a href="/R_Pirapanchan (2).pdf" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ textAlign: 'center', padding: '10px 24px' }}>Resume</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) { .hide-mobile { display: none !important; } .show-mobile { display: flex !important; } }
        @media (min-width: 769px) { .show-mobile { display: none !important; } }
      `}</style>
    </motion.nav>
  );
}

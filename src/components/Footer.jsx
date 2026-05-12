import React from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer style={{ background: '#1a0008', borderTop: '1px solid rgba(91,0,23,0.40)', padding: '40px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="font-serif" style={{ fontSize: '1.1rem', fontWeight: 700, letterSpacing: '0.22em', color: '#F5F1ED' }}>
          R<span style={{ color: '#5B0017' }}>.</span>P
        </motion.div>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
          style={{ fontSize: '0.75rem', color: 'rgba(245,241,237,0.30)', letterSpacing: '0.08em', textAlign: 'center' }}>
          © {new Date().getFullYear()} Raghavan Pirapanchan · Built with React &amp; Framer Motion
        </motion.p>
      </div>
    </footer>
  );
}

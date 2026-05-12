import React from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer style={{ background: '#1a0008', borderTop: '1px solid rgba(91,0,23,0.40)', padding: '40px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/logo.svg" alt="Logo" style={{ height: '48px', width: 'auto' }} />
        </motion.div>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
          style={{ fontSize: '0.75rem', color: 'rgba(245,241,237,0.30)', letterSpacing: '0.08em', textAlign: 'center' }}>
          © {new Date().getFullYear()} Raghavan Pirapanchan · Built with React &amp; Framer Motion
        </motion.p>
      </div>
    </footer>
  );
}

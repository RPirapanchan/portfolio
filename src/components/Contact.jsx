import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, GitFork, Link2, Phone, Send } from 'lucide-react';

const contactLinks = [
  { icon: <Mail size={20} />, label: 'Email', value: 'pirapanchanraghavan@gmail.com', href: 'mailto:pirapanchanraghavan@gmail.com' },
  { icon: <GitFork size={20} />, label: 'GitHub', value: 'RaghavanPirapanchan', href: 'https://github.com/RaghavanPirapanchan' },
  { icon: <Link2 size={20} />, label: 'LinkedIn', value: 'Raghavan Pirapanchan', href: 'https://www.linkedin.com/in/raghavan-pirapanchan' },
  { icon: <Phone size={20} />, label: 'Phone', value: '+94 76 375 3815', href: 'tel:+94763753815' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const sub = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const bod = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`);
    window.open(`mailto:pirapanchanraghavan@gmail.com?subject=${sub}&body=${bod}`, '_blank');
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="section-beige" style={{ padding: '120px 0', position: 'relative' }}>
      <hr className="section-divider-light" style={{ position: 'absolute', top: 0, left: 0, right: 0 }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px' }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: 72 }}>
          <span className="eyebrow-light" style={{ marginBottom: 12 }}>Let's connect</span>
          <h2 className="section-heading font-serif" style={{ color: '#1a0008' }}>
            Get in <em style={{ color: '#5B0017', fontStyle: 'italic' }}>Touch</em>
          </h2>
          <p style={{ marginTop: 16, fontSize: '0.95rem', color: 'rgba(40,10,20,0.52)', maxWidth: 500, margin: '16px auto 0' }}>
            Whether you want to collaborate on an AI project, discuss research, or just say hi — I'm always open to connecting.
          </p>
        </motion.div>

        <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}>
          {/* Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {contactLinks.map((link, i) => (
              <motion.a key={i} href={link.href} target="_blank" rel="noopener noreferrer"
                initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: i * 0.1 }}
                className="contact-row">
                <div className="contact-icon-wrap">{link.icon}</div>
                <div>
                  <p style={{ fontSize: '0.67rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(40,10,20,0.40)', marginBottom: 4 }}>{link.label}</p>
                  <p style={{ fontSize: '0.88rem', fontWeight: 500, color: '#1a0008' }}>{link.value}</p>
                </div>
                <span style={{ marginLeft: 'auto', color: 'rgba(91,0,23,0.45)', fontSize: '1.1rem' }}>→</span>
              </motion.a>
            ))}

            {/* Referee */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.45 }}
              className="card-light" style={{ padding: '22px 24px' }}>
              <p style={{ fontSize: '0.67rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(91,0,23,0.55)', marginBottom: 12, fontWeight: 600 }}>Academic Referee</p>
              <p className="font-serif" style={{ fontWeight: 600, color: '#1a0008', marginBottom: 6, fontSize: '1rem' }}>Dr. (Ms.) I. Thilini S. Piyatilake</p>
              <p style={{ fontSize: '0.78rem', color: 'rgba(40,10,20,0.50)', marginBottom: 3 }}>Senior Lecturer · Dept. of Computational Mathematics</p>
              <p style={{ fontSize: '0.78rem', color: 'rgba(40,10,20,0.50)', marginBottom: 10 }}>Faculty of IT, University of Moratuwa</p>
              <a href="mailto:thilinisp@uom.lk" style={{ fontSize: '0.82rem', color: '#5B0017', fontWeight: 500, textDecoration: 'none' }}>thilinisp@uom.lk</a>
            </motion.div>
          </div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
            className="card-light" style={{ padding: 36 }}>
            <h3 className="font-serif" style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1a0008', marginBottom: 28 }}>Send a Message</h3>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[
                { name: 'name', label: 'Your Name', type: 'text', placeholder: 'John Doe' },
                { name: 'email', label: 'Email Address', type: 'email', placeholder: 'john@example.com' },
              ].map(f => (
                <div key={f.name}>
                  <label style={{ display: 'block', fontSize: '0.67rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(40,10,20,0.45)', marginBottom: 8, fontWeight: 600 }}>{f.label}</label>
                  <input type={f.type} name={f.name} value={form[f.name]} onChange={e => setForm({ ...form, [e.target.name]: e.target.value })} placeholder={f.placeholder} required className="form-input" />
                </div>
              ))}
              <div>
                <label style={{ display: 'block', fontSize: '0.67rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(40,10,20,0.45)', marginBottom: 8, fontWeight: 600 }}>Message</label>
                <textarea name="message" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="I'd love to collaborate on..." required rows={5} className="form-input" style={{ resize: 'none' }} />
              </div>

              <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} className="btn-dark"
                style={{ background: sent ? 'rgba(0,130,60,0.85)' : 'linear-gradient(135deg, #5B0017, #700020)' }}>
                {sent ? '✓ Message Sent!' : (<><Send size={15} /> Send Message</>)}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

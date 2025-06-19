import React from 'react';

const Footer = () => (
  <footer style={{
    background: '#6366f1',
    color: '#fff',
    textAlign: 'center',
    padding: '1rem 0',
    borderRadius: '0 0 1rem 1rem',
    marginTop: 0
  }}>
    &copy; {new Date().getFullYear()} Online Grading System. All rights reserved.
  </footer>
);

export default Footer;
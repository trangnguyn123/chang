import { motion } from 'motion/react';

export function FadeIn({ children, delay = 0, y = 24, x = 0, scale = 1, style, className }) {
  return (
    <motion.div
      initial={{ opacity: 0, y, x, scale }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: 'easeInOut', delay }}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// components/ScrollReveal.js

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ScrollReveal = ({ children }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, scale:1.0 },
  };

  return (
    <motion.div
      ref={ref}
      initial={{
        scale: 0.5
      }}
      animate={inView ? 'visible' : 'hidden'}
      
      variants={variants}
      transition={{ duration: 1.5 }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;

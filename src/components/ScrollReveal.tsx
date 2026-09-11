import React from 'react';
import { motion } from 'motion/react';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  variant?: 'pop' | 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right';
  className?: string;
  once?: boolean;
  id?: string;
  amount?: number | 'some' | 'all';
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  delay = 0,
  duration = 0.6,
  variant = 'pop',
  className = '',
  once = true,
  id,
  amount = 0.15,
}) => {
  const getVariants = () => {
    switch (variant) {
      case 'pop':
        return {
          hidden: { opacity: 0, y: 36, scale: 0.94 },
          visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
              duration,
              delay,
              ease: [0.22, 1, 0.36, 1], // snappy, smooth pop-up cubic-bezier
            },
          },
        };
      case 'fade-up':
        return {
          hidden: { opacity: 0, y: 32 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration,
              delay,
              ease: [0.25, 0.1, 0.25, 1],
            },
          },
        };
      case 'slide-left':
        return {
          hidden: { opacity: 0, x: -36, scale: 0.97 },
          visible: {
            opacity: 1,
            x: 0,
            scale: 1,
            transition: {
              duration,
              delay,
              ease: [0.22, 1, 0.36, 1],
            },
          },
        };
      case 'slide-right':
        return {
          hidden: { opacity: 0, x: 36, scale: 0.97 },
          visible: {
            opacity: 1,
            x: 0,
            scale: 1,
            transition: {
              duration,
              delay,
              ease: [0.22, 1, 0.36, 1],
            },
          },
        };
      case 'fade-in':
      default:
        return {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              duration,
              delay,
              ease: 'easeOut',
            },
          },
        };
    }
  };

  return (
    <motion.div
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={getVariants()}
      className={className}
    >
      {children}
    </motion.div>
  );
};

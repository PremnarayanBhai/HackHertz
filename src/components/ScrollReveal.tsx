import React from 'react';
import { motion, Variants } from 'motion/react';

export type AnimationVariant = 
  | 'fade-up' 
  | 'fade-down' 
  | 'fade-left' 
  | 'fade-right' 
  | 'zoom-in' 
  | 'pixel-pop'
  | 'arcade-bounce'
  | 'level-unlock';

interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  amount?: number | 'some' | 'all';
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  variant = 'level-unlock',
  delay = 0,
  duration = 0.55,
  className = '',
  once = true,
  amount = 0.15,
}) => {
  const getVariants = (): Variants => {
    switch (variant) {
      case 'level-unlock':
        return {
          hidden: { opacity: 0, y: 45, scale: 0.95 },
          visible: { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            transition: {
              duration,
              delay,
              ease: [0.16, 1, 0.3, 1],
              staggerChildren: 0.1,
            }
          }
        };
      case 'fade-up':
        return {
          hidden: { opacity: 0, y: 40, scale: 0.96 },
          visible: { opacity: 1, y: 0, scale: 1 }
        };
      case 'fade-down':
        return {
          hidden: { opacity: 0, y: -40 },
          visible: { opacity: 1, y: 0 }
        };
      case 'fade-left':
        return {
          hidden: { opacity: 0, x: -50 },
          visible: { opacity: 1, x: 0 }
        };
      case 'fade-right':
        return {
          hidden: { opacity: 0, x: 50 },
          visible: { opacity: 1, x: 0 }
        };
      case 'zoom-in':
        return {
          hidden: { opacity: 0, scale: 0.85 },
          visible: { opacity: 1, scale: 1 }
        };
      case 'pixel-pop':
        return {
          hidden: { opacity: 0, scale: 0.7, y: 20 },
          visible: { opacity: 1, scale: 1, y: 0 }
        };
      case 'arcade-bounce':
        return {
          hidden: { opacity: 0, y: 50, scale: 0.9 },
          visible: { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            transition: {
              type: 'spring',
              stiffness: 260,
              damping: 20,
              delay
            }
          }
        };
      default:
        return {
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 }
        };
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={getVariants()}
      transition={
        variant === 'arcade-bounce' 
          ? undefined 
          : { duration, delay, ease: [0.22, 1, 0.36, 1] }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
};

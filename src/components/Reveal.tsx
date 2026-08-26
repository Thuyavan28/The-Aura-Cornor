import React from 'react';
import { motion } from 'framer-motion';

interface RevealProps {
  children: React.ReactNode;
  direction?: 'left' | 'right' | 'up' | 'down' | 'none';
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

const directionMap = {
  left:  { initial: { x: -80, opacity: 0 }, animate: { x: 0, opacity: 1 } },
  right: { initial: { x: 80, opacity: 0 },  animate: { x: 0, opacity: 1 } },
  up:    { initial: { y: 60, opacity: 0 },   animate: { y: 0, opacity: 1 } },
  down:  { initial: { y: -50, opacity: 0 },  animate: { y: 0, opacity: 1 } },
  none:  { initial: { opacity: 0 },          animate: { opacity: 1 } },
};

export const Reveal: React.FC<RevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.7,
  className = '',
  once = true,
}) => {
  const variants = directionMap[direction];

  return (
    <motion.div
      className={className}
      initial={variants.initial}
      whileInView={variants.animate}
      viewport={{ once, margin: '-60px' }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  );
};

interface StaggerRevealProps {
  children: React.ReactNode[];
  direction?: 'left' | 'right' | 'up';
  staggerDelay?: number;
  className?: string;
  childClassName?: string;
}

export const StaggerReveal: React.FC<StaggerRevealProps> = ({
  children,
  direction = 'up',
  staggerDelay = 0.12,
  className = '',
  childClassName = '',
}) => {
  const variants = directionMap[direction];

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
    >
      {children.map((child, i) => (
        <motion.div
          key={i}
          className={childClassName}
          variants={{
            hidden: variants.initial,
            visible: { ...variants.animate, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

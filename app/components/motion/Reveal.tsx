'use client';

import { useSyncExternalStore, type CSSProperties, type ReactNode } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { subscribeLoader, isLoaderDone } from './loader-store';

export type RevealVariant =
  | 'up'
  | 'down'
  | 'left'
  | 'right'
  | 'zoom'
  | 'blur-up'
  | 'pill';

const HIDDEN: Record<RevealVariant, Record<string, number | string>> = {
  up: { opacity: 0, y: 48 },
  down: { opacity: 0, y: -48 },
  left: { opacity: 0, x: -64 },
  right: { opacity: 0, x: 64 },
  zoom: { opacity: 0, scale: 0.82 },
  'blur-up': { opacity: 0, y: 36, filter: 'blur(14px)' },
  pill: { opacity: 0, y: 72, scale: 0.9, rotate: -4 },
};

const VISIBLE: Record<string, number | string> = {
  opacity: 1,
  x: 0,
  y: 0,
  scale: 1,
  rotate: 0,
  filter: 'blur(0px)',
};

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function useLoaderReady() {
  return useSyncExternalStore(subscribeLoader, isLoaderDone, () => false);
}

interface RevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  /** Anima quando o preloader termina (para conteúdo acima da dobra) em vez de ao entrar no viewport. */
  afterLoader?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function Reveal({
  children,
  variant = 'up',
  delay = 0,
  duration = 0.8,
  afterLoader = false,
  className,
  style,
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const ready = useLoaderReady();

  if (reduceMotion) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  const transition = { duration, delay, ease: EASE };

  if (afterLoader) {
    return (
      <motion.div
        className={className}
        style={style}
        initial={HIDDEN[variant]}
        animate={ready ? VISIBLE : HIDDEN[variant]}
        transition={transition}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      style={style}
      initial={HIDDEN[variant]}
      whileInView={VISIBLE}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}

interface RevealGroupProps {
  children: ReactNode;
  /** Intervalo entre cada item, em segundos. */
  stagger?: number;
  delay?: number;
  className?: string;
  style?: CSSProperties;
}

const groupVariants: Variants = {
  hidden: {},
  visible: {},
};

/** Contentor que revela os RevealItem filhos em cascata ao entrar no viewport. */
export function RevealGroup({
  children,
  stagger = 0.09,
  delay = 0,
  className,
  style,
}: RevealGroupProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10% 0px' }}
      variants={groupVariants}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {children}
    </motion.div>
  );
}

interface RevealItemProps {
  children: ReactNode;
  variant?: RevealVariant;
  duration?: number;
  className?: string;
  style?: CSSProperties;
}

export function RevealItem({
  children,
  variant = 'up',
  duration = 0.7,
  className,
  style,
}: RevealItemProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  const itemVariants: Variants = {
    hidden: HIDDEN[variant],
    visible: { ...VISIBLE, transition: { duration, ease: EASE } },
  };

  return (
    <motion.div className={className} style={style} variants={itemVariants}>
      {children}
    </motion.div>
  );
}

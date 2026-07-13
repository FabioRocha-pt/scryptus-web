'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { markLoaderDone } from './motion/loader-store';
import { LOGO_VIEWBOX, SWOOSH_PATHS, WORDMARK_PATHS } from './logo-paths';

const HOLD_MS = 2250;
const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
const EASE_CURTAIN: [number, number, number, number] = [0.87, 0, 0.13, 1];

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    // A cortina começa a subir e, nesse instante, o hero começa a animar por trás
    const timer = setTimeout(
      () => {
        setVisible(false);
        markLoaderDone();
        document.body.style.overflow = '';
      },
      reduceMotion ? 900 : HOLD_MS,
    );
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="preloader"
          role="status"
          aria-label="A carregar Scryptus 1"
          initial={false}
          exit={
            reduceMotion
              ? { opacity: 0, transition: { duration: 0.4 } }
              : { y: '-100%', transition: { duration: 0.9, ease: EASE_CURTAIN } }
          }
        >
          <div className="preloader-inner">
            <motion.svg
              viewBox={LOGO_VIEWBOX}
              className="preloader-logo"
              initial={reduceMotion ? false : { scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: EASE_OUT }}
            >
              {SWOOSH_PATHS.map((d, i) => (
                <g key={i}>
                  {/* Traço que se desenha e desvanece quando o preenchimento chega */}
                  {!reduceMotion && (
                    <motion.path
                      d={d}
                      fill="none"
                      stroke="var(--lime)"
                      strokeWidth={0.75}
                      initial={{ pathLength: 0, opacity: 1 }}
                      animate={{ pathLength: 1, opacity: 0 }}
                      transition={{
                        pathLength: {
                          delay: 0.15 + i * 0.2,
                          duration: 1,
                          ease: 'easeInOut',
                        },
                        opacity: { delay: 1.5, duration: 0.4 },
                      }}
                    />
                  )}
                  <motion.path
                    d={d}
                    fill="var(--lime)"
                    initial={reduceMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 + i * 0.15, duration: 0.6 }}
                  />
                </g>
              ))}
              {WORDMARK_PATHS.map((p, i) => (
                <motion.path
                  key={i}
                  d={p.d}
                  fill="#fff"
                  fillRule={p.evenodd ? 'evenodd' : undefined}
                  clipRule={p.evenodd ? 'evenodd' : undefined}
                  initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.05 + i * 0.05, duration: 0.55, ease: EASE_OUT }}
                />
              ))}
            </motion.svg>

            <motion.p
              className="preloader-tagline"
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.45, duration: 0.6, ease: EASE_OUT }}
            >
              O seu parceiro de negócios
            </motion.p>

            <div className="preloader-track">
              <motion.div
                className="preloader-bar"
                initial={reduceMotion ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  delay: 0.15,
                  duration: reduceMotion ? 0.6 : (HOLD_MS - 250) / 1000,
                  ease: 'easeInOut',
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

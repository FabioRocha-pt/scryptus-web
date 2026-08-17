import { LOGO_VIEWBOX, SWOOSH_PATHS, WORDMARK_PATHS } from './logo-paths';

/** Logótipo Scryptus 1. Herda a cor do elemento onde é usado. */
export default function Logo({
  height = 30,
  className,
  label = 'Scryptus 1',
}: {
  height?: number;
  className?: string;
  label?: string;
}) {
  return (
    <svg viewBox={LOGO_VIEWBOX} height={height} className={className} role="img" aria-label={label}>
      {WORDMARK_PATHS.map((p, i) => (
        <path
          key={`w${i}`}
          d={p.d}
          fill="currentColor"
          fillRule={p.evenodd ? 'evenodd' : undefined}
          clipRule={p.evenodd ? 'evenodd' : undefined}
        />
      ))}
      {SWOOSH_PATHS.map((d, i) => (
        <path key={`s${i}`} d={d} fill="currentColor" />
      ))}
    </svg>
  );
}

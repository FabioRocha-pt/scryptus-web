import {buildLegacyTheme} from 'sanity'

/**
 * Tema do Studio com a paleta do site: verdes da marca, lima nos destaques
 * e a mesma tipografia do corpo de texto (Calibri → Carlito → sistema).
 */
const cores = {
  verde950: '#0f1f15',
  verde800: '#2d4f3a',
  verde700: '#3d6647',
  verde600: '#598946',
  lima: '#a8d420',
  papel: '#fafaf7',
  tinta: '#1f1f1d',
  cinza: '#6e6e68',
  vermelho: '#b4442c',
  ambar: '#c98a1b',
}

export const tema = buildLegacyTheme({
  '--font-family-base': '"Calibri", "Carlito", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
  '--black': cores.tinta,
  '--white': '#ffffff',
  '--gray': cores.cinza,
  '--gray-base': cores.cinza,
  '--component-bg': '#ffffff',
  '--component-text-color': cores.tinta,

  '--brand-primary': cores.verde700,
  '--default-button-color': cores.cinza,
  '--default-button-primary-color': cores.verde700,
  '--default-button-success-color': cores.verde600,
  '--default-button-warning-color': cores.ambar,
  '--default-button-danger-color': cores.vermelho,

  '--state-info-color': cores.verde700,
  '--state-success-color': cores.verde600,
  '--state-warning-color': cores.ambar,
  '--state-danger-color': cores.vermelho,

  '--main-navigation-color': cores.verde950,
  '--main-navigation-color--inverted': '#ffffff',
  '--focus-color': cores.lima,
})

import type {LayoutProps} from 'sanity'

/**
 * Acabamento do Studio ao estilo do site: transições suaves, cantos mais
 * redondos e a fonte Carlito servida pelo próprio site.
 *
 * Só mexe em aparência (cores de fundo, raios, transições) e nunca em
 * dimensões, para não desarrumar a interface do Sanity.
 */
const ESTILOS = `
@font-face { font-family: "Carlito"; src: local("Carlito"), url("/fonts/carlito-400.woff2") format("woff2"); font-weight: 400; font-style: normal; font-display: swap }
@font-face { font-family: "Carlito"; src: url("/fonts/carlito-700.woff2") format("woff2"); font-weight: 700; font-style: normal; font-display: swap }

[data-ui="Button"], [data-ui="MenuItem"], [data-ui="Tab"],
[data-ui="PaneItem"], [data-ui="Card"][data-as="a"], [data-ui="Card"][data-as="button"] {
  transition: background-color .22s ease, color .22s ease, box-shadow .22s ease, border-color .22s ease, transform .22s ease !important;
}
[data-ui="Button"] { border-radius: 999px !important }
[data-ui="Button"] > span { border-radius: 999px !important }
[data-ui="PaneItem"], [data-ui="MenuItem"] { border-radius: 10px !important }
[data-ui="PaneItem"]:hover { transform: translateX(2px) }

[data-ui="TextInput"] input, [data-ui="TextArea"] textarea, [data-ui="Select"] select {
  transition: box-shadow .2s ease, background-color .2s ease !important;
}

@media (prefers-reduced-motion: reduce) {
  [data-ui] { transition: none !important; transform: none !important }
}
`

export function Layout(props: LayoutProps) {
  return (
    <>
      <style>{ESTILOS}</style>
      {props.renderDefault(props)}
    </>
  )
}

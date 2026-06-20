export default function Clientes() {
  return (
    <section className="block bg-paper-2" id="clientes">
      <div className="wrap">
        <div className="block-head">
          <div className="text">
            <span className="eyebrow">Quem confia em nós</span>
            <h2>Bancos, ministérios e <em>câmaras municipais.</em></h2>
            <p style={{ fontSize: '16px', color: 'var(--ink-mute)', marginTop: '18px', maxWidth: '54ch', lineHeight: 1.65 }}>
              Um portefólio construído ao longo de mais de uma década, em projetos públicos e privados — em todas as ilhas.
            </p>
          </div>
        </div>
        <div className="clients-grid">
          <div className="client">BCV</div>
          <div className="client">BCA</div>
          <div className="client">BAI CV</div>
          <div className="client">Min. Agricultura</div>
          <div className="client">CMP</div>
          <div className="client">CM Mindelo</div>
          <div className="client">INCV</div>
          <div className="client">CV Telecom</div>
          <div className="client">ASA</div>
          <div className="client">IEFP</div>
          <div className="client">Correios CV</div>
          <div className="client">+ 14</div>
        </div>
      </div>
    </section>
  );
}
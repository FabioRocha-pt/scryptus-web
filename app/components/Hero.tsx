export default function Hero() {
  return (
    <section className="hero">
      <div className="orb orb-lime orb-xl" style={{ top: '-100px', left: '-150px' }}></div>
      <div className="orb orb-green orb-lg" style={{ bottom: '-80px', right: '10%' }}></div>
      <div className="orb orb-lime orb-md" style={{ top: '30%', right: '38%' }}></div>
      <div className="orb orb-dark orb-lg" style={{ top: '10%', right: '-100px' }}></div>
      
      <div className="wrap">
        <div className="hero-text">
          <span className="eyebrow">Praia, Cabo Verde · desde 2008</span>
          <h1>Cultivamos <span className="accent">parcerias.</span><br />Construímos <span className="accent">negócios.</span></h1>
          <p className="tagline-hero">O seu parceiro de negócios.</p>
          <p className="lead">Plataforma integrada de comércio internacional, apoio técnico e consultoria. Oito áreas de negócio ao serviço de empresas, instituições e o setor público em Cabo Verde.</p>
          <div className="cta-row">
            <a href="#areas" className="btn btn-lime">Ver áreas de negócio &rarr;</a>
            <a href="#contactos" className="btn btn-ghost">Falar connosco</a>
          </div>
        </div>
        
        <div className="hero-media">
          <div className="hero-pill">
            Imagem herói<br />(formato pílula)<br /><br />Sugestão:<br />estufa em produção<br />+ folhagem tropical<br />de Cabo Verde
            <div className="hero-pill-small">Imagem secundária<br />produto em cena</div>
          </div>
        </div>
      </div>
    </section>
  );
}
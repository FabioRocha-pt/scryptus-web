export default function Sobre() {
  return (
    <section className="block" id="sobre">
      <div className="orb orb-lime orb-lg" style={{ top: '50%', right: '-200px', opacity: 0.25 }}></div>
      <div className="wrap">
        <div className="about-grid">
          <div className="about-pill">
            Foto da equipa<br />ou do armazém<br />(Rua da Cruz Vermelha)<br /><br />Sugestão:<br />formato pílula vertical<br />com pessoa real
          </div>
          <div className="about-text">
            <span className="eyebrow">Quem somos</span>
            <h2>Uma plataforma de comércio que <em>nasceu da experiência</em> em Cabo Verde.</h2>
            <p className="pullquote">O seu parceiro de negócios — desde 2008.</p>
            <p className="about-body">Fundada na cidade da Praia, ilha de Santiago, como resultado de três décadas de atividades comerciais bem-sucedidas do grupo português CAVEX em Cabo Verde. Hoje somos líderes em matéria-prima e equipamentos para imprensa offset e digital, e parceiro de referência para empresas, bancos, ministérios e câmaras municipais em oito áreas de negócio.</p>
            <a href="#" className="btn btn-ink">Conhecer a empresa &rarr;</a>
            <div className="about-meta">
              <div><span className="n">2008</span><span className="l">Fundação Scryptus 1</span></div>
              <div><span className="n">CAVEX</span><span className="l">Grupo internacional</span></div>
              <div><span className="n">+30</span><span className="l">Anos do grupo em CV</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
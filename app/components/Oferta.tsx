export default function Oferta() {
  return (
    <section className="block" id="oferta">
      <div className="orb orb-lime orb-md" style={{ top: '80px', right: '-80px' }}></div>
      <div className="wrap">
        <div className="block-head">
          <div className="text">
            <span className="eyebrow">A nossa oferta</span>
            <h2>Quatro razões para <em>nos escolher.</em></h2>
          </div>
        </div>
        <div className="pillars">
          <div className="pillar">
            <span className="num">01</span>
            <h3>Disponibilidade imediata</h3>
            <p>Stock permanente em armazém na Praia. Uma vasta gama de produtos pronta a entregar, sem tempos de espera.</p>
          </div>
          <div className="pillar">
            <span className="num">02</span>
            <h3>Soluções sob consulta</h3>
            <p>Importamos produtos específicos para responder a cada cliente. Rede de fornecedores estabelecida na Europa e Ásia.</p>
          </div>
          <div className="pillar">
            <span className="num">03</span>
            <h3>Inovação contínua</h3>
            <p>Acompanhamos as últimas tendências e tecnologias do mercado profissional para responder com precisão.</p>
          </div>
          <div className="pillar">
            <span className="num">04</span>
            <h3>Vantagens logísticas</h3>
            <p>Exportação direta a partir da casa-mãe em Portugal para contentores completos. Eficiência de custos garantida.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
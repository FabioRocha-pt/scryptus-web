export default function AreasNegocio() {
  return (
    <section className="block bg-paper-2" id="areas">
      <div className="orb orb-green orb-xl" style={{ top: '200px', left: '-200px' }}></div>
      <div className="orb orb-lime orb-lg" style={{ bottom: '-100px', right: '-100px' }}></div>
      <div className="wrap">
        <div className="block-head">
          <div className="text">
            <span className="eyebrow">Áreas de negócio</span>
            <h2>Oito verticais. <em>Uma equipa.</em></h2>
            <p style={{ fontSize: '16px', color: 'var(--ink-mute)', marginTop: '18px', maxWidth: '54ch', lineHeight: 1.65 }}>
              De papel e tinta a mobiliário institucional, da estufa agrícola ao quiosque multimédia de um museu — somos um único parceiro com competência transversal.
            </p>
          </div>
          <a href="#" className="more">Ver portefólio completo &rarr;</a>
        </div>
        <div className="verticals">
          <div className="vert">
            <div className="img">Foto<br />prensa offset</div>
            <div className="body"><span className="num">01</span><h3>Gráfica</h3><p>Offset, digital, pré-impressão, acabamento, comunicação visual, papéis, embalagem.</p><span className="tag">Misto · compra + orçamento</span></div>
          </div>
          <div className="vert">
            <div className="img">Foto<br />estufa em produção</div>
            <div className="body"><span className="num">02</span><h3>Agricultura</h3><p>Estufas, rega gota a gota, hidroponia, equipamentos motorizados, identificação pecuária.</p><span className="tag">Misto · compra + orçamento</span></div>
          </div>
          <div className="vert">
            <div className="img">Foto<br />vestuário trabalho</div>
            <div className="body"><span className="num">03</span><h3>Têxteis</h3><p>Vestuário de trabalho, coletes, têxteis promocionais, sacos, bandeiras.</p><span className="tag direct">Compra direta</span></div>
          </div>
          <div className="vert">
            <div className="img">Foto<br />EPI em uso</div>
            <div className="body"><span className="num">04</span><h3>EPI</h3><p>Proteção individual, calçado de segurança, antiqueda, ferramentas.</p><span className="tag direct">Compra direta</span></div>
          </div>
          <div className="vert">
            <div className="img">Foto<br />auditório</div>
            <div className="body"><span className="num">05</span><h3>Mobiliário</h3><p>Escritório, hotelaria, comercial, escolar, urbano.</p><span className="tag quote">Sob orçamento</span></div>
          </div>
          <div className="vert">
            <div className="img">Foto<br />sala servidores</div>
            <div className="body"><span className="num">06</span><h3>Informática</h3><p>Computadores, impressoras, monitores, rede, periféricos.</p><span className="tag">Misto · compra + orçamento</span></div>
          </div>
          <div className="vert">
            <div className="img">Foto<br />vitrina museu</div>
            <div className="body"><span className="num">07</span><h3>Museus &amp; exposições</h3><p>Vitrinas, mobiliário expositivo, quiosques multimédia, áudio, cenografia.</p><span className="tag quote">Sob orçamento</span></div>
          </div>
          <div className="vert">
            <div className="img">Foto<br />gerador + escolar</div>
            <div className="body"><span className="num">08</span><h3>Outras áreas</h3><p>Geradores e UPS, artigos escolares, brindes promocionais, projetos especiais.</p><span className="tag quote">Sob orçamento</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
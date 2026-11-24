import './CardUltimaManutencao.css'

function CardUltimaManutencao({ Icone, servico, data }) {

    return (
        <article className='card-ultima-manutencao'>
            <div className="info-card">
                <div className="icone-card-laranja">
                    <Icone size={35} />
                </div>

                <div className="valores-card">
                    <h3>Última manutenção</h3>
                    <h2>{servico}</h2>
                    <h3 className='data'>{data}</h3>
                </div>
            </div>


        </article>
    )
}

export default CardUltimaManutencao
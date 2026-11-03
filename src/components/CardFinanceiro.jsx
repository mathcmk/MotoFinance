

function CardFinanceiro({
    titulo,
    valor,
    percentual,
    icone: Icone,
    tipo
}) {
    return (

        <div className="card-financeiro">

            <div className={`card-icone icone-${tipo}`}>
                <Icone size={22} strokeWidth={2} />
            </div>

            <h3>{titulo}</h3>

            <h2>
                {valor.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })}
            </h2>

            <p>{percentual}% dos ganhos</p>
        </div>
    )
}

export default CardFinanceiro
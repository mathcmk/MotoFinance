import { Currency } from "lucide-react"

import './CardAplicativo.css'



function CardAplicativo({
    nome,
    valor,
    percentual = 0,
    logo,
    tipo
}) {

    const valorFormatado = valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })

    return (

        <div className="card-aplicativo">

            <div className={`card-aplicativo-icone app-${tipo}`}>
                <img
                    src={logo}
                    alt={`Logo ${nome}`}
                    className="card-aplicativo-logo"
                />
            </div>

            <div className="card-aplicativo-info">
                <h3>{nome}</h3>
                <h2>{valorFormatado}</h2>
                <p>{percentual}% do total</p>
            </div>
        </div>
    )
}

export default CardAplicativo
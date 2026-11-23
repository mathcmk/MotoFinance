import { ToolCase } from 'lucide-react'

import './CardsIndicador.css'

function CardIndicador({ titulo, valor, Icone, cor }) {



    return (



        <article className="manutencao-card">

            <div className='infos-card'>
                <div className={`icone-card-cor-${cor}`}>
                    <Icone size={35} />
                </div>

                <div >
                    <h3 className='titulo'>{titulo}</h3>
                    <p className='valor'>{valor}</p>
                </div>
            </div>

        </article>

    )
}

export default CardIndicador
import { DollarSign } from "lucide-react"

import './ResumoSemanal.css'

function ResumoSemanal({ total }) {

    return (

        <section className="resumo-semanal">

            <div className="resumo-semanal-cabecalho">

                <div className="resumo-semanal-icone">
                    <DollarSign size={32} />
                </div>


                <h2>Total da semana</h2>
            </div>

            <div className="resumo-semanal-valor">
                {total.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })}
            </div>

            <p>Soma de todos os lançamentos da semana</p>


        </section>
    )
}

export default ResumoSemanal
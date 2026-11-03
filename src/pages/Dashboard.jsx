import { useState } from 'react'
import { Fuel, Wrench, Wallet } from 'lucide-react'

import CardFinanceiro from '../components/CardFinanceiro'
import { calcularGanhos } from '../utils/calculosFinanceiros'

import './Dashboard.css'

function Dashboard({
    percentualCombustivel,
    percentualManutencao
}) {

    const [ganhos, setGanhos] = useState('');

    const { combustivel, manutencao, lucro } = calcularGanhos(
        ganhos,
        percentualCombustivel,
        percentualManutencao
    )

    return (

        <section className="pagina-dashboard">

            {/* Cabeçalho */}
            <div className="dashboard-cabecalho">
                <h1>Dashboard</h1>
                <p>Controle financeiro das suas entregas</p>
            </div>

            {/* Campo de ganhos */}
            <div className="dashboard-ganhos">

                <div className="dashboard-ganhos-titulo">
                    <Wallet size={22} />
                    <h2>Ganhos da semana</h2>
                </div>

                <div className="dashboard-input">
                    <span>R$</span>

                    <input
                        type="number"
                        id="ganhos"
                        min="0"
                        step="0.01"
                        placeholder="Ex: 500"
                        value={ganhos}
                        onChange={(evento) =>
                            setGanhos(evento.target.value)
                        }
                    />
                </div>

                <p>Informe o valor total recebido com suas entregas.</p>

            </div>

            {/* Resumo financeiro */}
            <div className="cards-financeiros">

                <CardFinanceiro
                    titulo="Combustível"
                    valor={combustivel}
                    percentual={percentualCombustivel}
                    icone={Fuel}
                    tipo="combustivel"
                />

                <CardFinanceiro
                    titulo="Manutenção"
                    valor={manutencao}
                    percentual={percentualManutencao}
                    icone={Wrench}
                    tipo="manutencao"
                />

                <CardFinanceiro
                    titulo="Lucro"
                    valor={lucro}
                    percentual={
                        100 - percentualCombustivel - percentualManutencao
                    }
                    icone={Wallet}
                    tipo="lucro"
                />

            </div>

        </section>


    )
}

export default Dashboard
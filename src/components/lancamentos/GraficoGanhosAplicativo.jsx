import { ChartColumnIncreasing, Dice1 } from "lucide-react"

import './GraficosLancamentos.css'

const aplicativos = [
    { id: 'ifood', nome: 'iFood', cor: '#ef3340' },
    { id: '99food', nome: '99Food', cor: '#ffde24' },
    { id: 'lalamove', nome: 'Lalamove', cor: '#ff8221' },
    { id: 'mercadolivre', nome: 'Mercado Livre', cor: '#f8ca37' }
]

function GraficoGanhosAplicativo({ lancamentos }) {

    const dados = aplicativos.map((app) => {

        const total = lancamentos
            .filter((item) => item.aplicativo === app.id)
            .reduce(
                (soma, item) => soma + item.valor_centavos,
                0
            )

        return { ...app, total }
    })

    const maiorValor = Math.max(
        0,
        ...dados.map((item) => item.total)
    )

    function formatarMoeda(centavos) {

        return (centavos / 100).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        })
    }


    return (
        <section className="grafico-card">

            <div className="grafico-cabecalho">
                <ChartColumnIncreasing size={20} />

                <h2>Ganhos por aplicativo</h2>
            </div>

            <div className="grafico-colunas">

                {dados.map((app) => {

                    const altura = maiorValor > 0
                        ? (app.total / maiorValor) * 78
                        : 0

                    return (
                        <div className="grafico-coluna" key={app.id}>

                            <div className="grafico-trilho">

                                <span className="grafico-valor">
                                    {formatarMoeda(app.total)}
                                </span>

                                <div
                                    className="grafico-barra"
                                    style={{
                                        height: `${altura}%`,
                                        backgroundColor: app.cor
                                    }}
                                />

                                <div>

                                    <span className="grafico-legenda">
                                        {app.nome}
                                    </span>
                                </div>


                            </div>
                        </div>
                    )
                })}
            </div>
        </section>


    )
}
export default GraficoGanhosAplicativo
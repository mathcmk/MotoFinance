import { TrendingUp } from 'lucide-react'
import './GraficosLancamentos.css'

function GraficoEvolucaoDiaria({ lancamentos, inicioSemana }) {

    const diasSemana = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']

    const formatarData = (data) => {
        const ano = data.getFullYear()
        const mes = String(data.getMonth() + 1).padStart(2, '0')
        const dia = String(data.getDate()).padStart(2, '0')

        return `${ano}-${mes}-${dia}`
    }

    const dados = diasSemana.map((nomeDia, indice) => {

        const data = new Date(`${inicioSemana}T12:00:00`)

        data.setDate(data.getDate() + indice)

        const dataFormatada = formatarData(data)

        const total = lancamentos
            .filter((item) => item.data === dataFormatada)
            .reduce(
                (soma, item) => soma + item.valor_centavos,
                0
            )

        return {
            dia: nomeDia,
            data: dataFormatada,
            total
        }
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
                <TrendingUp size={20} />
                <h2>Evolução diária (total por dia)</h2>
            </div>

            <div className="grafico-colunas">

                {dados.map((item) => {

                    const altura = maiorValor > 0
                        ? (item.total / maiorValor) * 78
                        : 0

                    return (
                        <div className="grafico-coluna" key={item.data}>

                            <div className="grafico-trilho">

                                <span className="grafico-valor">
                                    {formatarMoeda(item.total)}
                                </span>

                                <div
                                    className="grafico-barra"
                                    style={{
                                        height: `${altura}%`,
                                        backgroundColor: '#ffa94d'
                                    }}
                                />

                            </div>

                            <span className="grafico-legenda">
                                {item.dia}
                            </span>

                            <span className="grafico-data">
                                {item.data.slice(8, 10)}/
                                {item.data.slice(5, 7)}
                            </span>

                        </div>
                    )
                })}

            </div>

        </section>
    )
}

export default GraficoEvolucaoDiaria
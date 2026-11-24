import { useState, useEffect } from "react"
import { Wrench, CalendarDays, History, Gauge, Currency } from 'lucide-react'

import { buscarManutencoes } from "../api/manutencoesApi"

import './Manutencoes.css'

import CardIndicador from "../components/manutencao/CardsIndicador"
import CardUltimaManutencao from "../components/manutencao/CardUltimaManutencao"


function Manutencoes() {

    const [manutencoes, setManutencoes] = useState([])

    const totalGasto = manutencoes
        .map((manutencao) => manutencao.valor_centavos)
        .reduce((acumulador, valor) => acumulador + valor, 0)

    //dados de gastos gerais
    const totalGastoFormatado = formatadorMoeda(totalGasto / 100)

    //dados de gastos no mês
    const hoje = new Date()

    const ano = hoje.getFullYear()
    const mes = String(hoje.getMonth() + 1).padStart(2, '0')
    const dia = String(hoje.getDate()).padStart(2, '0')

    const inicioMes = `${ano}-${mes}-01`
    const dataAtual = `${ano}-${mes}-${dia}`

    const filtrados = manutencoes
        .filter(manutencao => manutencao.data >= inicioMes && manutencao.data <= dataAtual)

    const gastosMes = manutencoes
        .filter(manutencao => manutencao.data >= inicioMes && manutencao.data <= dataAtual)
        .reduce((acumulador, manutencao) => acumulador + Number((manutencao.valor_centavos / 100) || 0), 0)

    // dados quilometragem 
    const ultimaQuilometragem = manutencoes
        .reduce((maisRecente, atual) => {
            {
                if (maisRecente == null) {
                    return atual
                }
            }
            return atual.data > maisRecente.data ? atual : maisRecente

        }, null)

    const km = ultimaQuilometragem?.quilometragem ?? 0
    const kmFormatado = km + ' km'

    const ultimoServico = ultimaQuilometragem?.servico ?? ''
    const ultimaData = ultimaQuilometragem?.data ?? ''

    const [anoFormatar, mesFormatar, diaFormatar] = ultimaData.split('-')
    const dataUltimaManutencaoFormatada = ultimaData !== '' ? `${diaFormatar}/${mesFormatar}/${anoFormatar}` : '-------'


    useEffect(() => {
        console.log('Carregando manutençõe...')

        buscarManutencoes()
            .then(dados => {
                setManutencoes(dados)
            })
            .catch(erro => {
                console.error(erro)
            })
    }, [])

    const gastoMesFormatado = formatadorMoeda(gastosMes)


    function formatadorMoeda(valor) {
        return valor.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        })
    }

    return (
        <main className="manutencoes-page">


            <header>
                <h2>Manutenções</h2>
                <p>Controle os gastos e serviços realizados em sua moto</p>
            </header>


            <div className="cards-indicadores">
                <CardIndicador
                    titulo='Total gasto'
                    valor={totalGastoFormatado}
                    Icone={Wrench}
                    cor='laranja'
                />

                <CardIndicador
                    titulo='Este mês'
                    valor={gastoMesFormatado}
                    Icone={CalendarDays}
                    cor='branco'
                />

                <CardUltimaManutencao
                    Icone={History}
                    servico={ultimoServico}
                    data={dataUltimaManutencaoFormatada}
                />

                <CardIndicador
                    titulo='Km da ultima revisão'
                    valor={kmFormatado}
                    Icone={Gauge}
                    cor='amarelo'
                />

            </div>
        </main>
    )

}
export default Manutencoes
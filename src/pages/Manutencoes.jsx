import { useState, useEffect } from "react"
import { Wrench, CalendarDays, History, Gauge } from 'lucide-react'

import { buscarManutencoes } from "../api/manutencoesApi"

import './Manutencoes.css'

import CardIndicador from "../components/manutencao/CardsIndicador"


function Manutencoes() {

    const [manutencoes, setManutencoes] = useState([])

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

    return (
        <main className="manutencoes-page">


            <header>
                <h2>Manutenções</h2>
                <p>Controle os gastos e serviços realizados em sua moto</p>
            </header>


            <div className="cards-indicadores">
                <CardIndicador
                    titulo='Total gasto'
                    valor={44.50}
                    Icone={Wrench}
                    cor='laranja'
                />

                <CardIndicador
                    titulo='Este mês'
                    valor={44.50}
                    Icone={CalendarDays}
                    cor='branco'
                />

                <CardIndicador
                    titulo='Total gasto'
                    valor={44.50}
                    Icone={History}
                    cor='laranja'
                />

                <CardIndicador
                    titulo='Este mês'
                    valor={44.50}
                    Icone={Gauge}
                    cor='amarelo'
                />

            </div>
        </main>
    )

}
export default Manutencoes
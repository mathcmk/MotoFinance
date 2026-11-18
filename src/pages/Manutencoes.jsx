import { useState, useEffect } from "react"
import { buscarManutencoes } from "../api/manutencoesApi"


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
        <main>
            <h2>Manutenções</h2>


            <ul>
                {manutencoes.map(manutencao => {
                    const valorReais = manutencao.valor_centavos / 100
                    const valorReaisFormatado = valorReais.toLocaleString('pt-BR', {
                        style:'currency',
                        currency: 'BRL'
                    })

                    return (
                        <li key={manutencao.id}>
                            {manutencao.servico} - {valorReaisFormatado}
                            </li>
                    )
                })}
            </ul>
        </main>
    )

}
export default Manutencoes
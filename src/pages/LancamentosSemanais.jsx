
import CardAplicativo from '../components/lancamentos/CardAplicativo'
import TabelaLancamentos from '../components/lancamentos/TabelaLancamentos'

import { useState, useEffect } from 'react'
import { buscarLancamentos } from '../api/lancamentosApi'

import logoIfood from '../assets/apps/ifood.png'
import logo99Food from '../assets/apps/99food.png'
import logoLalamove from '../assets/apps/lalamove.png'
import logoMercadoLivre from '../assets/apps/mercadolivre.png'

import './LancamentosSemanais.css'
import FormularioLancamentos from '../components/lancamentos/FormularioLancamentos'
import ResumoSemanal from '../components/lancamentos/ResumoSemanal'
import GraficoEvolucaoDiaria from '../components/lancamentos/GraficoEvolucaoDiaria'
import GraficoGanhosAplicativo from '../components/lancamentos/graficoGanhosAplicativo'


function LancamentosSemanais() {

    const [lancamentos, setLancamentos] = useState([])
    const [carregando, setCarregando] = useState(true)
    const [erro, setErro] = useState('')

    useEffect(() => {

        async function carregarlancamentos() {

            try {
                setCarregando(true)
                setErro('')

                const dados = await buscarLancamentos()

                setLancamentos(dados)
            } catch (erro) {
                console.error(erro)

                setErro('Não foi possivel carregar os lançamento')
            } finally {
                setCarregando(false)
            }
        }

        carregarlancamentos()
    }, [])



    const hoje = new Date()

    const inicioSemama = new Date(
        hoje.getFullYear(),
        hoje.getMonth(),
        hoje.getDate()
    )

    const diaSemana = (inicioSemama.getDay() + 6) % 7

    inicioSemama.setDate(
        inicioSemama.getDate() - diaSemana
    )

    const fimSemana = new Date(inicioSemama)

    fimSemana.setDate(fimSemana.getDate() + 6)

    function formatarDataLocal(data) {
        const ano = data.getFullYear()
        const mes = String(data.getMonth() + 1).padStart(2, '0')
        const dia = String(data.getDate()).padStart(2, '0')

        return `${ano}-${mes}-${dia}`
    }

    const inicio = formatarDataLocal(inicioSemama)
    const fim = formatarDataLocal(fimSemana)

    const lancamentosSemana = lancamentos.filter(
        (lancamento) =>
            lancamento.data >= inicio &&
            lancamento.data <= fim
    )

    function calcularTotalAplicativo(nomeAplicativo) {

        return lancamentosSemana
            .filter(
                (lancamento) =>
                    lancamento.aplicativo === nomeAplicativo
            ).reduce(
                (total, lancamento) =>
                    total + lancamento.valor_centavos,
                0
            ) / 100
    }

    function registrarNovoLancamento(novoLancamento) {

        setLancamentos((anteriores) => [
            novoLancamento,
            ...anteriores
        ])
    }

    const totalIfood = calcularTotalAplicativo('ifood')
    const total99Food = calcularTotalAplicativo('99food')
    const totalLalamove = calcularTotalAplicativo('lalamove')
    const totalMercadoLivre = calcularTotalAplicativo('mercadolivre')

    const totalSemana =
        totalIfood +
        total99Food +
        totalLalamove +
        totalMercadoLivre




    return (

        <section className="pagina-lancamentos">

            <h1>Lançamentos semanais</h1>

            <p>
                Gerencie os ganhos diários de suas entregas
            </p>

            {carregando && (
                <p>Carregando lançamentos...</p>
            )}

            {erro && (
                <p role='alert'>{erro}</p>
            )}


            <div className="cards-aplicativos">

                <CardAplicativo
                    nome='iFood'
                    valor={totalIfood}
                    percentual={0}
                    logo={logoIfood}
                    tipo='ifood'
                />

                <CardAplicativo
                    nome='99'
                    valor={total99Food}
                    percentual={0}
                    logo={logo99Food}
                    tipo='99'
                />

                <CardAplicativo
                    nome='Lalamove'
                    valor={totalLalamove}
                    percentual={0}
                    logo={logoLalamove}
                    tipo='lalamove'
                />

                <CardAplicativo
                    nome='Mercado livre'
                    valor={totalMercadoLivre}
                    percentual={0}
                    logo={logoMercadoLivre}
                    tipo='mercadolivre'
                />



            </div>

            <div className='lancamentos-linha-principal'>

                <ResumoSemanal
                    total={totalSemana}
                />

                <FormularioLancamentos
                    onLancamentoAdicionado={registrarNovoLancamento}
                />

            </div>


            <div className="lancamentos-linha-dados">

                <div className="lancamentos-area-graficos">

                    <GraficoGanhosAplicativo
                        lancamentos={lancamentosSemana}
                    />

                    <GraficoEvolucaoDiaria
                        lancamentos={lancamentosSemana}
                        inicioSemana={inicio}
                    />

                </div>

                <TabelaLancamentos
                    lancamentos={lancamentosSemana}
                />

            </div>



        </section>

    )
}

export default LancamentosSemanais
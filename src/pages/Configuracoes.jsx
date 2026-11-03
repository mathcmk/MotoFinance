import { useState } from "react"
import { Settings, SlidersHorizontal, Wallet, Save } from "lucide-react"

import { atualizarConfiguracoes } from '../api/configuracoesApi'

import "./Configuracoes.css"

function Configuracoes({
    percentualCombustivel,
    setPercentualCombustivel,
    percentualManutencao,
    setPercentualManutencao
}) {

    const [combustivelEditado, setCombustivelEditado] =
        useState(String(percentualCombustivel))

    const [manutencaoEditada, setmanutencaoEditada] =
        useState(String(percentualManutencao))

    const [salvando, setSalvando] = 
        useState(false)

    const [mensagem, setMensagem] = 
        useState('')

    const [erroSalvamento, setErroSalvamento] = 
        useState('')

    const combustivel = Number(combustivelEditado)
    const manutencao = Number(manutencaoEditada)


    const percentualLucro = 100 - combustivel - manutencao

    const configuracaoValida =
        combustivelEditado.trim() !== '' &&
        manutencaoEditada.trim() !== '' &&
        Number.isFinite(combustivel) &&
        Number.isFinite(manutencao) &&
        combustivel >= 0 &&
        combustivel <= 100 &&
        manutencao >= 0 &&
        manutencao <= 100 &&
        percentualLucro >= 0



async function salvarConfiguracoes() {

        if(!configuracaoValida) return

        try {
            const resposta = await atualizarConfiguracoes(
                combustivel,
                manutencao
            )

            setPercentualCombustivel(resposta.percentual_combustivel)
            setPercentualManutencao(resposta.percentual_manutencao)

            console.log('Configurações salvas ', resposta)
        }catch (erro) {
            console.erro('Erro ao salvar as configurações ', erro)
        }
    }

    return (

        <section className="pagina-configuracoes">

            <div className="config-cabecalho">
                <div>
                    <h1>Configurações</h1>
                    <p>Gerencie os percentuais dos seus ganhos</p>
                </div>

                <Settings size={26} />
            </div>

            <div className="config-card">

                <div className="config-card-titulo">
                    <SlidersHorizontal size={22} />

                    <div>
                        <h2>Distribuição dos ganhos</h2>
                        <p>Personalize suas reservas financeiras</p>
                    </div>
                </div>

                <div className="config-campos">

                    <div className="config-campo">
                        <label htmlFor="combustivel">
                            Combustível (%)
                        </label>

                        <input
                            type="number"
                            id="combustivel"
                            min="0"
                            max="100"
                            value={combustivelEditado}
                            onChange={(evento) =>
                                setCombustivelEditado(evento.target.value)
                            }
                        />
                    </div>

                    <div className="config-campo">
                        <label htmlFor="manutencao">
                            Manutenção (%)
                        </label>

                        <input
                            type="number"
                            id="manutencao"
                            min="0"
                            max="100"
                            value={manutencaoEditada}
                            onChange={(evento) =>
                                setmanutencaoEditada(evento.target.value)
                            }
                        />
                    </div>

                </div>

                <div className="config-resumo">
                    <div className="config-lucro">
                        <div className="config-lucro-titulo">
                            <Wallet size={22} />
                            <span>Lucro disponível</span>
                        </div>

                        <strong>{percentualLucro}%</strong>
                    </div>

                    <div className="config-barra">



                        <div
                            className="barra-combustivel"
                            style={{ width: `${combustivel}%` }}
                        />

                        <div
                            className="barra-manutencao"
                            style={{ width: `${manutencao}%` }}
                        />

                        <div
                            className="barra-lucro"
                            style={{ width: `${Math.max(0, percentualLucro)}%` }}
                        />
                    </div>

                    <div className="config-legenda">
                        <div className="legenda-item">
                            <span className="legenda-cor cor-combustivel"></span>
                            <span>Combustivel </span>
                            <strong>{combustivel}%</strong>
                        </div>

                        <div className="legenda-item">
                            <span className="legenda-cor cor-manutencao"></span>
                            <span>Manutenção </span>
                            <strong>{manutencao}%</strong>
                        </div>

                        <div className="legenda-item">
                            <span className="legenda-cor cor-lucro"></span>
                            <span>Lucro </span>
                            <strong>{percentualLucro}%</strong>
                        </div>
                    </div>

                    <p>Percentual restante após as reservas</p>
                </div>

                {!configuracaoValida && (
                    <p className="mensagem-erro">
                        Verifique os percentuais. Os campos devem conter
                        valores entre 0 e 100, e a soma não pode
                        ultrapassar 100%.
                    </p>
                )}

                <div className="config-acoes">
                    <button
                        type="button"
                        className="botao-salvar"
                        disabled={!configuracaoValida}
                        onClick={salvarConfiguracoes}
                    >
                        <Save size={18} />
                        Salvar configurações
                    </button>
                </div>

            </div>
        </section>
    )
}

export default Configuracoes
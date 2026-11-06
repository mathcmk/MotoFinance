import { useState } from "react"
import { Plus } from "lucide-react"

import './FormularioLancamentos.css'

import { salvarLancamento } from '../../api/lancamentosApi'

function FormularioLancamentos({ onLancamentoAdicionado }) {

    const [data, setData] = useState('')
    const [aplicativo, setAplicativo] = useState('')
    const [valor, setValor] = useState('')
    const [observacoes, setObservacoes] = useState('')
    const [salvando, setSalvando] = useState(false)
    const [erro, setErro] = useState('')

    async function enviarFormulario(evento) {

        evento.preventDefault()

        if (!data || !aplicativo || !valor.trim()) {
            setErro('Preencha data, aplicativo e valor')
            return
        }

        const valorNumero = Number(valor)
        const valorCentavos = Math.round(valorNumero * 100)

        if (
            !Number.isFinite(valorNumero) ||
            !Number.isSafeInteger(valorCentavos) ||
            valorNumero <= 0 ||
            Math.abs(valorNumero * 100 - valorCentavos) > 0.000001
        ) {
            setErro('informe um valor válido com até duas casas decimais.')
            return
        }

        const novoLancamento = {
            data,
            aplicativo,
            valor_centavos: valorCentavos,
            observacoes: observacoes.trim()
        }

        try {
            setSalvando(true)
            setErro('')

            const lancamentoSalvo = await salvarLancamento(
                novoLancamento
            )


            onLancamentoAdicionado(lancamentoSalvo)

            setAplicativo('')
            setValor('')
            setObservacoes('')
        } catch (erro) {
            console.error('Erro ao salvar lançamento: ', erro)
            setErro(erro.message)
        } finally {
            setSalvando(false)
        }

    }

    return (
        <form
            className="formulario-lancamento"
            onSubmit={enviarFormulario}
        >

            <div className="formulario-cabecalho">
                <Plus size={22} />
                <h2>Novo lançamento</h2>
            </div>

            <div className="formulario-grid">

                <div className="formulario-campo">
                    <label htmlFor="data">
                        Data
                    </label>

                    <input
                        type="date"
                        id="data"
                        value={data}
                        onChange={(evento) =>
                            setData(evento.target.value)
                        }
                    />
                </div>

                <div className="formulario-campo">
                    <label htmlFor="aplicativo">
                        Aplicativo
                    </label>

                    <select
                        id="aplicativo"
                        value={aplicativo}
                        onChange={(evento) =>
                            setAplicativo(evento.target.value)
                        }
                    >
                        <option value="">
                            Selecione
                        </option>
                        <option value="ifood">iFood</option>
                        <option value="99food">99Food</option>
                        <option value="lalamove">Lalamove</option>
                        <option value="mercadolivre">
                            Mercado Livre
                        </option>
                    </select>
                </div>

                <div className="formulario-campo">
                    <label htmlFor="valor">
                        Valor ganho
                    </label>

                    <input
                        type="number"
                        id="valor"
                        min="0"
                        step="0.01"
                        placeholder="Ex.: 85.50"
                        value={valor}
                        onChange={(evento) =>
                            setValor(evento.target.value)
                        }
                    />
                </div>

                <div className="formulario-campo campo-observacoes">
                    <label htmlFor="observacoes">
                        Observações (opcional)
                    </label>

                    <input
                        type="text"
                        id="observacoes"
                        placeholder="Ex.: Turno da manhã, chuva, etc."
                        value={observacoes}
                        onChange={(evento) =>
                            setObservacoes(evento.target.value)
                        }
                    />
                </div>

                <div className="formulario-acoes">
                    <button
                        type="submit"
                        className="botao-adicionar"
                        disabled={salvando}
                    >
                        <Plus size={18} />
                        {salvando === true ? 'Salvando...' : 'Adicionar lançamento'}
                    </button>
                </div>

            </div>
            {erro && (
                <p className="erro-lancamento" role="alert">
                    {erro}
                </p>
            )}

        </form>
    )
}

export default FormularioLancamentos
import { useState } from "react"
import { Plus } from "lucide-react"

import './FormularioLancamentos.css'

function FormularioLancamentos() {

    const [data, setData] = useState('')
    const [aplicativo, setAplicativo] = useState('')
    const [valor, setValor] = useState('')
    const [observacoes, setObservacoes] = useState('')

    return (
        <section className="formulario-lancamento">

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
                        type="button"
                        className="botao-adicionar"
                    >
                        <Plus size={18} />
                        Adicionar lançamento
                    </button>
                </div>

            </div>

        </section>
    )
}

export default FormularioLancamentos
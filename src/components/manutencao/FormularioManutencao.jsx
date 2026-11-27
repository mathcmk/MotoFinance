import { BadgePlusIcon } from 'lucide-react'
import { useState } from 'react'

import './FormularioManutencao.css'

function enviarFormularioManutenção(evento) {
    evento.preventDefault()

    console.log('formulário enviado')
}
function FormularioManutencao() {

    const [servico, setServico] = useState('')
    const [data, setData] = useState('')
    const [valor, setValor] = useState('')
    const [quilometragem, setQuilometragem] = useState('')
    const [observacoes, setObservacoes] = useState('')





    return (

        <form
            className="formulario-manutencao"
            onSubmit={enviarFormularioManutenção}
        >

            <div className='titulo-formulario'>
                <BadgePlusIcon size={32} />
                <h2>Nova manutenção</h2>
            </div>

            <div className='campos-formulario-grid'>

                <div className='formulario-campo-manutencao'>
                    <label htmlFor="data">
                        Data
                    </label>

                    <input
                        type="date"
                        id='data'
                        value={data}
                        onChange={(evento) => setData(evento.target.value)}
                        required
                    />
                </div>


                <div className='formulario-campo-manutencao'>
                    <label htmlFor="servico">
                        Serviço
                    </label>

                    <input
                        type="text"
                        id='servico'
                        value={servico}
                        onChange={(evento) => setServico(evento.target.value)}
                        required
                    />
                </div>

                <div className='formulario-campo-manutencao'>
                    <label htmlFor="valor">
                        Valor gasto
                    </label>

                    <input
                        type="number"
                        min={0.01}
                        step={0.01}
                        id='valor'
                        value={valor}
                        onChange={(evento) => (setValor(evento.target.value))}
                        required
                    />
                </div>


                <div className='formulario-campo-manutencao'>
                    <label htmlFor="quilometragem">
                        Quilometragem
                    </label>

                    <input
                        type="number"
                        min={0}
                        step={1}
                        id='quilometragem'
                        value={quilometragem}
                        onChange={(evento) => (setQuilometragem(evento.target.value))}
                        required
                    />
                </div>

            </div>


            <div className='formulario-campo-observacoes'>
                <label htmlFor="obs">
                    Observações (opcional)
                </label>

                <textarea
                    id="obs"
                    rows={3}
                    placeholder='Descreva os detalhes da manutenção...'
                    value={observacoes}
                    onChange={(evento) => setObservacoes(evento.target.value)}
                />

            </div>

            <button
                className='botao-adicionar-manutencao'
                type='submit'
            >
                Adicionar manutenção
            </button>



        </form>
    )
}

export default FormularioManutencao
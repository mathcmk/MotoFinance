import logoIfood from '../../assets/apps/ifood.png'
import logo99Food from '../../assets/apps/99food.png'
import logoLalamove from '../../assets/apps/lalamove.png'
import logoMercadoLivre from '../../assets/apps/mercadolivre.png'

import './TabelaLancamentos.css'

import { Pencil, Trash2, List } from 'lucide-react'

function formatarData(dataTexto) {

    const [ano, mes, dia] = dataTexto.split('-')

    const data = new Date(
        Number(ano),
        Number(mes) - 1,
        Number(dia)
    )

    const diasSemana = [
        'Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'S    ab'
    ]

    const diaSemana = diasSemana[data.getDay()]

    return `${dia}/${mes}/${ano}  (${diaSemana})`
}

const aplicativos = {
    ifood: {
        nome: 'iFood',
        logo: logoIfood
    },
    '99food': {
        nome: '99Food',
        logo: logo99Food
    },
    lalamove: {
        nome: 'Lalamove',
        logo: logoLalamove
    },
    mercadolivre: {
        nome: 'Mercado Livre',
        logo: logoMercadoLivre
    }
}

function TabelaLancamentos({ lancamentos }) {

    return (
        <section className="tabela-lancamentos">

            <div className="tabela-lancamentos-cabecalho">
                <List size={20} />
                <h2>Lançamentos da semana</h2>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>App</th>
                        <th>Valor</th>
                        <th>Ações</th>
                    </tr>
                </thead>

                <tbody>
                    {lancamentos.map((lancamento) => (
                        <tr key={lancamento.id}>

                            <td>{formatarData(lancamento.data)}</td>

                            <td>
                                <div className='tabela-aplicativo'>

                                    {aplicativos[lancamento.aplicativo] && (
                                        <img
                                            src={aplicativos[lancamento.aplicativo].logo}
                                            alt=""
                                            className={`tabela-aplicativo-logo ${
                                                lancamento.aplicativo === '99food' ? 'logo-99food' : ''
                                            }`}
                                        />
                                    )}

                                    <span>
                                        {aplicativos[lancamento.aplicativo]?.nome
                                            ?? lancamento.aplicativo}
                                    </span>

                                </div>
                            </td>

                            <td>
                                {(lancamento.valor_centavos / 100)
                                    .toLocaleString('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL'
                                    })}
                            </td>

                            <td>
                                <div className='tabela-acoes'>

                                    <button
                                        type='button'
                                        className='acao-editar'
                                        title='Editar lançamento'
                                        disabled
                                    >
                                        <Pencil size={16} />
                                    </button>


                                    <button
                                        type='button'
                                        className='acao-excluir'
                                        title='Excluir lançamento'
                                        disabled
                                    >
                                        <Trash2 size={16} />
                                    </button>


                                </div>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>

        </section>
    )
}

export default TabelaLancamentos
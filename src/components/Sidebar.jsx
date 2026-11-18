import Manutencoes from "../pages/manutencoes"

function Sidebar({ paginaAtiva, setPaginaAtiva }) {

    return (
        <aside className="sidebar">

            <h2>🏍️ Finanças</h2>

            <nav>
                <button
                    type="button"
                    className={paginaAtiva === 'dashboard' ? 'ativo' : ''}
                    onClick={() => setPaginaAtiva('dashboard')}
                >
                    Dashboard
                </button>


                <button
                    type="button"
                    className={paginaAtiva === 'lancamentos' ? 'ativo' : ''}
                    onClick={() => setPaginaAtiva('lancamentos')}
                >
                    Lançamentos Semanais
                </button>

                <button type="button"
                    className={paginaAtiva === 'manutencoes' ? 'ativo' : ''}
                    onClick={() => setPaginaAtiva('manutencoes')}
                >
                    Manutenções
                </button>

                <button
                    type="button"
                    className={paginaAtiva === 'configuracoes' ? 'ativo' : ''}
                    onClick={() => setPaginaAtiva('configuracoes')}
                >
                    Configurações
                </button>
            </nav>

        </aside >
    )
}

export default Sidebar
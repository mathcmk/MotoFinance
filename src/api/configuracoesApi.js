export async function buscarConfiguracoes() {

    const resposta = await fetch('/api/configuracoes')

    if (!resposta.ok) {
        throw new Error('Erro ao buscar configurações')
    }

    const dados = await resposta.json()

    return dados
}

export async function atualizarConfiguracoes(
    percentualCombustivel,
    percentualManutencao) {

    const resposta = await fetch('/api/configuracoes', {

        method: 'PUT',

        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            percentual_combustivel: percentualCombustivel,
            percentual_manutencao: percentualManutencao
        })
    })

    if (!resposta.ok) {
        throw new Error('Erro ao salvar configurações.')
    }

    return await resposta.json()
}
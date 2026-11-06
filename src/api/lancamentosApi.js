export async function buscarLancamentos() {

    const resposta = await fetch('/api/lancamentos')

    if (!resposta.ok) {
        throw new Error('Erro ao buscar lançamentos')
    }

    return await resposta.json()
}

export async function salvarLancamento(lancamento) {

    const resposta = await fetch('/api/lancamentos', {
        method: 'POST',

        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(lancamento)
    })

    const dados = await resposta.json()

    if (!resposta.ok) {
        throw new Error(
            dados.erro || 'Não foi possível salvar o lançamento.'
        )
    }

    return dados.lancamento
}
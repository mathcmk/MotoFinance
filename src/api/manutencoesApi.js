export async function buscarManutencoes() {
    const resposta = await fetch('/api/manutencoes')

    if (!resposta.ok) {
        throw new Error('Erro ao buscar manutenções')
    }

    return await resposta.json()
}

export async function cadastrarManutencao(manutencao) {
    const resposta = await fetch('/api/manutencoes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(manutencao)
    })

    const dados = await resposta.json()

    if(!resposta.ok) {
        throw new Error('Erro ao registrar manutenção')
    }

    return dados
}
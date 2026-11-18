export async function buscarManutencoes() {
    const resposta = await fetch('/api/manutencoes')

    if(!resposta.ok) {
        throw new Error('Erro ao buscar manutenções')
    }

    return await resposta.json()
}


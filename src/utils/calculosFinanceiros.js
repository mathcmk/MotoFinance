export function calcularGanhos(
    ganhos,
    percentualCombustivel = 25,
    percentualManutencao = 15
) {

    const valorTotal = Number(ganhos)

    const combustivel = valorTotal * (percentualCombustivel / 100)
    const manutencao = valorTotal * (percentualManutencao / 100)
    const lucro = valorTotal - combustivel - manutencao

    return {
        valorTotal,
        combustivel,
        manutencao,
        lucro
    }
}
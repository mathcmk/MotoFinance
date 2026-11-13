const express = require('express')
const db = require('./database/db')
const { ClipboardMinus } = require('lucide-react')

const app = express()

app.use(express.json())

const PORT = 3001


//===============================
// ROTAS GET
//===============================

app.get('/', (req, res) => {
    res.json({
        mensagem: 'Bem vindo(a) a API da Moto Finance',
        status: 'online'
    })
})

app.get('/api/status', (req, res) => {
    res.json({
        mensagem: 'API Moto Finance funcionando!',
        status: 'online'
    })
})

// Rota GET para obter os percentuais da tabela
app.get('/api/configuracoes', (req, res) => {

    const configuracoes = db.prepare(`
            SELECT
                percentual_combustivel,
                percentual_manutencao
            FROM configuracoes
            WHERE id = 1
        `).get()

    res.json(configuracoes)
})

app.get('/api/lancamentos', (req, res) => {

    try {
        const lancamentos = db.prepare(`
                SELECT 
                id,
                data,
                aplicativo,
                valor_centavos,
                criado_em

                FROM lancamentos
                ORDER BY data DESC, id DESC
            `).all()

        return res.json(lancamentos)
    } catch (erro) {
        console.error('Erro ao consultar lançamentos: ', erro)

        return res.status(500).json({
            erro: 'Não foi possivel consultar os lançamentos.'
        })
    }

})

app.get('/api/manutencoes', (req, res) => {

    try {
        const manutencoes = db.prepare(`
        SELECT 
            id,
            data,
            servico,
            valor_centavos,
            quilometragem,
            observacoes,
            criado_em

            FROM manutencoes
            ORDER BY data DESC, id DESC
        `).all()

        return res.json(manutencoes)
    } catch (erro) {

        console.error('Erro ao consultar manutenções: ', erro)

        return res.status(500).json({
            erro: 'não foi possivel consultar as manutenções.'
        })
    }
})
//-------------------------------------------------------------------------------



//===============================
// ROTAS POST
//===============================
app.post('/api/lancamentos', (req, res) => {

    // 1. Verifica se recebemos um objeto JSON
    if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
        return res.status(400).json({
            erro: 'Envie os dados de lançamento em JSON'
        })
    }

    // 2. Extrai os dados recebidos
    const {
        data,
        aplicativo,
        valor_centavos,
        observacoes,
    } = req.body

    // 3. Valida o formato e a existência da data
    const dataValida =
        typeof data === 'string' &&
        /^\d{4}-\d{2}-\d{2}$/.test(data) &&
        !Number.isNaN(Date.parse(`${data}T00:00:00Z`)) &&
        new Date(`${data}T00:00:00Z`)
            .toISOString()
            .slice(0, 10) === data

    // 4. Valida o aplicativo
    const aplicativosPermitidos = [
        'ifood',
        '99food',
        'lalamove',
        'mercadolivre'
    ]

    const aplicativoValido =
        typeof aplicativo === 'string' &&
        aplicativosPermitidos.includes(aplicativo)

    // 5. Valida o valor em centavos
    const valorValido =
        Number.isSafeInteger(valor_centavos) &&
        valor_centavos > 0

    // 6. Valida as observações
    const observacoesValidas =
        observacoes === undefined ||
        observacoes === null ||
        (
            typeof observacoes === 'string' &&
            observacoes.length <= 500
        )

    if (
        !dataValida ||
        !aplicativoValido ||
        !observacoesValidas ||
        !valorValido
    ) {
        return res.status(400).json({
            erro: 'Dados do lançamento inválidaos.'
        })
    }

    try {

        // 7. Prepara a instrução SQL
        const comando = db.prepare(`
                INSERT INTO lancamentos(
                    data,
                    aplicativo,
                    valor_centavos,
                    observacoes
                )

                VALUES(?,?,?,?)
            `)


        // 8. Executa a inserção

        const resultado = comando.run(
            data,
            aplicativo,
            valor_centavos,
            observacoes ?? null
        )

        // 9. Retorna o registro criado
        return res.status(201).json({
            mensagem: 'Lançamento cadastrado com sucesso.',
            lancamento: {
                id: Number(resultado.lastInsertRowid),
                data,
                aplicativo,
                valor_centavos,
                observacoes: observacoes ?? null
            }
        })
    } catch (erro) {
        console.error('Erro ao cadastrar lançamento: ', erro)

        return res.status(500).json({
            erro: 'Não foi possivel cadastrar o lançamento.'
        })
    }

})

app.post('/api/manutencoes', (req, res) => {
    // 1. Verifica se recebemos um objeto JSON

    if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
        return res.status(400).json({
            erro: 'Envie os dados de manutenções em JSON.'
        })
    }

    const {
        data,
        servico,
        valor_centavos,
        quilometragem,
        observacoes
    } = req.body


    // Validando o valor de servico
    if (typeof servico !== 'string' || servico.trim() === '') {
        return res.status(400).json({
            erro: 'Informe o serviço realizado.'
        })
    }

    //Validando o valor de valor_centavos
    if (!Number.isInteger(valor_centavos) || valor_centavos <= 0) {
        return res.status(400).json({
            erro: 'Informe um valor válido.'
        })
    }

    //validando a quilometragem
    if (!Number.isInteger(quilometragem) || quilometragem < 0) {
        return res.status(400).json({
            erro: 'Informe uma quilometragem valida, maior ou igual a zero.'
        })
    }

    //Validando a data
    const formatoData = /^\d{4}-\d{2}-\d{2}$/

    if (typeof data !== 'string' || !formatoData.test(data)) {
        return res.status(400).json({
            erro: 'Informe uma data com formato válido, YYYY-MM-DD'
        })
    }



    const [ano, mes, dia] = data.split('-').map(Number)
    const dataTeste = new Date(ano, mes - 1, dia)

    if (dataTeste.getFullYear() !== ano ||
        dataTeste.getMonth() !== mes - 1 ||
        dataTeste.getDate() !== dia
    ) {
        return res.status(400).json({
            erro: 'Data inválida'
        })
    }

    //Validação da observacoes
    if (observacoes != null && typeof observacoes !== 'string') {
        return res.status(400).json({
            erro: 'Informe uma observação válida.'
        })
    }

    const observacoesValidada = observacoes ?? null


    try {
        const comando = db.prepare(`
            INSERT INTO manutencoes (
                data,
                servico,
                valor_centavos,
                quilometragem,
                observacoes
            )VALUES(?,?,?,?,?)
        `)

        const resultado =
            comando.run(
                data,
                servico,
                valor_centavos,
                quilometragem,
                observacoesValidada
            )

        return res.status(201).json({
            mensagem: `Manutenção resgistrada com sucesso!`,
            id: Number(resultado.lastInsertRowid)
        })

    } catch (erro) {
        console.error('Erro ao registrar manutenção: ', erro)
        return res.status(500).json({
            erro: 'Erro ao registrar manutenção'
        })
    }

})
//-------------------------------------------------------------------------------



//===============================
// ROTAS PUT
//===============================
app.put('/api/configuracoes', (req, res) => {

    if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
        return res.status(400).json({
            erro: 'Envie um objeto Json com os percentuais.'
        })
    }

    const {
        percentual_combustivel,
        percentual_manutencao
    } = req.body

    const combustivel = Number(percentual_combustivel)
    const manutencao = Number(percentual_manutencao)

    const configuracaoValida =
        typeof percentual_combustivel === 'number' &&
        typeof percentual_manutencao === 'number' &&
        Number.isFinite(combustivel) &&
        Number.isFinite(manutencao) &&
        combustivel >= 0 &&
        combustivel <= 100 &&
        manutencao >= 0 &&
        manutencao <= 100 &&
        combustivel + manutencao <= 100

    if (!configuracaoValida) {
        return res.status(400).json({
            erro: 'Percentuais inválidos'
        })
    }

    const comando = db.prepare(`
        UPDATE configuracoes
        SET percentual_combustivel = ?,
            percentual_manutencao = ?
        WHERE id = 1
    `)

    const resultado = comando.run(combustivel, manutencao)

    if (resultado.changes === 0) {
        return res.status(404).json({
            erro: 'Configurações não encontradas'
        })
    }

    res.json({
        mensagem: 'Configurações atualizadas com sucesso!',
        percentual_combustivel: combustivel,
        percentual_manutencao: manutencao
    })
})

app.put('/api/lancamentos/:id', (req, res) => {

    const id = Number(req.params.id)

    if (!Number.isSafeInteger(id) || id <= 0) {
        return res.status(400).json({
            erro: 'Id do lançamento inválido.'
        })
    }

    const { data, aplicativo, valor_centavos, observacoes } = req.body

    if (!Number.isSafeInteger(valor_centavos) || valor_centavos <= 0) {
        return res.status(400).json({
            erro: 'Insira um valor válido'
        })
    }


    // Validação dos aplicativos
    const aplicativosValidos = [
        'ifood',
        'lalamove',
        'mercadolivre',
        '99food'
    ]

    if (!aplicativosValidos.includes(aplicativo)) {
        return res.status(400).json({
            erro: 'Inserir um aplicativo válido.'
        })
    }


    const dataConvertida = Date.parse(`${data}T00:00:00Z`)

    const dataValida =
        typeof data === 'string' &&
        /^\d{4}-\d{2}-\d{2}$/.test(data) &&
        !Number.isNaN(dataConvertida) &&
        new Date(dataConvertida)
            .toISOString()
            .slice(0, 10) === data

    if (!dataValida) {
        return res.status(400).json({
            erro: 'A data enviada é inválida.'
        })
    }

    if (observacoes != null &&
        (typeof observacoes !== 'string' ||
            observacoes.length > 500)
    ) {
        return res.status(400).json({
            erro: 'Valor de observações inválidos'
        })
    }

    try {
        const comando = db.prepare(`
        UPDATE lancamentos
        SET data = ?,
            aplicativo = ?,
            valor_centavos = ?,
            observacoes = ?
        WHERE id = ?`
        )

        const resultado = comando.run(
            data,
            aplicativo,
            valor_centavos,
            observacoes ?? null,
            id
        )

        if (resultado.changes === 0) {
            return res.status(404).json({
                erro: 'Lançamento não encontrado.'
            })
        }

        return res.status(200).json({
            mensagem: `Lançamento ${id} alterado com sucesso.`
        })

    } catch (erro) {
        console.error('Erro ao fazer alteração no lancamento: ', erro)

        res.status(500).json({
            erro: 'Ocorreu um erro ao fazer alteração.'
        })

    }



})
//-------------------------------------------------------------------------------



//===============================
// ROTAS DELET
//===============================

app.delete('/api/lancamentos/:id', (req, res) => {

    const id = Number(req.params.id)

    if (!Number.isSafeInteger(id) || id <= 0) {
        return res.status(400).json({
            erro: 'ID do lancamento inválido.'
        })
    }

    try {

        const comando = db.prepare(
            `DELETE FROM lancamentos
            WHERE id = ?`
        )

        const resultado = comando.run(id)

        if (resultado.changes === 0) {
            return res.status(404).json({
                erro: 'Lancamento não encontrado.'
            })
        }

        return res.status(200).json({
            mensagem: 'Laçamento excluido com sucesso.'
        })

    } catch (erro) {
        console.error('Erro ao excluir lançaento: ', erro)
        return res.status(500).json({
            erro: 'Não foi possivel excluir o lançamento.'
        })
    }
})

app.delete('/api/manutencoes/:id', (req, res) => {

    const id = req.params.id

    const idConvertido = Number(id)

    if (!Number.isSafeInteger(idConvertido) || idConvertido <= 0) {
        return res.status(400).json({
            erro: 'Valor do id é inválido.'
        })
    }

    try {

        const comando = db.prepare(`
                DELETE FROM manutencoes
                WHERE id = ?
            `)

        const resultado = comando.run(idConvertido)

        if (!resultado.changes) {
            return res.status(404).json({
                erro: 'Manutenção não encontrada.'
            })
        }

        return res.status(200).json({
            mensagem: 'Manutenção excluída com sucesso!',
            id: idConvertido
        })

    } catch (erro) {
        console.log('Erro ao excluir manutenção: ', erro)

        return res.status(500).json({
            erro: 'Erro ao excluir manutenção'
        })
    }
})









app.listen(PORT, '127.0.0.1', () => {
    console.log(`Servidor rodando em http://localhost:${PORT}/api/status`)
})


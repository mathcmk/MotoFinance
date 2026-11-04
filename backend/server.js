const express = require('express')
const db = require('./database/db')

const app = express()

app.use(express.json())

const PORT = 3001

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
    }catch (erro) {
        console.error('Erro ao consultar lançamentos: ', erro)

        return res.status(500).json({
            erro: 'Não foi possivel consultar os lançamentos.'
        })
    }
    
})




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

app.listen(PORT, '127.0.0.1', () => {
    console.log(`Servidor rodando em http://localhost:${PORT}/api/status`)
})
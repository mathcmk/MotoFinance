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




//===============================
// ROTAS PUT
//===============================
app.put('/api/configuracoes', (req, res) => {

    if(!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
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


app.listen(PORT, '127.0.0.1', () => {
    console.log(`Servidor rodando em http://localhost:${PORT}/api/status`)
})
const { DatabaseSync } = require('node:sqlite')
const path = require('node:path')

const caminhoBanco = path.join(__dirname, 'motofinance.db')

const db = new DatabaseSync(caminhoBanco)

db.exec(`
    CREATE TABLE IF NOT EXISTS configuracoes (
        id INTEGER PRIMARY KEY,
        percentual_combustivel REAL NOT NULL DEFAULT 25,
        percentual_manutencao REAL NOT NULL DEFAULT 15,

        CHECK (id = 1),
        CHECK (
            percentual_combustivel >= 0
            AND percentual_manutencao >= 0
            AND percentual_combustivel + percentual_manutencao <= 100
        )
    );
`)

db.prepare(`
    INSERT OR IGNORE INTO configuracoes (
        id,
        percentual_combustivel,
        percentual_manutencao
    )
    VALUES (1, 25, 15)
`).run()

module.exports = db
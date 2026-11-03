import { useState, useEffect } from 'react'
import './App.css'

import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Configuracoes from './pages/Configuracoes'

import { buscarConfiguracoes } from './api/configuracoesApi'




function App() {

  const [paginaAtiva, setPaginaAtiva] = useState('dashboard')
  const [percentualCombustivel, setPercentualCombustivel] = useState(25)
  const [percentualManutencao, setPercentualManutencao] = useState(15)
  const [carregando, setCarregando] = useState(true)
  const [erroCarregamento, setErroCarregamento] = useState('')

  useEffect(() => {

    let ativo = true

    async function carregarConfiguracoes() {
      try {
        const dados = await buscarConfiguracoes()

        console.log('Dados recebidos: ', dados)

        if (!ativo) return

        setPercentualCombustivel(dados.percentual_combustivel)
        setPercentualManutencao(dados.percentual_manutencao)

      } catch (erro) {
        if (!ativo) return

        console.erro(erro)
        setErroCarregamento(
          'Não foi possivel carregar as configurações.'
        )
      }finally{
        if(ativo) {
          setCarregando(false)
        }
      }
    }

    carregarConfiguracoes()

    return () =>{
      ativo = false
    }
  }, [])

  //Verificação de carregamento
  if(carregando) {
    return <p>Carregando configurações do Moto Finance...</p>
  }

  return (
    <div className='app'>
      <Sidebar
        paginaAtiva={paginaAtiva}
        setPaginaAtiva={setPaginaAtiva}
      />

      <main className='conteudo'>

        {erroCarregamento && (
          <p role='alert' className='mensagem-erro'>
            {erroCarregamento} usando os percentuais padrão
          </p>
        )}
        {paginaAtiva === 'dashboard'
          ? <Dashboard
            percentualCombustivel={percentualCombustivel}
            percentualManutencao={percentualManutencao}
          />
          : <Configuracoes
            percentualCombustivel={percentualCombustivel}
            setPercentualCombustivel={setPercentualCombustivel}
            percentualManutencao={percentualManutencao}
            setPercentualManutencao={setPercentualManutencao}
          />
        }

      </main>
    </div>
  )
}

export default App

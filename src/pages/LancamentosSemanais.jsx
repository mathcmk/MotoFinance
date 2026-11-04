
import CardAplicativo from '../components/lancamentos/CardAplicativo'

import logoIfood from '../assets/apps/ifood.png'
import logo99Food from '../assets/apps/99food.png'
import logoLalamove from '../assets/apps/lalamove.png'
import logoMercadoLivre from '../assets/apps/mercadolivre.png'

import './LancamentosSemanais.css'


function LancamentosSemanais() {

    return (

        <section className="pagina-lancamentos">

            <h1>Lançamentos semanais</h1>

            <p>
                Gerencie os ganhos diários de suas entregas
            </p>


            <div className="cards-aplicativos">

                <CardAplicativo
                    nome='iFood'
                    valor={0}
                    percentual={0}
                    logo={logoIfood}
                    tipo='ifood'
                />

                <CardAplicativo
                    nome='99'
                    valor={0}
                    percentual={0}
                    logo={logo99Food}
                    tipo='99'
                />

                <CardAplicativo
                    nome='Lalamove'
                    valor={0}
                    percentual={0}
                    logo={logoLalamove}
                    tipo='lalamove'
                />

                <CardAplicativo
                    nome='Mercado livre'
                    valor={0}
                    percentual={0}
                    logo={logoMercadoLivre}
                    tipo='mercadolivre'
                />

            </div>
        </section>

    )
}

export default LancamentosSemanais
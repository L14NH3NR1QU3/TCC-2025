import { useState, useEffect } from 'react';
import NavBar from "../../components/NavBar/NavBar";
import styles from './Home.module.css'; // Usando CSS Modules


function Home() {
  const [temaEscuro, setTemaEscuro] = useState(false);

  useEffect(() => {
    document.body.className = temaEscuro ? styles['dark-mode'] : styles['light-mode'];
  }, [temaEscuro]);

  const alternarTema = () => setTemaEscuro(prev => !prev);

  return (
    <div>
      <NavBar />
      <div className={styles.App}>
      {/* Navegação */}

        {/* Botão de alternância de tema */}
        <button className={styles['theme-toggle-button']} onClick={alternarTema}>
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path
              fill="currentColor"
              d="M9.37,5.51C9.19,6.15,9.1,6.82,9.1,7.5c0,4.08,3.32,7.4,7.4,7.4c0.68,0,1.35-0.09,1.99-0.27C17.45,17.19,14.93,19,12,19 
              c-3.86,0-7-3.14-7-7C5,9.07,6.81,6.55,9.37,5.51z M12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9s9-4.03,9-9c0-0.46-0.04-0.92-0.1-1.36 
              c-0.98,1.37-2.58,2.26-4.4,2.26c-2.98,0-5.4-2.42-5.4-5.4c0-1.81,0.89-3.42,2.26-4.4C12.92,3.04,12.46,3,12,3z"
            />
          </svg>
        </button>

      {/* Descrição principal */}
{/* <CardsDescPlanoGratuito 
  titulo={(
    <span className={styles.alexandria}>
      Gerencie o <strong className={styles.destaque}>estoque</strong> do seu negócio de maneira ágil
    </span>
  )}
  desc={(
    <span className={styles.alexandria2}>
      StoreBox facilita o gerenciamento de estoques com eficiência e recursos úteis.
    </span>
  )}
  botaoTxt={<button className={styles.botaoTesteGratis}>Teste grátis</button>}
  comBotão={true}
  txtComBotao="Experimente grátis por 30 dias"
/> */}


        {/* Benefícios rápidos */}
        <div className={styles.alexandria2}>
          <p>1 Acesso em tempo real</p>
          <p>2 Redução de erros</p>
          <p>3 Relatórios detalhados</p>
        </div>

        {/* Planos */}
        {/* <CardsCurso 
          cards={[ 
            {
              titulo: "Grátis",
              req1: "Experimente gratuito por 30 dias",
              req2: "Uso limitado",
              req3: "Sem recursos adicionais",
              req4: "Sem imagem de reconhecimento",
              req5: "Sem cadastro de funcionários",
            },
            {
              titulo: "Plano 1",
              req1: "Acesso completo",
            },
            {
              titulo: "Plano 2",
              req1: "Funcionalidades avançadas",
            },
          ]}
        /> */}
      </div>

      {/* Planos */}
      {/* <CardsCurso 
        cards={[ 
          {
            titulo: "Grátis",
            req1: "Experimente gratuito por 30 dias",
            req2: "Uso limitado",
            req3: "Sem recursos adicionais",
            req4: "Sem imagem de reconhecimento",
            req5: "Sem cadastro de funcionários",
          },
          {
            titulo: "Plano 1",
            req1: "Acesso completo",
          },
          {
            titulo: "Plano 2",
            req1: "Funcionalidades avançadas",
          },
        ]}
      /> */}
    </div>
  );
}

export default Home;

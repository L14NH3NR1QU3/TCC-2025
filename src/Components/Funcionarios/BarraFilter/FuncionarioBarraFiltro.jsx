import { useNavigate } from "react-router-dom";
import styles from "./FuncionarioBarraFiltro.module.css"

const BarraFiltro = () => {

    const navigate = useNavigate();

    const estoque = () => {
        navigate('/estoque');
    }
    const franquias = () => {
        navigate('/franquias');
    }

  return (
    <div className={styles.body}>
        <div>
            {/* Botão para a tela funcionario */}
            <button 
            className={styles.buttonAtual}>
                Funcionarios
            </button>
            {/* Botão indicativo da tela atual Estoque */}
            <button 
            className={styles.buttonOtherPage}
            onClick={estoque}>
                Estoque
            </button>
            {/* Botão para a tela Franquias */}
            <button 
            className={styles.buttonOtherPage}
            onClick={franquias}>
                Franquias
            </button>
        </div>
    </div>
  )
  
}

export default BarraFiltro
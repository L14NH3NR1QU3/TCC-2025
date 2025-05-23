import { FaEdit, FaRegTrashAlt } from 'react-icons/fa'
import NavBar from '../../components/NavBar/NavBar'
import Pesquisa from '../../components/Pesquisa/Pesquisa'
import { Button, Card, Container } from 'react-bootstrap'
import CardGeral from '../../components/Cards/CardGeral'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

const Estoque = () => {
  const [produtos, setprodutos] = useState([])
  const navigate = useNavigate()


  useEffect(() => {
    fetch('http://localhost:3000/produto')
      .then(res => res.json())
      .then(data => {
        const produtosComId = data.map(item => ({
          id: item.id_produto,
          nome: item.nome_produto,
          link: item.imagem_url || 'https://via.placeholder.com/150',
          descricao: [
            { texto: `Data de entrada: ${new Date(item.QTD_entrada_produto).toLocaleDateString()}` },
            { texto: `Quantidade: ${item.QTD_produto}` },
          ],
        }))
        setprodutos(produtosComId)
      })

      .catch(err => console.error(err))
  }, [])


  function handleCardClick(id) {
    navigate(`/visualizar/${id}`)
  }

  return (
    <div>
      <NavBar />
      <Container>
        <Pesquisa
          nomeDrop="Filtro"
          lista={[
            {
              lista: "Carnes",
              link: "#carnes"
            },
            {
              lista: "Bebidas",
              link: "#bebidas"
            },
            {
              lista: "Saladas",
              link: "#saladas"
            },
          ]}
        />
        <CardGeral
          filtro="produtos"
          card={produtos}
          onCardClick={handleCardClick}
        />
      </Container>
    </div>
  )
}

export default Estoque
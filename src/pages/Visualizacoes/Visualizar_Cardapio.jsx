import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import NavBar from '../../components/NavBar/NavBar';
import { useParams } from 'react-router';
import Button from 'react-bootstrap/Button';
import Cardapio from '../Cardapio/Cardapio';
import { useNavigate } from 'react-router';

const Visualizar_Cardapio = () => {
    const { id } = useParams();
    const [produto, setProduto] = useState(null);
    const [todosInsumos, setTodosInsumos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Buscar o item do cardápio
    useEffect(() => {
        if (!id) return;

        fetch(`http://localhost:3000/cardapio/${id}`)
            .then(res => res.json())
            .then(data => {
                const item = Array.isArray(data) ? data[0] : data;
                setProduto(item);
            })
            .catch(err => {
                console.error('Erro ao carregar produto:', err);
                setError(err.message);
            });
    }, [id]);

    // Buscar todos os insumos disponíveis
    useEffect(() => {
        fetch('http://localhost:3000/insumos')
            .then(res => res.json())
            .then(data => {
                setTodosInsumos(data);
            })
            .catch(err => {
                console.error('Erro ao carregar insumos:', err);
            })
            .finally(() => setLoading(false));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduto({ ...produto, [name]: value });
    };

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>Erro: {error}</p>;
    if (!produto) return <p>Produto não encontrado.</p>;

    const imagemLink = produto.imagem_url?.trim()
        ? `${produto.imagem_url}?t=${new Date().getTime()}`
        : 'https://www.valuehost.com.br/blog/wp-content/uploads/2022/01/post_thumbnail-77d8f2a95f2f41b5863f3fba5a261d7e.jpeg.webp';


    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3000/AtualizarCardapio/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(produto),
        })
            .then((res) => res.json())
            .then((data) => {
                alert("Cardapio atualizado com sucesso!");
                navigate('/cardapio')
            })
            .catch((err) => alert("Erro ao atualizar iten!"));
    };

    return (
        <div style={{ marginTop: '18vh' }}>
            <NavBar />
            <Container>
                <h3 style={{ marginTop: '20px' }}>Editar item do cardápio</h3>
                <Form onSubmit={handleSubmit}>
                    <Row className="justify-content-start mt-4">
                        <Col xs={12} md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>URL da Imagem</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="imagem_url"
                                    placeholder="Altere a URL da imagem"
                                    value={produto.imagem_url || ''}
                                    onChange={handleChange}
                                />
                                <img
                                    src={imagemLink}
                                    alt="Visualização"
                                    className="rounded img-fluid mt-2"
                                    style={{ maxHeight: '250px' }}
                                />
                            </Form.Group>
                        </Col>

                        <Col xs={12} md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nome_item"
                                    placeholder="Altere o nome"
                                    value={produto.nome_item || ''}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Descrição</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="descricao_item"
                                    placeholder="Altere a descrição aqui"
                                    value={produto.descricao_item || ''}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Preço</Form.Label>
                                <Form.Control
                                    type="number"
                                    step="0.01"
                                    name="valor_item"
                                    placeholder="Altere o preço aqui"
                                    value={produto.valor_item || ''}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Categoria</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="categoria"
                                    placeholder="Altere a categoria aqui"
                                    value={produto.categoria || ''}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Ingredientes</Form.Label>
                                <Form.Select name="insumos"onChange={handleChange}>
                                    <option value="">Insumo selecionado</option>
                                    {todosInsumos.map((insumo, index) => (
                                        <option
                                            key={insumo.id_insumos || index}
                                            value={insumo.nome_insumos}
                                        >
                                            {insumo.nome_insumos} ({insumo.quantidade_insumos} {insumo.unidade_medida})
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group>
                                <Button type='submit' variant='primary'>
                                    Alterar
                                </Button>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </div>
    );
};

export default Visualizar_Cardapio;

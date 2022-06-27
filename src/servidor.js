const porta = 3003;
const express = require('express');
const app = express();
const bancoDeDados = require('./bancoDeDados.js');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extend: true}));

app.get('/produtos', (req, res, next) => {
    res.send(bancoDeDados.getProdutos()); // Converter para JSON
});

app.get('/produtos/:id', (req, res, next) => {
    res.send(bancoDeDados.getProduto(req.params.id));
});

app.post('/produtos', (req, res, next) => {
    const produto = bancoDeDados.salvarProduto({
        nome: req.body.nome,
        preco: req.body.preco
    });
    res.send(produto); //JSON
});

app.put('/produtos/:id', (req, res, next) => {
    const produto = bancoDeDados.salvarProduto({
        id: req.params.id,
        nome: req.body.nome,
        preco: req.body.preco
    });
    res.send(produto); //JSON
});

app.delete('/produtos/:id', (req, res, next) => {
    const produto = bancoDeDados.excluirProduto(req.params.id);
    res.send(produto);
})


app.listen(porta, () => {
    console.log(`Servidor está executando na porta ${porta}.`);
});

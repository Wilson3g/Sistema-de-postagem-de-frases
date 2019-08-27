const express = require('express')
const server = express()
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const Postagem = require('./models/Postagem')

// bodyParser
    server.use(bodyParser.urlencoded({extended: false}))
    server.use(bodyParser.json())

// template engine
    server.engine('handlebars', handlebars({defaultLayout: 'main'}))
    server.set('view engine', 'handlebars')

// rotas
    server.get('/', (req, res) => {
        res.render('index')
    })

    server.get('/cad', (req, res) => {
        res.render('cadastrar')
    })

    // armazena os dados no banco
    server.post('/guardar', (req, res) => {
        Postagem.create({
            titulo: req.body.titulo,
            autor: req.body.autor,
            publicacao: req.body.publicacao
        })

        res.redirect('/cad')
    })

    // mostra todas as postagens
    server.get('/show', (req, res) => {
        Postagem.findAll().then((mensagem) => {
            res.render('show', {Mensagem: mensagem})
        })
    })

    // deleta a postagem pelo id
    server.get('/del/:id', (req, res) => {
        Postagem.destroy({where: {
            id: req.params.id
        }})

        res.redirect('/show')
    })

    // exibe a mensagem selecionada no formulario de edicao
    server.get('/editar/:id', (req, res) => {
        Postagem.findAll({where: {
            id: req.params.id
        }}).then((mensagem) => {
            res.render('edit', {Mensagem: mensagem})
        })

        id = req.params.id;
    })

    // edita a postagem pelo id
    server.post('/edit', (req, res) => {
        Postagem.update({
            titulo: req.body.titulo,
            autor: req.body.autor,
            publicacao: req.body.publicacao
        }, {
            where: { id: id },
        }).then(() => {
            res.redirect('/')
        })
    })

// inicia o servido
    server.listen(3000)
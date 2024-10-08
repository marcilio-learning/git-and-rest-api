import express from 'express'
import BancoEmMemoria from './banco-em-memoria.js'
import bodyParser from "body-parser"
const server = express()
server.use(bodyParser.json());
const port = 3001

const bancoEmMemoria = new BancoEmMemoria()

server.get("/livros", (req, res) => {
    res.status(200).send(bancoEmMemoria.pesquisaLivros(req.query))
})

server.post("/livros", (req, res) => {    
    if (!req.body) {
        res.sendStatus(400)
        return
    }

    const { titulo, autor, ano, lido, nota } = req.body
    const livro = { titulo, autor, ano, lido, nota }

    const camposObrigatorios = ["titulo", "autor", "ano", "lido"]
    const camposVazios = camposObrigatorios.filter(campo => livro[campo] == undefined)

    if (camposVazios.length > 0) {
        res.status(422).send({ erros: camposVazios.map(campo => `O campo ${campo} precisa ser informado!`)})
        return
    }
    
    bancoEmMemoria.adicionarLivro(livro)

    res.status(201).send(livro)
})

server.put("/livros/:id", (req, res) => {    
    if (!req.body) {
        res.sendStatus(400)
        return
    }

    const { id } = req.params
    const livroExistente = bancoEmMemoria.recuperaLivro(id)

    if (!livroExistente) {
        res.sendStatus(404)
        return
    }

    const { titulo, autor, ano, lido, nota } = req.body

    const livro = { 
        titulo: titulo ?? livroExistente.titulo, 
        autor: autor ?? livroExistente.autor, 
        ano: ano ?? livroExistente.ano, 
        lido: lido ?? livroExistente.lido, 
        nota: nota ?? livroExistente.nota
     }
    
    bancoEmMemoria.atualizaLivro(id, livro)

    res.status(201).send(livro)
})

server.delete("/livros/:id", (req, res) => {    
    const { id } = req.params
    const livroExistente = bancoEmMemoria.recuperaLivro(id)

    if (!livroExistente) {
        res.sendStatus(404)
        return
    }

    bancoEmMemoria.deletarLivro(id)

    res.sendStatus(204)
})

server.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
import express from 'express'
import BancoEmMemoria from './banco-em-memoria.js'
import bodyParser from "body-parser"
const server = express()
server.use(bodyParser.json());
const port = 3001

const bancoEmMemoria = new BancoEmMemoria()

server.post("/livros", (req, res) => {    
    if (!req.body) {
        res.sendStatus(400)
        return
    }

    const { titulo, autor, ano, lido, nota } = req.body
    const livro = { titulo, autor, ano, lido, nota }

    const camposObrigatorios = ["titulo", "autor", "ano", "lido"]
    const camposVazios = camposObrigatorios.filter(campo => !livro[campo])

    if (camposVazios.length > 0) {
        res.status(422).send({ erros: camposVazios.map(campo => `O campo ${campo} precisa ser informado!`)})
        return
    }
    
    bancoEmMemoria.adicionarLivro(livro)

    res.status(201).send(livro)
})

server.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
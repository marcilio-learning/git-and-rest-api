import { randomUUID } from 'crypto'

export default class BancoEmMemoria {
    #livros = new Map()

    adicionarLivro(livro) {
        livro.id = randomUUID()
        this.#livros.set(livro.id, livro)
    }
}
import { randomUUID } from 'crypto'

export default class BancoEmMemoria {
    #livros = new Map()

    adicionarLivro(livro) {
        livro.id = randomUUID()
        this.#livros.set(livro.id, livro)
    }

    pesquisaLivros(params) {        
        const { titulo, autor, anoInicial, anoFinal, notaInicial, notaFinal, lido } = params

        return Array.from(this.#livros.entries()).map(item => ({ id: item[0], ...item[1] })).filter(livro => {
            if (titulo && !livro.titulo.toLowerCase().includes(titulo.toLowerCase()))
                return false

            if (autor && !livro.autor.toLowerCase().includes(autor.toLowerCase()))
                return false

            if (lido != undefined && livro.lido != (lido == "true"))
                return false

            if (anoInicial && livro.ano < anoInicial)
                return false

            if (anoFinal && livro.ano > anoFinal)
                return false

            if (notaInicial && livro.nota < notaInicial)
                return false

            if (notaFinal && livro.nota > notaFinal)
                return false

            return true
        })
    }

    recuperaLivro(id) {
        return this.#livros.get(id)
    }

    atualizaLivro(id, livro) {
        this.#livros.set(id, livro)
    }
}
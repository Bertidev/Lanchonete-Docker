const {
    adicionarAoCarrinho,
    removerDoCarrinho,
    atualizarQuantidade,
    calcularTotal
} = require('./unit.functions');

describe("Funções do carrinho", () => {

    test("Adicionar produto novo ao carrinho", () => {
        const carrinho = [];
        const produto = { id: 1, nome: "Hambúrguer", preco: 20 };

        const result = adicionarAoCarrinho(carrinho, produto, 1);

        expect(result).toEqual([
            { id: 1, nome: "Hambúrguer", preco: 20, quantidade: 1 }
        ]);
    });

    test("Adicionar quantidade a produto existente", () => {
        const carrinho = [
            { id: 1, nome: "Hambúrguer", preco: 20, quantidade: 1 }
        ];

        const produto = { id: 1, nome: "Hambúrguer", preco: 20 };

        const result = adicionarAoCarrinho(carrinho, produto, 2);

        expect(result).toEqual([
            { id: 1, nome: "Hambúrguer", preco: 20, quantidade: 3 }
        ]);
    });

    test("Remover item do carrinho", () => {
        const carrinho = [
            { id: 1, nome: "Batata", preco: 10, quantidade: 1 },
            { id: 2, nome: "Refrigerante", preco: 5, quantidade: 1 }
        ];

        const result = removerDoCarrinho(carrinho, 1);

        expect(result).toEqual([
            { id: 2, nome: "Refrigerante", preco: 5, quantidade: 1 }
        ]);
    });

    test("Atualizar quantidade", () => {
        const carrinho = [
            { id: 1, nome: "Pizza", preco: 30, quantidade: 1 }
        ];

        const result = atualizarQuantidade(carrinho, 1, 5);

        expect(result).toEqual([
            { id: 1, nome: "Pizza", preco: 30, quantidade: 5 }
        ]);
    });

    test("Remover item se quantidade for < 1", () => {
        const carrinho = [
            { id: 1, nome: "Pizza", preco: 30, quantidade: 1 }
        ];

        const result = atualizarQuantidade(carrinho, 1, 0);

        expect(result).toEqual([]); // item removido
    });

    test("Calcular total corretamente", () => {
        const carrinho = [
            { id: 1, preco: 10, quantidade: 2 },
            { id: 2, preco: 5, quantidade: 3 }
        ];

        const result = calcularTotal(carrinho);

        expect(result).toBe(10*2 + 5*3);
    });

});

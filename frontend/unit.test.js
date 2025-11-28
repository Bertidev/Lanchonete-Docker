// frontend/tests/unit.test.js

describe('Testes Unitários do Frontend', () => {

    // Teste 5: Lógica de exibição de preço
    test('Deve formatar moeda brasileira corretamente', () => {
        const valor = 10.5;
        // Simulação simples de formatação visual
        const formatado = `R$ ${valor.toFixed(2).replace('.', ',')}`;
        expect(formatado).toBe('R$ 10,50');
    });

    // Teste 6: Validação de campo vazio
    test('Deve identificar campo de busca vazio', () => {
        const busca = "";
        const ehValido = busca.length > 0;
        expect(ehValido).toBe(false);
    });

    // Teste 7: Simulação de filtro de lista
    test('Deve filtrar lanches disponíveis', () => {
        const lanches = [
            { nome: 'X-Burger', disponivel: true },
            { nome: 'X-Salada', disponivel: false }
        ];
        const disponiveis = lanches.filter(l => l.disponivel);
        expect(disponiveis.length).toBe(1);
        expect(disponiveis[0].nome).toBe('X-Burger');
    });
    function adicionarAoCarrinho(carrinhoAtual, produto, quantidadeAdicional) {
    const itemExistente = carrinhoAtual.find(item => item.id === produto.id);

    if (itemExistente) {
        return carrinhoAtual.map(item => 
            item.id === produto.id 
                ? { ...item, quantidade: item.quantidade + quantidadeAdicional }
                : item
        );
    }
    
    // Adiciona novo item garantindo que tenha quantidade
    return [...carrinhoAtual, { ...produto, quantidade: quantidadeAdicional }];
}

/**
 * Remove um item completamente do carrinho pelo ID.
 */
function removerDoCarrinho(carrinhoAtual, idProduto) {
    return carrinhoAtual.filter(item => item.id !== idProduto);
}

/**
 * Atualiza a quantidade. Se for menor que 1, remove o item.
 */
function atualizarQuantidade(carrinhoAtual, idProduto, novaQuantidade) {
    if (novaQuantidade < 1) {
        return removerDoCarrinho(carrinhoAtual, idProduto);
    }
    
    return carrinhoAtual.map(item => 
        item.id === idProduto 
            ? { ...item, quantidade: novaQuantidade }
            : item
    );
}

/**
 * Calcula o valor total do carrinho (Preço x Quantidade de cada item).
 */
function calcularTotal(carrinho) {
    // Reduz o array somando (preco * quantidade)
    const total = carrinho.reduce((acc, item) => {
        return acc + (item.preco * item.quantidade);
    }, 0);
    
    return parseFloat(total.toFixed(2)); // Retorna com 2 casas decimais tratadas
}

module.exports = { 
    adicionarAoCarrinho, 
    removerDoCarrinho, 
    atualizarQuantidade, 
    calcularTotal 
};
});
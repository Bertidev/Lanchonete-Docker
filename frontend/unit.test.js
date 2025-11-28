// frontend/src/cartLogic.js

/**
 * Adiciona um produto ao carrinho ou incrementa a quantidade se já existir.
 * Essa é a mesma lógica do seu App.jsx, mas pura e testável.
 */
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
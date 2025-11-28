function adicionarAoCarrinho(carrinhoAtual, produto, quantidadeAdicional) {
    const itemExistente = carrinhoAtual.find(item => item.id === produto.id);

    if (itemExistente) {
        return carrinhoAtual.map(item => 
            item.id === produto.id 
                ? { ...item, quantidade: item.quantidade + quantidadeAdicional }
                : item
        );
    }
    
    return [...carrinhoAtual, { ...produto, quantidade: quantidadeAdicional }];
}

function removerDoCarrinho(carrinhoAtual, idProduto) {
    return carrinhoAtual.filter(item => item.id !== idProduto);
}

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

function calcularTotal(carrinho) {
    const total = carrinho.reduce((acc, item) => {
        return acc + (item.preco * item.quantidade);
    }, 0);
    
    return parseFloat(total.toFixed(2)); 
}

module.exports = { 
    adicionarAoCarrinho, 
    removerDoCarrinho, 
    atualizarQuantidade, 
    calcularTotal 
};

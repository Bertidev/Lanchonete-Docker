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
});
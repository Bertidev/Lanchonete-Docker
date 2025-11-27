// integration-tests/api.test.js
// Este script usa o 'node' nativo para fazer requisições HTTP (fetch)

const BASE_URL = 'http://localhost:8080'; // Porta do Proxy Nginx

console.log('⏳ Iniciando Testes de Integração...');

async function runTests() {
    let testesPassaram = 0;
    let totalTestes = 3;

    try {
        // Teste de Integração 1: Verificar se o Frontend (Nginx) está respondendo
        console.log('Teste 1: Verificando disponibilidade do Frontend...');
        const resFront = await fetch(BASE_URL);
        if (resFront.status === 200) {
            console.log('✅ Teste 1 Passou: Frontend acessível.');
            testesPassaram++;
        } else {
            console.error(`❌ Teste 1 Falhou: Status ${resFront.status}`);
        }

        // Teste de Integração 2: Verificar se a API Backend está respondendo (via Proxy)
        // Ajuste a rota '/api/' conforme sua aplicação real
        console.log('Teste 2: Verificando disponibilidade da API...');
        const resApi = await fetch(`${BASE_URL}/api/`); 
        // Aceita 200 (OK) ou 404 (Not Found mas respondeu) ou 401 (Unauthorized)
        // O importante é que o Nginx repassou pro Node e o Node respondeu
        if (resApi.status !== 502 && resApi.status !== 504) {
            console.log(`✅ Teste 2 Passou: API respondeu com status ${resApi.status}.`);
            testesPassaram++;
        } else {
            console.error('❌ Teste 2 Falhou: Bad Gateway (Backend fora do ar?)');
        }

        // Teste de Integração 3: Tentar acessar o banco indiretamente ou rota de saúde
        // Se você não tiver uma rota específica, testamos apenas a conectividade básica novamente
        console.log('Teste 3: Verificando resposta rápida (Latência)...');
        const inicio = Date.now();
        await fetch(BASE_URL);
        const fim = Date.now();
        if ((fim - inicio) < 2000) {
             console.log('✅ Teste 3 Passou: Resposta em menos de 2s.');
             testesPassaram++;
        } else {
             console.error('❌ Teste 3 Falhou: Sistema muito lento.');
        }

    } catch (error) {
        console.error('❌ Erro fatal nos testes:', error.message);
        process.exit(1);
    }

    if (testesPassaram === totalTestes) {
        console.log('🎉 Todos os testes de integração passaram!');
        process.exit(0);
    } else {
        console.error('⚠️ Alguns testes falharam.');
        process.exit(1);
    }
}

// Aguarda 5 segundos para garantir que tudo subiu e roda
setTimeout(runTests, 5000);
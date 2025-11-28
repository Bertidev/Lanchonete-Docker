const BASE_URL = 'http://localhost:8080';

console.log('⏳ Iniciando Testes de Integração com Retry...');

async function fetchWithRetry(url, retries = 10, delay = 3000) {
    for (let i = 0; i < retries; i++) {
        try {
            const res = await fetch(url);
            if (res.status !== 502 && res.status !== 504 && res.status !== 503) {
                return res;
            }
            console.log(`   ⚠️ Tentativa ${i + 1}/${retries}: Backend ainda indisponível (Status ${res.status})...`);
        } catch (error) {
            console.log(`   ⚠️ Tentativa ${i + 1}/${retries}: Erro de conexão (${error.cause || error.message})...`);
        }
        await new Promise(resolve => setTimeout(resolve, delay));
    }
    return { status: 502, ok: false };
}

async function runTests() {
    let testesPassaram = 0;
    const totalTestes = 3;

    try {
        // Teste 1
        console.log('\n🔍 Teste 1: Verificando Frontend...');
        const resFront = await fetchWithRetry(BASE_URL);
        if (resFront.status === 200) {
            console.log('   ✅ Passou: Frontend acessível.');
            testesPassaram++;
        } else {
            console.error(`   ❌ Falhou: Frontend retornou status ${resFront.status}`);
        }

        // Teste 2
        console.log('\n🔍 Teste 2: Verificando API Backend...');
        const resApi = await fetchWithRetry(`${BASE_URL}/api/`); 
        
        if (resApi.status !== 502 && resApi.status !== 504) {
            console.log(`   ✅ Passou: API respondeu (Status ${resApi.status}).`);
            testesPassaram++;
        } else {
            console.error('   ❌ Falhou: Backend não respondeu após várias tentativas (Bad Gateway).');
        }

        // Teste 3
        console.log('\n🔍 Teste 3: Verificando Latência...');
        const inicio = Date.now();
        await fetch(BASE_URL);
        const fim = Date.now();
        const duracao = fim - inicio;
        
        if (duracao < 2000) {
             console.log(`   ✅ Passou: Resposta em ${duracao}ms.`);
             testesPassaram++;
        } else {
             console.error(`   ❌ Falhou: Lento demais (${duracao}ms).`);
        }

    } catch (error) {
        console.error('❌ Erro fatal nos testes:', error.message);
        process.exit(1);
    }

    console.log('\n------------------------------------------------');
    if (testesPassaram === totalTestes) {
        console.log(`🎉 SUCESSO: ${testesPassaram}/${totalTestes} testes passaram.`);
        process.exit(0);
    } else {
        console.error(`⚠️ FRACASSO: Apenas ${testesPassaram}/${totalTestes} testes passaram.`);
        process.exit(1);
    }
}

runTests();
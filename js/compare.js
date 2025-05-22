// Variáveis globais
let produto1 = null;
let produto2 = null;

// Funções de Utilidade
function formatarPreco(preco) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(preco);
}

function criarEstrelas(avaliacao) {
    const estrelasCheias = Math.floor(avaliacao);
    const temMeiaEstrela = avaliacao % 1 >= 0.5;
    let html = '';
    
    for (let i = 0; i < 5; i++) {
        if (i < estrelasCheias) {
            html += '<i class="fas fa-star"></i>';
        } else if (i === estrelasCheias && temMeiaEstrela) {
            html += '<i class="fas fa-star-half-alt"></i>';
        } else {
            html += '<i class="far fa-star"></i>';
        }
    }
    
    return html + ` <span class="rating-value">(${avaliacao.toFixed(1)})</span>`;
}

// Funções de Comparação
function encontrarMelhorValor(produtos, especificacao) {
    if (produtos.length === 0) return null;
    
    return produtos.reduce((melhor, atual) => {
        const valorAtual = atual.especificacoes[especificacao];
        const valorMelhor = melhor.especificacoes[especificacao];
        
        // Tratamento especial para cada tipo de especificação
        switch(especificacao) {
            case 'peso':
            case 'espessura':
                return valorAtual < valorMelhor ? atual : melhor;
            case 'dpi':
            case 'avaliacao':
            case 'taxa':
            case 'fps':
                return valorAtual > valorMelhor ? atual : melhor;
            case 'sensor':
                // Para sensor, comparamos o número no nome (ex: "HERO 25K" -> 25)
                const numAtual = parseInt(valorAtual.match(/\d+/)?.[0] || '0');
                const numMelhor = parseInt(valorMelhor.match(/\d+/)?.[0] || '0');
                return numAtual > numMelhor ? atual : melhor;
            default:
                return valorAtual > valorMelhor ? atual : melhor;
        }
    });
}

function encontrarPiorValor(produtos, especificacao) {
    if (produtos.length === 0) return null;
    
    return produtos.reduce((pior, atual) => {
        const valorAtual = atual.especificacoes[especificacao];
        const valorPior = pior.especificacoes[especificacao];
        
        // Tratamento especial para cada tipo de especificação
        switch(especificacao) {
            case 'peso':
            case 'espessura':
                return valorAtual > valorPior ? atual : pior;
            case 'dpi':
            case 'avaliacao':
            case 'taxa':
            case 'fps':
                return valorAtual < valorPior ? atual : pior;
            case 'sensor':
                // Para sensor, comparamos o número no nome (ex: "HERO 25K" -> 25)
                const numAtual = parseInt(valorAtual.match(/\d+/)?.[0] || '0');
                const numPior = parseInt(valorPior.match(/\d+/)?.[0] || '0');
                return numAtual < numPior ? atual : pior;
            default:
                return valorAtual < valorPior ? atual : pior;
        }
    });
}

// Funções de Interface
async function carregarProdutos() {
    try {
        const produtos = await obterTodosProdutos();
        const select1 = document.getElementById('product1');
        const select2 = document.getElementById('product2');

        // Limpar selects
        select1.innerHTML = '<option value="">Selecione o primeiro produto</option>';
        select2.innerHTML = '<option value="">Selecione o segundo produto</option>';

        // Adicionar produtos
        produtos.forEach(produto => {
            const option1 = document.createElement('option');
            option1.value = produto.id;
            option1.textContent = `${produto.nome} (${produto.marca})`;
            select1.appendChild(option1);

            const option2 = document.createElement('option');
            option2.value = produto.id;
            option2.textContent = `${produto.nome} (${produto.marca})`;
            select2.appendChild(option2);
        });
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
        alert('Erro ao carregar produtos');
    }
}

async function selecionarProduto(numero, id) {
    try {
        const produto = await obterProduto(parseInt(id));
        if (produto) {
            if (numero === 1) {
                produto1 = produto;
                atualizarProduto1();
            } else {
                produto2 = produto;
                atualizarProduto2();
            }
            atualizarBotoes();
            atualizarTabela();
        }
    } catch (error) {
        console.error('Erro ao selecionar produto:', error);
        alert('Erro ao selecionar produto');
    }
}

function atualizarProduto1() {
    if (produto1) {
        document.getElementById('img1').innerHTML = `<img src="${produto1.imagem}" alt="${produto1.nome}">`;
        document.getElementById('name1').textContent = produto1.nome;
        document.getElementById('price1').textContent = formatarPreco(produto1.preco);
        atualizarEspecificacoes1();
    }
}

function atualizarProduto2() {
    if (produto2) {
        document.getElementById('img2').innerHTML = `<img src="${produto2.imagem}" alt="${produto2.nome}">`;
        document.getElementById('name2').textContent = produto2.nome;
        document.getElementById('price2').textContent = formatarPreco(produto2.preco);
        atualizarEspecificacoes2();
    }
}

function atualizarEspecificacoes1() {
    const specs1 = document.getElementById('specs1');
    specs1.innerHTML = '';

    if (produto1) {
        Object.entries(produto1.especificacoes).forEach(([key, value]) => {
            const td = document.createElement('td');
            td.textContent = value;
            specs1.appendChild(td);
        });
    }
}

function atualizarEspecificacoes2() {
    const specs2 = document.getElementById('specs2');
    specs2.innerHTML = '';

    if (produto2) {
        Object.entries(produto2.especificacoes).forEach(([key, value]) => {
            const td = document.createElement('td');
            td.textContent = value;
            specs2.appendChild(td);
        });
    }
}

function atualizarBotoes() {
    const btnRemove1 = document.querySelector('.select-container:first-child .btn-remove');
    const btnRemove2 = document.querySelector('.select-container:last-child .btn-remove');

    btnRemove1.disabled = !produto1;
    btnRemove2.disabled = !produto2;
}

function atualizarTabela() {
    const noProducts = document.getElementById('noProducts');
    const compareTable = document.querySelector('.compare-table-container');

    if (produto1 || produto2) {
        noProducts.style.display = 'none';
        compareTable.style.display = 'block';
    } else {
        noProducts.style.display = 'flex';
        compareTable.style.display = 'none';
    }
}

function removerProduto(numero) {
    if (numero === 1) {
        produto1 = null;
        document.getElementById('product1').value = '';
        document.getElementById('img1').innerHTML = '';
        document.getElementById('name1').textContent = '';
        document.getElementById('price1').textContent = '';
        document.getElementById('specs1').innerHTML = '';
    } else {
        produto2 = null;
        document.getElementById('product2').value = '';
        document.getElementById('img2').innerHTML = '';
        document.getElementById('name2').textContent = '';
        document.getElementById('price2').textContent = '';
        document.getElementById('specs2').innerHTML = '';
    }
    atualizarBotoes();
    atualizarTabela();
}

// Event Listeners
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Inicializar banco de dados
        await initDB();
        
        // Carregar produtos
        await carregarProdutos();

        // Adicionar event listeners
        document.getElementById('product1').addEventListener('change', (e) => {
            if (e.target.value) {
                selecionarProduto(1, e.target.value);
            } else {
                removerProduto(1);
            }
        });

        document.getElementById('product2').addEventListener('change', (e) => {
            if (e.target.value) {
                selecionarProduto(2, e.target.value);
            } else {
                removerProduto(2);
            }
        });
    } catch (error) {
        console.error('Erro ao inicializar:', error);
        alert('Erro ao inicializar a página');
    }
}); 
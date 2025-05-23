// Variáveis globais
let produtos = [];
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

// Função para obter todos os produtos da planilha Google Sheets
async function obterTodosProdutos() {
    try {
        return await GoogleSheetsDB.listarTodos();
    } catch (error) {
        console.error('Erro ao obter produtos:', error);
        return [];
    }
}

// Funções de Interface
async function carregarProdutos() {
    try {
        produtos = await obterTodosProdutos();
        
        // Ordenar produtos por nome
        produtos.sort((a, b) => a.nome.localeCompare(b.nome));
        
        const select1 = document.getElementById('product1');
        const select2 = document.getElementById('product2');
        
        // Limpar selects
        select1.innerHTML = '<option value="">Selecione o primeiro produto</option>';
        select2.innerHTML = '<option value="">Selecione o segundo produto</option>';
        
        // Adicionar produtos aos selects
        produtos.forEach(produto => {
            const option1 = document.createElement('option');
            const option2 = document.createElement('option');
            
            option1.value = produto.id;
            option1.textContent = produto.nome;
            option2.value = produto.id;
            option2.textContent = produto.nome;
            
            select1.appendChild(option1);
            select2.appendChild(option2.cloneNode(true));
        });
        
        // Adicionar event listeners
        select1.addEventListener('change', () => selecionarProduto(1, select1.value));
        select2.addEventListener('change', () => selecionarProduto(2, select2.value));
        
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
    }
}

function selecionarProduto(numero, id) {
    const produto = produtos.find(p => p.id === parseInt(id));
    
    if (produto) {
        if (numero === 1) {
            produto1 = produto;
            document.querySelector('#product1').parentElement.classList.add('selected');
        } else {
            produto2 = produto;
            document.querySelector('#product2').parentElement.classList.add('selected');
        }
        
        atualizarBotoesRemover();
        atualizarComparacao();
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

function atualizarBotoesRemover() {
    const btn1 = document.querySelector('#product1').nextElementSibling.querySelector('.btn-remove');
    const btn2 = document.querySelector('#product2').nextElementSibling.querySelector('.btn-remove');
    
    btn1.disabled = !produto1;
    btn2.disabled = !produto2;
}

function atualizarComparacao() {
    const container = document.querySelector('.compare-table-container');
    const noProducts = document.getElementById('noProducts');
    const header1 = document.getElementById('header1');
    const header2 = document.getElementById('header2');
    const tbody = document.getElementById('comparisonBody');

    if (produto1 || produto2) {
        container.style.display = 'block';
        noProducts.style.display = 'none';

        // Cabeçalho com imagem e nome
        header1.innerHTML = produto1 ? `
            <div style="display: flex; flex-direction: column; align-items: center;">
                <img src="${produto1.imagem}" alt="${produto1.nome}" style="max-width: 100px; border-radius: 8px; margin-bottom: 0.5rem;">
                <div style="font-weight: 600;">${produto1.nome}</div>
            </div>
        ` : '';
        header2.innerHTML = produto2 ? `
            <div style="display: flex; flex-direction: column; align-items: center;">
                <img src="${produto2.imagem}" alt="${produto2.nome}" style="max-width: 100px; border-radius: 8px; margin-bottom: 0.5rem;">
                <div style="font-weight: 600;">${produto2.nome}</div>
            </div>
        ` : '';

        // Determinar tipo base para specs
        let tipoBase = produto1 ? produto1.tipo : (produto2 ? produto2.tipo : null);
        let specs = [
            { label: '<i class="fas fa-dollar-sign"></i> Preço', key: 'preco', format: v => v !== undefined ? formatarPreco(v) : '-' },
        ];
        switch (tipoBase) {
            case 'mouse':
                specs.push(
                    { label: 'Sensor', key: 'sensor' },
                    { label: 'Peso', key: 'peso', format: v => v !== undefined ? v + 'g' : '-' },
                    { label: 'Tipo', key: 'tipo' }
                );
                break;
            case 'teclado':
                specs.push(
                    { label: 'Switch', key: 'switch' },
                    { label: 'Iluminação', key: 'iluminacao' },
                    { label: 'Tipo', key: 'tipo' }
                );
                break;
            case 'headset':
                specs.push(
                    { label: 'Driver', key: 'driver' },
                    { label: 'Microfone', key: 'microfone' },
                    { label: 'Tipo', key: 'tipo' }
                );
                break;
            case 'mousepad':
                specs.push(
                    { label: 'Tamanho', key: 'tamanho' },
                    { label: 'Material', key: 'material' },
                    { label: 'Tipo', key: 'tipo' }
                );
                break;
            case 'monitor':
                specs.push(
                    { label: 'Tamanho', key: 'tamanho' },
                    { label: 'Resolução', key: 'resolucao' },
                    { label: 'Taxa de Atualização', key: 'taxaAtualizacao' }
                );
                break;
            case 'webcam':
                specs.push(
                    { label: 'Resolução', key: 'resolucao' },
                    { label: 'FPS', key: 'fps' },
                    { label: 'Microfone', key: 'microfone' }
                );
                break;
        }
        specs.push({ label: '<i class="fas fa-link"></i> Link do Produto', key: 'urlProduto', format: v => v ? `<a href="${v}" target="_blank" class="btn-shop">Ver na loja</a>` : '-' });

        tbody.innerHTML = '';
        specs.forEach(spec => {
            const tr = document.createElement('tr');
            const v1 = produto1 ? (spec.format ? spec.format(produto1[spec.key] ?? produto1.especificacoes?.[spec.key]) : (produto1[spec.key] ?? produto1.especificacoes?.[spec.key] ?? '-')) : '-';
            const v2 = produto2 ? (spec.format ? spec.format(produto2[spec.key] ?? produto2.especificacoes?.[spec.key]) : (produto2[spec.key] ?? produto2.especificacoes?.[spec.key] ?? '-')) : '-';
            tr.innerHTML = `
                <td class="spec-name">${spec.label}</td>
                <td>${v1}</td>
                <td>${v2}</td>
            `;
            tbody.appendChild(tr);
        });
    } else {
        container.style.display = 'none';
        noProducts.style.display = 'block';
        header1.innerHTML = '';
        header2.innerHTML = '';
        tbody.innerHTML = '';
    }
}

function removerProduto(numero) {
    const select = document.getElementById(`product${numero}`);
    select.value = '';
    
    if (numero === 1) {
        produto1 = null;
        document.querySelector('#product1').parentElement.classList.remove('selected');
    } else {
        produto2 = null;
        document.querySelector('#product2').parentElement.classList.remove('selected');
    }
    
    atualizarBotoesRemover();
    atualizarComparacao();
}

// Event Listeners
document.addEventListener('DOMContentLoaded', carregarProdutos); 
/**
 * Sistema de Busca de Produtos
 * Este arquivo implementa a funcionalidade de busca e filtragem de produtos,
 * incluindo a exibição dos resultados na interface.
 */

/**
 * Realiza a busca de produtos com base nos filtros aplicados
 * @param {Event} event - Evento do formulário (opcional)
 */
async function buscarProdutos(event) {
    if (event) event.preventDefault();
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const tipoFiltros = Array.from(document.querySelectorAll('input[name="tipo"]:checked')).map(cb => cb.value);
    const tipoMarcas = Array.from(document.querySelectorAll('input[name="marca"]:checked')).map(cb => cb.value.toLowerCase());
    const precoMax = parseFloat(document.getElementById('maxPrice').value);
    
    const produtos = await obterTodosProdutos();
    const produtosFiltrados = produtos.filter(produto => {
        const nomeLower = produto.nome.toLowerCase();
        const matchNome = nomeLower.includes(searchTerm);
        const matchTipo = tipoFiltros.length === 0 || tipoFiltros.includes(produto.tipo);
        const matchMarca = tipoMarcas.length === 0 || tipoMarcas.some(marca => nomeLower.includes(marca));
        const matchPreco = produto.preco <= precoMax;
        
        return matchNome && matchTipo && matchPreco && matchMarca;
    });
    
    const productsGrid = document.getElementById('productsGrid');
    const noResults = document.getElementById('noResults');
    
    productsGrid.innerHTML = '';
    
    if (produtosFiltrados.length === 0) {
        noResults.style.display = 'flex';
        document.querySelector('.results-count').textContent = '0 produtos encontrados';
        return;
    }
    
    noResults.style.display = 'none';
    document.querySelector('.results-count').textContent = `${produtosFiltrados.length} produtos encontrados`;
    
    produtosFiltrados.forEach(produto => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image">
                <img src="${produto.imagem}" alt="${produto.nome}">
            </div>
            <div class="product-info">
                <h3>${produto.nome}</h3>
                <p class="product-specs">
                    ${produto.tipo === 'mouse' ? 
                        `Sensor: ${produto.especificacoes.sensor} • Peso: ${produto.especificacoes.peso}g • ${produto.especificacoes.tipo}` :
                    produto.tipo === 'teclado' ?
                        `Switch: ${produto.especificacoes.switch} • ${produto.especificacoes.iluminacao} • ${produto.especificacoes.tipo}` :
                    produto.tipo === 'headset' ?
                        `Driver: ${produto.especificacoes.driver} • ${produto.especificacoes.microfone} • ${produto.especificacoes.tipo}` :
                    produto.tipo === 'mousepad' ?
                        `Tamanho: ${produto.especificacoes.tamanho} • Espessura: ${produto.especificacoes.espessura}mm • ${produto.especificacoes.material}` :
                    produto.tipo === 'monitor' ?
                        `Resolução: ${produto.especificacoes.resolucao} • ${produto.especificacoes.taxa}Hz • ${produto.especificacoes.tamanho}"` :
                    produto.tipo === 'webcam' ?
                        `Resolução: ${produto.especificacoes.resolucao} • ${produto.especificacoes.fps}fps • ${produto.especificacoes.campo}` :
                        ''}
                </p>
                <div class="product-price">R$ ${produto.preco.toFixed(2)}</div>
                <div class="product-buttons">
                    <button class="btn-compare" onclick="window.location.href='compare.html'">Comparar</button>
                    <a href="${produto.urlProduto}" target="_blank" class="btn-shop">Ver na loja</a>
                </div>
            </div>
        `;
        productsGrid.appendChild(card);
    });
}

/**
 * Obtém todos os produtos da planilha Google Sheets
 * @returns {Promise<Array>} Array com todos os produtos
 */
async function obterTodosProdutos() {
    try {
        return await GoogleSheetsDB.listarTodos();
    } catch (error) {
        console.error('Erro ao obter produtos:', error);
        return [];
    }
}

/**
 * Limpa todos os filtros de busca e reinicia a busca
 */
function limparFiltros() {
    document.getElementById('searchInput').value = '';
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    document.getElementById('maxPrice').value = '1000';
    buscarProdutos(new Event('submit'));
}

// Inicializa a busca quando a página é carregada
document.addEventListener('DOMContentLoaded', () => {
    buscarProdutos(new Event('submit'));
}); 
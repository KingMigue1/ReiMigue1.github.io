/**
 * Gerenciamento de Produtos
 * Este arquivo contém funções para manipulação e filtragem de produtos,
 * utilizando o GoogleSheetsDB como fonte de dados.
 */

/**
 * ESPECIFICAÇÕES DOS PRODUTOS POR TIPO:
 * 
 * MOUSE:
 * - marcaModelo: Marca e Modelo do produto
 * - sensor: Tipo de sensor (ex: PAW3395, HERO 25K, etc.)
 * - dpi: DPI (mínimo-máximo) (ex: "400-25600")
 * - pollingRate: Polling Rate em Hz (ex: "1000Hz")
 * - quantidadeBotoes: Número de botões
 * - softwarePersonalizavel: Sim/Não
 * - iluminacaoRgb: Sim/Não
 * - peso: Peso em gramas
 * - tipo: Com ou sem fio
 * - preco: Preço do produto
 * 
 * TECLADO:
 * - marca: Marca do produto (ex: "Razer", "Logitech", "Corsair")
 * - tamanhoAproximado: Tamanho do teclado (ex: "Full-Size", "TKL", "60%")
 * - conectividade: Com fio/Sem fio
 * - tipoSwitch: Tipo de switch (ex: "Switches Silenciosos Com Membrana", "Red", "Blue", "Brown")
 * - tipo: Mecânico/Membrana/Híbrido
 * 
 * HEADSET:
 * - marca: Marca do produto (ex: "Havit", "HyperX", "Logitech")
 * - tamanhoFalante: Tamanho do falante (ex: "Φ53mm", "50mm")
 * - impedancia: Impedância (ex: "64 Ω ± 15%")
 * - sensibilidade: Sensibilidade do alto-falante (ex: "110dB±3dB")
 * - tipoConector: Tipo de conector (ex: "3.5mm AUX", "USB")
 * - respostaFrequencia: Resposta de frequência (ex: "20 hz a 20khz")
 * - microfone: Sim/Não
 * 
 * MOUSEPAD:
 * - tamanho: Tamanho do mousepad (ex: "900x400mm")
 * - material: Material da superfície (ex: "Tecido", "Silicone")
 * - tipo: Speed/Control/Híbrido
 * 
 * MONITOR:
 * - tamanho: Tamanho da tela (ex: "27 polegadas")
 * - resolucao: Resolução (ex: "1920x1080")
 * - taxaAtualizacao: Taxa de atualização (ex: "144Hz")
 * 
 * WEBCAM:
 * - resolucao: Resolução máxima (ex: "1080p")
 * - fps: Frames por segundo (ex: "30fps")
 * - microfone: Microfone integrado (Sim/Não)
 * 
 * MICROFONE:
 * - tipo: Condenser/Dynamic/Ribbon
 * - padrao: Padrão de captação
 * - conectividade: USB/XLR/Wireless
 */

/**
 * Obtém todos os produtos da planilha
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
 * Estrutura para armazenar produtos organizados por tipo
 * Usada para cache e organização dos produtos
 */
const produtosPorTipo = {
    mouse: [],
    teclado: [],
    headset: [],
    mousepad: [],
    monitor: [],
    webcam: [],
    microfone: []
};

/**
 * Obtém produtos filtrados por tipo
 * @param {string} tipo - Tipo do produto (mouse, teclado, etc.)
 * @returns {Promise<Array>} Array de produtos do tipo especificado
 */
async function obterProdutosPorTipo(tipo) {
    try {
        const produtos = await obterTodosProdutos();
        return produtos.filter(produto => produto.tipo.toLowerCase() === tipo.toLowerCase());
    } catch (error) {
        console.error(`Erro ao obter produtos do tipo ${tipo}:`, error);
        return [];
    }
}

/**
 * Obtém produtos filtrados por marca
 * @param {string} marca - Nome da marca
 * @returns {Promise<Array>} Array de produtos da marca especificada
 */
async function obterProdutosPorMarca(marca) {
    try {
        const produtos = await obterTodosProdutos();
        return produtos.filter(produto => produto.marca?.toLowerCase() === marca.toLowerCase());
    } catch (error) {
        console.error(`Erro ao obter produtos da marca ${marca}:`, error);
        return [];
    }
}

/**
 * Obtém produtos dentro de uma faixa de preço
 * @param {number} min - Preço mínimo
 * @param {number} max - Preço máximo
 * @returns {Promise<Array>} Array de produtos dentro da faixa de preço
 */
async function obterProdutosPorPreco(min, max) {
    try {
        const produtos = await obterTodosProdutos();
        return produtos.filter(produto => {
            const preco = parseFloat(produto.preco);
            return preco >= min && preco <= max;
        });
    } catch (error) {
        console.error('Erro ao obter produtos por preço:', error);
        return [];
    }
}

/**
 * Obtém um produto específico pelo ID
 * @param {number} id - ID do produto
 * @returns {Promise<Object>} Produto encontrado ou null
 */
async function obterProduto(id) {
    try {
        return await GoogleSheetsDB.obterPorId(id);
    } catch (error) {
        console.error(`Erro ao obter produto ${id}:`, error);
        return null;
    }
}

/**
 * Obtém todos os tipos de produtos disponíveis
 * @returns {Promise<Array>} Array com tipos únicos de produtos
 */
async function obterTiposDisponiveis() {
    try {
        const produtos = await obterTodosProdutos();
        const tipos = new Set(produtos.map(produto => produto.tipo.toLowerCase()));
        return Array.from(tipos);
    } catch (error) {
        console.error('Erro ao obter tipos disponíveis:', error);
        return [];
    }
}

/**
 * Obtém todas as marcas disponíveis
 * @returns {Promise<Array>} Array com marcas únicas
 */
async function obterMarcasDisponiveis() {
    try {
        const produtos = await obterTodosProdutos();
        const marcas = new Set(produtos.map(produto => produto.marca).filter(Boolean));
        return Array.from(marcas);
    } catch (error) {
        console.error('Erro ao obter marcas disponíveis:', error);
        return [];
    }
}

// Função para criar o card de produto (igual do index.html)
function createProductCard(produto) {
  return `
    <div class="product-card">
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
            `Tamanho: ${produto.especificacoes.tamanho} • Material: ${produto.especificacoes.material} • ${produto.especificacoes.tipo}` :
          produto.tipo === 'monitor' ?
            `Tamanho: ${produto.especificacoes.tamanho} • Resolução: ${produto.especificacoes.resolucao} • ${produto.especificacoes.taxaAtualizacao}` :
          produto.tipo === 'webcam' ?
            `Resolução: ${produto.especificacoes.resolucao} • FPS: ${produto.especificacoes.fps} • ${produto.especificacoes.microfone}` :
            ''}
        </p>
        <div class="product-price">R$ ${produto.preco.toFixed(2)}</div>
        <div class="product-buttons">
          <button class="btn-compare" onclick="window.location.href='compare.html?id=${produto.id}'">Comparar</button>
          <a href="product.html?id=${produto.id}" class="btn-shop">Detalhes</a>
        </div>
      </div>
    </div>
  `;
}

// Exibir itens similares na tela de detalhes
async function carregarItensSimilares(produtoAtual) {
  if (!produtoAtual || !produtoAtual.tipo) return;
  const todos = await obterProdutosPorTipo(produtoAtual.tipo);
  // Excluir o próprio produto
  const similares = todos.filter(p => p.id !== produtoAtual.id).slice(0, 4);
  const container = document.getElementById('related-products');
  if (!container) return;
  if (similares.length === 0) {
    container.innerHTML = '<p class="no-products">Nenhum item similar encontrado.</p>';
    return;
  }
  container.innerHTML = similares.map(createProductCard).join('');
} 
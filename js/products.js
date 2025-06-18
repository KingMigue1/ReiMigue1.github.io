/**
 * Gerenciamento de Produtos
 * Este arquivo contém funções para manipulação e filtragem de produtos,
 * utilizando o GoogleSheetsDB como fonte de dados.
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
    webcam: []
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
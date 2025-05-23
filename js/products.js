// Função para obter todos os produtos da planilha Google Sheets
async function obterTodosProdutos() {
    try {
        return await GoogleSheetsDB.listarTodos();
    } catch (error) {
        console.error('Erro ao obter produtos:', error);
        return [];
    }
}

// Base de dados de produtos organizada por tipo
const produtosPorTipo = {
    mouse: [],
    teclado: [],
    headset: [],
    mousepad: [],
    monitor: [],
    webcam: []
};

// Função para obter produtos por tipo
async function obterProdutosPorTipo(tipo) {
    try {
        return await ProdutoDB.buscarPorTipo(tipo);
    } catch (error) {
        console.error(`Erro ao obter produtos do tipo ${tipo}:`, error);
        return [];
    }
}

// Função para obter produtos por marca
async function obterProdutosPorMarca(marca) {
    try {
        return await ProdutoDB.buscarPorMarca(marca);
    } catch (error) {
        console.error(`Erro ao obter produtos da marca ${marca}:`, error);
        return [];
    }
}

// Função para obter produtos por faixa de preço
async function obterProdutosPorPreco(min, max) {
    try {
        return await ProdutoDB.buscarPorPreco(min, max);
    } catch (error) {
        console.error('Erro ao obter produtos por preço:', error);
        return [];
    }
}

// Função para obter um produto específico
async function obterProduto(id) {
    try {
        return await ProdutoDB.buscarPorId(id);
    } catch (error) {
        console.error(`Erro ao obter produto ${id}:`, error);
        return null;
    }
}

// Função para obter tipos de produtos disponíveis
function obterTiposDisponiveis() {
    return Object.keys(produtosPorTipo);
}

// Função para obter marcas disponíveis
function obterMarcasDisponiveis() {
    const marcas = new Set();
    obterTodosProdutos().forEach(produto => marcas.add(produto.marca));
    return Array.from(marcas);
} 
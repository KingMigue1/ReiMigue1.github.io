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

// Função para obter produtos por tipo (usada nas categorias da home)
async function obterProdutosPorTipo(tipo) {
    try {
        const produtos = await obterTodosProdutos();
        return produtos.filter(produto => produto.tipo.toLowerCase() === tipo.toLowerCase());
    } catch (error) {
        console.error(`Erro ao obter produtos do tipo ${tipo}:`, error);
        return [];
    }
}

// Função para obter produtos por marca
async function obterProdutosPorMarca(marca) {
    try {
        const produtos = await obterTodosProdutos();
        return produtos.filter(produto => produto.marca?.toLowerCase() === marca.toLowerCase());
    } catch (error) {
        console.error(`Erro ao obter produtos da marca ${marca}:`, error);
        return [];
    }
}

// Função para obter produtos por faixa de preço
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

// Função para obter um produto específico
async function obterProduto(id) {
    try {
        return await GoogleSheetsDB.obterPorId(id);
    } catch (error) {
        console.error(`Erro ao obter produto ${id}:`, error);
        return null;
    }
}

// Função para obter tipos de produtos disponíveis
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

// Função para obter marcas disponíveis
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
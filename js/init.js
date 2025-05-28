// Inicialização do banco de dados
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Inicializar o banco de dados
        await initDB();
        console.log('Banco de dados inicializado com sucesso');

        // Carregar o tema
        loadTheme();

        // Popular dados iniciais se necessário
        await populateInitialData();

        // Carregar produtos para o carrossel
        const produtos = await obterTodosProdutos();
        if (produtos && produtos.length > 0) {
            console.log(`${produtos.length} produtos carregados com sucesso`);
        } else {
            console.log('Nenhum produto encontrado no banco de dados');
        }
    } catch (error) {
        console.error('Erro durante a inicialização:', error);
    }
}); 
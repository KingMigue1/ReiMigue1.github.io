// Função para inicializar a página
document.addEventListener('DOMContentLoaded', () => {
    // Adicionar event listeners para os botões de comparar
    document.querySelectorAll('.btn-compare').forEach(button => {
        button.addEventListener('click', () => {
            window.location.href = 'compare.html';
        });
    });

    // Adicionar event listeners para os botões de ver na loja
    document.querySelectorAll('.btn-shop').forEach(button => {
        button.addEventListener('click', () => {
            // Aqui você pode adicionar a lógica para abrir a loja
            // Por enquanto, apenas mostra um alerta
            alert('Funcionalidade em desenvolvimento');
        });
    });
}); 
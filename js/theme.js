/**
 * Sistema de Gerenciamento de Tema (Claro/Escuro)
 * Este arquivo gerencia a alternância entre os temas claro e escuro do site,
 * salvando a preferência do usuário no localStorage.
 */

/**
 * Alterna entre os temas claro e escuro
 * - Atualiza as classes CSS do body
 * - Atualiza os ícones dos botões de tema
 * - Salva a preferência no localStorage
 */
function toggleTheme() {
    const body = document.body;
    const themeToggles = document.querySelectorAll('.theme-toggle i');
    
    if (body.classList.contains('dark-theme')) {
        body.classList.remove('dark-theme');
        themeToggles.forEach(toggle => {
            toggle.classList.remove('fa-sun');
            toggle.classList.add('fa-moon');
        });
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.add('dark-theme');
        themeToggles.forEach(toggle => {
            toggle.classList.remove('fa-moon');
            toggle.classList.add('fa-sun');
        });
        localStorage.setItem('theme', 'dark');
    }
}

/**
 * Carrega o tema salvo anteriormente pelo usuário
 * - Verifica o localStorage por uma preferência salva
 * - Aplica o tema apropriado
 * - Atualiza os ícones dos botões de tema
 */
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    const themeToggles = document.querySelectorAll('.theme-toggle i');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggles.forEach(toggle => {
            toggle.classList.remove('fa-moon');
            toggle.classList.add('fa-sun');
        });
    } else {
        document.body.classList.remove('dark-theme');
        themeToggles.forEach(toggle => {
            toggle.classList.remove('fa-sun');
            toggle.classList.add('fa-moon');
        });
    }
}

// Carrega o tema quando a página é carregada
document.addEventListener('DOMContentLoaded', loadTheme); 
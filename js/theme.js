// Função para alternar entre tema claro e escuro
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

// Função para carregar o tema salvo
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

// Carregar tema quando a página carregar
document.addEventListener('DOMContentLoaded', loadTheme); 
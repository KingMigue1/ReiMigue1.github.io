# OPTO Review

OPTO Review é uma plataforma web moderna para análise e comparação de periféricos gamers, oferecendo uma interface intuitiva e recursos avançados para ajudar usuários a escolher os melhores equipamentos para suas necessidades.

## 🌟 Destaques

- Interface moderna e responsiva
- Sistema de busca avançada com filtros
- Comparador de produtos em tempo real
- Tema claro/escuro
- Integração com Google Sheets para armazenamento de dados
- Design otimizado para dispositivos móveis

## 🚀 Funcionalidades

### 1. Catálogo de Produtos
- Visualização de produtos por categoria:
  - Mouse
  - Teclado
  - Headset
  - Mousepad
  - Monitor
  - Webcam
- Carrossel de produtos em destaque
- Exibição detalhada de especificações técnicas
- Imagens de alta qualidade

### 2. Sistema de Busca Avançada
- Busca em tempo real por nome e marca
- Filtros múltiplos:
  - Tipo de produto
  - Marca
  - Faixa de preço
- Resultados instantâneos
- Contador de produtos encontrados

### 3. Comparador de Produtos
- Comparação lado a lado
- Análise detalhada de especificações
- Interface intuitiva
- Seleção rápida de produtos

### 4. Recursos de Interface
- Tema claro/escuro automático
- Design responsivo para todos os dispositivos
- Menu mobile otimizado
- Animações suaves
- Feedback visual em interações

## 🛠️ Tecnologias

### Frontend
- HTML5
- CSS3 (Flexbox e Grid)
- JavaScript (ES6+)
- Font Awesome 6.0.0
- Google Fonts (Inter)

### Backend
- Google Sheets API
- JavaScript puro
- Cache local para performance

## 📁 Estrutura do Projeto

```
OPTO Review/
├── index.html          # Página inicial
├── search.html         # Página de busca
├── compare.html        # Página de comparação
├── about.html          # Página sobre
├── css/
│   ├── style.css      # Estilos globais
│   ├── search.css     # Estilos da busca
│   └── compare.css    # Estilos da comparação
└── js/
    ├── theme.js       # Gerenciamento de tema
    ├── googleSheetsDB.js # Integração com Google Sheets
    └── products.js    # Manipulação de produtos
```

## 📄 Descrição dos Arquivos

### Arquivos HTML
- `index.html`: Página inicial com carrossel de produtos em destaque e categorias
- `search.html`: Página de busca com filtros avançados e resultados em tempo real
- `compare.html`: Página de comparação de produtos lado a lado
- `about.html`: Página com informações sobre o projeto

### Arquivos CSS
- `style.css`: Estilos globais, layout base e componentes comuns
- `search.css`: Estilos específicos para a página de busca e cards de produtos
- `compare.css`: Estilos para a página de comparação e tabelas de especificações

### Arquivos JavaScript
- `theme.js`: 
  - Gerencia o sistema de tema claro/escuro
  - Implementa a alternância entre temas
  - Salva a preferência do usuário no localStorage
  - Controla os ícones do botão de tema

- `googleSheetsDB.js`:
  - Implementa a integração com Google Sheets como banco de dados
  - Fornece operações CRUD completas (Create, Read, Update, Delete)
  - Gerencia a comunicação com a API do Google Sheets
  - Trata erros e validações de dados

- `products.js`:
  - Contém funções para manipulação de produtos
  - Implementa filtros por tipo, marca e preço
  - Fornece funções utilitárias para obter informações sobre produtos
  - Gerencia o cache local de produtos

- `search.js`:
  - Implementa o sistema de busca e filtragem
  - Gerencia a exibição dos resultados na interface
  - Controla os filtros e a limpeza dos mesmos
  - Atualiza a contagem de resultados em tempo real

## 🔧 Configuração

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/SitePerifericos.git
cd SitePerifericos
```

2. Configure o Google Sheets API:
   - Crie um projeto no [Google Cloud Console](https://console.cloud.google.com)
   - Ative a Google Sheets API
   - Crie credenciais de serviço
   - Configure as credenciais no arquivo `js/googleSheetsDB.js`

3. Inicie o projeto:
   - Use um servidor web local (como Live Server no VS Code)
   - Ou hospede em um servidor de sua preferência

## 💻 Uso

### Busca de Produtos
1. Acesse a página de busca
2. Use a barra de busca para encontrar produtos
3. Aplique filtros conforme necessário
4. Visualize os resultados em tempo real

### Comparação de Produtos
1. Selecione produtos para comparar
2. Visualize as especificações lado a lado
3. Compare preços e características
4. Tome sua decisão de compra

## 🤝 Contribuindo

1. Faça um Fork do projeto
2. Crie uma Branch para sua Feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📧 Contato

Seu Nome - [@seu_twitter](https://twitter.com/seu_twitter) - email@exemplo.com

Link do Projeto: [https://github.com/seu-usuario/SitePerifericos](https://github.com/seu-usuario/SitePerifericos) 
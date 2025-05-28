# OPTO Review

OPTO Review é um site para consulta, comparação e análise de periféricos gamers, com integração ao Google Sheets para gerenciamento dos produtos.

## Funcionalidades

- **Página Inicial:**
  - Destaques e categorias de produtos (mouses, teclados, headsets, etc.)
  - Botão "Ver Todos" para cada categoria, já filtrando na busca
  - Carrossel de produtos recentes

- **Busca de Produtos:**
  - Filtros por tipo, marca e faixa de preço
  - Busca por nome
  - Resultados exibidos em cards padronizados
  - Botões "Detalhes" e "Comparar" em cada card

- **Página de Detalhes do Produto:**
  - Exibe todas as informações do produto (nome, imagem, preço, especificações, link para loja)
  - Botão azul de voltar no canto superior esquerdo do card
  - Botões "Visitar a loja" e "Comparar"
  - Seção "Produtos Similares" abaixo do card, mostrando outros produtos do mesmo tipo

- **Página de Comparação:**
  - Permite comparar dois produtos lado a lado
  - Pré-seleção automática ao clicar em "Comparar" em qualquer card

- **Administração:**
  - Integração com Google Sheets para listar, adicionar, editar e excluir produtos

## Tecnologias Utilizadas
- HTML5, CSS3 (responsivo e moderno)
- JavaScript (ES6+)
- Google Sheets API (como banco de dados)
- Font Awesome para ícones
- Google Fonts (Inter)

## Instalação e Uso

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/seu-repo.git
   cd seu-repo
   ```

2. **Configuração da API do Google Sheets:**
   - Crie um projeto no [Google Cloud Console](https://console.cloud.google.com/)
   - Ative a Google Sheets API
   - Crie uma chave de API e substitua no arquivo `js/googleSheetsDB.js`
   - Configure o ID da planilha e o nome da aba conforme seu Google Sheets

3. **Abra o arquivo `index.html` em seu navegador.**

## Estrutura de Arquivos
- `index.html` — Página inicial
- `search.html` — Busca e filtros
- `product.html` — Detalhes do produto
- `compare.html` — Comparação de produtos
- `admin.html` — Administração (CRUD)
- `js/` — Scripts JavaScript
- `css/` — Estilos CSS

## Personalização
- Para adicionar novos tipos de produtos, basta atualizar a planilha e os filtros no HTML.
- O layout é responsivo e pode ser customizado via CSS.

## Licença
MIT

## 🤝 Contribuindo

1. Faça um Fork do projeto
2. Crie uma Branch para sua Feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📧 Contato

- Email: contato@optoreview.com
- Website: [www.optoreview.com](http://www.optoreview.com)

## 🙏 Agradecimentos

- Equipe de desenvolvimento
- Contribuidores
- Comunidade de usuários 
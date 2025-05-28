# OPTO Review

OPTO Review é uma plataforma web moderna para análise e comparação de periféricos gamers, oferecendo uma interface intuitiva e recursos avançados para ajudar usuários a escolher os melhores equipamentos para suas necessidades.

## 🚀 Funcionalidades

### 1. Catálogo de Produtos
- Visualização de produtos por categoria (Mouse, Teclado, Headset, Mousepad, Monitor, Webcam)
- Carrossel de produtos em destaque na página inicial
- Exibição detalhada de especificações técnicas

### 2. Sistema de Busca Avançada
- Busca por nome e marca
- Filtros por tipo de produto
- Filtro por faixa de preço
- Resultados em tempo real

### 3. Comparador de Produtos
- Comparação lado a lado de dois produtos
- Análise detalhada de especificações técnicas
- Interface intuitiva para seleção de produtos

### 4. Painel Administrativo
- Gerenciamento completo de produtos
- Adição, edição e remoção de produtos
- Interface amigável para administradores

### 5. Recursos Adicionais
- Tema claro/escuro
- Design responsivo
- Interface moderna e intuitiva
- Integração com Google Sheets para armazenamento de dados

## 🛠️ Tecnologias Utilizadas

- **Frontend:**
  - HTML5
  - CSS3
  - JavaScript (ES6+)
  - Font Awesome (ícones)
  - Google Fonts (Inter)

- **Backend:**
  - Google Sheets API (armazenamento de dados)
  - JavaScript puro para manipulação de dados

## 💾 Integração com Banco de Dados

### Google Sheets como Backend
O OPTO Review utiliza o Google Sheets como solução de banco de dados, oferecendo uma abordagem inovadora e eficiente para armazenamento de dados.

#### Estrutura do Banco
```
Produtos/
├── ID (Auto-incremento)
├── Nome
├── Tipo (Mouse, Teclado, Headset, etc.)
├── Preço
├── Imagem (URL)
├── URL do Produto
└── Especificações (JSON)
    ├── Mouse
    │   ├── Sensor
    │   ├── Peso
    │   ├── DPI
    │   └── Tipo (Com/Sem fio)
    ├── Teclado
    │   ├── Switch
    │   ├── Iluminação
    │   └── Tipo (Mecânico/Membrana)
    └── ... (outras especificações por tipo)
```

#### Funcionalidades da API
- **CRUD Completo**
  - Create: Adição de novos produtos
  - Read: Busca e listagem de produtos
  - Update: Atualização de informações
  - Delete: Remoção de produtos

- **Operações Principais**
  ```javascript
  // Exemplo de uso da API
  const db = new GoogleSheetsDB();
  
  // Listar todos os produtos
  const produtos = await db.listarTodos();
  
  // Buscar produto por ID
  const produto = await db.obterPorId(1);
  
  // Adicionar novo produto
  await db.adicionar({
    nome: "Mouse Gamer X",
    tipo: "mouse",
    preco: 299.90,
    // ... outras propriedades
  });
  
  // Atualizar produto
  await db.atualizar({
    id: 1,
    preco: 249.90
  });
  
  // Excluir produto
  await db.excluir(1);
  ```

#### Vantagens da Implementação
1. **Simplicidade**
   - Sem necessidade de servidor dedicado
   - Fácil manutenção e backup
   - Interface familiar do Google Sheets

2. **Performance**
   - Cache local para consultas frequentes
   - Atualizações em tempo real
   - Baixa latência

3. **Segurança**
   - Autenticação via Google Cloud
   - Controle de acesso granular
   - Backup automático

4. **Escalabilidade**
   - Suporte a grandes volumes de dados
   - Fácil exportação e importação
   - Integração com outras ferramentas Google

#### Configuração do Ambiente
1. **Google Cloud Console**
   ```bash
   # Habilitar APIs necessárias
   - Google Sheets API
   - Google Drive API
   ```

2. **Credenciais**
   ```javascript
   // googleSheetsDB.js
   const config = {
     apiKey: 'YOUR_API_KEY',
     spreadsheetId: 'YOUR_SPREADSHEET_ID',
     sheetName: 'Produtos'
   };
   ```

3. **Permissões**
   - Configurar acesso de leitura/escrita
   - Definir escopo das APIs
   - Gerenciar quotas e limites

## 📁 Estrutura do Projeto

```
OPTO Review/
├── index.html          # Página inicial
├── search.html         # Página de busca
├── compare.html        # Página de comparação
├── about.html          # Página sobre
├── admin.html          # Painel administrativo
├── css/               # Estilos
│   ├── style.css      # Estilos globais
│   ├── admin.css      # Estilos do painel admin
│   ├── search.css     # Estilos da página de busca
│   └── compare.css    # Estilos da página de comparação
└── js/                # Scripts
    ├── admin.js       # Lógica do painel admin
    ├── compare.js     # Lógica de comparação
    ├── products.js    # Manipulação de produtos
    ├── search.js      # Lógica de busca
    ├── theme.js       # Gerenciamento de tema
    └── googleSheetsDB.js # Integração com Google Sheets
```

## 🔧 Configuração

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITÓRIO]
```

2. Configure o Google Sheets API:
   - Crie um projeto no Google Cloud Console
   - Ative a Google Sheets API
   - Crie credenciais de serviço
   - Configure as credenciais no arquivo `js/googleSheetsDB.js`

3. Abra o projeto em um servidor web local ou hospede em um servidor de sua preferência.

## 💻 Uso

### Usuários
- Navegue pela página inicial para ver produtos em destaque
- Use a barra de busca para encontrar produtos específicos
- Compare produtos na página de comparação
- Explore as categorias de produtos

### Administradores
- Acesse o painel administrativo
- Gerencie produtos (adicionar, editar, remover)
- Visualize e organize o catálogo de produtos

## 🤝 Contribuindo

1. Faça um Fork do projeto
2. Crie uma Branch para sua Feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📧 Contato

- Email: contato@optoreview.com
- Website: [www.optoreview.com](http://www.optoreview.com)

## 🙏 Agradecimentos

- Equipe de desenvolvimento
- Contribuidores
- Comunidade de usuários 
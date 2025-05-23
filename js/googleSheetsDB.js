// Configuração da Planilha
const SPREADSHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTt8hpQvfNU47L0oigLJjoWXgWFp4gW3WZiuFMBgbr29YwL2BxP5yAzhpwcLxuGaIN_RlJRqbsEl1Dt/pubhtml';

class GoogleSheetsDB {
    static async listarTodos() {
        try {
            const response = await fetch(SPREADSHEET_URL);
            const html = await response.text();
            
            // Criar um elemento temporário para parsear o HTML
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            // Encontrar a tabela na página
            const table = doc.querySelector('table');
            if (!table) {
                throw new Error('Tabela não encontrada na planilha');
            }

            // Converter as linhas da tabela em produtos
            const rows = Array.from(table.querySelectorAll('tr')).slice(1); // Pular o cabeçalho
            return rows.map((row, index) => {
                const cells = Array.from(row.querySelectorAll('td'));
                return {
                    id: index + 1,
                    nome: cells[1]?.textContent || '',
                    tipo: cells[2]?.textContent || '',
                    preco: parseFloat(cells[3]?.textContent || '0'),
                    imagem: cells[4]?.textContent || '',
                    urlProduto: cells[5]?.textContent || '',
                    especificacoes: JSON.parse(cells[6]?.textContent || '{}')
                };
            });
        } catch (error) {
            console.error('Erro ao listar produtos:', error);
            throw new Error('Erro ao carregar produtos da planilha');
        }
    }

    static async adicionar(produto) {
        alert('Para adicionar produtos, por favor, edite diretamente na planilha do Google Sheets.');
        throw new Error('Adição de produtos não suportada via URL pública');
    }

    static async atualizar(produto) {
        alert('Para atualizar produtos, por favor, edite diretamente na planilha do Google Sheets.');
        throw new Error('Atualização de produtos não suportada via URL pública');
    }

    static async excluir(id) {
        alert('Para excluir produtos, por favor, edite diretamente na planilha do Google Sheets.');
        throw new Error('Exclusão de produtos não suportada via URL pública');
    }
} 
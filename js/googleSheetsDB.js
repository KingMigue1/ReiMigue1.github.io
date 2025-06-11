// Configuração da Planilha
const SPREADSHEET_ID = '1yD91Fb6oChOO3Tpb8XSFJjGf2ELeD0F8FLC5ONtljME';
// Para configurar a API_KEY:
// 1. Acesse https://console.cloud.google.com/
// 2. Crie um novo projeto
// 3. Ative a Google Sheets API
// 4. Crie uma chave de API em "Credenciais"
// 5. Substitua 'YOUR_API_KEY' abaixo pela sua chave
const API_KEY = 'AIzaSyAJElrtiVMn234BFQAMhGY1ARUH9G-xHxs';
const SHEET_NAME = 'Produtos';

class GoogleSheetsDB {
    static async listarTodos() {
        try {
            const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`);
            const data = await response.json();
            
            if (!data.values) {
                throw new Error('Dados não encontrados na planilha');
            }

            // Converter as linhas em produtos (pular o cabeçalho)
            return data.values.slice(1).map((row, index) => ({
                id: index + 1,
                nome: row[1] || '',
                tipo: row[2] || '',
                preco: parseFloat(row[3] || '0'),
                imagem: row[4] || '',
                urlProduto: row[5] || '',
                especificacoes: JSON.parse(row[6] || '{}')
            }));
        } catch (error) {
            console.error('Erro ao listar produtos:', error);
            throw new Error('Erro ao carregar produtos da planilha');
        }
    }

    static async obterPorId(id) {
        try {
            const produtos = await this.listarTodos();
            return produtos.find(p => p.id === parseInt(id));
        } catch (error) {
            console.error('Erro ao obter produto:', error);
            throw new Error('Erro ao buscar produto');
        }
    }

    static async adicionar(produto) {
        try {
            const values = [
                produto.id,
                produto.nome,
                produto.tipo,
                produto.preco.toString(),
                produto.imagem,
                produto.urlProduto,
                JSON.stringify(produto.especificacoes)
            ];

            const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}!A:G:append?valueInputOption=USER_ENTERED&key=${API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    values: [values]
                })
            });

            if (!response.ok) {
                throw new Error('Erro ao adicionar produto');
            }

            return true;
        } catch (error) {
            console.error('Erro ao adicionar produto:', error);
            throw new Error('Erro ao adicionar produto na planilha');
        }
    }

    static async atualizar(produto) {
        try {
            const values = [
                produto.id,
                produto.nome,
                produto.tipo,
                produto.preco.toString(),
                produto.imagem,
                produto.urlProduto,
                JSON.stringify(produto.especificacoes)
            ];

            const range = `${SHEET_NAME}!A${produto.id + 1}:G${produto.id + 1}`;
            const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}?valueInputOption=USER_ENTERED&key=${API_KEY}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    values: [values]
                })
            });

            if (!response.ok) {
                throw new Error('Erro ao atualizar produto');
            }

            return true;
        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
            throw new Error('Erro ao atualizar produto na planilha');
        }
    }

    static async excluir(id) {
        try {
            // Para excluir, vamos limpar os valores da linha
            const range = `${SHEET_NAME}!A${id + 1}:G${id + 1}`;
            const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}?key=${API_KEY}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    values: [Array(7).fill('')]
                })
            });

            if (!response.ok) {
                throw new Error('Erro ao excluir produto');
            }

            return true;
        } catch (error) {
            console.error('Erro ao excluir produto:', error);
            throw new Error('Erro ao excluir produto da planilha');
        }
    }
} 
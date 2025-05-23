// Configuração da API do Google Sheets
const SPREADSHEET_ID = '2PACX-1vTt8hpQvfNU47L0oigLJjoWXgWFp4gW3WZiuFMBgbr29YwL2BxP5yAzhpwcLxuGaIN_RlJRqbsEl1Dt';
const API_KEY = ''; // Você precisará preencher com sua chave de API do Google

class GoogleSheetsDB {
    static async listarTodos() {
        try {
            const response = await fetch(
                `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/Página1!A2:Z`,
                {
                    headers: {
                        'Authorization': `Bearer ${API_KEY}`
                    }
                }
            );
            const data = await response.json();
            return this._converterParaProdutos(data.values || []);
        } catch (error) {
            console.error('Erro ao listar produtos:', error);
            throw error;
        }
    }

    static async adicionar(produto) {
        try {
            const valores = this._converterParaValores(produto);
            const response = await fetch(
                `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/Página1!A:Z:append?valueInputOption=USER_ENTERED`,
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${API_KEY}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        values: [valores]
                    })
                }
            );
            return await response.json();
        } catch (error) {
            console.error('Erro ao adicionar produto:', error);
            throw error;
        }
    }

    static async atualizar(produto) {
        try {
            const valores = this._converterParaValores(produto);
            const response = await fetch(
                `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/Página1!A${produto.id + 1}:Z${produto.id + 1}?valueInputOption=USER_ENTERED`,
                {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${API_KEY}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        values: [valores]
                    })
                }
            );
            return await response.json();
        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
            throw error;
        }
    }

    static async excluir(id) {
        try {
            const response = await fetch(
                `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/Página1!A${id + 1}:Z${id + 1}:clear`,
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${API_KEY}`
                    }
                }
            );
            return await response.json();
        } catch (error) {
            console.error('Erro ao excluir produto:', error);
            throw error;
        }
    }

    // Métodos auxiliares
    static _converterParaProdutos(valores) {
        return valores.map((linha, index) => ({
            id: index + 1,
            nome: linha[1],
            tipo: linha[2],
            preco: parseFloat(linha[3]),
            imagem: linha[4],
            urlProduto: linha[5],
            especificacoes: JSON.parse(linha[6] || '{}')
        }));
    }

    static _converterParaValores(produto) {
        return [
            produto.id.toString(),
            produto.nome,
            produto.tipo,
            produto.preco.toString(),
            produto.imagem,
            produto.urlProduto,
            JSON.stringify(produto.especificacoes)
        ];
    }
} 
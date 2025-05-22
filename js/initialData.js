// Dados iniciais para o banco de dados
const initialData = {
    produtos: [
        {
            id: 1,
            nome: "Logitech G Pro X Superlight",
            tipo: "mouse",
            marca: "Logitech",
            preco: 799.90,
            imagem: "https://m.media-amazon.com/images/I/61UxfXTUyvL._AC_SL1500_.jpg",
            urlProduto: "https://www.amazon.com.br/Logitech-Superlight-Ultra-leve-Bateria-Recarregável/dp/B08L5TNJHG",
            especificacoes: {
                sensor: "HERO 25K",
                peso: 63,
                tipo: "Gaming"
            }
        },
        {
            id: 2,
            nome: "HyperX Alloy Origins Core",
            tipo: "teclado",
            marca: "HyperX",
            preco: 599.90,
            imagem: "https://m.media-amazon.com/images/I/71+Q6Rh3KIL._AC_SL1500_.jpg",
            urlProduto: "https://www.amazon.com.br/HyperX-Alloy-Origins-Core-Teclado/dp/B07ZPKN6YR",
            especificacoes: {
                switch: "HyperX Red",
                iluminacao: "RGB",
                tipo: "Mecânico"
            }
        },
        {
            id: 3,
            nome: "SteelSeries Arctis Pro",
            tipo: "headset",
            marca: "SteelSeries",
            preco: 1299.90,
            imagem: "https://m.media-amazon.com/images/I/71+Q6Rh3KIL._AC_SL1500_.jpg",
            urlProduto: "https://www.amazon.com.br/SteelSeries-Arctis-Pro-GameDAC-Headset/dp/B07C4YKRVL",
            especificacoes: {
                driver: "40mm",
                microfone: "Com Microfone",
                tipo: "Gaming"
            }
        },
        {
            id: 4,
            nome: "SteelSeries QcK",
            tipo: "mousepad",
            marca: "SteelSeries",
            preco: 99.90,
            imagem: "https://m.media-amazon.com/images/I/71+Q6Rh3KIL._AC_SL1500_.jpg",
            urlProduto: "https://www.amazon.com.br/SteelSeries-QcK-Mousepad-Gaming/dp/B000UVRU6Y",
            especificacoes: {
                tamanho: "Large",
                material: "Tecido",
                tipo: "Speed"
            }
        },
        {
            id: 5,
            nome: "LG 27GL850-B",
            tipo: "monitor",
            marca: "LG",
            preco: 2499.90,
            imagem: "https://m.media-amazon.com/images/I/71+Q6Rh3KIL._AC_SL1500_.jpg",
            urlProduto: "https://www.amazon.com.br/LG-27GL850-B-Monitor-Gaming-27GL850/dp/B07TQJ2ZKN",
            especificacoes: {
                tamanho: "27",
                resolucao: "2560x1440",
                taxaAtualizacao: "144Hz"
            }
        },
        {
            id: 6,
            nome: "Logitech C920",
            tipo: "webcam",
            marca: "Logitech",
            preco: 399.90,
            imagem: "https://m.media-amazon.com/images/I/71+Q6Rh3KIL._AC_SL1500_.jpg",
            urlProduto: "https://www.amazon.com.br/Logitech-C920-HD-Pro-Webcam/dp/B006A2Q81M",
            especificacoes: {
                resolucao: "1080p",
                fps: 30,
                microfone: "Com Microfone"
            }
        }
    ]
};

// Função para inicializar o banco de dados com os dados iniciais
async function initializeDatabase() {
    try {
        // Verifica se já existem produtos no banco
        const produtos = await ProdutoDB.listarTodos();
        
        // Se não houver produtos, insere os dados iniciais
        if (produtos.length === 0) {
            for (const produto of initialData.produtos) {
                await ProdutoDB.adicionar(produto);
            }
            console.log('Banco de dados inicializado com sucesso!');
        }
    } catch (error) {
        console.error('Erro ao inicializar banco de dados:', error);
    }
}

// Exporta a função de inicialização
window.initializeDatabase = initializeDatabase; 
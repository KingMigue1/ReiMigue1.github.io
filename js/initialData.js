// Dados iniciais para popular o banco de dados
const initialProducts = [
    {
        nome: "Logitech G Pro X Superlight",
        tipo: "mouse",
        marca: "Logitech",
        preco: 799.90,
        imagem: "https://m.media-amazon.com/images/I/61UxfXTUyvL._AC_SL1500_.jpg",
        urlProduto: "https://www.amazon.com.br/Logitech-Superlight-Sem-Fio-Ultra-Leve/dp/B08L5TNJHG",
        especificacoes: {
            sensor: "HERO 25K",
            peso: 63,
            tipo: "Sem fio"
        }
    },
    {
        nome: "Razer BlackWidow V3",
        tipo: "teclado",
        marca: "Razer",
        preco: 899.90,
        imagem: "https://m.media-amazon.com/images/I/71UwSHSZRnS._AC_SL1500_.jpg",
        urlProduto: "https://www.amazon.com.br/Razer-BlackWidow-V3-Mechanical-Keyboard/dp/B08F5VQF45",
        especificacoes: {
            switch: "Razer Green",
            iluminacao: "RGB Chroma",
            tipo: "Mecânico"
        }
    },
    {
        nome: "HyperX Cloud II",
        tipo: "headset",
        marca: "HyperX",
        preco: 499.90,
        imagem: "https://m.media-amazon.com/images/I/71+vQyk43IL._AC_SL1500_.jpg",
        urlProduto: "https://www.amazon.com.br/HyperX-Cloud-Gaming-Headset-PS4/dp/B00SAYCXWG",
        especificacoes: {
            driver: "53mm",
            microfone: "Removível",
            tipo: "Com fio"
        }
    },
    {
        nome: "SteelSeries QcK",
        tipo: "mousepad",
        marca: "SteelSeries",
        preco: 99.90,
        imagem: "https://m.media-amazon.com/images/I/71UwSHSZRnS._AC_SL1500_.jpg",
        urlProduto: "https://www.amazon.com.br/SteelSeries-QcK-Gaming-Mousepad/dp/B000UVRU6G",
        especificacoes: {
            tamanho: "450x400mm",
            material: "Tecido",
            tipo: "Speed"
        }
    },
    {
        nome: "LG UltraGear 27GL650F",
        tipo: "monitor",
        marca: "LG",
        preco: 1499.90,
        imagem: "https://m.media-amazon.com/images/I/81WBbFOi9WL._AC_SL1500_.jpg",
        urlProduto: "https://www.amazon.com.br/LG-UltraGear-Monitor-Gaming-27GL650F/dp/B07ZPKN6YR",
        especificacoes: {
            tamanho: "27 polegadas",
            resolucao: "1920x1080",
            taxaAtualizacao: "144Hz"
        }
    },
    {
        nome: "Logitech C920",
        tipo: "webcam",
        marca: "Logitech",
        preco: 399.90,
        imagem: "https://m.media-amazon.com/images/I/71iNwni9TsL._AC_SL1500_.jpg",
        urlProduto: "https://www.amazon.com.br/Logitech-C920-HD-Pro-Webcam/dp/B006A2Q81M",
        especificacoes: {
            resolucao: "1080p",
            fps: "30",
            microfone: "Estéreo"
        }
    }
];

// Função para popular o banco de dados com dados iniciais
async function populateInitialData() {
    try {
        const produtos = await obterTodosProdutos();
        
        // Só popula se o banco estiver vazio
        if (produtos.length === 0) {
            console.log('Populando banco de dados com produtos iniciais...');
            
            for (const produto of initialProducts) {
                await ProdutoDB.adicionar(produto);
            }
            
            console.log('Banco de dados populado com sucesso!');
        }
    } catch (error) {
        console.error('Erro ao popular banco de dados:', error);
    }
} 
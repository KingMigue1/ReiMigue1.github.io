// Variáveis globais
let editandoProduto = false;

// Funções de Interface
function mostrarFormulario() {
    document.getElementById('productForm').style.display = 'block';
    document.getElementById('formProduto').reset();
    document.getElementById('produtoId').value = '';
    editandoProduto = false;
}

function esconderFormulario() {
    document.getElementById('productForm').style.display = 'none';
}

function cancelarEdicao() {
    esconderFormulario();
}

function atualizarEspecificacoes() {
    const tipo = document.getElementById('tipo').value;
    const container = document.getElementById('especificacoesContainer');
    container.innerHTML = '';

    if (!tipo) return;

    const especificacoes = {
        mouse: [
            { nome: 'sensor', label: 'Sensor' },
            { nome: 'peso', label: 'Peso (g)' },
            { nome: 'dpi', label: 'DPI' },
            { nome: 'tipo', label: 'Tipo (Com/Sem fio)' }
        ],
        teclado: [
            { nome: 'switch', label: 'Switch' },
            { nome: 'iluminacao', label: 'Iluminação' },
            { nome: 'tipo', label: 'Tipo (Mecânico/Membrana)' }
        ],
        headset: [
            { nome: 'driver', label: 'Driver' },
            { nome: 'microfone', label: 'Microfone' },
            { nome: 'tipo', label: 'Tipo (Com/Sem fio)' }
        ],
        mousepad: [
            { nome: 'tamanho', label: 'Tamanho' },
            { nome: 'espessura', label: 'Espessura (mm)' },
            { nome: 'material', label: 'Material' }
        ],
        monitor: [
            { nome: 'resolucao', label: 'Resolução' },
            { nome: 'taxa', label: 'Taxa de Atualização' },
            { nome: 'tamanho', label: 'Tamanho (polegadas)' }
        ],
        webcam: [
            { nome: 'resolucao', label: 'Resolução' },
            { nome: 'fps', label: 'FPS' },
            { nome: 'campo', label: 'Campo de Visão' }
        ]
    };

    especificacoes[tipo].forEach(spec => {
        const div = document.createElement('div');
        div.className = 'form-group';
        div.innerHTML = `
            <label for="${spec.nome}">${spec.label}</label>
            <input type="text" id="${spec.nome}" name="${spec.nome}" required>
        `;
        container.appendChild(div);
    });
}

function obterEspecificacoes() {
    const especificacoes = {};
    const inputs = document.querySelectorAll('#especificacoesContainer input');
    inputs.forEach(input => {
        especificacoes[input.name] = input.value;
    });
    return especificacoes;
}

async function salvarProduto(event) {
    event.preventDefault();
    
    try {
        const nome = document.getElementById('nome').value.trim();
        const tipo = document.getElementById('tipo').value;
        const preco = document.getElementById('preco').value;
        const imagem = document.getElementById('imagem').value.trim();
        const urlProduto = document.getElementById('urlProduto').value.trim();

        if (!nome || !tipo || !preco || !imagem || !urlProduto) {
            alert('Por favor, preencha todos os campos obrigatórios');
            return;
        }

        const especificacoes = obterEspecificacoes();
        if (Object.keys(especificacoes).length === 0) {
            alert('Por favor, preencha as especificações do produto');
            return;
        }

        const produto = {
            id: document.getElementById('produtoId').value ? parseInt(document.getElementById('produtoId').value) : undefined,
            nome,
            tipo,
            preco: parseFloat(preco),
            imagem,
            urlProduto,
            especificacoes
        };

        if (isNaN(produto.preco) || produto.preco <= 0) {
            alert('Por favor, insira um preço válido');
            return;
        }

        try {
            new URL(produto.imagem);
            new URL(produto.urlProduto);
        } catch (e) {
            alert('Por favor, insira URLs válidas para a imagem e o produto');
            return;
        }

        if (editandoProduto) {
            await GoogleSheetsDB.atualizar(produto);
            alert('Produto atualizado com sucesso!');
        } else {
            await GoogleSheetsDB.adicionar(produto);
            alert('Produto adicionado com sucesso!');
        }

        await atualizarTabela();
        esconderFormulario();
    } catch (error) {
        console.error('Erro ao salvar produto:', error);
        alert('Erro ao salvar produto: ' + error.message);
    }
}

async function excluirProduto(id) {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return;

    try {
        await GoogleSheetsDB.excluir(parseInt(id));
        await atualizarTabela();
    } catch (error) {
        console.error('Erro ao excluir produto:', error);
        alert('Erro ao excluir produto');
    }
}

async function atualizarTabela() {
    try {
        const produtos = await GoogleSheetsDB.listarTodos();
        const tbody = document.getElementById('productsTableBody');
        
        tbody.innerHTML = produtos.map(produto => `
            <tr>
                <td>${produto.id}</td>
                <td><img src="${produto.imagem}" alt="${produto.nome}" style="width: 50px; height: 50px; object-fit: contain;"></td>
                <td>${produto.nome}</td>
                <td>${produto.tipo}</td>
                <td>R$ ${produto.preco.toFixed(2)}</td>
                <td>
                    <button class="btn-edit" onclick="editarProduto('${produto.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-delete" onclick="excluirProduto('${produto.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                    <a href="${produto.urlProduto}" target="_blank" class="btn-link">
                        <i class="fas fa-external-link-alt"></i>
                    </a>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Erro ao atualizar tabela:', error);
        alert('Erro ao carregar produtos');
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', async () => {
    try {
        document.getElementById('tipo').addEventListener('change', atualizarEspecificacoes);
        await atualizarTabela();
    } catch (error) {
        console.error('Erro ao inicializar:', error);
        alert('Erro ao inicializar a página');
    }
}); 
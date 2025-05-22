// Variáveis globais
let editandoProduto = false;

// Funções de Utilidade
function formatarPreco(preco) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(preco);
}

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

function preencherEspecificacoes(especificacoes) {
    Object.entries(especificacoes).forEach(([key, value]) => {
        const input = document.getElementById(key);
        if (input) input.value = value;
    });
}

async function editarProduto(id) {
    try {
        const produto = await ProdutoDB.buscarPorId(parseInt(id));
        if (produto) {
            preencherFormulario(produto);
        }
    } catch (error) {
        console.error('Erro ao buscar produto:', error);
        alert('Erro ao carregar produto para edição');
    }
}

async function preencherFormulario(produto) {
    document.getElementById('produtoId').value = produto.id;
    document.getElementById('nome').value = produto.nome;
    document.getElementById('tipo').value = produto.tipo;
    document.getElementById('marca').value = produto.marca;
    document.getElementById('preco').value = produto.preco;
    document.getElementById('imagem').value = produto.imagem;
    document.getElementById('urlProduto').value = produto.urlProduto || '';
    atualizarEspecificacoes(produto.tipo);
    preencherEspecificacoes(produto.especificacoes);

    editandoProduto = true;
    mostrarFormulario();
}

async function salvarProduto(event) {
    event.preventDefault();
    
    try {
        // Validar campos obrigatórios
        const nome = document.getElementById('nome').value.trim();
        const tipo = document.getElementById('tipo').value;
        const marca = document.getElementById('marca').value.trim();
        const preco = document.getElementById('preco').value;
        const imagem = document.getElementById('imagem').value.trim();
        const urlProduto = document.getElementById('urlProduto').value.trim();

        if (!nome || !tipo || !marca || !preco || !imagem || !urlProduto) {
            alert('Por favor, preencha todos os campos obrigatórios');
            return;
        }

        // Validar especificações
        const especificacoes = obterEspecificacoes();
        if (Object.keys(especificacoes).length === 0) {
            alert('Por favor, preencha as especificações do produto');
            return;
        }

        const produto = {
            id: document.getElementById('produtoId').value ? parseInt(document.getElementById('produtoId').value) : undefined,
            nome,
            tipo,
            marca,
            preco: parseFloat(preco),
            imagem,
            urlProduto,
            especificacoes
        };

        // Validar preço
        if (isNaN(produto.preco) || produto.preco <= 0) {
            alert('Por favor, insira um preço válido');
            return;
        }

        // Validar URLs
        try {
            new URL(produto.imagem);
            new URL(produto.urlProduto);
        } catch (e) {
            alert('Por favor, insira URLs válidas para a imagem e o produto');
            return;
        }

        // Salvar no banco de dados
        if (editandoProduto) {
            await ProdutoDB.atualizar(produto);
            alert('Produto atualizado com sucesso!');
        } else {
            await ProdutoDB.adicionar(produto);
            alert('Produto adicionado com sucesso!');
        }

        // Atualizar interface
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
        await ProdutoDB.excluir(parseInt(id));
        await atualizarTabela();
    } catch (error) {
        console.error('Erro ao excluir produto:', error);
        alert('Erro ao excluir produto');
    }
}

async function atualizarTabela() {
    try {
        const produtos = await ProdutoDB.listarTodos();
        const tbody = document.getElementById('productsTableBody');
        
        tbody.innerHTML = produtos.map(produto => `
            <tr>
                <td>${produto.id}</td>
                <td><img src="${produto.imagem}" alt="${produto.nome}" style="width: 50px; height: 50px; object-fit: contain;"></td>
                <td>${produto.nome}</td>
                <td>${produto.tipo}</td>
                <td>${produto.marca}</td>
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
        // Inicializar banco de dados
        await initDB();
        
        // Atualizar especificações quando o tipo mudar
        document.getElementById('tipo').addEventListener('change', atualizarEspecificacoes);

        // Inicializar tabela
        await atualizarTabela();
    } catch (error) {
        console.error('Erro ao inicializar:', error);
        alert('Erro ao inicializar a página');
    }
});

// Função para abrir o modal de edição
function abrirModalEdicao(id) {
    const produto = produtos.find(p => p.id === id);
    if (!produto) return;

    // Preencher o modal com os dados do produto
    document.getElementById('editId').value = produto.id;
    document.getElementById('editNome').value = produto.nome;
    document.getElementById('editTipo').value = produto.tipo;
    document.getElementById('editMarca').value = produto.marca;
    document.getElementById('editPreco').value = produto.preco;
    document.getElementById('editImagem').value = produto.imagem;
    document.getElementById('editUrlProduto').value = produto.urlProduto;

    // Preencher as especificações específicas do tipo
    const especificacoes = produto.especificacoes;
    switch (produto.tipo) {
        case 'mouse':
            document.getElementById('editSensor').value = especificacoes.sensor;
            document.getElementById('editPeso').value = especificacoes.peso;
            document.getElementById('editTipoMouse').value = especificacoes.tipo;
            break;
        case 'teclado':
            document.getElementById('editSwitch').value = especificacoes.switch;
            document.getElementById('editIluminacao').value = especificacoes.iluminacao;
            document.getElementById('editTipoTeclado').value = especificacoes.tipo;
            break;
        case 'headset':
            document.getElementById('editDriver').value = especificacoes.driver;
            document.getElementById('editMicrofone').value = especificacoes.microfone;
            document.getElementById('editTipoHeadset').value = especificacoes.tipo;
            break;
        case 'mousepad':
            document.getElementById('editTamanhoMousepad').value = especificacoes.tamanho;
            document.getElementById('editMaterial').value = especificacoes.material;
            document.getElementById('editTipoMousepad').value = especificacoes.tipo;
            break;
        case 'monitor':
            document.getElementById('editTamanhoMonitor').value = especificacoes.tamanho;
            document.getElementById('editResolucao').value = especificacoes.resolucao;
            document.getElementById('editTaxaAtualizacao').value = especificacoes.taxaAtualizacao;
            break;
        case 'webcam':
            document.getElementById('editResolucaoWebcam').value = especificacoes.resolucao;
            document.getElementById('editFps').value = especificacoes.fps;
            document.getElementById('editMicrofoneWebcam').value = especificacoes.microfone;
            break;
    }

    // Mostrar o modal
    document.getElementById('modalEdicao').style.display = 'block';
}

// Função para fechar o modal de edição
function fecharModalEdicao() {
    document.getElementById('modalEdicao').style.display = 'none';
}

// Função para salvar as alterações
async function salvarAlteracoes() {
    const id = parseInt(document.getElementById('editId').value);
    const produto = produtos.find(p => p.id === id);
    if (!produto) return;

    // Atualizar dados básicos
    produto.nome = document.getElementById('editNome').value;
    produto.tipo = document.getElementById('editTipo').value;
    produto.marca = document.getElementById('editMarca').value;
    produto.preco = parseFloat(document.getElementById('editPreco').value);
    produto.imagem = document.getElementById('editImagem').value;
    produto.urlProduto = document.getElementById('editUrlProduto').value;

    // Atualizar especificações específicas do tipo
    switch (produto.tipo) {
        case 'mouse':
            produto.especificacoes = {
                sensor: document.getElementById('editSensor').value,
                peso: parseInt(document.getElementById('editPeso').value),
                tipo: document.getElementById('editTipoMouse').value
            };
            break;
        case 'teclado':
            produto.especificacoes = {
                switch: document.getElementById('editSwitch').value,
                iluminacao: document.getElementById('editIluminacao').value,
                tipo: document.getElementById('editTipoTeclado').value
            };
            break;
        case 'headset':
            produto.especificacoes = {
                driver: document.getElementById('editDriver').value,
                microfone: document.getElementById('editMicrofone').value,
                tipo: document.getElementById('editTipoHeadset').value
            };
            break;
        case 'mousepad':
            produto.especificacoes = {
                tamanho: document.getElementById('editTamanhoMousepad').value,
                material: document.getElementById('editMaterial').value,
                tipo: document.getElementById('editTipoMousepad').value
            };
            break;
        case 'monitor':
            produto.especificacoes = {
                tamanho: document.getElementById('editTamanhoMonitor').value,
                resolucao: document.getElementById('editResolucao').value,
                taxaAtualizacao: document.getElementById('editTaxaAtualizacao').value
            };
            break;
        case 'webcam':
            produto.especificacoes = {
                resolucao: document.getElementById('editResolucaoWebcam').value,
                fps: parseInt(document.getElementById('editFps').value),
                microfone: document.getElementById('editMicrofoneWebcam').value
            };
            break;
    }

    try {
        await atualizarProduto(produto);
        alert('Produto atualizado com sucesso!');
        fecharModalEdicao();
        carregarProdutos(); // Recarregar a lista de produtos
    } catch (error) {
        console.error('Erro ao atualizar produto:', error);
        alert('Erro ao atualizar produto. Por favor, tente novamente.');
    }
}

// Função para mostrar/esconder campos específicos
function mostrarCamposEspecificos() {
    // Esconder todos os campos específicos
    document.querySelectorAll('.campos-especificos').forEach(campo => {
        campo.style.display = 'none';
    });

    // Mostrar campos do tipo selecionado
    const tipo = document.getElementById('editTipo').value;
    const campos = document.getElementById(`campos${tipo.charAt(0).toUpperCase() + tipo.slice(1)}`);
    if (campos) {
        campos.style.display = 'block';
    }
} 
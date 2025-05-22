// Configuração do banco de dados
const DB_NAME = 'GamerGearStore';
const DB_VERSION = 1;
const STORE_NAME = 'produtos';

// Inicialização do banco de dados
function initDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = (event) => {
            console.error('Erro ao abrir o banco de dados:', event.target.error);
            reject(event.target.error);
        };

        request.onsuccess = (event) => {
            const db = event.target.result;
            resolve(db);
        };

        request.onupgradeneeded = (event) => {
            const db = event.target.result;

            // Criar object store para produtos
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                const store = db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
                
                // Criar índices para busca
                store.createIndex('tipo', 'tipo', { unique: false });
                store.createIndex('marca', 'marca', { unique: false });
                store.createIndex('preco', 'preco', { unique: false });
            }
        };
    });
}

// Funções CRUD para produtos
const ProdutoDB = {
    // Adicionar produto
    async adicionar(produto) {
        try {
            const db = await initDB();
            return new Promise((resolve, reject) => {
                const transaction = db.transaction([STORE_NAME], 'readwrite');
                const store = transaction.objectStore(STORE_NAME);

                // Validar produto antes de adicionar
                if (!produto.nome || !produto.tipo || !produto.marca || !produto.preco || !produto.imagem) {
                    reject(new Error('Dados do produto incompletos'));
                    return;
                }

                // Remover o id ao adicionar um novo produto
                const produtoParaAdicionar = { ...produto };
                delete produtoParaAdicionar.id;

                const request = store.add(produtoParaAdicionar);

                request.onsuccess = () => {
                    console.log('Produto adicionado com sucesso:', request.result);
                    resolve(request.result);
                };

                request.onerror = (event) => {
                    console.error('Erro ao adicionar produto:', event.target.error);
                    reject(event.target.error);
                };

                transaction.oncomplete = () => {
                    console.log('Transação completada com sucesso');
                };

                transaction.onerror = (event) => {
                    console.error('Erro na transação:', event.target.error);
                    reject(event.target.error);
                };
            });
        } catch (error) {
            console.error('Erro ao adicionar produto:', error);
            throw error;
        }
    },

    // Atualizar produto
    async atualizar(produto) {
        try {
            const db = await initDB();
            return new Promise((resolve, reject) => {
                const transaction = db.transaction([STORE_NAME], 'readwrite');
                const store = transaction.objectStore(STORE_NAME);

                // Validar produto antes de atualizar
                if (!produto.id || !produto.nome || !produto.tipo || !produto.marca || !produto.preco || !produto.imagem) {
                    reject(new Error('Dados do produto incompletos'));
                    return;
                }

                const request = store.put(produto);

                request.onsuccess = () => {
                    console.log('Produto atualizado com sucesso:', request.result);
                    resolve(request.result);
                };

                request.onerror = (event) => {
                    console.error('Erro ao atualizar produto:', event.target.error);
                    reject(event.target.error);
                };

                transaction.oncomplete = () => {
                    console.log('Transação completada com sucesso');
                };

                transaction.onerror = (event) => {
                    console.error('Erro na transação:', event.target.error);
                    reject(event.target.error);
                };
            });
        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
            throw error;
        }
    },

    // Excluir produto
    async excluir(id) {
        const db = await initDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORE_NAME], 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.delete(id);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    },

    // Buscar produto por ID
    async buscarPorId(id) {
        const db = await initDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORE_NAME], 'readonly');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.get(id);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    },

    // Listar todos os produtos
    async listarTodos() {
        const db = await initDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORE_NAME], 'readonly');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.getAll();

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    },

    // Buscar produtos por tipo
    async buscarPorTipo(tipo) {
        const db = await initDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORE_NAME], 'readonly');
            const store = transaction.objectStore(STORE_NAME);
            const index = store.index('tipo');
            const request = index.getAll(tipo);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    },

    // Buscar produtos por marca
    async buscarPorMarca(marca) {
        const db = await initDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORE_NAME], 'readonly');
            const store = transaction.objectStore(STORE_NAME);
            const index = store.index('marca');
            const request = index.getAll(marca);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    },

    // Buscar produtos por faixa de preço
    async buscarPorPreco(min, max) {
        const db = await initDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORE_NAME], 'readonly');
            const store = transaction.objectStore(STORE_NAME);
            const index = store.index('preco');
            const range = IDBKeyRange.bound(min, max);
            const request = index.getAll(range);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }
}; 
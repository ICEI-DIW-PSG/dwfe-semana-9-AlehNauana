const dados = {
    "produtos": [
        {
            "id": 1,
            "nome": "Smartphone Galaxy S23",
            "preco": 3499.90,
            "categoria": "Celulares",
            "imagem": "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=200",
            "descricao": "Smartphone com 128GB de armazenamento e câmera de alta resolução.",
            "emEstoque": true
        },
        {
            "id": 2,
            "nome": "Notebook Dell Inspiron 15",
            "preco": 4599.00,
            "categoria": "Notebooks",
            "imagem": "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=200",
            "descricao": "Notebook Intel i7 com 16GB RAM e SSD de 512GB.",
            "emEstoque": false
        },
        {
            "id": 3,
            "nome": "Mouse Gamer Sem Fio",
            "preco": 249.90,
            "categoria": "Acessórios",
            "imagem": "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=200",
            "descricao": "Mouse óptico de alta precisão com luzes RGB.",
            "emEstoque": true
        },
        {
            "id": 4,
            "nome": "Teclado Mecânico RGB",
            "preco": 399.00,
            "categoria": "Acessórios",
            "imagem": "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=200",
            "descricao": "Teclado mecânico switch azul com layout ABNT2.",
            "emEstoque": true
        },
        {
            "id": 5,
            "nome": "Console PlayStation 5",
            "preco": 3999.00,
            "categoria": "Games",
            "imagem": "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=200",
            "descricao": "Console de última geração com SSD ultra-rápido.",
            "emEstoque": true
        },
        {
            "id": 6,
            "nome": "Jogo Elden Ring - PS5",
            "preco": 279.90,
            "categoria": "Games",
            "imagem": "https://images.unsplash.com/photo-1651079917300-8b1cf6db176d?w=200",
            "descricao": "Aclamado jogo de RPG de ação em mundo aberto.",
            "emEstoque": true
        },
        {
            "id": 7,
            "nome": "iPhone 15 Pro",
            "preco": 7299.00,
            "categoria": "Celulares",
            "imagem": "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=200",
            "descricao": "Estrutura em titânio, chip A17 Pro e sistema de câmera avançado.",
            "emEstoque": false
        },
        {
            "id": 8,
            "nome": "Notebook MacBook Air M2",
            "preco": 8999.00,
            "categoria": "Notebooks",
            "imagem": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200",
            "descricao": "Superfino, rápido e com bateria que dura o dia todo.",
            "emEstoque": true
        }
    ]
};

const listaProdutos = document.getElementById("lista-produtos");
const detalhesProduto = document.getElementById("detalhes-produto");

const campoBusca = document.querySelector("#busca");
const selectCategoria = document.querySelector("#categoria");
const botaoRecarregar = document.querySelector("#botao-recarregar");

function formatarPreco(preco) {
    return "R$ " + preco.toFixed(2).replace(".", ",");
}

function criarCartaoProduto(produto) {
    const cartao = document.createElement("div");
    cartao.setAttribute("data-id", produto.id);
    cartao.classList.add("cartao");
    
    cartao.style.padding = "20px"; 

    const noNome = document.createElement("h3");
    noNome.innerText = produto.nome;

    const noImagem = document.createElement("img");
    noImagem.setAttribute("src", produto.imagem);
    noImagem.setAttribute("alt", produto.nome);

    const noPreco = document.createElement("p");
    noPreco.innerText = formatarPreco(produto.preco);

    const noCategoria = document.createElement("p");
    noCategoria.innerText = "Categoria: " + produto.categoria;

    const botaoDetalhes = document.createElement("button");
    botaoDetalhes.innerText = "Ver detalhes";
    botaoDetalhes.addEventListener("click", function() {
        mostrarDetalhesProduto(produto);
    });

    const botaoDestaque = document.createElement("button");
    botaoDestaque.innerText = "Destacar";
    botaoDestaque.addEventListener("click", function() {
        cartao.classList.toggle("destaque");
    });

    cartao.appendChild(noImagem);
    cartao.appendChild(noNome);
    cartao.appendChild(noPreco);
    cartao.appendChild(noCategoria);
    cartao.appendChild(botaoDetalhes);
    cartao.appendChild(botaoDestaque);

    return cartao;
}

function desenharProdutos(produtos) {
    listaProdutos.innerHTML = "";
    
    for (let i = 0; i < produtos.length; i++) {
        const elementoCartao = criarCartaoProduto(produtos[i]);
        listaProdutos.appendChild(elementoCartao);
    }

    const todosCartoes = document.querySelectorAll(".cartao");
    console.log("--- Executando querySelectorAll nos cartoes ativos ---");
    todosCartoes.forEach(function(cartao) {
        const id = cartao.getAttribute("data-id");
        console.log("Cartao renderizado no DOM com data-id:", id);
    });
}

function desenharCategorias() {
    selectCategoria.innerHTML = "";
    
    const opcaoTodas = document.createElement("option");
    opcaoTodas.value = "Todas";
    opcaoTodas.innerText = "Todas";
    selectCategoria.appendChild(opcaoTodas);

    let categoriasAdicionadas = [];

    for (let i = 0; i < dados.produtos.length; i++) {
        let cat = dados.produtos[i].categoria;
        
        if (!categoriasAdicionadas.includes(cat)) {
            categoriasAdicionadas.push(cat);
            
            const opcao = document.createElement("option");
            opcao.value = cat;
            opcao.innerText = cat;
            selectCategoria.appendChild(opcao);
        }
    }
}

function mostrarDetalhesProduto(produto) {
    let textoEstoque = produto.emEstoque ? "Em Estoque" : "Fora de Estoque";
    
    detalhesProduto.innerHTML = `
        <h3>${produto.nome}</h3>
        <p><strong>Preço:</strong> ${formatarPreco(produto.preco)}</p>
        <p><strong>Categoria:</strong> ${produto.categoria}</p>
        <p><strong>Status:</strong> ${textoEstoque}</p>
        <p><strong>Descrição:</strong> ${produto.descricao}</p>
    `;
}

function filtrarProdutos() {
    const textoBusca = campoBusca.value.toLowerCase();
    const categoriaSelecionada = selectCategoria.value;

    const listaFiltrada = dados.produtos.filter(function(produto) {
        const bateTexto = produto.nome.toLowerCase().includes(textoBusca);
        const bateCategoria = (categoriaSelecionada === "Todas" || produto.categoria === categoriaSelecionada);
        
        return bateTexto && bateCategoria;
    });

    desenharProdutos(listaFiltrada);
}

campoBusca.addEventListener("input", filtrarProdutos);
selectCategoria.addEventListener("change", filtrarProdutos);

botaoRecarregar.addEventListener("click", function() {
    campoBusca.value = "";
    selectCategoria.value = "Todas";
    desenharProdutos(dados.produtos);
    console.log("Catálogo resetado pelo botão Renderizar.");
});

desenharCategorias();
desenharProdutos(dados.produtos);
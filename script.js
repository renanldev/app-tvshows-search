async function buscar() {
    let serie = document.getElementById("busca").value
    let response = await fetch("https://api.tvmaze.com/search/shows?q=" + serie)
    let dados = await response.json()

    let div = document.getElementById("resultados")
    div.innerHTML = ""

    dados.forEach(item => {
        let card = document.createElement("div")
        card.className = "card"

        let btn = document.createElement("button")
        btn.textContent = "Favoritar"

        btn.onclick = function () {
            console.log("clicou")

            if (!favoritos.includes(item.show.name)) {
                favoritos.push(item.show.name)
                salvar()
                mostrarFavoritos()
            }
        }


        card.innerHTML = item.show.name
        card.appendChild(btn)
        div.appendChild(card)
    })
}

let favoritos = JSON.parse(localStorage.getItem("favoritos")) || []

function salvar() {
    localStorage.setItem("favoritos", JSON.stringify(favoritos))
}

function mostrarFavoritos() {
    let ul = document.getElementById("favoritos")
    ul.innerHTML = ""

    favoritos.forEach((item, index) => {
        let li = document.createElement("li")
        li.textContent = item

        let btnRemover = document.createElement("button")
        btnRemover.textContent = "Remover"

        btnRemover.onclick = function () {
            favoritos.splice(index, 1) // remove pelo índice
            salvar()
            mostrarFavoritos()
        }

        li.appendChild(btnRemover)
        ul.appendChild(li)
    })
}


// FUNÇÃO FORA (do jeito certo)
function limparFavoritos() {
    if (confirm("Tem certeza que quer apagar todos os favoritos?")) {
        favoritos = []
        localStorage.removeItem("favoritos")
        mostrarFavoritos()
    }
}

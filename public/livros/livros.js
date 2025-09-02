//se não estivermos logados, nos manda de volta para a página de login
if (localStorage.getItem("logged") !== "true"){
  window.location.href = "/index.html"
}

//botão de logout
butsair = document.getElementById("sair")
butsair.addEventListener("click", () => {
    if(localStorage.getItem("admin")){
    localStorage.removeItem("admin")
  }
  localStorage.removeItem("logged"),
  window.location.href = "/index.html"

})



const tbody = document.getElementById("tbody1");

//puxa livros como JSON para leitura do JS
async function carregarLivros() {
  const resposta = await fetch("/livros");
  const livros = await resposta.json();
  console.log(livros);

  // limpa antes de preencher
  tbody.innerHTML = "";

  //para cada livro encontrado no json, ele cria uma table row, e dentro deste table row, fazemos o append de um td para cada dado
  //após tudo, fazemos um append dentro do table row e executamos a função

  livros.forEach((l) => {
    const tr = document.createElement("tr");

    const tdNome = document.createElement("td");
    tdNome.textContent = l.nome;
    tr.appendChild(tdNome);

    const tdGenero = document.createElement("td");
    tdGenero.textContent = l.genero;
    tr.appendChild(tdGenero);

    const tdAno = document.createElement("td");
    tdAno.textContent = l.ano;
    tr.appendChild(tdAno);

    const tdAutor = document.createElement("td");
    tdAutor.textContent = l.autor;
    tr.appendChild(tdAutor);

    //se o admin estiver logado, cria um botão especial que remove a tr atual do server
    if (localStorage.getItem("admin")){

      const butDel = document.createElement("button")
      butDel.textContent= "X"
      tr.appendChild(butDel)
      butDel.addEventListener("click", async (e) =>{
        
      const resposta = await fetch (`/livros/${l.id}`, {
        method: "DELETE",

    })

    if (resposta.ok){
      tr.remove()
    }

    else return

      })
    }

    tbody.appendChild(tr);
  });
}

//formulário de registro de livros, mesmo método que o cadastro de usuários
const form = document.getElementById("formreg")

form.addEventListener("submit", async (e) => {
    e.preventDefault()


    const nome = document.getElementById("nome").value
    const genero = document.getElementById("genero").value
    const ano = document.getElementById("ano").value
    const autor = document.getElementById("autor").value
    
    numerovalido = ano.length = 4

    if (!numerovalido){
      alert('Insira um ano válido.')
      return
    } 

    await fetch ("/livros", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({nome, genero, ano, autor}),
    })

    form.reset()
    carregarLivros()
})

carregarLivros();
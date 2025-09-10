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
  localStorage.removeItem("user_id") // também limpa o id do usuário logado
  window.location.href = "/index.html"

})

const tbody = document.getElementById("tbody1");

//puxa empréstimos como JSON para leitura do JS
async function carregarLivros() {
  const userId = localStorage.getItem("user_id");
  const resposta = await fetch(`/emprestimos/${userId}`);
  const emprestimos = await resposta.json();
  console.log(emprestimos);

  // limpa antes de preencher
  tbody.innerHTML = "";

  //para cada e encontrado no json, ele cria uma table row, e dentro deste table row, fazemos o append de um td para cada dado
  //após tudo, fazemos um append dentro do table row e executamos a função

  emprestimos.forEach((l) => {
    const tr = document.createElement("tr");

    const tdId = document.createElement("td");
    tdId.textContent = l.id;
    tr.appendChild(tdId);

    const tdLiv = document.createElement("td");
    tdLiv.textContent = l.id_livro;
    tr.appendChild(tdLiv);

    const tdDemp = document.createElement("td");
    tdDemp.textContent = l.data_emprestimo;
    tr.appendChild(tdDemp);

    const tdVenc = document.createElement("td");
    tdVenc.textContent = l.data_vencimento;
    tr.appendChild(tdVenc);

    const tdStatus = document.createElement("td");
    tdStatus.textContent = l.status;
    tr.appendChild(tdStatus);

    tdbutDev = document.createElement("td")
    const butDev = document.createElement("button");
    butDev.textContent = "Devolver";
    tr.appendChild(butDev);

    //cria um botão que atualiza o status do livro no server por meio do método PUT
    butDev.addEventListener("click", async () => {
      const resposta = await fetch(`/emprestimos/${l.id}/devolver`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" }
      });

      if (resposta.ok) {
        tdStatus.textContent = "Devolvido";
      } else {
        console.error("Erro ao devolver livro");
      }
    });


    //se o admin estiver logado, cria um botão especial que remove a tr atual do server
    if (localStorage.getItem("admin")){

      const butDel = document.createElement("button")
      butDel.textContent= "X"
      tr.appendChild(butDel)
      butDel.addEventListener("click", async (e) =>{
        
      const resposta = await fetch (`/emprestimos/${l.id}`, {
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


carregarLivros()
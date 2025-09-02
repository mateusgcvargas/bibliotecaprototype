const form = document.getElementById("formreg")

form.addEventListener("submit", async (e) => {
    e.preventDefault()


    const nome = document.getElementById("nome").value
    const email = document.getElementById("email").value
    
    arrobavalido = email.includes('@')
    addressvalido = email.includes('.com')

    if (!arrobavalido && !addressvalido){
      alert('Insira um endereço de email válido.')
      return
    } 

    await fetch ("/usuarios", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({nome, email}),
    })

    form.reset()
})

carregarUsuarios()


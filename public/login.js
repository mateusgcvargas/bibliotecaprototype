const formlogin = document.getElementById("formlog")


//função que realiza nosso login
formlogin.addEventListener("submit", async (e) => {
    e.preventDefault()

    const nome = document.getElementById("nome").value
    const email = document.getElementById("email").value
    const adminname = nome.includes("Admin")
    const adminmail = email.includes("yataaa82@gmail.com")

    //puxa os dados como json
    const response = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email })
    })


    const data = await response.json()
    
    //se o login for válido, nos atualiza como logados e nos manda para o indice
    if (data.success) {
        alert(data.message)
        window.location.href = "/livros/lista.html"
        localStorage.setItem("logged", "true")
    } 
        //se nossa conta de admin estiver no submit, atualiza o localstorage
    if (adminname && adminmail){
        localStorage.setItem("admin", "true")
    }

    else {
        alert(data.message)
    }
    
})
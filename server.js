//dependencias

const express = require("../node_modules/express")
const mysql = require("mysql2")
const path = require("path")

const app = express()

app.use (express.json())

//para servir paginas estaticas 
app.use(express.static(path.join(__dirname, "public")))

//parametros para a conexão do db
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "skaianet2",
})

//função que requisiciona os usuarios do banco e converte os resultados em json
app.get("/usuarios", (req, res) => {
    db.query("SELECT * FROM usuarios", (err, results) =>{
        if (err) throw err
        res.json(results)
    })
})

//mesma função, só que com livros
app.get("/livros", (req, res) =>{
    db.query("SELECT * FROM livros", (err, results) =>{
        if (err) throw err
        res.json(results)
    })
})

//função que atualiza os usuários em nosso banco de dados
app.post("/usuarios", (req, res) => {
    const {nome, email} = req.body
    db.query (
        "INSERT INTO usuarios (nome, email) VALUES (?, ?)",
        [nome, email],
        (err, result) => {
            if (err) throw err
            res.json({message: "Usuário adicionado com sucesso!"})
        }
    )
})

//a mesma função, mas com livros
app.post("/livros", (req, res) => {
    const {nome, genero, ano, autor} = req.body
    db.query(
        "INSERT INTO livros (nome, genero, ano, autor) VALUES (?, ?, ?, ?)",
        [nome, genero, ano, autor],
        (err, result) => {
            if (err) throw err
            res.json({message: "Livro adicionado com sucesso!"})
        }
    )
})

//função de remoção de livros
app.delete("/livros/:id", (req, res) => {
    const {id} = req.params
    console.log(req.params.id)
    db.query(
       "DELETE FROM livros WHERE id = ?",
        [id],
        (err, result) => {
            if (err) throw err
            res.json({message: "Livro deletado com sucesso!"})
        }
    )
})

// rota de login
app.post("/login", (req, res) => {
    const { nome, email } = req.body;

    db.query(
        "SELECT * FROM usuarios WHERE nome = ? AND email = ?",
        [nome, email],
        (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ success: false, message: "Erro no servidor" });
            }

            if (results.length > 0) {
                res.json({ success: true, message: "Login bem-sucedido!" });
            } else {
                res.json({ success: false, message: "Usuário não encontrado." });
            }
        }
    );
});

//inicia o servidor em nossa porta 3000
app.listen(3000, ()=>
console.log("Servidor rodando em http://localhost:3000")
)
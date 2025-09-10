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

//mesma função com empréstimos, puxa somente a id específica de um usuário
app.get("/emprestimos/:user_id", (req, res) => {
    const { user_id } = req.params;

    db.query("SELECT * FROM emprestimos WHERE user_id = ?", [user_id], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});
//função que cria os empréstimos em nosso banco de dados
app.post("/emprestimos", (req, res) => {
    const { user_id, id_livro, data_emprestimo, data_vencimento, status } = req.body;

    // primeiro cria o empréstimo
    db.query(
        "INSERT INTO emprestimos (user_id, id_livro, data_emprestimo, data_vencimento, status) VALUES (?, ?, ?, ?, ?)",
        [user_id, id_livro, data_emprestimo, data_vencimento, status],
        (err, result) => {
            if (err) return res.status(500).json({ success: false, message: err.message });

            // depois atualiza o livro para emprestado
            db.query(
                "UPDATE livros SET status = 'emprestado' WHERE id = ?",
                [id_livro],
                (err2) => {
                    if (err2) return res.status(500).json({ success: false, message: err2.message });

                    res.json({ success: true, message: "Empréstimo registrado e livro marcado como emprestado!" });
                }
            );
        }
    );
});

//função que atualiza o status do livro para devolvido tanto na tabela de empréstimos quanto na tabela de livros
app.put("/emprestimos/:id/devolver", (req, res) => {
    const { id } = req.params;

    db.query("UPDATE emprestimos SET status = 'devolvido' WHERE id = ?", [id], (err, result) => {
        if (err) return res.status(500).json({ success: false, message: err.message });

        db.query("SELECT id_livro FROM emprestimos WHERE id = ?", [id], (err2, results) => {
            if (err2) return res.status(500).json({ success: false, message: err2.message });

            if (results.length === 0) {
                return res.status(404).json({ success: false, message: "Empréstimo não encontrado." });
            }

            const id_livro = results[0].id_livro;

            db.query("UPDATE livros SET status = 'Disponível' WHERE id = ?", [id_livro], (err3) => {
                if (err3) return res.status(500).json({ success: false, message: err3.message });

                res.json({ success: true, message: "Livro devolvido com sucesso!" });
            });
        });
    });
});

//função de remoção de empréstimos
app.delete("/emprestimos/:id", (req, res) => {
    const {id} = req.params
    console.log(req.params.id)
    db.query(
       "DELETE FROM emprestimos WHERE id = ?",
        [id],
        (err, result) => {
            if (err) throw err
            res.json({message: "Empréstimo deletado com sucesso!"})
        }
    )
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
            if (err) throw err;

            if (results.length > 0) {
                res.json({
                    success: true,
                    message: "Login realizado com sucesso!",
                    id: results[0].id   
                });
            } else {
                res.json({
                    success: false,
                    message: "Usuário não encontrado."
                });
            }
        }
    );
});


//inicia o servidor em nossa porta 3000
app.listen(3000, ()=>
console.log("Servidor rodando em http://localhost:3000")
)
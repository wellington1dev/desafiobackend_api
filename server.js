require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

let cadastros = [];
let proximoId = 1;

app.use(express.json());

function emailValido(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function telefoneValido(telefone) {
  const telefoneRegex = /^[0-9]{10,11}$/;
  return telefoneRegex.test(telefone);
}


function validarCadastro(req, res, next) {
  const { nome, email, telefone, mensagem } = req.body;

  if (!nome || !nome.length >= 3 || !email || !telefone) {
    return res.status(400).json({
      mensagem: "Todos os campos obrigatórios devem ser preenchidos."
    });
  }

  if (!emailValido(email)) {
    return res.status(400).json({
      mensagem: "O email fornecido é inválido."
    });
  }

  if (!telefoneValido(telefone)) {
    return res.status(400).json({
      mensagem: "O telefone fornecido é inválido."
    });
  }

  next();
}

app.get("/", (req, res) => {
  res.send("API rodando!");
});

app.get("/cadastros", (req, res) => {
  res.json(cadastros);
});

app.post("/cadastros", (req, res) => {
  const { nome, email, telefone, mensagem } = req.body;
  const novoCadastro = {
    id: proximoId++, nome, email, telefone, mensagem: mensagem || null
  };
  cadastros.push(novoCadastro);
  res.status(201).json({
    mensagem: "Cadastro realizado com sucesso!",
    cadastro: novoCadastro
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
const express = require("express");
const router = express.Router();
const db = require("./db");
const bcrypt = require("bcryptjs");

// Salvar uma operação no banco de dados
router.post("/operacoes", (req, res) => {
   const { operacao, resultado } = req.body;
   const sql = "INSERT INTO operacoes (operacao, resultado) VALUES (?, ?)";
   db.query(sql, [operacao, resultado], (err, result) => {
      if (err) {
         console.error("Erro ao salvar a operação:", err);
         res.status(500).json({ error: "Erro ao salvar a operação" });
      } else {
         res.status(201).json({ message: "Operação salva com sucesso" });
      }
   });
});

// Recuperar todas as operações do banco de dados
router.get("/operacoes", (req, res) => {
   const sql = "SELECT * FROM operacoes";
   db.query(sql, (err, result) => {
      if (err) {
         console.error("Erro ao recuperar as operações:", err);
         res.status(500).json({ error: "Erro ao recuperar as operações" });
      } else {
         res.status(200).json(result);
      }
   });
});

// Rota para limpar os dados de operações do banco de dados
router.delete("/operacoes", (req, res) => {
   const sql = "DELETE FROM operacoes";
   db.query(sql, (err, result) => {
      if (err) {
         console.error("Erro ao limpar as operações:", err);
         res.status(500).json({ error: "Erro ao limpar as operações" });
      } else {
         res.status(200).json({ message: "Operações excluídas com sucesso" });
      }
   });
});

// Rota de Cadastro de Usuário
router.post("/cadastro", (req, res) => {
   const { nome, email, senha } = req.body;

   // Criptografar a senha antes de armazenar no banco de dados
   bcrypt.hash(senha, 10, (err, hash) => {
      if (err) {
         console.error("Erro na criptografia de senha:", err);
         res.status(500).json({ success: false, message: "Erro no cadastro" });
      } else {
         const sql =
            "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)";
         db.query(sql, [nome, email, hash], (err, result) => {
            if (err) {
               console.error("Erro no cadastro:", err);
               res.status(500).json({
                  success: false,
                  message: "Erro no cadastro",
               });
            } else {
               res.status(201).json({
                  success: true,
                  message: "Cadastro bem-sucedido",
               });
            }
         });
      }
   });
});

// Rota de Login de Usuário
router.post("/login", (req, res) => {
   const { email, senha } = req.body;
   const sql = "SELECT * FROM usuarios WHERE email = ?";

   db.query(sql, [email], (err, results) => {
      if (err) {
         console.error("Erro no login:", err);
         res.status(500).json({ success: false, message: "Erro no login" });
      } else if (results.length === 0) {
         res.status(401).json({
            success: false,
            message: "Usuário não encontrado",
         });
      } else {
         const user = results[0];
         bcrypt.compare(senha, user.senha, (err, result) => {
            if (err || !result) {
               res.status(401).json({
                  success: false,
                  message: "Senha incorreta",
               });
            } else {
               res.status(200).json({
                  success: true,
                  message: "Login bem-sucedido",
               });
            }
         });
      }
   });
});

module.exports = router;

const mysql = require("mysql2");

const db = mysql.createConnection({
   host: "localhost", // Endereço do servidor MySQL
   user: "root",
   password: "root",
   database: "calculadora", // Nome do banco de dados
});

db.connect((err) => {
   if (err) {
      console.error("Erro ao conectar ao banco de dados:", err);
   } else {
      console.log("Conexão bem-sucedida ao banco de dados MySQL.");
   }
});

module.exports = db;

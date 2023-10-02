const express = require("express");
const app = express();
const apiRouter = require("./api");
const path = require("path");

app.use(express.static(path.join(__dirname, "src")));

app.use(express.json());

app.get("/", (req, res) => {
   res.sendFile(path.join(__dirname, "src", "inicio.html"));
});

app.get("/calculadora", (req, res) => {
   res.sendFile(path.join(__dirname, "src", "index.html"));
});

app.use("/api", apiRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
   console.log(`Servidor em execução na porta ${PORT}`);
});

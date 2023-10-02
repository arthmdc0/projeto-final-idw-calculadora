document.addEventListener("DOMContentLoaded", () => {
   const cadastroForm = document.getElementById("cadastro-form");
   cadastroForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const nome = document.getElementById("nome").value;
      const email = document.getElementById("email").value;
      const senha = document.getElementById("senha").value;

      // Enviar dados para o servidor para cadastro
      fetch("/api/cadastro", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({ nome, email, senha }),
      })
         .then((response) => response.json())
         .then((data) => {
            // Redirecionar para a página de login após o cadastro
            if (data.success) {
               window.location.href = "login.html";
            } else {
               alert(data.message);
            }
         })
         .catch((error) => console.error("Erro no cadastro:", error));
   });
});

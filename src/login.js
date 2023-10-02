document.addEventListener("DOMContentLoaded", () => {
   const loginForm = document.getElementById("login-form");
   loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const senha = document.getElementById("senha").value;

      // Enviar dados para o servidor para login
      fetch("/api/login", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({ email, senha }),
      })
         .then((response) => response.json())
         .then((data) => {
            // Redirecionar para a página da calculadora após o login
            if (data.success) {
               window.location.href = "index.html";
            } else {
               alert(data.message);
            }
         })
         .catch((error) => console.error("Erro no login:", error));
   });
});

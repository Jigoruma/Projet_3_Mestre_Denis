// Ajouter un écouteur d'événement sur le chargement du DOM
window.addEventListener("DOMContentLoaded", function (event) {
  // Sélectionner le formulaire de connexion
  const loginForm = document.getElementById("login-form");

  // Sélectionner le message d'erreur
  const errorMessage = document.getElementById("error-message");

  // Vérifier que le formulaire existe dans le DOM
  if (loginForm) {
    // Ajouter un écouteur d'événement sur la soumission du formulaire
    loginForm.addEventListener("submit", function (event) {
      // Empêcher le comportement par défaut du formulaire (rechargement de la page)
      event.preventDefault();

      // Récupérer les valeurs des champs email et mot de passe
      const email = document.getElementById("email-input").value;
      const password = document.getElementById("password-input").value;

      // Créer un objet contenant les données à envoyer au serveur
      const data = {
        email: email,
        password: password
      };

      // Créer une requête HTTP de type POST pour envoyer les données au serveur en utilisant la fonction fetch()
      fetch("http://localhost:5678/api/users/login", { // Correction de l'URL du serveur
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then((response) => response.json()) // Extraire le JSON de la réponse
        .then((data) => {
          // Récupérer le token d'authentification renvoyé par le serveur
          const token = data.token;

          // Vérifier que le token correspond à celui attendu
          if (token === "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY4NDc3MTkzOSwiZXhwIjoxNjg0ODU4MzM5fQ.ouPpp_dzpH02FG_Mq01YhXJ4hIbuzSIPWm0wkEbrJfU") {
            // Stocker le token dans le stockage local du navigateur
            localStorage.setItem("token", token);

            // Rediriger vers la page d'accueil
            window.location.href = "index.html"; // Correction de l'URL de la page d'accueil
          } else {
            // Afficher un message d'erreur si le token est invalide
            errorMessage.textContent = "Token invalide";
          }
        })
        .catch((error) => {
          // Afficher un message d'erreur si la requête a échoué
          errorMessage.textContent = "Erreur dans l’identifiant ou le mot de passe";
        });
    });
  }
});

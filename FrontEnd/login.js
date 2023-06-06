// Étape 2 : Coder la page de connexion + Authentification de l’utilisateur

// Sélectionner l'élément du formulaire de connexion
const loginForm = document.querySelector('.login-form');

// Ajouter un écouteur d'événements pour l'événement de soumission du formulaire
loginForm.addEventListener('submit', function(event) {
  // Empêcher la soumission par défaut du formulaire
  event.preventDefault();

  // Sélectionner les éléments d'entrée d'email et de mot de passe
  const emailInput = loginForm.querySelector('#email-input');
  const passwordInput = loginForm.querySelector('#password-input');

  // Récupérer les valeurs d'email et de mot de passe
  const emailValue = emailInput.value.trim();
  const passwordValue = passwordInput.value.trim();

  // Envoyer une requête POST à l'API pour se connecter
  fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email: emailValue, password: passwordValue })
  })
  .then(response => {
    if (response.ok) {
      // Si la réponse est OK, renvoyer les données au format JSON
      return response.json();
    } else { 
      // Sinon, afficher un message d'erreur et lancer une erreur
      const errorMessage = document.getElementById("error-message");
      errorMessage.style.display = "block";
      throw new Error('Login failed');
    }
  })
  .then(data => {
    // Sauvegarder le jeton d'authentification dans le stockage local
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('isLoggedIn', true);
    // Rediriger vers index.html
    window.location.href = 'index.html';
  })
  .catch(error => {
    // Afficher l'erreur dans la console en cas d'erreur
    console.log('Error:', error);
  });
});
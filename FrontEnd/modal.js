// Etape 1 Récupération des projets de la galerie et filtre des projets dans la galerie

// Définir les URL de l'API pour les travaux et les catégories
const worksUrl = "http://localhost:5678/api/works";
const categoriesUrl = "http://localhost:5678/api/categories";

// Sélectionner l'élément de la galerie et créer l'élément de sélection de catégorie
const gallery = document.querySelector(".gallery");
const categorySelect = document.createElement("div");
categorySelect.classList.add("category-select");
categorySelect.style.display = "flex";
categorySelect.style.justifyContent = "center";
categorySelect.style.gap = "1rem";
categorySelect.style.marginTop = "51px";
categorySelect.style.marginBottom = "51px";

// Récupérer les catégories de l'API et créer les boutons de sélection de catégorie
fetch(categoriesUrl)
  .then(response => response.json())
  .then(data => {
    const categories = new Set([""]);
    data.forEach(category => categories.add(category.name));
    categories.forEach(category => {
      const button = document.createElement("button");
      button.textContent = category ? category : "Tous";
      button.value = category;
      // Ajouter un écouteur d'événements pour filtrer les travaux en fonction de la catégorie sélectionnée
      button.addEventListener("click", event => {
        const category = event.target.value;
        const worksElements = gallery.querySelectorAll(".work");
        worksElements.forEach(workElement => {
          if (category === "" || workElement.dataset.category === category) {
            workElement.style.display = "block";
          } else {
            workElement.style.display = "none";
          }
        });

        // Changement de couleur des boutons quand ils sont sélectionnés
        const buttons = categorySelect.querySelectorAll("button");
        buttons.forEach(button => {
          button.style.backgroundColor = button.value === category ? "#1D6154" : "white";
          button.style.color = button.value === category ? "white" : "#1D6154";
        });
      });

      // Appliquer le style aux boutons
      button.style.backgroundColor = category === "" ? "#1D6154" : "white";
      button.style.color = category === "" ? "white" : "#1D6154";
      button.style.border = "2px solid #1D6154";
      button.style.borderRadius = "60px";
      button.style.padding = "0.5rem 2rem";
      button.style.height = "37px";
      button.style.fontFamily = "Syne";
      button.style.fontWeight = "700";
      button.style.fontSize = "16px";
      button.style.cursor = "pointer";

      // Ajouter le bouton à l'élément de sélection de catégorie
      categorySelect.appendChild(button);
    });
  })
  .catch(error => console.error(error));

// Fonction pour afficher les travaux dans la liste
const displayWorksInList = (works) => {
  gallery.innerHTML = ""
  works.forEach(work => {
    const workElement = document.createElement("div");
    workElement.classList.add("work");
    workElement.dataset.category = work.category.name;

    const imageElement = document.createElement("img");
    imageElement.src = work.imageUrl;
    workElement.appendChild(imageElement);

    const titleElement = document.createElement("h3");
    titleElement.textContent = work.title;
    workElement.appendChild(titleElement);

    gallery.appendChild(workElement);
  });
}

// Récupérer les travaux de l'API et les afficher dans la liste
fetch(worksUrl)
  .then(response => response.json())
  .then(data => displayWorksInList(data))
  .catch(error => console.error(error));


// Suite Étape 2 : Coder la page de connexion + Authentification de l’utilisateur

// Vérifier si l'utilisateur est connecté
if (localStorage.getItem("isLoggedIn") === "true") {

  // Ajouter un écouteur d'événements pour le bouton de déconnexion
  const logoutBtn = document.querySelector(".logout");
  logoutBtn.addEventListener("click", function () {
    // Effacer les données de stockage local et rediriger vers index.html
    localStorage.clear();
    window.location.href = "index.html";
  });

  // Afficher les éléments masqués pour l'utilisateur connecté

  // Afficher la barre supérieure
  const topBar = document.getElementById("top-bar");
  topBar.style.display = "flex";

  // Afficher les éléments en mode édition
  const editionMode = document.querySelectorAll(".edition-mode");
  editionMode.forEach(element => element.style.display = "flex");

  // Afficher le bouton de publication
  const publishButton = document.querySelector(".publish-button input[type='submit']");
  publishButton.classList.remove("publish");

  // Afficher le bouton de déconnexion
  const logout = document.querySelector(".logout");
  logout.style.display = "block";

  // Masquer le bouton de connexion
  const loginNav = document.querySelector('.login-nav');
  loginNav.style.display = 'none';

  // Afficher la figure
  const figureDisplay = document.querySelector(".figure-display");
  figureDisplay.style.display = "flex";

  // Afficher la div de modification d'image
  const modificationDisplayImage = document.querySelector(".modification-display-image");
  modificationDisplayImage.style.display = "flex";

  // Afficher les boutons de modification
  const modify = document.querySelectorAll(".modify");
  modify.forEach(element => element.style.display = "block");

  // Afficher la div de modification de projet
  const modificationDisplayProject = document.querySelector(".modification-display-project");
  modificationDisplayProject.style.display = "flex";

  // Ajuster la marge du header
  const header = document.querySelector("header");
  header.style.margin = "95px 0 92px 0";

  // Masquer la div de sélection de catégorie
  categorySelect.style.display = "none";

  // Ajuster la marge du projet
  const projectDisplay = document.querySelector(".project-display");
  projectDisplay.style.marginBottom = "92px";
}


// Étape 3.1 : Ajout de la fenêtre modale

// Fonction pour ouvrir la fenêtre modale
const openModal = function (e) {
  e.preventDefault();
  const targetId = e.currentTarget.getAttribute('href').substring(1); // Enlève le leading #
  const target = document.getElementById(targetId);
  if (!target) {
    console.error(`Cannot find modal element with ID ${targetId}`);
    return;
  }
  target.style.display = 'flex';
  target.removeAttribute('aria-hidden');
  target.setAttribute('aria-modal', 'true');
};

// Fonction pour fermer la fenêtre modale
const closeModal = function (target) {
  target.style.display = 'none'
  target.setAttribute('aria-hidden', 'true')
  target.removeAttribute('aria-modal')
}

// Ajouter des écouteurs d'événements pour ouvrir les fenêtres modales
document.querySelectorAll('.modal').forEach(a => {
  a.addEventListener('click', openModal)
})

// Ajouter des écouteurs d'événements pour fermer les fenêtres modales en cliquant en dehors
document.querySelectorAll('.modal-display').forEach(modal => {
  modal.addEventListener('click', function (e) {
    if (e.target === this) {
      closeModal(this);
    }
  });
});

// Ajouter des écouteurs d'événements pour fermer les fenêtres modales en cliquant sur la croix
document.querySelectorAll('.modal-close').forEach(a => {
  a.addEventListener('click', function (e) {
    e.preventDefault();
    closeModal(e.target.closest('.modal-display'));
  });
});

// Étape 3.2 : Suppression de travaux existants

// Fonction pour lister les travaux
const listWorks = () => {
  fetch(worksUrl)
    .then(response => response.json())
    .then(data => {
      displayWorksInList(data)
      displayWorksInModal(data)
    })
    .catch(error => console.error(error));
}

// Fonction pour afficher les travaux dans la fenêtre modale
const displayWorksInModal = (works) => {
  document.getElementById("modal-works-container").innerHTML = ""
  works.forEach(work => {

    // Créer l'élément de travail
    const workElement = document.createElement("div");
    workElement.classList.add("work");
    workElement.dataset.category = work.category.name;

    // Créer l'élément d'image
    const imageElement = document.createElement("img");
    imageElement.src = work.imageUrl;
    workElement.appendChild(imageElement);

    // Créer l'icône de poubelle et ajouter un écouteur d'événements pour supprimer le travail
    const iconElement = document.createElement("i")
    iconElement.setAttribute("class", "fa-solid fa-trash-can trash")
    iconElement.addEventListener("click", () => {
      fetch(worksUrl + "/" + work.id, {
        method: "DELETE",
        headers:
        {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      })
        .then(() => {
          listWorks()
        })
    })
    workElement.appendChild(iconElement);

    // Créer le bouton d'édition
    const editButton = document.createElement("span");
    editButton.setAttribute("class", "edit-button");
    workElement.appendChild(editButton);
    editButton.textContent = 'éditer';

    // Ajouter l'élément de travail au conteneur de travaux de la fenêtre modale
    document.getElementById("modal-works-container").appendChild(workElement);
  });
}

// Ajouter des écouteurs d'événements pour naviguer entre les pages de la fenêtre modale

const addPhotoButton = document.getElementById('add-photo');
const firstElements = document.getElementById('first-elements');
const newElements = document.getElementById('new-elements');
const closeIcon = document.querySelector('.cross-icon');
const arrowIcon = document.querySelector('.close-icon');
const modal = document.getElementById('modal1');

// Ouvrir la deuxième page de la fenêtre modale en cliquant sur le bouton "Ajouter des photos"
addPhotoButton.addEventListener('click', function () {
  firstElements.style.display = 'none';
  newElements.style.display = 'flex';
});

// Fermer la deuxième page de la fenêtre modale en cliquant sur la croix
closeIcon.addEventListener('click', function () {
  firstElements.style.display = 'flex';
  newElements.style.display = 'none';
});

// Retourner à la première page de la fenêtre modale en cliquant en dehors ou sur la flèche de retour
modal.addEventListener('click', function (event) {
  if (event.target === modal) {
    firstElements.style.display = 'flex';
    newElements.style.display = 'none';
  }
});

arrowIcon.addEventListener('click', function () {
  firstElements.style.display = 'flex';
  newElements.style.display = 'none';
});

// Lister les travaux et insérer l'élément de sélection de catégorie avant la galerie
listWorks()
document.querySelector("#portfolio").insertBefore(categorySelect, gallery);

// Étape 3.3 : Envoi d’un nouveau projet au back-end via le formulaire de la modale

// Fonction pour remplir la sélection de catégorie avec les données de l'API
const fillCategorySelect = () => {
  fetch("http://localhost:5678/api/categories")
    .then(response => response.json())
    .then(data => {
      const categoryInput = document.getElementById("category-input");
      data.forEach(category => {
        const option = document.createElement("option");
        option.value = category.id;
        option.text = category.name;
        categoryInput.add(option);
      });
    })
    .catch(error => console.error(error));
}

// Fonction pour prévisualiser l'image téléchargée
const imagePreview = (e) => {
  const avatar = document.getElementById("avatar")
  const blob = new Blob([e.files[0]], { type: "image/jpeg" })
  const blobURL = URL.createObjectURL(blob)
  avatar.style.display = "block"
  avatar.src = blobURL
}

// Ajouter un écouteur d'événements pour le bouton de validation d'ajout de projet
document.getElementById("send-validation").addEventListener("click", function (event) {
  event.preventDefault();

  // Récupérer les données du formulaire et du fichier téléchargé
  const file = document.getElementById("photo-addition-button").files[0];
  const title = document.getElementById("title-input").value;
  const category = document.getElementById("category-input").value;
  const formData = new FormData();
  formData.append("image", file);
  formData.append("title", title);
  formData.append("category", category);

  // Vérifier que les champs sont remplis et que le fichier a la bonne taille et le bon format
  if (title.trim() === "" || category.trim() === "" || !file || !["image/jpeg", "image/png"].includes(file.type) || file.size > 4000000) {
    alert("Veuillez remplir tous les champs et sélectionner une image de type jpg ou png de taille maximale 4 Mo.");
    return;
  }

  // Envoyer les données à l'API avec un fetch
  fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
    },
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      listWorks()
    })
    .catch(error => console.error(error));
});

// Remplir la sélection de catégorie avec les données de l'API
fillCategorySelect()

// Ajouter un écouteur d'événements pour changer la couleur du bouton de validation lors du téléchargement d'une photo
const photoAdditionButton = document.getElementById("photo-addition-button");
const sendValidationButton = document.getElementById("send-validation");
photoAdditionButton.addEventListener("change", function () {
  sendValidationButton.style.backgroundColor = "#1D6154";
});

// Ajouter un écouteur d'événements pour rafraîchir la page lorsque l'utilisateur clique sur le bouton "Publier les changements"
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("publish-button").addEventListener("click", function () {
    // Rafraîchir la page en cours
    location.reload();
  });
});

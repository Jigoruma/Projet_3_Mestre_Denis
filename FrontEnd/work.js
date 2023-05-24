// Création des fonctions

function createGallery(dataImage) {
    // Récupérer l'élément div avec la classe "gallery"
    const gallery = document.querySelector(".gallery");
    // Créer une variable qui contient la chaîne HTML des images
    let imagesHtml = "";
    // Parcourir le tableau des données des images
    for (const item of dataImage) {
        // Ajouter à la chaîne HTML une balise <img> avec les attributs src, alt et data-category
        imagesHtml += `<img src="${item.src}" alt="${item.alt}" data-category="${item.category}">`;
    }
    // Affecter la chaîne HTML à innerHTML de l'élément gallery
    gallery.innerHTML = imagesHtml;
}

async function getWork() {
    let response = await fetch('http://localhost:5678/api/works', {
        method: "GET",
        headers: {
            "accept": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY4Mzk3MDcwNywiZXhwIjoxNjg0MDU3MTA3fQ.FuQR-5daEdWNm9PUSNs3cVx6aLXmYsvyv14tULyQsrg"
        },
    });
    let data = await response.json(); // ajoute cette ligne
    return data;
}

// Utiliser la fonction async dans une autre fonction async
async function main() {
    let work = await getWork();
    console.log(work);
}

// Utiliser la fonction async dans une fonction normale
function main() {
    getWork().then(work => {
        console.log(work);
    }).catch(error => {
        // Gérer/rapporter l'erreur
    });
}


// Ajout d’une fonction pour filtrer les travaux par catégorie en utilisant la fonction filter 
function filterGallery(category) {
    // Récupérer tous les éléments img de la galerie 
    const images = document.querySelectorAll(".gallery img");
    // Créer un tableau à partir de la liste des images 
    const imagesArray = Array.from(images);
    // Utiliser la fonction forEach pour parcourir le tableau des images
    imagesArray.forEach(image => {
        // Récupérer la catégorie de l’image à partir de son attribut data-category 
        const imageCategory = image.dataset.category;
        // Si le filtre est “Tous” ou si la catégorie correspond, changer la propriété display à "block"
        if (category === "Tous" || category === imageCategory) {
            image.style.display = "block";
        }
        // Sinon, changer la propriété display à "none"
        else {
            image.style.display = "none";
        }
    });
}



// Création du menu de catégories 
function createMenu(categories) {
    // Récupérer l’élément ul avec la classe “menu”
    const menu = document.querySelector(".menu");
    console.log(menu)
    // Créer un élément li avec la valeur “all” et l’ajouter au menu 
    const all = document.createElement("li");
    all.dataset.category = "all";
    all.textContent = "Tous les travaux";
    // menu.appendChild(all);
    // Parcourir les catégories et créer un élément li pour chaque catégorie 
    for (const category of categories) {
        const li = document.createElement("li");
        li.dataset.category = category;
        li.textContent = category;
        menu.appendChild(li);
    }

    // Ajouter un écouteur d’événement click sur chaque élément li 
    const menuItems = document.querySelectorAll(".menu l");
    for (const item of menuItems) {
        item.addEventListener("click", function () {
            // Récupérer la catégorie de l’élément cliqué 
            const category = this.dataset.category;
            // Appeler la fonction filterGallery avec la catégorie 
            filterGallery(category);
        });
    }
}

// Récupérer les catégories à partir de l’API
function getCategories() {
    fetch('http://localhost:5678/api/categories', {
        method: "GET",
        headers: {
            "accept": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY4Mzk3MDcwNywiZXhwIjoxNjg0MDU3MTA3fQ.FuQR-5daEdWNm9PUSNs3cVx6aLXmYsvyv14tULyQsrg"
        },
    }).then(response => response.json()) // ajoute cette ligne 
        .then(data => {
            console.log(data); // affiche les données JSON 
            // Appeler la fonction createMenu avec les catégories 
            /* createMenu(data.categories);*/
        });
}

// Sélectionner les boutons avec la classe btn-filter
const filtersButtons = document.querySelectorAll(".btn-filter");

// Ajouter des écouteurs d'événements sur les boutons
for (let button of filtersButtons) {
    button.addEventListener("click", function () {
        // Récupérer le texte du bouton cliqué
        let category = this.textContent;
        // Appeler la fonction filterGallery avec la catégorie
        filterGallery(category);
        // Enlever la classe active de tous les boutons
        for (let otherButton of filtersButtons) {
            otherButton.classList.remove("active");
        }
        // Ajouter la classe active au bouton cliqué
        this.classList.add("active");
    });
}


// Création des constantes globales 

const gallery = document.querySelector(".gallery");

const data = [
    {
        src: "assets/images/abajour-tahina.png",
        alt: "Abajour Tahina",
        category: "Objets",
    },
    {
        src: "assets/images/appartement-paris-v.png",
        alt: "Appartement Paris V",
        category: "Appartements",
    },
    {
        src: "assets/images/restaurant-sushisen-londres.png",
        alt: "Restaurant Sushisen - Londres",
        category: "Hôtels & restaurants",
    },
    {
        src: "assets/images/la-balisiere.png",
        alt: "Villa “La Balisiere” - Port Louis",
        category: "Hôtels & restaurants",
    },
    {
        src: "assets/images/structures-thermopolis.png",
        alt: "Structures Thermopolis",
        category: "Objets",
    },
    {
        src: "assets/images/appartement-paris-x.png",
        alt: "Appartement Paris X",
        category: "Appartements",
    },
    {
        src: "assets/images/le-coteau-cassis.png",
        alt: "Pavillon “Le coteau” - Cassis",
        category: "Hôtels & restaurants",
    },
    {
        src: "assets/images/villa-ferneze.png",
        alt: "Villa Ferneze - Isola d’Elba",
        category: "Hôtels & restaurants",
    },
    {
        src: "assets/images/appartement-paris-xviii.png",
        alt: "Appartement Paris XVIII",
        category: "Appartements",
    },
    {
        src: "assets/images/bar-lullaby-paris.png",
        alt: "Bar “Lullaby” - Paris",
        category: "Hôtels & restaurants",
    },
    {
        src: "assets/images/hotel-first-arte-new-delhi.png",
        alt: "Hotel First Arte - New Delhi",
        category: "Hôtels & restaurants",
    },
];

// Main

createGallery(data);
getWork()
getCategories();
main()

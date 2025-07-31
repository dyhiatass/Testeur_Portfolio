// Fonction pour gérer le changement d'apparence de la barre de navigation lors du défilement
function handleNavbarScroll() {
  // Sélectionne l'élément de la barre de navigation avec la classe .navbar
  const header = document.querySelector(".navbar");
  // Sélectionne tous les liens de navigation avec la classe .nav-link
  const items = document.querySelectorAll(".nav-link");
  // Sélectionne le logo ou nom de marque avec la classe .navbar-brand
  const nom = document.querySelector(".navbar-brand");

  // Ajoute un écouteur d'événement sur le défilement de la fenêtre
  window.onscroll = function () {
    // Récupère la position verticale actuelle du défilement
    const top = window.scrollY;
    // Si l'utilisateur a défilé de 100 pixels ou plus
    if (top >= 100) {
      // Ajoute la classe navbarDark pour modifier le style de la barre de navigation
      header.classList.add("navbarDark");
      // Ajoute la classe nom-color pour styliser le logo
      nom.classList.add("nom-color");
      // Applique la classe text-color à chaque lien de navigation pour changer leur couleur
      items.forEach((item) => {
        item.classList.add("text-color");
      });
    } else {
      // Si l'utilisateur est revenu en haut (moins de 100 pixels)
      // Retire la classe text-color de chaque lien de navigation
      items.forEach((item) => {
        item.classList.remove("text-color");
      });
      // Retire la classe navbarDark de la barre de navigation
      header.classList.remove("navbarDark");
      // Retire la classe nom-color du logo
      nom.classList.remove("nom-color");
    }
  };
}

// Fonction pour fermer automatiquement le menu burger sur petits écrans après un clic sur un lien
function handleNavbarCollapse() {
  // Sélectionne tous les éléments de navigation avec la classe .nav-item
  const navLinks = document.querySelectorAll(".nav-item");
  // Sélectionne l'élément du menu déroulant avec l'ID navbarSupportedContent
  const menuToggle = document.getElementById("navbarSupportedContent");

  // Ajoute un écouteur d'événement click à chaque élément de navigation
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      // Utilise l'API Bootstrap pour basculer (fermer/ouvrir) le menu déroulant
      new bootstrap.Collapse(menuToggle).toggle();
    });
  });
}

// Fonction pour générer dynamiquement les cartes de compétences à partir du fichier skills.json
function createSkillsFromJSON() {
  // Sélectionne le conteneur de la section compétences
  const container = document.querySelector("#skills .container");
  // Crée un élément div pour une nouvelle ligne (grille Bootstrap)
  let row = document.createElement("div");
  row.classList.add("row");

  // Récupère les données du fichier skills.json via une requête fetch
  fetch("data/skills.json")
    .then((response) => response.json()) // Convertit la réponse en JSON
    .then((data) => {
      // Parcourt chaque compétence dans les données JSON
      data.forEach((item, index) => {
        // Crée un élément div pour une carte de compétence
        const card = document.createElement("div");
        // Ajoute des classes Bootstrap pour une grille responsive
        card.classList.add("col-lg-3", "col-md-4", "col-sm-6", "mb-4");
        // Définit le contenu HTML de la carte avec l'image, le titre et le texte
        card.innerHTML = `
                    <div class="card skillsText h-100">
                        <div class="card-body d-flex flex-column">
                            <img src="${item.image}" alt="${item.title}" />
                            <h3 class="card-title mt-3">${item.title}</h3>
                            <p class="card-text mt-3">${item.text}</p>
                        </div>
                    </div>
                `;
        // Ajoute la carte à la ligne actuelle
        row.appendChild(card);
        // Si on atteint 4 cartes ou la fin des données, ajoute la ligne au conteneur
        if ((index + 1) % 4 === 0 || index === data.length - 1) {
          container.appendChild(row);
          // Crée une nouvelle ligne pour les cartes suivantes
          row = document.createElement("div");
          row.classList.add("row");
        }
      });
    });
}

// Fonction pour générer dynamiquement les cartes d'outils à partir du fichier tools.json
function createToolsFromJSON() {
  // Sélectionne le conteneur de la section outils
  const container = document.querySelector("#tools .container");
  // Ajoute la classe tools-grid pour styliser la disposition des cartes
  container.classList.add("tools-grid");

  // Récupère les données du fichier tools.json via une requête fetch
  fetch("data/tools.json")
    .then((response) => response.json()) // Convertit la réponse en JSON
    .then((data) => {
      // Parcourt chaque outil dans les données JSON
      data.forEach((item) => {
        // Crée un élément div pour une carte d'outil
        const card = document.createElement("div");
        // Ajoute la classe tool-card pour le style
        card.classList.add("tool-card");

        // Définit le contenu HTML de la carte avec l'image de l'outil
        card.innerHTML = `
                    <div class="card-image">
                        <img src="${item.image}" alt="${item.title}" />
                    </div>
                `;

        // Ajoute la carte au conteneur
        container.appendChild(card);
      });
    });
}

// Fonction pour générer dynamiquement les projets à partir du fichier portfolio.json avec pagination
function createPortfolioFromJSON() {
  // Sélectionne le conteneur de la section portfolio
  const container = document.querySelector("#portfolio .container");
  // Sélectionne le conteneur pour les points de navigation (pagination)
  const dotsContainer = document.getElementById("portfolioDots");
  // Crée un élément div pour la grille des projets
  let portfolio_grid = document.createElement("div");
  portfolio_grid.classList.add("portfolio_grid");

  // Définit le nombre de projets à afficher par vue (pagination)
  const projectsPerView = 3;

  // Récupère les données du fichier portfolio.json via une requête fetch
  fetch("data/portfolio.json")
    .then((response) => response.json()) // Convertit la réponse en JSON
    .then((data) => {
      // Parcourt chaque projet dans les données JSON
      data.forEach((item) => {
        // Crée un élément div pour une carte de projet
        const card = document.createElement("div");
        // Ajoute la classe portfolio_card pour le style
        card.classList.add("portfolio_card");

        // Définit le contenu HTML de la carte avec l'image, le titre, le texte et un lien
        card.innerHTML = `
          <div class="card portfolioContent">
            <div class="card-img-top">
              <img src="${item.image}" alt="${item.title}">
            </div>
            <div class="card-body">
              <h3 class="card-title">${item.title}</h3>
              <p class="card-text">${item.text}</p>
              <div class="card_btn">
                <a href="${item.link}" target="_blank">Lien</a>
              </div>
            </div>
          </div>
        `;
        // Ajoute la carte à la grille des projets
        portfolio_grid.appendChild(card);
      });

      // Ajoute la grille des projets au conteneur
      container.appendChild(portfolio_grid);

      // Calcule le nombre total de projets et le nombre maximum d'indices de départ
      const totalProjects = data.length;
      const maxStartIndex = totalProjects - projectsPerView + 1;

      // Fonction interne pour afficher une "fenêtre" de projets en fonction de l'index de départ
      function showProjects(startIndex) {
        // Sélectionne toutes les cartes de projet dans la grille
        const cards = portfolio_grid.querySelectorAll(".portfolio_card");
        // Parcourt les cartes pour afficher ou masquer selon l'index
        cards.forEach((card, i) => {
          if (i >= startIndex && i < startIndex + projectsPerView) {
            card.style.display = "block"; // Affiche les projets dans la fenêtre
          } else {
            card.style.display = "none"; // Masque les projets hors de la fenêtre
          }
        });
      }

      // Affiche les 3 premiers projets par défaut au chargement
      showProjects(0);

      // Crée les points de navigation pour la pagination
      for (let i = 0; i < maxStartIndex; i++) {
        // Crée un élément span pour chaque point
        const dot = document.createElement("span");
        // Ajoute la classe dot et active pour le premier point
        dot.className = i === 0 ? "dot active" : "dot";
        // Ajoute le point au conteneur des points
        dotsContainer.appendChild(dot);

        // Ajoute un écouteur d'événement clic pour chaque point
        dot.onclick = () => {
          // Affiche les projets correspondant à l'index du point
          showProjects(i);

          // Met à jour les classes des points pour indiquer l'état actif
          dotsContainer.querySelectorAll(".dot").forEach((d) => d.classList.remove("active"));
          dot.classList.add("active");
        };
      }
    });
}

// Exécute toutes les fonctions au chargement de la page
handleNavbarScroll(); // Active la gestion du défilement de la navbar
handleNavbarCollapse(); // Active la fermeture du menu burger
createSkillsFromJSON(); // Génère les cartes de compétences
createToolsFromJSON(); // Génère les cartes d'outils
createPortfolioFromJSON(); // Génère la grille de projets avec pagination
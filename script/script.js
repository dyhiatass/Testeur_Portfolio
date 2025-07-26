// Function to add the "navbarDark" class to the navbar on scroll
function handleNavbarScroll() {
    const header = document.querySelector(".navbar");
    const items = document.querySelectorAll(".nav-link");
    const nom = document.querySelector(".navbar-brand");
    window.onscroll = function () {
        const top = window.scrollY;
        if (top >= 100) {
            header.classList.add("navbarDark");
            nom.classList.add("nom-color");
            items.forEach((item) => {
                item.classList.add("text-color");
            })
        } else {
            items.forEach((item) => {
                item.classList.remove("text-color");
            })
            header.classList.remove("navbarDark");
            nom.classList.remove("nom-color");
        
        }
    };
}

// Function to handle navbar collapse on small devices after a click
function handleNavbarCollapse() {
    const navLinks = document.querySelectorAll(".nav-item");
    const menuToggle = document.getElementById("navbarSupportedContent");

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            new bootstrap.Collapse(menuToggle).toggle();
        });
    });
}

// Function to dynamically create HTML elements from the JSON file
function createSkillsFromJSON() {
    const container = document.querySelector("#skills .container");
    let row = document.createElement("div");
    row.classList.add("row");

    // Load the JSON file
    fetch("data/skills.json")
        .then((response) => response.json())
        .then((data) => {
            
            // Iterate through the JSON data and create HTML elements
            data.forEach((item, index) => {
                const card = document.createElement("div");
                card.classList.add("col-lg-3", "mt-3");
                card.innerHTML = `
                    <div class="card skillsText">
                        <div class="card-body">
                            <img src="./images/${item.image}" />
                            <h5 class="card-title mt-3">${item.title}</h5>
                            <p class="card-text mt-3">${item.text}</p>
                        </div>
                    </div>
                `;

                // Append the card to the current row
                row.appendChild(card);

                // If the index is a multiple of 3 or it's the last element, create a new row
                if ((index + 1) % 4 === 0 || index === data.length - 1) {
                    container.appendChild(row);
                    row = document.createElement("div");
                    row.classList.add("row");
                }
            });
        });
}

function createToolsFromJSON() {
    const container = document.querySelector("#tools .container");

    // Ajoute une classe Flexbox au conteneur pour la grille
    container.classList.add("tools-grid");

    fetch("data/tools.json")
        .then((response) => response.json())
        .then((data) => {
            data.forEach((item) => {
                const card = document.createElement("div");
                card.classList.add("tool-card");

                card.innerHTML = `
                    <div class="card-image">
                    <img src="./images/${item.image}" alt="${item.title}" />
                    </div>
                `;

                container.appendChild(card);
            });
        });
}


// Function to dynamically create HTML elements from the JSON file
function createPortfolioFromJSON() {
  const container = document.querySelector("#portfolio .container");
  const dotsContainer = document.getElementById("portfolioDots");
  let portfolio_grid = document.createElement("div");
  portfolio_grid.classList.add("portfolio_grid");

  const projectsPerView = 3;

  fetch("data/portfolio.json")
    .then((response) => response.json())
    .then((data) => {
      // Création des cartes projets
      data.forEach((item) => {
        const card = document.createElement("div");
        card.classList.add("portfolio_card");

        card.innerHTML = `
          <div class="card portfolioContent">
            <div class="card-img-top">
              <img src="images/${item.image}" alt="${item.title}">
            </div>
            <div class="card-body">
              <h4 class="card-title">${item.title}</h4>
              <p class="card-text">${item.text}</p>
              <div class="text-center">
                <a href="${item.link}" target="_blank">Lien</a>
              </div>
            </div>
          </div>
        `;
        portfolio_grid.appendChild(card);
      });

      container.appendChild(portfolio_grid);

      const totalProjects = data.length;
      const maxStartIndex = totalProjects - projectsPerView + 1;

      // Fonction pour afficher une "fenêtre" de projets
      function showProjects(startIndex) {
        const cards = portfolio_grid.querySelectorAll(".portfolio_card");
        cards.forEach((card, i) => {
          if (i >= startIndex && i < startIndex + projectsPerView) {
            card.style.display = "block";
          } else {
            card.style.display = "none";
          }
        });
      }

      // Affiche les 3 premiers projets par défaut
      showProjects(0);

      // Crée les points (1 point par déplacement d’un projet)
      for (let i = 0; i < maxStartIndex; i++) {
        const dot = document.createElement("span");
        dot.className = i === 0 ? "dot active" : "dot";
        dotsContainer.appendChild(dot);

        dot.onclick = () => {
          showProjects(i);

          // Met à jour les classes actives
          dotsContainer.querySelectorAll(".dot").forEach(d => d.classList.remove("active"));
          dot.classList.add("active");
        };
      }
    });
}



// Call the functions to execute the code
handleNavbarScroll();
handleNavbarCollapse();
createSkillsFromJSON();
createToolsFromJSON();
createPortfolioFromJSON();

function getWorks() {
    fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(allWorks => {
        displayWorks(allWorks);
        setupFilter(allWorks);
        setupFilterEventListeners(allWorks);
    })
    .catch(error => {console.error('Erreur Fetch:', error);
    });
}


function displayWorks(allWorks) {
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = "";
    for(let i = 0; i < allWorks.length; i++) {
        const work = allWorks[i];

        const baliseFigure = document.createElement('figure');
        const baliseImg = document.createElement('img');
        const baliseFigcaption = document.createElement('figcaption');

        baliseFigure.id = `work-${work.id}`;
        baliseImg.src = work.imageUrl;
        baliseImg.alt = work.title;
        baliseFigcaption.textContent = work.title;

        baliseFigure.appendChild(baliseImg);
        baliseFigure.appendChild(baliseFigcaption);

        gallery.appendChild(baliseFigure);
    }
}

function setupFilter() {
    fetch("http://localhost:5678/api/categories")
    .then(response => response.json())
    .then(categoryWorks => {
        createFiltersButtons(categoryWorks); 
    }); 
}

function createFiltersButtons(categoryWorks) {
    const filtersDiv = document.querySelector('.filters'); //On sélectionne la div contenant les boutons filtres
    filtersDiv.innerHTML = ''; //On la vide de son contenu (tant que je n'ai pas supprimé le HTML)

    //On crée un bouton "tous", et on lui assigne l'id "all" et les classes pour le CSS
    const allBtn = document.createElement('button');
    allBtn.innerText = "Tous"
    allBtn.id = "all";
    allBtn.classList.add('filter-btn');
    allBtn.classList.add('active');

    filtersDiv.appendChild(allBtn);

    //Création d'un bouton par catégorie
    categoryWorks.forEach(category => {
        const categoryBtn = document.createElement('button');
        categoryBtn.textContent = category.name;
        categoryBtn.id = category.id;
        categoryBtn.classList.add('filter-btn');
        categoryBtn.classList.add(`btn-cate-${category.id}`);

        filtersDiv.appendChild(categoryBtn);
    })
}

function setupFilterEventListeners(allWorks) {
    const filtersDiv = document.querySelector('.filters');

    filtersDiv.addEventListener('click', (event) => {
        const clicked = event.target;

        if (clicked.classList.contains('filter-btn')) {
            const buttons = document.querySelectorAll('.filter-btn');
            buttons.forEach(button => button.classList.remove('active'));

            clicked.classList.add('active');

            let categoryId = clicked.id;

            filterWorks(categoryId, allWorks)
        }
    })
}

function filterWorks(categoryId, allWorks) {
     let filteredWorks; // On crée une variable pour stocker la liste des travaux filtrés, sans lui assigner de valeur.

     if(categoryId === 'all') { //Si categoryId = all (tous les travaux)
         filteredWorks = allWorks; // filteredWorks contient toutes les données (data)
     } else { // Sinon, on doit faire un vrai filtrage selon la catégorie choisie
         filteredWorks = allWorks.filter(work => work.categoryId.toString() === categoryId);
     }
     displayWorks(filteredWorks);
}

getWorks();

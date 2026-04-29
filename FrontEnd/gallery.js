fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(data => {
        displayWorks(data);
        setupFilter(data);
    })
    .catch(error => {console.error('Erreur Fetch:', error);
    });

function displayWorks(data) {
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = "";
    for(let i = 0; i < data.length; i++) {
        const work = data[i];

        const baliseFigure = document.createElement('figure');
        const baliseImg = document.createElement('img');
        const baliseFigcaption = document.createElement('figcaption');

        baliseImg.src = work.imageUrl;
        baliseImg.alt = work.title;
        baliseFigcaption.textContent = work.title;

        baliseFigure.appendChild(baliseImg);
        baliseFigure.appendChild(baliseFigcaption);

        gallery.appendChild(baliseFigure);
    }
}

function setupFilter (data) {

    const filtersButtons = document.querySelectorAll('.filter-btn');
    console.log(filtersButtons);

    filtersButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            console.log('Catégorie cliquée', category); 
            
            // Ici vous appellerez la fonction pour filtrer les travaux :
            filterWorks(category, data);

            // Gestion classe active
            filtersButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active')
        })
    })
}
function filterWorks(category, data) {
    let filteredWorks; // On crée une variable pour stocker la liste des travaux filtrés, sans lui assigner de valeur.

    if(category === 'all') { //Si data-category = all (tous les travaux)
        filteredWorks = data; // filteredWorks contient toutes les données (data)
    } else { // Sinon, on doit faire un vrai filtrage selon la catégorie choisie
        filteredWorks = data.filter(work => work.categoryId.toString() === category);
    }

    displayWorks(filteredWorks);
}
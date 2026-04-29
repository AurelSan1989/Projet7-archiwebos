fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        displayWorks(data);
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
function getModalWorks() {
    fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(allWorks => {
        displayModalWorks(allWorks);
    })
    .catch(error => {console.error('Erreur Fetch:', error);
    });
    }

function displayModalWorks(allWorks) {
    const modalWorks = document.getElementById('js-modal_works');
    modalWorks.innerHTML =""

    for (let i = 0; i < allWorks.length; i++) {
        const work = allWorks[i]

        const modalFigure = document.createElement('figure');
        modalFigure.classList.add('modal-works_item');
        modalFigure.id = `work-${work.id}`
        const modalBtn = document.createElement('button');
        modalBtn.classList.add('btn-delete_item')
        modalBtn.innerHTML = `<i class="fa-solid fa-trash-can" style="color: rgb(255, 255, 255);"></i>`;
        modalBtn.id = `delete-${work.id}`
        modalBtn.addEventListener('click', function(){
            deleteWork(work.id)
        })
        const modalImg = document.createElement('img');
        modalImg.src = work.imageUrl;
        modalImg.alt = work.title;

        modalFigure.appendChild(modalBtn);
        modalFigure.appendChild(modalImg);

        modalWorks.appendChild(modalFigure);
    }
}

getModalWorks();

function openModal() {
    const modal = document.getElementById("js-modal");
    modal.classList.remove('hidden');
}

const modifyBtn = document.getElementById("modifyBtn");
modifyBtn.addEventListener("click", openModal);

function closeModal() {
    const modal = document.getElementById("js-modal");
    modal.classList.add('hidden');
    getWorks();
}

const btnClose = document.getElementById('js-btn_close');
btnClose.addEventListener('click', closeModal);

const bgModal = document.getElementById('js-modal');
bgModal.addEventListener('click', function(event) {
    if (event.target === event.currentTarget) {
        closeModal();
    }
});

function showAddViews() {
    const modalContentDel = document.getElementById("modal-content_del");
    modalContentDel.classList.add('hidden');

    const modalContentAdd = document.getElementById('modal-content_add');
    modalContentAdd.classList.remove('hidden');

    const btnBack = document.getElementById('js-btn_back');
    btnBack.classList.remove('hidden')
}

const btnAddViews = document.getElementById('modal-cta_btn');
btnAddViews.addEventListener('click', showAddViews)

function showGalleryViews() {
    const modalContentDel = document.getElementById("modal-content_del");
    modalContentDel.classList.remove('hidden');

    const modalContentAdd = document.getElementById('modal-content_add');
    modalContentAdd.classList.add('hidden');

    const btnBack = document.getElementById('js-btn_back');
    btnBack.classList.add('hidden');
}

const btnBack = document.getElementById('js-btn_back');
btnBack.addEventListener('click', showGalleryViews)

function setupCategory() {
    fetch('http://localhost:5678/api/categories')
    .then(response => response.json())
    .then (categoryWorks => {
        displayCategoryInModal(categoryWorks);        
    })
}

function displayCategoryInModal(categoryWorks) {
    const selectCategory = document.getElementById('category');
    const nullCategory = document.createElement('option');
    selectCategory.appendChild(nullCategory);

    for (let i = 0; i < categoryWorks.length; i++) {
        const optionCategory = document.createElement('option');
        optionCategory.value = categoryWorks[i].id;
        optionCategory.innerText = categoryWorks[i].name;
        selectCategory.appendChild(optionCategory);
    }
}
    
setupCategory();

function deleteWork(workId) {
    fetch('http://localhost:5678/api/works/' + workId, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
    .then((res) => {
        if (res.status < 400) {
        document.querySelectorAll(`[id="work-${workId}"]`).forEach(el => el.remove());
        }
    })
}

function addWork() {
    const inputFile = document.getElementById('picture').files[0]; 
    const inputTitle = document.getElementById('title').value;
    const inputCategory = parseInt(document.getElementById('category').value);

    if (!inputFile || !inputTitle || !inputCategory) {
        const errorMessage = document.querySelector('.error-message');
        errorMessage.classList.remove('hidden');
        return
    }

    const formData = new FormData();
    formData.append('image', inputFile);
    formData.append('title', inputTitle);
    formData.append('category', inputCategory);

    fetch("http://localhost:5678/api/works/", {
        method: 'POST',
         headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: formData
    })
    .then(response => {
        if (response.status >= 400) {
            alert("Echec de l'envoi");
            throw new Error("Echec de l'envoi");
        } else {
            return response.json();
        }
    })
    .then(newWork => {
        getModalWorks();
        showGalleryViews();
        const gallery = document.querySelector('.gallery');
        const newFigure = document.createElement('figure');
        newFigure.id = `work-${newWork.id}`
        const newFigImg = document.createElement('img');
        newFigImg.src = newWork.imageUrl
        const newFigcaption = document.createElement('figcaption');
        newFigcaption.innerText = newWork.title;

        newFigure.appendChild(newFigImg);
        newFigure.appendChild(newFigcaption);

        gallery.appendChild(newFigure);

        document.querySelector('.modal-add_form').reset();
        newImg.classList.add('hidden');
        document.querySelector('.label-picture i').classList.remove('hidden');
        document.querySelector('.fake-btn').classList.remove('hidden');
        document.querySelector('.label-picture_info').classList.remove('hidden');
    })
}



const modalAddForm = document.querySelector('.modal-add_form');
modalAddForm.addEventListener('submit', function(event) {
    event.preventDefault();
    addWork();
})

const inputPicture = document.getElementById('picture');

const newImg = document.getElementById('newImg');

inputPicture.addEventListener('change', function() {
    const  [file] = inputPicture.files
    if (file) {
        newImg.src = URL.createObjectURL(file);
        newImg.classList.remove('hidden');
        const labelIcone  = document.querySelector('.label-picture i');
        labelIcone.classList.add('hidden');
        const fakeBtn = document.querySelector('.fake-btn');
        fakeBtn.classList.add('hidden');
        const labelInfo = document.querySelector('.label-picture_info');
        labelInfo.classList.add('hidden');
    }
})

const btnActive = document.getElementById('modal-add_btn');


function checkForm(){
    const errorMessage = document.querySelector('.error-message');

    if (document.getElementById('title').value !== "" 
    && document.getElementById('category').value !== "" 
    && document.getElementById('picture').files[0]) {
        btnActive.classList.add('add-btn_active');
        errorMessage.classList.add('hidden');

    } else {
        btnActive.classList.remove('add-btn_active');
    }
}

inputPicture.addEventListener('change', checkForm)

const inputTitle = document.getElementById('title');
inputTitle.addEventListener('input', checkForm);
const inputCategory = document.getElementById('category');
inputCategory.addEventListener('change', checkForm)
function checkUserLogin() {
    const token = localStorage.getItem('token');

    const logInBtn = document.getElementById('logIn');
    const filterDiv = document.querySelector('#portfolio .filters');
    const modifyBtn = document.getElementById('modifyBtn');
    const editionBanner = document.querySelector('.edition-banner');
    

    //On vérifie la présence du token 
    if (token) { //Si le token n'est pas nul, l'utilisateur est connecté
        // On change le contenu textuel de l'élément "login"
        logInBtn.textContent = "Logout";
        logInBtn.onclick = function(event) {
            event.preventDefault();
            localStorage.removeItem('token');
            window.location.reload();
        }

        if (modifyBtn) {
            modifyBtn.classList.remove('hidden');
        }
        if (filterDiv) {
            filterDiv.classList.add('hidden');
        }
        if (editionBanner) {
            editionBanner.classList.remove('hidden')
        }
    } else { // Sinon, l'utilisateur est deconnecté
        logInBtn.textContent = "Login";

        if (modifyBtn) {
            modifyBtn.classList.add('hidden');
        }
        if (filterDiv) {
            filterDiv.classList.remove('hidden');
        }
    }
}

window.addEventListener('DOMContentLoaded', () => {
    checkUserLogin();
})
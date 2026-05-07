function checkUserLogin() {
    const token = localStorage.getItem('token');

    const logInBtn = document.getElementById('logIn');
    const filterDiv = document.querySelector('#portfolio .filters');
    console.log(filterDiv);    
    const modifyBtn = document.getElementById('modifyBtn');
    console.log(modifyBtn);
    const editionBanner = document.querySelector('.edition-banner');
    

    //On vérifie la présence du token 
    if (token) {
        console.log("Utilisateur connecté");
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
    } else {
        console.log("Aucun utilisateur connecté");
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
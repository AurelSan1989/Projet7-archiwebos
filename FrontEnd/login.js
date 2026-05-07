const formElement = document.querySelector('.login-form');
const emailInput = document.getElementById('email');
const passWordInput = document.getElementById('password');

formElement.addEventListener('submit', function(event) {
    event.preventDefault();

    // On récupère les valeurs saisies par l'utilisateur
    const userEmail = emailInput.value;
    const userPassword = passWordInput.value;
    
    // On prépare les données à envoyer dans le corps de la requête
    const userData = {
        email: userEmail,
        password : userPassword
    }

    fetch('http://localhost:5678/api/users/login', {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then (response => {
        if(!response.ok) {
            throw new Error ('Erreur dans l’identifiant ou le mot de passe');
        }
        return response.json();
    })
    .then (result => {
        console.log("Réponse de l'API :", result);
        console.log(result.token);
        // On stocke le token d'utilisateur dans le localStorage afin de garder la session ouverte
        localStorage.setItem('token', result.token);
        //On redirige l'utilisateur vers la page d'accueil
        window.location.href = "index.html";

    })
    .catch(error => {
        console.log(error.message)
        console.error('Erreur : ', error);
        let errorMessage = document.createElement('p');
        errorMessage.classList.add('error-message');
        errorMessage.innerText = error.message;
        logInSection.appendChild(errorMessage)
    })
})
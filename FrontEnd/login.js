const logInBtn = document.getElementById('logIn');
logInBtn.addEventListener('click', function(event) {
    event.preventDefault();
    const mainElement = document.querySelector('main');
    mainElement.innerHTML = "" //On vide la balise <main>

    //On crée une section avec l'id contact
    const logInSection = document.createElement('section');
    logInSection.id = "login";
    mainElement.appendChild(logInSection);

    //Création de la balise titre (h2)
    const pageTitle = document.createElement('h2');
    pageTitle.classList.add('login-title');
    pageTitle.textContent = 'Log in';
    logInSection.appendChild(pageTitle);

    //Création de la balise form
    const formElement = document.createElement('form');
    formElement.classList.add('login-form');
    logInSection.appendChild(formElement);

    //Création d'une balise fieldset pour regrouper un label et son input
    const emailGroup = document.createElement('fieldset');
    emailGroup.classList.add('form-group');

    //Création du label pour l'email
    const emailLabel = document.createElement('label');
    emailLabel.setAttribute('for', 'email');
    emailLabel.textContent = 'E-mail';
    emailGroup.appendChild(emailLabel); // On insère dans le fieldset 

    //Création de l'input pour l'email
    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.id = 'email';
    emailInput.name = 'email';
    emailGroup.appendChild(emailInput); // On insère dans le fieldset

    formElement.appendChild(emailGroup); // On insère le fieldset dans la balise form

    //Création d'une balise fieldset
    const passWordGroup = document.createElement('fieldset');
    passWordGroup.classList.add('form-group');

    //Création du label pour le mot de passe
    const passWordLabel = document.createElement('label');
    passWordLabel.setAttribute('for', 'password');
    passWordLabel.textContent = 'Mot de passe';
    passWordGroup.appendChild(passWordLabel); // On insère dans le fieldset

    //Création de l'input pour le mot de passe
    const passWordInput = document.createElement('input');
    passWordInput.type = 'password';
    passWordInput.id = "password"
    passWordInput.name = "password";
    passWordGroup.appendChild(passWordInput); // On insère dans le fieldset

    formElement.appendChild(passWordGroup); // On insère le fieldset dans la balise form

    //Création du bouton "Se connecter"
    const connectBtn = document.createElement('button');
    connectBtn.type = 'submit';
    connectBtn.classList.add('connect-btn');
    connectBtn.textContent = "Se connecter";
    formElement.appendChild(connectBtn); // On insère le boutton à la fin du formulaire

    //Création du lien "Mot de passe oublié"
    const formFooter = document.createElement('a');
    formFooter.classList.add('form-footer');
    formFooter.href = '#';
    formFooter.textContent = 'Mot de passe oublié';
    logInSection.appendChild(formFooter); // Qu'on insère après le formulaire

    formElement.addEventListener('submit', function(event) {
    event.preventDefault();

    // On récupère les valeurs saisies par l'utilisateur
    const userEmail = emailInput.value;
    const userPassword = passWordInput.value;
    
    // On prépare les données à envoyer dans le corps de la requête
    const data = {
        email: userEmail,
        password : userPassword
    }

    fetch('http://localhost:5678/api/users/login', {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(data)
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
})


const logInBtn = document.getElementById('logIn');
console.log(logInBtn);
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
})
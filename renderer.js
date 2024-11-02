// Liste des noms
const names = [];

// Fonction pour ajouter un nom à la liste et à l'interface utilisateur
function addName(name) {
    if (name) {
        names.push(name);
        const li = document.createElement('li');
        li.textContent = name;
        document.querySelector('.draw-results ol').appendChild(li);
    }
}

// Fonction pour réinitialiser la liste des noms et l'interface utilisateur
function reset() {
    names.length = 0;
    document.querySelector('.draw-results ol').innerHTML = '';
}

// Fonction pour tirer au sort les noms
function randomize() {
    const nameInput = document.querySelector('textarea[name="name-players"]');
    const nameList = nameInput.value.trim().split('\n').map(name => name.trim()).filter(name => name);

    if (nameList.length > 0) {
        reset();
        nameList.forEach(name => addName(name));

        const remainingPlayers = parseInt(document.getElementById('remaining-players').value, 10);
        const selectedNames = [];

        for (let i = 0; i < remainingPlayers && names.length > 0; i++) {
            const randomIndex = Math.floor(Math.random() * names.length);
            selectedNames.push(names.splice(randomIndex, 1)[0]);
        }

        //Les noms apparaissent dans la liste des résultats du tirage au sort (balise ol dans le fichier index.html)
        const ol = document.querySelector('.draw-results ol');
        ol.innerHTML = '';
        selectedNames.forEach(name => {
            const li = document.createElement('li');
            li.textContent = name;
            ol.appendChild(li);
        });
    } else {
        alert('Veuillez entrer au moins un nom.');
    }
}   
    // Ajout d'un écouteur d'événement au bouton "Tirer au sort"
    document.getElementById('btn-tirage-sort').addEventListener('click', randomize);
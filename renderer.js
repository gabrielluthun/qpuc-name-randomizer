// Liste des noms
let names = [];
// Objet pour suivre le nombre de tirages pour chaque nom
let drawCounts = {};

// Fonction pour ajouter un nom à la liste et à l'interface utilisateur
function addName(name) {
    if (name) {
        names.push(name);
        const li = document.createElement('li');
        li.textContent = name;
        document.querySelector('.draw-results ol').appendChild(li);

        // Ajouter le nom à la section "Nombre de tirages par joueur" si ce n'est pas déjà fait
        if (!document.getElementById(`count-${name}`)) {
            const ul = document.querySelector('.number-game-of-players ul');
            const liCount = document.createElement('li');
            liCount.textContent = `${name} : 0 fois`;
            liCount.id = `count-${name}`;
            ul.appendChild(liCount);
        }
    }
}

function reset() {
    names = [];
    drawCounts = {};
    const ol = document.querySelector('.draw-results ol');
    ol.innerHTML = '';
}

function resetDrawCounts() {   
    reset();
    const ul = document.querySelector('.number-game-of-players ul');
    ul.innerHTML = '';
}

// Fonction pour incrémenter le nombre de tirages
function incrementNumberOfDraws(name) {
    // Mettre à jour le nombre de tirages pour le nom sélectionné
    if (!drawCounts[name]) {
        drawCounts[name] = 0;
    }
    drawCounts[name]++;

    // Mettre à jour l'affichage du nombre de tirages
    const liCount = document.getElementById(`count-${name}`);
    liCount.textContent = `${name} : ${drawCounts[name]} fois`;

    // Changer la couleur si le nombre de tirages est 3 ou plus
    switch (drawCounts[name]) {
        case 1:
            liCount.style.color = 'greenyellow';
            break;
        case 2:
            liCount.style.color = 'yellow';
            break;
        case 3:
            liCount.style.color = 'orange';
            break;
        case 4:
            liCount.style.color = 'red';
            break;
        default:
            liCount.style.color = 'red';
            break;
    }
}

// Fonction pour tirer au sort les noms
function randomize() {
    const nameInput = document.querySelector('textarea[name="name-players"]');
    const nameList = nameInput.value.trim().split('\n').map(name => name.trim()).filter(name => name);

    if (nameList.length > 0) {
        // Ne pas réinitialiser les noms et les comptes de tirages ici pour conserver les données
        nameList.forEach(name => {
            if (!names.includes(name)) {
                addName(name);
            }
        });

        const remainingPlayers = Math.min(parseInt(document.getElementById('remaining-players').value, 10), nameList.length);
        const selectedNames = new Set();

        while (selectedNames.size < remainingPlayers) {
            const randomIndex = Math.floor(Math.random() * nameList.length);
            const selectedName = nameList[randomIndex];
            if (!selectedNames.has(selectedName)) {
                selectedNames.add(selectedName);
            }
        }

        // Les noms apparaissent dans la liste des résultats du tirage au sort (balise ol dans le fichier index.html)
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

function deletePlayer(name) {
    if (name && names.includes(name)) {
        const confirmation = confirm(`Voulez-vous vraiment supprimer ${name} de la liste ?`);
        if (confirmation) {
            // Supprimer le nom de la liste des noms
            names = names.filter(n => n !== name);

            // Supprimer le nom de l'affichage des résultats du tirage au sort
            const ol = document.querySelector('.draw-results ol');
            const liToRemove = Array.from(ol.children).find(li => li.textContent === name);
            if (liToRemove) {
                ol.removeChild(liToRemove);
            }

            // Supprimer le nom de l'affichage du nombre de tirages par joueur
            const ul = document.querySelector('.number-game-of-players ul');
            const liCountToRemove = document.getElementById(`count-${name}`);
            if (liCountToRemove) {
                ul.removeChild(liCountToRemove);
            }

            // Supprimer le nom du compteur de tirages
            delete drawCounts[name];
        }
    } else {
        alert('Le nom indiqué n\'est pas présent dans la liste.');
    }
}


// Ajout d'un écouteur d'événement au bouton "Tirer au sort"
document.getElementById('btn-tirage-sort').addEventListener('click', randomize);

document.getElementById('validerTirage').addEventListener('click', () => {
    const selectedNames = document.querySelectorAll('.draw-results ol li');
    selectedNames.forEach(li => {
        const name = li.textContent;
        incrementNumberOfDraws(name);
    });
});

document.querySelector('#reset-all').addEventListener('click', resetDrawCounts);

document.getElementById('delete-player').addEventListener('click', () => {
    const name = prompt('Veuillez entrer le prénom du joueur à supprimer :');
    deletePlayer(name);
});
let enemyCards = [];
let playerCards = [];
let playedCards = [];
let newCards = [];
let startButton;
let buttonDiv;
window.onload = function () {
    startButton = document.getElementById("startButton");
    buttonDiv = document.getElementById("button");
    startButton.addEventListener("click", function () {
        buttonDiv.style.display = "none";
        startGame();
    });
};
function startGame() {
    generateCards();
    handOut(enemyCards, 5, true);
    handOut(playerCards, 5, false);
    handOut(playedCards, 1, false);
    reloadUI();
    if ((Math.random() * 100) % 2 == 0) {
        enemyMove();
    }
}
function gameOver(loser) {
    enemyCards = [];
    playerCards = [];
    playedCards = [];
    newCards = [];
    let startButton = document.getElementById("button");
    startButton.style.display = "block";
    clearField();
    if (loser) {
        alert("Wasted");
    }
    else {
        alert("You won");
    }
}
function generateField() {
    let enemyField = document.getElementById("enemy");
    let playerField = document.getElementById("player");
    let newCardsField = document.getElementById("newCards");
    let playedCardsField = document.getElementById("playedCards");
    for (let i = 0; i < enemyCards.length; i++) {
        let unoDiv = document.createElement("div");
        unoDiv.setAttribute("class", "uno");
        let backDiv = document.createElement("div");
        backDiv.setAttribute("class", "back");
        backDiv.appendChild(unoDiv);
        enemyField.appendChild(backDiv);
    }
    let NCunoDiv = document.createElement("div");
    NCunoDiv.setAttribute("class", "uno");
    let NCbackDiv = document.createElement("div");
    NCbackDiv.setAttribute("class", "back");
    NCbackDiv.addEventListener("click", function () {
        handOut(playerCards, 1, true);
        reloadUI();
        enemyMove();
    });
    NCbackDiv.appendChild(NCunoDiv);
    newCardsField.appendChild(NCbackDiv);
    let PCunoDiv = document.createElement("div");
    PCunoDiv.setAttribute("class", "uno");
    let PCDiv = document.createElement("div");
    switch (playedCards[playedCards.length - 1].colour) {
        case "yellow": {
            PCDiv.setAttribute("class", "yellowFront");
            break;
        }
        case "red": {
            PCDiv.setAttribute("class", "redFront");
            break;
        }
        case "blue": {
            PCDiv.setAttribute("class", "blueFront");
            break;
        }
        case "green": {
            PCDiv.setAttribute("class", "greenFront");
            break;
        }
        default: {
            console.log("error");
            break;
        }
    }
    PCDiv.innerHTML = "" + playedCards[playedCards.length - 1].value;
    PCDiv.appendChild(PCunoDiv);
    playedCardsField.appendChild(PCDiv);
    for (let i = 0; i < playerCards.length; i++) {
        let playerUnoDiv = document.createElement("div");
        playerUnoDiv.setAttribute("class", "uno");
        let playerDiv = document.createElement("div");
        switch (playerCards[i].colour) {
            case "yellow": {
                playerDiv.setAttribute("class", "yellowFront");
                break;
            }
            case "red": {
                playerDiv.setAttribute("class", "redFront");
                break;
            }
            case "blue": {
                playerDiv.setAttribute("class", "blueFront");
                break;
            }
            case "green": {
                playerDiv.setAttribute("class", "greenFront");
                break;
            }
            default: {
                console.log("error");
                break;
            }
        }
        playerDiv.innerHTML = "" + playerCards[i].value;
        playerDiv.addEventListener("click", function () {
            checkCard(i);
            reloadUI();
        });
        playerDiv.appendChild(playerUnoDiv);
        playerField.appendChild(playerDiv);
    }
}
function checkCard(i) {
    if (playerCards[i].colour == playedCards[playedCards.length - 1].colour ||
        playerCards[i].value == playedCards[playedCards.length - 1].value) {
        playedCards.push(playerCards[i]);
        playerCards.splice(i, 1);
        reloadUI();
        playedCards[playedCards.length - 1].covered = false;
        if (playerCards.length == 0) {
            gameOver(false);
        }
        else {
            enemyMove();
        }
    }
}
function reloadUI() {
    clearField();
    generateField();
}
function enemyMove() {
    let playedACard = false;
    for (let i = 0; i < enemyCards.length; i++) {
        if (enemyCards[i].colour == playedCards[playedCards.length - 1].colour ||
            enemyCards[i].value == playedCards[playedCards.length - 1].value) {
            playedCards.push(enemyCards[i]);
            enemyCards.splice(i, 1);
            playedACard = true;
            reloadUI();
            if (enemyCards.length == 0) {
                gameOver(true);
            }
            break;
        }
    }
    if (!playedACard) {
        handOut(enemyCards, 1, true);
        reloadUI();
    }
}
function generateCards() {
    let tempArray = [];
    for (let i = 1; i <= 10; i++) {
        let newBlueCard = {
            value: i,
            colour: "blue",
            covered: true
        };
        let newGreenCard = {
            value: i,
            colour: "green",
            covered: true
        };
        let newRedCard = {
            value: i,
            colour: "red",
            covered: true
        };
        let newYellowCard = {
            value: i,
            colour: "yellow",
            covered: true
        };
        tempArray.push(newBlueCard);
        tempArray.push(newGreenCard);
        tempArray.push(newRedCard);
        tempArray.push(newYellowCard);
    }
    mixCards(tempArray);
}
function mixCards(deck) {
    let temp = [];
    while (deck.length != 0) {
        let rndNumber = Math.floor(Math.random() * deck.length);
        temp.push(deck[rndNumber]);
        deck.splice(rndNumber, 1);
    }
    for (let i in temp) {
        temp[i].covered = true;
    }
    newCards = temp;
}
function handOut(deck, count, covered) {
    for (let i = 0; i < count; i++) {
        if (newCards.length == 0) {
            mixCards(playedCards);
        }
        deck.push(newCards.pop());
        deck[deck.length - 1].covered = covered;
    }
}
function clearField() {
    let enemyField = document.getElementById("enemy");
    while (enemyField.firstChild) {
        enemyField.removeChild(enemyField.firstChild);
    }
    let playerField = document.getElementById("player");
    while (playerField.firstChild) {
        playerField.removeChild(playerField.firstChild);
    }
    let newCardsField = document.getElementById("newCards");
    while (newCardsField.firstChild) {
        newCardsField.removeChild(newCardsField.firstChild);
    }
    let playedCardsField = document.getElementById("playedCards");
    while (playedCardsField.firstChild) {
        playedCardsField.removeChild(playedCardsField.firstChild);
    }
}
//# sourceMappingURL=62-TS-Example.js.map
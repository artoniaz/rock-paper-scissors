//obiekty przechowujące dane dotyczące wyboru oraz statystyk

const gameChoice = {
    playerChoice: "",
    aiChoice: "",
};

const stats = {
    numbers: 0,
    win: 0,
    lost: 0,
    draw: 0,
};

//złapanie obrazków

const imgs = document.querySelectorAll('.imgs .img');

//funkcja wyboru gracza

const playerChoice = (e) => {
    imgs.forEach(el => el.style.boxShadow = ""); //czyszczę poprzedni wybór
    gameChoice.playerChoice = e.target.dataset.option; //zapisuje wybór gracza
    e.target.style.boxShadow = "0 0 3rem red";
};

for (let el of imgs){
  el.addEventListener("click", playerChoice);
};

//funkcja wyboru ai

function aiChoice() {
    gameChoice.aiChoice = imgs[Math.floor(Math.random()*3)].dataset.option;
}

//porównanie wyborów
function whoWin() {
    if (gameChoice.playerChoice === gameChoice.aiChoice){
        return "draw";
    } else if (gameChoice.playerChoice == "kamień" && gameChoice.aiChoice == "nożyce" || gameChoice.playerChoice === "papier" && gameChoice.aiChoice === "kamień"){
        return "win";
    }else if (gameChoice.playerChoice === "nożyce" && gameChoice.aiChoice === "papier") {
        return "alsoWin"
    } else {
        return "lost";
    }
}

//wypisanie wyborów i zwycięzy

function printChoices(result) {
    document.querySelector('[data-summary = "player-choice"]').innerHTML = gameChoice.playerChoice;
    document.querySelector('[data-summary = "ai-choice"]').innerHTML = gameChoice.aiChoice;
    let outcome = document.querySelector('[data-summary="winner"]');

    if (result === "draw"){
        outcome.innerHTML = "remis";
        outcome.style.color = "black";
    } else if (result === "win"){
        outcome.innerHTML = "zwycięstwo w chwale i glorii triumfu";
        outcome.style.color = "green";
    } else if (result === "alsoWin"){
        outcome.innerHTML = "pyrrusowe zwycięstwo";
        outcome.style.color = "green";
    } else {
        outcome.innerHTML = "sromotna porażka";
        outcome.style.color = "red";
    }
};

//funkcja licząca statystyki
function statistics(result) {
    stats.numbers++;
    document.querySelector('.numbers span').innerHTML = stats.numbers;
    if (result === "draw"){
        stats.draw++;
        document.querySelector('.draw span').innerHTML = stats.draw;
    } else if (result === "win" || result === "alsoWin"){
        stats.win++;
        document.querySelector('.win span').innerHTML = stats.win;
    }
    else {
        stats.lost++;
        document.querySelector('.lost span').innerHTML = stats.lost;
    }
}

//reset wyboru gracza

function reset() {
    gameChoice.playerChoice = "";
    imgs.forEach(el => el.style.boxShadow = "");
}


//funkcja sterująca grą

function startGame() {
    if (gameChoice.playerChoice === ""){
        alert("Musisz wybrać dowolną opcję, by zacząć grę.");
        return null;
    }
    aiChoice();
    printChoices(whoWin());
    statistics(whoWin());
    reset();
}

//wywołanie funkcji sterującej na click buttona startGame

const mainBtn = document.querySelector('.startGame');

mainBtn.addEventListener("mouseover", function () {
    this.style.backgroundColor = "black";
    this.style.color = "white";
});

mainBtn.addEventListener("mouseleave", function () {
    this.style.backgroundColor = "white";
    this.style.color = "black";
});

mainBtn.addEventListener("click", startGame);

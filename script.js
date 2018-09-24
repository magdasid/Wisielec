let game = (function() {
    let words = ['madagaskar', 'shrek', 'herkules', 'zaplątani', 'nietykalni', 'iniemamocni', 'minionki', 'siedem', 'pianista', 'django', 'gladiator', 'służące', 'interstellar', 'zwierzogród', 'filadelfia', 'pokój', 'blow', 'seksmisja', 'iluzjonista', 'deadpool', 'uprowadzona', 'sherlock', 'narcos', 'wikingowie', 'suits', 'przyjaciele' ];
    let randomIndex = Math.floor(Math.random() * words.length);
    let gameWord = words[randomIndex];
    let wordLength = gameWord.length;
    let numberOfErrors = 0;
    let usedLetters = [];
    let drawBoard = () => {
        for (let i=0; i<wordLength; i++) {
            let div = document.createElement("div");
            div.classList.add("boardField");
            div.classList.add("class"+i);
            document.getElementById("board").appendChild(div);
        }
    };
    let checkLetter = (letter) => {
        document.getElementById("letter").value = '';
        if(letter.length>1) {
            document.getElementById("error-message").innerHTML = letter +" to nie jedna litera!";
        }
        else {
            for (let j=0; j<gameWord.length; j++) {
                if(gameWord[j] === letter) {
                    let className = "class"+j;
                    document.getElementsByClassName(className)[0].innerHTML = letter;
                }     
            }
            if (gameWord.includes(letter) === false){
                addPoints();
                document.getElementById("used-letters").innerHTML += " "+letter;
                if (numberOfErrors===6) {
                    document.getElementById("error-message").innerHTML = "Przegrywasz! " + "<i class='fas fa-frown'></i>" + " Poprawny tytuł to: " + gameWord;
                    blockInputs();
                } else {
                    document.getElementById("error-message").innerHTML = "Brak litery " + letter + " w słowie!";
                }
            }
        }
    };
    let checkWord = (word) => {
        document.getElementById("word").value = '';
        if (gameWord === word.toLowerCase()){
            for (let j=0; j<gameWord.length; j++) {
                let className = "class"+j;
                document.getElementsByClassName(className)[0].innerHTML = gameWord.charAt(j);     
            }
            document.getElementById("error-message").innerHTML = "Brawo! To prawidłowa odpowiedź! " + "<i class='fas fa-trophy'></i>";
            document.getElementById("error-message").style.color = "#61AB00";
            blockInputs();
        } else {
            document.getElementById("error-message").innerHTML = word + " nie jest poprawnym rozwiązaniem!" + " Przegrywasz! " + "<i class='fas fa-frown'></i>" + " Poprawny tytuł to: " + gameWord;
            blockInputs();
        }
    };
    let addPoints = () => {
        numberOfErrors+=1;
        document.getElementById("points").innerText = "Nieudane próby: "+numberOfErrors;
    }
    let blockInputs = () => {
        document.getElementById('letter').disabled = true;
        document.getElementById('word').disabled = true;
        document.getElementById('check-letter').disabled = true;
        document.getElementById('check-word').disabled = true;
    }
    return {
        drawBoard: drawBoard,
        checkLetter: checkLetter,
        checkWord: checkWord,
        numberOfErrors: numberOfErrors
    }
})();

game.drawBoard();

let btnLetter = document.getElementById("check-letter");
let inputLetter = document.getElementById("letter");
let btnWord = document.getElementById("check-word");
let inputWord = document.getElementById("word");
let btnNewGame = document.getElementById("btn-newgame");

document.getElementById("points").innerText += " "+game.numberOfErrors;

btnLetter.addEventListener('click', function() { game.checkLetter(inputLetter.value.toLowerCase()) });
btnWord.addEventListener('click', function() { game.checkWord(inputWord.value) });
btnNewGame.addEventListener('click', function() { location.reload() });
inputLetter.addEventListener('keyup', function(event){
    event.preventDefault();
    if (event.keyCode === 13) {
        game.checkLetter(inputLetter.value.toLowerCase())
    }
});
inputWord.addEventListener('keyup', function(event){
    event.preventDefault();
    if (event.keyCode === 13) {
        game.checkWord(inputWord.value);
    }
});
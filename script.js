console.log(`welcome to tic tac toe`);
let box = document.querySelectorAll(".box");
let txt = document.querySelector(".txt");
let player = "x";
let winSound = new Audio("win1.wav");
let tieSound = new Audio("tie.wav");
let xSound = new Audio("x.wav");
let oSound = new Audio("o.wav");


function changePlayer() {
    if(player == "x"){
        player = "o";
    } else {
        player = "x";
    }
}

let possiblity = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

function checkWin() {
    return possiblity.some(a =>{
      return a.every(b =>{
            return box[b].classList.contains(player);
        })
    })
}

function checkDraw() {
    return [...box].every(c =>{
        return c.classList.contains("x") || c.classList.contains("o");
    })
}

function reloadGame() {
    setTimeout(() => {
        location.reload();
    }, 2000);
}

box.forEach(element => {
    element.addEventListener("click", ()=>{
        element.textContent = player;
        element.classList.add("disabled");
        element.classList.add(player);
        if (player == "x") {
            xSound.play();
        } else {
            oSound.play();
        }
        if (checkWin() === true) {
            txt.textContent = `yay ${player} has won the match`;
            document.body.style.backgroundColor = "lightgreen";
            winSound.play()
            reloadGame()
        } else if (checkDraw() === true){
            txt.textContent = `ohh its tie no one wins`
            document.body.style.backgroundColor = "lightsalmon";
            tieSound.play()
            reloadGame()
        } 
        else {
            changePlayer();
            txt.textContent = player;
        }
    })  
});
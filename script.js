  let box = document.querySelectorAll(".box");
        let txt1 = document.getElementById("txt");
        let screen = document.querySelector(".screen");
        let oTurnSound = new Audio("o.mp3");
        let xTurnSound = new Audio("x.wav");
        let winSound = new Audio("win.mp3");
        let tieSound = new Audio("tie.mp3");

        let currentPlayer = "X";
        function changePlayer() {
            if (currentPlayer == `X`) {
                currentPlayer = `O`;
            } else {
                currentPlayer = `X`;
            }
        }

        function playPlayerSound() {
            if (currentPlayer == `X`) {
                xTurnSound.play();
            } else {
                oTurnSound.play();
            }
        }

        function showScreen() {
            screen.classList.add("screenShow");
            setTimeout(() => {
                screen.classList.remove("screenShow");
            }, 2000);
        }

        let winningConditions = [
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
            return winningConditions.some(a => {
                return a.every(b => {
                    return box[b].classList.contains(currentPlayer);
                })
            })
        }

        function checkDraw() {
            return [...box].every(c => {
                return c.classList.contains("X") || c.classList.contains("O");
            })
        }

        function reloadPage() {
            box.forEach(cell => {
                setTimeout(() => {
                    cell.textContent = "";
                    cell.classList.remove("disabled");
                    cell.classList.remove("X");
                    cell.classList.remove("O");
                    txt.textContent = `tIC tAC tOE`;
                    changePlayer();
                }, 2000);
            })
        }

        box.forEach(cell => {
            cell.addEventListener("click", () => {
                cell.textContent = currentPlayer;
                playPlayerSound();
                cell.classList.add(currentPlayer);
                if (checkWin()) {
                    txt.textContent = currentPlayer + ` WINS`;
                    winSound.play();
                    reloadPage();
                    showScreen();
                } else if (checkDraw()) {
                    txt.textContent = `IT'S DRAW`;
                    tieSound.play();
                    reloadPage();
                    showScreen();
                } else {
                    changePlayer();
                }
                cell.classList.add("disabled");
            })
        });

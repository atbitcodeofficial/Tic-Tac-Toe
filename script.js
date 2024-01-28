  let box = document.querySelectorAll(".box");
        let txt1 = document.getElementById("txt");
        let screen = document.querySelector(".screen");
        let subTxt = document.getElementById("subTxt");
        let oTurnSound = new Audio("o.mp3");
        let xTurnSound = new Audio("x.wav");
        let winSound = new Audio("win.mp3");
        let tieSound = new Audio("tie.mp3");
        let xScoreTxt = document.querySelectorAll(".xScore");
        let oScoreTxt = document.querySelectorAll(".oScore");
        let leadTxt = document.querySelectorAll(".lead");


        let currentPlayer = "X";
        setTimeout(() => {
            subTxt.textContent = `Turn for ` + currentPlayer;
        }, 500);
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
            [0, 1, 2,],
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

        function colorBox() {
            winningConditions.some(a => {
                a.every(b => {
                    document.querySelectorAll("." + currentPlayer).forEach(box => {
                        box.style.backgroundColor = "lightgreen";
                        setTimeout(() => {
                            box.style.backgroundColor = "white";
                        }, 2000);
                    })
                })
            })
        }

        checkWin()

        function checkDraw() {
            return [...box].every(c => {
                return c.classList.contains("X") || c.classList.contains("O");
            })
        }

        let xWinCount = 0;
        let oWinCount = 0;

        function updateScore() {
            if (currentPlayer == `X`) {
                xWinCount = xWinCount + 1;
                xScoreTxt.forEach(txt => {
                    txt.textContent = `X: ` + xWinCount;
                })
            } else {
                oWinCount = oWinCount + 1;
                oScoreTxt.forEach(txt => {
                    txt.textContent = `O: ` + oWinCount;
                })
            }
            leadTxt.forEach(txt => {
                if (xWinCount > oWinCount) {
                    txt.textContent = `X Has Higest Score`;
                } else if (xWinCount == oWinCount) {
                    txt.textContent = `Both Have Equal Score`;
                }
                else {
                    txt.textContent = `O Has Higest Score`;
                }
            })
        }

        function tieUpdateScore() { 
            leadTxt.forEach(txt => {
                if (xWinCount > oWinCount) {
                    txt.textContent = `That Was Tie X Has Higest Score`;
                } else if (xWinCount == oWinCount) {
                    txt.textContent = `That Was Tie Both Have Equal Score`;
                }
                else {
                    txt.textContent = `That Was Tie O Has Higest Score`;
                }
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
                    subTxt.textContent = `Turn for ` + currentPlayer;
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
                    colorBox();
                    updateScore();
                } else if (checkDraw()) {
                    txt.textContent = `IT'S DRAW`;
                    tieSound.play();
                    reloadPage();
                    showScreen();
                    tieUpdateScore();
                } else {
                    changePlayer();
                    subTxt.textContent = `Turn For ` + currentPlayer;
                }
                cell.classList.add("disabled");
            })
        });

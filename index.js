const gameboard = (function () {
    var array = [];
    const addToBoard = (symbol, pos) => {
        array[pos-1] = symbol;
    }
    const clearArray = () => {
        array = [];
    }
    const checkWin =  () => {
        console.log(array[0] == null)
        if((array[0] == array[1] && array[1] == array[2] && array[1] != null) || (array[0] == array[3] && array[3] == array[6] && array[3] != null) || (array[6] == array[7] && array[7] == array[8] && array[7] != null) || (array[2] == array[5] && array[5] == array[8] && array[5] != null) || (array[4] == array[3] && array[3] == array[5] && array[3] != null) || (array[1] == array[4] && array[4] == array[7] && array[4] != null) || (array[0] == array[4] && array[4] == array[8] && array[4] != null) || (array[2] == array[4] && array[4] == array[6] && array[4] != null)){
            return true;
        } else {
            return false;
        }
    }
    return { array, addToBoard, clearArray,checkWin };
})();

function player (name, playerNum) {
    var name = name;
    var points = 0;
    console.log(name);
    document.getElementById("p" + playerNum + "-score").innerHTML = name + " score: " + points;

    const win = () => {
        points++
        document.getElementById("p" + playerNum + "-score").innerHTML = name + " score: " + points;
    }
    return { name, win };
}

function gameFlow (player1, player2) {
    var symbol = "x";
    const dialog = document.querySelector("dialog");
    const newGame = document.querySelector("#new-game");
    const winner = document.querySelector("#winner");
    
    newGame.addEventListener("click", () => {
        gameboard.clearArray();
        var symbol = "x";
        for(i = 1; i < 10; i++){
            let button = document.getElementById(""+i)
            button.innerHTML = "";
        }
        dialog.close();
    })


    for(i = 1; i < 10; i++){
        let button = document.getElementById(""+i)
        button.addEventListener("click" , () => {
            if(button.innerHTML != ""){
                return;
            }
            let pos = parseInt(button.id);
            gameboard.addToBoard(symbol, pos);
            button.innerHTML = symbol;
            if(gameboard.checkWin() == true){
                if(symbol == "x") {
                    player1.win();
                    dialog.showModal();
                    winner.innerHTML = player1.name;

                } else if(symbol == "o") {
                    player2.win();
                    dialog.showModal();
                    winner.innerHTML = player2.name;
                } else{
                    dialog.showModal();
                    winner.innerHTML = "Draw";
                }
            } else {
                if(symbol == "x"){
                    symbol = "o";
                } else {
                    symbol = "x";
                }
            }
        })
    }
}

player1 = player("player1", 1);
player2 = player("player2", 2);
gameFlow = gameFlow(player1, player2);


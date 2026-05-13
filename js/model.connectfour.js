"use strict";

//TODO: Think of this model as the game-logic.
//      The model knows everything that is neccessary to manage
//      the game. It knows the players, know who's turn it is,
//      knows all the stones and where they are, knows if the
//      game is over and if so, why (draw or winner). It knows
//      which stones are the winning stones. The model also has
//      sovereignty over the battlefield.
//      First step: Create your model-object with all the properties
//      necessary to store that information.

//TODO: Prepare some customEvents. The model should dispatch events when
//      - The Player Changes
//      - A stone was inserted
//      - The Game is over (Draw or Winner)
//      Don't forget to give your events a namespace.
//      For each customEvent, just make a >method< for your model-object,
//      that, when called, dispatches the event. Nothing else should
//      happen in those methods.


//TODO: Initiate the battlefield. Your model needs a representation of the
//      battlefield as data (two-dimensional array). Obviously, there are
//      no stones yet in the field.

//TODO: The model should offer a method to insert a stone at a given column.
//      If the stone can be inserted, the model should insert the stone,
//      dispatch an event to let the world know that the battlefield has changed
//      and check if the game is over now.
//      Hint: This method will be called later by your controller, when the
//      user makes an according input.

//TODO: Methods to check if the game is over, either by draw or a win.
//      Let the world know in both cases what happend. If it's a win,
//      Don't forget to store the winning stones and add this >detail<
//      to your custom event.

//TODO: Method to change the current player (and dispatch the according event).



export const ConnectFourModelObject = {
    players : ["Phineas", "Doofenschmirtz"],
    whosTurn: "Phineas",
    gameOver: false,
    stoneslayed:[],
    winningStones: 0,
    battlefield: [
        ["", "", "", "", "", ""],
        ["", "", "", "", "", ""],
        ["", "", "", "", "", ""],
        ["", "", "", "", "", ""],
        ["", "", "", "", "", ""],
        ["", "", "", "", "", ""],
        ["", "", "", "", "", ""],
    ],
    insertStone: function(columnToInsert)
    {
        if(ConnectFourModelObject.battlefield[columnToInsert-1][0] != "") return;

        for (let i = 5; i >= 0; i--) {

            if (ConnectFourModelObject.battlefield[columnToInsert-1][i] == "")
            {
                if(ConnectFourModelObject.whosTurn == "Phineas")
                {
                    ConnectFourModelObject.battlefield[columnToInsert-1][i] = "x";
                }
                else
                {
                    ConnectFourModelObject.battlefield[columnToInsert-1][i] = "o";
                }

                document.dispatchEvent(new CustomEvent("stone:inserted", {
                    detail: {
                        currentPlayer: ConnectFourModelObject.whosTurn,
                        column: columnToInsert,
                        row: i
                    }
                }));

                return;
            }
        }
    },
        isGameOver: function()
        {
            let result = checkWinner();

            if(result == "win")
            {
                this.winningStones = 1;

                document.dispatchEvent(new CustomEvent("game:over", {
                    detail: {
                        winner: this.whosTurn,
                        type: "win"
                    }
                }));
                return true
            }
            else if(result == "draw")
            {
                document.dispatchEvent(new CustomEvent("game:over", {
                    detail: {
                        type: "draw"
                    }
                }));
                return true
            }
            else{
                return false;
            }
        },
    changePlayer: function()
    {
        this.whosTurn =
            ConnectFourModelObject.players.filter(
                x => x != this.whosTurn
            )[0];

        document.dispatchEvent(new CustomEvent("player:changed", {
            detail: {
                currentPlayer: this.whosTurn
            }
        }));
    }


}
document.addEventListener("stone:inserted", e => {
    console.log(e.detail.currentPlayer + " added a stone");
});
document.addEventListener("player:changed", e => {
    console.log("Current player:", e.detail.currentPlayer);
});
document.addEventListener("game:over", e => {

    if(e.detail.type == "win")
    {
        openDialog(ConnectFourModelObject.whosTurn + " Won")

        if(ConnectFourModelObject.whosTurn == "Phineas")
        {
            let img = document.getElementById("phin")
            img.style.width = "400px";
            img.style.height = "auto";
        }
        else
        {
            let img = document.getElementById("doof");
            img.style.width = "400px";
            img.style.height = "auto";
        }
    }
    else
    {
        openDialog("Draw")
    }

});

function openDialog(text)
{
    document.getElementById("dialogText").innerText = text
    let dialog = document.getElementById("dialog")
    dialog.classList.remove("hidden");
    let btn = document.getElementById("dialogbtn")
    btn.addEventListener("click", e => {
        document.getElementById("dialog").classList.add("hidden");
        location.reload();
    })
}
function checkWinner() {

    let emptyCounter = 0;

    for (let col = 0; col < 7; col++) {

        let currentPlayer = "";
        let counter = 0;

        for (let row = 0; row < 6; row++) {

            let value = ConnectFourModelObject.battlefield[col][row];

            if (value == "") {
                emptyCounter++;
            }

            if (value != "" && value == currentPlayer) {
                counter++;
            }
            else {
                currentPlayer = value;

                if (value != "") {
                    counter = 1;
                }
                else {
                    counter = 0;
                }
            }
            if (counter == 4) {
                return "win";
            }
        }
    }


    for (let row = 0; row < 6; row++) {

        let currentPlayer = "";
        let counter = 0;

        for (let col = 0; col < 7; col++) {

            let value = ConnectFourModelObject.battlefield[col][row];

            if (value != "" && value == currentPlayer) {
                counter++;
            }
            else {
                currentPlayer = value;

                if (value != "") {
                    counter = 1;
                }
                else {
                    counter = 0;
                }
            }
            console.log(counter)
            if (counter == 4) {
                return "win";
            }
        }
    }


    for (let col = 0; col < 4; col++) {
        for (let row = 0; row < 3; row++) {

            let value = ConnectFourModelObject.battlefield[col][row];

            if (
                value != "" &&
                value == ConnectFourModelObject.battlefield[col + 1][row + 1] &&
                value == ConnectFourModelObject.battlefield[col + 2][row + 2] &&
                value == ConnectFourModelObject.battlefield[col + 3][row + 3]
            ) {
                return "win";
            }
        }
    }


    for (let col = 0; col < 4; col++) {
        for (let row = 3; row < 6; row++) {

            let value = ConnectFourModelObject.battlefield[col][row];

            if (
                value != "" &&
                value == ConnectFourModelObject.battlefield[col + 1][row - 1] &&
                value == ConnectFourModelObject.battlefield[col + 2][row - 2] &&
                value == ConnectFourModelObject.battlefield[col + 3][row - 3]
            ) {
                return "win";
            }
        }
    }

    if (emptyCounter == 0) {
        return "draw";
    }

    return false;
}
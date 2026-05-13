"use strict";

//TODO: Think of this view as your game board.
//      Your view should listen to various custom events of your model.
//      For each event of your model, there should be a clear visual
//      representation of what's going on.

//TODO: Update the field. Show the whole battlefield with all the stones
//      that are already played.

//TODO: Show the current player

//TODO: Notify the player when the game is over. Make it clear how the
//      Game ended. If it's a win, show the winning stones.



export const connectFourView = {
    initFunc: function(whosTurn){
        this.insertButton = document.getElementsByClassName("top-row")[0];
        this.phinimg = document.getElementById("phin");
        this.doofimg = document.getElementById("doof");
        this.hideWrongPlayer(whosTurn);
    },
    insertStoneAt(id, whosTurn) {

        let img = document.createElement("img");
        if(whosTurn=="Phineas") {
            img.src = "../images/orangerkreis.png"
        }
        else{
            img.src = "../images/blauerkreis.png"}
        img.height=80
        img.width=80
        console.log("in")
        let rowcell = document.getElementsByClassName(id);
        for (let i = rowcell.length - 1; i >= 0; i--) {

            if (rowcell[i].children.length === 0) {
                rowcell[i].appendChild(img);
                return true
            }

        }
        return false
    },
    switchPlayer(currentPlayer)
    {
        this.hideWrongPlayer(currentPlayer)
    },
    hideWrongPlayer: function (whosTurn)
    {
        if(whosTurn=="Phineas"){
            this.doofimg.style.filter = "grayscale(100%)";
            this.phinimg.style.filter = "grayscale(0%)";
        }
        else{
            this.phinimg.style.filter = "grayscale(100%)";
                this.doofimg.style.filter = "grayscale(0%)";
        }
    }


}
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset_btn");
let newGameBtn = document.querySelector("#new_btn");
let msgContainer = document.querySelector(".msg_container");
let msg = document.querySelector("#msg");

let turn = true;
let count = 0;

const winPattern = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]

boxes.forEach((box) => {
    
    box.addEventListener("click", () => {
        //console.log("box was clicked");
        if(turn){
            box.innerText = "O";
            document.getElementsByClassName('box').
            turn = false;
        }else{
            box.innerText = "X";
            turn = true;
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner();

        if(count === 9 && !isWinner) {
            drawGame();
        }
    });
});

function changeTextColor() {
    let buttons = document.getElementsByClassName('myButton');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.color = 'green'; // Change the color to green
    }
}

const drawGame =() => {
    //turn = true;
    msg.innerText = "The Game was a Draw";
    
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const resetGame = () => {
    turn = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
}

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}

const showWinner = (winner) => {
    msg.innerText = "Congrats, the winner is " + winner;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const checkWinner = () => {
    for (let pattern of winPattern){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                //console.log("Winner is " + pos1Val);
                showWinner(pos1Val);
            }
        }
    }
}

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnO = true;

const winPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const disable = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enablebox = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      box.disabled = true;
      checkwinner();
      turnO = false;
      botmove();  // Call the bot move after player move
    }
  });
});

const botmove = () => {
  let availableBoxes = [...boxes].filter(box => box.innerText === "");
  if (availableBoxes.length > 0) {  // Check for available boxes correctly
    let randomIndex = Math.floor(Math.random() * availableBoxes.length);
    availableBoxes[randomIndex].innerText = "X";
    availableBoxes[randomIndex].disabled = true;
    checkwinner();
    turnO = true;  // Switch turn back to player
  }
};

const showwinner = (winner) => {
  msg.innerText = `Congratulations! Winner is ${winner}`;
  msgcontainer.classList.remove("hide");
};

const checkwinner = () => {
  for (let pattern of winPattern) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;
    if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
      if (pos1 === pos2 && pos2 === pos3) {
        console.log("winner", pos1);
        disable();
        showwinner(pos1);
        return;  // Exit function if a winner is found
      }
    }
  }

  // Check for draw condition
  let fillboxes = [...boxes].filter(box => box.innerText !== "").length;
  if (fillboxes === 9) {
    msg.innerText = "Game Draw!";
    msgcontainer.classList.remove("hide");
    disable();
  }
};

const resetgame = () => {
  turnO = true;
  enablebox();
  msgcontainer.classList.add("hide");
};

resetbtn.addEventListener("click", resetgame);

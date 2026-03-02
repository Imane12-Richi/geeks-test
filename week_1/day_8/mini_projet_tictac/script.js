const winCombos = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[6,4,2]
  ];
  
  let board = Array(9).fill("");
  let playerSymbol = "";
  let computerSymbol = "";
  let gameOver = false;
  let level = "easy";
  
  const cells = document.querySelectorAll(".cell");
  const message = document.getElementById("message");
  const restartBtn = document.getElementById("restart");
  
  cells.forEach(cell => {
    cell.addEventListener("click", playerTurn);
  });
  
  function selectSymbol(symbol){
    playerSymbol = symbol;
    computerSymbol = symbol === "X" ? "O" : "X";
  }
  
  function setLevel(lvl){
    level = lvl;
  }
  
  function playerTurn(e){
    const id = e.target.id;
  
    if(!board[id] && !gameOver){
      makeMove(id, playerSymbol);
      if(!gameOver) computerTurn();
    }
  }
  
  function computerTurn(){
    let index;
  
    if(level === "easy"){
      const empty = board
        .map((val, i) => val === "" ? i : null)
        .filter(v => v !== null);
  
      index = empty[Math.floor(Math.random() * empty.length)];
    }
  
    if(level === "hard"){
      index = findBestMove();
      if(index === null){
        const empty = board
          .map((val, i) => val === "" ? i : null)
          .filter(v => v !== null);
  
        index = empty[Math.floor(Math.random() * empty.length)];
      }
    }
  
    makeMove(index, computerSymbol);
  }
  
  function makeMove(index, symbol){
    board[index] = symbol;
    cells[index].textContent = symbol;
    checkWinner(symbol);
  }
  
  function checkWinner(symbol){
    const playerMoves = board
      .map((val, i) => val === symbol ? i : null)
      .filter(v => v !== null);
  
    const win = winCombos.some(combo =>
      combo.every(index => playerMoves.includes(index))
    );
  
    if(win){
      message.textContent = symbol === playerSymbol ? "You Win!" : "Computer Wins!";
      gameOver = true;
      restartBtn.style.display = "inline-block";
      return;
    }
  
    if(board.every(cell => cell !== "")){
      message.textContent = "Tie Game";
      gameOver = true;
      restartBtn.style.display = "inline-block";
    }
  }
  
  function findBestMove(){
    for(let combo of winCombos){
      const values = combo.map(i => board[i]);
  
      if(values.filter(v => v === playerSymbol).length === 2 &&
         values.includes("")){
        return combo[values.indexOf("")];
      }
    }
    return null;
  }
  
  function restartGame(){
    board = Array(9).fill("");
    cells.forEach(cell => cell.textContent = "");
    message.textContent = "";
    gameOver = false;
    restartBtn.style.display = "none";
  }
window.addEventListener('DOMContentLoaded', () => {
  const cells = Array.from(document.querySelectorAll('.cell')); //convert NodeList to an array
  const resetBtn = document.querySelector('.reset-btn');

  let board = ['', '', '', '', '', '', '', '', ''];
  let isGameActive = true;
  let currentPlayer = 'X';


//   /*
//    Indexes within the board
//    [0] [1] [2]
//    [3] [4] [5]
//    [6] [7] [8]
// */
  
//   //store all the winning positions on the board
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  
  const isValidAction = (cell) => {
    if (cell.innerText === 'X' || cell.innerText === 'O') {
      return false;  //if inner text of the cell is 'x' or 'o' so the action is invalid
    }
    return true;  //if the cell is empty so the action is valid
  };

  const updateBoard = (index) => {
    board[index] = currentPlayer; //receive an index as a parameter and set the corresponding element in the board array to be the sign of our current player.
  }

  const changePlayer = () => {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

  }

  function showResult() {
    if (currentPlayer === "X") {
      swal("\42 Congratulation \42" ,"player X won!");
      
    }
    else if (currentPlayer === 'O') {
      swal("\42 Congratulation \42" ,'player O won!');
    }
  }
  
  function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
      const winCondition = winningConditions[i];
      const a = board[winCondition[0]];
      const b = board[winCondition[1]];
      const c = board[winCondition[2]];
      if (a === '' || b === '' || c === '') { //if any of the fields are empty we'll call continue and skip to the next iteration
        continue;
      }
      if (a === b && b === c) {
        roundWon = true;
        break;
      }
    }
    if (roundWon) {
      showResult( );
      isGameActive = false;
      return;
    }

    if (!board.includes(""))swal('Oops',"THIS GAME IS TIE!");
  };


  const userAction = (cell, index) => { //This function will be called when the user clicks a cell.
    if (isValidAction(cell) && isGameActive) { //check it is a valid action or not and also check if the game is active currently or not
      cell.innerText = currentPlayer;
      updateBoard(index);
      handleResultValidation();
      changePlayer();
    }
  };

  cells.forEach((cell, index) => {  //add event listener to cells to game work
    cell.addEventListener('click', () => {
      userAction(cell, index)
    });
  });

  resetBtn.addEventListener('click', () => {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    changeBackgroundColorCell();

    if (currentPlayer === 'O') {
      changePlayer();
    }
    cells.forEach(cell => {
      cell.innerText = '';
})

  });

 
  const itemColors = [1,2,3,4,5,6,7,'A','B','C','D','E','F']
  const colors =Array.from(document.querySelectorAll('.color'));
  function changeBackgroundColorCell() {
    colors.forEach((color) => {
      let hexColor = '#';
      for (i = 0; i < 6; i++){
        hexColor += itemColors[getRandomNumber()];
      }
      color.style.backgroundColor = hexColor;
    })
  }
  function getRandomNumber() {
   return Math.floor(Math.random() * itemColors.length);
  }
  changeBackgroundColorCell();
})

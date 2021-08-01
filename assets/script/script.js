// HTML elements
const divStatus = document.querySelector('.status');
const divReset = document.querySelector('.reset');
const divCells = document.querySelectorAll('.game-cell');

// game constants
const xSymbol = '⚔';
const oSymbol = '❍';

// game variables
let gameIsLive = true;
let xIsNext = true;

// functions
const letterToSymbol = (letter) => letter === 'X' ? xSymbol : oSymbol;

const handleWinner = (letter) => {
    gameIsLive = false;
    if(letter === 'X'){
        divStatus.innerHTML = `<span>${letterToSymbol(letter)} has won!</span>`;
    }
    else{
        divStatus.innerHTML = `<span>${letterToSymbol(letter)} has won!</span>`;
    }
};

const addWonToClass = (index0, index1, index2) => {
    divCells[index0].classList.add('won');
    divCells[index1].classList.add('won');
    divCells[index2].classList.add('won');
}

const checkGameStatus = () => {
    const topLeft = divCells[0].classList[1];
    const topMiddle = divCells[1].classList[1]
    const topRight = divCells[2].classList[1];
    const middleLeft = divCells[3].classList[1];
    const middleMiddle = divCells[4].classList[1];
    const middleRight = divCells[5].classList[1];
    const bottomLeft = divCells[6].classList[1];
    const bottomMiddle = divCells[7].classList[1];
    const bottomRight = divCells[8].classList[1];

    // checking for Winner
    // handling all rows winner
    if(topLeft && topLeft === topMiddle && topLeft === topRight){
        handleWinner(topLeft);
        addWonToClass(0, 1, 2);
    }
    else if(middleLeft && middleLeft === middleMiddle && middleLeft === middleRight){
        handleWinner(middleLeft);
        addWonToClass(3, 4, 5);
    }
    else if(bottomLeft && bottomLeft === bottomMiddle && bottomLeft === bottomRight){
        handleWinner(bottomLeft);
        addWonToClass(6, 7, 8);
    }

    // handling all column winner
    else if(topLeft && topLeft === middleLeft && topLeft === bottomLeft){
        handleWinner(topLeft);
        addWonToClass(0, 3, 6);
    }
    else if(topMiddle && topMiddle === middleMiddle && topMiddle === bottomMiddle){
        handleWinner(topMiddle);
        addWonToClass(1, 4, 7);
    }
    else if(topRight && topRight === middleRight && topRight === bottomRight){
        handleWinner(topRight);
        addWonToClass(2, 5, 8);
    }

    // handling diagonally winner
    else if(topLeft && topLeft === middleMiddle && topLeft === bottomRight){
        handleWinner(topLeft);
        addWonToClass(0, 4, 8);
    }
    else if(topRight && topRight === middleMiddle && topRight === bottomLeft){
        handleWinner(topRight);
        addWonToClass(2, 4, 6);
    }

    // handling game tied
    else if(topLeft && topMiddle && topRight && middleLeft && middleMiddle && middleRight && bottomLeft && bottomMiddle && bottomRight){
        gameIsLive = false;
        divStatus.innerHTML = `Game is tied!`; 
    }

    // handling player's turn
    else{
        xIsNext = (!xIsNext);
        if(xIsNext){
            divStatus.innerHTML = `${xSymbol} is next`;
        }
        else{
            divStatus.innerHTML = `${oSymbol} is next`;
        }
    }
};


// Event Handlers
const handleReset = () => {
    xIsNext = true;
    divStatus.innerHTML = `${xSymbol} is next`;
    for(const cells of divCells){
        cells.classList.remove('X');
        cells.classList.remove('O');
        cells.classList.remove('won');
    }
    gameIsLive = true;
    divStatus.innerHTML = `Player ⚔'s turn`;
};

const handleCellClick = (event) => {
    const classList = event.target.classList;
    if(!gameIsLive || classList[1] === 'X' || classList[1] === 'O'){
        return;
    }

    if(xIsNext){
        classList.add('X');     // It adds X to the class
        checkGameStatus();
    }
    else{
        classList.add('O');     // It adds O to the class
        checkGameStatus();
    }
};

// Event Listener
divReset.addEventListener('click', handleReset);

divCells.forEach((eachCell) => {
    eachCell.addEventListener('click', handleCellClick);
});

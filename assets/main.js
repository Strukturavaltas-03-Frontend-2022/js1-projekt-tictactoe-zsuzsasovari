'use strict'

const matrix = [];
let stepCount = 0;
let cols = 3;
let rows = 3;
let mark = 'X';

const initState = () => {
    for( let i = 0; i < 3; i++){
        matrix[i] = ["", "", ""];
    }
} 

const changeMatrixValue = (element) => {
    const row = parseInt(element.dataset.row, 10);
    const cell = parseInt(element.dataset.cell, 10);
    matrix[row][cell] = element.textContent;
}

const deleteSigns = () => {
    let cells = document.querySelectorAll('.cell');
    cells.forEach(cell =>cell.innerHTML = "");
};

const increaseCounter = () => {
    stepCount ++ ;
};

const modifyCell = (element) => {
    element.innerHTML = mark;
    element.removeEventListener('click', handleClick);
}

const setMark = () => {
    mark === "X" ? (mark = "O") : (mark = "X");
}

const handleClick = (event) => {
    increaseCounter();
    modifyCell(event.target);
    changeMatrixValue(event.target);
    checkWinner();
    setMark();
}

const addClickListener = () => {
   let cells = document.querySelectorAll(".cell");
    cells.forEach(element => {
        element.addEventListener('click', handleClick);
    });     
}

const removeAllClickListeners = () => {
    let cells = document.querySelectorAll(".cell");
    cells.forEach(element =>{
        element.addEventListener('click', () => element.removeEventListener('click', handleClick));
    })
}

const checkValues = (array) => array.map(
    row => row.every((cell) => cell === mark))
    .indexOf(true) !== -1;
   
    const checkColumnValues = () => 
        checkValues(matrix.map((array, i) => array.map((item, j) => matrix[j][i])));

    const checkDiagonalValues = () =>
        checkValues([
        matrix.map((array, i) => matrix[i][i]),
        matrix.map((array, i) => matrix[i][matrix[i].length - i - 1])
]);

const checkWinner = () => {
    console.log(checkColumnValues(), checkDiagonalValues());
    if(checkValues(matrix) || checkColumnValues() || checkDiagonalValues())
         endGame();
}

const setMessage = (message) => {
    let messageElement = document.querySelector('.message');
    messageElement.innerHTML = message;
}


const startGame = () => {
    initState();
    addClickListener();
    newGame();
}

const endGame = () => {
    setMessage('The winner is Player' + (mark === 'X' ? 'X' : 'O') + '.');
    //removeAllClickListeners();
}

const newGame = () => {
    let button = document.querySelector("button");
    button.addEventListener('click', () => {
        initState();
        addClickListener();
        deleteSigns();
        setMessage('Playing...');
        setMark();
    });      
}

startGame();
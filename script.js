document.getElementById("solve-btn").addEventListener("click", function() {
    let board = readBoard();
    if (solveSudoku(board)) {
        displayBoard(board);
    } else {
        alert("No solution exists!");
    }
});

document.getElementById("reset-btn").addEventListener("click", function() {
    clearBoard();
});


function readBoard() {
    let board = [];
    for (let row = 0; row < 9; row++) {
        board[row] = [];
        for (let col = 0; col < 9; col++) {
            let value = document.getElementById(`cell-${row}-${col}`).value;
            board[row][col] = value === '' ? '.' : value;
        }
    }
    return board;
}

function displayBoard(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            document.getElementById(`cell-${row}-${col}`).value = board[row][col];
        }
    }
}

function clearBoard() {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            document.getElementById(`cell-${row}-${col}`).value = '';
        }
    }
}


function solveSudoku(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === '.') {  
                for (let num = 1; num <= 9; num++) {
                    let charNum = num.toString();
                    if (isValid(board, row, col, charNum)) {
                        board[row][col] = charNum;
                        
                        if (solveSudoku(board)) {
                            return true;
                        } else {
                            board[row][col] = '.';  
                        }
                    }
                }
                return false;  
            }
        }
    }
    return true;  
}


function isValid(board, row, col, num) {
    for (let i = 0; i < 9; i++) {
        if (board[row][i] === num || board[i][col] === num || 
            board[Math.floor(row / 3) * 3 + Math.floor(i / 3)][Math.floor(col / 3) * 3 + i % 3] === num) {
            return false;
        }
    }
    return true;
}


document.addEventListener('keydown', function(event) {
    const key = event.key;
    let activeElement = document.activeElement;

    if (activeElement.tagName === "INPUT") {
        let [row, col] = activeElement.id.split('-').slice(1).map(Number);

        switch (key) {
            case 'ArrowUp':
                if (row > 0) document.getElementById(`cell-${row - 1}-${col}`).focus();
                break;
            case 'ArrowDown':
                if (row < 8) document.getElementById(`cell-${row + 1}-${col}`).focus();
                break;
            case 'ArrowLeft':
                if (col > 0) document.getElementById(`cell-${row}-${col - 1}`).focus();
                break;
            case 'ArrowRight':
                if (col < 8) document.getElementById(`cell-${row}-${col + 1}`).focus();
                break;
        }
    }
});

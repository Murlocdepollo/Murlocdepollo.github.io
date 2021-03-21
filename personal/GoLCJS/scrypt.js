
let board;
const matrixCell = [];
for (let i = 0; i < 32; i++){
    matrixCell.push([]);
}

document.addEventListener("DOMContentLoaded", () => {

    board = document.querySelector("#board");

    for (let i = 0; i < 32; i++) {
        for (let j = 0; j < 32; j++) {
            createCell(i, j);
        }
    }

});

function createCell(x, y) {

    const cell = document.createElement("div");
    board.appendChild(cell);
    cell.classList.add("cell");
    cell.onclick = () => {
        cell.classList.toggle("live");
        matrix[x+1][y+1] = cell.classList.contains("live")? "#": " ";
    }
    matrixCell[x][y] = cell;
}

function imprimirMatrix() {
    for (const fila of matrix) {
        let string = "";
        for (const v of fila) {
            string += v + " ";
        }
        console.log(string);
    }
}

function render() {
    for (let i = 1; i <= 32; i++) {
        for (let j = 1; j <= 32; j++) {
            if (matrix[i][j] == "#") {
                matrixCell[i-1][j-1].classList.add("live");
            } else {
                matrixCell[i-1][j-1].classList.remove("live");
            }
        }
    }
    renderCanvas();
}

function renderCanvas(){
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");
    const cellWidth = canvas.width / 32 ;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    for (let i = 1; i <= 32; i++) {
        for (let j = 1; j <= 32; j++) {
            if (matrix[i][j] == "#") {
               ctx.fillRect(
                   (i-1)*cellWidth, 
                   (j-1)*cellWidth,
                   cellWidth,
                   cellWidth
               )
            } 
        }
    }
}

function drawGrid(){
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");
    const cellWidth = canvas.width / 32 ;
    ctx.strokeStyle = "white";
    ctx.moveTo(0, 0);
    ctx.stroke();
    for (let i = 0; i < 32; i++){
        ctx.moveTo(cellWidth*i, 0)
        ctx.lineTo(cellWidth*i, canvas.height);
        ctx.stroke();
        ctx.moveTo(0, cellWidth*i)
        ctx.lineTo(canvas.width, cellWidth*i);
        ctx.stroke();  
     }
}


let interval;

function start() {
    clearInterval(interval);
    interval = setInterval(step, 100);
}

function stop(){
    clearInterval(interval);
}

function dani(){
    matrix = crearMatrix();
    render();
    stop();
    console.log("Riverium ~ ");
}
















/* logic */


function obtenerVecinos(x, y) {
    let vecinos = 0;

    if (matrix[x - 1][y - 1] == "#") vecinos++;
    if (matrix[x][y - 1] == "#") vecinos++;
    if (matrix[x + 1][y - 1] == "#") vecinos++;

    if (matrix[x - 1][y] == "#") vecinos++;
    if (matrix[x + 1][y] == "#") vecinos++;

    if (matrix[x - 1][y + 1] == "#") vecinos++;
    if (matrix[x][y + 1] == "#") vecinos++;
    if (matrix[x + 1][y + 1] == "#") vecinos++;

    return vecinos;
}

function step() {
    const nueva = crearMatrix();
    for (let i = 1; i <= 32; i++) {
        for (let j = 1; j <= 32; j++) {
            const vecinos = obtenerVecinos(i, j);
            // Nace/vive con 3 vecinos (ni uno más ni uno menos)
            // Sigue viva con 2 o 3 vivas (NI UNA MENOS NI UNA MÁS)
            if (vecinos == 3 || (vecinos == 2 && matrix[i][j] == "#")) {
                nueva[i][j] = "#";
            }
        }
    }

    matrix = nueva;
    render();
}



let matrix = crearMatrix();

function crearMatrix() {
    const nueva = Array(34);
    nueva[0] = Array(34);
    nueva[33] = Array(34);
    for (let i = 0; i < 34; i++) {
        nueva[0][i] = "";
        nueva[33][i] = "";
    }

    for (let i = 1; i <= 32; i++) {
        nueva[i] = Array(34);
        nueva[i][0] = "";
        nueva[i][33] = "";
        for (let j = 1; j <= 32; j++) {
            nueva[i][j] = " ";
        }
    }

    return nueva;
}
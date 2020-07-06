var canvas = document.getElementById("hilbertCanvas");
var context = canvas.getContext("2d");
var levelInput = document.getElementById("level")
document.getElementById("length");
let angle = 0;
let startingPositionX = 40;
let startingPositionY = 40;
let newPositionX = 0;
let newPositionY = 0;
const minX = 0;
const maxX = 800;
const maxY = 600;
const minY = 0;

//Funkcja inicjalizująca naszego żółwia
function turtleInicjalization() {
    angle = 0;
    context.clearRect(minX, minY, maxX, maxY);
    context.moveTo(startingPositionX, startingPositionY);
    newPositionY = startingPositionY;
    newPositionX = startingPositionX;
}

//Konwersja współrzędnych
function canvasX(x) {
    return (x - minX) / (maxX - minX) * (canvas.width);
}

function canvasY(y) {
    return canvas.height - (y - minY) / (maxY - minY) * (canvas.height);
}

//Funkcja sprawdzająca poprawność pozycji żółwia
function controlX(d) {
    if (newPositionX + d > maxX || newPositionX + d < minX) {
        console.error("Pozycja poza ramką!");
        return false
    } else {
        return true
    }
}

//Funkcja sprawdzająca poprawność pozycji żółwia
function controlY(d) {
    if (newPositionY + d > maxY || newPositionY + d < minY) {
        console.error("Pozycja poza ramką!");
        return false
    } else {
        return true
    }
}

//Funkcja odpowiadająca za poruszanie się żółwia
function movement(r) {
    r *= 500;
    var radians = angle * Math.PI / 180.0;
    var dy = r * Math.cos(radians);
    var dx = r * Math.sin(radians);
    if(controlY(dy) && controlX(dx) ){
    context.moveTo(canvasX(newPositionX), canvasY(newPositionY));
    newPositionY = newPositionY + dy;
    newPositionX = newPositionX + dx;
    context.lineTo(canvasX(newPositionX), canvasY(newPositionY));
    }
}

//Funkcja odpowiadająca za rotację w lewo o dany kąt
function left(l) {
    angle = (angle - l) % 360;
}

//Funkcja odpowiadająca za rotację w prawo o dany kąt
function right(p) {
    angle = (angle + p) % 360;
}

function hilbert(level, degree, length) {
    if (level !== 0) {
        right(degree);
        hilbert(level - 1, -degree, length);
        movement(length);
        left(degree);
        hilbert(level - 1, degree, length);
        movement(length);
        hilbert(level - 1, degree, length);
        left(degree);
        movement(length);
        hilbert(level - 1, -degree, length);
        right(degree)
    }
}

function start() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    turtleInicjalization();
    let level = levelInput.value;
    context.beginPath();
    hilbert(level, 90, Math.pow(1 / 2, level));
    context.stroke();
}
const x = document.getElementById("demo");
const password = "password";
const btn = document.querySelector("#button");
const blackbtn = document.querySelector("#blackButton");
const textOutput = document.querySelector("#textOutput")
const textInput = document.querySelector("#textInput")
const form = document.querySelector("#textForm");

form.addEventListener("submit", (event) => {
    if (textInput === "") {
        event.preventDefault();
        textOutput.textContent = "You need to enter some valid value.";
    }
});

textInput.addEventListener("keydown", displayText);
btn.addEventListener("click", () => {
    const rndCol = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
    document.body.style.backgroundColor = rndCol;
});

blackbtn.addEventListener("click", () => {
    const black = `rgb(${0}, ${0}, ${0})`;
    document.body.style.backgroundColor = black;
});

function displayText(event) {
    textOutput.textContent = `You pressed "${event.key}. "`; 
}

function random(number) {
    return Math.floor(Math.random() * (number + 1));
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
}

function myFunction() {
    document.getElementById('demo').innerHTML = Date()
}


/*
btn.addEventListener("click", () => {
    const rndCol = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
    document.body.style.backgroundColor = rndCol;
});

btn.addEventListener("click", changeColor);
function changeColor() {
    const rndCol = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
    document.body.style.backgroundColor = rndCol;
}
*/ 
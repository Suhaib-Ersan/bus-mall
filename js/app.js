"use strict";

let attempts = 0;
let maxAttempts = 25;
let attemptsHtmlEl = document.getElementById("attemptNumber");

let assets = ["bag.jpg", "banana.jpg", "bathroom.jpg", "boots.jpg", "breakfast.jpg", "bubblegum.jpg", "chair.jpg", "cthulhu.jpg", "dog-duck.jpg", "dragon.jpg", "pen.jpg", "pet-sweep.jpg", "scissors.jpg", "shark.jpg", "sweep.png", "tauntaun.jpg", "unicorn.jpg", "water-can.jpg"];

let choicesArray = [];

function ChoicesArrayConstructor(picName) {
  this.picName = picName.split(".")[0];
  this.assetPath = "assets/" + picName;
  this.clicks = 0;
  this.views = 0;
  choicesArray.push(this);
}

for (let i = 0; i < assets.length; i++) {
  new ChoicesArrayConstructor(assets[i]);
}

function generateRandomNumber() {
  return Math.floor(Math.random() * choicesArray.length);
}

let img1El = document.getElementById("img1");
let img2El = document.getElementById("img2");
let img3El = document.getElementById("img3");

let currentimg1;
let currentimg2;
let currentimg3;

// console.log(img1El);
// console.log(img2El);
// console.log(img3El);

// console.log(currentimg1);
// console.log(currentimg2);
// console.log(currentimg3);

function renderImages() {
  currentimg1 = generateRandomNumber();
  currentimg2 = generateRandomNumber();
  currentimg3 = generateRandomNumber();

  while (currentimg1 === currentimg2 || currentimg1 === currentimg3 || currentimg2 === currentimg3) {
    currentimg1 = generateRandomNumber();
    currentimg2 = generateRandomNumber();
    currentimg3 = generateRandomNumber();
  }

  img1El.setAttribute("src", choicesArray[currentimg1].assetPath);
  img1El.setAttribute("title", choicesArray[currentimg1].assetPath);
  choicesArray[currentimg1].views++;

  img2El.setAttribute("src", choicesArray[currentimg2].assetPath);
  img2El.setAttribute("title", choicesArray[currentimg2].assetPath);
  choicesArray[currentimg2].views++;

  img3El.setAttribute("src", choicesArray[currentimg3].assetPath);
  img3El.setAttribute("title", choicesArray[currentimg3].assetPath);
  choicesArray[currentimg3].views++;

  attemptsHtmlEl.textContent = attempts;
}

renderImages();

img1El.addEventListener("click", imageClickFunction);
img2El.addEventListener("click", imageClickFunction);
img3El.addEventListener("click", imageClickFunction);

function imageClickFunction(event) {
  attempts++;
  if (attempts <= maxAttempts) {

    if (event.target.id === 'img1') {
        choicesArray[currentimg1].clicks++; 
    }else if (event.target.id === 'img2') {
        choicesArray[currentimg2].clicks++;
    }else if (event.target.id === 'img3') {
        choicesArray[currentimg3].clicks++;
    }
    renderImages();
  } else {
      let resultsUlEl = document.getElementById('resultsUl');
      let resultsLlEl;
      for (let i = 0; i < choicesArray.length; i++) {
          resultsLlEl = document.createElement('li');
          resultsUlEl.appendChild(resultsLlEl);
          resultsLlEl.textContent = `${choicesArray[i].picName} had ${choicesArray[i].clicks} votes, and was seen ${choicesArray[i].views} times.`
      }

      img1El.removeEventListener("click", imageClickFunction);
      img2El.removeEventListener("click", imageClickFunction);
      img3El.removeEventListener("click", imageClickFunction);
  }
}

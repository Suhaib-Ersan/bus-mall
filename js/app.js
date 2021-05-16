'use strict';

let attempts = 0;
let maxAttempts = 25;
let attemptsHtmlEl = document.getElementById('attemptNumber');

let assets = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'logo_image.png', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg']

let choicesArray = [];

function ChoicesArrayConstructor(picName) {
  this.picName = picName.split('.')[0];
  this.assetPath = 'assets/' + picName;
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

let img1 = document.getElementById('img1');
let img2 = document.getElementById('img2');
let img3 = document.getElementById('img3');

let currentImg1;
let currentImg2;
let currentImg3;

function renderImages() {
    currentImg1 = generateRandomNumber();
    currentImg2 = generateRandomNumber();
    currentImg3 = generateRandomNumber();

    while (currentImg1 === currentImg2 || currentImg1 === currentImg3 || currentImg2 === currentImg3) {
        currentImg1 = generateRandomNumber();
        currentImg2 = generateRandomNumber();
        currentImg3 = generateRandomNumber();
    }

    img1.setAttribute('src', ChoicesArrayConstructor[currentImg1].assetPath);
    img1.setAttribute('title', ChoicesArrayConstructor[currentImg1].assetPath);
    ChoicesArrayConstructor[currentImg1].views++;

    img2.setAttribute('src', ChoicesArrayConstructor[currentImg2].assetPath);
    img2.setAttribute('title', ChoicesArrayConstructor[currentImg2].assetPath);
    ChoicesArrayConstructor[currentImg2].views++;

    img3.setAttribute('src', ChoicesArrayConstructor[currentImg3].assetPath);
    img3.setAttribute('title', ChoicesArrayConstructor[currentImg3].assetPath);
    ChoicesArrayConstructor[currentImg3].views++;


}

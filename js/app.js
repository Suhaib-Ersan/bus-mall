"use strict";

let attempts = 0;
let maxAttempts = 5;
let attemptsHtmlEl = document.getElementById("attemptNumber");

let assets = ["bag.jpg", "banana.jpg", "bathroom.jpg", "boots.jpg", "breakfast.jpg", "bubblegum.jpg", "chair.jpg", "cthulhu.jpg", "dog-duck.jpg", "dragon.jpg", "pen.jpg", "pet-sweep.jpg", "scissors.jpg", "shark.jpg", "sweep.png", "tauntaun.jpg", "unicorn.jpg", "water-can.jpg"];

let choicesArray = [];
let picNamesArray = [];
let clicksDataArray = [];
let viewsDataArray = [];

let maxAttemptsSpanEl = document.getElementById("maxAttemptsSpan");
maxAttemptsSpanEl.textContent = maxAttempts;

function ChoicesArrayConstructor(picName) {
  this.picName = picName.split(".")[0];
  this.assetPath = "assets/" + picName;
  this.clicks = 0;
  this.views = 0;

  choicesArray.push(this);
  clicksDataArray.push(this.clicks);
  viewsDataArray.push(this.views);
  picNamesArray.push(this.picName);
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

let showResultsButtonEl = document.getElementById("showResultsButton");

function imageClickFunction(event) {
  attempts++;
  if (attempts <= maxAttempts) {
    if (event.target.id === "img1") {
      choicesArray[currentimg1].clicks++;
    } else if (event.target.id === "img2") {
      choicesArray[currentimg2].clicks++;
    } else if (event.target.id === "img3") {
      choicesArray[currentimg3].clicks++;
    }
    renderImages();
  } else {
    showResultsButtonEl.removeAttribute("disabled");
    showResultsButtonEl.addEventListener("click", showResultsPanel);

    img1El.removeEventListener("click", imageClickFunction);
    img2El.removeEventListener("click", imageClickFunction);
    img3El.removeEventListener("click", imageClickFunction);
  }
}

function showResultsPanel() {
  let canvasHtmlVar = '<div id="sideResultsPanel"><h3>Result</h3><div id="ulResultsCard"><ul id="resultsUl"></ul></div></div><canvas id="myChart" width="auto" height="400px"></canvas><canvas id="myChartTwo" width="auto" height="400px"></canvas>';

  let canvasesContainerEl = document.getElementById("canvasesContainer");
  canvasesContainerEl.innerHTML = canvasHtmlVar;

  let resultsUlEl = document.getElementById("resultsUl");
  let resultsLlEl;
  for (let i = 0; i < choicesArray.length; i++) {
    resultsLlEl = document.createElement("li");
    resultsUlEl.appendChild(resultsLlEl);
    resultsLlEl.textContent = `${choicesArray[i].picName} had ${choicesArray[i].clicks} votes, and was seen ${choicesArray[i].views} times.`;
  }

  var ctx = document.getElementById("myChart").getContext("2d");
  var myChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: "# of Votes",
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)", "rgba(75, 192, 192, 0.2)", "rgba(153, 102, 255, 0.2)", "rgba(255, 159, 64, 0.2)"],
          borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)", "rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)", "rgba(255, 159, 64, 1)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      responsive: false,
    },
  });

  var ctx = document.getElementById("myChartTwo").getContext("2d");
  var myChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: "# of Votes",
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)", "rgba(75, 192, 192, 0.2)", "rgba(153, 102, 255, 0.2)", "rgba(255, 159, 64, 0.2)"],
          borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)", "rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)", "rgba(255, 159, 64, 1)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      responsive: false,
    },
  });

  showResultsButtonEl.removeEventListener("click", showResultsPanel);

}

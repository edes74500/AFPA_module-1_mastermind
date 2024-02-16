const solutionDisplayContainer = document.getElementById("solution");
const form = document.getElementById("form");
const input = form.querySelectorAll('input[type="number"]');

let colors = ["red", "blue", "green", "yellow", "purple"];

let maxColor = 4;
let propositionSize = 4;
let solution = [];
let proposition = [];

const randomNumber = () => Math.ceil(Math.random() * maxColor);
const randomSolution = () => {
  for (let i = 0; i < maxColor; i++) {
    let number;
    number = randomNumber();
    solution.push(number);
  }
  console.log("la solution est " + solution);
};
randomSolution();

let goodPlaceColor = [];
let goodPlaceIndex = [];
let goodColor = [];
let tryCounter = 0;

const masterMind = () => {
  tryCounter++;
  goodPlaceColor = [];
  goodPlaceIndex = [];
  goodColor = [];
  let a = solution;
  let b = proposition;

  const goodPlaceChecker = () => {
    for (let i = 0; i < a.length; i++) {
      if (a[i] === b[i]) {
        goodPlaceColor.push(a[i]);
        goodPlaceIndex.push(i);
      }
    }
    a = a.filter((_, index) => !goodPlaceIndex.includes(index));
    b = b.filter((_, index) => !goodPlaceIndex.includes(index));
  };

  const goodColorChecker = () => {
    for (let i = 0; i < a.length; i++) {
      if (b.includes(a[i])) {
        goodColor.push(a[i]);
        let goodColorIndexB = b.indexOf(a[i]);
        b = b.filter((_, index) => index !== goodColorIndexB);
        a = a.filter((_, index) => index !== i);
        goodColorChecker();
      }
    }
  };
  goodPlaceChecker();
  goodColorChecker();
};
const setInputResult = () => {
  proposition = [];
  form.querySelectorAll('input[type="number"]').forEach((input) => {
    // proposition = [];
    proposition.push(parseInt(input.value));
  });
};

input.forEach((input) => {
  input.addEventListener("change", (e) => {
    if (e.target.value > maxColor) {
      e.target.value = 1;
    }
    if (e.target.value < 1) {
      e.target.value = 4;
    }
    input.style.backgroundColor = colors[e.target.value - 1];
    // input.style.color = colors[e.target.value - 1];
  });
});

let allInputHasValue = true;
const checkInputValue = (e) => {
  allInputHasValue = true;
  input.forEach((input) => {
    if (input.value === "") {
      allInputHasValue = false;
    }
  });
};

const gameIsOverChecker = () => {
  if (goodPlaceColor?.length === maxColor || tryCounter === 10) {
    return true;
  } else {
    return false;
  }
};

const showResult = () => {
  resultDisplay = document.getElementById("result");
  console.log(goodPlaceColor.length);
  if (goodPlaceColor.length == maxColor) {
    resultDisplay.innerHTML = `
  <h2> VICTORY!! En ${tryCounter} essais</h2>
  <iframe src="https://gifer.com/embed/6U6m" width=480 height=294.857 frameBorder="0" allowFullScreen></iframe><p>`;
  } else {
    resultDisplay.innerHTML = `<h2> GAME OVER!! </h2>
    <p> Solution was: ${solution
      .map((solution) => {
        return `<span class="span-color" style="background-color: ${colors[solution - 1]}"></span>`;
      })
      .join("")} </p>
  <iframe src="https://gifer.com/embed/7q09" width=480 height=480.000 frameBorder="0" allowFullScreen></iframe><p>
  `;
  }
};

showCurrentTryResult = () => {
  let wrongColorAndPlace = propositionSize - goodPlaceColor.length - goodColor.length;

  let wrongColorAndPlaceSpans = "";
  for (let i = 0; i < wrongColorAndPlace; i++) {
    wrongColorAndPlaceSpans += `<span class="result-box_pin" style="background-color: rgba(255, 255, 255, 0.259)
    "></span>`;
  }

  solutionDisplayContainer.innerHTML += `
  <div class="try-container">
  <p>  ${tryCounter}/10 </p>
  <p>${proposition
    .map((proposition) => {
      return `<span class="span-color" style="background-color: ${colors[proposition - 1]}"></span>`;
    })
    .join("")}</p>
       <div class="result-box">
       ${goodPlaceColor
         .map((goodPlaceColor) => {
           return `<span class="result-box_pin" style="background-color: red"></span>`;
         })
         .join("")}
       ${goodColor
         .map((goodColor) => {
           return `<span class="result-box_pin" style="background-color: white"></span>`;
         })
         .join("")}
        
       ${wrongColorAndPlaceSpans}
       
<div class="result-box_hover">${goodPlaceColor.length} bien place, ${goodColor.length} de la bonne couleur </div>
</div>
  </div>
  `;
};

let gameIsOver;
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (gameIsOver) {
    return;
  }

  checkInputValue();
  if (!allInputHasValue) return;
  if (allInputHasValue) {
    setInputResult();
    masterMind();
  }

  gameIsOver = gameIsOverChecker();

  showCurrentTryResult();
  if (gameIsOver) {
    showResult();
  }
});

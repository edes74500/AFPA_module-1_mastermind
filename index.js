const solutionDisplayContainer = document.getElementById("solution");
const form = document.getElementById("form");
const input = form.querySelectorAll('input[type="number"]');

let colors = ["red", "blue", "green", "yellow", "purple"];

let maxColor = 4;
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
  solutionDisplayContainer.innerHTML += `
  <div class="try-container">
  <h2> Essai ${tryCounter} </h2>
  <p> Votre proposition est : ${proposition
    .map((proposition) => {
      return `<span class="span-color" style="background-color: ${colors[proposition - 1]}"></span>`;
    })
    .join("")}</p>
  <p> Vous avez trouvé ${goodPlaceColor.length} couleurs bien place</p>
  <p> Vous avez trouvé ${goodColor.length} couleurs bonne mais mal place</p>
  </div>
  `;
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
    input.style.backgroundColor = colors[e.target.value - 1];
    input.style.color = colors[e.target.value - 1];
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

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkInputValue();
  if (allInputHasValue) {
    setInputResult();
    masterMind();
  }
});

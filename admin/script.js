"use strict";

const QUESTIONS = [0, 6, 5, 4, 3];
const SELECTABLE = [".a", ".p"];

function DIV() {
  return document.createElement("div");
}

function CCDIV(cls, content) {
  const div = DIV();
  if (content) {
    div.textContent = content;
  }
  div.className = cls;
  return div;
}

function loadGame(data) {
  let [rounds, final] = data.split("#final\n");
  return [rounds, final];
}

function loadRounds(roundsString) {
  let rounds = roundsString.split("#").slice(1);
  if (rounds.length != 4) {
    console.error("rounds != 4");
  }
  return rounds.map(r => r.trim());
}

function populateRoundAnswer(number, line) {
  const setContent = (cls, content) => {
    document.querySelector(`.answers .a${number} .${cls}`).textContent = content;
  };
  let [answer, points] = line.split(";");
  setContent("l", number);
  setContent("a", answer);
  setContent("p", points);
}

function populateRoundAnswers(answers) {
  let i = 1;
  for (let answer of answers) {
   populateRoundAnswer(i++, answer);
  }
}

function makeRound() {
  let [prefix, round] = ROUND_FIELD;
  const div = CCDIV(prefix);
  createDivs(div, round, prefix);
  return div;
}

function displayRound(round) {
  let [name, question, ...answers] = round.split("\n");
  console.log(name);
  const number = parseInt(name.charAt(5));
  const oldRound = document.querySelector("#round");
  const newRound = DIV();
  newRound.setAttribute("id", "round");
  newRound.appendChild(CCDIV("q", `${name}: ${question}`));
  newRound.appendChild(makeRound());

  const parent = oldRound.parentNode;
  parent.replaceChild(newRound, oldRound);
  populateRoundAnswers(answers.slice(0, QUESTIONS[number]));
  update();
}

function clicky(selector) {
  const divs = document.querySelectorAll(selector);
  divs.forEach(d => d.addEventListener("click", e => {
    const cls = e.target.classList;
    if (cls.contains("marked")) {
      cls.remove("marked");
    } else {
      cls.add("marked");
    }
  }));
}

function update() {
  SELECTABLE.forEach(s => clicky(s));
}

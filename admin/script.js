"use strict";

const QUESTIONS = [0, 6, 5, 4, 3];
const SELECTABLE = [".a", ".p"];

const EMPTY_ANSWER = "...................";
const EMPTY_SHORT_ANSWER = ".............";
const EMPTY_POINTS = "--";
const EMPTY_XXX = "";

const ROUND_FIELD = [ "r", [
  ["answers", [
    ["a1",  [["l", 1], ["a", EMPTY_ANSWER ], ["p", EMPTY_POINTS ]]],
    ["a2",  [["l", 2], ["a", EMPTY_ANSWER ], ["p", EMPTY_POINTS ]]],
    ["a3",  [["l", 3], ["a", EMPTY_ANSWER ], ["p", EMPTY_POINTS ]]],
    ["a4",  [["l", 4], ["a", EMPTY_ANSWER ], ["p", EMPTY_POINTS ]]],
    ["a5",  [["l", 5], ["a", EMPTY_ANSWER ], ["p", EMPTY_POINTS ]]],
    ["a6",  [["l", 6], ["a", EMPTY_ANSWER ], ["p", EMPTY_POINTS ]]]
  ]],
  ["points", [["x", EMPTY_XXX], ["l", "summe"], ["p", 0]]],
  ["score",  [["teamA", 0], ["round", 0], ["teamB", 0]]]
]];

const FINAL_FIELD = [ "f", [
  ["answers", [
    ["player1", [
      ["a1", [["a", EMPTY_SHORT_ANSWER ], ["p", EMPTY_POINTS ]]],
      ["a2", [["a", EMPTY_SHORT_ANSWER ], ["p", EMPTY_POINTS ]]],
      ["a3", [["a", EMPTY_SHORT_ANSWER ], ["p", EMPTY_POINTS ]]],
      ["a4", [["a", EMPTY_SHORT_ANSWER ], ["p", EMPTY_POINTS ]]],
      ["a5", [["a", EMPTY_SHORT_ANSWER ], ["p", EMPTY_POINTS ]]],
    ]],
    ["player2", [
      ["a1", [["a", EMPTY_SHORT_ANSWER ], ["p", EMPTY_POINTS ]]],
      ["a2", [["a", EMPTY_SHORT_ANSWER ], ["p", EMPTY_POINTS ]]],
      ["a3", [["a", EMPTY_SHORT_ANSWER ], ["p", EMPTY_POINTS ]]],
      ["a4", [["a", EMPTY_SHORT_ANSWER ], ["p", EMPTY_POINTS ]]],
      ["a5", [["a", EMPTY_SHORT_ANSWER ], ["p", EMPTY_POINTS ]]],
    ]]]],
  ["points", [["l", "summe"], ["p", 0]]],
  ["score",  [["round", 0]]]
]];

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

function createDivs(div, row, prefix) {
  for (let e of row) {
    let [childId, other] = e;
    const childDiv = document.createElement("div");
    const id = `${prefix}-${childId}`;
    childDiv.setAttribute("id", id);
    childDiv.setAttribute("class", childId);
    div.appendChild(childDiv);
    if (other instanceof Array) {
      createDivs(childDiv, other, id) ;
    } else {
      childDiv.textContent = other;
    }
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

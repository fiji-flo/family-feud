"use strict";

const QUESTIONS = [0, 6, 5, 4, 3];
const ACTION = {
  "q": (t) => {
    for (let d of document.querySelectorAll(".selected")) {
      d.classList.remove("selected");
    }
    const cls = t.classList;
    cls.add("selected");
    sendRound();
  },
  "a": (t) => {
    maker(t);
    sendRound();
  },
  "p": (t ,n) => {
    maker(t);
    sum(n);
    sendRound();
  },
  "x": (t, n) => {
    t.textContent = `${t.textContent}X`;
    sendRound();
  }
};

const ws = new WebSocket("ws://localhost:8081");

function sum(n) {
  const selector = `#round${n} .p.marked`;
  const divs = document.querySelectorAll(selector);
  let sum = 0;
  for (let div of divs) {
    sum = sum + parseInt(div.textContent);
  }
  console.log(sum);
  document.querySelector(`#round${n} .sum`).textContent = sum;
}

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

function serialize(div) {
  const cls = div.classList.item(0);
  if (div.childElementCount === 0) {
    if ((div.classList.contains("a") || div.classList.contains("p")) &&
      !div.classList.contains("marked")) {
      return [cls, div.getAttribute("def")];
    } else {
      return [cls, div.textContent];
    }
  } else {
    return [cls, [...div.childNodes].map(d => serialize(d))];
  }
}

function serializeRound(number) {
  const round = document.querySelector(`#round${number} .r`);
  const field = serialize(round);
  return field;
}

function loadGame(data) {
  let [roundsSection, finalSection] = data.split("#final\n");
  const rounds = loadRounds(roundsSection);
  for (let round of rounds) {
    let [n, q, a] = round;
    displayRound(n, q, a);
  }
}

function loadRounds(roundsString) {
  let rounds = roundsString.split("#").slice(1);
  if (rounds.length != 4) {
    console.error("rounds != 4");
  }
  return rounds.map(r => r.trim()).map(r => {
    let [name, question, ...answers] = r.split("\n");
    const number = parseInt(name.charAt(5));
    return [number, question, answers];
  });
}

function populateRoundAnswer(round, rNumber, aNumber, line) {
  const setContent = (cls, content) => {
    const div = round.querySelector(`.answers .a${aNumber} .${cls}`);
    div.textContent = content;
    if (cls in ACTION) {
      div.addEventListener("click", e => ACTION[cls](e.target, rNumber));
    }

  };
  let [answer, points] = line.split(";");
  setContent("l", aNumber);
  setContent("a", answer);
  setContent("p", points);
}

function populateRoundAnswers(round, rNumber, answers) {
  let i = 1;
  for (let answer of answers) {
    populateRoundAnswer(round, rNumber, i++, answer);
  }
}

function makeRound(number) {
  let [prefix, round] = ROUND_FIELDS(number);
  const div = CCDIV(prefix);
  createDivs(div, round, prefix, true);
  return div;
}

function displayRound(number, question, answers) {
  const oldRound = document.querySelector(`#round${number}`);
  const newRound = DIV();
  newRound.setAttribute("id", `round${number}`);
  const label = CCDIV("q", `${number}: ${question}`);
  label.setAttribute("round", number);
  label.addEventListener("click", e => ACTION["q"](e.target, number));
  newRound.appendChild(label);
  newRound.appendChild(makeRound(QUESTIONS[number]));

  const parent = oldRound.parentNode;
  parent.replaceChild(newRound, oldRound);
  populateRoundAnswers(newRound, number, answers.slice(0, QUESTIONS[number]));
  newRound.querySelector(".x").addEventListener("click", e => {
    ACTION["x"](e.target, number);
  });
}

function maker(t) {
  const cls = t.classList;
  if (cls.contains("marked") && window.confirm("sure?")) {
    cls.remove("marked");
  } else {
    cls.add("marked");
  }
}

function sendRound() {
  const number = document.querySelector(".selected");
  if (number && number.hasAttribute("round")) {
    const round = JSON.stringify(serializeRound(number.getAttribute("round")));
    console.log(round);
    ws.send(round);
  }
}

loadGame(DATA);

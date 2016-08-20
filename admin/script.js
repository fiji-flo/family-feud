"use strict";

const QUESTIONS = [0, 6, 5, 4, 3];
const MULTI = [0, 1, 1, 2, 3];
const NROUNDS = 4;
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
    marker(t);
    sendRound();
  },
  "p": (t ,n) => {
    marker(t);
    sum(n);
    sendRound();
  },
  "x": (t, n) => {
    t.textContent = `${t.textContent}X`;
    sendRound();
  },
  "teamA": (t, n) => {
    marker(t);
    updateScores();
    sendRound();
  },
  "teamB": (t, n) => {
    marker(t);
    updateScores();
    sendRound();
  }
};

const ws = new WebSocket("ws://localhost:8081");

function updateScores() {
  let scoreA = 0;
  let scoreB = 0;
  for (let i = 1; i <= NROUNDS; ++i) {
    const rsum = parseInt($(`#round${i} .rsum`).textContent);
    const teamA = $(`#round${i} .teamA`);
    const teamB = $(`#round${i} .teamB`);
    if (teamA.classList.contains("marked")) {
      scoreA = scoreA + rsum;
    }
    if (teamB.classList.contains("marked")) {
      scoreB = scoreB + rsum;
    }
    teamA.textContent = scoreA;
    teamB.textContent = scoreB;
  }
}

function sum(n) {
  const selector = `#round${n} .p.marked`;
  const divs = document.querySelectorAll(selector);
  let sum = 0;
  for (let div of divs) {
    sum = sum + parseInt(div.textContent);
  }
  $(`#round${n} .sum`).textContent = sum;
  $(`#round${n} .rsum`).textContent = (sum * MULTI[n]);
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
  const round = $(`#round${number} .r`);
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

function markeround(number) {
  let [prefix, round] = ROUND_FIELDS(number);
  const div = CCDIV(prefix);
  createDivs(div, round, prefix, true);
  return div;
}

function displayRound(number, question, answers) {
  const oldRound = $(`#round${number}`);
  const newRound = DIV();
  newRound.setAttribute("id", `round${number}`);
  const label = CCDIV("q", `${number}: ${question}`);
  label.setAttribute("round", number);
  label.addEventListener("click", e => ACTION["q"](e.target, number));
  newRound.appendChild(label);
  newRound.appendChild(markeround(QUESTIONS[number]));

  const parent = oldRound.parentNode;
  parent.replaceChild(newRound, oldRound);
  populateRoundAnswers(newRound, number, answers.slice(0, QUESTIONS[number]));
  const events = ["x", "teamA", "teamB"];
  for (let c of events) {
    newRound.querySelector(`.${c}`).addEventListener("click", e => {
      ACTION[c](e.target, number);
    });
  }
}

function marker(t) {
  const cls = t.classList;
  if (cls.contains("marked") && window.confirm("sure?")) {
    cls.remove("marked");
  } else {
    cls.add("marked");
  }
}

function sendRound() {
  const number = $(".selected");
  if (number && number.hasAttribute("round")) {
    const round = serializeRound(number.getAttribute("round"));
    const message = JSON.stringify({t: "update", payload: round});
    console.log(round);
    ws.send(message);
  }
}


(() => {
  const b = $("#wrong");
  b.addEventListener("click", () => {
    ws.send(JSON.stringify({t: "sound", payload: 2}));
  });
})();

loadGame(DATA);

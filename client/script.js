"use strict";

const samples = new Samples(new AudioContext());

const EMPTY_ANSWER = "................";
const EMPTY_POINTS = "--";
const DIFF_RESET = [[]];

const SPECIAL_FIELDS = {
  a: { sound: 0, duration: 1000 },
  p: { sound: 1, duration: 100 }
};

const ROUND_FIELD = [
  ["answers", [
    ["a1",  [["l", 1], ["a", EMPTY_ANSWER ], ["p", EMPTY_POINTS ]]],
    ["a2",  [["l", 2], ["a", EMPTY_ANSWER ], ["p", EMPTY_POINTS ]]],
    ["a3",  [["l", 3], ["a", EMPTY_ANSWER ], ["p", EMPTY_POINTS ]]],
    ["a4",  [["l", 4], ["a", EMPTY_ANSWER ], ["p", EMPTY_POINTS ]]],
    ["a5",  [["l", 5], ["a", EMPTY_ANSWER ], ["p", EMPTY_POINTS ]]],
    ["a6",  [["l", 6], ["a", EMPTY_ANSWER ], ["p", EMPTY_POINTS ]]]
  ]],
  ["sum",  [["l", "summe"], ["p", 0]]],
  ["score",  [["teamA", 0], ["round", 0], ["teamB", 0]]]
];

let current = {};

function typeAnswer(div, displayed, remaining, sound, duration, pos=0) {
  if (pos === 0 && sound >= 0) {
    samples.play(sound);
  }
  if (pos < displayed.length) {
    displayed[pos] = remaining.shift() || " ";
    div.textContent = displayed.join("");
    window.setTimeout(typeAnswer,
                      duration / displayed.length,
                      div,
                      displayed,
                      remaining,
                      -1,
                      duration,
                      pos + 1);
  }
}

function updateField(selector, from, to) {
  const div = document.querySelector(`#${selector}`);
  if (div && div.className in SPECIAL_FIELDS) {
    const { sound, duration } = SPECIAL_FIELDS[div.className];
    typeAnswer(div, from.toString().split(""), to.toString().split(""), sound, duration );
  } else {
    div.textContent = to;
  }
}

function reduce(list, reduced, prefix) {
  for (let [k,v] of list) {
    const label = `${prefix}-${k}`;
    if (v instanceof Array) {
      reduce(v, reduced, label);
    } else {
      reduced.push([label, v]);
    }
  }
}

function reduceRound(list) {
  const reduced = [];
  reduce(list, reduced, "r");
  return reduced;
}

function oneDiff(a, b) {
  let changed = [];
  if (a.length === b.length) {
    for (let i = 0; i < a.length; ++i) {
      if (a[i][0] === b[i][0]) {
        if (a[i][1] !== b[i][1]) {
          if (changed.length === 0) {
             changed = [a[i], b[i]];
          } else {
            return DIFF_RESET;
          }
        }
      } else {
        return DIFF_RESET;
      }
    }
  } else {
    return DIFF_RESET;
  }
  return changed;
}

function update(from, to) {
  const change = oneDiff(reduceRound(from), reduceRound(to));
  console.log(JSON.stringify(change));
  if (change === DIFF_RESET) {
    console.log("DOOM");
    setField(to);
  } else if (change.length === 0) {
    return;
  } else {
    updateField(change[0][0], change[0][1], change[1][1]);
  }
  current = to;
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

function setField(to) {
  document.body.removeChild(document.querySelector("#field"));
  const field = document.createElement("div");
  field.setAttribute("id", "field");
  createDivs(field, to, "r");
  document.body.appendChild(field);
  current = to;
}

setField(ROUND_FIELD);

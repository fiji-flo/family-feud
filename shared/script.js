"use strict";

const $ = (...args) => document.querySelector(...args);

const EMPTY_ANSWER = "...................";
const EMPTY_SHORT_ANSWER = ".............";
const EMPTY_POINTS = "--";
const EMPTY_XXX = "";

const ROUND_FIELDS = n => {
  const answers = [];
  for (let i = 1; i <= n; ++i) {
    answers.push(
      [`a${i}`,  [["l", i], ["a", EMPTY_ANSWER ], ["p", EMPTY_POINTS ]]]
    );
  }
  return [ "r", [
    ["answers", answers],
    ["points", [["x", EMPTY_XXX], ["l", "summe"], ["sum", 0]]],
    ["score",  [["teamA", 0], ["rsum", 0], ["teamB", 0]]]
  ]];
};

const ROUND_FIELD = ROUND_FIELDS(6);

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
  ["points", [["l", "summe"], ["sum", 0]]],
  ["score",  [["rsum", 0]]]
]];

function createDivs(div, row, prefix, def=false) {
  for (let e of row) {
    let [childId, other] = e;
    const childDiv = document.createElement("div");
    const id = `${prefix}-${childId}`;
    childDiv.setAttribute("id", id);
    childDiv.setAttribute("class", childId);
    div.appendChild(childDiv);
    if (other instanceof Array) {
      createDivs(childDiv, other, id, def) ;
    } else {
      childDiv.textContent = other;
      if (def) {
        childDiv.setAttribute("def", other);
      }
    }
  }
}

function setField(to) {
  let [prefix, round] = to;
  document.body.removeChild($("#field"));
  const field = document.createElement("div");
  field.setAttribute("id", "field");
  field.setAttribute("class", prefix);
  createDivs(field, round, prefix);
  document.body.appendChild(field);
  return to;
}

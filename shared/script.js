"use strict";

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
  let [prefix, round] = to;
  document.body.removeChild(document.querySelector("#field"));
  const field = document.createElement("div");
  field.setAttribute("id", "field");
  field.setAttribute("class", prefix);
  createDivs(field, round, prefix);
  document.body.appendChild(field);
  current = to;
}

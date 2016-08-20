"use strict";

const DIFF_RESET = [[]];

const SPECIAL_FIELDS = {
  a: (div, from, to) => typeAnswer(div, arr(from), arr(to), 0, 1000),
  p: (div, from, to) => typeAnswer(div, arr(from), arr(to), 1, 100),
  x: (div, from, to) => { samples.play(2); div.textContent = to; }
};


const ws = new WebSocket("ws://localhost:8080");

let current = [];
const samples = new Samples(new AudioContext());

function arr(arg) {
  return arg.toString().split("");
}

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
  const cls = Object.keys(SPECIAL_FIELDS).filter(k => div.classList.contains(k));
  if (cls.length === 1) {
    SPECIAL_FIELDS[cls[0]](div, from, to);
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

function reduceAnswers(list) {
  let [prefix, round] = list;
  const reduced = [];
  reduce([round[0]], reduced, prefix);
  return reduced;
}

function reduceAllPoints(list) {
  let [prefix, round] = list;
  const reduced = [];
  reduce([round[1], round[2]], reduced, prefix);
  return reduced;
}


function oneDiff(a, b) {
  let changed = [];
  if (a.length === b.length) {
    for (let i = 0; i < a.length; ++i) {
      if (a[i][0] === b[i][0]) {
        if (a[i][1] !== b[i][1]) {
          changed.push([a[i], b[i]]);
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
  const change = oneDiff(reduceAnswers(from), reduceAnswers(to));
  if (change === DIFF_RESET || change.length > 1) {
    console.log("DOOM");
    current = setField(to);
  } else {
    if (change.length === 0) {
      console.log("NOOP");
    } else {
      updateField(change[0][0][0], change[0][0][1], change[0][1][1]);
    }
    const pointChanges = oneDiff(reduceAllPoints(from), reduceAllPoints(to));
    for (let change of pointChanges) {
      console.log(change);
      updateField(change[0][0], change[0][1], change[1][1]);
    }
  }
  current = to;
}

ws.onmessage = e => {
  update(current, JSON.parse(e.data));
};


current = setField(FINAL_FIELD);

const TEST_X = ["r", [
  ["answers", [
    ["a1",  [["l", 1], ["a", EMPTY_ANSWER ], ["p", EMPTY_POINTS ]]],
    ["a2",  [["l", 2], ["a", EMPTY_ANSWER ], ["p", EMPTY_POINTS ]]],
    ["a3",  [["l", 3], ["a", EMPTY_ANSWER ], ["p", EMPTY_POINTS ]]],
    ["a4",  [["l", 4], ["a", EMPTY_ANSWER ], ["p", EMPTY_POINTS ]]],
    ["a5",  [["l", 5], ["a", EMPTY_ANSWER ], ["p", EMPTY_POINTS ]]],
    ["a6",  [["l", 6], ["a", EMPTY_ANSWER ], ["p", EMPTY_POINTS ]]]
  ]],
  ["points", [["x", "x"], ["l", "summe"], ["sum", 0]]],
  ["score",  [["teamA", 0], ["round", 0], ["teamB", 0]]]
]];

const TEST_A = ["r", [
  ["answers", [
    ["a1",  [["l", 1], ["a", EMPTY_ANSWER ], ["p", EMPTY_POINTS ]]],
    ["a2",  [["l", 2], ["a", "foobar 2000" ], ["p", EMPTY_POINTS ]]],
    ["a3",  [["l", 3], ["a", EMPTY_ANSWER ], ["p", EMPTY_POINTS ]]],
    ["a4",  [["l", 4], ["a", EMPTY_ANSWER ], ["p", EMPTY_POINTS ]]],
    ["a5",  [["l", 5], ["a", EMPTY_ANSWER ], ["p", EMPTY_POINTS ]]],
    ["a6",  [["l", 6], ["a", EMPTY_ANSWER ], ["p", EMPTY_POINTS ]]]
  ]],
  ["points", [["x", EMPTY_XXX], ["l", "summe"], ["sum", 2]]],
  ["score",  [["teamA", 123], ["round", 66], ["teamB", 0]]]
]];
const TEST_P = ["r", [
  ["answers", [
    ["a1",  [["l", 1], ["a", EMPTY_ANSWER ], ["p", EMPTY_POINTS ]]],
    ["a2",  [["l", 2], ["a", "foobar 2000" ], ["p", 42 ]]],
    ["a3",  [["l", 3], ["a", EMPTY_ANSWER ], ["p", EMPTY_POINTS ]]],
    ["a4",  [["l", 4], ["a", EMPTY_ANSWER ], ["p", EMPTY_POINTS ]]],
    ["a5",  [["l", 5], ["a", EMPTY_ANSWER ], ["p", EMPTY_POINTS ]]],
    ["a6",  [["l", 6], ["a", EMPTY_ANSWER ], ["p", EMPTY_POINTS ]]]
  ]],
  ["points", [["x", EMPTY_XXX], ["l", "summe"], ["sum", 0]]],
  ["score",  [["teamA", 0], ["round", 0], ["teamB", 0]]]
]];

const TEST_F = [ "f", [
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
      ["a2", [["a", "hey ho lets go foo bar" ], ["p", EMPTY_POINTS ]]],
      ["a3", [["a", EMPTY_SHORT_ANSWER ], ["p", EMPTY_POINTS ]]],
      ["a4", [["a", EMPTY_SHORT_ANSWER ], ["p", EMPTY_POINTS ]]],
      ["a5", [["a", EMPTY_SHORT_ANSWER ], ["p", EMPTY_POINTS ]]],
    ]]]],
  ["points", [["l", "summe"], ["sum", 0]]],
  ["score",  [["round", 0]]]
]];

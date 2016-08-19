"use strict";

const DIFF_RESET = [[]];

const SPECIAL_FIELDS = {
  a: (div, from, to) => typeAnswer(div, arr(from), arr(to), 0, 1000),
  p: (div, from, to) => typeAnswer(div, arr(from), arr(to), 1, 100),
  x: (div, from, to) => { samples.play(2); div.textContent = to; }
};


let current = {};
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

function reduceRound(list) {
  let [prefix, round] = list;
  const reduced = [];
  reduce(round, reduced, prefix);
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


setField(FINAL_FIELD);

const TEST_X = ["r", [
  ["answers", [
    ["a1",  [["l", 1], ["a", EMPTY_ANSWER ], ["p", EMPTY_POINTS ]]],
    ["a2",  [["l", 2], ["a", EMPTY_ANSWER ], ["p", EMPTY_POINTS ]]],
    ["a3",  [["l", 3], ["a", EMPTY_ANSWER ], ["p", EMPTY_POINTS ]]],
    ["a4",  [["l", 4], ["a", EMPTY_ANSWER ], ["p", EMPTY_POINTS ]]],
    ["a5",  [["l", 5], ["a", EMPTY_ANSWER ], ["p", EMPTY_POINTS ]]],
    ["a6",  [["l", 6], ["a", EMPTY_ANSWER ], ["p", EMPTY_POINTS ]]]
  ]],
  ["points", [["x", "x"], ["l", "summe"], ["p", 0]]],
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
  ["points", [["x", EMPTY_XXX], ["l", "summe"], ["p", 0]]],
  ["score",  [["teamA", 0], ["round", 0], ["teamB", 0]]]
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
  ["points", [["x", EMPTY_XXX], ["l", "summe"], ["p", 0]]],
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
  ["points", [["l", "summe"], ["p", 0]]],
  ["score",  [["round", 0]]]
]];

"use strict";

const TYPETIME = 1000;
const samples = new Samples(new AudioContext());

function typeAnswer(div, pos, displayed, remaining, sound) {
  if (pos === 0) {
    samples.play(0);
  }
  if (pos < displayed.length) {
    displayed[pos] = remaining.shift() || " ";
    div.textContent = displayed.join("");
    window.setTimeout(typeAnswer,
                      TYPETIME / displayed.length,
                      div,
                      pos + 1,
                      displayed,
                      remaining,
                      sound);
  }
}

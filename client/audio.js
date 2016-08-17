"use strict";

/*
 * inspired by: http://www.html5rocks.com/en/tutorials/webaudio/intro/js/buffer-loader.js
 */
function loadBuffers(context, urlList, callback) {
  const bufferList = [];
  let loadCount = 0;

  const loadBuffer = (url, index) => {
    const request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";

    request.onload = () => {
      context.decodeAudioData(
        request.response,
        buffer => {
          if (!buffer) {
            alert(`error decoding file data: ${url}`);
            return;
          }
          bufferList[index] = buffer;
          if (++loadCount === urlList.length) {
            callback(bufferList);
          }
        },
        error => {
          console.error("decodeAudioData error", error);
        }
      );
    };

    request.onerror = () => {
      alert("BufferLoader: XHR error");
    };

    request.send();
  };

  for (let i in urlList) {
    loadBuffer(urlList[i], i);
  }
}

class Samples {
  constructor(context) {
    loadBuffers(context,
                ["sounds/answer.wav",
                 "sounds/points.wav",
                 "sounds/wrong.wav"],
                buffers => { this.buffers = buffers; });

    this.context = context;
  }
  play(index) {
    const source = this.context.createBufferSource();
    source.buffer = this.buffers[index];
    source.connect(this.context.destination);
    source.start();
  }
}

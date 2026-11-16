/*
 * 👋 Hello! This is an ml5.js example made and shared with ❤️.
 * Learn more about the ml5.js project: https://ml5js.org/
 * ml5.js license and Code of Conduct: https://github.com/ml5js/ml5-next-gen/blob/main/LICENSE.md
 *
 * This example demonstrates transcribing speech from the microphone with ml5.speechToText.
 */

let speechToTextModel;
let transcriptionText = "Transcription: ";

async function setup() {
  createCanvas(400, 400);

  // Load the Whisper model (defaults to whisper-base)
  speechToTextModel = await ml5.speechToText("Whisper", {
    language: "english", // English is default but you can switch it to any other supported language https://github.com/openai/whisper#available-models-and-languages
    progress_callback: logProgress, // Called by Transformers.js while model files download
  });

  console.log("Model loaded!");

  let startButton = createButton("start");
  startButton.mousePressed(transcribeStart);
  let stopButton = createButton("stop");
  stopButton.mousePressed(transcribeStop);
}

function draw() {
  background(220);
  fill(0);
  noStroke();
  textAlign(LEFT, TOP);

  text(transcriptionText, 20, 20, width - 40, height - 40);
}

// Log the model download progress
function logProgress(info) {
  if (info.status == "progress_total") {
    console.log("Loading model: " + round(info.progress) + "%");
  }
}

// Start listening to the microphone
function transcribeStart() {
  console.log("Listening...");
  speechToTextModel.transcribeStart();
}

// Stop listening and transcribe what was recorded
function transcribeStop() {
  console.log("Stopped Listening...");
  speechToTextModel.transcribeStop(gotResults);
}

// Display the transcription on the canvas
function gotResults(results) {
  console.log(results);
  if (results && results.text) {
    transcriptionText = "Transcription: " + results.text;
  }
}

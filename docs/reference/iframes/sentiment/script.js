// Copyright (c) 2023 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

let sentiment;
let submitBtn;
let inputBox;
let sentimentResult;

function preload() {
  // Initialize the sentiment analysis model
  sentiment = ml5.sentiment("MovieReviews");
}

function setup() {
  noCanvas();

  // Setup the DOM elements
  inputBox = createInput("Today is the happiest day and is full of rainbows!");
  inputBox.attribute("size", "75");
  submitBtn = createButton("submit");
  sentimentResult = createP("Sentiment confidence:");

  // Start predicting when the submit button is pressed
  submitBtn.mousePressed(getSentiment);
}

function getSentiment() {
  // Use the value of the input box
  let text = inputBox.value();

  // Start making the prediction
  sentiment.predict(text, gotResult);
}

function gotResult(prediction) {
  // Display sentiment result via the DOM
  sentimentResult.html("Sentiment confidence: " + prediction.confidence);
}

// Start predicting when the Enter key is pressed
function keyPressed() {
  if (keyCode == ENTER) {
    getSentiment();
  }
}

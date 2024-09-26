// Classifier Variable
let classifier;
// Model URL
let imageModelURL = "https://teachablemachine.withgoogle.com/models/4-WUyljZZ/";

// Video
let video;
// To store the classification
let label = "";

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + "model.json", {
    flipped: true,
  });
}

function setup() {
  createCanvas(320, 260);
  // Create the video
  video = createCapture(VIDEO, { flipped: true });
  video.size(320, 240);
  video.hide();
  classifier.classifyStart(video, gotResult);
}

function draw() {
  background(0);
  // Draw the video
  image(video, 0, 0);

  // Draw the label
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(label, width / 2, height - 4);
}

// Get a prediction for the current video frame
function classifyVideo() {
  classifier.classify(flippedVideo, gotResult);
}

// When we get a result
function gotResult(results) {
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label;
}

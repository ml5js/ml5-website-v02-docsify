# Image + Teachable Machine

<center>
    <img class="header-img" alt="image classification of bird" src="assets/header-image-tm.png">
</center>

## Description

Have you ever wanted to train your own image classification model with customized labels? Follow this guide to get started!

With the combination of the image classifier and Teachable Machine, you can create a model that can recognize the content of an image from a set of labels that you define. For example, you can train a model to tell the difference between a cat and a dog, happy and sad faces, or even between a hot dog and a sandwich. The possibilities are endless!

_<img class="inline-img" src="assets/gettingstarted-bulb.png" alt="tip icon" aria-hidden="true"> If you are not familiar with the concept of image classification, we recommend checking out the [Image Classification](/reference/image-classifier) guide first._

### Key Features

- **Custom Labels**: Train your model with customized labels to recognize specific objects, animals, or people.
- **Image Classification**: The image classifier with Teachable Machine can recognize the content of an image from a set of labels that you define.
- **Video Object Detection**: The image classifier with Teachable Machine can also be used to classify objects into categories that you define in real-time video.

### Output Example

```javascript
[
  {
    label: "cat",
    confidence: 0.99,
  },
  {
    label: "dog",
    confidence: 0.01,
  },
];
```

## Getting Started

### Demo

[p5 Web Editor](iframes/image-teachable-machine ":include :type=iframe width=100% height=550px")

### Quick Start

#### Create a Teachable Machine Model

- Step 1: Open [Teachable Machine](https://teachablemachine.withgoogle.com/train) and create a new "Image Project".
- Step 2: Choose "Standard image model".
- Step 3: Click the "Edit" icon to rename "Class 1" to your desired label. For example, "Happy".
- Step 4: Click the "Webcam" icon and long press "Hold to Record" button to capture some happy faces samples of yourself.
- Step 5: Repeat steps 3 and 4 for other labels, such as "Sad". Use "Add a class" to add more labels, e.g., rename "Class 3" as "Neutral".
- Step 6: Click the "Train Model" button to train your model.
- Step 7: Click the "Export Model" button, and in the pop-up window, click the "Upload my model" button to get the model URL.
- Step 8: Copy the model URL in the "Your shareable link" field.

#### Load the Model in ml5.js

Create an empty project in the [p5 web editor](https://editor.p5js.org/).

First of all, copy and paste the following code into your **index.html** file. If you are not familiar with the p5 web editor interface, you can find a guide on how to find your **index.html** file [here](/?id=try-ml5js-online-1).

```html
<script src="https://unpkg.com/ml5@latest/dist/ml5.js"></script>
```

Next, copy and paste the following code into your **sketch.js** file.

```javascript
// Classifier Variable
let classifier;
// Model URL
let imageModelURL = "https://teachablemachine.withgoogle.com/models/bXy2kDNi/";

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + "model.json");
}

function setup() {
  createCanvas(320, 260);
  // Create the video
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();

  flippedVideo = ml5.flipImage(video);
  // Start classifying
  classifyVideo();
}

function draw() {
  background(0);
  // Draw the video
  image(flippedVideo, 0, 0);

  // Draw the label
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(label, width / 2, height - 4);
}

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video);
  classifier.classify(flippedVideo, gotResult);
}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  console.log(results);
  label = results[0].label;
  // Classifiy again!
  classifyVideo();
}
```

#### Use the model in your code

Update the `imageModelURL` variable with the model URL you copied from the Teachable Machine.

#### Run the code

Finally, click the "Run" button to see the result! You should see the video feed from your webcam, and the model will classify the content of the video in real-time.

Alternatively, you can open [this example code](https://editor.p5js.org/ml5/sketches/ImageModel_TM) and try it yourself on p5.js web editor!

(TODO: link to be updated)

### Additional Examples

(TODO: examples to be updated)

## Methods

#### ml5.imageClassifier()

This method is used to initialize the imageClassifer object. Here, you could provide the teachable machine model URL to load the model.

```javascript
const classifier = ml5.imageClassifier(imageModelURL + "model.json");
```

**Returns:**  
The imageClassifier object.

#### imageClassifier.classifyStart()

This method repeatedly outputs classification labels on an image media through a callback function.

```javascript
imageClassifier.classifyStart(media, ?kNumber, callback);
```

**Parameters:**

- **media**: An HTML or p5.js image, video, or canvas element to run the classification on.
- **kNumber**: The number of labels returned by the image classification.
- **callback(output, error)**: A callback function to handle the output of the classification.

#### imageClassifier.classifyStop()

This method can be called after a call to `imageClassifier.classifyStart` to stop the repeating classifications.

```javascript
imageClassifier.classifyStop();
```

#### imageClassifier.classify()

This method asynchronously outputs a single image classification on an image media when called.

```javascript
imageClassifier.classify(media, ?kNumber, ?callback);
```

**Parameters:**

- **media**: An HTML or p5.js image, video, or canvas element to run the classification on.
- **kNumber**: The number of labels returned by the image classification.
- **callback(output, error)**: OPTIONAL. A callback function to handle the output of the classification.

**Returns:**  
A promise that resolves to the estimation output.

(footer needed)

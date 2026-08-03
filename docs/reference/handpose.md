# HandPose

<center>
  <img class="header-img" src="assets/header-handpose.png" alt="HandPose Header Image" >
  <p class="img-credit"> Image Credit: <a href="https://thenounproject.com/creator/dinosoftlab/" target="_blank" title="DinosoftLabs">DinosoftLabs</a> | <a href='https://forms.gle/5EpwYabG8hLn4p926' target="contribute-form">Contribute ♥️</a> </p>
</center>

## Description

HandPose is a machine-learning model that allows for palm detection and hand-skeleton finger tracking in the browser. It tries to detect multiple hands at a time and for each hand, and provides 21 2D and 3D hand keypoints that describe important locations on the palm and fingers.

The ml5.js HandPose model is based on the [HandPose implementation](https://github.com/google/mediapipe/blob/master/docs/solutions/hands.md) by TensorFlow.js.

The following functionality is provided:

- **Hand Keypoint Detection**: HandPose tries to detect the 2D and 3D coordinates of 21 keypoints on a hand.
- **Handedness**: HandPose tries to determine the handedness (left or right) of the detected hand.
- **Multiple Hands**: HandPose tries to detect multiple hands at the same time.

## Quick Start

Run and explore a pre-built example! [This HandPose example](https://editor.p5js.org/ml5/sketches/QGH3dwJ1A) displays 21 hand keypoints that describe the geometry of each hand in real-time from the webcam.

</br>

[DEMO](iframes/handpose ":include :type=iframe width=100% height=550px")

## Examples

- [HandPose Keypoints](https://editor.p5js.org/ml5/sketches/QGH3dwJ1A): Draw the keypoints of the detected hand from the webcam.
- [HandPose Single Image](https://editor.p5js.org/ml5/sketches/8VK_l3XwE): Detect the keypoints of the hand from a single image.
- [HandPose Parts](https://editor.p5js.org/ml5/sketches/DNbSiIYKB): Draw specific hand parts of the detected hand.
- [HandPose Start-stop](https://editor.p5js.org/ml5/sketches/W9vFFT5RM): Start and stop the detection of the hand.
- [HandPose Skeletal Connections](https://editor.p5js.org/ml5/sketches/fnboooD-K): Draw skeletal connections of the hand.

## Step-by-Step Guide

Now, let's together build the [HandPose Keypoints example](https://editor.p5js.org/ml5/sketches/QGH3dwJ1A) from scratch, and in the process, learn how to use the HandPose model.

### Create a new project

To follow along, start by creating an empty project in the [p5.js web editor](https://editor.p5js.org/).

### Set up ml5.js

Import the ml5.js library in your `index.html` file.

```html
<script src="https://unpkg.com/ml5@1/dist/ml5.js"></script>
```

?> If you are not familiar with how to import the ml5.js library and need more detailed guidance, please check out our [Getting Started](/?id=set-up-ml5js) page.

### Load model

Let’s open the `sketch.js` file in the p5.js Web Editor and load the HandPose model. By using `async` and `await`, we ensure the model is completely ready before the `draw()` function starts running.

```javascript
// Define a variable to store the HandPose model.
let handPose;
// Make sure to add "async" before "function setup()".
async function setup() {
  createCanvas(640, 480); // a common webcam resolution
  // Wait until the HandPose model is fully loaded.
  handPose = await ml5.handPose();
}
```

!> Please note that this syntax is supported starting with p5.js 2.0!
<!-- Find out how to change the p5.js version here! -->

### Access webcam video

Then, set up our sketch to access the webcam video. We will capture the live video stream and hide the default HTML element so we can render it directly on our canvas.

```javascript
// Define a variable "video" to store the webcam video.
let video;
let handPose;

async function setup() {
  createCanvas(640, 480);
  // Access the webcam video, resize it to fit the canvas, and hide it from the display.
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  handPose = await ml5.handPose();
}
```

### Detect hand keypoints with the model

Before we use the HandPose model to detect hand keypoints, we need to define a variable `hands` to store the detected hands. Note that the `hands` variable will store an array of detected hands, and each hand has a property `keypoints` that will contain an array of keypoints.

```javascript
let hands = [];
```

To start detecting the keypoints of the hands, in the `setup` function, we need to call the `detectStart` method of the `handPose` object. This method takes the webcam video as input and a callback function to handle the output.

```javascript
function setup() {
  handPose.detectStart(video, gotHands);
}
```

The `gotHands()` function is a callback function that will be called when the `handPose.detectStart()` method detects hands. Once the hands are detected, the output `results` will be passed to `gotHands()`, and then saved to the `hands` variable.

```javascript
function gotHands(results) {
  hands = results;
}
```

Now, let's apply the steps above! Here is the code we have built so far.

```javascript
let video;
let handPose;
// Define a variable "hands" to store the detected hands as an array.
let hands = [];

async function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  handPose = await ml5.handPose();
  // Start detecting hands from the webcam video.
  handPose.detectStart(video, gotHands);
}

// Callback function for when handPose outputs data
function gotHands(results) {
  // Save the output to the hands variable
  hands = results;
}
```

### Draw the keypoints on the canvas

Before we draw the keypoints, we might want to draw the webcam video on the canvas.

```javascript
function draw() {
  image(video, 0, 0);
}
```

Let's draw the detected hand keypoints on our canvas!

We will iterate through the `hands` array, where each `hand` object represents a detected hand and contains an array of keypoints (finger joints). Each keypoint object has the properties `x` and `y`, which we will use to draw a green circle at every location.

```javascript
// Loop through the "hands" array to fetch each detected hand.
for (let i = 0; i < hands.length; i++) {
  let hand = hands[i];
  // Iterate through all the keypoints of the current hand.
  for (let j = 0; j < hand.keypoints.length; j++) {
    let keypoint = hand.keypoints[j];
    // Finally, draw a green circle at the location of the keypoint.
    fill(0, 255, 0);
    noStroke();
    circle(keypoint.x, keypoint.y, 10);
  }
}
```
Add this code inside the `draw()` function, right after drawing our webcam video.

<br>

!> Let's put it all together! Here is the complete code we have developed.

```javascript
let video;
let handPose;
let hands = [];

async function setup() {
  createCanvas(640, 480);

  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  handPose = await ml5.handPose();
  handPose.detectStart(video, gotHands);
}

function draw() {
  background(220);
  image(video, 0, 0);

  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    for (let j = 0; j < hand.keypoints.length; j++) {
      let keypoint = hand.keypoints[j];
      fill(0, 255, 0);
      noStroke();
      circle(keypoint.x, keypoint.y, 10);
    }
  }
}

function gotHands(results) {
  hands = results;
}
```



### Run your sketch

Voila! 🎉 You have successfully built the HandPose sketch to detect and draw hand keypoints from the webcam video. Press the ▶️ `run` button to see the code in action. You can also find the [complete code](https://editor.p5js.org/ml5/sketches/QGH3dwJ1A) in the p5.js web editor.

?> If you have any questions or spot something unclear in this step-by-step code guide, we'd love to hear from you! Please feel free to share your feedback by opening an issue on [the ml5.js GitHub](https://github.com/ml5js/ml5-website-v02-docsify/issues)!

## Methods

### ml5.handPose()

This method is used to initialize the handPose object.

```javascript
const handPose = ml5.handPose(?options, ?callback);
```

#### Parameters:

**options**: Optional. An object to change the default configuration of the model. The default and available options are:

```javascript
{
  maxHands: 2,
  flipped: false,
  runtime: "tfjs",
  modelType: "full",
  detectorModelUrl: undefined, //default to use the tf.hub model
  landmarkModelUrl: undefined, //default to use the tf.hub model
}
```

Options for hand detection:

- _maxHands_ - Optional
  - Number: The maximum number of hands to detect. Default: 2.
- _modelType_ - Optional
  - String: The type of model to use: "lite" or "full". Default: "full".
- _flipped_ - Optional
  - Boolean: Flip the result data horizontally. Default: false.
- _runtime_ - Optional
  - String: The runtime of the model: "mediapipe" or "tfjs". Default: "tfjs".

For using custom or offline models:

- _solutionPath_ - Optional
  - String: The file path or URL to the model. Only used when using "mediapipe" runtime.
- _detectorModelUrl_ - Optional
  - String: The file path or URL to the hand detector model. Only used when using "tfjs" runtime.
- _landmarkModelUrl_ - Optional
  - String: The file path or URL to the hand landmark model. Only used when using "tfjs" runtime.

More info on options [here](https://github.com/tensorflow/tfjs-models/tree/master/hand-pose-detection/src/mediapipe#create-a-detector) for "mediapipe" runtime.

More info on options [here](https://github.com/tensorflow/tfjs-models/tree/master/hand-pose-detection/src/tfjs#create-a-detector) for "tfjs" runtime.

- **callback(handPose, error)**: Optional. A function to run once the model has been loaded. Alternatively, call `ml5.handPose()` within the p5 `preload` function.

<br>

#### Returns:

**Object**: The handPose object. This object contains the methods to start and stop the hand pose detection process.

---

### handPose.detectStart()

This method repeatedly outputs hand estimations on an image media through a callback function.

```javascript
handPose.detectStart(media, callback);
```

#### Parameters:

- **media**: An HTML or p5.js image, video, or canvas element to run the estimation on.
- **callback(results, error)**: A callback function to handle the output of the estimation. See below for an example output passed into the callback function:

```javascript
[
  {
    confidence,
    handedness,
    keypoints: [{ x, y, confidence, name }, ...],
    keypoints3D: [{ x, y, z, confidence, name }, ...],
    index_finger_dip: { x, y, x3D, y3D, z3D },
    index_finger_mcp: { x, y, x3D, y3D, z3D },
    ...
  }
  ...
]
```

See the diagram below for the position of each keypoint.

<center>
    <img alt="handPose keypoints diagram" width="600" src="assets/handpose-keypoints-map.png">
</center>

---

### handPose.detectStop()

This method can be called to stop the continuous pose estimation process.

```javascript
handPose.detectStop();
```

For example, you can toggle the hand pose estimation with click event in p5.js by using this function as follows:

```javascript

// Toggle detection when mouse is pressed
function mousePressed() {
  toggleDetection();
}

// Call this function to start and stop detection
function toggleDetection() {
  if (isDetecting) {
    handPose.detectStop();
    isDetecting = false;
  } else {
    handPose.detectStart(video, gotHands);
    isDetecting = true;
  }
}
```

---

### handPose.detect()

This method asynchronously outputs a single hand estimation on an image media when called.

```javascript
handPose.detect(media, ?callback);
```

#### Parameters:

**media**: An HTML or p5.js image, video, or canvas element to run the estimation on.

**callback(results, error)**: Optional. A callback function to handle the output of the estimation, see output example above.

---

### handPose.getConnections()

This method returns the skeletal connection information between the hand keypoints in array format.

```javascript
const connections;
function setup() {
  ...
  connections = handPose.getConnections();
  ...
}
```

#### Returns:

**Array**: An array of arrays representing the connections between keypoints.

```javascript
[[0, 1], [1, 2], [2, 3], ...[17, 18], [18, 19], [19, 20]];
```

Please refer to this image to understand the connections:

<center>
    <img alt="handPose keypoints diagram" width="600" src="assets/handpose-connections.png">
</center>

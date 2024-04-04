# Handpose

<center>
    <img class="header-img" alt="A GIF of a person waving their hand in front of a camera. Green dots are drawn over different locations on their palm and fingers–demonstrating the capabilities of the Handpose model." src="assets/header-handpose.gif">
    <p class="img-credit"> Image Credit: <a href="">Name</a> | <a href="">Contribute ♥️</a> </p>
</center>

## Description

Handpose is a machine-learning model that allows for palm detection and hand-skeleton finger tracking in the browser. It can detect multiple hands at a time and for each hand, provides 21 3D hand keypoints that describe important locations on the palm and fingers.

The ml5.js Handpose model is ported from the [Mediapipe Handpose implementation](https://github.com/google/mediapipe/blob/master/docs/solutions/hands.md).

### Key Features

- **Palm Detection**: Handpose can detect the palm of a hand and provide the 2D and 3D coordinates of 21 keypoints on the hand.
- **Finger Tracking**: Handpose can track the 3D coordinates of the tips and joints of the fingers.
- **Handedness**: Handpose can determine the handedness (left or right) of the detected hand.
- **Multiple Hands**: Handpose can detect multiple hands at the same time.

### Output Example

An example of the output from Handpose is shown below:

```javascript
[
  {
    score: 0.86,
    handedness: "Left",
    keypoints: [
      { x: 623.57, y: 374.79, score: 0.85, name: "wrist" },
      // Additional keypoints here...
    ],
    keypoints3D: [
      { x: 0.0024, y: 0.070, z: 0.035, score: 0.85, name: "wrist" },
      // Additional 3D keypoints here...
    ],
    index_finger_dip: { x: /* value */, y: /* value */, x3D: /* value */, y3D: /* value */, z3D: /* value */ },
    index_finger_mcp: { x: /* value */, y: /* value */, x3D: /* value */, y3D: /* value */, z3D: /* value */ },
    // Additional finger properties here...
  },
  // Additional objects here...
]

```

## Getting Started

Ready to give it a try? Our demo is here to give you a sneak peek into what Handpose can do! Don't hesitate to follow along with our instructions to kickstart your very own Handpose project!

### Demo

[DEMO](iframes/handpose-keypoints ":include :type=iframe width=100% height=550px")

### Quick Start

Before you start, let's create an empty project in the [p5 web editor](https://editor.p5js.org/).

First of all, copy and paste the following code into your **index.html** file. If you are not familiar with the p5 web editor interface, you can find a guide on how to find your **index.html** file [here](/?id=try-ml5js-online-1).

```html
<script src="https://unpkg.com/ml5@alpha/dist/ml5.js"></script>
```

Then, add the code below to your **sketch.js** file:

```js
let handpose;
let video;
let hands = [];

function preload() {
  // Load the handpose model
  handpose = ml5.handPose();
}

function setup() {
  createCanvas(640, 480);

  // Create a video element and hide it
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  // Start detecting hands from the webcam video
  // Call function "gotHands" upon receiving output from the model
  handpose.detectStart(video, gotHands);
}

function draw() {
  // Draw the webcam video
  image(video, 0, 0, width, height);

  // Draw all the tracked hand points
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

// Callback function for when handpose outputs data
function gotHands(results) {
  // Save the output to the hands variable
  hands = results;
}
```

Alternatively, you can open [this example code](https://github.com/ml5js/ml5-next-gen/tree/main/examples/HandPose-keypoints) and try it yourself on p5.js web editor!

### Additional Examples

- [HandPose-parts](https://github.com/ml5js/ml5-next-gen/tree/main/examples/HandPose-parts): Draw a circle whose size is determined by the pinch distance between the thumb and index finger.
- [HandPose-single-image](https://github.com/ml5js/ml5-next-gen/tree/main/examples/HandPose-single-image): Detect hands in a single image.
- [HandPose-start-stop](https://github.com/ml5js/ml5-next-gen/tree/main/examples/HandPose-start-stop): Start and stop hand detection with a button click.

TODO (link p5 web editor examples once uploaded)

<!-- ### Tutorials

**PoseNet on The Coding Train**
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/OIo-DIOkNVg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

TODO (link new youtube video once uploaded) -->

## Methods

#### ml5.handpose()

This method is used to initialize the handpose object.

```javascript
const handpose = ml5.handpose(?options, ?callback);
```

**Parameters:**

- **options**: OPTIONAL. An object to change the default configuration of the model. The default and available options are:

  ```javascript
  {
    maxHands: 2,
    runtime: "mediapipe",
    modelType: "full",
    solutionPath: "https://cdn.jsdelivr.net/npm/@mediapipe/hands",
    detectorModelUrl: undefined, //default to use the tf.hub model
    landmarkModelUrl: undefined, //default to use the tf.hub model
  }
  ```

  More info on options [here](https://github.com/tensorflow/tfjs-models/tree/master/hand-pose-detection/src/mediapipe#create-a-detector) for "mediapipe" runtime.
  More info on options [here](https://github.com/tensorflow/tfjs-models/tree/master/hand-pose-detection/src/tfjs#create-a-detector) for "tfjs" runtime.

- **callback(handpose, error)**: OPTIONAL. A function to run once the model has been loaded. Alternatively, call `ml5.handpose()` within the p5 `preload` function.

**Returns:**  
The handpose object.

#### handpose.detectStart()

This method repeatedly outputs hand estimations on an image media through a callback function.

```javascript
handpose.detectStart(media, callback);
```

**Parameters:**

- **media**: An HMTL or p5.js image, video, or canvas element to run the estimation on.
- **callback(output, error)**: A callback function to handle the output of the estimation. See below for an example output passed into the callback function:

  ```javascript
  [
    {
      score,
      handedness,
      keypoints: [{ x, y, score, name }, ...],
      keypoints3D: [{ x, y, z, score, name }, ...],
      index_finger_dip: { x, y, x3D, y3D, z3D },
      index_finger_mcp: { x, y, x3D, y3D, z3D },
      ...
    }
    ...
  ]
  ```

  See the diagram below for the position of each keypoint.

  ![Keypoint Diagram](https://camo.githubusercontent.com/b0f077393b25552492ef5dd7cd9fd13f386e8bb480fa4ed94ce42ede812066a1/68747470733a2f2f6d65646961706970652e6465762f696d616765732f6d6f62696c652f68616e645f6c616e646d61726b732e706e67)

#### handpose.detectStop()

This method can be called after a call to `handpose.detectStart` to stop the repeating hand estimation.

```javascript
handpose.detectStop();
```

#### handpose.detect()

This method asynchronously outputs a single hand estimation on an image media when called.

```javascript
handpose.detect(media, ?callback);
```

**Parameters:**

- **media**: An HMTL or p5.js image, video, or canvas element to run the estimation on.
- **callback(output, error)**: OPTIONAL. A callback function to handle the output of the estimation, see output example above.

**Returns:**  
A promise that resolves to the estimation output.

<br>

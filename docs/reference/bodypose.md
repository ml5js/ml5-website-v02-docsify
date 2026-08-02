# BodyPose

<center>
  <img class="header-img" src="assets/header-bodypose.png" alt="BodyPose Header Image" >
  <p class="img-credit"> Image Credit: <a href="https://thenounproject.com/creator/sentyairma1/" target="_blank" title="sentya irma">sentya irma</a> | <a href='https://forms.gle/5EpwYabG8hLn4p926' target="contribute-form">Contribute ♥️</a> </p>
</center>

## Description

The ml5.js BodyPose is a pretrained full-body pose estimation model that can estimate poses and track key body parts in real-time. It is developed leveraging TensorFlow's [MoveNet](https://www.tensorflow.org/hub/tutorials/movenet#:~:text=MoveNet%20is%20an%20ultra%20fast,known%20as%20Lightning%20and%20Thunder) and [BlazePose](https://ai.google.dev/edge/mediapipe/solutions/vision/pose_landmarker) models.

It offers flexibility for:

- **Multi-person detection**: Estimate poses for single or multiple people in the frame.
- **Video and image inputs**: Estimate poses from both images and live or recorded videos.
- **Choose between two models**: MoveNet (17 keypoints, optimized for speed) and BlazePose (33 keypoints, optimized for precision).

## Quick Start

Run and explore a pre-built example! [This bodyPose example](https://editor.p5js.org/ml5/sketches/hMN9GdrO3) uses the MoveNet model to detect body poses in real-time from the webcam video.

</br>

[DEMO](iframes/bodypose ':include :type=iframe width=100% height=550px')

## Examples

### p5 sketches

- [BodyPose MoveNet Keypoints](https://editor.p5js.org/ml5/sketches/hMN9GdrO3): Draw the keypoints of the detected body using MoveNet model.
- [BodyPose BlazePose keypoints](https://editor.p5js.org/ml5/sketches/OukJYAJAb): Draw the keypoints of the detected body using BlazePose model.
- [BodyPose Skeletal Connections](https://editor.p5js.org/ml5/sketches/YBuqxIH1S): Draw the skeletons on poses for the MoveNet model.

### Video Tutorials

- [Pose Estimation with ml5.js](https://thecodingtrain.com/tracks/ml5js-beginners-guide/ml5/7-bodypose/pose-detection) by The Coding Train

## Step-by-Step Guide

Now, let's together build the [BodyPose Keypoints example](https://editor.p5js.org/ml5/sketches/hMN9GdrO3) from scratch, and in the process, learn how to use the BodyPose model.

### Create a new project

To follow along, start by creating an empty project in the [p5.js web editor](https://editor.p5js.org/).

### Set up ml5.js

Import the ml5.js library in your `index.html` file by copying the following `<script>` tag.

```html
<script src="https://unpkg.com/ml5@1/dist/ml5.js"></script>
```

?> If you are not familiar with how to import the ml5.js library and need more detailed guidance, please check out our [Getting Started](/?id=set-up-ml5js) tutorial.

### Load model

Let’s open the `sketch.js` file in the p5.js Web Editor and load the BodyPose model. By using `async` and `await`, we ensure the model is completely ready before the `draw()` function starts running.

```javascript
// Define a variable to store the BodyPose model.
let bodyPose;
// Make sure to add "async" before "function setup()".
async function setup() {
  createCanvas(640, 480); // a common webcam resolution
  // Wait until the BodyPose model is fully loaded.
  bodyPose = await ml5.bodyPose();
}
```

!> Please note that this syntax is supported starting with p5.js 2.0!
<!-- Find out how to change the p5.js version here! -->

?> You can also pass a model name, an options object, and a customized callback function to the `ml5.bodyPose()` function (e.g., `ml5.bodyPose("BlazePose", options, modelLoaded)`) to change the default configuration of the model. For more information on the available configuration settings, refer to the [Methods](/reference/bodypose?id=ml5bodypose) section on this page.

### Fetch webcam video

Then, set up our sketch to fetch the webcam video. We will capture the live video stream and hide the default HTML element so we can render it directly on our canvas.

```javascript
// Define a variable "video" to store the webcam video.
let video;
let bodyPose;

async function setup() {
  createCanvas(640, 480);
  // Fetch the webcam video, resize it to fit the canvas, and hide it from the display.
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  bodyPose = await ml5.bodyPose();
}
```

### Detect body keypoints with the model

Before we use the BodyPose model to detect body keypoints, we need to define a variable `poses` to store the detected poses. Note that the `poses` variable will store an array of detected poses, and each pose has a property `keypoints` that will contain an array of keypoints.

```javascript
let poses = [];
```

To start detecting the keypoints of the body, in the `setup` function, we need to call the `detectStart` method of the `bodyPose` object. This method takes the webcam video as input and a callback function to handle the output.

```javascript
function setup() {
  bodyPose.detectStart(video, gotPoses);
}
```

The `gotPoses()` function is a callback function that will be called when the `bodyPose.detectStart()` method detects poses. Once the poses are detected, the output `results` will be passed to `gotPoses()`, and then saved to the `poses` variable.

```javascript
function gotPoses(results) {
  poses = results;
}
```

Now, let's apply the steps above! Here is the code we have built so far.


```javascript
let video;
let bodyPose;
// Define a variable "poses" to store the detected poses as an array.
let poses = [];

async function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  bodyPose = await ml5.bodyPose();
  // Start detecting poses from the webcam video.
  bodyPose.detectStart(video, gotPoses);
}

// Callback function for when bodyPose outputs data
function gotPoses(results) {
  // Save the output to the poses variable
  poses = results;
}
```

### Draw the keypoints on the canvas

Before we draw the keypoints, we might want to draw the webcam video on the canvas.

```javascript
function draw() {
  image(video, 0, 0);
}
```

Let's draw the detected body keypoints on our canvas!

We will iterate through the `poses` array, where each `pose` object represents a person and contains an array of body keypoints (bodypart positions). Each keypoint object has the properties `x`, `y`, and `confidence`. The `confidence` is the score of the keypoint prediction (a number between zero and one).

First, we will loop through its keypoints to draw a green circle at every location.

```javascript
// Loop through the "poses" array to fetch each detected pose.
for (let i = 0; i < poses.length; i++) {
  let pose = poses[i];
  // Iterate through all the keypoints of the current pose.
  for (let j = 0; j < pose.keypoints.length; j++) {
    let keypoint = pose.keypoints[j];
    // Finally, draw a green circle at the location of the keypoint.
    fill(0, 255, 0);
    noStroke();
    circle(keypoint.x, keypoint.y, 10);
  }
}
```

To make our drawing even better (more accurate!), we can use the `confidence` property of the keypoint object. We will check the confidence score and draw a circle **only** if the keypoint's confidence is greater than `0.1`. This prevents us from drawing points the model isn't sure about!

```javascript
for (let i = 0; i < poses.length; i++) {
  let pose = poses[i];
  for (let j = 0; j < pose.keypoints.length; j++) {
    let keypoint = pose.keypoints[j];
    // Draw a circle only if the keypoint's confidence is greater than 0.1
    if (keypoint.confidence > 0.1) {
      fill(0, 255, 0);
      noStroke();
      circle(keypoint.x, keypoint.y, 10);
    }
  }
}
```

Add this code inside the `draw()` function, right after drawing our webcam video.

<br>

!> Let's put it all together! Here is the complete code we have developed.

```javascript
let video;
let bodyPose;
let poses = [];

async function setup() {
  createCanvas(640, 480);

  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  bodyPose = await ml5.bodyPose();
  bodyPose.detectStart(video, gotPoses);
}

function draw() {
  background(220);
  image(video, 0, 0);

  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];
    for (let j = 0; j < pose.keypoints.length; j++) {
      let keypoint = pose.keypoints[j];
      if (keypoint.confidence > 0.1) {
        fill(0, 255, 0);
        noStroke();
        circle(keypoint.x, keypoint.y, 10);
      }
    }
  }
}

function gotPoses(results) {
  poses = results;
}
```

### Bonus: Draw the skeleton connections ✨

Additionally, we can draw the skeleton connections! Just like we did above, we will loop through the `poses` array, then keypoints, and finally draw lines connecting the keypoints.

To figure out which points to connect, we will iterate through the `connections` array.

let's define a variable `connections` to hold the skeleton connections.

```javascript
let connections = [];
```

Next, we will use `bodyPose.getSkeleton()` in the `setup()` function to get the connections between keypoints.

```javascript
function setup() {
  bodyPose.detectStart(video, gotPoses);
  // Get the skeleton data from "bodyPose" to know which keypoints to link together.
  connections = bodyPose.getSkeleton(); 
}
```

?> This method returns an array of index pairs, like `[[0, 1], [0, 2], ...]` Each pair tells us which two keypoints to connect! For example, `[0, 1]` means keypoint `0` (Nose) connects to keypoint `1` (Left Eye). We simply use these numbers as indices for `pointA` and `pointB` to fetch their exact positions from the `pose.keypoints` array.

Applying the same rule as before, we only want to draw a red line if both points have a `confidence` score greater than `0.1`.

```javascript
// Loop through the "poses" array to fetch each detected pose.
for (let i = 0; i < poses.length; i++) {
  let pose = poses[i];
  // Iterate through the "connections" array to draw lines between keypoints.
  for (let j = 0; j < connections.length; j++) {
    let pointAIndex = connections[j][0];
    let pointBIndex = connections[j][1];
    let pointA = pose.keypoints[pointAIndex];
    let pointB = pose.keypoints[pointBIndex];
    // Only draw a line if both points have a `confidence` greater than `0.1`.
    if (pointA.confidence > 0.1 && pointB.confidence > 0.1) {
      stroke(255, 0, 0);
      strokeWeight(2);
      line(pointA.x, pointA.y, pointB.x, pointB.y);
    }
  }
}
```

<br>

!> Here is the complete code including drawing the body keypoints and the skeleton connections.

```javascript
let video;
let bodyPose;
let poses = [];
let connections = [];

async function setup() {
  createCanvas(640, 480);

  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  bodyPose = await ml5.bodyPose();
  bodyPose.detectStart(video, gotPoses);

  connections = bodyPose.getSkeleton();
}

function draw() {
  background(220);
  image(video, 0, 0);
  // Draw the skeleton first, so the keypoints are drawn on top of the lines.
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];
    for (let j = 0; j < connections.length; j++) {
      let pointAIndex = connections[j][0];
      let pointBIndex = connections[j][1];
      let pointA = pose.keypoints[pointAIndex];
      let pointB = pose.keypoints[pointBIndex];

      if (pointA.confidence > 0.1 && pointB.confidence > 0.1) {
        stroke(255, 0, 0);
        strokeWeight(2);
        line(pointA.x, pointA.y, pointB.x, pointB.y);
      }
    }
  }
  // Draw the keypoints on top of the skeleton lines.
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];
    for (let j = 0; j < pose.keypoints.length; j++) {
      let keypoint = pose.keypoints[j];
      
      if (keypoint.confidence > 0.1) {
        fill(0, 255, 0);
        noStroke();
        circle(keypoint.x, keypoint.y, 10);
      }
    }
  }
}

function gotPoses(results) {
  poses = results;
}
```

### Run your sketch

Voila! 🎉 You have successfully built the BodyPose sketch to detect and draw body keypoints in real-time from the webcam video. Press the ▶️ `run` button to see the code in action. You can also find the [complete code](https://editor.p5js.org/ml5/sketches/hMN9GdrO3) in the p5.js web editor.

?> If you have any questions or spot something unclear in this step-by-step code guide, we'd love to hear from you! Please feel free to share your feedback by opening an issue on [the ml5.js GitHub](https://github.com/ml5js/ml5-website-v02-docsify/issues)!

## Methods

### ml5.bodyPose()

This method is used to load the bodyPose model and store it in a variable. The `?` means the argument is optional!

<!-- TODO: Add default model name, and explain the options, callback. -->

```javascript
let bodypose = ml5.bodyPose(?model, ?options, ?callback);
```

#### Parameters:

**model**: Optional. Which model to use: the possible options are `MoveNet` (default) and `BlazePose`.

**options**: Optional. An object to change the default configuration of the model. The available options differ depending on which of the two underlying models are used.

The default and available options are:

```javascript
{
  modelType: "MULTIPOSE_LIGHTNING", // "MULTIPOSE_LIGHTNING", "SINGLEPOSE_LIGHTNING", or "SINGLEPOSE_THUNDER".
  enableSmoothing: true,
  minPoseScore: 0.25,
  multiPoseMaxDimension: 256,
  enableTracking: true,
  trackerType: "boundingBox", // "keypoint" or "boundingBox"
  trackerConfig: {},
  modelUrl: undefined,
  flipped: false
}
```

Options for both models:

- _modelType_ - Optional
  - String: The type of model to use. Default: "MULTIPOSE_LIGHTNING".
- _enableSmoothing_ - Optional
  - Boolean: Whether to smooth the pose landmarks across different input images to reduce jitter. Default: true.
- _flipped_ - Optional
  - Boolean: Flip the result horizontally. Defaults to false.

Options for the MoveNet model only:

- _minPoseScore_ - Optional
  - Number: The minimum confidence score for a pose to be detected. Default: 0.25.
- _multiPoseMaxDimension_ - Optional
  - Number: The target maximum dimension to use as the input to the multi-pose model. Must be a mutiple of 32. Default: 256.
- _enableTracking_ - Optional
  - Boolean: Track each person across the frame with a unique ID. Default: true.
- _trackerType_ - Optional
  - String: Specify what type of tracker to use. Default: "boundingBox".
- _trackerConfig_ - Optional
  - Object: Specify tracker configurations. Use tf.js settings by default.

Options for the BlazePose model only:

- _runtime_ - Optional
  - String: Either "tfjs" or "mediapipe". Default: "tfjs"
- _enableSegmentation_ - Optional
  - Boolean: A boolean indicating whether to generate the segmentation mask.
- _smoothSegmentation_ - Optional
  - Boolean: whether to filters segmentation masks across different input images to reduce jitter.

For using custom or offline models

- _modelUrl_ - Optional
  - String: The file path or URL to the MoveNet model.
- _solutionPath_ - Optional
  - String: The file path or URL to the mediaPipe BlazePose model.
- _detectorModelUrl_ - Optional
  - String: The file path or URL to the tfjs BlazePose detector model.
- _landmarkModelUrl_ - Optional
  - String: The file path or URL to the tfjs BlazePose landmark model.

See See the [MoveNet documentation](https://github.com/tensorflow/tfjs-models/tree/master/pose-detection/src/movenet#create-a-detector) and the [BlazePose documentation](https://github.com/tensorflow/tfjs-models/tree/master/pose-detection/src/blazepose_tfjs#create-a-detector) for more information on available options.

**callback(bodypose, error)**: Optional. A "callback" function that runs when the model has been successfully loaded. Most ml5.js example call `ml5.bodyPose()` in the p5.js `preload()` function and no callback is needed.

#### Returns:

**Object**: The bodyPose object. This object contains the methods to start and stop the pose detection process.

---

### bodypose.detectStart()

This method starts the pose detection process and runs it continuously on real-time video.

```javascript
bodypose.detectStart(media, gotPoses);
```

#### Parameters:

**media**: An HTML or p5.js image, video, or canvas element to run the estimation on.
**gotPoses(results, error)**: A callback function to handle the results of the pose estimation. See below for an example of the model's results:

```javascript
[
  {
    box: { width, height, xMax, xMin, yMax, yMin },
    id: 1,
    keypoints: [{ x, y, confidence, name }, ...],
    left_ankle: { x, y, confidence },
    left_ear: { x, y, confidence },
    left_elbow: { x, y, confidence },
    ...
    confidence: 0.28,
  },
  ...
];
```

BodyPose's MoveNet model predicts a set of 17 keypoints:

Nose, Left Eye, Right Eye, Left Ear, Right Ear, Left Shoulder, Right Shoulder, Left Elbow, Right Elbow, Left Wrist, Right Wrist, Left Hip, Right Hip, Left Knee, Right Knee, Left Ankle, Right Ankle

See the diagram below for the position of each keypoint.

<center>
    <img style="display:block; max-width:50%" alt="MoveNet keypoint diagram" src="./assets/BodyPose-MoveNet-Keypoints.png">
</center> <br/>

BodyPose's BlazePose model predicts a set of 33 keypoints:

Nose, Left Eye Inner, Left Eye, Left Eye Outer, Right Eye Inner, Right Eye, Right Eye Outer, Left Ear, Right Ear, Mouth Left, Mouth Right, Left Shoulder, Right Shoulder, Left Elbow, Right Elbow, Left Wrist, Right Wrist, Left Pinky, Right Pinky, Left Index, Right Index, Left Thumb, Right Thumb, Left Hip, Right Hip, Left Knee, Right Knee, Left Ankle, Right Ankle, Left Heel, Right Heel, Left Foot Index, Right Foot Index, Body Center, Forehead, Left Thumb, Left Hand, Right Thumb, Right Hand

See the diagram below for the position of each keypoint.

<center>
    <img style="display:block; max-width:50%" alt="BlazePose keypoint diagram" src="./assets/BodyPose-BlazePose-Keypoints.png">
</center>

```javascript
[
  {
    box: { width, height, xMax, xMin, yMax, yMin },
    id: 1,
    keypoints: [{ x, y, z, confidence, name }, ...],
    keypoints3D: [{ x, y, z, confidence, name }, ...],
    nose: { x, y, confidence, keypoint3D: { x, y, z, confidence } },
    left_eye_inner: { x, y, confidence, keypoint3D: { x, y, z, confidence } },
    left_eye: { x, y, confidence, keypoint3D: { x, y, z, confidence } },
    ...
    confidence: 0.28,
  },
  ...
];
```

?> The `keypoints3D` array and `keypoint3D` property contain the 3D coordinates of the keypoints. The x, y, and z represent absolute distance in meters in a 2 x 2 x 2 meter cubic space. The range for each axis goes from -1 to 1 (therefore 2m total delta). The z is always perpendicular to the xy plane that passes the center of the hip, so the coordinate for the hip center is (0, 0, 0).

---

### bodypose.detectStop()

This method can be called to stop the continuous pose estimation process.

```javascript
bodypose.detectStop();
```

For example, you can toggle the pose estimation with click event in p5.js by using this function as follows:

```javascript
// Toggle detection when mouse is pressed
function mousePressed() {
	toggleDetection();
}

// Call this function to start and stop detection
function toggleDetection() {
	if (isDetecting) {
		bodypose.detectStop();
		isDetecting = false;
	} else {
		bodyPose.detectStart(video, gotPoses);
		isDetecting = true;
	}
}
```

---

### bodypose.detect()

This method runs the pose estimation on an image once, not continuously!

```javascript
bodypose.detect(media, ?callback);
```

#### Parameters:

**media**: An HTML or p5.js image, video, or canvas element to run the estimation on.

**callback(results, error)**: Optional. A callback function to handle the results of the pose estimation. See the results above for an example of the model's output.

#### Returns:

**Array**: An array of poses.

---

### bodypose.getConnections() / bodypose.getSkeleton()

This method returns an array of arrays, where each sub-array contains the indices of the connected keypoints.

```javascript
const connections;
function setup() {
  ...
  const connections = bodypose.getConnections(); // or bodypose.getSkeleton();
  ...
}
```

#### Returns:

**Array**: An array of arrays representing the connections between keypoints.

For example, using BlazePose model will return:

```js
[[0, 1], [0, 4], [1, 2], ...[28, 32], [29, 31], [30, 32]];
```

Using MoveNet model will return:

```js
[[0, 1], [0, 2], [1, 3], ...[12, 14], [13, 15], [14, 16]];
```

These arrays represents the connections between keypoints, please refer to these images to understand the connections:

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
  <div style="text-align: center;">
    <h3>MoveNet</h3>
    <img style="display: block; max-width: 100%; margin: 0 auto;" alt="MoveNet keypoint diagram" src="./assets/BodyPose-MoveNet-Keypoints.png">
  </div>
  <div style="text-align: center;">
    <h3>BlazePose</h3>
    <img style="display: block; max-width: 100%; margin: 0 auto;" alt="BlazePose keypoint diagram" src="./assets/BodyPose-BlazePose-Keypoints.png">
  </div>
</div>

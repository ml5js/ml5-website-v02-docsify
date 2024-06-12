# Bodypose

<center>
    <img style="display:block; max-width:100%" alt="pose estimation" src="https://1.bp.blogspot.com/-25aGTL-RTnY/YJ29jgiiNHI/AAAAAAAAEMM/9qJC_xqlUKo4To9xyumqKmrqKr-vVFXzgCLcBGAsYHQ/s0/three_pane_aligned%2B%25281%2529.gif">
    <p class="img-credit"> Image Credit: <a href="">Name</a> | <a href="">Contribute ♥️</a> </p>
</center>

## Description

ml5.js Bodypose is a pretrained pose estimation model that offers the flexibility to:
1. Estimate poses for single or multiple persons.
2. Estimate poses from images or videos.
3. Choose between MoveNet (17 keypoints, optimized for speed) and BlazePose models (33 keypoints, optimized for precision).

ml5.js Bodypose is developed leveraging [MoveNet](https://www.tensorflow.org/hub/tutorials/movenet#:~:text=MoveNet%20is%20an%20ultra%20fast,known%20as%20Lightning%20and%20Thunder) and [Blazepose](https://ai.google.dev/edge/mediapipe/solutions/vision/pose_landmarker) models.

## Demo
[DEMO](iframes/pose-estimation ":include :type=iframe width=100% height=550px")

## Quick Start
Try [this BodyPose example in the p5.js web editor](https://editor.p5js.org/ml5/sketches/vpSI23x0A)! Press the run button to see the code in action.

This example is built on the same source code as the [demo](/reference/bodypose?id=demo) above. It uses the MoveNet model (default model if not specified by user) to detect body poses in real-time from the webcam video. The detected keypoints are then visualized on the canvas. To understand the code in detail, follow the [How to](/reference/bodypose?id=how-to) tutorial below.

## How to
This tutorial is a p5.js sketch running on [p5.js web editor](https://editor.p5js.org/). To follow this tutorial, create an empty project on the p5.js web editor.

### Set up ml5.js
Import the ml5.js library in your HTML file.

```html
<script src="https://unpkg.com/ml5@alpha/dist/ml5.js"></script>
```

_<img class="inline-img" src="assets/gettingstarted-bulb.png" alt="tip icon" aria-hidden="true"> If you are not familiar with how to import ml5.js library and need more detailed guidance, please check out our [Getting Started](/?id=set-up-ml5js) tutorial._

### Load model
Open the `sketch.js`. Define a variable to hold the bodypose model.

```javascript
let bodyPose;
```

Create a `preload()` function to load the bodypose model.

```javascript
function preload() {
  // Load the bodyPose model
  bodyPose = ml5.bodyPose();
}
```

_<img class="inline-img" src="assets/gettingstarted-bulb.png" alt="tip icon" aria-hidden="true"> Here you could also pass model name, an options object, and a customized callback function to the `ml5.bodyPose()` function (e.g. `ml5.bodyPose('BlazePose', options, modelLoaded)`) to change the default configuration of the model. For more information on the available configuration settings, refer to the [Methods](/reference/bodypose?id=ml5bodypose) section below._

### Fetch webcam video
Define a variable `video` to hold the webcam video.

```javascript
let video;
```

Resize the canvas to dimensions 640x480, a common resolution for webcams.

```javascript
function setup() {
  createCanvas(640, 480);
}
```

Fetch the webcam video, resize it to fit the canvas, and hide it from the display.

```javascript
function setup() {
  createCanvas(640, 480);

  // Create the video and hide it
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
}
```

### Detect poses in the webcam video with the model
Define a variable `poses` to hold the detected poses.

```javascript
let poses = [];
```

Start detecting poses in the webcam video by calling the `bodyPose.detectStart()` method. Here, we pass two parameters: the webcam video and a customized callback function `gotPoses`.

```javascript
function setup() {
  createCanvas(640, 480);

  // Create the video and hide it
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  // Start detecting poses in the webcam video
  bodyPose.detectStart(video, gotPoses);
}
```

The `gotPoses()` function is a callback function that will be called when the `bodyPose.detectStart()` method dectects poses. Once the poses are detected, the output `results` will be passed to `gotPoses()`, and then saved to the `poses` variable.

```javascript
function gotPoses(results) {
  // Save the output to the poses variable
  poses = results;
}
```

### Draw skeleton on the canvas
In the `draw()` function, draw the webcam video on the canvas.

```javascript
function draw() {
  // Draw the webcam video
  image(video, 0, 0, width, height);
}
```

Draw the skeleton by connecting the keypoints of the detected poses with lines. To achieve this, we need to understand which keypoints are connected to each other. Define a variable `connections` to hold the skeleton connections.


```javascript
let connections;
```

Use `bodyPose.getSkeleton()` to get the connections between keypoints. This method returns an array of arrays, where each sub-array contains the indices of the connected keypoints. For example, `[[0, 1], [0, 2], ...]` means that keypoints 0 (Nose) and 1 (Left Eye) are connected, keypoints 0 (Nose) and 2 (Right Eye) are connected, and so on.

```javascript
function setup() {
  createCanvas(640, 480);

  // Create the video and hide it
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  // Start detecting poses in the webcam video
  bodyPose.detectStart(video, gotPoses);
  //get the skeleton connection information
  connections = bodyPose.getSkeleton();
}
```

Then, we can draw the skeleton by connecting the keypoints with lines. We iterate through the `poses` array, where each object `pose` is a pose of a person, containing an array of `keypoints`. Each `keypoint` object has properties `x`, `y`, and `score`. The `score` is the confidence score of the keypoint prediction.
  
```javascript
function draw() {
  // Draw the webcam video
  image(video, 0, 0, width, height);

  //draw the skeleton connections
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];
  }
}
```

Within each pose, we only want to draw the skeleton connections that the model has a high confidence in predicting. To achieve this, we need to check for each link in the `connections` array whether the `keypoints` that constitute the link have a confidence `score` greater than 0.1. If they do, we draw a line connecting the keypoints.

We iterate through the connections array, and each item is a link of `pointA` and `pointB`. For instance, `connections[1]` is `[0, 2]`, where 0 is the index of `pointA` and 2 is the index of `pointB`. Thus, `let pointAIndex = connections[j][0];` means we get the starting point (pointA) of the link j, and `let pointBIndex = connections[j][1];` means we get the ending point (pointB) of the link j.

Now we can use the indices to retrieve the `pointA` and `pointB` objects from the `pose.keypoints`. `pointA` is a object with properties `x`, `y`, and `score`.

```javascript
function draw() {
  // Draw the webcam video
  image(video, 0, 0, width, height);

  //draw the skeleton connections
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];
    for (let j = 0; j < connections.length; j++) {
      let pointAIndex = connections[j][0];
      let pointBIndex = connections[j][1];
      let pointA = pose.keypoints[pointAIndex];
      let pointB = pose.keypoints[pointBIndex];
    }
  }
}
```

Now, we can draw the line connecting the keypoints if both points have a confidence score greater than 0.1.

```javascript
function draw() {
  // Draw the webcam video
  image(video, 0, 0, width, height);

  //draw the skeleton connections
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];
    for (let j = 0; j < connections.length; j++) {
      let pointAIndex = connections[j][0];
      let pointBIndex = connections[j][1];
      let pointA = pose.keypoints[pointAIndex];
      let pointB = pose.keypoints[pointBIndex];
      // Only draw a line if both points are confident enough
      if (pointA.score > 0.1 && pointB.score > 0.1) {
        stroke(255, 0, 0);
        strokeWeight(2);
        line(pointA.x, pointA.y, pointB.x, pointB.y);
      }
    }
  }
}
```

### Draw keypoints on the canvas
Iterate through the `poses` array and draw a circle for each keypoint if the confidence score is greater than 0.1.

We can get each person's pose from the `poses` array. Each `pose` object contains an array of `keypoints`.

```javascript
function draw() {
  // Draw the webcam video
  image(video, 0, 0, width, height);

  //draw the skeleton connections
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];
    for (let j = 0; j < connections.length; j++) {
      let pointAIndex = connections[j][0];
      let pointBIndex = connections[j][1];
      let pointA = pose.keypoints[pointAIndex];
      let pointB = pose.keypoints[pointBIndex];
      // Only draw a line if both points are confident enough
      if (pointA.score > 0.1 && pointB.score > 0.1) {
        stroke(255, 0, 0);
        strokeWeight(2);
        line(pointA.x, pointA.y, pointB.x, pointB.y);
      }
    }
  }

  // Draw all the tracked landmark points
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];
  }
}
```

Now we iterate through all the keypoints in the `keypoints`. Each `keypoint` object has properties `x`, `y`, and `score`. The `score` is the confidence score of the keypoint prediction.
  
```javascript
function draw() {
  // Draw the webcam video
  image(video, 0, 0, width, height);

  //draw the skeleton connections
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];
    for (let j = 0; j < connections.length; j++) {
      let pointAIndex = connections[j][0];
      let pointBIndex = connections[j][1];
      let pointA = pose.keypoints[pointAIndex];
      let pointB = pose.keypoints[pointBIndex];
      // Only draw a line if both points are confident enough
      if (pointA.score > 0.1 && pointB.score > 0.1) {
        stroke(255, 0, 0);
        strokeWeight(2);
        line(pointA.x, pointA.y, pointB.x, pointB.y);
      }
    }
  }

  // Draw all the tracked landmark points
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];
    for (let j = 0; j < pose.keypoints.length; j++) {
      let keypoint = pose.keypoints[j];
    }
  }
}
```

For each keypoint, we only want to draw a circle if the keypoint's confidence is greater than 0.1. We can use the `score` property of the keypoint object to check the confidence score.

```javascript
function draw() {
  // Draw the webcam video
  image(video, 0, 0, width, height);

  //draw the skeleton connections
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];
    for (let j = 0; j < connections.length; j++) {
      let pointAIndex = connections[j][0];
      let pointBIndex = connections[j][1];
      let pointA = pose.keypoints[pointAIndex];
      let pointB = pose.keypoints[pointBIndex];
      // Only draw a line if both points are confident enough
      if (pointA.score > 0.1 && pointB.score > 0.1) {
        stroke(255, 0, 0);
        strokeWeight(2);
        line(pointA.x, pointA.y, pointB.x, pointB.y);
      }
    }
  }

  // Draw all the tracked landmark points
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];
    for (let j = 0; j < pose.keypoints.length; j++) {
      let keypoint = pose.keypoints[j];
      // Only draw a circle if the keypoint's confidence is bigger than 0.1
      if (keypoint.score > 0.1) {
        fill(0, 255, 0);
        noStroke();
        circle(keypoint.x, keypoint.y, 10);
      }
    }
  }
}
```

## Examples
- [BodyPose-blazepose-keypoints](https://editor.p5js.org/ml5/sketches/OukJYAJAb): Draw the body keypoints of the detected body using Blazepose model.

## Methods
#### ml5.bodypose()

This method is used to initialize the bodypose object.

<!-- TODO: Add default model name, and explain the options, callback. -->

```javascript
const bodypose = ml5.bodypose(?options, ?callback);
```

**Parameters:**

- **options**: OPTIONAL. An object to change the default configuration of the model. The default and available options are:

  ```javascript
  {
    modelType: "MULTIPOSE_LIGHTNING" // "MULTIPOSE_LIGHTNING", "SINGLEPOSE_LIGHTNING", or "SINGLEPOSE_THUNDE"
    enableSmoothing: true,

    minPoseScore: 0.25,
    multiPoseMaxDimension: 256,
    enableTracking: true,
    trackerType: "boundingBox", // "keypoint" or "boundingBox"
    trackerConfig: {},
    modelUrl: undefined,
  }
  ```

  More info on options [here](https://github.com/tensorflow/tfjs-models/tree/master/pose-detection/src/movenet#create-a-detector).

- **callback(bodypose, error)**: OPTIONAL. A function to run once the model has been loaded. Alternatively, call `ml5.bodyPix()` within the p5 `preload` function.

**Returns:**  
The bodypose object.

#### bodypose.detectStart()

This method repeatedly outputs pose estimations on an image media through a callback function.

```javascript
bodypose.detectStart(media, callback);
```

**Parameters:**

- **media**: An HMTL or p5.js image, video, or canvas element to run the estimation on.
- **callback(output, error)**: A callback function to handle the output of the estimation. See below for an example output passed into the callback function:

  ```javascript
  [
    {
      box: { width, height, xMax, xMin, yMax, yMin },
      id: 1,
      keypoints: [{ x, y, score, name }, ...],
      left_ankle: { x, y, confidence },
      left_ear: { x, y, confidence },
      left_elbow: { x, y, confidence },
      ...
      score: 0.28,
    },
    ...
  ];
  ```

  Bodypose's MoveNet model predict a set of 17 keypoints: Nose, Left Eye, Right Eye, Left Ear, Right Ear, Left Shoulder, Right Shoulder, Left Elbow, Right Elbow, Left Wrist, Right Wrist, Left Hip, Right Hip, Left Knee, Right Knee, Left Ankle, Right Ankle

  See the diagram below for the position of each keypoint.

  <center>
      <img style="display:block; max-width:30%" alt="Keypoint Diagram" src="https://camo.githubusercontent.com/c3641b718d7e613b2ce111a6a4575e88ca35a60cb325efdd9113c453b2a09301/68747470733a2f2f73746f726167652e676f6f676c65617069732e636f6d2f6d6f76656e65742f636f636f2d6b6579706f696e74732d3530302e706e67">
  </center>

  Bodypose's Blazepose model predict a set of 33 keypoints: Nose, Left Eye Inner, Left Eye, Left Eye Outer, Right Eye Inner, Right Eye, Right Eye Outer, Left Ear, Right Ear, Mouth Left, Mouth Right, Left Shoulder, Right Shoulder, Left Elbow, Right Elbow, Left Wrist, Right Wrist, Left Pinky, Right Pinky, Left Index, Right Index, Left Thumb, Right Thumb, Left Hip, Right Hip, Left Knee, Right Knee, Left Ankle, Right Ankle, Left Heel, Right Heel, Left Foot Index, Right Foot Index, Body Center, Forehead, Left Thumb, Left Hand, Right Thumb, Right Hand

  See the diagram below for the position of each keypoint.

  <center>
      <img style="display:block; max-width:30%" alt="Keypoint Diagram" src="https://camo.githubusercontent.com/17082997c33fc6d2544c4aea33d9898860cf902ed5a0b865527d1dd91bbc7efa/68747470733a2f2f73746f726167652e676f6f676c65617069732e636f6d2f6d65646961706970652f626c617a65706f73652d6b6579706f696e74732d757064617465642e706e67">
  </center>

  ```javascript
  [
    {
      box: { width, height, xMax, xMin, yMax, yMin },
      id: 1,
      keypoints: [{ x, y, z, score, name }, ...],
      keypoints3D: [{ x, y, z, score, name }, ...],
      left_ankle: { x, y, z, confidence },
      left_ear: { x, y, z, confidence },
      left_elbow: { x, y, z, confidence },
      ...
      score: 0.28,
    },
    ...
  ];
  ```

  _<img class="inline-img" src="assets/gettingstarted-bulb.png" alt="tip icon" aria-hidden="true"> The `keypoints3D` array contains the 3D coordinates of the keypoints. The `z` property represents the depth of the keypoint. The 2D `keypoints` still includes a Z-coordinate to provide additional depth information and helps understand the relative positioning of body parts, enhancing the accuracy of applications that primarily work with 2D data._

#### bodypose.detectStop()

This method can be called after a call to `bodypose.detectStart` to stop the repeating pose estimation.

```javascript
bodypose.detectStop();
```

#### bodypose.detect()

This method asynchronously outputs a single pose estimation on an image media when called.

```javascript
bodypose.detect(media, ?callback);
```

**Parameters:**

- **media**: An HTML or p5.js image, video, or canvas element to run the estimation on.
- **callback(output, error)**: OPTIONAL. A callback function to handle the output of the estimation, see output example above.

**Returns:**  
A promise that resolves to the estimation output.

(footer needed)
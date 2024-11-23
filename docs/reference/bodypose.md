# BodyPose

<center>
  <img class="header-img" src="assets/header-bodypose.png" alt="BodyPose Header Image" >
  <p class="img-credit"> Image Credit: <a href="https://thenounproject.com/creator/sentyairma1/" target="_blank" title="sentya irma">sentya irma</a> | <a href='mailto:info@ml5js.org'>Contribute ♥️</a> </p>
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

[DEMO](iframes/bodypose ":include :type=iframe width=100% height=550px")

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

Open the `sketch.js` file. Define a variable to hold the bodyPose model.

```javascript
let bodyPose;
```

Create a `preload()` function to load the bodyPose model.

```javascript
function preload() {
  // Load the bodyPose model
  bodyPose = ml5.bodyPose();
}
```

?> You can also pass a model name, an options object, and a customized callback function to the `ml5.bodyPose()` function (e.g., `ml5.bodyPose("BlazePose", options, modelLoaded)`) to change the default configuration of the model. For more information on the available configuration settings, refer to the [Methods](/reference/bodypose?id=ml5bodypose) section on this page.

### Fetch webcam video

Define a variable `video` to hold the webcam video.

```javascript
let video;
```

Resize the canvas dimensions to 640x480, a common resolution for webcams.

```javascript
function setup() {
  createCanvas(640, 480);
```

Fetch the webcam video, resize it to fit the canvas, and hide it from the display.

```javascript
  // Create the video and hide it
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
}
```

### Detect poses

Define a variable `poses` to hold the detected poses.

```javascript
let poses = [];
```

To start detecting poses in the webcam video, call the `bodyPose.detectStart()` method. Here, we pass two parameters: the webcam video and a customized callback function `gotPoses`.

```javascript
function setup() {
  // ...
  video.hide();

  // Start detecting poses in the webcam video
  bodyPose.detectStart(video, gotPoses);
}
```

The `gotPoses()` function is a callback function that will be called when the `bodyPose.detectStart()` method detects poses. Once the poses are detected, the output `results` will be passed to `gotPoses()`, and then saved to the `poses` variable.

```javascript
// Callback function for when the model returns pose data
function gotPoses(results) {
  // Store the model's results in a global variable
  poses = results;
}
```

### Draw skeleton on the canvas

We can draw the skeleton by connecting the keypoints of the detected poses with lines. To achieve this, we first need to understand which keypoints are connected to each other. Define a variable `connections` to hold the skeleton connections.

```javascript
let connections;
```

Use `bodyPose.getSkeleton()` in the `setup()` function to get the connections between keypoints. This method returns an array of arrays, where each sub-array contains the indices of the connected keypoints. For example, `[[0, 1], [0, 2], ...]` means that keypoints 0 (Nose) and 1 (Left Eye) are connected, keypoints 0 (Nose) and 2 (Right Eye) are connected, and so on.

```javascript
function setup() {
  // ...
  bodyPose.detectStart(video, gotPoses);
  // Get the skeleton connection information
  connections = bodyPose.getSkeleton();
}
```

In the `draw()` function, draw the webcam video on the canvas.

```javascript
function draw() {
  // Display the video
  image(video, 0, 0, width, height);
```

Next, we can start drawing the skeleton connections. We iterate through the `poses` array, where each object `pose` is a pose of a person, containing an array of `keypoints`. Each `keypoint` object has the properties `x`, `y`, and `confidence`. The `confidence` is the confidence score of the keypoint prediction (a number between zero and one).

```javascript
  // Draw the skeleton connections
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];
```

Within each pose, we only want to draw the skeleton connections that the model has a high confidence in predicting. To do this, we need to check for each link in the `connections` array and whether the `keypoints` that constitute the link have a `confidence` score greater than 0.1. If they do, we draw a line connecting the keypoints.

We iterate through the connections array, with each item being a link of `pointA` and `pointB`. For instance, `connections[1]` is `[0, 2]`, where 0 is the index of `pointA` and 2 is the index of `pointB`. Thus, `let pointAIndex = connections[j][0];` means we get the starting point (pointA) of the link `j`, and `let pointBIndex = connections[j][1];` means we get the ending point (pointB) of the link `j`.

Use the indices to retrieve the `pointA` and `pointB` objects from the `pose.keypoints`. As with all keypoints, `pointA` is an object with properties `x`, `y`, and `confidence`.

```javascript
    for (let j = 0; j < connections.length; j++) {
      let pointAIndex = connections[j][0];
      let pointBIndex = connections[j][1];
      let pointA = pose.keypoints[pointAIndex];
      let pointB = pose.keypoints[pointBIndex];
```

Now, we can draw the line connecting the keypoints if both points have a confidence score greater than 0.1.

```javascript
      // Only draw a line if we have confidence in both points
      if (pointA.confidence > 0.1 && pointB.confidence > 0.1) {
        stroke(255, 0, 0);
        strokeWeight(2);
        line(pointA.x, pointA.y, pointB.x, pointB.y);
      }
    }
  }
```

### Draw keypoints on the canvas

We can also represent each of the keypoints on the canvas. To do this, we will iterate through the `poses` array and draw a circle for each keypoint if the confidence score is greater than 0.1.

We can get each person's pose from the `poses` array. Each `pose` object contains an array of `keypoints`.

```javascript
  // Iterate through all the poses
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];
```

Next, we iterate through all of the keypoints in `keypoints`.

```javascript
    // Iterate through all the keypoints for each pose
    for (let j = 0; j < pose.keypoints.length; j++) {
      let keypoint = pose.keypoints[j];
```

For each keypoint, we only want to draw a circle if the keypoint's confidence is greater than 0.1. We can use the `confidence` property of the keypoint object to check the confidence score.

```javascript
      // Only draw a circle if the keypoint's confidence is greater than 0.1
      if (keypoint.confidence > 0.1) {
        fill(0, 255, 0);
        noStroke();
        circle(keypoint.x, keypoint.y, 10);
      }
    }
  }
}
```

### Run your sketch

Voila! You have successfully built the BodyPose model to detect and draw body poses in real-time from the webcam video. Press the <img class="inline-img" src="assets/facemesh-arrow-forward.png" alt="run button icon" aria-hidden="true"> `run` button to see the code in action. You can also find the [complete code](https://editor.p5js.org/ml5/sketches/hMN9GdrO3) in the p5.js web editor.

?> If you have any questions or spot something unclear in this step-by-step code guide, we'd love to hear from you! Join us on [Discord](https://discord.com/invite/3CVauZMSt7) and let us know how we can make it better.

## Methods

### ml5.bodyPose()

This method is used to load the bodyPose model and store it in a variable. The `?` means the argument is optional!

<!-- TODO: Add default model name, and explain the options, callback. -->

```javascript
let bodypose = ml5.bodyPose(?model, ?options, ?callback);
```

**Parameters:**

- **model**: Optional. Which model to use: the possible options are `MoveNet` (default) and `BlazePose`.

- **options**: Optional. An object to change the default configuration of the model. The available options differ depending on which of the two underlying models are used.

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

- **callback(bodypose, error)**: Optional. A "callback" function that runs when the model has been successfully loaded. Most ml5.js example call `ml5.bodyPose()` in the p5.js `preload()` function and no callback is needed.

**Returns:**

- **Object**: The bodyPose object. This object contains the methods to start and stop the pose detection process.

---

### bodypose.detectStart()

This method starts the pose detection process and runs it continuously on real-time video.

```javascript
bodypose.detectStart(media, gotPoses);
```

**Parameters:**

- **media**: An HTML or p5.js image, video, or canvas element to run the estimation on.
- **gotPoses(results, error)**: A callback function to handle the results of the pose estimation. See below for an example of the model's results:

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

**Parameters:**

- **media**: An HTML or p5.js image, video, or canvas element to run the estimation on.

- **callback(results, error)**: Optional. A callback function to handle the results of the pose estimation. See the results above for an example of the model's output.

**Returns:**

- **Array**: An array of poses.

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

**Returns:**

- **Array**: An array of arrays representing the connections between keypoints. For example, using BlazePose model will return:

  ```js
  [[0, 1], [0, 4], [1, 2], ...[28, 32], [29, 31], [30, 32]];
  ```

  using MoveNet model will return:

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

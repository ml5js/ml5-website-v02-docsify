# Bodypose

<center>
    <img style="display:block; max-width:100%" alt="pose estimation" src="https://1.bp.blogspot.com/-25aGTL-RTnY/YJ29jgiiNHI/AAAAAAAAEMM/9qJC_xqlUKo4To9xyumqKmrqKr-vVFXzgCLcBGAsYHQ/s0/three_pane_aligned%2B%25281%2529.gif">
</center>

## Description

Bodypose offers a versatile solution for pose estimation by leveraging the strengths of Movenet and Blazepose. It provides real-time, full-body pose estimation and precise tracking of key body parts, including hands, face, and body, in an optimized and lightweight package. 

#### Key Features

* Real-time full-body pose estimation
* High-precision keypoints tracking
* Lightweight and optimized for performance
* Easy integration into web-based projects using ml5.js


#### What can we do with the model?

Bodypose is suitable for a wide range of applications, such as interactive gaming, fitness apps, art installations, and accessibility solutions. Its accuracy and real-time performance make it a valuable tool for developers and creators!

Bodypose's MoveNet model predict a set of 17 keypoints:

> Nose, Left Eye, Right Eye, Left Ear, Right Ear, Left Shoulder, Right Shoulder, Left Elbow, Right Elbow, Left Wrist, Right Wrist, Left Hip, Right Hip, Left Knee, Right Knee, Left Ankle, Right Ankle


  See the diagram below for the position of each keypoint.

  <center>
      <img style="display:block; max-width:30%" alt="Keypoint Diagram" src="https://camo.githubusercontent.com/c3641b718d7e613b2ce111a6a4575e88ca35a60cb325efdd9113c453b2a09301/68747470733a2f2f73746f726167652e676f6f676c65617069732e636f6d2f6d6f76656e65742f636f636f2d6b6579706f696e74732d3530302e706e67">
  </center>

Bodypose's Blazepose model predict a set of 33 keypoints:

> Nose, Left Eye Inner, Left Eye, Left Eye Outer, Right Eye Inner, Right Eye, Right Eye Outer, Left Ear, Right Ear, Mouth Left, Mouth Right, Left Shoulder, Right Shoulder, Left Elbow, Right Elbow, Left Wrist, Right Wrist, Left Pinky, Right Pinky, Left Index, Right Index, Left Thumb, Right Thumb, Left Hip, Right Hip, Left Knee, Right Knee, Left Ankle, Right Ankle, Left Heel, Right Heel, Left Foot Index, Right Foot Index, Body Center, Forehead, Left Thumb, Left Hand, Right Thumb, Right Hand

  See the diagram below for the position of each keypoint.

  <center>
      <img style="display:block; max-width:30%" alt="Keypoint Diagram" src="https://camo.githubusercontent.com/17082997c33fc6d2544c4aea33d9898860cf902ed5a0b865527d1dd91bbc7efa/68747470733a2f2f73746f726167652e676f6f676c65617069732e636f6d2f6d65646961706970652f626c617a65706f73652d6b6579706f696e74732d757064617465642e706e67">
  </center>

Once you have the keypoints estimated by the model, you can utilize them in various ways based on your application:

**Human Pose Estimation**: You can reconstruct the human body pose by connecting the keypoints using skeletal connections. This helps visualize the pose and track the movement of body parts.

**Gesture Recognition**: By analyzing the relative positions and movements of keypoints over time, you can recognize specific gestures or actions performed by a person.

**Fitness Tracking**: PoseNet/MoveNet can be used to track exercises and provide feedback on the correctness of the exercise form. For instance, it can help ensure that a person is maintaining proper alignment during yoga poses or weightlifting.

**Augmented Reality**: Keypoints can be used to anchor virtual objects or effects to specific body parts, allowing for interactive augmented reality experiences.

**Biomechanics Analysis**: In sports and rehabilitation, PoseNet/MoveNet can provide insights into body movements, helping to analyze techniques, prevent injuries, and aid in recovery.

**Accessibility**: Bodypos can be used to track body movements and gestures to control devices and interfaces, enabling people with disabilities to interact with technology in new ways.

#### Output Example
An example of the output from Body Pose MoveNet model is shown below:

```javascript
[
  {
    keypoints: [
      { y: 64.88419532775879, x: 381.0333251953125, score: 0.7116302847862244, name: "nose" },
      // Additional keypoints here...
    ],
    box: { yMin: 0.004535397049039602, xMin: 0.06256416440010071, yMax: 0.9879268407821655, xMax: 0.9208574295043945, width: 0.8582932651042938, height: 0.9833914437331259 },
    score: 0.3704647719860077,
    id: 4,
    nose: { x: 381.0333251953125, y: 64.88419532775879, score: 0.7116302847862244 },
    left_eye: { /* Properties of the left eye */ },
    right_eye: { /* Properties of the right eye */ },
    left_ear: { /* Properties of the left ear */ },
    right_ear: { /* Properties of the right ear */ },
    left_shoulder: { /* Properties of the left shoulder */ },
    right_shoulder: { /* Properties of the right shoulder */ },
    left_elbow: { /* Properties of the left elbow */ },
    right_elbow: { /* Properties of the right elbow */ },
    left_wrist: { /* Properties of the left wrist */ },
    right_wrist: { /* Properties of the right wrist */ },
    left_hip: { /* Properties of the left hip */ },
    right_hip: { /* Properties of the right hip */ },
    left_knee: { /* Properties of the left knee */ },
    right_knee: { /* Properties of the right knee */ },
    left_ankle: { /* Properties of the left ankle */ },
    right_ankle: { /* Properties of the right ankle */ }
  },
  // Additional objects here...
];
```

An example of the output from Body Pose Blazepose model is shown below:

```javascript
[
  {
    keypoints: [
      { x: 384.1078567504883, y: 209.4658613204956, z: -0.35329264402389526, score: 0.9999341368675232, name: "nose" },
      // Additional keypoints here...
    ],
    keypoints3D: [
      { x: -0.08051524311304092, y: -0.6131212711334229, z: -0.3431171476840973, score: 0.9999341368675232, name: "nose" },
      // Additional 3D keypoints here...
    ],
    nose: { x: 384.1078567504883, y: 209.4658613204956, z: -0.35329264402389526, score: 0.9999341368675232 },
    left_eye_inner: { /* Properties of the left eye inner */ },
    left_eye: { /* Properties of the left eye */ },
    left_eye_outer: { /* Properties of the left eye outer */ },
    right_eye_inner: { /* Properties of the right eye inner */ },
    right_eye: { /* Properties of the right eye */ },
    right_eye_outer: { /* Properties of the right eye outer */ },
    left_ear: { /* Properties of the left ear */ },
    right_ear: { /* Properties of the right ear */ },
    mouth_left: { /* Properties of the mouth left */ },
    mouth_right: { /* Properties of the mouth right */ },
    left_shoulder: { /* Properties of the left shoulder */ },
    right_shoulder: { /* Properties of the right shoulder */ },
    left_elbow: { /* Properties of the left elbow */ },
    right_elbow: { /* Properties of the right elbow */ },
    left_wrist: { /* Properties of the left wrist */ },
    right_wrist: { /* Properties of the right wrist */ },
    left_pinky: { /* Properties of the left pinky */ },
    right_pinky: { /* Properties of the right pinky */ },
    left_index: { /* Properties of the left index finger */ },
    right_index: { /* Properties of the right index finger */ },
    left_thumb: { /* Properties of the left thumb */ },
    right_thumb: { /* Properties of the right thumb */ },
    left_hip: { /* Properties of the left hip */ },
    right_hip: { /* Properties of the right hip */ },
    left_knee: { /* Properties of the left knee */ },
    right_knee: { /* Properties of the right knee */ },
    left_ankle: { /* Properties of the left ankle */ },
    right_ankle: { /* Properties of the right ankle */ },
    left_heel: { /* Properties of the left heel */ },
    right_heel: { /* Properties of the right heel */ },
    left_foot_index: { /* Properties of the left foot index */ },
    right_foot_index: { /* Properties of the right foot index */ }
  },
  // Additional objects here...
];
```

## Getting Started
Integrating Bodypose into your ml5.js projects is straightforward. Our documentation and user-friendly API will help you make the most of this combined model!

### Demo

[p5 Web Editor](iframes/pose-estimation ':include :type=iframe width=100% height=550px')

### Quickstart
Before you start, let's create an empty project in the [p5 web editor](https://editor.p5js.org/).

First of all, copy and paste the following code into your **index.html** file. If you are not familiar with the p5 web editor interface, you can find a guide on how to find your **index.html** file [here](/?id=try-ml5js-online-1).

```html
<script src="https://unpkg.com/ml5@alpha/dist/ml5.js"></script>
```

Then, add the code below to your **sketch.js** file:

```js
let video;
let bodyPose;
let poses = [];

function preload() {
  // Load the bodyPose model, default is MoveNet model
  bodyPose = ml5.bodypose();
}

function setup() {
  createCanvas(640, 480);

  // Create the video and hide it
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  // Start detecting poses in the webcam video
  bodyPose.detectStart(video, gotPoses);
}

function draw() {
  // Draw the webcam video
  image(video, 0, 0, width, height);

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

// Callback function for when bodyPose outputs data
function gotPoses(results) {
  // Save the output to the poses variable
  poses = results;
}
```
Alternatively, you can open [this example code](https://github.com/ml5js/ml5-next-gen/tree/main/examples/BodyPose-keypoints) and try it yourself on p5.js web editor!

### Additional Examples
* [BodyPose-blazepose-keypoints](https://github.com/ml5js/ml5-next-gen/tree/main/examples/BodyPose-blazepose-keypoints)

<!-- ### Tutorials

**PoseNet on The Coding Train**
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/OIo-DIOkNVg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> -->

## Methods

#### ml5.bodypose()

This method is used to initialize the bodypose object.

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
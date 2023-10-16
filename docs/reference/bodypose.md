# Bodypose

<center>
    <!-- <img style="display:block; max-height:20rem" alt="pose detection" src="_media/reference__header-posenet.jpg"> -->
    <img style="display:block; max-width:100%" alt="pose estimation" src="https://1.bp.blogspot.com/-25aGTL-RTnY/YJ29jgiiNHI/AAAAAAAAEMM/9qJC_xqlUKo4To9xyumqKmrqKr-vVFXzgCLcBGAsYHQ/s0/three_pane_aligned%2B%25281%2529.gif">
    
    <!-- <p>image via: https://pdm.com.co/tag/posenet/</p> -->
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

  ![Keypoint Diagram](https://camo.githubusercontent.com/b8a385301ca6b034d5f4807505e528b4512a0aa78507dec9ebafcc829b9556be/68747470733a2f2f73746f726167652e676f6f676c65617069732e636f6d2f6d6f76656e65742f636f636f2d6b6579706f696e74732d3530302e706e67)

Once you have the 17 keypoints estimated by the model, you can utilize them in various ways based on your application:

**Human Pose Estimation**: You can reconstruct the human body pose by connecting the keypoints using skeletal connections. This helps visualize the pose and track the movement of body parts.

**Gesture Recognition**: By analyzing the relative positions and movements of keypoints over time, you can recognize specific gestures or actions performed by a person.

**Fitness Tracking**: PoseNet/MoveNet can be used to track exercises and provide feedback on the correctness of the exercise form. For instance, it can help ensure that a person is maintaining proper alignment during yoga poses or weightlifting.

**Augmented Reality**: Keypoints can be used to anchor virtual objects or effects to specific body parts, allowing for interactive augmented reality experiences.

**Biomechanics Analysis**: In sports and rehabilitation, PoseNet/MoveNet can provide insights into body movements, helping to analyze techniques, prevent injuries, and aid in recovery.

**Accessibility**: Bodypos can be used to track body movements and gestures to control devices and interfaces, enabling people with disabilities to interact with technology in new ways.


## Getting Started
Integrating Bodypose into your ml5.js projects is straightforward. Our documentation and user-friendly API will help you make the most of this combined model!

### Demo

[p5 Web Editor](iframes/pose-estimation ':include :type=iframe width=100% height=550px')

### Quickstart
First of all, copy and paste the following code into your **index.html** file:

```html
(will be added.)
```

Then, add the code below to your **script.js** file:

```js
let video;
let bodypose;

function setup() {
  createCanvas(640, 480);

  // Create a video element
  video.createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  // Create a new poseNet method with a single detection
  bodypose = ml5.bodypose(modelLoaded);
  // start detecting poses
  bodypose.detectStart();
}

function draw() {
  // Draw the video
  image(video, 0, 0, width, height);

  // Draw the keypoints and skeleton
  bodypose.showSkeleton();
  bodypose.showKeypoints();
}

// When the model is loaded
function modelLoaded() {
  console.log('Model Loaded!');
}

```
Alternatively, you can open [this example code](https://editor.p5js.org/ml5/sketches/PoseNet_image_single) and try it yourself on p5.js web editor!

### Additional Examples
* [PoseNet_image_single](https://editor.p5js.org/ml5/sketches/PoseNet_image_single)
* [PoseNet_part_selection](https://editor.p5js.org/ml5/sketches/PoseNet_part_selection)
* [PoseNet_webcam](https://editor.p5js.org/ml5/sketches/PoseNet_webcam)

### Tutorials

**PoseNet on The Coding Train**
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/OIo-DIOkNVg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

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
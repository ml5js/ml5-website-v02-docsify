# FaceMesh

<center>
  <img class="header-img" src="assets/header-facemesh.png" alt="FaceMesh Header Image" >
  <p class="img-credit"> Image Credit: <a href="https://thenounproject.com/creator/pglen/" target="_blank" title="Paweł Gleń">Paweł Gleń</a> | <a href='mailto:info@ml5js.org'>Contribute ♥️</a> </p>
</center>

## Description

FaceMesh is a machine-learning model that allows for facial landmark detection in the browser. It can detect multiple faces at once and provides 468 3D facial landmarks that describe the geometry of each face. FaceMesh works best when the faces in view take up a large percentage of the image or video frame and it may struggle with small/distant faces.

The ml5.js FaceMesh model is ported from the [TensorFlow.js FaceMesh implementation](https://github.com/tensorflow/tfjs-models/tree/master/face-landmarks-detection).

It provides the following functionalities:

- **Facial Landmark Detection**: Detect the 3D coordinates of 468 keypoints on the face.
- **Face Bounding Box**: Provide the bounding box of each detected face.
- **Multiple Faces**: Detect multiple faces at the same time. You can specify the maximum number of faces to detect.

## Quick Start

Run and explore a pre-built example! [This FaceMesh example](https://editor.p5js.org/ml5/sketches/lCurUW1TT) displays 468 facial landmarks that describe the geometry of each face in real-time from the webcam.

</br>

[DEMO](iframes/facemesh-keypoints ":include :type=iframe width=100% height=550px")

## Examples

- [FaceMesh Keypoints](https://editor.p5js.org/ml5/sketches/lCurUW1TT): Draw the keypoints of the detected face from the webcam.
- [FaceMesh Single Image](https://editor.p5js.org/ml5/sketches/lqQZrDJHF): Detect the keypoints of the face from a single image.
- [FaceMesh Parts](https://editor.p5js.org/ml5/sketches/9y9W7eAee): Draw specific face parts of the detected face.

## Step-by-Step Guide

Now, let's together build the [FaceMesh Keypoints example](https://editor.p5js.org/ml5/sketches/lCurUW1TT) from scratch, and in the process, learn how to use the FaceMesh model.

### Create a new project

To follow along, start by creating an empty project in the [p5.js web editor](https://editor.p5js.org/).

### Set up ml5.js

Import the ml5.js library in your `index.html` file.

```html
<script src="https://unpkg.com/ml5@1/dist/ml5.js"></script>
```

?> If you are not familiar with how to import the ml5.js library and need more detailed guidance, please check out our [Getting Started](/?id=set-up-ml5js) page.

### Load model

Let's open the `sketch.js` file and define a variable to store the FaceMesh model.

```javascript
let faceMesh;
```

Next, we can create a `options` object to customize the model's behavior. For example, we can set the maximum number of faces to detect to 1, disable the refinement of landmarks (further refine the landmark coordinates around the eyes and lips at the cost of compute), and prevent the model from flipping the image horizontally.

```javascript
let options = { maxFaces: 1, refineLandmarks: false, flipHorizontal: false };
```

?> If you would like to know more about the available configuration settings for `options`, please check out the [Methods](/reference/facemesh?id=methods) section.

Now, we are ready to load a model configed as `options` specifies and store it in the `faceMesh` variable.

Let's create a `preload` function to load the FaceMesh model. The `preload` function is a p5.js function that runs before the `setup` and `draw` function. This is where we load the model to ensure it is ready before we use it.

```javascript
function preload() {
  faceMesh = ml5.faceMesh(options);
}
```

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

### Detect keypoints with the model

Define a `faces` variable to store the detected faces. Note that the `faces` variable will store an array of detected faces, and each face has a property `keypoints` that will contain an array of keypoints.

```javascript
let faces = [];
```

To start detecting the keypoints of the face, in the `setup` function, we need to call the `detectStart` method of the `faceMesh` object. This method takes the webcam video as input and a callback function to handle the output.

```javascript
function setup() {
  ...
  video.hide();

  // Start detecting faces from the webcam video
  faceMesh.detectStart(video, gotFaces);
}
```

The `gotFaces()` function is a callback function that will be called when the `faceMesh.detectStart()` method detects faces. Once the faces are detected, the output `results` will be passed to `gotFaces()`, and then saved to the `faces` variable.

```javascript
// Callback function for when faceMesh outputs data
function gotFaces(results) {
  // Save the output to the faces variable
  faces = results;
}
```

### Draw keypoints on the canvas

In the `draw()` function, draw the webcam video on the canvas.

```javascript
function draw() {
  image(video, 0, 0, width, height);
```

Iterate all faces of the `faces` array, fetch the `i`th dectected face, and store it in the `face` variable.

```javascript
// Draw all the tracked face points
  for (let i = 0; i < faces.length; i++) {
    let face = faces[i];
```

Iterate though all the keypoints of the `i`th detected face, fetch the `j`th keypoint, and store it in the `keypoint` variable.

```javascript
    for (let j = 0; j < face.keypoints.length; j++) {
      let keypoint = face.keypoints[j];
```

Draw a green circle at the location of the `j`th keypoint.

```javascript
      fill(0, 255, 0);
      noStroke();
      circle(keypoint.x, keypoint.y, 5);
    }
  }
}
```

Note we are iterating through all the keypoints (`j` is ranging from 0 to the length of the keypoints array) of the detected face (`i` is ranging from 0 to the length of the faces array). This will result in green landmarks on all detected face(s) in the webcam video. In our case, we set the maximum number of faces to detect to 1 in the `options` object (`maxFaces: 1`), so we will only see landmarks on one face.

### Run your sketch

And, that's it! You have successfully built the FaceMesh Keypoints example from scratch. Press the <img class="inline-img" src="assets/facemesh-arrow-forward.png" alt="tip icon" aria-hidden="true"> `run` button to see the code in action. You can also find the complete code [here](https://editor.p5js.org/ml5/sketches/lCurUW1TT).

?> If you have any questions or spot something unclear in this step-by-step code guide, we'd love to hear from you! Join us on [Discord](https://discord.com/invite/3CVauZMSt7) and let us know how we can make it better.

## Properties

### faceMesh.model

- **Description**
  - The TensorFlow.js model used for face landmarks detection.
- **Type**
  - tf.LayersModel

---

### faceMesh.config

- **Description**
  - Configuration options provided by the user for the model.
- **Type**
  - Object

---

### faceMesh.runtimeConfig

- **Description**
  - Configuration options related to the runtime behavior of the model.
- **Type**
  - Object

---

### faceMesh.detectMedia

- **Description**
  - The media element (image, video, or canvas) on which face detection is performed.
- **Type**
  - HTMLElement

---

### faceMesh.detectCallback

- **Description**
  - The callback function to handle face detection results.
- **Type**
  - Function

---

### faceMesh.detecting

- **Description**
  - A flag indicating whether the detection loop is currently running.
- **Type**
  - Boolean

---

### faceMesh.signalStop

- **Description**
  - A flag used to signal the detection loop to stop.
- **Type**
  - Boolean

---

### faceMesh.prevCall

- **Description**
  - Tracks the previous call to `detectStart` or `detectStop` to handle warnings.
- **Type**
  - String

---

### faceMesh.ready

- **Description**
  - A promise that resolves when the model has loaded.
- **Type**
  - Promise

## Methods

### ml5.faceMesh()

This method is used to initialize the faceMesh object.

```javascript
const faceMesh = ml5.faceMesh(?options, ?callback);
```

**Parameters:**

- **options**: Optional. An object to change the default configuration of the model. The default and available options are:

  ```javascript
  {
      maxFaces: 1,
      refineLandmarks: false,
      flipHorizontal: false
  }
  ```

  Options for face detection:

  - _maxFacess_
    - Number: The maximum number of faces to detect. Defaults to 2.
  - _refineLandmarks_ 
    - Boolean: Refine the landmarks. Defaults to false.
  - _flipHorizontal_ 
    - Boolean: Flip the result horizontally. Defaults to false.
  - _runtime_
    - String: The runtime to use. "tfjs" (default) or "mediapipe".

  For using custom or offline models:

  - _solutionPath_
    - String: The file path or URL to the model.

  More info on options [here](https://github.com/tensorflow/tfjs-models/tree/master/face-landmarks-detection/src/mediapipe#create-a-detector).

- **callback(faceMesh, error)**: Optional. A function to run once the model has been loaded. Alternatively, call `ml5.faceMesh()` within the p5 `preload` function.

**Returns:**  

- **Object**: The faceMesh object. This object contains the methods to start and stop the detection process.

---

### faceMesh.detectStart()

This method repeatedly outputs face estimations on an image media through a callback function.

```javascript
faceMesh.detectStart(media, callback);
```

**Parameters:**

- **media**: An HTML or p5.js image, video, or canvas element to run the estimation on.
- **callback(results, error)**: A callback function to handle the output of the estimation. See below for an example output passed into the callback function:

  ```javascript
  [
    {
      box: { width, height, xMax, xMin, yMax, yMin },
      keypoints: [{ x, y, z, name }, ... ],
      faceOval: { x, y, width, height, centerX, centerY, keypoints: [{ x, y, z }, ... ]},
      leftEye: { x, y, width, height, centerX, centerY, keypoints: [{ x, y, z }, ... ]},
      ...
    },
    ...
  ]
  ```

  [Here](https://github.com/tensorflow/tfjs-models/blob/master/face-landmarks-detection/mesh_map.jpg) is a diagram for the position of each keypoint (download and zoom in to see the index).

---

### faceMesh.detectStop()

This method can be called after a call to `faceMesh.detectStart` to stop the repeating face estimation.

```javascript
faceMesh.detectStop();
```

---

### faceMesh.detect()

This method asynchronously outputs a single face estimation on an image media when called.

```javascript
faceMesh.detect(media, ?callback);
```

**Parameters:**

- **media**: An HTML or p5.js image, video, or canvas element to run the estimation on.
- **callback(results, error)**: Optional. A callback function to handle the output of the estimation, see output example above.


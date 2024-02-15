# Facemesh


<center>
    <img style="display:block; max-height:20rem" alt="A screenshot of a video feed where a person sits at their chair inside of a bedroom while green dots are drawn over different locations on their face." src="_media/reference__header-facemesh.jpg">
</center>


## Description

Facemesh is a machine-learning model that allows for facial landmark detection in the browser. It can detect multiple faces at once and provides 468 3D facial landmarks that describe the geometry of each face. Facemesh works best when the faces in view take up a large percentage of the image or video frame and it may struggle with small/distant faces.

The ml5.js Facemesh model is ported from the [Mediapipe Facemesh implementation](https://github.com/tensorflow/tfjs-models/tree/master/face-landmarks-detection).

#### Key Features
- **Facial Landmark Detection**: Facemesh can detect the 3D coordinates of 468 keypoints on the face.
- **Face Bounding Box**: Facemesh can provide the bounding box of each detected face.
- **Face Parts Contour**: Facemesh can provide the 3D coordinates of the contour of each face part (lips, eyes, eyebrows, and face oval).
- **Multiple Faces**: Facemesh can detect multiple faces at the same time. You can specify the maximum number of faces to detect.

#### Output Example
An example of the output from Facemesh is shown below:

```javascript
[
  {
    keypoints: [
      { x: 331.7021942138672, y: 332.43553161621094, z: -18.904154300689697, name: "lips" },
      // Additional keypoints here...
    ],
    box: { xMin: 255.43195724487305, yMin: 186.6709327697754, xMax: 433.4109115600586, yMax: 387.9571723937988, width: 177.97895431518555, height: 201.28623962402344 },
    lips: [
      { x: 331.7021942138672, y: 332.43553161621094, z: -18.904154300689697 },
      // Additional lip keypoints here...
    ],
    rightEye: [
      // Keypoints for right eye
    ],
    faceOval: [
      // Keypoints for face oval
    ],
    rightEyebrow: [
      // Keypoints for right eyebrow
    ],
    leftEye: [
      // Keypoints for left eye
    ],
    leftEyebrow: [
      // Keypoints for left eyebrow
    ]
  },
  // Additional objects here...
]
```

## Getting Started
Ready to give it a try? Just follow our simple instructions, and you'll be on your way to creating your very own Facemesh project in no time!

### Demo
[p5 Web Editor](iframes/facemesh-keypoints ':include :type=iframe width=100% height=550px')

### Quickstart
Before you start, let's create an empty project in the [p5 web editor](https://editor.p5js.org/).

First of all, copy and paste the following code into your **index.html** file. If you are not familiar with the p5 web editor interface, you can find a guide on how to find your **index.html** file [here](#/?id=try-ml5js-online-1).

```html
<script src="https://unpkg.com/ml5@alpha/dist/ml5.js"></script>
```

Then, add the code below to your **sketch.js** file:

```js
let faceMesh;
let video;
let faces = [];
let options = { maxFaces: 1, refineLandmarks: false, flipHorizontal: false };

function preload() {
  // Load the faceMesh model
  faceMesh = ml5.facemesh(options);
}

function setup() {
  createCanvas(640, 480);
  // Create the webcam video and hide it
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
  // Start detecting faces from the webcam video
  faceMesh.detectStart(video, gotFaces);
}

function draw() {
  // Draw the webcam video
  image(video, 0, 0, width, height);

  // Draw all the tracked face points
  for (let i = 0; i < faces.length; i++) {
    let face = faces[i];
    for (let j = 0; j < face.keypoints.length; j++) {
      let keypoint = face.keypoints[j];
      fill(0, 255, 0);
      noStroke();
      circle(keypoint.x, keypoint.y, 5);
    }
  }
}

// Callback function for when faceMesh outputs data
function gotFaces(results) {
  // Save the output to the faces variable
  faces = results;
}
```

Alternatively, you can open [this example code](https://github.com/ml5js/ml5-next-gen/tree/main/examples/FaceMesh-keypoints) and try it yourself on p5.js web editor!

### Additional Examples
* [FaceMesh-parts](https://github.com/ml5js/ml5-next-gen/tree/main/examples/FaceMesh-parts)
* [FaceMesh-single-image](https://github.com/ml5js/ml5-next-gen/tree/main/examples/FaceMesh-single-image)

TODO (link p5 web editor examples once uploaded)

### Tutorials

**PoseNet on The Coding Train**
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/OIo-DIOkNVg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

TODO (link new youtube video once uploaded)

## Methods

#### ml5.facemesh()

This method is used to initialize the facemesh object.

```javascript
const facemesh = ml5.facemesh(?options, ?callback);
```

**Parameters:**

- **options**: OPTIONAL. An object to change the default configuration of the model. The default and available options are:

  ```javascript
  {
      maxFaces: 1,
      refineLandmarks: false,
      flipHirzontal: false
  }
  ```

  More info on options [here](https://github.com/tensorflow/tfjs-models/tree/master/face-landmarks-detection/src/mediapipe#create-a-detector).

- **callback(facemesh, error)**: OPTIONAL. A function to run once the model has been loaded. Alternatively, call `ml5.facemesh()` within the p5 `preload` function.

**Returns:**  
The facemesh object.

#### facemesh.detectStart()

This method repeatedly outputs face estimations on an image media through a callback function.

```javascript
facemesh.detectStart(media, callback);
```

**Parameters:**

- **media**: An HMTL or p5.js image, video, or canvas element to run the estimation on.
- **callback(output, error)**: A callback function to handle the output of the estimation. See below for an example output passed into the callback function:

  ```javascript
  [
    {
      box: { width, height, xMax, xMin, yMax, yMin },
      keypoints: [{x, y, z, name}, ... ],
      faceOval: [{x, y, z}, ...],
      leftEye: [{x, y, z}, ...],
      ...
    },
    ...
  ]
  ```

  [Here](https://github.com/tensorflow/tfjs-models/blob/master/face-landmarks-detection/mesh_map.jpg) is a diagram for the position of each keypoint (download and zoom in to see the index).

#### facemesh.detectStop()

This method can be called after a call to `facemesh.detectStart` to stop the repeating face estimation.

```javascript
facemesh.detectStop();
```

#### facemesh.detect()

This method asynchronously outputs a single face estimation on an image media when called.

```javascript
facemesh.detect(media, ?callback);
```

**Parameters:**

- **media**: An HMTL or p5.js image, video, or canvas element to run the estimation on.
- **callback(output, error)**: OPTIONAL. A callback function to handle the output of the estimation, see output example above.

**Returns:**  
A promise that resolves to the estimation output.

<br>

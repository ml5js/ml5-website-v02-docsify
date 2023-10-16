# Facemesh


<center>
    <img style="display:block; max-height:20rem" alt="A screenshot of a video feed where a person sits at their chair inside of a bedroom while green dots are drawn over different locations on their face." src="_media/reference__header-facemesh.jpg">
</center>


## Description

Facemesh is a machine-learning model that allows for facial landmark detection in the browser. It can detect multiple faces at once and provides 486 3D facial landmarks that describe the geometry of each face. Facemesh works best when the faces in view take up a large percentage of the image or video frame and it may struggle with small/distant faces.

The ml5.js Facemesh model is ported from the [TensorFlow.js Facemesh implementation](https://github.com/tensorflow/tfjs-models/tree/master/face-landmarks-detection).

## Quickstart

```js
let predictions = [];
const video = document.getElementById('video');

// Create a new facemesh method
const facemesh = ml5.facemesh(video, modelLoaded);

// When the model is loaded
function modelLoaded() {
  console.log('Model Loaded!');
}

// Listen to new 'face' events
facemesh.on('face', results => {
  predictions = results;
});
```

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

### Examples

TODO (link p5 web editor examples once uploaded)

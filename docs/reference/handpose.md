# Handpose


<center>
    <img style="display:block; max-height:20rem" alt="A GIF of a person waving their hand in front of a camera. Green dots are drawn over different locations on their palm and fingers–demonstrating the capabilities of the Handpose model." src="_media/reference__header-handpose.gif">
</center>


## Description

Handpose is a machine-learning model that allows for palm detection and hand-skeleton finger tracking in the browser. It can detect a maximum of one hand at a time and provides 21 3D hand keypoints that describe important locations on the palm and fingers.

The ml5.js Handpose model is ported from the [TensorFlow.js Handpose implementation](https://github.com/tensorflow/tfjs-models/tree/master/handpose).

## Quickstart

```js
let predictions = [];
const video = document.getElementById('video');

// Create a new handpose method
const handpose = ml5.handpose(video, modelLoaded);

// When the model is loaded
function modelLoaded() {
  console.log('Model Loaded!');
}

// Listen to new 'hand' events
handpose.on('hand', results => {
  predictions = results;
});
```
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

### Examples

TODO (link p5 web editor examples once uploaded)
# BodySegmentation

<center>
  <img class="header-img" src="assets/header-body-segmentation.png" alt="BodySegmentation Header Image" >
  <p class="img-credit"> Image Credit: <a href="https://thenounproject.com/creator/ibrandify/" target="_blank" title="ibrandify">ibrandify</a> | <a href='mailto:info@ml5js.org'>Contribute ♥️</a> </p>
</center>

## Description

The ml5.js BodySegmentation provides two models, `SelfieSegmentation` and `BodyPix`. The `SelfieSegmentation` model focuses on segmenting the human subject from the background. The `BodyPix` model is primarily used for detailed body part segmentation (e.g., distinguishing between different limbs) in images and videos. Although BodyPix can also perform person/background segmentation, it is more computationally intensive.

The ml5.js BodySegmentation is built on top of the [TensorFlow.js BodyPix model and the MediaPipe Selfie Segmentation model](https://github.com/tensorflow/tfjs-models/tree/master/body-segmentation).

It provides following functionalities:
- **Real-time person/background segmentation**: The `SelfieSegmentation` model can segment people from the background in real-time, and is designed to be lightweight. The `BodyPix` model can also be used for this purpose, but is more computationally intensive.
- **Real-time body part segmentation**: The `BodyPix` model can segment 24 body parts in real-time.

## Quick Start

Run and explore a pre-built example! [This BodySegmentation example](https://editor.p5js.org/ml5/sketches/ruoyal-RC) demonstrates how to use the BodySegmentation `BodyPix` model to segment body parts from webcam input.

</br>

[DEMO](iframes/body-segmentation ":include :type=iframe width=100% height=550px")

## Examples
- [BodySegmentation Mask Body Parts](https://editor.p5js.org/ml5/sketches/ruoyal-RC): Segment body parts from webcam input.
- [BodySegmentation Mask Background](https://editor.p5js.org/ml5/sketches/KNsdeNhrp): Segment the background from webcam input.
- [BodySegmentation Mask Person](https://editor.p5js.org/ml5/sketches/h6TN8umP5): Segment the person from webcam input.

## Step-by-Step Guide
Now, let's together build the [BodySegmentation Mask Body Part example](https://editor.p5js.org/ml5/sketches/ruoyal-RC) from scratch, and in the process, learn how to use the BodySegmentation models.

### Create a new project

To follow along, start by creating an empty project in the [p5.js web editor](https://editor.p5js.org/).

### Set up ml5.js
Import the ml5.js library in your `index.html` file.

```html
<script src="https://unpkg.com/ml5@1/dist/ml5.js"></script>
```

?> If you are not familiar with how to import the ml5.js library and need more detailed guidance, please check out our [Getting Started](/?id=set-up-ml5js) page.

### Load model
Let's open the `sketch.js` file and define a variable to store the BodySegmentation model.

```javascript
let bodySegmentation;
```

In this example, we would like to segment body parts from the webcam input. Let's specify the mask type as `parts` in the options object.

```javascript
let options = {
  maskType: "parts",
};
```

?> You can also specify the mask type as `person` or `background` in the options object. For more information on the options object, please refer to the [Methods](/reference/body-segmentation?id=methods) section.

Now, let's preload the BodySegmentation model with the specified options. Using the `preload` function ensures that the model is loaded before the `setup` and `draw` functions are called.

```javascript
function preload() {
  bodySegmentation = ml5.bodySegmentation("BodyPix", options);
}
```

### Fetch webcam video

Let's define a variable `video` to store the webcam video.

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

### Detect body parts with the model
We can now use the BodySegmentation model to detect body parts from the webcam input. Let's define a variable `segmentation` to store the segmented body parts.

```javascript
let segmentation;
```

To start detecting the body parts, in the `setup` function, we need to call the `detectStart` method of the `bodySegmentation` object. This method takes the webcam video as input and a callback function to handle the output.

```javascript
function setup() {
  // ...
  video.hide();

  // Start detecting body parts from the webcam video
  bodySegmentation.detectStart(video, gotResults);
}
```

The `gotResults()` function is a callback function that will be called when the `bodySegmentation.detectStart()` method detects body parts. Once the body parts are detected, the output `result` will be passed to `gotResults()`, and then saved to the `segmentation` variable.

```javascript
function gotResults(result) {
  segmentation = result;
}
```

?> The `result` object also contains additional properties. For more information on the output object, please refer to the [Methods](/reference/body-segmentation?id=methods) section.

### Display the segmented body parts
Before we display the segmented body parts, let's clear the canvas and draw the webcam video.

```javascript
function draw() {
  background(255);
  image(video, 0, 0);
```

If the `segmentation` variable is not empty, we can display the segmented body parts on the canvas.

```javascript
  if (segmentation) {
    image(segmentation.mask, 0, 0, width, height);
  }
}
```

### Run your sketch
You have successfully built the BodySegmentation Mask Body Part example! Press the <img class="inline-img" src="assets/facemesh-arrow-forward.png" alt="run button icon" aria-hidden="true"> `run` button to see the code in action. You can also find the [complete code](https://editor.p5js.org/ml5/sketches/ruoyal-RC) in the p5.js web editor.

?> If you have any questions or spot something unclear in this step-by-step code guide, we'd love to hear from you! Join us on [Discord](https://discord.com/invite/3CVauZMSt7) and let us know how we can make it better.

## Properties

### bodySegmentation.modelName

- **Description**
  - The name of the model being used, typically "BodyPix" or "SelfieSegmentation".
- **Type**
  - String

---

### bodySegmentation.video

- **Description**
  - The video element on which segmentation is performed.
- **Type**
  - HTMLVideoElement

---

### bodySegmentation.model

- **Description**
  - The TensorFlow.js model used for body segmentation.
- **Type**
  - tf.LayersModel

---

### bodySegmentation.config

- **Description**
  - Configuration options provided by the user for the model.
- **Type**
  - Object

---

### bodySegmentation.runtimeConfig

- **Description**
  - Configuration options related to the runtime behavior of the model.
- **Type**
  - Object

---

### bodySegmentation.detectMedia

- **Description**
  - The media element (image, video, or canvas) on which body segmentation is performed.
- **Type**
  - HTMLElement

---

### bodySegmentation.detectCallback

- **Description**
  - The callback function to handle body segmentation results.
- **Type**
  - Function

---

### bodySegmentation.ready

- **Description**
  - A promise that resolves when the model has loaded.
- **Type**
  - Promise

---



## Methods

### ml5.bodySegmentation()

This method is used to initialize the bodySegmentation object.

```javascript
const bodySegmentation = ml5.bodySegmentation(?modelName, ?options, ?callback);
```

**Parameters:**

- **modelName**: Optional. A string specifying which model to use. Types of model:
  - _SelfieSegmentation_(default): A model that can be used to segment people from the background.
  - _BodyPix_: A model that can be used to segment people and body parts.



- **options**: Optional. An object to change the default configuration of the model. See the example options object:

  ```javascript
  {
    runtime: "tfjs", // "tfjs" or "mediapipe"
    modelType: "general", // "general" or "landscape"
    maskType: "background", // "background", "person", or "parts" (used to change the type of segmentation mask output)
    flipped: false,
  }
  ```

  Important Option:
  - _maskType_: The type of mask to output. The options are:
    - _background_: A mask of the background. The result is an image with transparent pixels on the background and black pixels on the person.
    - _person_: A mask of the person. The result is an image with black pixels on the background and transparent pixels on the person.
    - _parts_: **BodyPix** only. A mask of the body parts. The result is an image with white pixels on the background and various color pixels for each body part.
  - _flipped_ - Optional
    - Boolean: Flip the result horizontally. Defaults to false.

  [More info on options for SelfieSegmentation model with tfjs runtime](https://github.com/tensorflow/tfjs-models/tree/master/body-segmentation/src/selfie_segmentation_tfjs#create-a-detector).

  [More info on options for SelfieSegmentation model with mediaPipe runtime](https://github.com/tensorflow/tfjs-models/tree/master/body-segmentation/src/selfie_segmentation_mediapipe#create-a-detector).

  [More info on options for BodyPix model.](https://github.com/tensorflow/tfjs-models/blob/master/body-segmentation/src/body_pix/README.md#create-a-detector)

- **callback(bodySegmentation, error)**: Optional. A function to run once the model has been loaded. Alternatively, call `ml5.bodySegmentation()` within the p5 `preload` function.

**Returns:**

- **Object**: The bodySegmentation object. This object contains the methods to start and stop the body segment detection process.

---

### bodySegmentation.detectStart()

This method repeatedly outputs segmentation masks on an image media through a callback function.

```javascript
bodySegmentation.detectStart(media, callback);
```

**Parameters:**

- **media**: An HTML or p5.js image, video, or canvas element to run the segmentation on.

- **callback(output, error)**: Optional. A callback function to handle the results of the body segmentation.

The `output` will contain an object with the following properties. Based on the `maskType` option, the `mask` (and `maskImageData`) will contain either a mask of the detected background, or a mask of the detected persons, or a (colored) mask of the detected body parts of the detected persons.

  ```javascript
  {
    mask: {}, // a p5 Image object, can be directly passed into p5 image() function
    maskImageData: {}, // the mask as an ImageData object
    data: [], // an array of raw detection results
    imageData: {}, // an ImageData object of the raw detection results
  }
  ```

The `data` array contains the underlying segmentation result of the image, stored as one number per pixel of the input image. (With the BodyPix model, the right hand is e.g. the number 11, which is the same as `bodySegmentation.LEFT_HAND`.)

  _results.mask_ under different _maskType_ options:
  - _background_: A mask of the background. _results.mask_ is an image with transparent pixels on the background and black pixels on the person.
  - _body_: A mask of the person. _results.mask_ is an image with black pixels on the background and transparent pixels on the person.
  - _parts_: **BodyPix** only. _results.mask_ is an image with white pixels on the background and various color pixels for each body part.

---

### bodySegmentation.detectStop()

This method can be called after a call to `bodySegmentation.detectStart` to stop the repeating pose estimation.

```javascript
bodySegmentation.detectStop();
```

---

### bodySegmentation.detect()

This method asynchronously outputs a single segmentation mask on an image media when called.

```javascript
bodySegmentation.detect(media, ?callback);
```

**Parameters:**

- **media**: An HTML or p5.js image, video, or canvas element to run the segmentation on.

- **callback(output, error)**: Optional. A callback function to handle the output of the estimation, see output example above.

**Returns:**
A promise that resolves to the segmentation output.

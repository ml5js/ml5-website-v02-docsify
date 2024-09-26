# Image + Teachable Machine

<center>
  <img class="header-img" src="assets/header-image-tm.png" alt="Image + Teachable Machine Header Image" >
  <p class="img-credit"> Image Credit: <a href="https://thenounproject.com/creator/admin885/" target="_blank" title="Juicy Fish">Juicy Fish</a> | <a href='mailto:info@ml5js.org'>Contribute ♥️</a> </p>
</center>

## Description

The ml5.js Image + Teachable Machine model allows you to create a model that can recognize the content of an image from a set of labels that you define. For example, you can train a model to tell the difference between a cat and a dog, happy and sad faces, or even between a hot dog and a sandwich.

The ml5.js Image + Teachable Machine model is a combination of [the ml5.js imageClassifier](/reference/image-classifier) and the Teachable Machine platform. Instead of using pre-trained models like MobileNet or Darknet, you can train your own model with the [Teachable Machine](https://teachablemachine.withgoogle.com/).

?> If you are not familiar with the concept of image classification, we recommend checking out the [Image Classifier](/reference/image-classifier) guide first.

It provides the following functionalities:

- **Custom Labels**: Train your model with customized labels to recognize specific objects, animals, or people.
- **Image Classification**: The Image + Teachable Machine model can recognize the content of an image from a set of labels that you define.
- **Video Object Detection**: The Image + Teachable Machine model can also be used to classify objects into categories that you define in real-time video.

## Quick Start

Run and explore a pre-built example! [This Image + Teachable Machine example](https://editor.p5js.org/ima_ml/sketches/vOSSEZwGf) classifies the content of an image from the webcam feed using a Teachable Machine model.

</br>

[DEMO](iframes/image-classifier-tm ":include :type=iframe width=100% height=550px")

## Examples

- [Image + Teachable Machine Video](https://editor.p5js.org/ima_ml/sketches/vOSSEZwGf): Classify the content of an image from the webcam feed using a Teachable Machine model.

## Step-by-Step Guide

Now, let's together build the [Image + Teachable Machine Video example](https://editor.p5js.org/ima_ml/sketches/vOSSEZwGf) from scratch, and in the process, learn how to use the Image + Teachable Machine model.

### Create a new project

To follow along, start by creating an empty project in the [p5.js web editor](https://editor.p5js.org/).

### Set up ml5.js

Import the ml5.js library in your `index.html` file.

```html
<script src="https://unpkg.com/ml5@1/dist/ml5.js"></script>
```

?> If you are not familiar with how to import the ml5.js library and need more detailed guidance, please check out our [Getting Started](/?id=set-up-ml5js) page.

### Load model

Let's open the `sketch.js` file and define a variable to store the Image + Teachable Machine model.

```javascript
let classifier;
```

Before we load the model, we need to get the model URL from the Teachable Machine platform. Follow the steps below to create a Teachable Machine model:

- Step 1: Open [Teachable Machine](https://teachablemachine.withgoogle.com/train) and create a new "Image Project".
- Step 2: Choose "Standard image model".
- Step 3: Click the "Edit" icon to rename "Class 1" to your desired label. In our case, "thermos".
- Step 4: Click the "Webcam" icon and long press "Hold to Record" button to capture some thermos photos.
- Step 5: Repeat steps 3 and 4 for the second labels, in our case "eraser". If you need more than two labels, click "Add a class", and then rename "Class 3" (or 'Class 4,' 'Class 5,' etc.) to whatever you prefer.
- Step 6: Click the "Train Model" button to train your model.
- Step 7: Click the "Export Model" button, and in the pop-up window, click the "Upload my model" button to get the model URL.
- Step 8: Copy the model URL in the "Your shareable link" field.

After we have the model URL, we can store it in a variable in the `sketch.js` file.

```javascript
let imageModelURL = "https://teachablemachine.withgoogle.com/models/4-WUyljZZ/";
```

Now, we can load the model that we just trained in the `preload` function. Using the `preload` function ensures that the model is loaded before the `setup` and `draw` functions are called.

```javascript
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + "model.json", {
    flipped: true,
  });
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
}
```

Fetch the webcam video, resize it to fit the canvas, and hide it from the display.

```javascript
  // Create the video and hide it
  video = createCapture(VIDEO, { flipped: true });
  video.size(320, 240);
  video.hide();
}
```

### Classify the video with the model

To store the classification result, define a variable `label`.

```javascript
let label = "";
```

We can now start classifying the video with the Teachable Machine model. In the `setup` function, call the `classifyStart` method on the `classifier` object.

```javascript
function setup() {
  ...
  video.hide();

  // Start classifying the video
  classifier.classifyStart(video, gotResult);
}
```

The `gotResult` function is a callback function that will be called when the `classifyStart` method finishes classifying the video. Now, let's define the `gotResult` function. This function will update the `label` variable with the highest confidence label predicted by the model.

```javascript
// A function to run when we get the results and any errors
function gotResult(results) {
  // Update the label variable which is displayed on the canvas
  label = results[0].label;
}
```

### Display the results

Before we display the label predicted by the model, we need to draw the webcam video on the canvas.

```javascript
function draw() {
  image(video, 0, 0, width, height);
```

Now, we can display the classification result on the canvas.

```javascript
  // Display the label on the canvas
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(label, width / 2, height - 4);
}
```

### Run your sketch

Congratulations! You have successfully built the Image + Teachable Machine Video example. Press the <img class="inline-img" src="assets/facemesh-arrow-forward.png" alt="run button icon" aria-hidden="true"> `run` button to see the code in action. You can also find the [complete code](https://editor.p5js.org/ima_ml/sketches/vOSSEZwGf) in the p5.js web editor.

?> If you have any questions or spot something unclear in this step-by-step code guide, we'd love to hear from you! Join us on [Discord](https://discord.com/invite/3CVauZMSt7) and let us know how we can make it better.

## Properties

### imageClassifier.modelName

- **Description**
  - The name of the model being used, typically one of "mobilenet", "darknet", "darknet-tiny", or "doodlenet".
- **Type**
  - String

---

### imageClassifier.modelUrl

- **Description**
  - The URL of the model if a custom model is being used.
- **Type**
  - String

---

### imageClassifier.model

- **Description**
  - The TensorFlow.js model used for image classification.
- **Type**
  - tf.LayersModel

---

### imageClassifier.modelToUse

- **Description**
  - The specific model module to be used for image classification, such as MobileNet, Darknet, or Doodlenet.
- **Type**
  - Object

---

### imageClassifier.mapStringToIndex

- **Description**
  - An array mapping string labels to indices for custom models.
- **Type**
  - Array

---

### imageClassifier.version

- **Description**
  - The version of the model being used, applicable to MobileNet.
- **Type**
  - Number

---

### imageClassifier.alpha

- **Description**
  - The alpha value (width multiplier) of the model being used, applicable to MobileNet.
- **Type**
  - Number

---

### imageClassifier.topk

- **Description**
  - The number of top predictions to return, applicable to MobileNet.
- **Type**
  - Number

---

### imageClassifier.isClassifying

- **Description**
  - A flag indicating whether the classification loop is currently running.
- **Type**
  - Boolean

---

### imageClassifier.signalStop

- **Description**
  - A flag used to signal the classification loop to stop.
- **Type**
  - Boolean

---

### imageClassifier.prevCall

- **Description**
  - Tracks the previous call to `classifyStart` or `classifyStop` to handle warnings.
- **Type**
  - String

---

### imageClassifier.ready

- **Description**
  - A promise that resolves when the model has loaded.
- **Type**
  - Promise

## Methods

#### ml5.imageClassifier()

This method is used to initialize the imageClassifer object. Here, you could provide the teachable machine model URL to load the model.

```javascript
const classifier = ml5.imageClassifier(imageModelURL + "model.json");
```

**Returns:**  
The imageClassifier object.

---

#### imageClassifier.classifyStart()

This method repeatedly outputs classification labels on an image media through a callback function.

```javascript
imageClassifier.classifyStart(media, ?kNumber, callback);
```

**Parameters:**

- **media**: An HTML or p5.js image, video, or canvas element to run the classification on.
- **kNumber**: The number of labels returned by the image classification.
- **callback(output, error)**: A callback function to handle the output of the classification. See below for an example output passed into the callback function:

  ```javascript
  [
    {
      label: "cat",
      confidence: 0.99,
    },
    {
      label: "dog",
      confidence: 0.01,
    },
  ];
  ```

---

#### imageClassifier.classifyStop()

This method can be called after a call to `imageClassifier.classifyStart` to stop the repeating classifications.

```javascript
imageClassifier.classifyStop();
```

---

#### imageClassifier.classify()

This method asynchronously outputs a single image classification on an image media when called.

```javascript
imageClassifier.classify(media, ?kNumber, ?callback);
```

**Parameters:**

- **media**: An HTML or p5.js image, video, or canvas element to run the classification on.
- **kNumber**: The number of labels returned by the image classification.
- **callback(output, error)**: Optional. A callback function to handle the output of the classification.

**Returns:**  
A promise that resolves to the estimation output.

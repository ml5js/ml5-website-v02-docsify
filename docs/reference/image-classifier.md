# ImageClassifier

<center>
  <img class="header-img" src="assets/header-image-classifier.png" alt="ImageClassifier Header Image" >
  <p class="img-credit"> Image Credit: <a href="">Name</a> | <a href="">Contribute ♥️</a> </p>
</center>

## Description

The image classifier is a pre-trained model that can recognize the content of an image. It can identify objects, animals, and even people in a picture. The image classifier uses a neural network to analyze the image and provide a list of possible labels for the content of the image.

The ml5.js image classifier uses the pre-trained MobileNet model by default. You can optionally load and use other models such as Darknet as well as a custom-trained model, DoodleNet, which is also built upon the MobileNet architecture and trained on images from the Google Quick, Draw dataset.

It provides the following functionalities:

- **Image Classification**: The image classifier can recognize the content of an image and provide a list of possible labels.
- **Video Object Detection**: The image classifier can also be used to classify objects in a video stream.

?> If you want to **train your own image classification model with customized labels**, check out our [Image + Teachable Machine](/reference/image-classifier-tm) to get started!

## Quick Start
Run and explore a pre-built example! [This Image Classifier example](https://editor.p5js.org/ml5/sketches/pjPr6XmPY) classifies the content of an image and displays the results on the canvas.

</br>

[DEMO](iframes/image-classifier ":include :type=iframe width=100% height=550px")

## Examples
- [Image Classifier Single Image](https://editor.p5js.org/ml5/sketches/pjPr6XmPY): Classify the content of an image and display the results on the canvas.
- [Image Classifier Video](https://editor.p5js.org/ml5/sketches/K0sjaEO19): Classify the content of objects in a video stream.

## Step-by-Step Guide
Now, let's together build the [Image Classifier Single Image example](https://editor.p5js.org/ml5/sketches/pjPr6XmPY) from scratch, and in the process, learn how to use the Image Classifier model.

### Create a new project
To follow along, start by creating an empty project in the [p5.js web editor](https://editor.p5js.org/).

### Set up ml5.js
Import the ml5.js library in your `index.html` file.

```html
<script src="https://unpkg.com/ml5@alpha/dist/ml5.js"></script>
```

?> If you are not familiar with how to import the ml5.js library and need more detailed guidance, please check out our [Getting Started](/?id=set-up-ml5js) page.

### Load model
Let's open the `sketch.js` file and define a variable to store the Image Classifier model.

```javascript
let classifier;
```

Now, we can load the Image Classifier model in the `preload` function. Using the `preload` function ensures that the model is loaded before the `setup` and `draw` functions are called. Note here we can specify the model name we want to use, such as `MobileNet`.

```javascript
function preload() {
  classifier = ml5.imageClassifier("MobileNet");
}
```

### Load an image
Next, let's load an image that we want to classify. Unfold the project directory by clicking the arrow `>` at the top left corner of the p5.js editor. Create a new folder called `images`. And upload a bird image named `bird.png` to the `images` folder. Remember to login to see this option.

We are ready to write the code to load the image that we just uploaded. Define a variable `img` to store the image.

```javascript
let img;
```

In the `preload` function, load the image using the `loadImage` function.

```javascript
function preload() {
  classifier = ml5.imageClassifier("MobileNet");
  img = loadImage("images/bird.png");
}
```

### Classify the image with the model
Within the `setup` function, call the `classify` method on the `classifier` object to classify the image. The `classify` method takes the image and a callback function as arguments.

```javascript
function setup() {
  createCanvas(400, 400);
  classifier.classify(img, gotResult);
}
```

The callback function `gotResult` is a function that will be called when the `classify` method finishes classifying the image. Now, let's define the `gotResult` function.

```javascript
// A function to run when we get any errors and the results
function gotResult(results) {
  // The results are in an array ordered by confidence, print in console
  console.log(results);
}
```

### Display the results
We need to first display the image itself on the canvas. Add the following code to the `setup` function.

```javascript
function setup() {
  ...
  classifier.classify(img, gotResult);
  image(img, 0, 0, width, height);
}
```

We can then display the classification results on the canvas. With `fill()`, `stroke()`, and `textSize()`, we can set up the text style.

```javascript
// A function to run when we get any errors and the results
function gotResult(results) {
  // The results are in an array ordered by confidence, print in console
  console.log(results);

  // Display the results on the canvas
  fill(255);
  stroke(0);
  textSize(18);
```

Let's get the top 1 label that model feels most confident about. `results[0]` is the object with the highest confidence score. We can then extract the label and confidence from this object. `nf()` is used to format the confidence score to two decimal places.

```javascript
  label = "Label: " + results[0].label;
  confidence = "Confidence: " + nf(results[0].confidence, 0, 2);
```

Finally, display the label and confidence on the canvas.

```javascript
  text(label, 10, 360);
  text(confidence, 10, 380);
}
```

### Run your sketch
Voila! You have successfully built the Image Classifier Single Image example. Press the <img class="inline-img" src="assets/facemesh-arrow-forward.png" alt="run button icon" aria-hidden="true"> `run` button to see the code in action. You can also find the [complete code](https://editor.p5js.org/ml5/sketches/pjPr6XmPY) in the p5.js web editor.

?> If you have any questions or spot something unclear in this step-by-step code guide, we'd love to hear from you! Join us on [Discord](https://discord.com/invite/3CVauZMSt7) and let us know how we can make it better.

## Methods

#### ml5.imageClassifier()

This method is used to initialize the imageClassifer object.

```javascript
const classifier = ml5.imageClassifier(?modelName, ?options, ?callback);
```

**Parameters:**

- **modelName**: OPTIONAL. Name of the underlying model to use.

- **options**: OPTIONAL. An object to change the default configuration of the model.

- **callback(handPose, error)**: OPTIONAL. A function to run once the model has been loaded. Alternatively, call `ml5.imageClassifier()` within the p5 `preload` function.

**Returns:**  
The imageClassifier object.

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
        label: "zebra",
        confidence: 0.98,
      },
      {
        label: "tiger",
        confidence: 0.89,
      },
      // Additional objects here...
    ]
    ```

#### imageClassifier.classifyStop()

This method can be called after a call to `imageClassifier.classifyStart` to stop the repeating classifications.

```javascript
imageClassifier.classifyStop();
```

#### imageClassifier.classify()

This method asynchronously outputs a single image classification on an image media when called.

```javascript
imageClassifier.classify(media, ?kNumber, ?callback);
```

**Parameters:**

- **media**: An HTML or p5.js image, video, or canvas element to run the classification on.
- **kNumber**: The number of labels returned by the image classification.
- **callback(output, error)**: OPTIONAL. A callback function to handle the output of the classification.

**Returns:**  
A promise that resolves to the estimation output.

(footer needed)

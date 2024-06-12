# ImageClassifier

<center>
  <img class="header-img" src="assets/header-image-classifier.png" alt="ImageClassifier Header Image" >
  <p class="img-credit"> Image Credit: <a href="">Name</a> | <a href="">Contribute ♥️</a> </p>
</center>

## Description

Have you ever wanted to know what's in an image? Our image classifier can help!

The image classifier is a pre-trained model that can recognize the content of an image. It can identify objects, animals, and even people in a picture. The image classifier uses a neural network to analyze the image and provide a list of possible labels for the content of the image.

_<img class="inline-img" src="assets/gettingstarted-bulb.png" alt="tip icon" aria-hidden="true"> If you want to **train your own image classification model with customized labels**, check out our [Image + Teachable Machine](/reference/image-classifier-tm) to get started!_

### Key Features

- **Image Classification**: The image classifier can recognize the content of an image and provide a list of possible labels.
- **Video Object Detection**: The image classifier can also be used to classify objects in a video stream.

### Output Example

An example of the output from the image classifier is shown below:

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
];
```

## Getting Started

Ready to give it a try? Our demo is here to give you a sneak peek into what the image classifier can do! Don't hesitate to follow along with our instructions to kickstart your very own image classifier project!

### Demo

[DEMO](iframes/image-classifier ":include :type=iframe width=100% height=550px")

### Quick Start

Before you start, let's create an empty project in the [p5 web editor](https://editor.p5js.org/).

First of all, copy and paste the following code into your **index.html** file. If you are not familiar with the p5 web editor interface, you can find a guide on how to find your **index.html** file [here](/?id=try-ml5js-online-1).

```html
<script src="https://unpkg.com/ml5@alpha/dist/ml5.js"></script>
```

Next, copy and paste the following code into your **sketch.js** file. This code will load the image classifier model and classify the content of an image.

```javascript
// Initialize the Image Classifier method with MobileNet. A callback needs to be passed.
let classifier;

// A variable to hold the image we want to classify
let img;

// Variables for displaying the results on the canvas
let label = "";
let confidence = "";

function preload() {
  classifier = ml5.imageClassifier("MobileNet");
  img = loadImage("images/bird.jpg");
}

function setup() {
  createCanvas(400, 400);
  classifier.classify(img, gotResult);
  image(img, 0, 0, width, height);
}

// A function to run when we get any errors and the results
function gotResult(results) {
  // The results are in an array ordered by confidence, print in console
  console.log(results);

  // Display the results on the canvas
  fill(255);
  stroke(0);
  textSize(18);
  label = "Label: " + results[0].label;
  confidence = "Confidence: " + nf(results[0].confidence, 0, 2);
  text(label, 10, 360);
  text(confidence, 10, 380);
}
```

Alternatively, you can open [this example code](https://github.com/ml5js/ml5-next-gen/tree/main/examples/ImageClassifier) and try it yourself on p5.js web editor!

### Additional Examples

- [ImageClassifier-video](https://github.com/ml5js/ml5-next-gen/tree/main/examples/ImageClassifier-video): Classify the content of images from your webcam.

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
- **callback(output, error)**: A callback function to handle the output of the classification.

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

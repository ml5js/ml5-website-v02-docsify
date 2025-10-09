# ObjectDetector

<center>
  <img class="header-img" src="assets/header-image-classifier.png" alt="ImageClassifier Header Image" >
  <p class="img-credit"> Image Credit: <a href="https://thenounproject.com/creator/naveena.160" target="_blank" title="Naveen">Naveen</a> | <a href='mailto:info@ml5js.org'>Contribute ♥️</a> </p>
</center>

## Description

The ml5.js objectDetector is a pre-trained model that can detect object from an image or a video, including live video source such as webcam.

The ml5.js objectDetector uses pre-trained [Tensorflow.js CocoSsd model](https://github.com/tensorflow/tfjs-models/tree/master/coco-ssd). You can find more about this model in the Model and Data Provenance section.

Support for more models such as Transformer.js is under development, so stay tuned!

## Quick Start
Run and explore a pre-built example! [This webcam example](https://editor.p5js.org/codingeffects2023/sketches/pyC9DA8pV) detects object in real-time and draws bounding boxes and labels on the objects detected.

<br/>

[DEMO](iframes/object-detector ":include :type=iframe width=100% height=550px")

## Examples

### p5 sketches
- [objectDetector Webcam](https://editor.p5js.org/codingeffects2023/sketches/pyC9DA8pV)
- [objectDetector Image](https://editor.p5js.org/codingeffects2023/sketches/5aMBINT-N)
- [objectDetector Video](https://editor.p5js.org/codingeffects2023/sketches/KixZ5yn50)


### Video Tutorials
- [ml5.js: Object Detection with COCO-SSD](https://youtu.be/QEzRxnuaZCk) by the Coding Train

Please note that the above tutorial is based on a deprecated version of ml5.js objectDetector, which means the tutorial code is not compatible with the current ml5.js objectDetector.

However the code difference isn't enormouse and the video is still a great resource to get yourself familiar with the model!

## Step-by-Step Guide

Now, let's together build the [objectDetector Webcam](https://editor.p5js.org/codingeffects2023/sketches/pyC9DA8pV) example from scratch.

### Create a new project

To follow along, start by creating an empty project in the [p5.js web editor](https://editor.p5js.org/).

### Set up ml5.js

Import the ml5.js library in your `index.html` file by copying the following `<script>` tag.

```html
<script src="https://unpkg.com/ml5@1/dist/ml5.js"></script>
```

?> If you are not familiar with how to import the ml5.js library and need more detailed guidance, please check out our [Getting Started](/?id=set-up-ml5js) tutorial.

## Declare variables

```javascript
let video;
let detector;
let detections = [];
```

### Fetch and draw webcam video

We'll use webcam feed as video input, then hide html element to avoid duplicate with the video drawn on canvas.

You'll see the video source drawn on the canvas.

```javascript
let video;

function setup() {
  createCanvas(640, 480);

  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
}

function draw() {
  image(video, 0, 0);
}
```

### Load model

Use preload function to load ml5.objectDetector with the supported model [CocoSsd](https://github.com/tensorflow/tfjs-models/tree/master/coco-ssd).


```javascript
function preload(){
  detector = ml5.objectDetector("cocossd");
}
```

Now, inside setup function, call detectStart method on the model.

detectStart takes two parameters : source and a callback function.

```javascript
  detector.detectStart(video, gotDetections);
```

Finally, let's define a callback function.
This callback function is called each time the object detector finishes processing a frame.
Let's make it so that detections array gets updated with new results.

```javascript
function gotDetections(results) {
  detections = results;

  // console.log(detections);
}
```

When you console.log detections, you can find out what the detection data looks like.
<center>
    <img style="display:block; max-width:75%" alt="ObjectDetector data on a console" src="./assets/object-detector-console.png">
</center>

Now that we got the data, we can start drawing things with it!

### Draw bounding boxes and labels

Inside draw function, draw a bounding box and a label.

```javascript
for (let i = 0; i < detections.length; i += 1) {
    let detection = detections[i];

    // Draw bounding box
    stroke(0, 255, 0);
    strokeWeight(4);
    noFill();
    rect(detection.x, detection.y, detection.width, detection.height);

    // Draw label
    noStroke();
    fill(255);
    textSize(24);
    text(detection.label, detection.x + 10, detection.y + 24);
  }
```
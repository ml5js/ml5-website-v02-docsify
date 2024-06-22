# BodySegmentation

<center>
  <img class="header-img" src="assets/header-body-segmentation.png" alt="BodySegmentation Header Image" >
  <p class="img-credit"> Image Credit: <a href="https://thenounproject.com/creator/ibrandify/" target="_blank" title="ibrandify">ibrandify</a> | <a href='mailto:info@ml5js.org'>Contribute ♥️</a> </p>
</center>

## Description

BodySegmentation divides an image input into the people and the background, and then further divide the people into different body parts. The model can detect multiple people at once and for each person, provides 24 body parts that describe important locations on the body.

### Key Features

- **Real-time person segmentation**: The model can segment people from the background in real-time.
- **Real-time body part segmentation**: The model can segment body parts in real-time.

### Output Example

Based on your options, the output can be a mask of the background, a mask of the person, or a mask of the body parts. Regardless of the scenario, the segmentation information deemed valuable is consistently stored within the mask property of the resulting object.

```javascript
result.mask;
```

## Getting Started

Integrating Body Segmentation into your ml5.js projects is straightforward. Our documentation and user-friendly API will help you make the most of this combined model!

### Demo

[DEMO](iframes/body-segmentation ":include :type=iframe class='demo-iframe'width=100% height=550px")

### Quick Start

Before you start, let's create an empty project in the [p5 web editor](https://editor.p5js.org/).

First of all, copy and paste the following code into your **index.html** file. If you are not familiar with the p5 web editor interface, you can find a guide on how to find your **index.html** file [here](/?id=try-ml5js-online-1).

```html
<script src="https://unpkg.com/ml5@1/dist/ml5.js"></script>
```

Then, add the code below to your **sketch.js** file:

```js
let bodyPix;
let video;
let segmentation;

let options = {
  maskType: "parts",
};

function preload() {
  bodyPix = ml5.bodySegmentation("BodyPix", options);
}

function setup() {
  createCanvas(640, 480);
  // Create the video
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  bodyPix.detectStart(video, gotResults);
}

function draw() {
  background(255);
  image(video, 0, 0);
  if (segmentation) {
    image(segmentation, 0, 0, width, height);
  }
}
// callback function for body segmentation
function gotResults(result) {
  segmentation = result.mask;
}
```

Alternatively, you can open [this example code](https://github.com/ml5js/ml5-next-gen/tree/main/examples/BodySegmentation-maskbodyparts) and try it yourself on p5.js web editor!

### Additional Examples

- [BodySegmentation-maskbackground](https://github.com/ml5js/ml5-next-gen/tree/main/examples/BodySegmentation-maskbackground): Mask the background of an image.
- [BodySegmentation-maskperson](https://github.com/ml5js/ml5-next-gen/tree/main/examples/BodySegmentation-maskperson): Mask the person in an image.

<!-- ### Tutorials

**PoseNet on The Coding Train**
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/OIo-DIOkNVg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> -->

## Methods

#### ml5.bodySegmentation()

This method is used to initialize the bodySegmentation object.

```javascript
const bodySegmentation = ml5.bodySegmentation(?modelName, ?options, ?callback);
```

**Parameters:**

- **modelName**: OPTIONAL: A string specifying which model to use, "SelfieSegmentation" or "BodyPix".

- **options**: OPTIONAL. An object to change the default configuration of the model. See the example options object:

  ```javascript
  {
    runtime: "mediapipe", // "mediapipe" or "tfjs"
    modelType: "general", // "general" or "landscape"
    maskType: :"background", //"background", "body", or "parts" (used to change the type of segmentation mask output)
  }
  ```

  [More info on options for SelfieSegmentation model with mediaPipe runtime](https://github.com/tensorflow/tfjs-models/tree/master/body-segmentation/src/selfie_segmentation_mediapipe#create-a-detector).

  [More info on options for SelfieSegmentation model with tfjs runtime](https://github.com/tensorflow/tfjs-models/tree/master/body-segmentation/src/selfie_segmentation_tfjs#create-a-detector).

  [More infor on options for BodyPix model.](https://github.com/tensorflow/tfjs-models/blob/master/body-segmentation/src/body_pix/README.md#create-a-detector)

- **callback(bodySegmentation, error)**: OPTIONAL. A function to run once the model has been loaded. Alternatively, call `ml5.bodySegmentation()` within the p5 `preload` function.

**Returns:**  
The bodySegmentation object.

#### bodySegmentation.detectStart()

This method repeatedly outputs segmentation masks on an image media through a callback function.

```javascript
bodySegmentation.detectStart(media, callback);
```

**Parameters:**

- **media**: An HTML or p5.js image, video, or canvas element to run the segmentation on.

- **callback(output, error)**: A function to handle the output of `bodySegmentation.detectStart()`. Likely a function to do something with the segmented image. See below for the output passed into the callback function:

  ```javascript
  {
    mask: {},//A p5 Image object, can be directly passed into p5 image() function
    maskImageData: {}//A ImageData object
  }
  ```

#### bodySegmentation.detectStop()

This method can be called after a call to `bodySegmentation.detectStart` to stop the repeating pose estimation.

```javascript
bodySegmentation.detectStop();
```

#### bodySegmentation.detect()

This method asynchronously outputs a single segmentation mask on an image media when called.

```javascript
bodySegmentation.detect(media, ?callback);
```

**Parameters:**

- **media**: An HTML or p5.js image, video, or canvas element to run the segmentation on.
- **callback(output, error)**: OPTIONAL. A callback function to handle the output of the estimation, see output example above.

**Returns:**  
A promise that resolves to the segmentation output.

# ImageClassifier

<center>
  <img class="header-img" src="assets/header-image-classifier.png" alt="ImageClassifier Header Image" >
  <p class="img-credit"> Image Credit: <a href="https://thenounproject.com/creator/naveena.160" target="_blank" title="Naveen">Naveen</a> | <a href='https://forms.gle/5EpwYabG8hLn4p926' target="contribute-form">Contribute ♥️</a> </p>
</center>

## Description

The ml5.js imageClassifier loads a pre-trained model that attempts to classify the content of an image. Each model can only predict labels from a fixed set of categories it was trained to recognize (typically objects, animals, and other visual categories). The image classifier uses a neural network to analyze the image and provide a list of possible labels for the content of the image in its entirety.

The ml5.js imageClassifier uses MobileNet by default, but supports additional model architectures including transformer-based models, fine-tuned models such as `Food101`, specialized pre-trained models such as `DoodleNet`, and custom models created with [Teachable Machine](/reference/image-classifier-tm). MobileNet was trained on the 1,000 category ImageNet dataset.```

It provides the following functionality:

- ***Single Image Classification*** (`classify()`): Classifies one image and provides a list of possible labels.
- ***Continuous Video Classification*** (`classifyStart()`): Repeatedly classifies frames from a video and provides updated labels.

## Supported Models

ImageClassifier supports different neural network architectures depending on the model selected.

- **MobileNet** (default): This model loads MobileNet, a lightweight convolutional neural network designed for efficient image classification. It was pretrained on ImageNet, a dataset of approximately 15 million images across 1,000 classes. MobileNet is optimized for relatively fast inference and is commonly used for real-time image classification in browser and mobile applications.
- **ViTBase**: This model loads [Xenova/vit-base-patch16-224](https://huggingface.co/Xenova/vit-base-patch16-224), which is a transformers.js version of Google’s vit-base-patch16-224 model. It was pretrained on [ImageNet-21K](https://www.image-net.org/): about 14 million images and 21,843 classes and then fine-tuned on ImageNet-1K to predict the familiar 1,000 classes. The Vision Transformer architecture divides an image into patches and uses an attention mechanism to learn relationships between different parts of the image.
- **SwinFood101**: This model loads [onnx-community/swin-finetuned-food101-ONNX](https://huggingface.co/onnx-community/swin-finetuned-food101-ONNX), an ONNX version of a Swin Transformer fine-tuned on the [Food101 dataset](https://huggingface.co/datasets/ethz/food101). It was fine-tuned from Microsoft’s swin-base-patch4-window7-224 model to classify images into 101 different food categories. Swin uses shifted windows of attention to efficiently learn relationships between different regions of an image.
- **DoodleNet**; DoodleNet has its own set of 345 drawing categories from the Google Quick, Draw! dataset. (link to Yining's repo for training this model / Quick, Draw)
- **Custom models**: Users can load compatible custom-trained models for specialized classification tasks.

Even though they use different neural network architectures, MobileNet and ViTBase predict from the same 1,000 ImageNet categories.

If you want to **train your own image classification model with customized labels**, check out our [Image + Teachable Machine](/reference/image-classifier-tm) to get started!

## Quick Start

Run and explore a pre-built example! [This ImageClassifier example](https://editor.p5js.org/ml5/sketches/pjPr6XmPY) classifies the content of an image and displays the results on the canvas.

</br>

[DEMO](iframes/image-classifier ":include :type=iframe width=100% height=550px")

## Examples

### p5 sketches

- [ImageClassifier Single Image](https://editor.p5js.org/ml5/sketches/pjPr6XmPY): Classify the content of an image and display the results on the canvas.
- [ImageClassifier Video](https://editor.p5js.org/ml5/sketches/K0sjaEO19): Classify the content of objects in a video stream.
- [Image classification with DoodleNet](https://editor.p5js.org/ima_ml/sketches/0KtSHucVH): Classify the content of simple drawings using the DoodleNet model.

?> If you are unfamiliar with [DoodleNet](https://github.com/yining1023/doodleNet), it is a convolutional neural network (CNN)-based model developed by [@yining1023](https://github.com/yining1023) and trained on the Google [Quick, Draw!](https://quickdraw.withgoogle.com/data) dataset, which features 345 categories of hand-drawn doodles. It allows you to classify simple drawings in real-time.

### Video Tutorials

- [Image Classification with ml5.js](https://thecodingtrain.com/tracks/ml5js-beginners-guide/ml5/1-classification/image-classification) by The Coding Train

## Step-by-Step Guide

Now, let's together build the [ImageClassifier Single Image example](https://editor.p5js.org/ml5/sketches/pjPr6XmPY) from scratch, and in the process, learn how to use the ImageClassifier model.

### Create a new project

To follow along, start by creating an empty project in the [p5.js web editor](https://editor.p5js.org/).

### Set up ml5.js

Import the ml5.js library in your `index.html` file.

```html
<script src="https://unpkg.com/ml5@1/dist/ml5.js"></script>
```

?> If you are not familiar with how to import the ml5.js library and need more detailed guidance, please check out our [Getting Started](/?id=set-up-ml5js) page.

### Load model

Let's open the `sketch.js` file and define a variable to store the ImageClassifier model.

```javascript
let classifier;
```

Now, we can load the ImageClassifier model. Using `async` and `await` ensures that the model is loaded before the `draw()` function begins. Note here we can specify the model name we want to use, such as `MobileNet`.

```javascript
// Make sure to add "async" before "function setup()".
async function setup() {
  // Wait until the ImageClassifier model is fully loaded.
  classifier = await ml5.imageClassifier("MobileNet");
}
```

?> If you would like to use a different model such as `Darknet`, specify configuration options for the model, or tailor a callback function to run once the model is loaded, you can pass these as arguments to the `ml5.imageClassifier(?modelName, ?options, ?callback)` method. See the [ml5.imageClassifier() method](/reference/image-classifier?id=ml5imageclassifier) for more details.

### Load an image

Next, let's load an image that we want to classify. Unfold the project directory by clicking the arrow `>` at the top left corner of the p5.js editor. Create a new folder called `images`. And upload a bird image named `bird.png` to the `images` folder. Remember to login to see this option.

We are ready to write the code to load the image that we just uploaded.

```javascript
// Define a variable `img` to store the image.
let img;

async function setup() {
  classifier = await ml5.imageClassifier("MobileNet");
  // Also use "await" to load the image before the "draw()"" function begins.
  img = await loadImage("images/bird.png");
}
```

### Classify the image with the model

Within the `setup` function, call the `classify` method on the `classifier` object to - you guessed right - classify the image. The `classify` method takes the image and a callback function as parameters.

```javascript
async function setup() {
  createCanvas(400, 400);
  classifier = await ml5.imageClassifier("MobileNet");
  img = await loadImage("images/bird.png");
  // classify the image with the model and pass in a callback function `gotResult` to handle the results.
  classifier.classify(img, gotResult);
}
```

The callback function `gotResult` is a function that will be called when the `classify` method finishes classifying the image. Now, let's define the `gotResult` function.

```javascript
// Callback function for when classification has finished
function gotResult(results) {
  // The results are in an array ordered by confidence
  console.log(results);
}
```

### Display the results

We need to first display the image itself on the canvas. Add the following code to the `setup` function.

```javascript
async function setup() {
  ...
  classifier.classify(img, gotResult);
  image(img, 0, 0, width, height);
}
```

We can then display the classification results on the canvas. With `fill()`, `stroke()`, and `textSize()`, we can set up the text style.

```javascript
// Callback function for when classification has finished
function gotResult(results) {
  // The results are in an array ordered by confidence
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

Voila! You have successfully built the ImageClassifier Single Image example. Press the <img class="inline-img" src="assets/facemesh-arrow-forward.png" alt="run button icon" aria-hidden="true"> `run` button to see the code in action. You can also find the [complete code](https://editor.p5js.org/ml5/sketches/pjPr6XmPY) in the p5.js web editor.

?> If you have any questions or spot something unclear in this step-by-step code guide, we'd love to hear from you! Join us on [Discord](https://discord.com/invite/3CVauZMSt7) and let us know how we can make it better.

## Methods

### ml5.imageClassifier()

This method is used to initialize the imageClassifer object.

```javascript
const classifier = ml5.imageClassifier(modelNameOrUrl, ?options, ?callback);
```

**Parameters:**

- **modelName**: Optional.
  - String: Name of the underlying model to use. Possible values include:
    - `mobilenet`
    - `doodlenet`
    - `ViTBase`
    - `SwinFood101`
    - or a URL to a compatible model file.

- **options**: Optional.
  Object: An object to change the default configuration of the model.
  - The default options for the default `mobilenet` model are

    ```
    {
      alpha: 1.0,
      topk: 3
    }
    ```

    - _version_: The MobileNet version to use. Default is 2.
    - _alpha_: The width multiplier for the MobileNet. Default is 1.0.
    - _topk_: The number of labels to return. Default is 3.

  - The default options for `VisionTransformer` model are

  ```
  {
    dtype: "fp32",
    topK: 3
  }
  ```

  - _dtype_: The numerical precision used during inference
  - _device_: The backend device used for computation
  - _topK_: The number of classification results returned

- **callback(classifier, error)**: Optional. A function to run once the model has been loaded. Alternatively, call `ml5.imageClassifier()` within the p5 `preload` function.

**Returns:**  
The imageClassifier object.

---

### imageClassifier.classifyStart()

This method repeatedly outputs classification labels on an image media through a callback function.

```javascript
imageClassifier.classifyStart(media, ?kNumber, callback);
```

**Parameters:**

- **media**: An HTML or p5.js image, video, or canvas element to run the classification on.

- **kNumber**: The number of labels returned by the image classification.

- **callback(results, error)**: A callback function to handle the output of the classification. See below for an example output passed into the callback function:

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

---

### imageClassifier.classifyStop()

This method can be called after a call to `imageClassifier.classifyStart` to stop the repeating classifications.

```javascript
imageClassifier.classifyStop();
```

---

### imageClassifier.classify()

This method asynchronously outputs a single image classification on an image media when called.

```javascript
imageClassifier.classify(media, ?kNumber, ?callback);
```

**Parameters:**

- **media**: An HTML or p5.js image, video, or canvas element to run the classification on.

- **kNumber**: The number of labels returned by the image classification.

- **callback(results, error)**: Optional. A callback function to handle the output of the classification.

**Returns:**  
A promise that resolves to the estimation output.

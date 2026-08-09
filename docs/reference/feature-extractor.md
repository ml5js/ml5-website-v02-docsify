# Feature Extractor

## Description

The ml5.js Feature Extractor gives you the output of a pre-trained image classifier right before its final classification layer. You can use these "features" directly, or use [transfer learning](https://en.wikipedia.org/wiki/Transfer_learning) to train your own image classifier or predict a continuous value — a task known as regression.

For example, you can train it to…

- ✌️ **count how many fingers you are holding up** in front of the camera,
- 🎨 **switch the visuals in your sketch** when you strike different poses, or
- 🔊 **control the volume of a sound** by raising and lowering your hand in front of the webcam.

The ml5.js Feature Extractor is built on top of [MobileNet](https://arxiv.org/abs/1704.04861), a model pre-trained on millions of images to recognize objects. Feature Extractor exposes the output before MobileNet’s final classification layer as a **[feature](/learn/ml5-glossary?id=feature)** — a compact list of numbers that represents what the model has detected in the image.

Because these features already encode rich visual information, you can build your own **[classification](/learn/ml5-glossary?id=classification)** or **[regression](/learn/ml5-glossary?id=regression-analysis)** model on top of them with only a small amount of training data.

?> If you are not familiar with the concepts of **classification**, **regression**, or **features**, we recommend checking out the [ml5.js Glossary](/learn/ml5-glossary) first.

It provides the following functionalities:

- **Custom Classification**: Train a model with your own labels to recognize specific objects, hand poses, or scenes.
- **Custom Regression**: Train a model to predict a continuous numeric value from an image.
- **Real-time Webcam Training**: Collect training samples from a webcam and retrain the model in the browser.

## Quick Start

Run and explore a pre-built example! [This Feature Extractor example](https://editor.p5js.org/ml5/sketches/XSzNdRjCm) trains a custom classifier with samples collected from the webcam and classifies the live video in real-time.

</br>

[DEMO](iframes/feature-extractor ":include :type=iframe width=100% height=550px")

## Examples

### p5 sketches

- [Feature Extractor Webcam Classifier](https://editor.p5js.org/ml5/sketches/XSzNdRjCm): Name two classes of your own (e.g. thumbs-up 👍 vs. peace sign ✌️), collect webcam samples for each with a button click, train the classifier, and see the predicted label with its confidence score update in real-time.
- [Feature Extractor Webcam Regressor](https://editor.p5js.org/ml5/sketches/kZkob6YQP): Control the size of a circle by moving closer or further away from the camera. Add webcam samples with the slider at 0 while leaning back and at 1 while leaning in, train the regressor, and watch the circle grow and shrink with your distance in real-time.

### Video Tutorials

> These videos were created using an older version of ml5.js, so the code shown may not work directly with the current ml5.featureExtractor API.
>
> That said, the core concepts remain the same and the videos are still an excellent way to understand how the Feature Extractor works!

- [ml5.js Feature Extractor Classification](https://www.youtube.com/watch?v=eeO-rWYFuG0) by The Coding Train
- [ml5.js Transfer Learning with Feature Extractor](https://www.youtube.com/watch?v=kRpZ5OqUY6Y) by The Coding Train
- [ml5.js Feature Extractor Regression](https://www.youtube.com/watch?v=aKgq0m1YjvQ) by The Coding Train

## Step-by-Step Guide

Now, let's together build the [Feature Extractor Webcam Classifier example](https://editor.p5js.org/ml5/sketches/XSzNdRjCm) from scratch, and in the process, learn how to use the Feature Extractor. We will train a custom classifier with two classes of our own, using samples collected from the webcam, and then classify the live video in real-time.

### Create a new project

To follow along, start by creating an empty project in the [p5.js web editor](https://editor.p5js.org/).

### Set up ml5.js

Import the ml5.js library in your `index.html` file.

```html
<script src="https://unpkg.com/ml5@1/dist/ml5.js"></script>
```

?> If you are not familiar with how to import the ml5.js library and need more detailed guidance, please check out our [Getting Started](/?id=set-up-ml5js) page.

### Load the model

Let's open the `sketch.js` file and define a variable to store the Feature Extractor.

```javascript
let classifier;
```

With p5.js 2.0, the `setup` function can be `async`, so we can `await` the model and be sure it is fully loaded before we use it. We pass `{ task: "classification" }` because we want to sort the webcam frames into labeled classes.

```javascript
async function setup() {
  classifier = await ml5.featureExtractor("MobileNet", {
    task: "classification",
  });
}
```

### Fetch webcam video

Let's define a variable `video` to store the webcam video.

```javascript
let video;
```

In the `setup` function, create the canvas with a resolution of 640x480, a common resolution for webcams. Then fetch the webcam video and hide it from the display. We will draw the video on the canvas instead. The `{ flipped: true }` option mirrors the video, which feels more natural when you are moving in front of the camera.

```javascript
async function setup() {
  // ...
  createCanvas(640, 480);
  video = createCapture(VIDEO, { flipped: true });
  video.hide();
}
```

### Create the interface

Our sketch needs a small interface. Let's define a variable for each part of it:

- **`classElems`**: an array that stores a text input for each class, where you type the class name.
- **`doneButton`**: the "Start collecting samples" button. Once you have decided what to classify and named your classes, pressing this button lets you start capturing images for each class from the webcam.
- **`result`**: a string that we will draw at the bottom of the canvas. It shows how many samples each class has while collecting, and the predicted label with its confidence score after training.

```javascript
let classElems = [];
let doneButton;
let result = "";
```

At the end of the `setup` function, create the text inputs and the button. You can train the classifier with any number of classes. Since this example uses **two class labels**, we create the inputs with a for loop that runs twice.

The `placeholder` attribute gives each empty input a hint, "Class #1 label" and "Class #2 label", so you know where to type each class name. Pressing the button calls the `startSampling()` function, which we will write in the [Collect training samples](/reference/feature-extractor?id=collect-training-samples) section below.

```javascript
async function setup() {
  // ...
  for (let i = 0; i < 2; i++) {
    let input = createInput("");
    input.attribute("placeholder", "Class #" + (i + 1) + " label");
    classElems.push(input);
  }

  doneButton = createButton("Start collecting samples");
  doneButton.mousePressed(startSampling);
}
```

The interface will look like this below the canvas:

<img style="display: block; max-width: 100%;" src="assets/feature-extractor-interface.png" alt="Two class name text inputs and a Start collecting samples button">

### Draw the video and results

In the `draw` function, draw the webcam video on the canvas, and display the `result` text at the bottom. We will fill in `result` later: first with the sample counts, and after training with the classification results.

```javascript
function draw() {
  background(0);

  image(video, 0, 0, 640, 450);

  fill(255);
  textSize(16);
  text(result, 10, height - 10);
}
```

### Collect training samples

When the "Start collecting samples" button is pressed, `startSampling()` runs. It reads the class name from each text input (falling back to `"Class #1"` and `"Class #2"` if left empty) and turns each input into a button. Pressing one will add a sample for that class. It also stores the label and a sample counter as custom properties on each element, and repurposes `doneButton` to move on to the training stage.

```javascript
function startSampling() {
  for (let i = 0; i < classElems.length; i++) {
    let label = classElems[i].value();
    if (label.trim().length == 0) {
      label = "Class #" + (i + 1);
    }
    // we're storing the label and the number of samples seen as
    // custom properties in the p5.Element
    classElems[i].label = label;
    classElems[i].count = 0;
    // turn it into a button
    classElems[i].attribute("type", "button");
    classElems[i].value("Add " + label);
    classElems[i].mousePressed(addSample);
  }

  doneButton.html("Start training");
  doneButton.mousePressed(startTraining);
}
```

Each press of a class button calls `addSample()`. Inside, [`classifier.addImage()`](/reference/feature-extractor?id=featureextractoraddimage) captures the current webcam frame and stores it as one training sample for that class. We also update the `result` text to show how many samples each class has so far.

```javascript
function addSample() {
  // "this" is the button that was pressed
  classifier.addImage(video, this.label);
  this.count++;

  result = "";
  for (let i = 0; i < classElems.length; i++) {
    result += classElems[i].label + ": " + classElems[i].count + ", ";
  }
  result = result.slice(0, -2);
}
```

?> The loop appends `", "` after every count, leaving an extra comma and space at the end of the string. `slice(0, -2)` cuts off these last two characters, turning `"cat: 5, dog: 3, "` into `"cat: 5, dog: 3"`.

?> Each call to `addImage()` captures **a single frame**. Collect a good handful of samples for each class. Around 15 to 20 per class, with some variation in position and angle, already works well.

### Train the model

When the "Start training" button is pressed, `startTraining()` calls [`classifier.train()`](/reference/feature-extractor?id=featureextractortrain). Once training finishes, the `finishedTraining` callback runs.

```javascript
function startTraining() {
  classifier.train({ epochs: 100, debug: true }, finishedTraining);
}
```

Setting `debug: true` shows a "Training Performance" panel like the one below during training, where you can watch the loss curve drop in real-time. A downward trend means the model is learning. Set `debug: false` if you do not want the panel to appear.

<img style="display: block; max-width: 100%;" src="assets/feature-extractor-loss-curve.png" alt="Training Performance panel showing the loss curve dropping over 100 epochs">

### Classify the webcam video

Once training is done, we no longer need the interface, so hide the class buttons and the train button. Then start classifying the live video with [`classifier.classifyStart()`](/reference/feature-extractor?id=featureextractorclassifystart), which runs on every webcam frame and passes the results to the `gotResult` callback.

```javascript
function finishedTraining() {
  for (let i = 0; i < classElems.length; i++) {
    classElems[i].hide();
  }
  doneButton.hide();

  classifier.classifyStart(video, gotResult);
}
```

The `results` array is sorted from highest to lowest confidence, so `results[0]` is the model's top guess. Save its label and confidence into `result`, and the `draw` function will display it at the bottom of the canvas.

```javascript
function gotResult(results) {
  result = results[0].label + " (" + nf(results[0].confidence, 0, 2) + ")";
}
```

?> `nf()` is the p5.js number format function, and the `0, 2` arguments keep two digits after the decimal point. A confidence of `0.9731425` is displayed as `cat (0.97)` instead of a long trail of decimals.

### Run your sketch

You have successfully built the Feature Extractor Webcam Classifier example. Press the <img class="inline-img" src="assets/facemesh-arrow-forward.png" alt="run button icon" aria-hidden="true"> `run` button, name your two classes, collect some samples for each, train the model, and watch it classify the live video. You can also find the [complete code](https://editor.p5js.org/ml5/sketches/XSzNdRjCm) in the p5.js web editor.

## Methods

### Overview

| method | description |
| :-- | :-- |
| `.addImage()` | Extracts features from an image (or webcam frame) and stores it as a labeled training sample. |
| `.train()` | Trains a classifier or value predictor on top of the collected samples. |
| `.classify()` | Classifies a single image and returns labels with confidence scores (for classifiers only). |
| `.classifyStart()` | Continuously classifies webcam frames and passes each result to a callback (for classifiers only). |
| `.classifyStop()` | Stops the continuous classification started by `.classifyStart()`. |
| `.predict()` | Predicts a continuous numeric value from a single image (for value predictors only). |
| `.predictStart()` | Continuously predicts a value for each webcam frame and passes each result to a callback (for value predictors only). |
| `.predictStop()` | Stops the continuous prediction started by `.predictStart()`. |
| `.save()` | Saves the trained model to the user's device as a downloadable file. |
| `.load()` | Loads a previously saved model from a URL or a file input. |

### ml5.featureExtractor()

This method is used to initialize the `featureExtractor` object. With p5.js 2.0, `setup()` can be `async`, so you can `await` the model instead of using a callback:

```javascript
let featureExtractor;

async function setup() {
  featureExtractor = await ml5.featureExtractor(?modelName, ?options, ?callback);
  // The model is loaded and ready to use here.
}
```

**Parameters:**

- **modelName**: Optional. String. The underlying model used to extract features from inputs. Currently only `"MobileNet"` is supported.
  - Default: `"MobileNet"`
- **options**: Optional. Configuration for the Feature Extractor:
  ```javascript
  // All fields are optional — the values shown are the defaults.
  {
    version: 2,
    alpha: 1.0,
    task: "classification",
  }
  ```
  - _version_ — Number. Decides which version of MobileNet model is loaded; a newer version is more accurate.
    - Default: `2`
    - Accepted values: `1`, `2`
  - _alpha_ — Number. Decides how large the MobileNet model is; a smaller value makes it lighter and faster but less accurate.
    - Default: `1.0`
    - Accepted values depend on the `version` you set:
      - When `version` is `1`: `0.25`, `0.5`, `0.75`, `1.0`
      - When `version` is `2`: `0.5`, `0.75`, `1.0`
  - _task_ — String. Decides what the trained model predicts; `"classification"` sorts inputs into labels, while `"regression"` predicts a continuous numeric value. This choice also determines which methods you use after training: classification tasks use [`classify()`](/reference/feature-extractor?id=featureextractorclassify) / [`classifyStart()`](/reference/feature-extractor?id=featureextractorclassifystart), while regression tasks use [`predict()`](/reference/feature-extractor?id=featureextractorpredict) / [`predictStart()`](/reference/feature-extractor?id=featureextractorpredictstart).
    - Default: `"classification"`
    - Accepted values: `"classification"`, `"regression"`
- **callback(featureExtractor, error)**: Optional. Function. Runs once the model has loaded. With p5.js 2.0 you can `await` the call instead of passing a callback.

**Returns:**

- **Object**: The `featureExtractor` object, with methods to add samples, train a classifier or value predictor, and make predictions. When called with `await`, the returned object is fully loaded and ready to use.

---

### featureExtractor.addImage()

Extracts features from an image or the current webcam frame and stores it as a labeled training sample.

```javascript
featureExtractor.addImage(input, label, ?callback);
```

**Parameters:**

- **input**: Required. The visual input to extract features from. This can be **either a still image or a live webcam (video)**:
  - **Image** — a p5.js image from `loadImage()`, or an HTML `<img>` element.
  - **Webcam / video** — a p5.js video from `createCapture()`, or an HTML `<video>` element.
- **label**: Required. The value you want the model to learn for this sample. For **classification**, pass a label naming the group — usually a string like `"mug"` (a number is also accepted as a category id). For **regression**, pass the numeric value you want the model to learn on a continuous scale.
- **callback**: Optional. Function. Runs once the sample has been added. It signals completion only — no value is passed; on failure it receives `(undefined, error)`.

?> When the input is a webcam or video, `addImage()` captures **a single frame**, the one showing at the moment the method is called. It does **not** capture the whole video stream.<br><br>Each call adds exactly **one** sample. To collect multiple samples from a webcam, call `addImage()` once for each sample you want, for example on a key press, a button click, or on every frame inside `draw()`.

**Returns:**

- **Promise**: A `Promise` that resolves once the sample has been added. It returns no value and simply tells you the sample is ready. Use `await` (or pass a callback) when you need the sample ready before continuing, for example before calling [`featureExtractor.train()`](/reference/feature-extractor?id=featureextractortrain).

---

### featureExtractor.train()

Trains a classifier or value predictor on top of the collected samples. Under the hood this builds a small neural network (a multilayer perceptron, or MLP) on top of MobileNet's features that maps them to your labels (classification) or to a single number (regression).

```javascript
featureExtractor.train(?options, ?whileTraining, ?callback);
```

**Parameters:**

- **options**: Optional. Object. Configuration for training:
  ```javascript
  // All fields are optional — the values shown are the defaults.
  {
    epochs: 20,
    hiddenUnits: 100,
    learningRate: 0.0001,
    batchSize: 0.4,
    debug: false,
  }
  ```
  - _epochs_ — Number. How many times training passes over all your collected samples. More epochs can improve accuracy up to a point, then start to [overfit](/learn/ml5-glossary?id=overfitting). See the formal definition for `Epochs` in [Glossary](/learn/ml5-glossary?id=epochs).
    - Default: `20`
  - _hiddenUnits_ — Number. The size of the small neural network trained on top of the features. More units can capture more complex patterns but train slower and can overfit. The default works for most sketches — leave it unless you know you need to change it.
    - Default: `100`
  - _learningRate_ — Number. How big a step training takes each time it adjusts the model. Too high and training becomes unstable; too low and it learns very slowly.
    - Default: `0.0001`
  - _batchSize_ — Number. How many samples are processed together before the model updates, given here as a **fraction** of your total samples (`0.4` = 40%). Note: unlike the whole-number batch size in the [Glossary](/learn/ml5-glossary?id=batch-size), Feature Extractor expects a value between `0` and `1`.
    - Default: `0.4`
  - _debug_ — Boolean. Set to `true` to show the training loss curve — a live graph of how the training error drops over time, where a downward trend means training is working.
    - Default: `false`
- **whileTraining(epoch, logs)**: Optional. Function. Runs once after each training epoch, so you can monitor progress during training.
  - **epoch**: Number. The index of the epoch that just finished.
  - **logs**: Object. The training metrics recorded at the end of that epoch. Currently it holds a single field, `loss`: the training loss for the latest epoch. A lower value means the model fits the training data better, so `loss` normally trends downward across epochs.

  Example — log the loss to the console after each epoch to watch training progress:
  ```javascript
  function whileTraining(epoch, logs) {
    console.log(`Epoch ${epoch}: loss = ${logs.loss}`);
  }
  ```
- **callback**: Optional. Function. Runs once training completes. It signals completion only — no value is passed; on failure it receives `(undefined, error)`.

**Returns:**

- **Promise**: A `Promise` that resolves once training is complete. It returns no value and simply signals that the model has finished training.

---

### featureExtractor.classify()

Classifies a single image and returns the predicted labels with their confidence scores. Available only when `task` is `"classification"`.

?> Use `.classify()` for a one-time prediction on a static image (e.g. one loaded with `loadImage()`). For live webcam input that updates every frame, use `.classifyStart()`.

```javascript
featureExtractor.classify(input, ?callback);
```

**Parameters:**

- **input**: Required. The image, video frame, or canvas to classify — a p5.js `image`/`video` (from `loadImage()`/`createCapture()`) or an HTML `<img>`/`<video>`/`<canvas>` element. You can pass a single video frame for a one-shot result; for an ongoing webcam stream that updates every frame, use `.classifyStart()` instead.
- **callback(results, error)**: Optional. Function. Runs once classification finishes.
  - **results**: an array of `{ label, confidence }` objects, one per trained label, sorted from highest to lowest confidence. `confidence` is a Number from `0` to `1`, summing to `1` across all labels. So `results[0].label` is the model's top guess and `results[0].confidence` is how sure it is.
  - **error**: an error object if classification failed.

  Example output:
  ```javascript
  [
    { label: "mug", confidence: 0.97 },
    { label: "bottle", confidence: 0.03 },
  ];
  ```

**Returns:**

- **Promise**: Resolves to an array of `{ label, confidence }` objects.

---

### featureExtractor.classifyStart()

Repeatedly classifies frames from a video and passes each result to a callback. Available only when `task` is `"classification"`. It keeps running every frame until you call [`classifyStop()`](/reference/feature-extractor?id=featureextractorclassifystop).

?> Use `.classifyStart()` for continuous input like a webcam. For a single static image, call `.classify()` once instead.

```javascript
featureExtractor.classifyStart(video, callback);
```

**Parameters:**

- **video**: Required. The video to classify frames from — a p5.js video (from `createCapture()`) or an HTML `<video>` element.
- **callback(results, error)**: Required. Function. Handles the results for each frame, in the same format as `.classify()`.

**Example:**

Your callback receives one `results` array per frame — one `{ label, confidence }` object per trained label, sorted highest-confidence first. Read the top prediction from `results[0]`:

```javascript
featureExtractor.classifyStart(video, gotResults);

function gotResults(results) {
  // results is sorted high → low confidence, same format as classify()
  let label = results[0].label; // top guess, e.g. "mug"
  let confidence = results[0].confidence; // how sure, 0–1, e.g. 0.97
  console.log(label, confidence);

  // …or read every label's confidence:
  for (let result of results) {
    console.log(result.label, result.confidence);
  }
}
```

**Returns:**

- n/a: Starts the continuous classification loop.

---

### featureExtractor.classifyStop()

Stops the continuous classification started by `.classifyStart()`.

```javascript
featureExtractor.classifyStop();
```

**Parameters:**

- n/a

**Returns:**

- n/a: Stops the classification loop.

---

### featureExtractor.predict()

Predicts a continuous numeric value from a single image. Available only when `task` is `"regression"`.

?> Use `.predict()` for a one-time prediction on a static image (e.g. one loaded with `loadImage()`). For live webcam input that updates every frame, use `.predictStart()`.

```javascript
featureExtractor.predict(input, ?callback);
```

**Parameters:**

- **input**: Required. The image, video frame, or canvas to run the prediction on — a p5.js `image`/`video` (from `loadImage()`/`createCapture()`) or an HTML `<img>`/`<video>`/`<canvas>` element. You can pass a single video frame for a one-shot result; for an ongoing webcam stream that updates every frame, use `.predictStart()` instead.
- **callback(results, error)**: Optional. Function. Runs once prediction finishes.
  - **results**: an array containing a single `{ value }` object, where `value` is the predicted Number (on the same scale as the labels you trained with). Read it as `results[0].value`.
  - **error**: an error object if prediction failed.

  Example output:
  ```javascript
  [{ value: 0.73 }];
  ```

**Returns:**

- **Promise**: Resolves to an array containing a single `{ value }` object.

---

### featureExtractor.predictStart()

Repeatedly predicts a value for each frame of a video and passes each result to a callback. Available only when `task` is `"regression"`. It keeps running every frame until you call [`predictStop()`](/reference/feature-extractor?id=featureextractorpredictstop).

?> Use `.predictStart()` for continuous input like a webcam. For a single static image, call `.predict()` once instead.

```javascript
featureExtractor.predictStart(video, callback);
```

**Parameters:**

- **video**: Required. The video to predict frames from — a p5.js video (from `createCapture()`) or an HTML `<video>` element.
- **callback(results, error)**: Required. Function. Handles the results for each frame, in the same format as `.predict()`.

**Example:**

Your callback receives one `results` array per frame — an array containing a single `{ value }` object, in the same format as `.predict()`. Read the predicted number from `results[0].value`:

```javascript
featureExtractor.predictStart(video, gotResults);

function gotResults(results) {
  // results is [{ value }], same format as predict()
  let value = results[0].value; // predicted number, on the scale you trained with
  console.log(value);
}
```

**Returns:**

- n/a: Starts the continuous prediction loop.

---

### featureExtractor.predictStop()

Stops the continuous prediction started by `.predictStart()`.

```javascript
featureExtractor.predictStop();
```

**Parameters:**

- n/a

**Returns:**

- n/a: Stops the prediction loop.

---

### featureExtractor.save()

Saves the trained model. Call this after [`train()`](/reference/feature-extractor?id=featureextractortrain) (or after [`load()`](/reference/feature-extractor?id=featureextractorload) to re-save a restored model). It downloads **two files** to your browser's downloads folder — a `.json` (the model plus the task type and class labels) and a `.weights.bin` (the trained weights); you need **both** to reload the model later with [`load()`](/reference/feature-extractor?id=featureextractorload).

```javascript
featureExtractor.save(?name, ?callback);
```

**Parameters:**

- **name**: Optional. String. Used as the prefix for both downloaded files, so `name: "gestures"` produces `gestures.json` and `gestures.weights.bin`.
  - Default: `"model"` (produces `model.json` and `model.weights.bin`)
- **callback(featureExtractor, error)**: Optional. Function. Runs after the model has been saved, receiving the saved `featureExtractor` instance.

**Returns:**

- **Promise**: Resolves to the `featureExtractor` instance once saved. Side effect: downloads `<name>.json` and `<name>.weights.bin` to your browser's downloads folder.

---

### featureExtractor.load()

Loads a previously saved model. If it was saved with `.save()`, the task type and class labels are restored automatically — classifiers return their original label names from [`classify()`](/reference/feature-extractor?id=featureextractorclassify), and regressors route to [`predict()`](/reference/feature-extractor?id=featureextractorpredict) without needing `{ task: "regression" }` at construction time.

?> **Load both files, and wait for loading to finish.** `.load()` needs `model.json` **and** its `.weights.bin` together — the model is ready only once both have loaded, so run your predictions from the callback (or after `await`). Because loading restores a fully trained model, you can **skip [`train()`](/reference/feature-extractor?id=featureextractortrain)** and go straight to [`classify()`](/reference/feature-extractor?id=featureextractorclassify) / [`predict()`](/reference/feature-extractor?id=featureextractorpredict).

```javascript
featureExtractor.load(filesOrPath, ?callback);
```

**Parameters:**

- **filesOrPath**: Required. String | FileList. A URL to the `model.json` file, or a `FileList` from an HTML file input.
  - String path: TensorFlow.js fetches the weight file(s) named in `model.json` from the same location, so keep `model.json` and `model.weights.bin` together.
  - FileList (from `<input type="file" multiple>`): select both `model.json` and its weights file. TensorFlow.js treats the **first** selected file as `model.json`, so it must come first; the remaining weight files are matched by the names in the model's manifest. Loading fails if a referenced weights file is missing.
- **callback(featureExtractor, error)**: Optional. Function. Runs after the model has been loaded, receiving the loaded `featureExtractor` instance.

**Returns:**

- **Promise**: Resolves to the `featureExtractor` instance once loaded and ready to use. Side effect: the saved task type and class labels are restored automatically, so there is no need to re-specify `{ task }` at construction time.

**Example:**

Load from a URL — keep `model.json` and `model.weights.bin` together at the same location. Once loaded, you can skip `train()` and predict right away:

```javascript
featureExtractor.load("model.json", modelReady);

function modelReady() {
  // The saved model is fully restored — no train() needed.
  featureExtractor.predict(video, gotResults); // use classify(video, …) for a classification model
}
```

Load from an HTML `<input type="file" multiple>` — the user selects `model.json` **first**, then its weights file. The model is ready (and `modelReady` runs) only after **both** files have loaded:

```javascript
let fileInput = document.querySelector("#model-files"); // <input type="file" multiple>
fileInput.addEventListener("change", () => {
  featureExtractor.load(fileInput.files, modelReady); // reuses the modelReady() above
});
```

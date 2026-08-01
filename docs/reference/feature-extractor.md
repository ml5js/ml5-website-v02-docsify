# FeatureExtractor

## Description

The ml5.js FeatureExtractor gives you the output of a pre-trained image classifier right before its final classification layer. You can use these "features" directly, or use [transfer learning](https://en.wikipedia.org/wiki/Transfer_learning) to train your own image classifier or predict a continuous value — a task known as regression. For example, you can train it to distinguish coffee mugs from water bottles, recognize hand poses, or predict a slider value from a webcam image.

The ml5.js FeatureExtractor is built on top of [MobileNet](https://arxiv.org/abs/1704.04861), a model pre-trained on millions of images to recognize objects. FeatureExtractor exposes the output before MobileNet’s final classification layer as a **[feature](/learn/ml5-glossary?id=feature)** — a compact list of numbers that represents what the model has detected in the image.

Because these features already encode rich visual information, you can build your own **[classification](/learn/ml5-glossary?id=classification)** or **[regression](/learn/ml5-glossary?id=regression-analysis)** model on top of them with only a small amount of training data.

?> If you are not familiar with the concepts of **classification**, **regression**, or **features**, we recommend checking out the [ml5.js Glossary](/learn/ml5-glossary) first.

It provides the following functionalities:

- **Custom Classification**: Train a model with your own labels to recognize specific objects, hand poses, or scenes.
- **Custom Regression**: Train a model to predict a continuous numeric value from an image.
- **Real-time Webcam Training**: Collect training samples from a webcam and retrain the model in the browser.

## Quick Start

## Examples

### Video Tutorials

> These videos were created using an older version of ml5.js, so the code shown may not work directly with the current ml5.featureExtractor API.
>
> That said, the core concepts remain the same and the videos are still an excellent way to understand how the FeatureExtractor works!

- [ml5.js Feature Extractor Classification](https://www.youtube.com/watch?v=eeO-rWYFuG0) by The Coding Train
- [ml5.js Transfer Learning with Feature Extractor](https://www.youtube.com/watch?v=kRpZ5OqUY6Y) by The Coding Train
- [ml5.js Feature Extractor Regression](https://www.youtube.com/watch?v=aKgq0m1YjvQ) by The Coding Train

## Step-by-Step Guide

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
- **options**: Optional. Configuration for the FeatureExtractor:
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
  - _batchSize_ — Number. How many samples are processed together before the model updates, given here as a **fraction** of your total samples (`0.4` = 40%). Note: unlike the whole-number batch size in the [Glossary](/learn/ml5-glossary?id=batch-size), FeatureExtractor expects a value between `0` and `1`.
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

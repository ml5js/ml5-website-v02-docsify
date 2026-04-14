# FeatureExtractor

## Description

The ml5.js FeatureExtractor model allows you to build your own image classifier or regressor by reusing part of a pre-trained model. For example, you can train it to tell the difference between a coffee mug and a water bottle, recognize hand gestures, or predict a slider value from a webcam image.

The ml5.js FeatureExtractor model is built on top of [MobileNet](https://arxiv.org/abs/1704.04861), a pre-trained model that has learned to recognize shapes, colors, and textures from millions of images. Instead of using the whole model, the FeatureExtractor only uses part of its layers to turn an image into a **feature** — a compact list of numbers that summarizes the visual content of an image.

Once you have the features, you can reuse them for different tasks, such as **classification** or **regression**. This technique is known as [Transfer Learning](https://en.wikipedia.org/wiki/Transfer_learning).

?> If you are not familiar with the concepts of **classification**, **regression**, or **features**, we recommend checking out the [ml5.js Glossary](/learn/ml5-glossary) first.

It provides the following functionalities:

- **Custom Classification**: Train a model with your own labels to recognize specific objects, gestures, or scenes.
- **Custom Regression**: Train a model to predict a continuous numeric value from an image.
- **Real-time Webcam Training**: Collect training samples from a webcam and retrain the model in the browser.

## Quick Start
TBD

## Examples
<!-- Will be fulfilled after the release -->

## Step-by-Step Guide
TBD

## Methods

### Overview

| method             | description                                                                                                        |
| :----------------- | :---------------------------------------------------------------------------------------------------               |
| `.addImage()`      | Extracts features from an image (or webcam frame) and stores it as a training sample with a label.                 |
| `.train()`         | Trains a small classifier or regressor on top of the extracted features using the collected samples.               |
| `.classify()`      | Classifies a single image and returns the predicted labels with their confidence scores (classification task only).|
| `.classifyStart()` | Continuously classifies frames from a webcam video and passes the results to a callback.                           |
| `.classifyStop()`  | Stops the continuous classification started by `.classifyStart()`.                                                 |
| `.predict()`       | Predicts a continuous numeric value from a single image (regression task only).                                    |
| `.predictStart()`  | Continuously predicts a value for each frame of a webcam video and passes the result to a callback.                |
| `.predictStop()`   | Stops the continuous prediction started by `.predictStart()`.                                                      |
| `.save()`          | Saves the trained model to the user's device as a downloadable file.                                               |
| `.load()`          | Loads a previously saved model from a URL or a file input.                                                         |

### ml5.featureExtractor()

This method initializes the `featureExtractor` object.

```javascript
const featureExtractor = ml5.featureExtractor(?options, ?callback);
```

**Parameters:**

- **options**: Optional. Object. An object to configure the FeatureExtractor. The available options are:
  ```javascript
  {
    version: 2,             // MobileNet version: 1 or 2
    alpha: 1.0,             // Width multiplier. v1: 0.25, 0.5, 0.75, 1.0. v2: 0.5, 0.75, 1.0
    task: "classification", // "classification" or "regression"
  }
  ```
  - _version_ - Optional
    - Number: The MobileNet version to use. A newer version generally offers higher accuracy. Default: `2`.
  - _alpha_ - Optional
    - Number: Controls the width of the MobileNet model. A smaller value makes the model smaller and faster but less accurate. The available values depend on the selected `version`:
      - v1: `0.25`, `0.5`, `0.75`, `1.0`
      - v2: `0.5`, `0.75`, `1.0`
    - Default: `1.0`.
  - _task_ - Optional
    - String: The type of task, either `"classification"` or `"regression"`. Default: `"classification"`.

- **callback(featureExtractor, error)**: Optional. Function. A function to run once the model has been loaded.

**Returns:**

- **Object**: The featureExtractor object. This object contains methods to add training samples, train a small head model, and make predictions or classifications.

---

### featureExtractor.addImage()

This method extracts features from an image (or a webcam frame) and stores it as a training sample with a label.

```javascript
featureExtractor.addImage(input, label, ?callback);
// or, if a video has been set via featureExtractor.setVideo()
featureExtractor.addImage(label, ?callback);
```

**Parameters:**

- **input**: Required (unless a video is set via `setVideo()`). An image, a video frame, or a canvas drawing to extract features from. This can be a p5.js image or video created with `loadImage()` or `createCapture()`, or an HTML `<img>`, `<video>`, or `<canvas>` element from the page. If omitted, the video set via `setVideo()` is used.
- **label**: Required. The label for this training sample. A string or number for classification, a number for regression.
- **callback(output, error)**: Optional. Function. A function called when the sample has been added.

**Returns:**

- **Promise**: A promise that resolves to an object `{label, featuresLength}` containing the added label and the length of the extracted feature vector.

---

### featureExtractor.train()

This method trains a small classifier or regressor on top of the collected training samples.

```javascript
featureExtractor.train(?options, ?callback);
```

**Parameters:**

- **options**: Optional. Object. An object to configure the training process. The available options are:
  ```javascript
  {
    epochs: 20,
    hiddenUnits: 100,
    learningRate: 0.0001,
    batchSize: 0.4,
    debug: false,
  }
  ```
  - _epochs_ - Optional
    - Number: The number of training epochs. Default: `20`.
  - _hiddenUnits_ - Optional
    - Number: The number of units in the hidden layer. Default: `100`.
  - _learningRate_ - Optional
    - Number: The learning rate used by the optimizer. Default: `0.0001`.
  - _batchSize_ - Optional
    - Number: The batch size as a fraction of the total number of training samples. Default: `0.4`.
  - _debug_ - Optional
    - Boolean: Whether to show the training loss curve visualization. Default: `false`.

- **callback(result, error)**: Optional. Function. A function called when training is complete.

**Returns:**

- **Promise**: A promise that resolves when training is complete.

---

### featureExtractor.classify()

This method classifies a single image and returns the predicted labels with their confidence scores. Only available when `task` is `"classification"`.

?> Use `.classify()` when you want a one-time prediction, such as on a static image loaded with `loadImage()`. For live webcam input where you want predictions to update on every frame, use `.classifyStart()` instead.

```javascript
featureExtractor.classify(?input, ?callback);
```

**Parameters:**

- **input**: Optional. An image, a video frame, or a canvas drawing to classify. This can be a p5.js image or video created with `loadImage()` or `createCapture()`, or an HTML `<img>`, `<video>`, or `<canvas>` element from the page. If omitted, the video set via `setVideo()` is used.
- **callback(output, error)**: Optional. Function. A function that runs once the classification finishes. It receives two arguments:
  - **output**: An array of result objects, one per label the model was trained on, sorted from highest to lowest confidence. Each object has `label` and `confidence` (Number between `0` and `1`, summing to `1` across all labels).
  - **error**: An error object if the classification failed, otherwise `null`.

  Example output:
  ```javascript
  [
    { label: "mug", confidence: 0.97 },
    { label: "bottle", confidence: 0.03 },
  ];
  ```

**Returns:**

- **Promise**: A promise that resolves to an array of objects, each containing `{label, confidence}`.

---

### featureExtractor.classifyStart()

This method repeatedly classifies frames from the video set via `setVideo()` and passes the results to a callback function.

?> Use `.classifyStart()` only for continuous input like a webcam or a video. For a single static image, call `.classify()` once instead.

```javascript
featureExtractor.classifyStart(callback);
```

**Parameters:**

- **callback(output, error)**: Required. Function. A function to handle the classification output for each frame. The output has the same format as `.classify()`.

**Returns:**

- n/a: Starts the repeating classification loop.

---

### featureExtractor.classifyStop()

This method stops the repeating classifications started by `.classifyStart()`.

```javascript
featureExtractor.classifyStop();
```

**Parameters:**

- n/a

**Returns:**

- n/a: Stops the classification loop.

---

### featureExtractor.predict()

This method predicts a continuous numeric value from a single image. Only available when `task` is `"regression"`.

?> Use `.predict()` when you want a one-time prediction, such as on a static image loaded with `loadImage()`. For live webcam input where you want predictions to update on every frame, use `.predictStart()` instead.

```javascript
featureExtractor.predict(?input, ?callback);
```

**Parameters:**

- **input**: Optional. An image, a video frame, or a canvas drawing to run the prediction on. This can be a p5.js image or video created with `loadImage()` or `createCapture()`, or an HTML `<img>`, `<video>`, or `<canvas>` element from the page. If omitted, the video set via `setVideo()` is used.
- **callback(output, error)**: Optional. Function. A function that runs once the prediction finishes. Example output:
  ```javascript
  [{ value: 0.73 }];
  ```

**Returns:**

- **Promise**: A promise that resolves to an array containing a single object with `{value}`.

---

### featureExtractor.predictStart()

This method repeatedly predicts a value for each frame of the video set via `setVideo()` and passes the result to a callback function.

?> Use `.predictStart()` only for continuous input like a webcam. For a single static image, call `.predict()` once instead.

```javascript
featureExtractor.predictStart(callback);
```

**Parameters:**

- **callback(output, error)**: Required. Function. A function to handle the prediction output for each frame. The output has the same format as `.predict()`.

**Returns:**

- n/a: Starts the repeating prediction loop.

---

### featureExtractor.predictStop()

This method stops the repeating predictions started by `.predictStart()`.

```javascript
featureExtractor.predictStop();
```

**Parameters:**

- n/a

**Returns:**

- n/a: Stops the prediction loop.

---

### featureExtractor.save()

This method saves the trained model. Along with the model's architecture and weights, the task type (`"classification"` or `"regression"`) and the class labels used during training are embedded inside `model.json`.

```javascript
featureExtractor.save(?callback, ?name);
```

**Parameters:**

- **callback**: Optional. Function. A callback function to be called after the model has been saved.
- **name**: Optional. String. The name of the saved file. Default is `model`.

**Returns:**

- n/a: Downloads the model to a `.json` file and a `model.weights.bin` binary file.

---

### featureExtractor.load()

This method loads a pre-trained model. If the model was saved with `save()`, the task type and class labels are automatically restored — classifiers return the original label names from `classify()`, and regressors route to `predict()` without needing `{ task: "regression" }` at construction time.

```javascript
featureExtractor.load(filesOrPath, ?callback);
```

**Parameters:**

- **filesOrPath**: Required. String | FileList. The URL to the `model.json` file, or a `FileList` from an HTML input element.
  - If a string path to the `model.json` is given, the accompanying `model.weights.bin` file will also be loaded from the same directory. Note that the names must match.
  - If `FileList` from html input `type="file" multiple`, make sure to select BOTH the `model.json` and the `model.weights.bin` file together to upload otherwise the load will throw an error. The selection order does not matter — ml5 matches the files by filename.
- **callback**: Optional. Function. A callback function to be called after the model has been loaded.

**Returns:**

- n/a: Loads the model to `featureExtractor.MLP` and restores `task` and `labelIndex` from the saved metadata.
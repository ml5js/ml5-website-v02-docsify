# NeuralNetwork

<center>
  <img class="header-img" src="assets/header-neural-network.png" alt="NeuralNetwork Header Image" >
  <p class="img-credit"> Image Credit: <a href="https://thenounproject.com/creator/lutfidiarycoc/" target="_blank" title="LUTFI GANI AL ACHMAD">LUTFI GANI AL ACHMAD</a> | <a href='mailto:info@ml5js.org'>Contribute ♥️</a> </p>
</center>

## Description

Thinking of creating a custom machine learning model with your own data? Try out the ml5 Neural Network! You can train neural networks in the browser to perform

1. classification task: where the model predicts a label based on the input data, or
2. regression task: where the model predicts a value based on the input data.

The neural network is a type of machine learning model that is inspired by the human brain. It is made up of layers of neurons that are connected to each other. Each neuron takes in input data, processes it, and passes the output to the next layer of neurons. The neural network learns by adjusting the weights of the connections between neurons to minimize the error in its predictions.

_<img class="inline-img" src="assets/gettingstarted-bulb.png" alt="tip icon" aria-hidden="true"> If you are not familiar with the concept of **classification**, **regression**, **neuron**, **neural networks**, and **weights**, you can learn more about them with [ml5 glossary](/glossary)._

### Key Features

- **Classification**: The neural network can be used to classify input data into different categories. For example, you can train a neural network to classify images of cats and dogs.
- **Regression**: The neural network can be used to predict a continuous value based on input data. For example, you can train a neural network to predict the price of a house based on its size and location.

### Output Example

An example of the output from the neural network classification task is shown below:

```javascript
{
  label: "red",
  confidence: 0.8
}
```

An example of the output from the neural network regression task is shown below:

```javascript
{
  value: 500000,
  label: "house_price"
}
```

## Getting Started

### Demo

[DEMO](iframes/neural-network ":include :type=iframe width=100% height=550px")

### Quick Start

Before you start, let's create an empty project in the [p5 web editor](https://editor.p5js.org/).

First of all, copy and paste the following code into your **index.html** file. If you are not familiar with the p5 web editor interface, you can find a guide on how to find your **index.html** file [here](/?id=try-ml5js-online-1).

```html
<script src="https://unpkg.com/ml5@alpha/dist/ml5.js"></script>
```

Next, copy and paste the following code into your **sketch.js** file. This code will load the neural network model and classify the content of an image.

```javascript
// Step 1: load data or create some data
let data = [
  { r: 255, g: 0, b: 0, color: "red-ish" },
  { r: 254, g: 0, b: 0, color: "red-ish" },
  { r: 253, g: 0, b: 0, color: "red-ish" },
  { r: 0, g: 255, b: 0, color: "green-ish" },
  { r: 0, g: 254, b: 0, color: "green-ish" },
  { r: 0, g: 253, b: 0, color: "green-ish" },
  { r: 0, g: 0, b: 255, color: "blue-ish" },
  { r: 0, g: 0, b: 254, color: "blue-ish" },
  { r: 0, g: 0, b: 253, color: "blue-ish" },
];

let classifer;
let r = 255;
let g = 0;
let b = 0;
let rSlider, gSlider, bSlider;
let label = "training";

function setup() {
  createCanvas(640, 240);

  // For this example to work across all browsers
  // "webgl" or "cpu" needs to be set as the backend
  ml5.setBackend("webgl");

  rSlider = createSlider(0, 255, 255).position(10, 20);
  gSlider = createSlider(0, 255, 0).position(10, 40);
  bSlider = createSlider(0, 255, 0).position(10, 60);

  // Step 2: set your neural network options
  let options = {
    task: "classification",
    debug: true,
  };

  // Step 3: initialize your neural network
  classifier = ml5.neuralNetwork(options);

  // Step 4: add data to the neural network
  for (let i = 0; i < data.length; i++) {
    let item = data[i];
    let inputs = [item.r, item.g, item.b];
    let outputs = [item.color];
    classifier.addData(inputs, outputs);
  }

  // Step 5: normalize your data;
  classifier.normalizeData();

  // Step 6: train your neural network
  const trainingOptions = {
    epochs: 32,
    batchSize: 12,
  };
  classifier.train(trainingOptions, finishedTraining);
}
// Step 7: use the trained model
function finishedTraining() {
  classify();
}

// Step 8: make a classification
function classify() {
  const input = [r, g, b];
  classifier.classify(input, handleResults);
}

function draw() {
  r = rSlider.value();
  g = gSlider.value();
  b = bSlider.value();
  background(r, g, b);
  textAlign(CENTER, CENTER);
  textSize(64);
  text(label, width / 2, height / 2);
}

// Step 9: define a function to handle the results of your classification
function handleResults(results, error) {
  if (error) {
    console.error(error);
    return;
  }
  label = results[0].label;
  // console.log(results); // {label: 'red', confidence: 0.8};
  classify();
}
```

#### Load Data from a File

Notice that in the above example, we are creating data in real-time. This is useful when you want to create a neural network with data that is not already stored in a file. However, if you have data stored in a file, you can load it in as shown in the next example.

Follow the steps below to create a neural network with data stored in a file.

1. Create a new folder in your project called `data`.
2. Create a new file in the `data` folder called `colorData.json`.

This is what the **colorData.json** file should look like:

```json
{
  "entries": [
    { "r": 255, "g": 0, "b": 0, "color": "red-ish" },
    { "r": 254, "g": 0, "b": 0, "color": "red-ish" },
    { "r": 253, "g": 0, "b": 0, "color": "red-ish" },
    { "r": 0, "g": 255, "b": 0, "color": "green-ish" },
    { "r": 0, "g": 254, "b": 0, "color": "green-ish" },
    { "r": 0, "g": 253, "b": 0, "color": "green-ish" },
    { "r": 0, "g": 0, "b": 255, "color": "blue-ish" },
    { "r": 0, "g": 0, "b": 254, "color": "blue-ish" },
    { "r": 0, "g": 0, "b": 253, "color": "blue-ish" }
  ]
}
```

Now copy and paste the following code into your **sketch.js** file. This code will load the neural network model and classify the content of a defined input, in this case, `{r:255, g:0, b:0}`.

```javascript
// Step 1: set your neural network options
const options = {
  dataUrl: "data/colorData.json",
  task: "classification",
  inputs: ["r", "g", "b"],
  outputs: ["color"],
  debug: true,
};

// Step 2: initialize your neural network
const nn = ml5.neuralNetwork(options, dataLoaded);

// Step 3: normalize data and train the model
function dataLoaded() {
  nn.normalizeData();
  trainModel();
}

// Step 4: train the model
function trainModel() {
  const trainingOptions = {
    epochs: 32,
    batchSize: 12,
  };
  nn.train(trainingOptions, finishedTraining);
}

// Step 5: use the trained model
function finishedTraining() {
  classify();
}

// Step 6: make a classification
function classify() {
  const input = {
    r: 255,
    g: 0,
    b: 0,
  };
  nn.classify(input, handleResults);
}

// Step 7: define a function to handle the results of your classification
function handleResults(error, result) {
  if (error) {
    console.error(error);
    return;
  }
  console.log(result); // {label: 'red', confidence: 0.8};
}
```

### Additional Examples

- [NeuralNetwork_Simple_Classification](https://editor.p5js.org/ml5/sketches/NeuralNetwork_Simple_Classification)
- [NeuralNetwork_Simple_Regression](https://editor.p5js.org/ml5/sketches/NeuralNetwork_Simple_Regression)
- [NeuralNetwork_XOR](https://editor.p5js.org/ml5/sketches/NeuralNetwork_XOR)
- [NeuralNetwork_basics](https://editor.p5js.org/ml5/sketches/NeuralNetwork_basics)
- [NeuralNetwork_co2net](https://editor.p5js.org/ml5/sketches/NeuralNetwork_co2net)
- [NeuralNetwork_color_classifier](https://editor.p5js.org/ml5/sketches/NeuralNetwork_color_classifier)
- [NeuralNetwork_load_model](https://editor.p5js.org/ml5/sketches/NeuralNetwork_load_model)
- [NeuralNetwork_load_saved_data](https://editor.p5js.org/ml5/sketches/NeuralNetwork_load_saved_data)
- [NeuralNetwork_lowres_pixels](https://editor.p5js.org/ml5/sketches/NeuralNetwork_lowres_pixels)
- [NeuralNetwork_multiple_layers](https://editor.p5js.org/ml5/sketches/NeuralNetwork_multiple_layers)
- [NeuralNetwork_musical_face](https://editor.p5js.org/ml5/sketches/NeuralNetwork_musical_face)
- [NeuralNetwork_musical_mouse](https://editor.p5js.org/ml5/sketches/NeuralNetwork_musical_mouse)
- [NeuralNetwork_pose_classifier](https://editor.p5js.org/ml5/sketches/NeuralNetwork_pose_classifier)
- [NeuralNetwork_titanic](https://editor.p5js.org/ml5/sketches/NeuralNetwork_titanic)
- [NeuralNetwork_xy_classifier](https://editor.p5js.org/ml5/sketches/NeuralNetwork_xy_classifier)

### Tutorials

#### Nature of Code: Chapter 10 & 11

- [Chapter 10: Neural Networks](https://nature-of-code-2nd-edition.netlify.app/neural-networks/)
- [Chapter 11: Neuroevolution](https://nature-of-code-2nd-edition.netlify.app/neuroevolution/)

<center>
    <img style="display:block; width:100%" alt="pose detection" src="assets/gettingstarted-noc.jpeg">
</center>

#### ml5.js: Train Your Own Neural Network (Coding Train)

<iframe width="560" height="315" src="https://www.youtube.com/embed/8HEgeAbYphA"  frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

#### ml5.js: Save Neural Network Training Data (Coding Train)

<iframe width="560" height="315" src="https://www.youtube.com/embed/q6cwxORPDo8"  frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

#### ml5.js: Save Neural Network Trained Model (Coding Train)

<iframe width="560" height="315" src="https://www.youtube.com/embed/wUrg9Hjkhg0"  frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### ml5.js: Neural Network Regression (Coding Train)

<iframe width="560" height="315" src="https://www.youtube.com/embed/fFzvwdkzr_c"  frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Usage

#### Quick Reference

- For your reference, a few typical uses are showcased below:
  - Example 1:
    ```js
    const options = {
      inputs: 1,
      outputs: 1,
      task: "regression",
    };
    const nn = ml5.neuralNetwork(options);
    ```
  - Example 2: loading data as a csv
    ```js
    const options = {
      dataUrl: "weather.csv",
      inputs: ["avg_temperature", "humidity"],
      outputs: ["rained"],
      task: "classification",
    };
    const nn = ml5.neuralNetwork(options, modelLoaded);
    ```
  - Example 3: loading data as a json
    ```js
    /**
    The weather json looks something like:
    {"data": [
        {"avg_temperature":20, "humidity": 0.2, "rained" : "no"},
        {"avg_temperature":30, "humidity": 0.9, "rained": "yes"}
    ] }
    * */
    const options = {
      dataUrl: "weather.json",
      inputs: ["avg_temperature", "humidity"],
      outputs: ["rained"],
      task: "classification",
    };
    const nn = ml5.neuralNetwork(options, modelLoaded);
    ```
  - Example 4: specifying labels for a blank neural network
    ```js
    const options = {
      inputs: ["x", "y"],
      outputs: ["label"],
      task: "classification",
    };
    const nn = ml5.neuralNetwork(options);
    ```
  - Example 5: creating a convolutional neural network for image classification by setting `task: imageClassification`.
    ```js
    const IMAGE_WIDTH = 64;
    const IMAGE_HEIGHT = 64;
    const IMAGE_CHANNELS = 4;
    const options = {
      task: "imageClassification",
      inputs: [IMAGE_WIDTH, IMAGE_HEIGHT, IMAGE_CHANNELS],
      outputs: ["label"],
    };
    const nn = ml5.neuralNetwork(options);
    ```

### Initialization & Parameters

There are a number of ways to initialize the `ml5.neuralNetwork`. Below we cover the possibilities:

1. Minimal Configuration Method
2. Defining inputs and output labels as numbers or as arrays of labels
3. Loading External Data
4. Loading a pre-trained Model
5. A convolutional neural network for image classification tasks
6. Defining custom layers

#### Minimal Configuration Method

**Minimal Configuration Method**: If you plan to create data in real-time, you can just set the type of task you want to accomplish `('regression' | 'classification')` and then create the neuralNetwork. You will have to add data later on, but ml5 will figure the inputs and outputs based on the data your add.

```js
const options = {
  task: "regression", // or 'classification'
};
const nn = ml5.neuralNetwork(options);
```

#### Defining inputs and output labels as numbers or as arrays of labels

**Defining inputs and output labels as numbers or as arrays of labels**: If you plan to create data in real-time, you can just set the type of task you want to accomplish `('regression' | 'classification')` and then create the neuralNetwork. To be more specific about your inputs and outputs, you can also define the _names of the labels for your inputs and outputs_ as arrays OR _the number of inputs and outputs_. You will have to add data later on. Note that if you add data as JSON, your JSON Keys should match those defined in the `options`. If you add data as arrays, make sure the order you add your data match those given in the `options`.

- **As arrays of labels**
  ```js
  const options = {
    task: 'classification' // or 'regression'
    inputs:['r', 'g','b'],
    outputs: ['color']
  }
  const nn = ml5.neuralNetwork(options)
  ```
- **As numbers**
  ```js
  const options = {
    task: 'classification' // or 'regression'
    inputs: 3, // r, g, b
    outputs: 2 // red-ish, blue-ish
  }
  const nn = ml5.neuralNetwork(options)
  ```

#### Loading External Data

**Loading External Data**: You can initialize `ml5.neuralNetwork` specifying an external url to some data structured as a CSV or a JSON file. If you pass in data as part of the options, you will need to provide a **callback function** that will be called when your data has finished loading. Furthermore, you will **need to specify which properties** in the data that ml5.neuralNetwork will use for inputs and outputs.

```js
const options = {
    dataUrl: 'data/colorData.csv'
    task: 'classification' // or 'regression'
    inputs: ['r', 'g','b'], // r, g, b
    outputs: ['color'] // red-ish, blue-ish
}

const nn = ml5.neuralNetwork(options, dataLoaded)

function dataLoaded(){
  // continue on your neural network journey
  nn.normalizeData();
  // ...
}
```

#### Loading a pre-trained Model

**Loading a pre-trained Model**: If you've trained a model using the `ml5.neuralNetwork` and saved it out using the `ml5.neuralNetwork.save()` then you can load in the **model**, the **weights**, and the **metadata**.

```js
const options = {
  task: "classification", // or 'regression'
};
const nn = ml5.neuralNetwork(options);

const modelDetails = {
  model: "model/model.json",
  metadata: "model/model_meta.json",
  weights: "model/model.weights.bin",
};
nn.load(modelDetails, modelLoaded);

function modelLoaded() {
  // continue on your neural network journey
  // use nn.classify() for classifications or nn.predict() for regressions
}
```

### A convolutional neural network for image classification tasks

**A convolutional neural network for image classification tasks**: You can use convolutional neural networks in the `ml5.neuralNetwork` by setting the `task:"imageClassification"`.

```js
const IMAGE_WIDTH = 64;
const IMAGE_HEIGHT = 64;
const IMAGE_CHANNELS = 4;
const options = {
  task: "imageClassification",
  inputs: [IMAGE_WIDTH, IMAGE_HEIGHT, IMAGE_CHANNELS],
  outputs: ["label"],
};
const nn = ml5.neuralNetwork(options);
```

### Defining Custom Layers

**Defaults**: By default the `ml5.neuralNetwork` has simple default architectures for the `classification`, `regression` and `imageClassificaiton` tasks.

- default `classification` layers:
  ```js
  layers: [
    {
      type: "dense",
      units: this.options.hiddenUnits,
      activation: "relu",
    },
    {
      type: "dense",
      activation: "softmax",
    },
  ];
  ```
- default `regression` layers:
  ```js
  layers: [
    {
      type: "dense",
      units: this.options.hiddenUnits,
      activation: "relu",
    },
    {
      type: "dense",
      activation: "sigmoid",
    },
  ];
  ```
- default `imageClassification` layers:
  ```js
  layers = [
    {
      type: "conv2d",
      filters: 8,
      kernelSize: 5,
      strides: 1,
      activation: "relu",
      kernelInitializer: "varianceScaling",
    },
    {
      type: "maxPooling2d",
      poolSize: [2, 2],
      strides: [2, 2],
    },
    {
      type: "conv2d",
      filters: 16,
      kernelSize: 5,
      strides: 1,
      activation: "relu",
      kernelInitializer: "varianceScaling",
    },
    {
      type: "maxPooling2d",
      poolSize: [2, 2],
      strides: [2, 2],
    },
    {
      type: "flatten",
    },
    {
      type: "dense",
      kernelInitializer: "varianceScaling",
      activation: "softmax",
    },
  ];
  ```

**Defining Custom Layers**: You can define custom neural network architecture by defining your layers in the `options` that are passed to the `ml5.neuralNetwork` on initialization.

- A neural network with 3 layers
  ```js
  const options = {
    debug: true,
    task: "classification",
    layers: [
      {
        type: "dense",
        units: 16,
        activation: "relu",
      },
      {
        type: "dense",
        units: 16,
        activation: "sigmoid",
      },
      {
        type: "dense",
        activation: "sigmoid",
      },
    ],
  };
  const nn = ml5.neuralNetwork(options);
  ```

#### Arguments for `ml5.neuralNetwork(options)`

The options that can be specified are:

```js
const DEFAULTS = {
  inputs: [], // can also be a number
  outputs: [], // can also be a number
  dataUrl: null,
  modelUrl: null,
  layers: [], // custom layers
  task: null, // 'classification', 'regression', 'imageClassificaiton'
  debug: false, // determines whether or not to show the training visualization
  learningRate: 0.2,
  hiddenUnits: 16,
};
```

<!--
* **inputsOrOptions**: REQUIRED. An `options` object or a number specifying the number of inputs.
* **outputsOrCallback**: OPTIONAL. A callback to be called after your data is loaded as specified in the `options.dataUrl` or a `number` specifying the number of `outputs`.

-->

---

### Properties

| property             | description                                                                             | datatype   |
| :------------------- | --------------------------------------------------------------------------------------- | ---------- |
| `.callback`          | the callback to be called after data is loaded on initialization                        | `function` |
| `.options`           | the options for how the neuralNetwork should be configured on initialization            | `object`   |
| `.neuralNetwork`     | the `neuralNetwork` class where all of the tensorflow.js model operations are organized | `class`    |
| `.neuralNetworkData` | the `neuralNetworkData` class where all of the data handling operations are organized   | `class`    |
| `.neuralNetworkVis`  | the `neuralNetworkVis` class where all of the tf-vis operations are organized           | `class`    |
| `.data`              | The property that stores all of the training data after `.train()` is called            | `class`    |
| `.ready`             | set to true if the model is loaded and ready, false if it is not.                       | `boolean`  |

---

### Methods

#### Overview

| method                | description                                                                                                                            |
| :-------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `.addData()`          | adds data to the `neuralNetworkData.data.raw` array                                                                                    |
| `.normalizeData()`    | normalizes the data stored in `neuralNetworkData.data.raw` and stores the normalized values in the `neuralNetwork.data.training` array |
| `.train()`            | uses the data in the `neuralNetwork.data.training` array to train your model                                                           |
| `.predict()`          | for regression tasks, allows you to make a prediction based on an input array or JSON object.                                          |
| `.predictMultiple()`  | for regression tasks, allows you to make a prediction based on an input array of arrays or array of JSON objects.                      |
| `.classify()`         | for classification tasks, allows you to make a classification based on an input array or JSON object.                                  |
| `.classifyMultiple()` | for classification tasks, allows you to make classifications based on an input array of arrays or array of JSON objects.               |
| `.saveData()`         | allows you to save your data out from the `neuralNetworkData.data.raw` array                                                           |
| `.loadData()`         | allows you to load data previously saved from the `.saveData()` function                                                               |
| `.save()`             | allows you to save the trained model                                                                                                   |
| `.load()`             | allows you to load a trained model                                                                                                     |

---

#### .addData()

> If you are not uploading data using the `dataUrl` property of the options given to the constructor, then you can add data to a "blank" neural network class using the `.addData()` function.

```js
neuralNetwork.addData(xs, ys);
```

📥 **Inputs**

- **xs**: Required. Array | Object.
  - If an array is given, then the inputs must be ordered as specified in the constructor. If no labels are given in the constructor, then the order that your data are added here will set the order of how you will pass data to `.predict()` or `.classify()`.
  - If an object is given, then feed in key/value pairs.
  - if `task:imageClassification`: you can supply a HTMLImageElement or HTMLCanvasElement or a flat 1-D array of the pixel values such that the dimensions match with the defined image size in the `options.inputs: [IMAGE_WIDTH, IMAGE_HEIGHT, IMAGE_CHANNELS]`
- **ys**: Required. Array | Object.
  - If an array is given, then the inputs must be ordered as specified in the constructor.
  - If an object is given, then feed in key/value pairs.

📤 **Outputs**

- n/a: adds data to `neuralNetwork.data.data.raw`

---

---

#### .normalizeData()

> normalizes the data on a scale from 0 to 1. The data being normalized are part of the `NeuralNetworkData` class which can be accessed in: `neuralNetwork.data.data.raw`

```js
neuralNetwork.normalizeData();
```

📥 **Inputs**

- n/a

📤 **Outputs**

- n/a: normalizes the data in `neuralNetwork.data.data.raw` and adds `inputs` and `output` tensors to `neuralNetwork.data.data.tensor` as well as the `inputMin`, `inputMax`, `outputMin`, and `outputMax` as tensors. The `inputMin`, `inputMax`, `outputMin`, and `outputMax` are also added to `neuralNetwork.data.data` as Numbers.

---

---

#### .train()

> trains the model with the data loaded during the instantiation of the `NeuralNetwork` or the data added using `neuralNetwork.addData()`

```js
neuralNetwork.train(?optionsOrCallback, ?optionsOrWhileTraining, ?callback);
```

📥 **Inputs**

- **optionsOrCallback**: Optional.
  - If an object of options is given, then `optionsOrCallback` will be an object where you can specify the `batchSize` and `epochs`:
    ```js
    {
      batchSize: 24,
      epochs: 32,
    };
    ```
  - If a callback function is given here then this will be a callback that will be called when the training is finished.
    ```js
    function doneTraining() {
      console.log("done!");
    }
    ```
  - If a callback function is given here and a second callback function is given, `optionsOrCallback` will be a callback function that is called after each `epoch` of training, and the `optionsOrWhileTraining` callback function will be a callback function that is called when the training has completed:
    ```js
    function whileTraining(epoch, loss) {
      console.log(`epoch: ${epoch}, loss:${loss}`);
    }
    function doneTraining() {
      console.log("done!");
    }
    neuralNetwork.train(whileTraining, doneTraining);
    ```
- **optionsOrWhileTraining**: Optional.
  - If an object of options is given as the first parameter, then `optionsOrWhileTraining` will be a callback function that is fired after the training as finished.
  - If a callback function is given as the first parameter to handle the `whileTraining`, then `optionsOrWhileTraining` will be a callback function that is fired after the training as finished.
- **callback**: Optional. Function.

  - If an object of options is given as the first parameter and a callback function is given as a second parameter, then this `callback` parameter will be a callback function that is fired after the training as finished.

  ```js
  const trainingOptions = {
    batchSize: 32,
    epochs: 12,
  };
  function whileTraining(epoch, loss) {
    console.log(`epoch: ${epoch}, loss:${loss}`);
  }
  function doneTraining() {
    console.log("done!");
  }
  neuralNetwork.train(trainingOptions, whileTraining, doneTraining);
  ```

📤 **Outputs**

- n/a: Here, `neuralNetwork.model` is created and the model is trained.

---

---

#### .predict()

> Given an input, will return an array of predictions.

```js
neuralNetwork.predict(inputs, callback);
```

📥 **Inputs**

- **inputs**: Required. Array | Object.
  - If an array is given, then the input values should match the order that the data are specified in the `inputs` of the constructor options.
  - If an object is given, then the input values should be given as a key/value pair. The keys must match the keys given in the inputs of the constructor options and/or the keys added when the data were added in `.addData()`.
- **callback**: Required. Function. A function to handle the results of `.predict()`.

📤 **Outputs**

- **Array**: Returns an array of objects. Each object contains `{value, label}`.

---

---

#### .predictMultiple()

> Given an input, will return an array of arrays of predictions.

```js
neuralNetwork.predictMultiple(inputs, callback);
```

📥 **Inputs**

- **inputs**: Required. Array of arrays | Array of objects.
  - If an array of arrays is given, then the input values of each child array should match the order that the data are specified in the `inputs` of the constructor options.
  - If an array of objects is given, then the input values of each child object should be given as a key/value pair. The keys must match the keys given in the inputs of the constructor options and/or the keys added when the data were added in `.addData()`.
- **callback**: Required. Function. A function to handle the results of `.predictMultiple()`.

📤 **Outputs**

- **Array**: Returns an array of arrays. Each child array contains objects. Each object contains `{value, label}`.

---

---

#### .classify()

> Given an input, will return an array of classifications.

```js
neuralNetwork.classify(inputs, callback);
```

📥 **Inputs**

- **inputs**: Required. Array | Object.
  - If an array is given, then the input values should match the order that the data are specified in the `inputs` of the constructor options.
  - If an object is given, then the input values should be given as a key/value pair. The keys must match the keys given in the inputs of the constructor options and/or the keys added when the data were added in `.addData()`.
- **callback**: Required. Function. A function to handle the results of `.classify()`.

📤 **Outputs**

- **Array**: Returns an array of objects. Each object contains `{label, confidence}`.

---

---

#### .classifyMultiple()

> Given an input, will return an array of arrays of classifications.

```js
neuralNetwork.classifyMultiple(inputs, callback);
```

📥 **Inputs**

- **inputs**: Required. Array of arrays | Array of objects.
  - If an array of arrays is given, then the input values of each child array should match the order that the data are specified in the `inputs` of the constructor options.
  - If an array of objects is given, then the input values of each child object should be given as a key/value pair. The keys must match the keys given in the inputs of the constructor options and/or the keys added when the data were added in `.addData()`.
- **callback**: Required. Function. A function to handle the results of `.classifyMultiple()`.

📤 **Outputs**

- **Array**: Returns an array of arrays. Each child array contains objects. Each object contains `{label, confidence}`.

---

---

#### .saveData()

> Saves the data that has been added

```js
neuralNetwork.saveData(?outputName, ?callback);
```

📥 **Inputs**

- **outputName**: Optional. String. An output name you'd like your data to be called. If no input is given, then the name will be `data_YYYY-MM-DD_mm-hh`.
- **callback**: Optional. function. A callback that is called after the data has been saved.

📤 **Outputs**

- n/a: downloads the data to a `.json` file in your `downloads` folder.

---

---

#### .loadData()

> loads the data to `neuralNetwork.data.data.raw`

```js
neuralnetwork.loadData(filesOrPath, ?callback);
```

📥 **Inputs**

- **filesOrPath**: REQUIRED. String | InputFiles. A string path to a `.json` data object or InputFiles from html input `type="file"`. Must be structured for example as: `{"data": [ { xs:{input0:1, input1:2}, ys:{output0:"a"},  ...]}`
- **callback**: Optional. function. A callback that is called after the data has been loaded.

📤 **Outputs**

- n/a: set `neuralNetwork.data.data.raw` to the array specified in the `"data"` property of the incoming `.json` file.

---

---

#### .save()

> Saves the trained model

```js
neuralNetwork.save(?outputName, ?callback);
```

📥 **Inputs**

- **outputName**: Optional. String. An output name you'd like your model to be called. If no input is given, then the name will be `model`.
- **callback**: Optional. function. A callback that is called after the model has been saved.

📤 **Outputs**

- n/a: downloads the model to a `.json` file and a `model.weights.bin` binary file in your `downloads` folder.

---

---

#### .load()

> Loads a pre-trained model

```js
neuralNetwork.load(filesOrPath, ?callback);
```

📥 **Inputs**

- **filesOrPath**: REQUIRED. String | InputFiles.
  - If a string path to the `model.json` data object is given, then the `model.json`, `model_meta.json` file and its accompanying `model.weights.bin` file will be loaded. Note that the names must match.
  - If InputFiles from html input `type="file"`. Then make sure to select ALL THREE of the `model.json`, `model_meta.json` and the `model.weights.bin` file together to upload otherwise the load will throw an error.
  - Method 1: using a json object. In this case, the paths to the specific files are set directly.
    ```js
    const modelInfo = {
      model: "path/to/model.json",
      metadata: "path/to/model_meta.json",
      weights: "path/to/model.weights.bin",
    };
    neuralNetwork.load(modelInfo, modelLoadedCallback);
    ```
  - Method 2: specifying only the path to th model.json. In this case, the `model_meta.json` and the `model.weights.bin` are assumed to be in the same directory, named exactly like `model_meta.json` and `model.weights.bin`.
    ```js
    neuralNetwork.load("path/to/model.json", modelLoadedCallback);
    ```
  - Method 3: using the `<input type="file" multiple>`
- **callback**: Optional. function. A callback that is called after the model has been loaded.

📤 **Outputs**

- n/a: loads the model to `neuralNetwork.model`

---

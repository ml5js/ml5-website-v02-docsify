# NeuralNetwork

<center>
  <img class="header-img" src="assets/header-neural-network.png" alt="NeuralNetwork Header Image" >
  <p class="img-credit"> Image Credit: <a href="https://thenounproject.com/creator/lutfidiarycoc/" target="_blank" title="LUTFI GANI AL ACHMAD">LUTFI GANI AL ACHMAD</a> | <a href='https://forms.gle/5EpwYabG8hLn4p926' target="contribute-form">Contribute ♥️</a> </p>
</center>

## Description

The ml5.js Neural Network allows you to create and train your own machine learning models in the browser. You can use the neural network to perform classification tasks, where the model predicts a label based on the input data, or regression tasks, where the model predicts a value based on the input data. 

The neural network is a type of machine learning model that is inspired by the human brain. It is made up of layers of neurons that are connected to each other. Each neuron takes in input data, processes it, and passes the output to the next layer of neurons. The neural network learns by adjusting the weights of the connections between neurons to minimize the error in its predictions.

It provides folowing functionalities:
- **Classification**: The neural network can be used to classify input data into different categories. For example, you can train a neural network to classify images of cats and dogs.
- **Regression**: The neural network can be used to predict a continuous value based on input data. For example, you can train a neural network to predict the price of a house based on its size and location.

?> If you are not familiar with the concept of **classification**, **regression**, **neuron**, **neural networks**, and **weights**, you can learn more about them with [ml5 glossary](/learn/ml5-glossary).

## Quick Start
Run and explore a pre-built example! [This Neural Network example](https://editor.p5js.org/ml5/sketches/eGHBdmCLe) trains a model to classify the color of an RGB value.

</br>

[DEMO](iframes/neural-network ":include :type=iframe width=100% height=550px")

## Examples
- [NeuralNetwork Color Classifier](https://editor.p5js.org/ml5/sketches/eGHBdmCLe): Train a model to classify the color of an RGB value (red-ish, green-ish, blue-ish).
- [NeuralNetwork Mouse Gesture](https://editor.p5js.org/ml5/sketches/FdXAgrA3N): Train a model to recognize mouse gestures (up, down, left, right).
- [NeuralNetwork Load Model](https://editor.p5js.org/ml5/sketches/U-aljtx7x): Load a pre-trained model and use it for classification.
- [NeuralNetwork Train and Save](https://editor.p5js.org/ml5/sketches/rR51vvi-u): Train a model and save it for later use.

## Step-by-Step Guide
This step-by-step guide uses a p5.js sketch running on the [p5.js web editor](https://editor.p5js.org/). To follow along, start by creating an empty project in the editor.

### Set up ml5.js

Import the ml5.js library in your `index.html` file by copying the following `<script>` tag.

```html
<script src="https://unpkg.com/ml5@1/dist/ml5.js"></script>
```

?> If you are not familiar with how to import the ml5.js library and need more detailed guidance, please check out our [Getting Started](/?id=set-up-ml5js) tutorial.

### Initialize the model
First of all, create a variable `classifier` to store the neural network model.

```javascript
let classifier;
```

Let's then set up the backend to `webgl` to allow this example to work across all browsers in your `sketch.js` file.

```javascript
function setup() {
  createCanvas(640, 240);

  // Set the backend to 'webgl'
  ml5.setBackend("webgl");
```

Create a variable `options` to configure the model.

```javascript
  // Set the options for the neural network
  let options = {
    task: "classification",
    debug: true,
  };
```

Initialize the neural network model with the options.

```javascript
  // Initialize the neural network
  classifier = ml5.neuralNetwork(options);
}
```
?> If you would like to configure the model with greater flexibility (such as defining inputs and outputs, loading external data, or creating custom layers), refer to the [Methods](/reference/neural-network?id=methods) section for more details.

### Prepare training dataset
Different from other pre-trained ml5.js models, the ml5.js Neural Network allows you to train a custom model with your own data. You can create your own data or load data from a file. In this example, we will create our own data. In your `sketch.js` file, define an array of data that contains RGB values and their corresponding color labels.

```javascript
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
```

The model examines the RGB values (features) to understand which patterns correspond to specific labels. By learning these patterns, the model can accurately predict the label for new, unseen data based on the features it has been trained on.

?> If you would like to load data from a file, refer to the [Methods](/reference/neural-network?id=methods) section for more details.

Now, we will add the data to the neural network model. We iterate through the data array and store each sample to a variable `item`.

```javascript
function setup() {
  ...
  classifier = ml5.neuralNetwork(options);

  // Add data to the neural network
  for (let i = 0; i < data.length; i++) {
    let item = data[i];
```
We extract the RGB values of the sample, and generate three features: `r`, `g`, and `b`.

```javascript
    let inputs = [item.r, item.g, item.b];
```

We also extract the color label of the sample and store it as the target output that model will predict.

```javascript
    let outputs = [item.color];
```

Now, we can add the sample to the neural network model.

```javascript
    classifier.addData(inputs, outputs);
```

Lastly, normalize the data to ensure that the features are on a similar scale.

```javascript
  classifier.normalizeData();
}
```
?> If you are not familiar with the concept of **normalization**, you can learn more about it with [ml5 glossary](/learn/ml5-glossary?id=normalization).

### Train the model
Now, we can train the neural network model with the training data. Define the training options, such as the number of epochs and batch size.

```javascript
function setup() {
  ...
  classifier.normalizeData();

  // Train the neural network
  const trainingOptions = {
    epochs: 32,
    batchSize: 12,
  };
```

Train the model with `trainingOptions` and a callback function that is called when the training is finished.

```javascript
  classifier.train(trainingOptions, finishedTraining);
}
```

?> If you would like to configure the training process with greater flexibility (such as adding a callback function that is called after each epoch of training or when the training is finished), refer to the [Methods](/reference/neural-network?id=methods) section for more details.

Now, define the callback function `finishedTraining` that will be called when the training is finished. In our case, we will call the `classify()` function to make a classification on the test data once the model is trained.

```javascript
function finishedTraining() {
  classify();
}
```

### Prepare test data
We can start by creating three variables to store the features `r`, `g`, and `b` of the test data.

```javascript
let r = 255;
let g = 0;
let b = 0;
```

?> Note in this example we only have one test sample, but you can have multiple test samples (e.g., an array of color samples) to classify. Please refer to the [Methods](/reference/neural-network?id=methods) section for more details.

Let's also create a `label` variable to store the predicted color label, and set it to "training" initially. This variable will be updated with the predicted label after the classification.

```javascript
let label = "training";
```

If we keep the RGB values of the test data fixed as initially set, the model will always predict the color label "red-ish," since the test data is always {r: 255, g: 0, b: 0}. Let's add some interactivity by allowing users to change the RGB values of the test data using sliders.

We can create three sliders to control the values of `r`, `g`, and `b`.

```javascript
let rSlider, gSlider, bSlider;
```

In the `setup()` function, create the sliders and set their initial values. The `createSlider()` function creates a slider with a range of values from 0 to 255 and an initial value of 255 for the red slider, 0 for the green slider, and 0 for the blue slider.

```javascript
function setup() {
  ...
  ml5.setBackend("webgl");

  rSlider = createSlider(0, 255, 255).position(10, 20);
  gSlider = createSlider(0, 255, 0).position(10, 40);
  bSlider = createSlider(0, 255, 0).position(10, 60);

  ...
}
```

We would like to update the RGB values of the test data based on the slider values. In the `draw()` function, update the `r`, `g`, and `b` variables with the slider values.

```javascript
function draw() {
  r = rSlider.value();
  g = gSlider.value();
  b = bSlider.value();
```

And update the background color of the canvas with the new RGB values.

```javascript
  background(r, g, b);
}
```

### Make a classification on the test data
Now, we can make a classification on the test data using the `classify()` function. Remember we will call this function after the model is trained.

```javascript
function finishedTraining() {
  classify();
}
```

Let's define the `classify()` function that will make a classification on the test data. The `classify()` function takes the input data `[r, g, b]` and a callback function `handleResults` that will be called when the classification is finished.

```javascript
function classify() {
  const input = [r, g, b];
  classifier.classify(input, handleResults);
}
```

The `handleResults` function will be called after the classification is finished. It takes two arguments: `results` and `error`. If there is an error, we will log the error to the console. Otherwise, we will update the `label` variable with the predicted color label and call the `classify()` function again to make a classification on the new test data.

```javascript
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

### Display the classification result
We know that the `label` variable stores the predicted color label. Let's display the predicted color label on the canvas. In the `draw()` function, add the following code to display the `label` in the center of the canvas.

```javascript
function draw() {
  ...
  background(r, g, b);

  textAlign(CENTER, CENTER);
  textSize(64);
  text(label, width / 2, height / 2);
}
```

### Run your sketch
Now you can run your sketch and interact with the sliders to change the RGB values of the test data. The canvas will display the predicted color label based on the RGB values you set. You can also find the [complete code](https://editor.p5js.org/ml5/sketches/eGHBdmCLe) in the p5.js web editor.

?> If you have any questions or spot something unclear in this step-by-step code guide, we'd love to hear from you! Join us on [Discord](https://discord.com/invite/3CVauZMSt7) and let us know how we can make it better.

## Methods

### Overview

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
| `.mutate()`           | allows you to mutate the weights of a model                                                                                            |
| `.crossover()`        | allows you to create a new neural network with crossover                                                                               |

### ml5.neuralNetwork()

This method initializes the `neuralNetwork` object.

```javascript
const nn = ml5.neuralNetwork(options, callback);
```

**Parameters:**

- **options**: Required. An object to configure the neural network. The available options are:
  ```javascript
  {
    inputs: [], // can also be a number
    outputs: [], // can also be a number
    dataUrl: null,
    modelUrl: null,
    layers: [], // custom layers
    task: null, // 'classification', 'regression', 'imageClassification'
    debug: false, // determines whether or not to show the training visualization
    learningRate: 0.2,
    hiddenUnits: 16,
  }
  ```
  - _inputs_ - Optional
    - Array | Number: Input labels as an array or number of inputs. Default: [].
  - _outputs_ - Optional
    - Array | Number: Output labels as an array or number of outputs. Default: [].
  - _dataUrl_ - Optional
    - String: The URL to a CSV or JSON file containing the data.
  - _modelUrl_ - Optional
    - String: The URL to a pre-trained model.
  - _layers_ - Optional
    - Array: Custom layers for the neural network.
  - _task_ - Required
    - String: The type of task: 'classification', 'regression', 'imageClassification'.
  - _debug_ - Optional
    - Boolean: Show the training visualization. Default: false.
  - _learningRate_ - Optional
    - Number: The learning rate for training. Default: 0.2.
  - _hiddenUnits_ - Optional
    - Number: Number of hidden units in the default layer. Default: 16.

- **callback(nn)**: Optional. A function to run once the model has been initialized.

**Returns:** 

- **Object**: The neuralNetwork object. This object contains methods to add data, normalize data, train the model, and make predictions.

---

### nn.addData()

This method adds data to the neural network.

```javascript
nn.addData(xs, ys);
```

**Parameters:**

- **xs**: Required. Array | Object. Input data.
  - If an array is given, the inputs must be ordered as specified in the constructor. If no labels are given in the constructor, then the order that your data are added here will set the order of how you will pass data to `.predict()` or `.classify()`.
  - If an object is given, then feed in key/value pairs.
  - If an object is given, provide key/value pairs.
  - If task is `imageClassification`, provide an HTMLImageElement, HTMLCanvasElement, or a flat 1-D array of pixel values.
- **ys**: Required. Array | Object. Output data.
  - If an array is given, the outputs must be ordered as specified in the constructor.
  - If an object is given, provide key/value pairs.

**Returns:**

- n/a: Adds data to `neuralNetworkData.data.raw`.

---

### nn.normalizeData()

This method normalizes the data on a scale from 0 to 1.

```javascript
nn.normalizeData();
```

**Parameters:**

- n/a

**Returns:**

- n/a: normalizes the data in `neuralNetworkData.data.raw` and adds `inputs` and `output` tensors to `neuralNetworkData.data.tensor` as well as the `inputMin`, `inputMax`, `outputMin`, and `outputMax` as tensors. The `inputMin`, `inputMax`, `outputMin`, and `outputMax` are also added to `neuralNetworkData.data` as Numbers.

---

### nn.train()

This method trains the model with the data loaded during the instantiation or added using `.addData()`.

```javascript
nn.train(?optionsOrCallback, ?optionsOrWhileTraining, ?callback);
```

**Parameters:**

- **optionsOrCallback**: Optional.
  - If an object of options is given, specify `batchSize` and `epochs`:
    ```javascript
    {
      batchSize: 24,
      epochs: 32,
    }
    ```
  - If a callback function is given, it will be called when the training is finished.
- **optionsOrWhileTraining**: Optional.
  - If an object of options is given as the first parameter, specify a callback function to be called when the training is finished.
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

**Returns:**

- n/a: Creates and trains the `nn.model`.

---

### nn.predict()

This method returns an array of predictions for the given input.

```javascript
nn.predict(inputs, callback);
```

**Parameters:**

- **inputs**: Required. Array | Object. Input values.
  - If an array is given, match the order specified in the constructor options.
  - If an object is given, provide key/value pairs matching the keys specified in the constructor options.
- **callback(results)**: Required. Function. A function to handle the results of `.predict()`.

**Returns:**

- **Array**: An array of objects, each containing `{value, label}`.

---

### nn.predictMultiple()

This method returns an array of arrays of predictions for the given input.

```javascript
nn.predictMultiple(inputs, callback);
```

**Parameters:**

- **inputs**: Required. Array of arrays | Array of objects.
  - If an array of arrays is given, then the input values of each child array should match the order that the data are specified in the `inputs` of the constructor options.
  - If an array of objects is given, then the input values of each child object should be given as a key/value pair. The keys must match the keys given in the inputs of the constructor options and/or the keys added when the data were added in `.addData()`.
- **callback**: Required. Function. A function to handle the results of `.classifyMultiple()`.

**Returns:**

- **Array**: An array of arrays, each containing objects with `{value, label}`.

---

### nn.classify()

This method returns an array of classifications for the given input.

```javascript
nn.classify(inputs, callback);
```

**Parameters:**

- **inputs**: Required. Array | Object. Input values.
  - If an array is given, match the order specified in the constructor options.
  - If an object is given, provide key/value pairs matching the keys specified in the constructor options.
- **callback(results)**: Required. Function. A function to handle the results of `.classify()`.

**Returns:**

- **Array**: An array of objects, each containing `{label, confidence}`.

---

### nn.classifyMultiple()

This method returns an array of arrays of classifications for the given input.

```javascript
nn.classifyMultiple(inputs, callback);
```

**Parameters:**

- **inputs**: Required. Array of arrays | Array of objects. Input values.
  - If an array of arrays is given, match the order specified in the constructor options.
  - If an array of objects is given, provide key/value pairs matching the keys specified in the constructor options.
- **callback(results)**: Required. Function. A function to handle the results of `.classifyMultiple()`.

**Returns:**

- **Array**: An array of arrays, each containing objects with `{label, confidence}`.

---

### nn.saveData()

This method saves the added data to a JSON file.

```javascript
nn.saveData(outputName, callback);
```

**Parameters:**

- **outputName**: Optional. String. The name of the saved file. Default is `data_YYYY-MM-DD_mm-hh`.
- **callback**: Optional. Function. A callback function to be called after the data has been saved.

**Returns:**

- n/a: Downloads the data to a `.json` file.

---

### nn.loadData()

This method loads data to `neuralNetworkData.data.raw`.

```javascript
nn.loadData(filesOrPath, callback);
```

**Parameters:**

- **filesOrPath**: REQUIRED. String | InputFiles. A string path to a `.json` data object or InputFiles from html input `type="file"`. Must be structured for example as: `{"data": [ { xs:{input0:1, input1:2}, ys:{output0:"a"},  ...]}`
- **callback**: Optional. function. A callback that is called after the data has been loaded.

**Returns:**

- n/a: Sets `neuralNetworkData.data.raw` to the array specified in the incoming JSON file.

---

### nn.save()

This method saves the trained model.

```javascript
nn.save(outputName, callback);
```

**Parameters:**

- **outputName**: Optional. String. The name of the saved file. Default is `model`.
- **callback**: Optional. Function. A callback function to be called after the model has been saved.

**Returns:**

- n/a: Downloads the model to a `.json` file and a `model.weights.bin` binary file.

---

### nn.load()

This method loads a pre-trained model.

```javascript
nn.load(filesOrPath, callback);
```

**Parameters:**

- **filesOrPath**: Required. String | InputFiles. The URL to the `model.json` file, or InputFiles from an HTML input element.
  - If a string path to the `model.json` data object is given, then the `model.json`, `model_meta.json` file and its accompanying `model.weights.bin` file will be loaded. Note that the names must match.
  - If InputFiles from html input `type="file"`. Then make sure to select ALL THREE of the `model.json`, `model_meta.json` and the `model.weights.bin` file together to upload otherwise the load will throw an error.
  - Method 1: Using a JSON object with paths to specific files:
    ```javascript
    const modelInfo = {
      model: "path/to/model.json",
      metadata: "path/to/model_meta.json",
      weights: "path/to/model.weights.bin",
    };
    nn.load(modelInfo, modelLoadedCallback);
    ```
  - Method 2: Specifying only the path to the `model.json`. Assumes the `model_meta.json` and `model.weights.bin` are in the same directory:
    ```javascript
    nn.load("path/to/model.json", modelLoadedCallback);
    ```
  - Method 3: Using `<input type="file" multiple>`:
- **callback**: Optional. Function. A callback function to be called after the model has been loaded.

**Returns:**

- n/a: Loads the model to `nn.model`.

---

### nn.mutate()

This method mutates the weights of a model.

```javascript
nn.mutate(rate, mutateFunction);
```

**Parameters:**

- **rate**: Optional. Number. The rate of mutation. Default is `0.1`.
- **mutateFunction**: Optional. Function. A function to mutate the weights. Default is a random Gaussian function.

**Returns:**

- n/a: Mutates the weights of the model.

?> This method is created to build neuroevolution systems. If you are interested in neuroevolution, you can learn more about it with [Nature of Code Chapter 11](https://natureofcode.com/neuroevolution/).

---

### nn.crossover()

This method creates a new neural network with crossover.

```javascript
nn.crossover(other);
```

**Parameters:**

- **other**: Required. Object. Another neural network object.

**Returns:**

- **Object**: A new neural network object with the weights of the two models crossed over.

?> This method is created to build neuroevolution systems. If you are interested in neuroevolution, you can learn more about it with [Nature of Code Chapter 11](https://natureofcode.com/neuroevolution/).



  
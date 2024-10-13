# Sentiment

<center>
  <img class="header-img" src="assets/header-sentiment.png" alt="Sentiment Header Image" >
  <p class="img-credit"> Image Credit: <a href="https://thenounproject.com/creator/kartini7/" target="_blank" title="kartini 1">kartini 1</a> | <a href='mailto:info@ml5js.org'>Contribute ♥️</a> </p>
</center>

## Description

Sentiment is a model trained to predict the sentiment of any given text. For example, it can predict how positive or negative a review is with a value between 0 ("negative") and 1 ("positive").

The model is trained using IMDB reviews that have been truncated to a maximum of 200 words, and only the 20000 most used words in the reviews are used.

It provides the following functionalities:

- **Sentiment Analysis**: The model can predict the sentiment of a given text.

## Quick Start

Run and explore a pre-built example! [This Sentiment example](https://editor.p5js.org/ml5/sketches/hopIvsCGL) predicts the sentiment of the given text.

</br>

[DEMO](iframes/sentiment ":include :type=iframe width=100% height=550px")

## Examples

- [Sentiment Analysis](https://editor.p5js.org/ml5/sketches/hopIvsCGL): Predict the sentiment of the given text.

## Step-by-Step Guide

Now, let's together build the [Sentiment Analysis example](https://editor.p5js.org/ml5/sketches/hopIvsCGL) from scratch, and in the process, learn how to use the Sentiment model.

### Create a new project

To follow along, start by creating an empty project in the [p5.js web editor](https://editor.p5js.org/).

### Set up ml5.js

Import the ml5.js library in your `index.html` file.

```html
<script src="https://unpkg.com/ml5@1/dist/ml5.js"></script>
```

?> If you are not familiar with how to import the ml5.js library and need more detailed guidance, please check out our [Getting Started](/?id=set-up-ml5js) page.

### Load model

Let's open the `sketch.js` file and define a variable to store the Sentiment model.

```javascript
let sentiment;
```

Now, create a `preload` function and load the Sentiment model by calling the `ml5.sentiment(model, ?callback)` method. Using the `preload` function lets us make sure that the model is loaded correctly before the `setup` and `draw` functions are called.

Currently, the Sentiment model only supports the 'movieReviews' model, and we may support more models in the future.

```javascript
function preload() {
  // Initialize the sentiment analysis model
  sentiment = ml5.sentiment("MovieReviews");
}
```

Since we are not going to draw anything on the canvas and will instead update the HTML elements directly to interact with the model, we can remove the canvas within the `setup` function.

```javascript
function setup() {
  noCanvas();
}
```

### Set up UI for user interaction

To give the user some guidance on how to interact with the model, we can add a prompt message. Open the `index.html` file and add the prompt message within the `<body>` tag.

```html
<body>
  <h1>Sentiment Analysis Demo</h1>
  <p>
    This example uses model trained on movie reviews. This model scores the
    sentiment of text with a value between 0 ("negative") and 1 ("positive").
    The movie reviews were truncated to a maximum of 200 words and only the
    20,000 most common words in the reviews are used.
    <br />
    Press 'Enter' on your keyboard or 'Submit' to see score!
  </p>

  <script src="sketch.js"></script>
</body>
```

To allow the user to interact with the model, we need an input field for the user to provide the text to predict the sentiment of, a button to submit the text, and a paragraph element to display the sentiment prediction result. Let's define the variables to store these elements in the `sketch.js` file.

```javascript
let inputBox;
let submitBtn;
let sentimentResult;
```

Let's tackle these one by one! We can start with the input field to receive the text input from the user. In `setup`, use the `createInput` function to create an input field in the DOM, and set the default text to "Today is the happiest day and is full of rainbows!".

```javascript
function setup() {
  ...
  // Set up the DOM elements
  inputBox = createInput("Today is the happiest day and is full of rainbows!");
```

Set the size of the input box to 75 pixels.

```javascript
inputBox.attribute("size", "75");
```

Now, we can create a button that the user can click to predict the sentiment of the text. We can use the `createButton` function to create a button in the DOM, and set the button text to "submit".

```javascript
submitBtn = createButton("submit");
```

Lastly, we can add a paragraph element to display the sentiment prediction result.

```javascript
  sentimentResult = createP("Sentiment confidence:");
}
```

### Predict sentiment with the model

Now that we have set up the UI, we can predict the sentiment of the text input by the user. Let's define a function `getSentiment` that will be called when the user clicks the submit button or presses the enter key.

It will get the values from the user input, and store it in a variable `text`.

```javascript
function getSentiment() {
  // Use the value of the input box
  let text = inputBox.value();
```

Make the prediction using the `predict` method of the `sentiment` object. Here, we pass two parameters: the input text and a customized callback function `gotResult`.

```javascript
  // Start making the prediction
  sentiment.predict(text, gotResult);
}
```

The `gotResult` function is a callback function that will be called when the `predict` method predicts the text's sentiment. Once the sentiment is predicted, the output `prediction` will be passed to `gotResult`, and then display the sentiment confidence in the paragraph element `sentimentResult`.

```javascript
function gotResult(prediction) {
  // Display sentiment result via the DOM
  sentimentResult.html("Sentiment confidence: " + prediction.confidence);
}
```

The only thing left is to call the `getSentiment` function when the user clicks the submit button or presses the 'enter' key.

To do this, let's first go back to the `setup` function. We can use the `mousePressed` function of the `submitBtn` object, which will call a function when the mouse is pressed over the element.

```javascript
function setup() {
  ...
  sentimentResult = createP("Sentiment confidence:");

  // Start predicting when the submit button is pressed
  submitBtn.mousePressed(getSentiment);
}
```

Now, we'll create a `keyPressed` function and call the `getSentiment` function when the user presses the 'enter' key.

```javascript
// Start predicting when the 'Enter' key is pressed
function keyPressed() {
  if (keyCode == ENTER) {
    getSentiment();
  }
}
```

### Run your sketch

That's it! You have successfully built a Sentiment Analysis model that predicts the sentiment of the given text. Press the <img class="inline-img" src="assets/facemesh-arrow-forward.png" alt="run button icon" aria-hidden="true"> `run` button to see the code in action. You can also find the [complete code](https://editor.p5js.org/ml5/sketches/hopIvsCGL) in the p5.js web editor.

?> If you have any questions or spot something unclear in this step-by-step code guide, we'd love to hear from you! Join us on [Discord](https://discord.com/invite/3CVauZMSt7) and let us know how we can make it better.

## Properties

### sentiment.ready

- **Description**
  - Boolean value that specifies if the model has loaded.
- **Type**
  - Boolean

---

### sentiment.model

- **Description**
  - The TensorFlow.js model used for sentiment analysis.
- **Type**
  - tf.LayersModel

---

### sentiment.indexFrom

- **Description**
  - The starting index for words in the model's vocabulary.
- **Type**
  - Number

---

### sentiment.maxLen

- **Description**
  - The maximum length of sequences that the model can process.
- **Type**
  - Number

---

### sentiment.wordIndex

- **Description**
  - An object mapping words to their corresponding indices in the model's vocabulary.
- **Type**
  - Object

---

### sentiment.vocabularySize

- **Description**
  - The size of the vocabulary that the model was trained on.
- **Type**
  - Number


## Methods

### ml5.sentiment()

This method is used to load the sentiment model and store it in a variable. The ? means the argument is optional!

```js
let sentiment = ml5.sentiment(model, ?callback);
```

#### Parameters

- **model**: REQUIRED. Defaults to 'movieReviews'. You can also use a path to a `manifest.json` file via a relative or absolute path.
- **callback(sentiment, error)**: Optional. A callback function that is called once the model has loaded. If no callback is provided, it will return a promise that will be resolved once the model has loaded.

---

### sentiment.predict()

This method is used to predict the sentiment of a given text.

```js
sentiment.predict(text);
```

**Parameters:**

- **text**: Required. 
  - String: A string of text to predict. 

**Return:**

- **Object**: Scores the sentiment of given text with a value between 0 ("negative") and 1 ("positive"). See below for an example output:
  ```javascript
  {
    confidence: 0.9999948740005493;
  }
  ```

# Sentiment

<center>
    <img style="display:block;max-height:20rem" alt="sentiment" src="assets/header-sentiment.png">
    <p class="img-credit"> Image Credit: <a href="">Name</a> | <a href="">Contribute ♥️</a> </p>
</center>

## Description

Sentiment is a model trained to predict the sentiment of any given text. For example, it can predict how positive or negative a review is with a value between 0 ("negative") and 1 ("positive").

The model is trained using IMDB reviews that have been truncated to a maximum of 200 words, only the 20000 most used words in the reviews are used.

### Key Features

- **Sentiment Analysis**: The model can predict the sentiment of a given text.

### Output Example

The output is a value between 0 and 1, where 0 is negative and 1 is positive.

```javascript
{
  score: 0.9999948740005493;
}
```

## Getting Started

Integrating Sentiment into your ml5.js projects is straightforward. Our documentation and user-friendly API will help you make the most of this model!

### Demo

[DEMO](iframes/sentiment ":include :type=iframe width=100% height=550px")

### Quick Start

Before you start, let's create an empty project in the [p5 web editor](https://editor.p5js.org/).

First of all, copy and paste the following code into your **index.html** file. If you are not familiar with the p5 web editor interface, you can find a guide on how to find your **index.html** file [here](/?id=try-ml5js-online-1).

```html
<script src="https://unpkg.com/ml5@alpha/dist/ml5.js"></script>
```

Next, copy and paste the following code into your **sketch.js** file.

```javascript
let sentiment;
let statusEl; // to display model loading status
let submitBtn;
let inputBox;
let sentimentResult;

function setup() {
  noCanvas();
  // initialize sentiment analysis model
  sentiment = ml5.sentiment("movieReviews", modelReady);

  // setup the html dom elements
  statusEl = createP("Loading Model...");
  inputBox = createInput("Today is the happiest day and is full of rainbows!");
  inputBox.attribute("size", "75");
  submitBtn = createButton("submit");
  sentimentResult = createP("Sentiment score:");

  // predicting the sentiment when submit button is pressed
  submitBtn.mousePressed(getSentiment);
}

function getSentiment() {
  // get the values from the input
  let text = inputBox.value();

  // make the prediction
  let prediction = sentiment.predict(text);

  // display sentiment result on html page
  sentimentResult.html("Sentiment score: " + prediction.score);
}

// a callback function that is called when model is ready
function modelReady() {
  statusEl.html("Model loaded");
}

// predicting the sentiment when 'Enter' key is pressed
function keyPressed() {
  if (keyCode == ENTER) {
    getSentiment();
  }
}
```

Alternatively, you can open [this example code](https://github.com/ml5js/ml5-next-gen/tree/main/examples/Sentiment) and try it yourself on p5.js web editor!

### Additional Examples

(To be added)

## Usage

### Initialize

```js
const sentiment = ml5.sentiment(model, ?callback);
```

#### Parameters

- **model**: REQUIRED. Defaults to 'moviereviews'. You can also use a path to a `manifest.json` file via a relative or absolute path.
- **callback**: OPTIONAL. A callback function that is called once the model has loaded. If no callback is provided, it will return a promise that will be resolved once the model has loaded.

### Properties

---

#### .ready

> Boolean value that specifies if the model has loaded.

---

---

#### .model

> The model being used.

---

### Methods

---

#### .predict()

> Given a number, will make magicSparkles

```js
sentiment.predict(text);
```

📥 **Inputs**

- **text**: Required. String. A string of text to predict

📤 **Outputs**

- **Object**: Scores the sentiment of given text with a value between 0 ("negative") and 1 ("positive").

---

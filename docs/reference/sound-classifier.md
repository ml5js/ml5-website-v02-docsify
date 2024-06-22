# SoundClassifier

<center>
  <img class="header-img" src="assets/header-sound-classifier.png" alt="SoundClassifier Header Image" >
  <p class="img-credit"> Image Credit: <a href="https://thenounproject.com/creator/kantortegalsari/" target="_blank" title="Kantor Tegalsari">Kantor Tegalsari</a> | <a href='mailto:info@ml5js.org'>Contribute ♥️</a> </p>
</center>

## Description

SoundClassifier is a machine-learning model that allows you to classify audio.

It provides the following functionalities:

- **Sound identification**: Detect whether a certain noise (e.g., clapping) was made or a certain word (e.g., up, down) was said.
- **Custom models**: Flexibility to use [TensorFlow's SpeechCommands18w](https://github.com/tensorflow/tfjs-models/tree/master/speech-commands) model or your own custom pre-trained speech commands.

The SpeechCommands18w model can recognize 18 sounds which include the ten digits from "zero" to "nine", "up", "down", "left", "right", "stop", "go", "yes", and "no". It also includes the categories "background noise" and "unknown".

If opting to train your own model, try [Google's Teachable Machine](https://teachablemachine.withgoogle.com).

## Quick Start

Run and explore a pre-built example! [This SoundClassifier example](https://github.com/ml5js/ml5-next-gen/tree/main/examples/soundClassifier-speech-command) recognizes speech commands using SpeechCommands18w.

</br>

[DEMO](iframes/sound-classifier ":include :type=iframe width=100% height=550px")

## Examples

- [SoundClassifier Speech Commands](https://github.com/ml5js/ml5-next-gen/tree/main/examples/soundClassifier-speech-command): Sound classification using the SpeechCommands18w model.
- [SoundClassifier Teachable Machine](https://github.com/ml5js/ml5-next-gen/tree/main/examples/soundClassifier-teachable-machine): Sound classification using a custom model with Google's Teachable Machine.

## Step-by-Step Guide

Let's build the [Sound Classification example](https://github.com/ml5js/ml5-next-gen/tree/main/examples/soundClassifier-speech-command) from scratch, and in the process, learn how to use SoundClassifier!

### Create a new project

To follow along, start by creating an empty project in the [p5.js web editor](https://editor.p5js.org/).

### Set up ml5.js

Import the ml5.js library in your `index.html` file.

```html
<script src="https://unpkg.com/ml5@1/dist/ml5.js"></script>
```

?> If you are not familiar with how to import the ml5.js library and need more detailed guidance, please check out our [Getting Started](/?id=set-up-ml5js) page.

### Load model

Let's open the `sketch.js` file and define a variable to store the SoundClassifier model.

```javascript
let classifier;
```

Next, we will store the 18 words available in the SpeechCommands18w model in an array.

```javascript
let words = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "up",
  "down",
  "left",
  "right",
  "go",
  "stop",
  "yes",
  "no",
];
```

We're now going to create a `preload` function to load the SoundClassifier model. The `preload` function is a p5.js function that runs before the `setup` and `draw` function. This is where we load the model to ensure it is ready before we use it.

In this, we first create an `options` object to customize the model's behavior. For example, we can set the probability threshold, with the default being 0.

```javascript
function preload() {
  let options = { probabilityThreshold: 0.7 };

```

?> If you would like to know more about the available configuration settings for `options`, please check out the [Methods](/reference/sound-classifier?id=methods) section.

Now, we are ready to load a model configured as `options` specifies and store it in the `classifier` variable.

```javascript
  classifier = ml5.soundClassifier("SpeechCommands18w", options);
}
```

### Classify sound with the model

Define a variable to store the label of the classified sound.

```javascript
// Variable for displaying the results on the canvas
let predictedWord = "";
```

Within the `setup` function, we call the `classifyStart` method on the `classifier` object to classify the sound. The `classifyStart` method takes a callback function as a parameter.

```javascript
function setup() {
  createCanvas(650, 450);
  // Classify the sound from microphone in real time
  classifier.classifyStart(gotResult);
}
```

Now, let's define the `gotResult` function. The callback function `gotResult` is a function that will be called when the `classifyStart` method finishes classifying the sound.

```javascript
// A function to run when we get any errors and the results
function gotResult(results) {
  // The results are in an array ordered by confidence
  console.log(results);
```

Let's get the top 1 label that model feels most confident about. `results[0]` is the object with the highest confidence score.

```javascript
  // Load the first label to the text variable displayed on the canvas
  predictedWord = results[0].label;
}
```

### Set up UI for user interaction

To give the user some guidance on how to interact with the model, we can add a prompt message. Let's define a function `displayWords()` to show the 18 words from the model on the canvas.

Using `textAlign()`, `textSize()`, and `fill()`, we can set up the text style.

```javascript
// Function to display the 18 words on the canvas
function displayWords() {
  textAlign(CENTER, CENTER);
  textSize(32);
  fill(96);
  text("Say one of these words!", width / 2, 40);
```

We can also specify where we want the words to appear on the screen. To set up rows and columns, we iterate all words of the `words` array, fetch the `i`th dectected word, and display it on the canvas.

```javascript
  let x = 125;
  let y = 150;
  // Words appear in 3 columns of 6 rows
  for (let i = 0; i < words.length; i++) {
    fill(158);
    text(words[i], x, y);
    y += 50;
    if ((i + 1) % 6 === 0) {
      x += 200;
      y = 150;
    }
  }
}
```

### Display the results

In the `draw()` function, draw the `background` and call the `displayWords()` function to display the 18 words.

```javascript
function draw() {
  background(250);
  // Call function for displaying background words
  displayWords();
```

Finally, we display the classification results on the canvas and again, use `fill()`, `textAlign()`, and `textSize()` to set up styling.

```javascript
  // Once the model outputs results start displaying the predicted word on the canvas
  if (predictedWord !== "") {
    fill(211, 107, 255);
    textAlign(CENTER, CENTER);
    textSize(64);
    text(predictedWord, width / 2, 90);
  }
}
```

### Run your sketch

Voila! You have successfully built the Sound Classification example. Press the <img class="inline-img" src="assets/facemesh-arrow-forward.png" alt="run button icon" aria-hidden="true"> `run` button to see the code in action. You can also find the [complete code](https://github.com/ml5js/ml5-next-gen/tree/main/examples/soundClassifier-speech-command) in the p5.js web editor.

?> If you have any questions or spot something unclear in this step-by-step code guide, we'd love to hear from you! Join us on [Discord](https://discord.com/invite/3CVauZMSt7) and let us know how we can make it better.

## Methods

<center>
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="150" viewBox="0 0 600 150">
  <defs>
    <linearGradient id="titleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#6d28d9"/>
      <stop offset="60%" style="stop-color:#9333ea"/>
      <stop offset="100%" style="stop-color:#db2777"/>
    </linearGradient>
    <filter id="glow">
      <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="#9333ea" flood-opacity="0.35"/>
    </filter>
  </defs>

  <!-- Soft purple pill background -->
  <rect x="40" y="25" width="520" height="95" rx="48" fill="#f5f0ff" opacity="0.75"/>

  <!-- Sparkle top-left -->
  <g transform="translate(78,52) rotate(20)">
    <path d="M0,-13 L3,-3 L13,0 L3,3 L0,13 L-3,3 L-13,0 L-3,-3 Z" fill="#a855f7"/>
  </g>
  <!-- Sparkle top-right -->
  <g transform="translate(522,48) rotate(-15)">
    <path d="M0,-10 L2.5,-2.5 L10,0 L2.5,2.5 L0,10 L-2.5,2.5 L-10,0 L-2.5,-2.5 Z" fill="#ec4899"/>
  </g>
  <!-- Sparkle bottom-right -->
  <g transform="translate(545,108)">
    <path d="M0,-8 L2,-2 L8,0 L2,2 L0,8 L-2,2 L-8,0 L-2,-2 Z" fill="#7c3aed" opacity="0.75"/>
  </g>
  <!-- Sparkle bottom-left -->
  <g transform="translate(62,110)">
    <path d="M0,-8 L2,-2 L8,0 L2,2 L0,8 L-2,2 L-8,0 L-2,-2 Z" fill="#c026d3" opacity="0.75"/>
  </g>

  <!-- Floating dots -->
  <circle cx="115" cy="32" r="4.5" fill="#c084fc" opacity="0.65"/>
  <circle cx="485" cy="118" r="4.5" fill="#f0abfc" opacity="0.65"/>
  <circle cx="160" cy="122" r="3" fill="#a855f7" opacity="0.5"/>
  <circle cx="445" cy="28" r="3" fill="#ec4899" opacity="0.5"/>
  <circle cx="570" cy="72" r="3.5" fill="#7c3aed" opacity="0.4"/>
  <circle cx="30" cy="72" r="3.5" fill="#9333ea" opacity="0.4"/>

  <!-- Cute heart below text -->
  <path d="M300,130 C300,130 286,119 286,111 C286,105 291,101 296,103 C298,104 300,107 300,107 C300,107 302,104 304,103 C309,101 314,105 314,111 C314,119 300,130 300,130 Z" fill="#ec4899" opacity="0.65"/>

  <!-- Main title text -->
  <text x="300" y="90"
        font-family="Georgia, 'Times New Roman', serif"
        font-size="52"
        font-weight="bold"
        text-anchor="middle"
        fill="url(#titleGrad)"
        filter="url(#glow)">Getting Started</text>

  <!-- Squiggly underline -->
  <path d="M130,102 Q180,110 230,102 Q280,94 330,102 Q380,110 430,102 Q460,96 470,102"
        stroke="url(#titleGrad)" stroke-width="2.5" fill="none" stroke-linecap="round" opacity="0.6"/>
</svg>
</center>

<center>
  <img class="header-img" src="assets/header-getting-started.png" alt="Getting Started Header Image" >
  <p class="img-credit"> Image Credit: <a href="https://thenounproject.com/creator/ifkirianto.if" target="_blank" title="Iki">Iki</a> | <a href='https://forms.gle/5EpwYabG8hLn4p926' target="contribute-form">Contribute ♥️</a> </p>
</center>

Welcome! We're going to walk through how to start using ml5.js by creating a simple image classification program.

This page will cover how to:

1. Load a pre-trained ml5.js image classification model
2. Load an image for the model to identify the object in the image
3. Get the results from the model and display them on the canvas

We will using a p5.js sketch running on the [p5.js web editor](https://editor.p5js.org/). To get started, open up the p5.js web editor and create an empty project. Be sure to sign up or log in to your account so that you are able to upload files! This will be necessary later on as we upload images.

?> You can find the full code for this tutorial at [imageClassifier single image example code](https://editor.p5js.org/ml5/sketches/pjPr6XmPY). Press the run button to see the code in action.

## Set up ml5.js {docsify-ignore}

Once you have the p5.js web editor open, unfold the project directory by clicking the arrow `>` at the top left corner.

<!-- TODO: photoshop image so that all have 800 px width before styling -->
<center>
    <img alt="screenshot of sketch files on the p5 web editor interface" width="800" src="assets/gettingstarted-sketch-folder-alpha.png">
</center>

Now, let's switch to the `index.html` file and copy and paste the following CDN link inside the `<head>` tag.

```html
<script src="https://unpkg.com/ml5@1/dist/ml5.min.js"></script>
```

<center>
    <img alt="screenshot of importing ml5 library in index.html file" width="800" src="assets/gettingstarted-import-lib-alpha.png">
</center>

## Load pretrained ml5.js model {docsify-ignore}

Use the project directory to switch back to the `sketch.js` file. We will define a variable called `classifier` to hold the image classifier model.

```js
let classifier;
```

Next, add a `preload()` function to load the image classification model. In this example, we are using the MobileNet model.

```js
function preload() {
  classifier = ml5.imageClassifier("MobileNet");
}
```

?> If you are not familiar with terms like `pretrained model`, `classification`, `classifier`, `preload function`, or `MobileNet` and would like to learn more about them, check out our [ml5 Glossary](/learn/ml5-glossary) for a quick intro.

## Load an image for the model to identify {docsify-ignore}

Let's unfold the project directory again by clicking the arrow `>` at the top left corner of the p5.js editor.

<center>
    <img alt="screenshot of sketch files on the p5 web editor interface" width="800" src="assets/gettingstarted-sketch-folder-alpha.png">
</center>

Select the `+` to create a new folder called `images`.

<center>
    <img alt="screenshot of creating images folder" width="800" src="assets/gettingstarted-create_folder_alpha.png">
</center>

To upload files to the folder, choose the `images` folder in the project directory and upload an image using the drop-down menu. For this example, we are uploading an image of a bird called `bird.png`. Make sure you are logged in to see this option.

<center>
    <img alt="screenshot of uploading file to p5 web editor" width="800" src="assets/gettingstarted-upload-file-alpha.png">
</center>

Once the image is uploaded, go back to the `sketch.js` file and define a variable called `img` to hold the image you want to classify.

```js
let img;
```

Within the `preload()` function, load the image using the `loadImage()` function.

```js
function preload() {
  classifier = ml5.imageClassifier("MobileNet");
  img = loadImage("images/bird.png");
}
```

## Make predictions with the model {docsify-ignore}

In the `setup()` function, we will call the `classify()` function on the `classifier` object to classify the image. The `classify()` function takes two parameters: the image you want to classify and a callback function called `gotResult`.

```js
function setup() {
  createCanvas(400, 400);
  classifier.classify(img, gotResult);
}
```

Now, let's define the `gotResult()` function. The callback function `gotResult()` is a function that will be called when the `classify()` function finishes classifying the image.

```js
function gotResult(results) {
  console.log(results);
}
```

?> If you are not familiar with the concept of `callback` and would like to learn more about it, check out our [ml5 Glossary](/learn/ml5-glossary) for more information.

## Display the results on the canvas {docsify-ignore}

As we discussed above, the `gotResult()` function will be called when the `classify()` function finishes classifying the image. A variable `results` that contains the results of the classification will be passed along to `gotResult()`. Let's take a look at the `results` that is received by the `gotResult()` function.

```js
[
  {
    label: "robin, American robin, Turdus migratorius",
    confidence: 0.9026526212692261,
  },
  {
    label: "worm fence, snake fence, snake-rail fence, Virginia fence",
    confidence: 0.0029119430109858513,
  },
  {
    label: "brambling, Fringilla montifringilla",
    confidence: 0.0015617000171914697,
  },
];
```

The `results` is an array of objects ordered by confidence. The object at index 0 has the highest confidence. By default, ml5.js image classifier MobileNet model returns the top 3 labels with their confidence scores. In this example, we are interested in only the top result that has the highest confidence, which is the label that has the highest probability of being correct.

To get this, we are going to define two variables `label` and `confidence` to store the label and confidence of the top 1 result.

```js
let label = "";
let confidence = "";
```

In the `gotResult()` function, let's display the label and confidence of the top 1 result on the canvas using the `text()` function.

```js
function gotResult(results) {
  console.log(results);

  fill(255);
  stroke(0);
  textSize(18);
  label = "Label: " + results[0].label;
  confidence = "Confidence: " + nf(results[0].confidence, 0, 2);
  text(label, 10, 360);
  text(confidence, 10, 380);
}
```

Lastly, render the image to the canvas using the `image()` function.

```js
function setup() {
  createCanvas(400, 400);
  classifier.classify(img, gotResult);
  image(img, 0, 0);
}
```

?> If you are not familiar with terms like `label`, `confidence` and would like to learn more about them, check out our [ml5 Glossary](/learn/ml5-glossary) for a quick intro.

## Run your sketch {docsify-ignore}

Now, you are ready to see the results! Run your sketch and see if the model can make predictions and provide meaningful outputs. Press the run button on the top left corner of the editor.

You should get something like this:

<center>
    <img alt="screenshot of running a sketch" width=`800` src="assets/gettingstarted-run-sketch-alpha.png">
</center>

## And voilà! {docsify-ignore}

You've just made a simple machine learning powered program that:

1. takes an image,
2. classifies the content of that image,
3. and displays the results all in your web browser!

Not all of our examples are structured exactly like this, but this provides a taste into how ml5.js is trying to make machine learning more approachable. You can try using different images and seeing what kinds of things get returned.

<br/>

Some guiding questions you might start to think about are:

1. Do you notice that MobileNet is better at classifying some animals over others? Why do you think that is?
2. Does the top result always accurately describe the image?

## What next? {docsify-ignore}

Now that you've built your first ml5.js project, take a look at other models and explore how you might use ml5.js for ML-based projects! Check out the [Next Steps](/welcome/next-steps) page to learn more.

<br>

# Reference Overview

<center>
  <img class="header-img" src="assets/header-reference-overview.png" alt="Reference Overview Header Image" >
  <p class="img-credit"> Image Credit: <a href="https://thenounproject.com/creator/diasytrisniaty/" target="_blank" title="diasy tristiady">diasy tristiady</a> | <a href='https://forms.gle/5EpwYabG8hLn4p926' target="contribute-form">Contribute ♥️</a> </p>
</center>

Welcome to the ml5.js reference page!
ml5.js provides a collection of ready-to-use machine learning models that run directly in the browser, with no installation or server required. It is designed to be accessible to users with no prior machine learning experience. This page provides an overview of the available models, organized by the level of setup and customization required.

There are three ways to work with ml5.js:

- **ml5 Models** — Pre-trained, ready-to-use models. Pass in an image, video, audio clip, or text and get back structured results like keypoints, labels, or scores. No training required.

- **ml5 + Teachable Machine** — Use [Teachable Machine](https://teachablemachine.withgoogle.com/) to train a custom model with your own images, sounds, or poses, then load it directly into ml5.js.

- **Train Your Own Model** — Build and train your own custom model from scratch in the browser using ml5.js. Add your data, train, and deploy all in p5.js, no external tools needed.

Use the sidebar to learn more about each model, or explore the examples below.

--- 

<div id="examples-page">

<!-- Search bar -->
<div id="examples-search-wrap">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
  <input id="examples-search" type="search" placeholder="Search examples…" aria-label="Search examples" autocomplete="off" />
</div>

<div id="examples-no-results">No matches found. Try using different words</div>

<!-- ── BodyPose ───────────────────────────────────────────── -->
<section class="ex-group" data-group="bodypose">
  <div class="ex-group-header">
    <span class="ex-group-title">BodyPose</span>
    <a class="ex-group-ref" href="#/reference/bodypose">Reference</a>
  </div>
  <div class="ex-grid">
    <a class="ex-card" data-name="blazepose keypoints" href="https://editor.p5js.org/ml5/sketches/OukJYAJAb" target="_blank" rel="noopener noreferrer">
      <p class="ex-card-name">BlazePose Keypoints</p>
      <p class="ex-card-desc">Detect and draw 33 precise body keypoints using the BlazePose model.</p>
    </a>
    <a class="ex-card" data-name="keypoints" href="https://editor.p5js.org/ml5/sketches/c8sl_hGmN" target="_blank" rel="noopener noreferrer">
      <p class="ex-card-name">Keypoints</p>
      <p class="ex-card-desc">Detect and draw body keypoints in real-time using the MoveNet model.</p>
    </a>
    <a class="ex-card" data-name="blazepose skeleton" href="https://editor.p5js.org/ml5/sketches/KWgsAbgkk" target="_blank" rel="noopener noreferrer">
      <p class="ex-card-name">BlazePose Skeleton</p>
      <p class="ex-card-desc">Draw skeletal connections between BlazePose body landmarks.</p>
    </a>
    <a class="ex-card" data-name="movenet skeleton" href="https://editor.p5js.org/ml5/sketches/vpSI23x0A" target="_blank" rel="noopener noreferrer">
      <p class="ex-card-name">MoveNet Skeleton</p>
      <p class="ex-card-desc">Draw skeletal connections between MoveNet body landmarks.</p>
    </a>
    <a class="ex-card" data-name="skeleton" href="https://editor.p5js.org/ml5/sketches/hMN9GdrO3" target="_blank" rel="noopener noreferrer">
      <p class="ex-card-name">Skeleton</p>
      <p class="ex-card-desc">Visualize the full body skeleton from detected pose keypoints.</p>
    </a>
  </div>
</section>

<!-- ── BodySegmentation ──────────────────────────────────── -->
<section class="ex-group" data-group="bodysegmentation">
  <div class="ex-group-header">
    <span class="ex-group-title">BodySegmentation</span>
    <a class="ex-group-ref" href="#/reference/body-segmentation">Reference</a>
  </div>
  <div class="ex-grid">
    <a class="ex-card" data-name="mask background" href="https://editor.p5js.org/ml5/sketches/KNsdeNhrp" target="_blank" rel="noopener noreferrer">
      <p class="ex-card-name">Mask Background</p>
      <p class="ex-card-desc">Replace the background behind a person with a custom image or color.</p>
    </a>
    <a class="ex-card" data-name="mask body parts" href="https://editor.p5js.org/ml5/sketches/ruoyal-RC" target="_blank" rel="noopener noreferrer">
      <p class="ex-card-name">Mask Body Parts</p>
      <p class="ex-card-desc">Highlight individual body parts with distinct color masks.</p>
    </a>
    <a class="ex-card" data-name="mask person" href="https://editor.p5js.org/ml5/sketches/h6TN8umP5" target="_blank" rel="noopener noreferrer">
      <p class="ex-card-name">Mask Person</p>
      <p class="ex-card-desc">Isolate and mask the full person silhouette from the background.</p>
    </a>
    <a class="ex-card" data-name="select body parts" href="https://editor.p5js.org/ml5/sketches/R5rug0HKk" target="_blank" rel="noopener noreferrer">
      <p class="ex-card-name">Select Body Parts</p>
      <p class="ex-card-desc">Interactively select and visualize specific body part segments.</p>
    </a>
  </div>
</section>

<!-- ── FaceMesh ───────────────────────────────────────────── -->
<section class="ex-group" data-group="facemesh">
  <div class="ex-group-header">
    <span class="ex-group-title">FaceMesh</span>
    <a class="ex-group-ref" href="#/reference/facemesh">Reference</a>
  </div>
  <div class="ex-grid">
    <a class="ex-card" data-name="single image" href="https://editor.p5js.org/ml5/sketches/lqQZrDJHF" target="_blank" rel="noopener noreferrer">
      <p class="ex-card-name">Single Image</p>
      <p class="ex-card-desc">Detect facial landmarks from a static image.</p>
    </a>
    <a class="ex-card" data-name="keypoints" href="https://editor.p5js.org/ml5/sketches/lCurUW1TT" target="_blank" rel="noopener noreferrer">
      <p class="ex-card-name">Keypoints</p>
      <p class="ex-card-desc">Draw all 468 facial landmark points on a live webcam feed.</p>
    </a>
    <a class="ex-card" data-name="parts" href="https://editor.p5js.org/ml5/sketches/9y9W7eAee" target="_blank" rel="noopener noreferrer">
      <p class="ex-card-name">Parts</p>
      <p class="ex-card-desc">Highlight distinct facial regions like eyes, lips, and nose.</p>
    </a>
    <a class="ex-card" data-name="shapes from parts" href="https://editor.p5js.org/ml5/sketches/6qj0M3ElM" target="_blank" rel="noopener noreferrer">
      <p class="ex-card-name">Shapes from Parts</p>
      <p class="ex-card-desc">Draw geometric shapes derived from facial feature regions.</p>
    </a>
    <a class="ex-card" data-name="parts bounding box" href="https://editor.p5js.org/ml5/sketches/F9jRILxn2" target="_blank" rel="noopener noreferrer">
      <p class="ex-card-name">Parts Bounding Box</p>
      <p class="ex-card-desc">Draw bounding boxes around individual facial feature regions.</p>
    </a>
    <a class="ex-card" data-name="keypoints from parts" href="https://editor.p5js.org/ml5/sketches/EjynWxazD4" target="_blank" rel="noopener noreferrer">
      <p class="ex-card-name">Keypoints from Parts</p>
      <p class="ex-card-desc">Extract and display keypoints belonging to a specific facial region.</p>
    </a>
    <a class="ex-card" data-name="bounding box" href="https://editor.p5js.org/ml5/sketches/fMCIspRD7_" target="_blank" rel="noopener noreferrer">
      <p class="ex-card-name">Bounding Box</p>
      <p class="ex-card-desc">Draw a bounding box around each detected face.</p>
    </a>
  </div>
</section>

<!-- ── HandPose ───────────────────────────────────────────── -->
<section class="ex-group" data-group="handpose">
  <div class="ex-group-header">
    <span class="ex-group-title">HandPose</span>
    <a class="ex-group-ref" href="#/reference/handpose">Reference</a>
  </div>
  <div class="ex-grid">
    <a class="ex-card" data-name="single image" href="https://editor.p5js.org/ml5/sketches/8VK_l3XwE" target="_blank" rel="noopener noreferrer">
      <p class="ex-card-name">Single Image</p>
      <p class="ex-card-desc">Detect hand keypoints from a still photograph.</p>
    </a>
    <a class="ex-card" data-name="keypoints" href="https://editor.p5js.org/ml5/sketches/QGH3dwJ1A" target="_blank" rel="noopener noreferrer">
      <p class="ex-card-name">Keypoints</p>
      <p class="ex-card-desc">Draw all 21 hand landmark points in real-time from webcam.</p>
    </a>
    <a class="ex-card" data-name="parts" href="https://editor.p5js.org/ml5/sketches/DNbSiIYKB" target="_blank" rel="noopener noreferrer">
      <p class="ex-card-name">Parts</p>
      <p class="ex-card-desc">Highlight individual finger segments and palm regions.</p>
    </a>
    <a class="ex-card" data-name="detect start stop" href="https://editor.p5js.org/ml5/sketches/W9vFFT5RM" target="_blank" rel="noopener noreferrer">
      <p class="ex-card-name">Detect Start &amp; Stop</p>
      <p class="ex-card-desc">Demonstrate how to start and stop hand detection on demand.</p>
    </a>
  </div>
</section>

<!-- ── ImageClassifier ───────────────────────────────────── -->
<section class="ex-group" data-group="imageclassifier">
  <div class="ex-group-header">
    <span class="ex-group-title">ImageClassifier</span>
    <a class="ex-group-ref" href="#/reference/image-classifier">Reference</a>
  </div>
  <div class="ex-grid">
    <a class="ex-card" data-name="webcam" href="https://editor.p5js.org/ml5/sketches/K0sjaEO19" target="_blank" rel="noopener noreferrer">
      <p class="ex-card-name">Webcam</p>
      <p class="ex-card-desc">Classify objects in a live webcam stream in real-time.</p>
    </a>
    <a class="ex-card" data-name="single image" href="https://editor.p5js.org/ml5/sketches/pjPr6XmPY" target="_blank" rel="noopener noreferrer">
      <p class="ex-card-name">Single Image</p>
      <p class="ex-card-desc">Classify the contents of a static image file.</p>
    </a>
    <a class="ex-card" data-name="teachable machine" href="https://editor.p5js.org/ml5/sketches/VvGXajA36" target="_blank" rel="noopener noreferrer">
      <p class="ex-card-name">Teachable Machine</p>
      <p class="ex-card-desc">Use a custom model trained in Teachable Machine to classify images.</p>
    </a>
  </div>
</section>

<!-- ── SoundClassifier ───────────────────────────────────── -->
<section class="ex-group" data-group="soundclassifier">
  <div class="ex-group-header">
    <span class="ex-group-title">SoundClassifier</span>
    <a class="ex-group-ref" href="#/reference/sound-classifier">Reference</a>
  </div>
  <div class="ex-grid">
    <a class="ex-card" data-name="teachable machine" href="https://editor.p5js.org/ml5/sketches/mXeiNXSTU" target="_blank" rel="noopener noreferrer">
      <p class="ex-card-name">Teachable Machine</p>
      <p class="ex-card-desc">Classify audio using a model trained in Teachable Machine.</p>
    </a>
    <a class="ex-card" data-name="speech command" href="https://editor.p5js.org/ml5/sketches/HUm7NYMW3" target="_blank" rel="noopener noreferrer">
      <p class="ex-card-name">Speech Command</p>
      <p class="ex-card-desc">Recognize spoken words and commands via the microphone.</p>
    </a>
  </div>
</section>

<!-- ── NeuralNetwork ─────────────────────────────────────── -->
<section class="ex-group" data-group="neuralnetwork">
  <div class="ex-group-header">
    <span class="ex-group-title">NeuralNetwork</span>
    <a class="ex-group-ref" href="#/reference/neural-network">Reference</a>
  </div>
  <div class="ex-grid">
    <a class="ex-card" data-name="mouse gesture" href="https://editor.p5js.org/ml5/sketches/FdXAgrA3N" target="_blank" rel="noopener noreferrer">
      <p class="ex-card-name">Mouse Gesture</p>
      <p class="ex-card-desc">Train a neural network to recognize drawn mouse gestures.</p>
    </a>
    <a class="ex-card" data-name="color classifier" href="https://editor.p5js.org/ml5/sketches/eGHBdmCLe" target="_blank" rel="noopener noreferrer">
      <p class="ex-card-name">Color Classifier</p>
      <p class="ex-card-desc">Train a neural network to classify colors from RGB input values.</p>
    </a>
    <a class="ex-card" data-name="load model" href="https://editor.p5js.org/ml5/sketches/U-aljtx7x" target="_blank" rel="noopener noreferrer">
      <p class="ex-card-name">Load Model</p>
      <p class="ex-card-desc">Load a pre-trained neural network model from a saved file.</p>
    </a>
    <a class="ex-card" data-name="train and save" href="https://editor.p5js.org/ml5/sketches/rR51vvi-u" target="_blank" rel="noopener noreferrer">
      <p class="ex-card-name">Train and Save</p>
      <p class="ex-card-desc">Train a neural network in the browser and export the model.</p>
    </a>
  </div>
</section>

<!-- ── NeuroEvolution ────────────────────────────────────── -->
<section class="ex-group" data-group="neuroevolution">
  <div class="ex-group-header">
    <span class="ex-group-title">NeuroEvolution</span>
    <a class="ex-group-ref" href="#/reference/neuroevolution">Reference</a>
  </div>
  <div class="ex-grid">
    <a class="ex-card" data-name="steering" href="https://editor.p5js.org/ml5/sketches/eTJ1nO0O9" target="_blank" rel="noopener noreferrer">
      <p class="ex-card-name">Steering</p>
      <p class="ex-card-desc">Evolve a neural network to steer a vehicle toward a target.</p>
    </a>
    <a class="ex-card" data-name="sensors" href="https://editor.p5js.org/ml5/sketches/64yhABxVb" target="_blank" rel="noopener noreferrer">
      <p class="ex-card-name">Sensors</p>
      <p class="ex-card-desc">Train agents with virtual sensors to navigate around obstacles.</p>
    </a>
    <a class="ex-card" data-name="flappy bird" href="https://editor.p5js.org/ml5/sketches/VXSvfFiQF" target="_blank" rel="noopener noreferrer">
      <p class="ex-card-name">Flappy Bird</p>
      <p class="ex-card-desc">Evolve a neural network to play Flappy Bird autonomously.</p>
    </a>
  </div>
</section>

<!-- ── Sentiment ─────────────────────────────────────────── -->
<section class="ex-group" data-group="sentiment">
  <div class="ex-group-header">
    <span class="ex-group-title">Sentiment</span>
    <a class="ex-group-ref" href="#/reference/sentiment">Reference</a>
  </div>
  <div class="ex-grid">
    <a class="ex-card" data-name="sentiment analysis" href="https://editor.p5js.org/ml5/sketches/hopIvsCGL" target="_blank" rel="noopener noreferrer">
      <p class="ex-card-name">Sentiment Analysis</p>
      <p class="ex-card-desc">Analyze the emotional tone of text as positive or negative.</p>
    </a>
  </div>
</section>

<!-- ── Community Applications  ──
<div id="community-apps">
  <h3>Community Applications</h3>
  <p class="community-apps-intro">Real-world projects built with ml5.js, contributed by the community.</p>
  <div class="app-grid">
    <div class="app-card">
      <p class="app-card-tag">BodyPose</p>
      <p class="app-card-name">Velocity Tracker</p>
      <p class="app-card-desc">Measure the speed of body movement between frames using keypoint positions over time.</p>
    </div>
    <div class="app-card">
      <p class="app-card-tag">BodyPose</p>
      <p class="app-card-name">Rep Counter</p>
      <p class="app-card-desc">Count exercise repetitions by tracking joint angles during movement.</p>
    </div>
    <div class="app-card">
      <p class="app-card-tag">FaceMesh</p>
      <p class="app-card-name">Gaze-Controlled Interface</p>
      <p class="app-card-desc">Use eye keypoints to move a cursor or trigger actions without a mouse.</p>
    </div>
    <div class="app-card">
      <p class="app-card-tag">HandPose</p>
      <p class="app-card-name">Air Theremin</p>
      <p class="app-card-desc">Map hand position to pitch and volume to play music without touching anything.</p>
    </div>
    <div class="app-card">
      <p class="app-card-tag">NeuralNetwork</p>
      <p class="app-card-name">Posture Coach</p>
      <p class="app-card-desc">Train a classifier on good vs. poor sitting posture and give real-time feedback.</p>
    </div>
    <div class="app-card">
      <p class="app-card-tag">BodySegmentation</p>
      <p class="app-card-name">Virtual Green Screen</p>
      <p class="app-card-desc">Swap the background behind a person in real-time without a physical green screen.</p>
    </div>
  </div>
  <p class="contribute-cta">
    Built something with ml5.js?
    <a href="https://github.com/ml5js/ml5-website-v02-docsify/issues" target="_blank" rel="noopener noreferrer">Open an issue on GitHub</a>
    to have your project added here.
  </p>
</div>
──>
</div>
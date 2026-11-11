# SpeechtoText

<center>
  <img class="header-img" src="assets/header-body-segmentation.png" alt="BodySegmentation Header Image" >
  <p class="img-credit"> Image Credit: <a href="https://thenounproject.com/creator/ibrandify/" target="_blank" title="ibrandify">ibrandify</a> | <a href='https://forms.gle/5EpwYabG8hLn4p926' target="contribute-form">Contribute ♥️</a> </p>
</center>

## Description

The ml5.js SpeechToText provides the `whisper` models, `whisper-tiny`, `whisper-base`, and `whisper-small`. The `whisper` model transcribes speech to text. `whisper-base` is the default loaded model with `tiny` taking less compute and `small` taking more. 

The ml5.js SpeechToText is an automatic speech recognition, transformer machine learning model provided by [hugging face](https://huggingface.co/Xenova/whisper-base).

It provides following functionalities:
- **Multilingual Transcription**: [99 languages supported](https://whisper-api.com/docs/languages/) 

## Quick Start

Run and explore a pre-built example! [This BodySegmentation example](https://editor.p5js.org/ml5/sketches/ruoyal-RC) demonstrates how to use the BodySegmentation `BodyPix` model to segment body parts from webcam input.

</br>

[DEMO](iframes/body-segmentation ":include :type=iframe width=100% height=550px")


## Step-by-Step Guide
Now, let's together build the [SpeechToText example](https://editor.p5js.org/ml5/sketches/ruoyal-RC) from scratch, and in the process, learn how to use the SpeechToText models.

### Create a new project

To follow along, start by creating an empty project in the [p5.js web editor](https://editor.p5js.org/).

### Set up ml5.js
Import the ml5.js library in your `index.html` file.

```html
<script src="https://unpkg.com/ml5@1/dist/ml5.js"></script>
```

?> If you are not familiar with how to import the ml5.js library and need more detailed guidance, please check out our [Getting Started](/?id=set-up-ml5js) page.

### Load model
Let's open the `sketch.js` file in the p5.js Web Editor and follow the steps below to load the model and create a variable to display the transcription.

```javascript
let speechToTextModel;; //Define a variable to store the STT model.
let transcriptionText = "Transcription: ";

```

### Set Up Function

Let's start with our set up function by creating the canvas and loading our model. Here we are loading `Whisper` which defaults to loading `whisper-base`. You can change this to be `whisper-tiny` or `whisper-small`. The default language is `english` which you can also change. We'll also load a model progress bar in our console. 

```javascript
async function setup() {
  createCanvas(400, 400);

  speechToTextModel = await ml5.speechToText(
    "Whisper",
    {
      language: "english",
      progress_callback: logProgress,
    }
  );
};

```

See the progress bar, we also need to add our `logProgress()` function at the end of our sketch after draw.

```javascript
function logProgress(info) {
  if(info.status === "progress_total") {
    console.log("Loading model: " + round(info.progress) + "%");
  }
}
```

### Transcription Functions

Now, let's add some buttons to the `setup()` function so we can start and stop recording our speech. 

```javascript
async function setup() {
  createCanvas(400, 400);

  speechToTextModel = await ml5.speechToText(
    "Whisper",
    {
      language: "english", 
      progress_callback: logProgress, 

    }
  );

  let startButton = createButton("start");
  startButton.mousePressed(transcribeStart);
  let stopButton = createButton("stop");
  stopButton.mousePressed(transcribeStop);
}
```

Now let's add our `transcribeStart()`, `transcribeStop()`, and `gotResults()` functions that will be called when we press our start and stop recording buttons. Add these functions after draw. 

```javascript
function transcribeStart() {
  console.log("Listening...");
  speechToTextModel.transcribeStart();
}

function transcribeStop() {
  console.log("Stopped Listening...");
  speechToTextModel.transcribeStop(gotResults);
}

function gotResults(results) {
  console.log(results);
  if (results && results.text) {
    transcriptionText = "Transcription: " + results.text;
  }
}
```
### Draw Function

Let's set up our `draw()` function to print the transcribed text to our canvas.

```javascript
function draw() {
  background(220);
  fill(0);
  noStroke();
  textAlign(LEFT, TOP);

  text(transcriptionText, 20, 20, width - 40, height - 40);
}
```

### Run your sketch
You have successfully built the SpeechToText example! Press the <img class="inline-img" src="assets/facemesh-arrow-forward.png" alt="run button icon" aria-hidden="true"> `run` button to see the code in action. You can also find the [complete code](https://editor.p5js.org/ml5/sketches/ruoyal-RC) in the p5.js web editor.

?> If you have any questions or spot something unclear in this step-by-step code guide, we'd love to hear from you! Join us on [Discord](https://discord.com/invite/3CVauZMSt7) and let us know how we can make it better.

## Methods

### ml5.speechToText()

This method is used to initialize the bodySegmentation object.

```javascript
speechToTextModel = await ml5.speechToText(?modelName, ?options, ?callback);
```

**Parameters:**

- **modelName**: Optional. A string specifying which model to use. Types of model:
  - _Whisper_(default): whisper-base model
  - _WhisperTiny_: whisper-tiny model
  - _WhisperBase_: whisper-base model
  - _WhisperSmall_: whisper-small model

- **options**: Optional. An object to change the default configuration of the model. See the example options object:

  ```javascript
  {
      language: "english", 
      progress_callback: logProgress, 
      device: "wasm",
      dtype: "q8" 

    }
  ```

  - _language_: The language that's being spoken and transcribed. [Language Options Available](https://whisper-api.com/docs/languages/)
  - *progress_callback* : A function called repeatedly with a progress info object while the model files download. Use it to show a loading bar or log progress.
  - _device_ : Where the model runs, either `"webgpu"` (faster) or `"wasm"` (works in every browser). By default ml5 picks `"webgpu"` if the browser supports it and `"wasm"` otherwise.
  - _dtype_: The numeric precision of the model weights, such as `"fp32"`, `"fp16"`, `"q8"` or `"q4"`. Lower precision downloads faster and uses less memory but can be less accurate.

  [see other options for optional parameters](https://huggingface.co/docs/transformers.js/en/api/utils/hub)

- **callback(speechToText, error)**: Optional. A function that runs once the model has finished loading. It receives the speechToText object as its argument.

**Returns:**

- **Object**: The speechToText object. It contains the `transcribeStart()` and `transcribeStop()` methods used to record and transcribe speech.

---

### speechToText.transcribeStart()

This method asks for microphone access and starts recording audio. If the model is still loading, it waits until loading finishes. If recording is already in progress, it logs a warning and does nothing.

```javascript
speechToTextModel.transcribeStart();
```

**Returns:**

- **Promise**: Resolves with no value once recording has started. It rejects with an error if microphone access is denied.

---

### speechToText.transcribeStop()

This method stops the recording, releases the microphone, and transcribes the recorded audio.

```javascript
speechToTextModel.transcribeStop(?optionsOrCallback, ?cb);
```

**Parameters:**

- **optionsOrCallback**: Optional. 
  - _language_: The language being spoken. Default is `english`
  - _task_: Either `"transcribe"` (write down what was said) or `"translate"` (translate the speech into English). If not set, it is chosen automatically.
  - *return_timestamps*: If `true`, the result also includes a `chunks` array with the start and end time (in seconds) of each piece of transcribed text. Default is `false`.
  - *chunk_length_s* : Length in seconds of the pieces the audio is split into for transcription. Default is `30`.
  - *stride_length_s*: Overlap in seconds between neighboring pieces, so words at the edges aren't cut off. Default is `5`.
  - *force_full_sequences*: Whether to force full sequences in the output. Default is `false`.
  - *num_frames*: The number of frames in the input audio.

- **cb**:  A callback function that receives the transcription result once it is ready. The result is an object like `{ text: "hello world" }`.

**Returns:**

- **Promise**: Resolves with the same result object that is passed to the callback. Its `text` property is the transcribed speech. If nothing is being recorded, it returns `undefined`.
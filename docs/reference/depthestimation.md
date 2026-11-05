# DepthEstimation
## Description

The ml5.js DepthEstimation module loads a pre-trained model to infer a depth map from an image or video. In use, it tries to estimate the distance between the camera that captured the image, and every pixel on said image. This can be used on images and videos taken previously with other cameras, or real-time capture with a webcam.

By default, ml5.js DepthEstimation uses the Depth Anything model, but also supports the Tensorflow AR Portrait Depth model.

## Supported Models

DepthEstimation supports different neural network architectures depending on the model selected:

* **DepthAnything** (default): This model loads [onnx-community/depth-anything-v2-small](https://huggingface.co/onnx-community/depth-anything-v2-small), an ONNX version of the [Depth Anything V2](https://depth-anything-v2.github.io/) model. It is a general purpose monocular (for images taken by cameras with one lens) depth estimation model trained on a combination of 595 thousand synthetic labeled images and 62 million real unlabeled images.
* **ARPortraitDepth**: This model loads Tensorflow's [ARPortraitDepth](https://blog.tensorflow.org/2022/05/portrait-depth-api-turning-single-image.html). This model uses a light-weight U-Net architecture to estimate depth *specifically for portrait photos*, with unreliable results for any other kind of image. Because of this single purpose, the model also loads and uses [MediaPipe SelfieSegmentation](https://chuoling.github.io/mediapipe/solutions/selfie_segmentation.html) behind the scenes, to first isolate the subject from the background before running depth estimation. The mask that the segmentation creates is available for use through ml5, see the [Methods section](#depthestimationresult) for more details and the [Mask Background example](https://editor.p5js.org/ml5/sketches/zxi8xUuq4) for an implementation example.

## Quick Start

Get up and running with the [webcam example](https://editor.p5js.org/ml5/sketches/1AlSdDhwA), which shows a realtime depth map estimated from the webcam video.

</br>

[DEMO](iframes/depthestimation ":include :type=iframe width=100% height=550px")

## Examples
- [Webcam](https://editor.p5js.org/ml5/sketches/1AlSdDhwA): Show the live depth map of the video captured by the webcam.
- [Video](https://editor.p5js.org/ml5/sketches/YGAqvhn1o): Generate the depth map of a video file as it plays.
- [Single Image](https://editor.p5js.org/ml5/sketches/VpVUFgtOU): Depth map of an image using single frame estimation.
- [Mask Background](https://editor.p5js.org/ml5/sketches/zxi8xUuq4): Showcases how to mask out the background from the depth result.
- [Point Cloud](https://editor.p5js.org/ml5/sketches/7EOC8txJ1): Creates a live 3D point cloud visualization of the webcam video.
- [Mesh](https://editor.p5js.org/ml5/sketches/CE2f9l38k): Creates a live 3D mesh geometry of the webcam video.

## Step-by-Step Guide
### Initialization and Options
Before starting, make sure you have included the ml5 library in your `index.html` file:

```html
<script src="https://unpkg.com/ml5@1/dist/ml5.js"></script>
```

?> For more information on importing the ml5 library, check out the [Getting Started](/?id=set-up-ml5js) page.

Make sure to use `async` and `await` to load the model. This step ensures that it is fully loaded before the `draw()` function begins.

```javascript
// Make sure to add "async" before "function setup()".
async function setup() {
  // Wait until the DepthAnything model is fully loaded.
  depthEstimator = await ml5.depthEstimation();
}
```

?> If you would like to use the `ARPortraitDepth` model instead, or specify configuration options for the model, you can pass these as arguments to the `ml5.depthEstimation(?modelName, ?options)` method. See the [ml5.depthEstimation() method](#ml5depthestimation) for more details.

### Estimating Depth
As with many other ml5 models, you have two options to run depth estimation on the image, video or webcam of your choice: _Continuous Estimation_ and _Single Frame Estimation_ .

For any of these, make sure you first load the image, video or start the webcam capture. This is the media we will pass to the model.

#### Continuous Estimation
This method is used to continuously estimate depth on every frame of a video or webcam feed.
```javascript
async function setup() {
// Create the video capture element
  webcam = createCapture(VIDEO);

  // Wait until the DepthAnything model is fully loaded.
  depthEstimator = await ml5.depthEstimation();

  // Start continuous depth estimation on the webcam feed
  depthEstimator.estimateStart(webcam, gotResults);
}

function gotResults(result) {
  // The most recent depth map is in the result object!
}
```
Using this method, the depth estimator will take care of doing estimation of a frame and waiting for it to finish before working on the next frame. Any time a depth map is ready, it will fire the callback function to provide it.

#### Single Frame Estimation
This method is used to estimate depth once, for a single image:
```javascript
async function setup() {
  // Load you image here
  // Wait until the DepthAnything model is fully loaded.
  depthEstimator = await ml5.depthEstimation();
  // Estimate depth from the loaded image
  depthEstimator.estimate(img, gotResults);
}

function gotResults(result) {
  // The depth map is in the result object!
}
```
Because the estimation takes time, we pass in a callback function that will fire when estimation is ready. The `estimate` method is called in setup because it **will only run once**. If calling it multiple times, it is prudent to wait for each operation to finish before starting the next one, or consider using continuous estimation and starting/stopping to fit your needs.

### Using the Depth Result
Whenever the callback function fires, we have access to the depth result that contains all the depth information.
```javascript
let depthMap;

function gotResults(result) {
    // Save the depth result in a variable
    depthMap = result;
}
```
The `result` is a `DepthEstimationResult` object that contains the depth map and other relevant data. Save it to variable so you can use it inside the p5 `draw()` loop!

For more information, on the structure and data contained in the result, check out [DepthEstimationResult Structure](#depthestimationresult) below.

## Methods

### ml5.depthEstimation()

This method is used to initialize the depth estimation object.

<!-- In p5.js 1.x.x, use it inside the `preload()` function:

```javascript
const depthEstimator = ml5.depthEstimation(?options);
``` -->

In p5.js 2.0, use it in the `async function setup()`:

```javascript
const depthEstimator = await ml5.depthEstimation(?modelName, ?options);
```
**Parameters:**
- **modelName**: (optional) 
  - Default: `DepthAnything`
  - Accepted values: `DepthAnything`, `ARPortraitDepth`

- **options**: (optional)
  - `flipHorizontal`: Used to mirror the depth map horizontally
    - Default: `false` 
    - Accepted values: `true`, `false` (boolean).
  - `dilationFactor`: Only compatible with the **ARPortraitDepth** model. Sets how many pixels around the detected edges of a person should be ignored. Used to clean the edges of the depth map.
    - Default: `4`
    - Accepted values: `0` to `10` (integer).
  - `colormap`: Defines how the depth map is drawn; either Grayscale, mapping depth from black (far) to white (close), or Color, mapping depth using the whole range of color hues.
    - Default: `'GRAYSCALE'`
    - Accepted values: `'GRAYSCALE'` or `'COLOR'` (string).
  - `minDepth`: Sets the depth value that will map to the 'close' color. This is only used if enableSmoothing is set to `false`.
    - Default: `0`
    - Accepted values: `0` to `1` (float). Must be less than `maxDepth`.
  - `maxDepth`: Sets the depth value that will map to the 'far' color.
    - Default: `1`
    - Accepted values: `0` to `1` (float). Must be greater than `minDepth`. This is only used if enableSmoothing is set to `false`.
  - `enableSmoothing`: Whether to do a fixed mapping of depth value max and min (using maxDepth and minDepth) or smooth it across frames; recording the lowest and highest values detected in the depth map on every frame and using them as the mapping limits.
    - Default: `false`
    - Accepted values: `true`, `false` (boolean). Setting to `true` will ignore `minDepth` and `maxDepth` options
  - `smoothingFactor`: Only used if enableSmoothing is set to `true`. Sets how much to smooth the varying maximum and minimum depth values between frames. Higher values result in faster reaction to changes. Lower values result in smoother changes.
    - Default: `0.5`
    - Accepted values: `0` to `1` (float).
  - `device`: Only compatible with the **DepthAnything** model. Used to specify the hardware backend that runs the model. `'wasm'` runs the model on CPU using WebAssembly, whereas `'webgpu'` uses the browser's WebGPU API to run the model on a GPU. Not all browsers support this API at the moment.
    - Default: Automatic detection of the best performing device available in the browser running the sketch.
    - Accepted values: `'webgpu'`, `'wasm'`.
  - `dtype`: Only compatible with the **DepthAnything** model. Used to set the numerical precision of the model's weights and activations. Higher precision trades performance speed for high fidelity output. Lower precision trades output fidelity for fast performance.
    - Default: Automatically sets `'fp16'` when using `'webgpu'` and `'q8'` when using `'wasm'`.
    - Accepted values: `'fp16'` (half-precision), `'uint8'` or `'int8'` (8-bit), `'q4'` or `'q4f16'`or `'bnb4'` (4-bit).

**Returns:**

- **Object**: `depthEstimation` object that contains the methods to run estimation.

### depthEstimator.estimateStart()
This method is used for _Continuous Estimation_: estimating depth on a video/webcam continuously, for each frame. Calling it will initiate an estimation loop, running until `depthEstimator.estimateStop()` is called.

```javascript
depthEstimator.estimateStart(media, callback)
```

**Parameters:**

- **media**: An HTML or p5.js image, video, or canvas element to estimate a depth map for continuously.
- **callback(result)**: A callback function that will be called *every time* an estimation result is available. The `result` is a `DepthEstimationResult` object. Check the section on it below for details on its structure.

### depthEstimator.estimateStop()
This method is used to stop an estimation loop that was previously started by a call to `depthEstimator.estimateStart()`.

```javascript
depthEstimator.estimateStop()
```

### depthEstimator.estimate()
This method is used for _Single Frame Estimation_: estimating depth one time on a single image or video/webcam frame.

```javascript
depthEstimator.estimate(media, callback)
```

**Parameters:**

- **media**: An HTML or p5.js image, video, or canvas element to estimate a depth map for.
- **callback(result)**: A callback function that will be called when estimation is ready. The `result` is a `DepthEstimationResult` object. Check the section on it below for details on its structure.


### DepthEstimationResult
This is the object that is passed as an argument to the callback functions of `depthEstimator.estimateStart()` or `depthEstimator.estimate()`. It contains the result of the depth estimation process and other useful relevant data

These are its properties:

- `image`: A p5 image of the depth map in the chosen colormap.
  - Type: `p5.Image` object
- `getDepthAt(x, y)`: Function that returns the depth value of the pixel at `x, y`.
  - Type: Function.
  - Returns: Floating point number in the 0 - 1 range.
- `data`: The raw depth values for each pixel in a two dimensional array format.
  - Type: 2D array of floating point numbers in the 0 - 1 range.
- `mask`: Only available when using the **ARPortraitDepth** model. A mask of the people detected in the image. It can be used directly with the `mask()` function in p5.
  - Type: `p5.Image` object
- `sourceFrame`: The exact frame that was analyzed to create the depth map. Because depth estimation is not immediate, the result can fall out of sync from the source video. By using this value instead of the video, the depth data is guaranteed to be in sync. See a [demo sketch](https://editor.p5js.org/ml5/sketches/W8irRhKOw) showcasing the difference.
  - Type: `p5.Image`
- `width`: Width of the depth map
  - Type: number (integer)
- `height`: Height of the depth map
  - Type: number (integer)

## Learn more
Check out the community article [Finding the Z-axis](https://ml5js.org/blog/bringing-depth-estimation/) to learn more about the way depth estimation was first implemented in ml5.
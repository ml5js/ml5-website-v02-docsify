# DepthEstimation
## Description

The ml5.js DepthEstimation module offers a pretrained model for inferring depth maps **from images of people**, estimating the distance between each pixel and the camera that captured the image. The model used is TensorFlow's [AR Portrait Depth](https://blog.tensorflow.org/2022/05/portrait-depth-api-turning-single-image.html) which is designed specifically for portrait images and does not perform very well with images of other types of subjects.

## Quick Start

Get up and running with the [webcam example](https://editor.p5js.org/nasif-co/sketches/Pep6DjEtD), which shows a realtime depth map estimated from the webcam video.

</br>

[DEMO](iframes/depthestimation ":include :type=iframe width=100% height=550px")

## Examples
- [Webcam](https://editor.p5js.org/nasif-co/sketches/Pep6DjEtD): Show the live depth map of the video captured by the webcam.
- [Video](https://editor.p5js.org/nasif-co/sketches/vifmzXg6o): Generate the depth map of a video file as it plays.
- [Single Image](https://editor.p5js.org/nasif-co/sketches/_TcZofgrt): Depth map of an image using single-shot estimation.
- [Mask Background](https://editor.p5js.org/nasif-co/sketches/Z_1xMhUPl): Showcases how to mask out the background from the depth result.
- [Point Cloud](https://editor.p5js.org/nasif-co/sketches/VbT8hEoDz): Creates a live 3D point cloud visualization of the webcam video.
- [Mesh](https://editor.p5js.org/nasif-co/sketches/X-e1DEZr4): Creates a live 3D mesh geometry of the webcam video.

## Step-by-Step Guide
### Initialization and options
Before starting, make sure you have included the ml5 library in your `index.html` file:

```html
<script src="https://unpkg.com/ml5@1/dist/ml5.js"></script>
```

?> For more information on importing the ml5 library, check out the [Getting Started](/?id=set-up-ml5js) page.

Create an  instance of `ml5.depthEstimation` in your preload function, to allow the model to load
```js
function preload() {
  depthEstimator = ml5.depthEstimation({
    // Use options here to configure how the model behaves. 
    // See a full list of options below, in the 'Methods' section of this reference page
  });
}
```
For the full list of options, check out the [methods section](#ml5depthestimation) below!

#### p5.js 2.0
You can also use this module with p5.js 2.0! Instead of creating `ml5.depthEstimation` in preload, do it using your async `setup()` and `await`:
```js
async function setup() {
  // Load the depth estimation model
  depthEstimator = await ml5.depthEstimation({
    // Options go here
  });
  //the rest of your setup goes here
}
```

### Estimating depth
As with many other ml5 models, you have two options to run depth estimation on the image, video or webcam of your choice: _Continuous Estimation_ and _Single Shot Estimation_ .

For any of these, make sure you first load the image, video or start the webcam capture. This is the media we will pass to the model.

#### Continuous estimation
This method is used to continuously estimate depth on every frame of a video or webcam feed.
```js
// Make sure to load the model in preload or async in p5 2.0!
function setup() {
// Create the video capture element
  webcam = createCapture(VIDEO);

  // Start continuous depth estimation on the webcam feed
  depthEstimator.estimateStart(webcam, gotResults);
}

function gotResults(result) {
  // The most recent depth map is in the result object!
}
```
Using this method, the depth estimator will take care of doing estimation of a frame and waiting for it to finish before working on the next frame. Any time a depth map is ready, it will fire the callback function to provide it.

#### Single shot estimation
This method is used to estimate depth once, for a single image:
```js
// Make sure to load the image and the model in preload or asyn in p5 2.0!
function setup() {
  // Estimate depth from the loaded image
  depthEstimator.estimate(img, gotResults);
}

function gotResults(result) {
  // The depth map is in the result object!
}
```
Because the estimation takes time, we pass in a callback function that will fire when estimation is ready. The `estimate` method is called in setup because it **will only run once**. If calling it multiple times, it is prudent to wait for each operation to finish before starting the next one.

### Using the depth result
Whenever the callback function fires, we have acces to the depth result that contains all the depth information.
```js
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

In p5.js 1.x.x, use it inside the `preload()` function:

```js
const depthEstimator = ml5.depthEstimation(?options);
```

In p5.js 2.0, use it in the `async setup()`:

```js
const depthEstimator = await ml5.depthEstimation(?options);
```


**Options:**

- `flipHorizontal`: Used to mirror the depth map horizontally
  - Default: `false` 
  - Accepted values: `true`, `false` (boolean).
- `dilationFactor`: Sets how many pixels around the detected edges of a person should be ignored. This is useful because depth values are inaccurate and noisy around the contours.
  - Default: `4`
  - Accepted values: `0` to `10` (integer).
- `colormap`: Defines how the depth map is drawn; either Grayscale, mapping depth from black (far) to white (close), or Color, mapping depth using the whole range of color hues.
  - Default: `'GRAYSCALE'`
  - Accepted values: `'GRAYSCALE'` or `'COLOR'` (string).
- `minDepth`: Sets the depth value that will map to the 'close' color.
  - Default: `0.2`
  - Accepted values: `0` to `1` (float). Must be less than `maxDepth`.
- `maxDepth`: Sets the depth value that will map to the 'far' color.
  - Default: `0.75`
  - Accepted values: `0` to `1` (float). Must be greater than `minDepth`.
- `normalizeDynamically`: Whether to do a manual mapping (using maxDepth and minDepth) or do it dynamically; recording the lowest and highest values detected in the depth map on every frame and using them as the mapping limits. This means that any particular color will not always represent the same absolute distance from the screen.
  - Default: `false`
  - Accepted values: `true`, `false` (boolean). Setting to `true` will ignore `minDepth` and `maxDepth` options
- `normalizationSmoothingFactor`: Only used if normalizing dynamically. Sets how much to smooth the varying maximum and minimum depth values detected during normalization. Higher values result in faster reaction to changes. Lower values result in smoother changes.
  - Default: `0.5`
  - Accepted values: `0` to `1` (float).

**Returns:**

- **Object**: `depthEstimation` object that contains the methods to run estimation.

### depthEstimator.estimateStart()
This method is used for _Continuous Estimation_: estimating depth on a video/webcam continuously, for each frame. Calling it will initiate an estimation loop, running until `depthEstimator.estimateStop()` is called.

```js
depthEstimator.estimateStart(media, callback)
```

**Parameters:**

- **media**: An HTML or p5.js image, video, or canvas element to estimate a depth map for continuously.
- **callback(result)**: A callback function that will be called *every time* an estimation result is available. The `result` is a `DepthEstimationResult` object. Check the section on it below for details on its structure.

### depthEstimator.estimateStop()
This method is used to stop an estimation loop that was previously started by a call to `depthEstimator.estimateStart()`.

```js
depthEstimator.estimateStop()
```

### depthEstimator.estimate()
This method is used for _Single Shot Estimation_: estimating depth one time on a single image or video/webcam frame.

```js
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
- `mask`: The mask of the people detected in the image and for whom depth values were estimated. It can be used directly with the `mask()` function in p5.
  - Type: `p5.Image` object
- `sourceFrame`: The exact frame that was analyzed to create the depth map. Because depth estimation is not immediate, the result can fall out of sync from the source video. By using this value instead of the video, the depth data is guaranteed to be in sync. See a [demo sketch](https://editor.p5js.org/nasif-co/sketches/Z_1xMhUPl) showcasing the difference.
  - Type: `p5.Image`
- `width`: Width of the depth map
  - Type: number (integer)
- `height`: Height of the depth map
  - Type: number (integer)

## Learn more
Check out the community article [Finding the Z-axis](https://ml5js.org/blog/bringing-depth-estimation/) to learn more about the way depth estimation was implemented in ml5.
# BodyPix


<center>
    <img style="display:block; max-height:20rem" alt="BodyPix Header Image of Harriet Tubman" src="_media/reference__header-bodypix.png">
</center>


## Description
As written by the developers of BodyPix:

"Bodypix is an open-source machine learning model which allows for person and body-part segmentation in the browser with TensorFlow.js. In computer vision, image segmentation refers to the technique of grouping pixels in an image into semantic areas typically to locate objects and boundaries. The BodyPix model is trained to do this for a person and twenty-four body parts (parts such as the left hand, front right lower leg, or back torso). In other words, BodyPix can classify the pixels of an image into two categories: 1) pixels that represent a person and 2) pixels that represent background. It can further classify pixels representing a person into any one of twenty-four body parts."

## Quickstart

```js
const bodypix = ml5.bodyPix(modelReady);

function modelReady() {
  // segment the image given
  bodypix.segment(img, gotResults);
}

function gotResults(error, result) {
  if (error) {
    console.log(error);
    return;
  }
  // log the result
  console.log(result.backgroundMask);
}
```

### Descripton

As written by the developers of BodyPix:

"Bodypix is an open-source machine learning model which allows for person and body-part segmentation in the browser with TensorFlow.js. In computer vision, image segmentation refers to the technique of grouping pixels in an image into semantic areas typically to locate objects and boundaries. The BodyPix model is trained to do this for a person and twenty-four body parts (parts such as the left hand, front right lower leg, or back torso). In other words, BodyPix can classify the pixels of an image into two categories: 1. pixels that represent a person and 2. pixels that represent background. It can further classify pixels representing a person into any one of twenty-four body parts."

### Methods

#### ml5.bodyPix()

This method is used to initialize the bodyPix object.

```javascript
const bodyPix = ml5.bodyPix(?video, ?options, ?callback);
```

**Parameters:**

- **video**: OPTIONAL. An HTMLVideoElement or p5.Video to run the segmentation on.

- **options**: OPTIONAL. An object to change the default configuration of the model. The default and available options are:

  ```javascript
  {
    architecture: "ResNet50", // "MobileNetV1" or "ResNet50"
    multiplier: 1, // 0.5, 0.75 or 1
    outputStride: 16, // 8, 16, or 32
    quantBytes: 2, //1, 2 or 4
  }
  ```

  More info on options [here](https://github.com/tensorflow/tfjs-models/tree/master/body-segmentation/src/body_pix#create-a-detector).

- **callback(bodyPix, error)**: OPTIONAL. A function to run once the model has been loaded. Alternatively, call `ml5.bodyPix()` within the p5 `preload` function.

**Returns:**  
The bodyPix object.

#### bodyPix.segment()

This method allows you to run segmentation on an image.

```javascript
bodyPix.segment(?input, callback);
```

**Parameters:**

- **input**: HTMLImageElement, HTMLVideoElement, ImageData, or HTMLCanvasElement. NOTE: Videos can be added through `ml5.bodyPix`.

- **callback(output, error)**: A function to handle the output of `bodyPix.segment()`. Likely a function to do something with the segmented image. See below for the output passed into the callback function:

  ```javascript
  {
    backgroundMask,
    bodyParts,
    partMask,
    personMask,
    raw: { backgroundMask, partMask, personMask },
    segmentation: [{ mask, maskValueToLabel}, ...],
  }
  ```

### Examples

TODO (link p5 web editor examples once uploaded)
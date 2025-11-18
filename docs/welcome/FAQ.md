# FAQ

<center>
  <img class="header-img" src="assets/header-faq.png" alt="Frequently Asked Question Header Image" >
  <p class="img-credit"> Image Credit: <a href="https://thenounproject.com/creator/purpleiconn/" target="_blank" title="Purple iconn">Purple iconn</a> | <a href='https://forms.gle/5EpwYabG8hLn4p926' target="contribute-form">Contribute ♥️</a> </p>
</center>

## What happened to older ml5.js releases?
We noticed that many people have experienced issues with the library recently, seeing errors such as *"... is not a function"*. <img class="inline-img" src="assets/faq-cry.png" alt="tip icon" aria-hidden="true"> This is most likely due to code that was written for the library prior to the recent 1.0 release. The following should help you resolve any errors! <img class="inline-img" src="assets/faq-dizzy.png" alt="tip icon" aria-hidden="true"> <img class="inline-img" src="assets/faq-purple-heart.png" alt="tip icon" aria-hidden="true">

### Quick Fix!
In the ml5 library's script tag, change latest to 0.12.2. If you are using p5.js, you can find the script tag in the index.html file of your p5 sketch.

Change this:

```html
<script src="https://unpkg.com/ml5@latest/dist/ml5.min.js"></script>
```

to this:

```html
<script src="https://unpkg.com/ml5@0.12.2/dist/ml5.min.js"></script>
```

Hope this works! <img class="inline-img" src="assets/faq-crossed-fingers.png" alt="tip icon" aria-hidden="true">

### Why are there errors?
We recently released a new version of the library, updating from version `0.12.2` to `1.0.1` (yay!!!). The library was re-designed be even friendlier, and included several breaking changes. Some functions from the previous version (`0.12.2`) no longer exist in `1.0.1`. For example, `poseNet.on("pose", gotPose)` has been removed and changed to `bodyPose.detectStart(video, gotPose)`.

The `ml5@latest` tag automatically uses the latest version of the library, which is version `1.0.1`. If you are on version `1.0.1` and attempt to call a function that has been removed, you will likely see the *"... is not a function"* error. By specifying `ml5@0.12.2` in the script tag, you can continue using the previous version of the library and call the now deprecated functions.

Since we have passed the `1.0.0` landmark, we will be following semantic versioning for future releases. Going forward, we recommend specifying a major version number in the script tag, such as `ml5@1`. Using `ml5@latest` might cause issues if and when there are additional breaking changes.

### Can I still access the older releases of the ml5.js, website and documentation?
We will still host version `0.12` of the library, however, it will no longer receive feature updates. You can still use the older versions of the library by specifying `ml5@0.12.2` (or earlier versions) in the `script` tag, just as what was done in the [Quick Fix](/welcome/faq?id=quick-fix) above.

The [archived website](https://archive.ml5js.org/) and [documentation](https://archive-docs.ml5js.org/) cover materials for versions `0.12` and earlier. 

We recommend giving the new library a try! The new reference document is a great place to start as well as a collection of example sketches showcasing the models and functions!

### ml5.js 0.12.2 models and functions

#### Updated new models!
- FeatureExtractor - coming back soon! (use 0.12.2 for now)
- ObjectDetection - coming back soon! (use 0.12.2 for now)
- PoseNet - Updated! (now BodyPose)
- BodyPix - Updated! (now BodySegmentation)
- HandPose - Updated! Still HandPose!
- FaceMesh - Updated! Still FaceMesh!
- FaceApi - Deprecated, use FaceMesh instead!
- UNet - Deprecated, use BodySegmentation instead!
- Image Classification - the same!
- Sound Classification - the same!
- Sentiment Analysis - the same!
- Neural Network – mostly the same, updates for neuroevolution!

#### Deprecated, use 0.12.2
- KNNClassifer - coming soon?
- kmeans - coming soon?
- StyleTransfer
- pix2pix
- CVAE
- DCGan
- SketchRNN
- PitchDetection
- CharRNN
- Word2Vec

## Can I always use ml5.js in the p5.js web editor?

Mostly!

Some of the ml5.js sketches don't currently work in the [p5.js web editor](https://editor.p5js.org/). This is due to how the editor handles data files and network communication regarding making requests to external data, such as the large model files ml5.js uses.

There are lots of developments in the p5.js web editor as well as in ml5.js to make sure these environments all play nicely together. If something doesn't work in the web editor, the best thing to do is to try and run things locally if possible.

## Can I use ml5.js with node.js?

Not at the moment.

ml5.js uses TensorFlow.js, which uses the browser's GPU to run all the calculations. As a result, all of the ml5.js functionalities are based around using the browser GPU. We hope to have ml5.js run in node.js sometime in the near future (especially now that [node.js supports TensorFlow.js](https://www.tensorflow.org/js/guide/nodejs)), but the current ml5.js setup does not support node.js.

For more discussion about node.js and ml5.js, visit this [issue thread](https://github.com/ml5js/ml5-library/issues/377).

<br>

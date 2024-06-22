# FAQ

<center>
  <img class="header-img" src="assets/header-faq.png" alt="Frequently Asked Question Header Image" >
  <p class="img-credit"> Image Credit: <a href="https://thenounproject.com/creator/purpleiconn/" target="_blank" title="Purple iconn">Purple iconn</a> | <a href='mailto:info@ml5js.org'>Contribute ♥️</a> </p>
</center>

## Can I always use ml5.js in the p5.js web editor?

Mostly!

Some of the ml5.js sketches don't currently work in the [p5.js web editor](https://editor.p5js.org/). This is due to how the editor handles data files and network communication regarding making requests to external data, such as the large model files ml5.js uses.

There are lots of developments in the p5.js web editor as well as in ml5.js to make sure these environments all play nicely together. If something doesn't work in the web editor, the best thing to do is to try and run things locally if possible.

## Can I use ml5.js with node.js?

Not at the moment.

ml5.js uses TensorFlow.js, which uses the browser's GPU to run all the calculations. As a result, all of the ml5.js functionalities are based around using the browser GPU. We hope to have ml5.js run in node.js sometime in the near future (especially now that [node.js supports TensorFlow.js](https://www.tensorflow.org/js/guide/nodejs)), but the current ml5.js setup does not support node.js.

For more discussion about node.js and ml5.js, visit this [issue thread](https://github.com/ml5js/ml5-library/issues/377).

## What happened to older ml5.js releases?

We are constantly updating the library, but you can still access older versions at any time by changing the version number in your script. The [archived website](https://archive.ml5js.org/) and [documentation](https://archive-docs.ml5js.org/) cover materials for versions `0.12.2` and earlier.

<br>

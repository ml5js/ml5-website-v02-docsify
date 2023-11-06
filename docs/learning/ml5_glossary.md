# Ml5 Glossary

<br/>

Have you ever felt confused about a term we used here at ml5? No worries, we've got you covered! Check out this glossary. Here, we explain and define programming techniques and machine learning terms specific to ml5 that are mentioned in our libraries, website, and examples. 

This glossary is designed to be editable by any ml5 user. If you have a term you'd like to add or update, please do! We'd love to hear from you. Click the `Edit Document` button on the top right of this page to see the source code and create a pull request. Please don’t mind if you don’t know what we are talking about, you can also contribute through this google form! 👉 [ml5 Glossary Contribution Form](https://docs.google.com/forms/d/e/1FAIpQLScJo6XU1-D1rDkuUIKSs7wx6svpZtw6p9vBPHdQvKPxpq-ERA/viewform?usp=pp_url)

<!-- tabs:start -->

#### **A**

#### **B**

#### **C**

---
### Callback
ml5.js is heavily inspired by the syntax, patterns and style of the [p5.js](https://p5js.org/) library. However, there are several differences in how asynchronous operations are handled by ml5.js. ml5.js supports both <b>error-first callbacks</b> and Promises in all methods.

In [p5.js](https://p5js.org/), [callbacks](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function) are passed as arguments to functions that often perform some asynchronous operation. For example, [p5.js](https://p5js.org/) defines the [**loadJSON()**](https://p5js.org/reference/#/p5/loadJSON) function as the following:

```js
loadJSON('http//example.com/data.json', (results) => {
  // Do something with the results
});
```

Notice that the results from the callback in [p5.js](https://p5js.org/) are given as the only argument to the function. There is no error argument in the callback.

ml5.js, on the other hand, uses a pattern referred to as an <b>error-first callback</b>:

> With this pattern, a callback function is passed to the method as an argument. When the operation either completes or an error is raised, the callback function is called with the Error object (if any) passed as the first argument. If no error was raised, the first argument will be passed as null. [Taken from the Node.js documentation](https://nodejs.org/api/errors.html#errors_error_first_callbacks)

For example if you are using the **imageClassifier()** method, you will need to construct it in the following way:

```js
// Pass a callback function to constructor
const classifier = ml5.imageClassifier('MobileNet', (err, model) => {
  console.log('Model Loaded!');
});

// Make a prediction with the selected image and pass a callback function with two arguments
classifier.predict(image, (err, results) => {
  // Check for errors. If no errors, then do something with the results
});
```

Error first callbacks is a convention common to many JavaScript libraries that we have chosen to adopt. The language JavaScript itself does not enforce this pattern. Keep in mind that most ml5.js methods and functions are asynchronous (machine learning models can take significant amounts of time to process inputs and generate outputs!). You will need to use the <b>error-first callback</b> pattern if you want to use callbacks.

---
### Confidence
Confidence is a measure of how certain a machine learning model is about its prediction. For example, a machine learning model that is 100% confident in its prediction is certain that its prediction is correct. A machine learning model that is 0% confident in its prediction is certain that its prediction is incorrect. In ml5.js, confidence is often used to evaluate the performance of a machine learning model.

---
### Classifier
A classifier is a machine learning model that is used to classify data. For example, a classifier could be used to classify images of cats and dogs.

---
### Classification
Classification is the process of assigning a label to a piece of data. For example, a machine learning model could be used to classify images of cats and dogs.

#### **D**

---
### Dataset
A dataset is a collection of data. Datasets are often used to train machine learning models. For example, a dataset of images of cats and dogs could be used to train a machine learning model to classify images of cats and dogs. In ml5.js, datasets are often used to train custom machine learning models.

---
### Div
A div is an HTML element that is used to define a section of a webpage. In ml5.js, divs are often used to display the output of a machine learning model.

---
### Dependencies
Dependencies are libraries that are required by another library.

#### **E**

#### **F**
---
### Feature
A feature is an individual measurable property or characteristic of a phenomenon being observed. For example, a feature of a cat could be its weight, or the color of its fur. Here, we have three samples of data, each with two features (weight and color of the fur) and a label (cat or dog).

| Sample # | Weight | Color of the fur | Label |
|----------|--------|------------------|-------|
| sample 1 | 5.8kg  | white            | Cat   |
| sample 2 | 36kg   | golden           | Dog   |
| sample 3 | 3.2kg  | black            | Cat   |

In machine learning, features are used to represent the phenomenon being observed in a way that a machine learning algorithm can understand. For example, a cat could be represented by a feature vector of its weight and the color of its fur. Color could be represented as a number, such as 0 for white, 1 for black, and 2 for golden.

| Sample # | Feature Vector | Label |
|----------|----------------|-------|
| sample 1 | (5.8, 0)       | Cat   |
| sample 2 | (36, 2)        | Dog   |
| sample 3 | (3.2, 1)       | Cat   |

In ml5.js, features are often used to represent the input to a machine learning model. For instance, the example given by the [Neural Networks](/reference/neural-network) uses the following data to train the model to predict the color of an object:

```js
// Step 1: load data or create some data 
const data = [
  {r:255, g:0, b:0, color:'red-ish'},
  {r:254, g:0, b:0, color:'red-ish'},
  {r:253, g:0, b:0, color:'red-ish'},
  {r:0, g:255, b:0, color:'green-ish'},
  {r:0, g:254, b:0, color:'green-ish'},
  {r:0, g:253, b:0, color:'green-ish'},
  {r:0, g:0, b:255, color:'blue-ish'},
  {r:0, g:0, b:254, color:'blue-ish'},
  {r:0, g:0, b:253, color:'blue-ish'}
];

...

// Step 4: add data to the neural network
data.forEach(item => {
  const inputs = {
    r: item.r, 
    g: item.g, 
    b: item.b
  };
  const output = {
    color: item.color
  };

  nn.addData(inputs, output);
});

...
```

Here, the example uses the values of red, green, and blue color channels as features.

| Sample # | Feature Vector | Label     |
|----------|----------------|-----------|
| sample 1 | (255, 0, 0)    | red-ish   |
| sample 2 | (254, 0, 0)    | red-ish   |
| sample 3 | (253, 0, 0)    | red-ish   |
| sample 4 | (0, 255, 0)    | green-ish |
| sample 5 | (0, 254, 0)    | green-ish |
| sample 6 | (0, 253, 0)    | green-ish |
| sample 7 | (0, 0, 255)    | blue-ish  |
| sample 8 | (0, 0, 254)    | blue-ish  |
| sample 9 | (0, 0, 253)    | blue-ish  |


#### **G**

#### **H**
---
### Hyperparameters
Hyperparameters are parameters that are set before training a machine learning model. Hyperparameters are parameters that are set before training a machine learning model. Hyperparameters are often used to control the training process of a machine learning model. In ml5.js, hyperparameters are often used to control the training process of a machine learning model.

#### **I**

#### **J**

#### **K**

#### **L**
---
### Label
Labels are used to identify the class or category of a phenomenon being observed. For example, a label of a cat could be "cat". In machine learning, labels are used to identify the class or category of the phenomenon being observed. For example, a cat could be labeled as "cat". In ml5.js, labels are often used to identify the output of a machine learning model.

#### **M**
---
### MobileNet
By [Ellen Nickles](https://github.com/ellennickles/)
#### MobileNetV1 - Model Biography

* **Description**
  * MobileNet is a term that describes a type of machine learning model architecture that has been optimized to run on platforms with limited computational power, such as applications on mobile or embedded devices. MobileNets have several use cases, including image classification, object detection, and image segmentation. This particular MobileNet model was trained to detect people and 17 different key points on the body.
  * ml5 defaults using a MobileNet created with TensorFlow.js, a JavaScript library from TensorFlow, an open source machine learning platform developed by Google.
* **Developer and Year**
  * Google’s TensorFlow.js team. The TensorFlow version was ported to TensorFlow.js by Dan Oved in collaboration with Google Researchers, George Papandreou and [Tyler (Lixuan) Zhu](https://research.google/people/TylerZhu/).
* **Purpose and Intended Users**
  * From the website: TensorFlow is an open source machine learning platform that “has a comprehensive, flexible ecosystem of tools, libraries, and community resources that lets researchers push the state-of-the-art in ML and developers easily build and deploy ML-powered applications.” This model is available for use in the ml5 library because Tensorflow licenses it with Apache License 2.0.
* **Hosted Location**
  * As of June 2019, ml5 imports MobileNetV1 from TensorFlow, hosted on the NPM database. This means that your ml5 sketch will automatically use the most recent version distributed on NPM. 
* **ml5 Contributor and Year**
  * Ported by Cristóbal Valenzuela in 2018
* **References**
  * Website [TensorFlow](https://www.tensorflow.org/)
  * Developers [Dan Oved](https://www.danioved.com/), George Papandreou, and [Tyler (Lixuan) Zhu](https://research.google/people/TylerZhu/)
  * ml5 Contributor [Cristóbal Valenzuela](https://cvalenzuelab.com/)
  * GitHub Repository [TensorFlow.js Pose Detection in the Browser: PoseNet Model](https://github.com/tensorflow/tfjs-models/tree/master/posenet)
  * NPM Readme [Pose Detection in the Browser: PoseNet Model](https://www.npmjs.com/package/@tensorflow-models/posenet)
  * Article: [Real-time Human Pose Estimation in the Browser with TensorFlow.js](https://medium.com/tensorflow/real-time-human-pose-estimation-in-the-browser-with-tensorflow-js-7dd0bc881cd5)

#### MobileNetV1 - Data Biography
* **Description**
  * According to Dan Oved, the model was trained on images from the COCO dataset.
* **Source**
  * From the website: The COCO dataset is managed by a number of collaborators from both academic and commercial organizations for “large-scale object detection, segmentation, and captioning,” and according to the paper, images were collected from Flickr. 
* **Collector and Year**
  * The COCO database began in 2014.
* **Collection Method**
  * COCO methods for collecting images and annotating pixels into segments are described  in the paper.
* **Purpose and Intended Users**
  * The COCO dataset was created to advance computer vision research. 
* **References**
  - TensorFlow.js PoseNet Developer [Dan Oved](https://www.danioved.com/)
  - Paper [Microsoft COCO: Common Objects in Context](https://arxiv.org/abs/1405.0312)
  - Website [Microsoft COCO: Common Objects in Context](http://cocodataset.org/#home)

#### **N**
---
### Neural Network
A neural network is a machine learning model that is inspired by the structure of the brain. Neural networks are often used to solve problems that are difficult to solve with other machine learning techniques.

---
### NPM
NPM is a package manager for JavaScript. NPM is used to install and manage JavaScript libraries.

#### **O**
---
### Overfitting
Overfitting is a phenomenon that occurs when a machine learning model is trained to fit the training data too closely. Overfitting occurs when a machine learning model is trained to fit the training data too closely. Overfitting can result in a machine learning model that performs well on the training data, but performs poorly on new data. In ml5.js, overfitting is often used to describe the performance of a machine learning model.

---
### Output Stride
Output stride is a parameter used to control the resolution of the output of a machine learning model.

#### **P**
---
### Promises
ml5.js is heavily inspired by the syntax, patterns and style of the [p5.js](https://p5js.org/) library. However, there are several differences in how asynchronous operations are handled by ml5.js. ml5.js supports both <b>error-first callbacks</b> and Promises in all methods.

ml5.js supports [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). If no callback is provided to any asynchronous function then a Promise is returned.

With Promises, the image classification example can be used in the following way:

```js
// No callback needs to be passed to use Promises.
ml5
  .imageClassifier('MobileNet')
  .then(classifier => classifier.predict(image))
  .then((results) => {
    // Do something with the results
  });
```

For some video tutorials about Promises, you can find this [Coding Train playlist](https://www.youtube.com/playlist?list=PLRqwX-V7Uu6bKLPQvPRNNE65kBL62mVfx). There is also a [video tutorial about the ES6 arrow notation (**=>**)](https://youtu.be/mrYMzpbFz18).

---
### Prediction
A prediction is the output of a machine learning model. For example, a machine learning model that is trained to classify images of cats and dogs could make a prediction that an image is a cat.

---
### Pretrained Model
A pretrained model is a machine learning model that has been trained on a dataset. Pretrained models are often used to make predictions on new data. For example, a pretrained model that has been trained on a dataset of images of cats and dogs could be used to make predictions on new images of cats and dogs. In ml5.js, pretrained models are often used to make predictions on new data.

---
### Preload Function
The preload function is a function that is called before the setup function. In ml5.js, the preload function is often used to load assets, such as images, before the setup function is called.

#### **Q**

#### **R**

#### **S**
---
### Prediction
A prediction is the output of a machine learning model. For example, a machine learning model that is trained to classify images of cats and dogs could make a prediction that an image is a cat.

---
### Pretrained Model
A pretrained model is a machine learning model that has been trained on a dataset. Pretrained models are often used to make predictions on new data. For example, a pretrained model that has been trained on a dataset of images of cats and dogs could be used to make predictions on new images of cats and dogs. In ml5.js, pretrained models are often used to make predictions on new data.

---
### Preload Function
The preload function is a function that is called before the setup function. In ml5.js, the preload function is often used to load assets, such as images, before the setup function is called.

#### **Q**

#### **R**

#### **S**
---
### Prediction
A prediction is the output of a machine learning model. For example, a machine learning model that is trained to classify images of cats and dogs could make a prediction that an image is a cat.

---
### Pretrained Model
A pretrained model is a machine learning model that has been trained on a dataset. Pretrained models are often used to make predictions on new data. For example, a pretrained model that has been trained on a dataset of images of cats and dogs could be used to make predictions on new images of cats and dogs. In ml5.js, pretrained models are often used to make predictions on new data.

---
### Preload Function
The preload function is a function that is called before the setup function. In ml5.js, the preload function is often used to load assets, such as images, before the setup function is called.

#### **Q**

#### **R**

#### **S**
---
### Score
Score is a measure of how well a machine learning model performs on a given input. For example, a machine learning model that is 100% accurate has a score of 1. A machine learning model that is 0% accurate has a score of 0. In ml5.js, score is often used to evaluate the performance of a machine learning model.

---
### Score Threshold
Score threshold is often used to control the minimum score required for a machine learning model to make a prediction. In ml5.js, score threshold is often used to control the minimum score required for a machine learning model to make a prediction.

---
### Local Development Server
A local development server is a server that is used to launch/deploy a website or web application on a local machine.

#### **T**
---
### Test Data
Test data is a set of data used to test a machine learning model. Test data is used to evaluate the performance of a machine learning model. For example, a set of images of cats and dogs could be used to test a machine learning model to classify images of cats and dogs. In ml5.js, test data is often used to evaluate the performance of a custom machine learning model.

---
### Training Data
Training data is a set of data used to train a machine learning model. Training data is used to train a machine learning model to make predictions. For example, a set of images of cats and dogs could be used to train a machine learning model to classify images of cats and dogs. In ml5.js, training data is often used to train a custom machine learning model.

---
### Terminal
A terminal is a command line interface that is used to run commands on a computer. In ml5.js, a terminal is often used to run a local development server.

#### **U**
---
### Underfitting
Underfitting is a phenomenon that occurs when a machine learning model is trained to fit the training data too loosely. Underfitting occurs when a machine learning model is trained to fit the training data too loosely. Underfitting can result in a machine learning model that performs poorly on the training data, and performs poorly on new data. In ml5.js, underfitting is often used to describe the performance of a machine learning model.

#### **V**

#### **W**
---
### Weights
Weights are parameters that are used to train a machine learning model. Weights are often used to train a machine learning model. In ml5.js, weights are often used to train a machine learning model.

---
### Weights Quantization
Weights quantization is often used to reduce the size of a machine learning model.

#### **X**

#### **Y**

#### **Z**

<!-- tabs:end -->

<br/>


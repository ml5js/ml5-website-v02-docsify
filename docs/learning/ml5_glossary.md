# Ml5 Glossary

<br/>

Have you ever felt confused about a term we used here at ml5? No worries, we've got you covered! Check out this glossary. Here, we explain and define programming techniques and machine learning terms specific to ml5 that are mentioned in our libraries, website, and examples. 

This glossary is designed to be editable by any ml5 user. If you have a term you'd like to add or update, please do! We'd love to hear from you. Click the `Edit Document` button on the top right of this page to see the source code and create a pull request. Please don’t mind if you don’t know what we are talking about, you can also contribute through this google form! 👉 [ml5 Glossary Contribution Form](https://docs.google.com/forms/d/e/1FAIpQLScJo6XU1-D1rDkuUIKSs7wx6svpZtw6p9vBPHdQvKPxpq-ERA/viewform?usp=pp_url)

<!-- tabs:start -->

#### **🔼 Fold**

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
Confidence is a measure of how certain a machine learning model is about its prediction. For example, a machine learning model that is 100% confident in its prediction is certain that its prediction is correct. A machine learning model that is 0% confident in its prediction is certain that its prediction is incorrect.

In a classification task, we may get a confidence score for each class. For example, a machine learning model that is trained to classify images of cats and dogs could make a prediction that an image is a cat with a confidence score of 0.8, and a prediction that an image is a dog with a confidence score of 0.2. And we will select the class with the highest confidence score as the prediction of the machine learning model.

| Label | Confidence Score | Selected Class |
|-------|------------------|----------------|
| Cat   | 0.8              | ✅             |
| Dog   | 0.2              |                |

A similar example is given by the [Getting Started](/?id=your-first-sketch) of ml5 website. Here, we use the [Image Classifier](/reference/image-classifier) to classify an image of a bird and print out the label and confidence score of the prediction as follows:

```js
// A function to run when we get any errors and the results
function gotResult(error, results) {
  // Display error in the console
  if (error) {
    console.error(error);
  } else {
    // The results are in an array ordered by confidence.
    console.log(results);
    createDiv(`Label: ${results[0].label}`);
    createDiv(`Confidence: ${nf(results[0].confidence, 0, 2)}`);
  }
}
```

An output of the above code is as follows:

```js
[
  {
    label: "robin, American robin, Turdus migratorius"
    confidence: 0.9282158017158508
  },
  {
    label: "worm fence, snake fence, snake-rail fence, Virginia fence"
    confidence: 0.004057395737618208
  },
  {
    label: "brambling, Fringilla montifringilla"
    confidence: 0.0026653283275663853
  }
]
```

And we can see that the machine learning model is 92.82% confident that the image is a robin, and that is the selected class.

| Label | Confidence Score | Selected Class |
|-------|------------------|----------------|
| robin, American robin, Turdus migratorius | 0.9282158017158508 | ✅ |
| worm fence, snake fence, snake-rail fence, Virginia fence | 0.004057395737618208 | |
| brambling, Fringilla montifringilla | 0.0026653283275663853 | |

Let's take a look at another example in ml5.js, where the confidence score is used to represent how confident a machine learning model is about its prediction. The example given by the [BodyPose](/reference/bodypose) shows how to get the confidence score of each keypoint:

```js
for (let i = 0; i < poses.length; i++) {
  for (let k = 0; k < poses[i].pose.keypoints.length; k++) {
    // get each keypoint
    let point = poses[i].pose.keypoints[k];

    // get the position of each keypoint
    let x = point.position.x;
    let y = point.position.y;

    // get the confidence score of each keypoint
    let score = point.score;

    // get the name of each keypoint
    let partName = point.part;

    // draw an ellipse at each keypoint
    fill(0, 255, 0);
    ellipse(x, y, 5, 5);

    // mark the corresponding part name and confidence score at each keypoint
    text(partName, x + 15, y + 5);
    text(score.toFixed(2), x + 15, y + 20);
  }
}
```
We can use the confidence score to filter out keypoints that are not confident enough. For example, we can set a threshold of 0.5, and only draw keypoints that have a confidence score higher than 0.5:

```js
for (let i = 0; i < poses.length; i++) {
  for (let k = 0; k < poses[i].pose.keypoints.length; k++) {
    // get each keypoint
    let point = poses[i].pose.keypoints[k];

    // get the position of each keypoint
    let x = point.position.x;
    let y = point.position.y;

    // get the confidence score of each keypoint
    let score = point.score;

    // get the name of each keypoint
    let partName = point.part;

    // only draw an ellipse at each keypoint if the confidence score is higher than 0.5
    if (score > 0.5) {
      // draw an ellipse at the keypoint
      fill(0, 255, 0);
      ellipse(x, y, 5, 5);

      // mark the corresponding part name and confidence score at the keypoint
      text(partName, x + 15, y + 5);
      text(score.toFixed(2), x + 15, y + 20);
    }
  }
}
```

---
### Convolutional Neural Networks
Convolutional Neural Networks (CNN) are [neural networks](/learning/ml5_glossary?id=neural-network) tuned for the compression of images and video data. They are widely used in computer vision tasks such as image classification, object detection, and image segmentation.

Here is a simple explanation of how CNNs work:

Imagine you want to teach a computer to recognize pictures of cats. A Convolutional Neural Network (CNN) is like a smart robot that learns to see and understand these pictures.

1. Input Layer:

The robot looks at the picture, but instead of seeing the whole thing at once, it looks at small pieces, like tiny squares. Each square is called a "pixel."

| col1| col2| col3| col4|
|-----|-----|-----|-----|
| 120 | 50 | 200 | 75 |
| 30  | 180| 100 | 220|
| 90  | 45 | 150 | 25 |
| 10  | 160| 80  | 120|

2. Convolutional Layers:

The robot then slides a magnifying glass (filter) over these squares, focusing on a few at a time. It's like paying attention to specific patterns, like edges or colors, in small regions.

We apply the following filter to the input layer:

| col1| col2| col3|
|---|---|----|
| 1 | 0 | -1 |
| 1 | 0 | -1 |
| 1 | 0 | -1 |

And this is the result after applied the filter to the input layer:

| col1| col2| col3|
|---|---|----|
| 70 | -170 | 75 |
| 180 | 160 | -20 |
| -15 | 75 | -160 |
| -60 | 190 | 50 |

3. Activation Layers:

After looking at each region, the robot decides if it found something important. If it did, it gets excited and says, "Yep, there's a pattern here!" If not, it stays calm.

This is the result after applied the activation function (ReLu) to the result of the convolutional layer:

| col1| col2| col3|
|---|---|----|
| 70 | 0 | 75 |
| 180 | 160 | 0 |
| 0 | 75 | 0 |
| 0 | 190 | 50 |

4. Pooling Layers:

To keep things simple, the robot doesn't need to remember every tiny detail. It takes a step back and groups nearby excited regions together, making a smaller version of the picture. This is like summarizing the important parts.

After applying 2 x 2 max pooling to the result of the activation layer, we get the following result:

| col1| col2|
|---|---|
| 180 | 75 |
| 190 | 50 |

5. Fully Connected Layers:

Now, the robot thinks about the bigger picture. It looks at all the summarized information and decides, "Does this look like a cat or not?" It's making a final decision based on everything it has seen.

Assuming two neurons in the fully connected layer:

```js
Neuron 1: 0.3 * (180 + 75) + 0.5 = 144.5
Neuron 2: 0.8 * (190 + 50) - 0.2 = 155
```

6. Output Layer:

Finally, the robot gives its answer. If it's confident that the picture is a cat, it says, "Yes, that's a cat!" If not, it might say, "I'm not sure, but it doesn't really look like a cat to me."
The robot repeats this process many times, adjusting its magnifying glass and learning from its mistakes. Gradually, it becomes really good at spotting cats in pictures!

Softmax result:
- Cat Probability: 0.731 / (0.731 + 0.269) ≈ 0.731
- Not Cat Probability: 0.269 / (0.731 + 0.269) ≈ 0.269

So, in this complete example, the robot processes the input image through each step of the convolutional neural network (CNN) and ultimately predicts that the image contains a cat with a probability of approximately 73.1%.

In short, a CNN is like a robot that breaks down pictures, looks for important patterns, and decides what's in the picture step by step. It's fantastic for tasks like image recognition!

---
### Classification
Classification is the process of assigning a label to a piece of data. For example, a machine learning model that is trained to classify images of cats and dogs could assign the label "cat" to an image of a cat, and the label "dog" to an image of a dog. A classifier is the model that is trained to perform classification tasks.

The prediction of classification task is a class.

| Prediction |
|------------|
| Cat        |
| Dog        |

| Prediction |
|------------|
| Happy      |
| Sad        |

In contrast, the prediction of [regression](/learning/ml5_glossary?id=regression-analysis) task is a numerical value.

| Prediction |
|------------|
| 0.8        |
| 0.2        |


#### **D**

---
### Dataset
A dataset is a collection of data. Datasets are often used to train and test machine learning models. For example, a dataset of images of cats and dogs could be used to train a machine learning model to classify images of cats and dogs, and another dataset of images of cats and dogs could be used to test the performance of the machine learning model. You could compare the ground truth lables of the test dataset with the model predictions to evaluate the performance of the model.

See an example of a training dataset and a test dataset below. 

Training Dataset

| Sample # | [Feature Vector](/learning/ml5_glossary?id=feature) | Label |
|----------|----------------|-------|
| sample 1 | (5.8, 0)       | Cat   |
| sample 2 | (36, 2)        | Dog   |
| sample 3 | (3.2, 1)       | Cat   |

Test Dataset

| Sample # | [Feature Vector](/learning/ml5_glossary?id=feature) | Prediction Label | Ground Truth Label |
|----------|----------------|------------------|--------------------|
| sample 1 | (4.5, 0)       | ?                | Cat                |
| sample 2 | (30, 2)        | ?                | Dog                |

In ml5.js, you could train custom machine learning models with your own training datasets. For instance, the example given by the [Neural Networks](/reference/neural-network) uses the following training dataset to train the model to predict the color of an object:

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
```

And use the following test dataset to test the performance of the model:

```js
// Step 6: make a classification
function classify(){
  const input = {
    r: 255, 
    g: 0, 
    b: 0
  }
  nn.classify(input, handleResults);
}
```
Here, the training dataset and test dataset are as follows:

Training Dataset

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

Test Dataset

| Sample # | Feature Vector | Prediction Label | Ground Truth Label |
|----------|----------------|------------------|--------------------|
| sample 1 | (255, 0, 0)    | ?                | red-ish            |


---
### Div
A div is an HTML element that is used to define a section of a webpage. For instance, the following code defines a div and put a paragraph inside the div:

```html
<div>
  <p>This is a paragraph.</p>
</div>
```

In ml5.js, divs are often used to display the output of a machine learning model. For instance, the example given by the [Getting Started](/?id=your-first-sketch) uses the following code to display the label and confidence score of the prediction:

```js
// A function to run when we get any errors and the results
function gotResult(error, results) {
  // Display error in the console
  if (error) {
    console.error(error);
  } else {
    // The results are in an array ordered by confidence.
    console.log(results);
    createDiv(`Label: ${results[0].label}`);
    createDiv(`Confidence: ${nf(results[0].confidence, 0, 2)}`);
  }
}
```

---
### Dependencies
Dependencies are libraries that are required by a project. The project may import the methods and functions from the dependencies to use them. Before you run your project, you need to install all the dependencies of the project to make sure that the project runs properly. 

In ml5.js, you will install the dependencies of a project by running the following command:

```js
# install dependencies
npm install
```

or

```js
# install dependencies
yarn
```

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

#### **H**
---
### Hyperparameters
Hyperparameters are parameters that are set by coders before training a machine learning model. They are often used to control the training process of a machine learning model, for instance, the batch size, the epochs, the learning rate, and the number of hidden layers, etc. Batch size is the number of samples that are used to update the weights of a machine learning model in one iteration. Epochs is the number of times that a machine learning model is trained on the entire training dataset. Learning rate is the step size at each iteration while moving toward a minimum of a loss function. The number of hidden layers is the number of layers between the input layer and the output layer of a machine learning model.

An example on ml5.js website that uses hyperparameters is the [Neural Networks](/reference/neural-network) example. Here, we set the epochs to 32, and the batch size to 12:

```js
// Step 4: train the model
function trainModel(){
  const trainingOptions = {
    epochs: 32,
    batchSize: 12
  }
  nn.train(trainingOptions, finishedTraining);
}
```

#### **L**
---
### Label
Labels are used to identify the class or category of a phenomenon being observed. For example, a label of a cat image could be "cat". In the traning dataset, we need to provide the label for each sample of data to allow the model to learn the relationship between the features and the label. For example, the following training dataset contains three samples of data, each with two features (weight and color of the fur) and a label (cat or dog).

| Sample # | Weight | Color of the fur | Label |
|----------|--------|------------------|-------|
| sample 1 | 5.8kg  | white            | Cat   |
| sample 2 | 36kg   | golden           | Dog   |
| sample 3 | 3.2kg  | black            | Cat   |

And in the test dataset, the labels are the target that we want to predict. For example, the following test dataset contains two samples of data, each with two features (weight and color of the fur). And the model will decide what label to assign to the samples, with the features given.

| Sample # | Weight | Color of the fur | Prediction Label |
|----------|--------|------------------|------------------|
| sample 1 | 4.5kg  | white            | ?                |
| sample 2 | 30kg   | golden           | ?                |

An example given by the [Neural Networks](/reference/neural-network) shows how we could assign labels to samples in the training dataset in ml5.js:

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
```

Here, the label is the color of the object.

| Label     |
|-----------|
| red-ish   |
| green-ish |
| blue-ish  |

---
### Local Development Server
A local development server is a server that is used to launch/deploy a website or web application on a local machine, without connecting to the internet. People that are not connected to the same local network will not be able to access the website or web application. It is often used to test a website or web application before it is deployed to a production server. For example, if you run your application locally, usually it will have a URL like `http://localhost:8000/`, while you run your application on a production server, it will have a URL like `https://your-website.com/`.

You could launch your ml5.js sketch by using the command below. For more information, please refer to the [Getting Started](/?id=try-ml5js-locally-3) guide.

```js
# run the local web server
npm run develop
```


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
### Neuron

In machine learning, a neuron mimics a biological neuron in brains and other parts of nervous systems. It exists as a distinct unit within a hidden layer of a [neural network](#neural-network). Each neuron is responsible for completing these two tasks:

1. Calculates the weighted sum of input values multiplied by their corresponding weights.
2. Passes the weighted sum as an input to an activation function.

---
### Neural Network

<img align="right" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Neural_network_example.svg/220px-Neural_network_example.svg.png">

Neural networks, also known as artificial neural networks (ANNs) or simulated neural networks (SNNs), are neural circuits of neurons. Neural networks are at the center of artificial intelligence and deep learning algorithms.

Artificial neural networks (ANNs) are comprised of node layers, containing an input layer, one or more hidden layers, and an output layer. Each node, or [neuron](#neuron), connects to all of the nodes in the next layer. Each connection has an associated weight and threshold.

Neural networks are widely used for predictive modeling, and AI applications where training via datasets is desired.

In ml5.js, you can train your own neural network with `ml5.neuralNetwork`. For detailed documentation, please refer to [Neural Networks](../reference/neural-network.md).

---
### Normalization

Normalization is a data preprocessing technique used to adjust the values of features in a dataset to a common scale, for example, converting a range of values to `-1` to `1`, or `0` to `1`.

This is done to facilitate data analysis and modeling, and to reduce the impact of different sacales on the accuracy of machine learning models. Models usually train faster and produce better predictions when the numerical data is normalized.

---
### NPM
NPM is a package manager for JavaScript. NPM is used to install and manage JavaScript libraries.

You can find the npm package for ml5.js [here](https://www.npmjs.com/package/ml5).

#### **O**
---
### Overfitting

Overfitting is a phenomenon that occurs when a machine learning model is trained to fit the training data too closely. Since it fails to generalize the underlying information, the trained model often performs poorly on everything other than the training data.

An example of overfitting is as follows:

<img align="right" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcrunchingthedata.com%2Fwp-content%2Fuploads%2F2022%2F05%2FOverfitting.jpg&f=1&nofb=1&ipt=b9e8a7560cfac794e244c9e309994adff65eb9c68a53bcebaa5f7109c442c10c&ipo=images">

Overfitting is the opposite of [underfitting](#underfitting).

In ml5.js, overfitting can happen while training for a [neural network](#neural-network). Some common strategies to avoid overfitting include: training with more data, feature selection, regularization.

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

#### **R**

### Regression Analysis
Regression analysis is a predictive modeling technique that analyzes the relation between the dependent variable and the independent variable in a dataset. Regression models are models used to carry out regression analysis.

Two most common types of regression models are:
- Linear regression model: a linear approach for modeling the relationship between two quantitative variables.

<img align="center" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fdatasciencelk.com%2Fwp-content%2Fuploads%2F2020%2F03%2Fregression-line.png&f=1&nofb=1&ipt=fee1072daa0e55b1206c9be1489e25c31be1c472009e761999d6c0672c91cd01&ipo=images" width="40%">
<figcaption>A typical linear regression model</figcaption>

- Logistic regression model: maps the relationship between discrete (i.e. 0 or 1, true or false) dependent variables to independent variables, often represented by [sigmoid functions](#sigmoid-function).

<img align="center" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmiro.medium.com%2Fmax%2F1450%2F1*QY3CSyA4BzAU6sEPFwp9ZQ.png&f=1&nofb=1&ipt=b1ede474256f60310c332de4a15d65bf041bb3c028ff015b380b2dc3f5982ae1&ipo=images" width="40%">
<figcaption>A typical logistic regression model</figcaption>

#### **S**
---
### Stride

Stride is a component of [convolutional neural networks](#convolutional-neural-networks). It's a parameter of the neural network's filter that modifies the amount of movement over the image or video.

For example, while performing convolution operation on an image, if we move our filter by one pixel at a time, the stride would be 1.

In ml5.js, `strides` is a parameter in `imageClassification` layers.

---
### Score
Score is a measure of how well a machine learning model performs on a given input. For example, a machine learning model that is 100% accurate has a score of 1. A machine learning model that is 0% accurate has a score of 0. In ml5.js, score is often used to evaluate the performance of a machine learning model.

---
### Score Threshold
Score threshold is often used to control the minimum score required for a machine learning model to make a prediction. In ml5.js, score threshold is often used to control the minimum score required for a machine learning model to make a prediction.

---
### Sigmoid Function
<img align="right" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Logistic-curve.svg/320px-Logistic-curve.svg.png">

A sigmoid function is a mathematical function having a characteristic "S"-shaped curve, or sigmoid curve. 

The logistic curve, on the right, is a common exmaple of sigmoid function.


#### **T**
---
### Test Set
Test set is a set of data used to test a machine learning model. Test data is used to evaluate the performance of a machine learning model. For example, a set of images of cats and dogs could be used to test a machine learning model to classify images of cats and dogs. In ml5.js, test data is often used to evaluate the performance of a custom machine learning model.

---
### Training Set
Training set is a set of data used to train a machine learning model. Training data is used to train a machine learning model to make predictions. For example, a set of images of cats and dogs could be used to train a machine learning model to classify images of cats and dogs. In ml5.js, training set is often used to train a custom machine learning model.

---
### Terminal
A terminal is a command line interface that is used to run commands on a computer. In ml5.js, a terminal is often used to run a [local development server](#local-development-server).

#### **U**
---
### Underfitting
Underfitting is a phenomenon that occurs when a machine learning model is trained to fit the training data too loosely. Underfitting can result in a machine learning model that is not meaningful at all, and performs badly on both training and new data.

Underfitting is the opposite of [overfitting](#overfitting).

#### **V**
---
### Validation
Validation is the initial evaluation of a model's quality. Validation checks the quality of a model's predictions against the [validation set](#validation-set).

Because the validation set differs from the [training set](#training-set), validation helps guard against [overfitting](#overfitting).

Often, it's a good strategy to evaluate the model against the [validation set](#validation-set) as the first round of testing, then move on to evaluate it against the [test set](#test-set).

---
### Validation Set
Validation set is the subset of the dataset that performs initial evaluation against a trained model.

Traditionally, we divide the dataset into the three distinct subsets:
- A [training set](#training-set)
- A [validation set](#validation-set)
- A [test set](#test-set)

Ideally, each data point in the dataset should only belong to one of these three preceding subsets.

#### **W**
---
### Weights
Weights are parameters that are used to train a machine learning model.

---
### Weights Quantization
Weights quantization is often used to reduce the size of a machine learning model.

<!-- tabs:end -->

<br/>

<!-- tabs:start -->

#### **🔼 Fold**

#### **Web Application Development**
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
### Div
A div is an HTML element that is used to define a section of a webpage. For instance, the following code defines a div and put a paragraph inside the div:

```html
<div>
  <p>This is a paragraph.</p>
</div>
```

In ml5.js, divs are often used to display the output of a machine learning model. For instance, the example given by the [Getting Started](/?id=your-first-sketch) uses the following code to display the label and confidence score of the prediction:

```js
// A function to run when we get any errors and the results
function gotResult(error, results) {
  // Display error in the console
  if (error) {
    console.error(error);
  } else {
    // The results are in an array ordered by confidence.
    console.log(results);
    createDiv(`Label: ${results[0].label}`);
    createDiv(`Confidence: ${nf(results[0].confidence, 0, 2)}`);
  }
}
```

---
### Dependencies
Dependencies are libraries that are required by a project. The project may import the methods and functions from the dependencies to use them. Before you run your project, you need to install all the dependencies of the project to make sure that the project runs properly. 

In ml5.js, you will install the dependencies of a project by running the following command:

```js
# install dependencies
npm install
```

or

```js
# install dependencies
yarn
```

---
### Local Development Server
A local development server is a server that is used to launch/deploy a website or web application on a local machine, without connecting to the internet. People that are not connected to the same local network will not be able to access the website or web application. It is often used to test a website or web application before it is deployed to a production server. For example, if you run your application locally, usually it will have a URL like `http://localhost:8000/`, while you run your application on a production server, it will have a URL like `https://your-website.com/`.

You could launch your ml5.js sketch by using the command below. For more information, please refer to the [Getting Started](/?id=try-ml5js-locally-3) guide.

```js
# run the local web server
npm run develop
```

---
### NPM
NPM is a package manager for JavaScript. NPM is used to install and manage JavaScript libraries.

You can find the npm package for ml5.js [here](https://www.npmjs.com/package/ml5).

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
### Preload Function
The preload function is a function that is called before the setup function. In ml5.js, the preload function is often used to load assets, such as images, before the setup function is called.

---
### Terminal
A terminal is a command line interface that is used to run commands on a computer. In ml5.js, a terminal is often used to run a [local development server](#local-development-server).

#### **Machine Learning Essentials**

---
### Confidence
Confidence is a measure of how certain a machine learning model is about its prediction. For example, a machine learning model that is 100% confident in its prediction is certain that its prediction is correct. A machine learning model that is 0% confident in its prediction is certain that its prediction is incorrect.

In a classification task, we may get a confidence score for each class. For example, a machine learning model that is trained to classify images of cats and dogs could make a prediction that an image is a cat with a confidence score of 0.8, and a prediction that an image is a dog with a confidence score of 0.2. And we will select the class with the highest confidence score as the prediction of the machine learning model.

| Label | Confidence Score | Selected Class |
|-------|------------------|----------------|
| Cat   | 0.8              | ✅             |
| Dog   | 0.2              |                |

A similar example is given by the [Getting Started](/?id=your-first-sketch) of ml5 website. Here, we use the [Image Classifier](/reference/image-classifier) to classify an image of a bird and print out the label and confidence score of the prediction as follows:

```js
// A function to run when we get any errors and the results
function gotResult(error, results) {
  // Display error in the console
  if (error) {
    console.error(error);
  } else {
    // The results are in an array ordered by confidence.
    console.log(results);
    createDiv(`Label: ${results[0].label}`);
    createDiv(`Confidence: ${nf(results[0].confidence, 0, 2)}`);
  }
}
```

An output of the above code is as follows:

```js
[
  {
    label: "robin, American robin, Turdus migratorius"
    confidence: 0.9282158017158508
  },
  {
    label: "worm fence, snake fence, snake-rail fence, Virginia fence"
    confidence: 0.004057395737618208
  },
  {
    label: "brambling, Fringilla montifringilla"
    confidence: 0.0026653283275663853
  }
]
```

And we can see that the machine learning model is 92.82% confident that the image is a robin, and that is the selected class.

| Label | Confidence Score | Selected Class |
|-------|------------------|----------------|
| robin, American robin, Turdus migratorius | 0.9282158017158508 | ✅ |
| worm fence, snake fence, snake-rail fence, Virginia fence | 0.004057395737618208 | |
| brambling, Fringilla montifringilla | 0.0026653283275663853 | |

Let's take a look at another example in ml5.js, where the confidence score is used to represent how confident a machine learning model is about its prediction. The example given by the [BodyPose](/reference/bodypose) shows how to get the confidence score of each keypoint:

```js
for (let i = 0; i < poses.length; i++) {
  for (let k = 0; k < poses[i].pose.keypoints.length; k++) {
    // get each keypoint
    let point = poses[i].pose.keypoints[k];

    // get the position of each keypoint
    let x = point.position.x;
    let y = point.position.y;

    // get the confidence score of each keypoint
    let score = point.score;

    // get the name of each keypoint
    let partName = point.part;

    // draw an ellipse at each keypoint
    fill(0, 255, 0);
    ellipse(x, y, 5, 5);

    // mark the corresponding part name and confidence score at each keypoint
    text(partName, x + 15, y + 5);
    text(score.toFixed(2), x + 15, y + 20);
  }
}
```
We can use the confidence score to filter out keypoints that are not confident enough. For example, we can set a threshold of 0.5, and only draw keypoints that have a confidence score higher than 0.5:

```js
for (let i = 0; i < poses.length; i++) {
  for (let k = 0; k < poses[i].pose.keypoints.length; k++) {
    // get each keypoint
    let point = poses[i].pose.keypoints[k];

    // get the position of each keypoint
    let x = point.position.x;
    let y = point.position.y;

    // get the confidence score of each keypoint
    let score = point.score;

    // get the name of each keypoint
    let partName = point.part;

    // only draw an ellipse at each keypoint if the confidence score is higher than 0.5
    if (score > 0.5) {
      // draw an ellipse at the keypoint
      fill(0, 255, 0);
      ellipse(x, y, 5, 5);

      // mark the corresponding part name and confidence score at the keypoint
      text(partName, x + 15, y + 5);
      text(score.toFixed(2), x + 15, y + 20);
    }
  }
}
```

---
### Classification
Classification is the process of assigning a label to a piece of data. For example, a machine learning model that is trained to classify images of cats and dogs could assign the label "cat" to an image of a cat, and the label "dog" to an image of a dog. A classifier is the model that is trained to perform classification tasks.

The prediction of classification task is a class.

| Prediction |
|------------|
| Cat        |
| Dog        |

| Prediction |
|------------|
| Happy      |
| Sad        |

In contrast, the prediction of [regression](/learning/ml5_glossary?id=regression-analysis) task is a numerical value.

| Prediction |
|------------|
| 0.8        |
| 0.2        |

---
### Dataset
A dataset is a collection of data. Datasets are often used to train and test machine learning models. For example, a dataset of images of cats and dogs could be used to train a machine learning model to classify images of cats and dogs, and another dataset of images of cats and dogs could be used to test the performance of the machine learning model. You could compare the ground truth lables of the test dataset with the model predictions to evaluate the performance of the model.

See an example of a training dataset and a test dataset below. 

Training Dataset

| Sample # | [Feature Vector](/learning/ml5_glossary?id=feature) | Label |
|----------|----------------|-------|
| sample 1 | (5.8, 0)       | Cat   |
| sample 2 | (36, 2)        | Dog   |
| sample 3 | (3.2, 1)       | Cat   |

Test Dataset

| Sample # | [Feature Vector](/learning/ml5_glossary?id=feature) | Prediction Label | Ground Truth Label |
|----------|----------------|------------------|--------------------|
| sample 1 | (4.5, 0)       | ?                | Cat                |
| sample 2 | (30, 2)        | ?                | Dog                |

In ml5.js, you could train custom machine learning models with your own training datasets. For instance, the example given by the [Neural Networks](/reference/neural-network) uses the following training dataset to train the model to predict the color of an object:

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
```

And use the following test dataset to test the performance of the model:

```js
// Step 6: make a classification
function classify(){
  const input = {
    r: 255, 
    g: 0, 
    b: 0
  }
  nn.classify(input, handleResults);
}
```
Here, the training dataset and test dataset are as follows:

Training Dataset

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

Test Dataset

| Sample # | Feature Vector | Prediction Label | Ground Truth Label |
|----------|----------------|------------------|--------------------|
| sample 1 | (255, 0, 0)    | ?                | red-ish            |

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

---
### Hyperparameters
Hyperparameters are parameters that are set by coders before training a machine learning model. They are often used to control the training process of a machine learning model, for instance, the batch size, the epochs, the learning rate, and the number of hidden layers, etc. Batch size is the number of samples that are used to update the weights of a machine learning model in one iteration. Epochs is the number of times that a machine learning model is trained on the entire training dataset. Learning rate is the step size at each iteration while moving toward a minimum of a loss function. The number of hidden layers is the number of layers between the input layer and the output layer of a machine learning model.

An example on ml5.js website that uses hyperparameters is the [Neural Networks](/reference/neural-network) example. Here, we set the epochs to 32, and the batch size to 12:

```js
// Step 4: train the model
function trainModel(){
  const trainingOptions = {
    epochs: 32,
    batchSize: 12
  }
  nn.train(trainingOptions, finishedTraining);
}
```

---
### Label
Labels are used to identify the class or category of a phenomenon being observed. For example, a label of a cat image could be "cat". In the traning dataset, we need to provide the label for each sample of data to allow the model to learn the relationship between the features and the label. For example, the following training dataset contains three samples of data, each with two features (weight and color of the fur) and a label (cat or dog).

| Sample # | Weight | Color of the fur | Label |
|----------|--------|------------------|-------|
| sample 1 | 5.8kg  | white            | Cat   |
| sample 2 | 36kg   | golden           | Dog   |
| sample 3 | 3.2kg  | black            | Cat   |

And in the test dataset, the labels are the target that we want to predict. For example, the following test dataset contains two samples of data, each with two features (weight and color of the fur). And the model will decide what label to assign to the samples, with the features given.

| Sample # | Weight | Color of the fur | Prediction Label |
|----------|--------|------------------|------------------|
| sample 1 | 4.5kg  | white            | ?                |
| sample 2 | 30kg   | golden           | ?                |

An example given by the [Neural Networks](/reference/neural-network) shows how we could assign labels to samples in the training dataset in ml5.js:

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
```

Here, the label is the color of the object.

| Label     |
|-----------|
| red-ish   |
| green-ish |
| blue-ish  |

---
### Normalization

Normalization is a data preprocessing technique used to adjust the values of features in a dataset to a common scale, for example, converting a range of values to `-1` to `1`, or `0` to `1`.

This is done to facilitate data analysis and modeling, and to reduce the impact of different sacales on the accuracy of machine learning models. Models usually train faster and produce better predictions when the numerical data is normalized.

---
### Overfitting

Overfitting is a phenomenon that occurs when a machine learning model is trained to fit the training data too closely. Since it fails to generalize the underlying information, the trained model often performs poorly on everything other than the training data.

An example of overfitting is as follows:

<img align="right" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcrunchingthedata.com%2Fwp-content%2Fuploads%2F2022%2F05%2FOverfitting.jpg&f=1&nofb=1&ipt=b9e8a7560cfac794e244c9e309994adff65eb9c68a53bcebaa5f7109c442c10c&ipo=images">

Overfitting is the opposite of [underfitting](#underfitting).

In ml5.js, overfitting can happen while training for a [neural network](#neural-network). Some common strategies to avoid overfitting include: training with more data, feature selection, regularization.

---
### Prediction
A prediction is the output of a machine learning model. For example, a machine learning model that is trained to classify images of cats and dogs could make a prediction that an image is a cat.

---
### Pretrained Model
A pretrained model is a machine learning model that has been trained on a dataset. Pretrained models are often used to make predictions on new data. For example, a pretrained model that has been trained on a dataset of images of cats and dogs could be used to make predictions on new images of cats and dogs. In ml5.js, pretrained models are often used to make predictions on new data.

---
### Regression Analysis
Regression analysis is a predictive modeling technique that analyzes the relation between the dependent variable and the independent variable in a dataset. Regression models are models used to carry out regression analysis.

Two most common types of regression models are:
- Linear regression model: a linear approach for modeling the relationship between two quantitative variables.

<img align="center" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fdatasciencelk.com%2Fwp-content%2Fuploads%2F2020%2F03%2Fregression-line.png&f=1&nofb=1&ipt=fee1072daa0e55b1206c9be1489e25c31be1c472009e761999d6c0672c91cd01&ipo=images" width="40%">
<figcaption>A typical linear regression model</figcaption>

- Logistic regression model: maps the relationship between discrete (i.e. 0 or 1, true or false) dependent variables to independent variables, often represented by [sigmoid functions](#sigmoid-function).

<img align="center" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmiro.medium.com%2Fmax%2F1450%2F1*QY3CSyA4BzAU6sEPFwp9ZQ.png&f=1&nofb=1&ipt=b1ede474256f60310c332de4a15d65bf041bb3c028ff015b380b2dc3f5982ae1&ipo=images" width="40%">
<figcaption>A typical logistic regression model</figcaption>

---
### Score
Score is a measure of how well a machine learning model performs on a given input. For example, a machine learning model that is 100% accurate has a score of 1. A machine learning model that is 0% accurate has a score of 0. In ml5.js, score is often used to evaluate the performance of a machine learning model.

---
### Score Threshold
Score threshold is often used to control the minimum score required for a machine learning model to make a prediction. In ml5.js, score threshold is often used to control the minimum score required for a machine learning model to make a prediction.

---
### Test Set
Test set is a set of data used to test a machine learning model. Test data is used to evaluate the performance of a machine learning model. For example, a set of images of cats and dogs could be used to test a machine learning model to classify images of cats and dogs. In ml5.js, test data is often used to evaluate the performance of a custom machine learning model.

---
### Training Set
Training set is a set of data used to train a machine learning model. Training data is used to train a machine learning model to make predictions. For example, a set of images of cats and dogs could be used to train a machine learning model to classify images of cats and dogs. In ml5.js, training set is often used to train a custom machine learning model.

---
### Underfitting
Underfitting is a phenomenon that occurs when a machine learning model is trained to fit the training data too loosely. Underfitting can result in a machine learning model that is not meaningful at all, and performs badly on both training and new data.

Underfitting is the opposite of [overfitting](#overfitting).

---
### Validation
Validation is the initial evaluation of a model's quality. Validation checks the quality of a model's predictions against the [validation set](#validation-set).

Because the validation set differs from the [training set](#training-set), validation helps guard against [overfitting](#overfitting).

Often, it's a good strategy to evaluate the model against the [validation set](#validation-set) as the first round of testing, then move on to evaluate it against the [test set](#test-set).

---
### Validation Set
Validation set is the subset of the dataset that performs initial evaluation against a trained model.

Traditionally, we divide the dataset into the three distinct subsets:
- A [training set](#training-set)
- A [validation set](#validation-set)
- A [test set](#test-set)

Ideally, each data point in the dataset should only belong to one of these three preceding subsets.

#### **Deep Learning**
---
### Neural Network

<img align="right" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Neural_network_example.svg/220px-Neural_network_example.svg.png">

Neural networks, also known as artificial neural networks (ANNs) or simulated neural networks (SNNs), are neural circuits of neurons. Neural networks are at the center of artificial intelligence and deep learning algorithms.

Artificial neural networks (ANNs) are comprised of node layers, containing an input layer, one or more hidden layers, and an output layer. Each node, or [neuron](#neuron), connects to all of the nodes in the next layer. Each connection has an associated weight and threshold.

Neural networks are widely used for predictive modeling, and AI applications where training via datasets is desired.

In ml5.js, you can train your own neural network with `ml5.neuralNetwork`. For detailed documentation, please refer to [Neural Networks](../reference/neural-network.md).

---
### Convolutional Neural Networks
Convolutional Neural Networks (CNN) are [neural networks](/learning/ml5_glossary?id=neural-network) tuned for the compression of images and video data. They are widely used in computer vision tasks such as image classification, object detection, and image segmentation.

Here is a simple explanation of how CNNs work:

Imagine you want to teach a computer to recognize pictures of cats. A Convolutional Neural Network (CNN) is like a smart robot that learns to see and understand these pictures.

1. Input Layer:

The robot looks at the picture, but instead of seeing the whole thing at once, it looks at small pieces, like tiny squares. Each square is called a "pixel."

| col1| col2| col3| col4|
|-----|-----|-----|-----|
| 120 | 50 | 200 | 75 |
| 30  | 180| 100 | 220|
| 90  | 45 | 150 | 25 |
| 10  | 160| 80  | 120|

2. Convolutional Layers:

The robot then slides a magnifying glass (filter) over these squares, focusing on a few at a time. It's like paying attention to specific patterns, like edges or colors, in small regions.

We apply the following filter to the input layer:

| col1| col2| col3|
|---|---|----|
| 1 | 0 | -1 |
| 1 | 0 | -1 |
| 1 | 0 | -1 |

And this is the result after applied the filter to the input layer:

| col1| col2| col3|
|---|---|----|
| 70 | -170 | 75 |
| 180 | 160 | -20 |
| -15 | 75 | -160 |
| -60 | 190 | 50 |

3. Activation Layers:

After looking at each region, the robot decides if it found something important. If it did, it gets excited and says, "Yep, there's a pattern here!" If not, it stays calm.

This is the result after applied the activation function (ReLu) to the result of the convolutional layer:

| col1| col2| col3|
|---|---|----|
| 70 | 0 | 75 |
| 180 | 160 | 0 |
| 0 | 75 | 0 |
| 0 | 190 | 50 |

4. Pooling Layers:

To keep things simple, the robot doesn't need to remember every tiny detail. It takes a step back and groups nearby excited regions together, making a smaller version of the picture. This is like summarizing the important parts.

After applying 2 x 2 max pooling to the result of the activation layer, we get the following result:

| col1| col2|
|---|---|
| 180 | 75 |
| 190 | 50 |

5. Fully Connected Layers:

Now, the robot thinks about the bigger picture. It looks at all the summarized information and decides, "Does this look like a cat or not?" It's making a final decision based on everything it has seen.

Assuming two neurons in the fully connected layer:

```js
Neuron 1: 0.3 * (180 + 75) + 0.5 = 144.5
Neuron 2: 0.8 * (190 + 50) - 0.2 = 155
```

6. Output Layer:

Finally, the robot gives its answer. If it's confident that the picture is a cat, it says, "Yes, that's a cat!" If not, it might say, "I'm not sure, but it doesn't really look like a cat to me."
The robot repeats this process many times, adjusting its magnifying glass and learning from its mistakes. Gradually, it becomes really good at spotting cats in pictures!

Softmax result:
- Cat Probability: 0.731 / (0.731 + 0.269) ≈ 0.731
- Not Cat Probability: 0.269 / (0.731 + 0.269) ≈ 0.269

So, in this complete example, the robot processes the input image through each step of the convolutional neural network (CNN) and ultimately predicts that the image contains a cat with a probability of approximately 73.1%.

In short, a CNN is like a robot that breaks down pictures, looks for important patterns, and decides what's in the picture step by step. It's fantastic for tasks like image recognition!

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

---
### Neuron

In machine learning, a neuron mimics a biological neuron in brains and other parts of nervous systems. It exists as a distinct unit within a hidden layer of a [neural network](#neural-network). Each neuron is responsible for completing these two tasks:

1. Calculates the weighted sum of input values multiplied by their corresponding weights.
2. Passes the weighted sum as an input to an activation function.

---
### Stride

Stride is a component of [convolutional neural networks](#convolutional-neural-networks). It's a parameter of the neural network's filter that modifies the amount of movement over the image or video.

For example, while performing convolution operation on an image, if we move our filter by one pixel at a time, the stride would be 1.

In ml5.js, `strides` is a parameter in `imageClassification` layers.

---
### Sigmoid Function
<img align="right" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Logistic-curve.svg/320px-Logistic-curve.svg.png">

A sigmoid function is a mathematical function having a characteristic "S"-shaped curve, or sigmoid curve. 

The logistic curve, on the right, is a common exmaple of sigmoid function.

---
### Weights
Weights are parameters that are used to train a machine learning model.

---
### Weights Quantization
Weights quantization is often used to reduce the size of a machine learning model.

<!-- tabs:end -->
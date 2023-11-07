# Ml5 Glossary

<br/>
Have you ever felt confused about a term we used here at ml5? No worries, we've got you covered! Check out this glossary. Here, we explain and define programming techniques and machine learning terms specific to ml5 that are mentioned in our libraries, website, and examples.

<!-- tabs:start -->

#### **A**

---
### Activation Function
An activation function is a function that determines the output of a neural network. An activation function is a function that determines the output of a neural network. Activation functions are often used to introduce non-linearity into a neural network. In ml5.js, activation functions are often used to introduce non-linearity into a neural network.

#### **B**

---
### Bias
A bias is a constant value that is added to the input of a neural network. A bias is a constant value that is added to the input of a neural network. Biases are often used to introduce non-linearity into a neural network. In ml5.js, biases are often used to introduce non-linearity into a neural network.

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
A classifier is a machine learning model that is used to classify data. For example, a classifier could be used to classify images of cats and dogs. In ml5.js, classifiers are often used to classify images of cats and dogs.

#### **D**

---
### Dataset
A dataset is a collection of data. Datasets are often used to train machine learning models. For example, a dataset of images of cats and dogs could be used to train a machine learning model to classify images of cats and dogs. In ml5.js, datasets are often used to train custom machine learning models.

---
### Deep Learning
Deep learning is a subfield of machine learning that uses neural networks to learn from data. Deep learning is a subfield of machine learning that uses neural networks to learn from data. Deep learning is often used to solve problems that are difficult to solve with other machine learning techniques. In ml5.js, deep learning is often used to solve problems that are difficult to solve with other machine learning techniques.

#### **E**
---
### Early Stopping
Early stopping is a technique used to prevent overfitting in machine learning models. Early stopping is a technique used to prevent overfitting in machine learning models. Early stopping is often used to prevent overfitting in machine learning models. In ml5.js, early stopping is often used to prevent overfitting in machine learning models.

#### **F**
---
### Feature
A feature is an individual measurable property or characteristic of a phenomenon being observed. Features are used to represent the phenomenon numerically. For example, a feature of a cat could be its weight, or the color of its fur. In machine learning, features are used to represent the phenomenon being observed in a way that a machine learning algorithm can understand. For example, a cat could be represented by a feature vector of its weight and the color of its fur. In ml5.js, features are often used to represent the input to a machine learning model.

#### **G**
---
### Gradient Descent
Gradient descent is an optimization algorithm used to train machine learning models. Gradient descent is an optimization algorithm used to train machine learning models. Gradient descent is often used to train machine learning models. In ml5.js, gradient descent is often used to train machine learning models.

#### **H**
---
### Hyperparameters
Hyperparameters are parameters that are set before training a machine learning model. Hyperparameters are parameters that are set before training a machine learning model. Hyperparameters are often used to control the training process of a machine learning model. In ml5.js, hyperparameters are often used to control the training process of a machine learning model.

#### **I**

#### **J**

#### **K**

#### **L**
---
### Labels
Labels are used to identify the class or category of a phenomenon being observed. For example, a label of a cat could be "cat". In machine learning, labels are used to identify the class or category of the phenomenon being observed. For example, a cat could be labeled as "cat". In ml5.js, labels are often used to identify the output of a machine learning model.

#### **M**

#### **N**
---
### Neuron

In machine learning, a neuron mimics a biological neuron in brains and other parts of nervous systems. It exists as a distinct unit within a hidden layer of a [neural network](#neural-network). Each neuron is responsible for completing these two tasks:

1. Calculates the weighted sum of input values multiplied by their corresponding weights.
2. Passes the weighted sum as an input to an activation function.

---
### Neural Network
Neural networks, also known as artificial neural networks (ANNs) or simulated neural networks (SNNs), are neural circuits of neurons. Neural networks are at the center of artificial intelligence and deep learning algorithms.

Artificial neural networks (ANNs) are comprised of node layers, containing an input layer, one or more hidden layers, and an output layer. Each node, or [neuron](#neuron), connects to all of the nodes in the next layer. Each connection has an associated weight and threshold.

![A Simple One-Layer Neural Network](https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Neural_network_example.svg/220px-Neural_network_example.svg.png)

Neural networks are widely used for predictive modeling, and AI applications where training via datasets is desired.

#### **O**
---
### Overfitting
Overfitting is a phenomenon that occurs when a machine learning model is trained to fit the training data too closely. Overfitting occurs when a machine learning model is trained to fit the training data too closely. Overfitting can result in a machine learning model that performs well on the training data, but performs poorly on new data. In ml5.js, overfitting is often used to describe the performance of a machine learning model.

---
### Output Stride
Output stride is a parameter used to control the resolution of the output of a machine learning model. Output stride is a parameter used to control the resolution of the output of a machine learning model. Output stride is often used to control the resolution of the output of a machine learning model. In ml5.js, output stride is often used to control the resolution of the output of a machine learning model.

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

#### **Q**

#### **R**

### Regression Analysis
Regression analysis is a predictive modeling technique that analyzes the relation between the dependent variable and the independent variable in a dataset.

Two most common types of regression analysis are:
- Linear regression: a linear approach for modeling the relationship between two quantitative variables.
- Logistic regression: maps the relationship between discrete (i.e. 0 or 1, true or false) dependent variables to independent variables, often represented by [sigmoid curves](#sigmoid-curve).

### Regression Models




#### **S**
---
### Score
Score is a measure of how well a machine learning model performs on a given input. For example, a machine learning model that is 100% accurate has a score of 1. A machine learning model that is 0% accurate has a score of 0. In ml5.js, score is often used to evaluate the performance of a machine learning model.

---
### Score Threshold
Score threshold is often used to control the minimum score required for a machine learning model to make a prediction. In ml5.js, score threshold is often used to control the minimum score required for a machine learning model to make a prediction.

---
### Sigmoid Function
A sigmoid function is a mathematical function having a characteristic "S"-shaped curve.

![The logistic curve](https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Logistic-curve.svg/320px-Logistic-curve.svg.png)

#### **T**
---
### Test Data
Test data is a set of data used to test a machine learning model. Test data is used to evaluate the performance of a machine learning model. For example, a set of images of cats and dogs could be used to test a machine learning model to classify images of cats and dogs. In ml5.js, test data is often used to evaluate the performance of a custom machine learning model.

---
### Training Data
Training data is a set of data used to train a machine learning model. Training data is used to train a machine learning model to make predictions. For example, a set of images of cats and dogs could be used to train a machine learning model to classify images of cats and dogs. In ml5.js, training data is often used to train a custom machine learning model.

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


# NameOfFeature

<center>
    <img class="header-img" alt="image classification of bird" src="https://via.placeholder.com/150">
</center>

## Description

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

## Quick Start

```js
// Initialize the magicFeature
const magic = ml5.magicFeature("sparkles", modelLoaded);

// When the model is loaded
function modelLoaded() {
  console.log("Model Loaded!");
}

// Make some sparkles
magic.makeSparkles(100, (err, results) => {
  console.log(results);
});
```

## Usage

### Initialize

```js
const magic = ml5.magicFeature(requiredInput, ?optionalInput1, ?optionalInput2);
```

#### Parameters

- **requiredInput**: REQUIRED. Notice there is no question mark in front of the input.
- **optionalInput1**: Optional. Notice the `?` indicates an optional parameter.
- **optionalInput2**: Optional. A description of some kind of object with some properties. Notice the `?` indicates an optional parameter.

  ```js
  {
    sparkleCount: 100,
    delightFactor: 1.0,
    party: true,
  };
  ```

### Properties

<!-- /////////////////////
PROPERTY DEFINITION START
* Notice that each property definition is wrapped in three stars `***`
* This creates lines to contain everything
///////////////////////// -->

---

#### .property1

> _String_. A description of the property associated with the new model instance.

---

<!-- /////////////////////
PROPERTY DEFINITION END
///////////////////////// -->

---

#### .property2

> _Object_. A description of the property associated with the new model instance.

---

---

#### .property3

> _Object_. A description of the property associated with the new model instance.

---

### Methods

<!-- /////////////////////
FUNCTION DEFINITION START
* Notice that each function definition is wrapped in three stars `***`
* This creates lines to contain everything
///////////////////////// -->

---

#### .makeSparkles()

> Given a number, will make magicSparkles

```js
classifier.makeSparkles(?numberOfSparkles, ?callback);
```

📥 **Inputs**

- **numberOfSparkles**: Optional. Number. The number of sparkles you want to return.
- **callback**: Optional. Function. A function to handle the results of `.makeSparkles()`. Likely a function to do something with the results of makeSparkles.

📤 **Outputs**

- **Object**: Returns an array of objects. Each object contains `{something, anotherThing}`.

---

<!-- /////////////////////
FUNCTION DEFINITION END
///////////////////////// -->

<!-- /////////////////////
FUNCTION DEFINITION START
///////////////////////// -->

---

#### .makeDisappear()

> Given an image, will make objects in the image disappear

```js
classifier.makeDisappear(input, ?numberOfObjects, ?callback);
```

📥 **Inputs**

- **input**: REQUIRED. HTMLImageElement | HTMLVideoElement | ImageData | HTMLCanvasElement. The image or video you want to run the function on.
- **numberOfObjects**: Optional. Number. The number of objects you want to disappear.
- **callback**: Optional. Function. A function to handle the results of `.makeDisappear()`. Likely a function to do something with the results of the image where objects have disappeared.

📤 **Outputs**

- **Image**: Returns an image.

---

<!-- /////////////////////
FUNCTION DEFINITION END
///////////////////////// -->

## Examples

**p5.js**

- [Example 1]()
- [Example 2]()

**p5 web editor**

- [Example 1]()
- [Example 2]()

**plain javascript**

- [Example 1]()
- [Example 2]()

## Demo

No demos yet - contribute one today!

## Tutorials

### MagicFeature Tutorial 1 via CodingTrain

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/D9BoBSkLvFo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### MagicFeature Tutorial 2 via CodingTrain

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/yNkAuWz5lnY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Model and Data Provenance

> A project started by [Ellen Nickles](https://github.com/ellennickles/)

### Models Overview

A nice description of the models overview

#### \_**\_MODELNAME\_\_** - Model Biography

- **Description**
  - What does this model do? If unknown, then write TBD
- **Developer and Year**
  - Who developed it and when? If unknown, then write TBD
- **Purpose and Intended Users**
  - Why was it developed and for whom? If unknown, then write TBD
- **Hosted Location**
  - Where does ml5.js retrieve the model files from? If unknown, then write TBD
- **ml5 Contributor and Year**
  - Who ported it to ml5 and when? If unknown, then write TBD
- **References**
  - What sources did I consult for this information? If unknown, then write TBD

#### \_**\_MODELNAME\_\_** - Data Biography

- **Description**
  - What is the data? If unknown, write TBD
- **Source**
  - Where did it come from? If unknown, write TBD
- **Collector and Year**
  - Who collected it and when? If unknown, write TBD
- **Collection Method**
  - How was the data collected? If unknown, write TBD
- **Purpose and Intended Users**
  - Why was the dataset developed and for whom? If unknown, write TBD
- **References**
  - What sources did I consult for this information? If unknown, write TBD

## Acknowledgements

**Contributors**:

- Name 1
- Name 2

**Credits**:

- Paper Reference | Website URL | Github Repo | Book reference | etc

## Source Code

- [/src/MagicFeature]()

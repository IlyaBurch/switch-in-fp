# `switch-in-fp`

> A functional programming-inspired `switch-case` implementation for JavaScript. Because why not?

---

## 🤔 What is this?

This package provides a functional programming-style `switch-case` implementation using the [`if`](https://www.npmjs.com/package/if) library. It's like a regular `switch-case`, but with extra steps. Perfect for those who want to feel smarter while writing code that does the same thing as a plain old `switch`.

---

## 🚀 Features

- **Functional Programming Vibes**: Adds unnecessary complexity to your codebase.
- **Duplicate Case Handling**: Automatically ignores duplicate cases because i'm too lazy to throw errors.
- **Edge Case Support**: Handles `null`, `undefined`, empty strings, arrays, objects, and even negative numbers. (Why? I don't know either.)
- **Error Handling**: Catches errors in actions and logs them to the console. You're welcome.
- **Asynchronous Actions**: Supports async functions, Promises, `setTimeout`, and `setInterval`. Because blocking the event loop is so last year.

---

## 📦 Installation

Install the package via npm:

```bash
npm install switch-in-fp
```
Or, if you're feeling adventurous: 

```bash
yarn add switch-in-fp
``` 

---

##🛠️ Usage 

Here’s how you can use this package to make your code unnecessarily complex: 
```javascript
const { Switch } = require('switch-in-fp');

Switch
  .case(1, () => console.log('Case 1 executed'))
  .case(2, () => console.log('Case 2 executed'));

Switch.switch(2); // Output: "Case 2 executed"
Switch.switch(5); // Output: "No matching case found"
```
Advanced Example 
```javascript
Switch
  .case(1, () => {
    console.log('Case 1');
  })
  .case(2, async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Async Case 2');
  });

Switch.switch(2); // Waits 1 second, then logs "Async Case 2"
```

---

## 🧪 Tests 

Run the tests to ensure everything works as expected: 
```bash
npm test
```

---

## 📜 License 

This project is licensed under the MIT License. Do whatever you want with it, but don't blame us if it breaks your codebase. 

---


## ⚠️ Warning 

If you find yourself using this package to replace in real project a simple if-else or switch-case, please stop it. Get some help. 

---

## 🙌 Contributing 

Feel free to contribute! Or don't. I'm not your boss or mom. 

---

## 💌 Feedback 

If you have any feedback (or say what i'm a stupid), suggestions, or complaints, feel free to open an issue. Or don’t. It’s up to you. 
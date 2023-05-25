import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [userInput, setUserInput] = useState("");
  const [randomWord, setRandomWord] = useState("");
  const [timer, setTimer] = useState(300);
  const [accuracy, setAccuracy] = useState(0);

  useEffect(() => {
    generateRandomWord();
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          clearInterval(interval);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timer === 0) {
      setRandomWord("");
    }
  }, [timer]);

  const generateRandomWord = () => {
    const words = ["apple", "banana", "cherry", "orange", "pear","amazon",
    "google",
    "chaabi",
    "asd",
    "klfg",
    "cloud",
    "orange",
    "pear",
    "apple",
    "coding",
    "asdfg",
    "abcd",
    "efgh",
    "ijkl",
    "mnop",
    "qrst",
    "uvwx",
    "run",
    "faster"];
    const randomIndex = Math.floor(Math.random() * words.length);
    setRandomWord(words[randomIndex]);
  };

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      checkInput();
    }
  };

  const checkInput = () => {
    if (userInput === randomWord) {
      setAccuracy((prevAccuracy) => prevAccuracy + 1);
      generateRandomWord();
    }
    setUserInput("");
  };

  const calculateAccuracy = () => {
    if (accuracy === 0 || timer === 0) {
      return 0;
    }
    return ((accuracy / 300) * 100).toFixed(2);
  };

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  return (
    <div className="container">
      <p>chabbi assessment</p>
      <h1>Ngram Type</h1>

      <input
        type="text"
        placeholder="re-type here"
        value={userInput}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        disabled={timer === 0}
      />
      <p
        className={userInput === randomWord ? "result correct" : "result wrong"}
      >
        Word: {randomWord}
      </p>
      <p className="timer">
        Timer: {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </p>
      <p className="accuracy">Accuracy: {calculateAccuracy()}%</p>
    </div>
  );
};

export default App;
import React, { useState } from "react";
import Challenge from "./JavaScriptChallenge";
import questions from "../../databases/javascriptQuestions.json";
import Lives from "./Lives";
import "./JavaScriptGame.css";
import confetti from "canvas-confetti";
import {
  successfulNotification,
  failNotification,
  correctAnswerNotification,
  wrongtAnswerNotification,
  rememberNotification,
} from "./Notification/Notification";
import { savePointsToStorage } from "../../utils/localStorage";

// sounds
import correctSoundFile from "/sounds/correct.wav";
import wrongSoundFile from "/sounds/wrong.wav";
import victorySoundFile from "/sounds/victory.wav";

export default function JavaScriptGame() {
  const [lives, setLives] = useState(3);
  const [points, setPoints] = useState(0);
  const [count, setCount] = useState(0);
  const [isFormDisabled, setFormDisabled] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [answerStatus, setAnswerStatus] = useState(null); // "correct" | "wrong" | null

  const correctSound = new Audio(correctSoundFile);
  const wrongSound = new Audio(wrongSoundFile);
  const victorySound = new Audio(victorySoundFile);

  const handleNextQuestion = () => {
    if (count < questions.length - 1 && lives > 0) {
      setCount((prevCount) => prevCount + 1);
      setSelectedOption("");
      setAnswerStatus(null);
    }
  };

  const pauseGame = () => {
    setFormDisabled(true);
    setTimeout(() => setFormDisabled(false), 1000);
  };

  // confetti animation
  const launchConfetti = () => {
    const duration = 2 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 70,
        origin: { x: 0 },
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 70,
        origin: { x: 1 },
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  const handleAnswer = (event) => {
    const answer = event.target.value;
    const correctAnswer = questions[count].correctAnswer;

    setSelectedOption(answer);

    if (!answer) {
      rememberNotification();
      pauseGame();
      return;
    }

    if (answer === correctAnswer) {
      setAnswerStatus("correct");
      correctSound.play();
      setPoints((prevPoints) => prevPoints + 10);

      // finishing level1
      if (count === questions.length - 1) {
        const finalPoints = points + 10;
        setTimeout(() => {
          successfulNotification(finalPoints);
          savePointsToStorage(finalPoints);
          launchConfetti();           // 🎉 
          victorySound.play();        // 🔊 
          setFormDisabled(true);
        }, 1500);
      }
    } else {
      setAnswerStatus("wrong");
      wrongSound.play();
      //wrongtAnswerNotification();

      if (lives > 1) {
        setLives((prevLives) => prevLives - 1);
      } else {
        setLives((prevLives) => prevLives - 1);
        setTimeout(() => {
          failNotification();
          setFormDisabled(true);
        }, 2000);
      }
    }

    if (count < questions.length - 1) {
      setTimeout(() => handleNextQuestion(), 1200);
    }

    pauseGame();
  };

  return (
    <section className="page-section" id="game">
      <div className="container d-flex justify-content-between align-items-center gap-3 p-2 challengeHeader gradient-bg-blue rounded-pill">
        <h2 className="welcome-text bangers-text h2 text-uppercase mb-0 ms-4 d-none d-md-block">
          Welcome to JavaScript Forge 💥
        </h2>
        <div className="d-flex align-items-center justify-content-center ms-5">
          <Lives lives={lives} />
          <div className="points text-white ms-3">Points: {points}</div>
        </div>
      </div>

      <Challenge
        count={count}
        handleAnswerButton={handleAnswer}
        isFormDisabled={isFormDisabled}
        selectedOption={selectedOption}
        answerStatus={answerStatus}
      />
    </section>
  );
}

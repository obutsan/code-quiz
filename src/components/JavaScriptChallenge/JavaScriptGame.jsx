import { useState } from "react";
import Challenge from "./JavaScriptChallenge";
import questions from "../../databases/javascriptQuestions.json";
import Lives from "./Lives";
import "./JavaScriptGame.css";
import {
  successfulNotification,
  failNotification,
  correctAnswerNotification,
  wrongtAnswerNotification,
  rememberNotification,
} from "./Notification/Notification";
import { savePointsToStorage } from "../../utils/localStorage";

const imageMap = {
  start: "/images/js/go.jpeg",
  correct: "/images/js/correct2.jpeg",
  incorrect: "/images/js/wrong2.jpeg",
  victory: "/images/js/win.jpeg",
  lost: "/images/js/lost1.jpeg",
  gameover: "/images/js/start.jpeg",
  nextlevel: "/images/js/nextlevel2.jpeg",
  chooseanswer: "/images/js/chooseanswer.jpeg",
  tryagain: "/images/js/tryagain.jpeg",
};

export default function JavaScriptGame() {
  const [lives, setLives] = useState(3);
  const [points, setPoints] = useState(0);
  const [count, setCount] = useState(0);
  const [isFormDisabled, setFormDisabled] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  // Handle the next question button
  const handleNextQuestion = () => {
    if (count < questions.length - 1 && lives > 0) {
      setCount((prevCount) => prevCount + 1);
    }
  };

  // Pause the game for a brief moment
  const pauseGame = () => {
    setFormDisabled(true);
    setTimeout(() => setFormDisabled(false), 1000);
  };

  // Handle answer submission
  const handleAnswer = (event) => {
    event.preventDefault();
    const answer = event.target.answer.value;
    const correctAnswer = questions[count].correctAnswer;

    if (!answer) {
      rememberNotification();
      pauseGame();
      return;
    }

    if (answer === correctAnswer) {
      setPoints((prevPoints) => prevPoints + 10);
      correctAnswerNotification();

      // Handle victory at the last question
      if (count === questions.length - 1) {
        const finalPoints = points + 10;
        setTimeout(() => {
          successfulNotification(finalPoints);
          savePointsToStorage(finalPoints);
          setFormDisabled(true);
        }, 2000);
      }
    } else {
      wrongtAnswerNotification();

      // Deduct a life and handle game over
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

    // Move to the next question if not the last one
    if (count < questions.length - 1) {
      handleNextQuestion();
    }

    pauseGame();
    event.target.reset();
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
      />
    </section>
  );
}

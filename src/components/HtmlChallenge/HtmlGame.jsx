import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import htmlQuestionList from "../../databases/htmlQuestionsList.json";
import { Button, Container } from "react-bootstrap";
import HtmlAnswerCharacter from "./HtmlAnswerCharacter";
import "./HtmlGame.css";
import { savePointsToStorage } from "../../utils/localStorage";
import Lives from "./../JavaScriptChallenge/Lives";
import confetti from "canvas-confetti";

// Звуки
import correctSoundFile from "/sounds/correct.wav";
import wrongSoundFile from "/sounds/wrong.wav";
import victorySoundFile from "/sounds/victory.wav";

const HtmlGame = () => {
  const [show, setShow] = useState(false);
  const [showRestart, setShowRestart] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [allQuestionAnswered, setAllQuestionAnswered] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [alertMessage, setAlertMessage] = useState("Start!");
  const [answerStatus, setAnswerStatus] = useState(null); // "correct" | "wrong" | null

  let [result, setResult] = useState({
    lives: 3,
    score: 0,
  });

  const correctSound = new Audio(correctSoundFile);
  const wrongSound = new Audio(wrongSoundFile);
  const victorySound = new Audio(victorySoundFile);

  useEffect(() => {
    const storedUserData = localStorage.getItem("currentUser");
    const parsedData = storedUserData
      ? JSON.parse(storedUserData)
      : { name: "", points: 0 };
    setResult((prevResult) => ({ ...prevResult, score: parsedData.points }));
  }, []);

  useEffect(() => {
    if (allQuestionAnswered) {
      savePointsToStorage(result.score);
    }
  }, [allQuestionAnswered, result.score]);

  const { question, options, correctAnswer } =
    htmlQuestionList[currentQuestion];

  const navigate = useNavigate();
  const navigateToLevel3 = () => {
    navigate("/level3welcome");
  };

  const handleRestart = () => {
    setShowRestart(false);
    setResult({ lives: 3, score: 0 });
    setCurrentQuestion(0);
    setSelectedAnswerIndex(null);
    setAllQuestionAnswered(false);
    setGameOver(false);
    setAlertMessage("Start!");
    setAnswerStatus(null);
  };

  const launchConfetti = () => {
    const duration = 2 * 1000;
    const end = Date.now() + duration;
    (function frame() {
      confetti({ particleCount: 5, angle: 60, spread: 70, origin: { x: 0 } });
      confetti({ particleCount: 5, angle: 120, spread: 70, origin: { x: 1 } });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  };

  const onClickNext = () => {
    setSelectedAnswerIndex(null);
    setAnswerStatus(null);
    if (currentQuestion !== htmlQuestionList.length - 1 && result.lives > 0) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setAlertMessage("Well done! Hurray!");
      setAllQuestionAnswered(true);
      launchConfetti();
      victorySound.play();
      setShow(true);
    }
  };

  const onAnswerSelected = (answer, index) => {
    if (gameOver || answerStatus) return;

    setSelectedAnswerIndex(index);

    if (answer === correctAnswer) {
      setAnswerStatus("correct");
      setAlertMessage("Correct!");
      setResult((prev) => ({ ...prev, score: prev.score + 10 }));
      correctSound.play();
    } else {
      setAnswerStatus("wrong");
      setAlertMessage("Wrong!");
      wrongSound.play();
      if (result.lives > 1) {
        setResult((prev) => ({ ...prev, lives: prev.lives - 1 }));
      } else {
        setResult({ lives: 0, score: 0 });
        setAlertMessage("Game Over!");
        setGameOver(true);
        setAllQuestionAnswered(true);
        setShowRestart(true);
      }
    }

    setTimeout(() => {
      onClickNext();
      setAnswerStatus(null);
    }, 1000);
  };

  return (
    <div className="game-wrapper vw-80 d-flex align-items-center flex-column">
      <div className="container d-flex justify-content-between align-items-center gap-3 p-2 challengeHeader gradient-bg-blue rounded-pill">
        <h2 className="welcome-text bangers-text h2 text-uppercase mb-0 ms-4 d-none d-md-block">
          Welcome to HTML Forge 💥
        </h2>
        <div className="d-flex align-items-center justify-content-center ms-5">
          <Lives lives={result.lives} />
          <div className="points text-white ms-3">Points: {result.score}</div>
        </div>
      </div>

      <Container className="m-1 d-flex flex-column justify-content-center align-items-center">
        <div className="d-flex flex-column flex-lg-row justify-content-around w-100">
          <div className="col-12 col-md-6 d-flex justify-content-center align-items-center img-fluid p-2">
            <img
              className="img-fluid object-fit-contain responsive-img"
              src="/assets/HtmlGame/htmlstart.jpeg"
              alt="coding man"
            />
          </div>

          <div className="col-12 col-md-6 m-1 px-2">
            <h2 className="h3 mt-4 text-warning bangers-text tracking-wide">
              💥 {currentQuestion + 1}. {question}{" "}
            </h2>
            <div className="d-flex flex-column mt-4">
              {options.map((answer, index) => (
                <Button
                  style={{ height: "3em" }}
                  onClick={() => onAnswerSelected(answer, index)}
                  key={answer}
                  className={`m-1 answer-button ${
                    selectedAnswerIndex === index
                      ? answerStatus === "correct"
                        ? "correct"
                        : answerStatus === "wrong"
                        ? "wrong"
                        : ""
                      : ""
                  }`}
                >
                  <p className="fw-bold h5 button-text">{answer}</p>
                </Button>
              ))}
            </div>

            <div className="d-flex justify-content-center align-items-center">
              <div className="d-flex justify-content-center flex-column align-items-center">
                <div className="answer-character mt-3">
                  <HtmlAnswerCharacter
                    lives={result.lives}
                    points={result.score}
                    alertMessage={alertMessage}
                    gameOver={gameOver}
                    allQuestionsAnswered={allQuestionAnswered}
                  />
                </div>
                <div className="mt-2 h2 bangers-text">{alertMessage}</div>
              </div>

              <div>
                {show ? (
                  <button
                    className="shaking-button bangers-text m-2 ms-5 bg-warning"
                    onClick={navigateToLevel3}
                  >
                    GO TO NEXT LEVEL
                  </button>
                ) : null}
                {showRestart ? (
                  <button
                    className="shaking-button bangers-text m-2 ms-5 bg-warning"
                    onClick={handleRestart}
                  >
                    TRY AGAIN!
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HtmlGame;

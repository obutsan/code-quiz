import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import questions from "../../databases/bootstrapChallenge";
import Challenge from "./BootstrapChallenge";
import Points from "./Points";
import Character from "./Character";
import LevelComplete from "./LevelComplete";
import GameOver from "./GameOver";
import Livess from "./../JavaScriptChallenge/Lives";
import { savePointsToStorage } from "../../utils/localStorage";
import "./Challenge3.css";

// Імпорт звуків
import correctSoundFile from "/sounds/correct.wav";
import wrongSoundFile from "/sounds/wrong.wav";

export default function Game() {
  const [lives, setLives] = useState(3);
  const [points, setPoints] = useState(0);
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("Ready");
  const [gameOver, setGameOver] = useState(false);
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);
  const [lastAnsweredQuestionIndex, setLastAnsweredQuestionIndex] = useState(-1);
  const [answerStatus, setAnswerStatus] = useState(null); // "correct" | "wrong" | null

  // Створення об'єктів звуку
  const correctSound = new Audio(correctSoundFile);
  const wrongSound = new Audio(wrongSoundFile);

  useEffect(() => {
    if (allQuestionsAnswered) {
      savePointsToStorage(points);
    }
  }, [allQuestionsAnswered]);

  useEffect(() => {
    const storedUserData = localStorage.getItem("currentUser");
    const parsedData = storedUserData ? JSON.parse(storedUserData) : { name: "", points: 0 };
    setPoints(parsedData.points);
  }, []);

  const handleAnswerButton = (userAnswer) => {
    if (gameOver) return;

    const correctAnswer = questions[count].correct_answer;

    if (userAnswer.trim() === correctAnswer) {
      setPoints((prevPoints) => prevPoints + 10);
      setMessage("Correct! + 10 points");
      setAnswerStatus("correct");
      correctSound.play(); // звук правильної відповіді
    } else {
      if (lives > 1) {
        setLives((prevLives) => prevLives - 1);
        setMessage("Incorrect! - 1 ❤️");
      } else {
        setLives(0);
        setLastAnsweredQuestionIndex(count);
        setGameOver(true);
        setMessage("No lives left!");
      }
      setAnswerStatus("wrong");
      wrongSound.play(); // звук неправильної відповіді
    }

    // Показати підсвічування перед переходом до наступного питання
    setTimeout(() => {
      setAnswerStatus(null);
      if (!gameOver) setCount((prevCount) => prevCount + 1);
      checkAllQuestionsAnswered();
    }, 1000);
  };

  const handleRestartGame = () => {
    setLives(3);
    setPoints(0);
    setCount(0);
    setMessage("Ready");
    setGameOver(false);
    setAllQuestionsAnswered(false);
    setLastAnsweredQuestionIndex(-1);
    setAnswerStatus(null);
  };

  const handleBuyLife = () => {
    if (points >= 10) {
      setLives((prevLives) => prevLives + 1);
      setPoints((prevPoints) => prevPoints - 10);
      setMessage("Life bought! - 10 points");
      setCount(lastAnsweredQuestionIndex);
      setGameOver(false);
    }
  };

  const checkAllQuestionsAnswered = () => {
    if (count === questions.length - 1) {
      setAllQuestionsAnswered(true);
    }
  };

  const currentQuestion = questions[count] || {};
  const imageSrc = currentQuestion.image || "";

  return (
    <Container className="mt-1">
      <Row className="text-center justify-content-center flex-row">
        <Col xs="12" className="mb-3">
          <div className="border border-2 border-warning rounded gap-3 p-3 bg-primary bg-opacity-25 bg-gradient d-flex justify-content-end align-items-center">
            <Livess lives={lives} />
            <Points points={points} totalQuestions={questions.length} pointsPerQuestion={10} />
          </div>
        </Col>

        <Col xs="12" className="mb-2">
          <Row>
            <Col xs="12" md="8" className="d-flex flex-column align-items-center">
              {imageSrc && <Image src={imageSrc} alt="Question Image" className="img-fluid question-img" />}

              <div className="w-100">
                {!gameOver && !allQuestionsAnswered && (
                  <Challenge
                    count={count}
                    handleAnswerButton={handleAnswerButton}
                    gameOver={gameOver}
                    answerStatus={answerStatus} // передаємо статус для підсвічування
                  />
                )}
                {allQuestionsAnswered && <LevelComplete totalQuestions={questions.length} pointsPerQuestion={10} />}
                {gameOver && <GameOver handleRestartGame={handleRestartGame} points={points} handleBuyLife={handleBuyLife} />}
              </div>
            </Col>

            <Col xs="12" md="4" className="d-flex justify-content-center align-items-center">
              <div className="w-100">
                <Character
                  lives={lives}
                  points={points}
                  message={message}
                  gameOver={gameOver}
                  allQuestionsAnswered={allQuestionsAnswered}
                  handleRestartGame={handleRestartGame}
                />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

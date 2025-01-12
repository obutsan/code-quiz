import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import questions from "../../databases/bootstrapChallenge";
import Challenge from "./BootstrapChallenge";
import Lives from "./Lives";
import Points from "./Points";
import Character from "./Character";
import LevelComplete from "./LevelComplete";
import GameOver from "./GameOver";
import Livess from "./../JavaScriptChallenge/Lives";
import { savePointsToStorage } from "../../utils/localStorage";

export default function Game() {
  const [lives, setLives] = useState(3);
  const [points, setPoints] = useState(0);
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("Ready");
  const [gameOver, setGameOver] = useState(false);
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);
  const [lastAnsweredQuestionIndex, setLastAnsweredQuestionIndex] =
    useState(-1);

  useEffect(() => {
    if (allQuestionsAnswered) {
      savePointsToStorage(points);
    }
  }, [allQuestionsAnswered]);

  useEffect(() => {
    const storedUserData = localStorage.getItem("currentUser");
    const parsedData = storedUserData
      ? JSON.parse(storedUserData)
      : { name: "", points: 0 };
    setPoints(parsedData.points);
  }, []);

  const handleAnswerButton = (userAnswer) => {
    if (gameOver) return;

    const correctAnswer = questions[count].correct_answer;

    if (userAnswer.trim() === correctAnswer) {
      setPoints((prevPoints) => prevPoints + 10);
      setMessage("Correct! + 10 points");
    } else {
      if (lives > 1) {
        setLives((prevLives) => prevLives - 1);
        setMessage("Incorrect! - 1 ❤️");
      } else {
        setLives(0);
        setLastAnsweredQuestionIndex(count);
        setGameOver(true);
        setMessage("No lives left!");
        return;
      }
    }

    if (!gameOver) setCount((prevCount) => prevCount + 1);
    checkAllQuestionsAnswered();
  };

  const handleRestartGame = () => {
    setLives(3);
    setPoints(0);
    setCount(0);
    setMessage("Ready");
    setGameOver(false);
    setAllQuestionsAnswered(false);
    setLastAnsweredQuestionIndex(-1);
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
        <Col xs="12" className="mb-5">
          <div className="border border-2 border-warning rounded gap-3 p-3 bg-primary bg-opacity-25 bg-gradient d-flex justify-content-end align-items-center">
            <Livess lives={lives} />
            <Points
              points={points}
              totalQuestions={questions.length}
              pointsPerQuestion={10}
            />
          </div>
        </Col>

        <Col xs="12" className="mb-2">
          <Row>
            <Col
              xs="12"
              md="6"
              className="d-flex flex-column align-items-center"
            >
              {imageSrc && (
                <Image
                  src={imageSrc}
                  alt="Question Image"
                  fluid
                  className="img-fluid mb-2"
                />
              )}

              <div className="w-100">
                {!gameOver && !allQuestionsAnswered && (
                  <Challenge
                    count={count}
                    handleAnswerButton={handleAnswerButton}
                    gameOver={gameOver}
                  />
                )}
                {allQuestionsAnswered && (
                  <LevelComplete
                    totalQuestions={questions.length}
                    pointsPerQuestion={10}
                  />
                )}
                {gameOver && (
                  <GameOver
                    handleRestartGame={handleRestartGame}
                    points={points}
                    handleBuyLife={handleBuyLife}
                  />
                )}
              </div>
            </Col>

            <Col
              xs="12"
              md="6"
              className="d-flex justify-content-center align-items-center"
            >
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

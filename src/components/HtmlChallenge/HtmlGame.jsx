import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import htmlQuestionList from "../../databases/htmlQuestionsList.json";
import { Button, Container } from "react-bootstrap";
import HtmlAnswerCharacter from "./HtmlAnswerCharacter";
import "./HtmlGame.css";
import { savePointsToStorage } from "../../utils/localStorage";
import Lives from "./../JavaScriptChallenge/Lives";

const HtmlGame = () => {
  const [show, setShow] = useState(false);
  const [showRestart, setShowRestart] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [allQuestionAnswered, setAllQuestionAnswered] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [alertMessage, setAlertMessage] = useState("Start!");

  let [result, setResult] = useState({
    lives: 3,
    score: 0,
  });

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
      // updateLeaderBoardStorage();
    }
  }, [allQuestionAnswered, result.score]);

  const { question, options, correctAnswer } =
    htmlQuestionList[currentQuestion];

  const handleShow = () => setShow(true);

  const navigate = useNavigate();
  const navigateToLevel3 = () => {
    navigate("/level3welcome");
  };
  const handleRestart = () => {
    setShowRestart(false);
    setResult({ lives: 3, score: 0 });
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setSelectedAnswerIndex(null);
    setAllQuestionAnswered(false);
    setGameOver(false);
    setAlertMessage("Start!");
  };

  const onClickNext = () => {
    setSelectedAnswerIndex(null);
    if (currentQuestion !== htmlQuestionList.length - 1 && result.lives > 0) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setAlertMessage("Well done! Hurray!");
      setAllQuestionAnswered(true);
      handleShow();
    }
  };

  const onAnswerSelected = (answer, index) => {
    if (gameOver) return;
    setSelectedAnswerIndex(index);
    if (answer === correctAnswer) {
      setSelectedAnswer(true);
      setAlertMessage("Correct!");
      setResult((prev) => ({ ...prev, score: prev.score + 10 }));
    } else if (result.lives > 1) {
      setSelectedAnswer(false);
      setAlertMessage("Wrong!");
      setResult((prev) => ({ ...prev, lives: prev.lives - 1 }));
    } else {
      setResult((prev) => ({ ...prev, lives: prev.lives - 1 }));
      setAlertMessage("Game Over!");
      setResult({ lives: 3, score: 0 });
      setGameOver(true);
      setAllQuestionAnswered(true);
      setShowRestart(true);
      return;
    }
    if (currentQuestion === htmlQuestionList.length - 1) {
      setAllQuestionAnswered(true);
      setGameOver(true);
    }
    onClickNext();
  };

  return (
    <>
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
                    id={
                      selectedAnswerIndex === index ? "selected-answer" : null
                    }
                    className="m-1 answer-button border border-5"
                  >
                    <p className="fw-bold  h5 button-text">{answer}</p>
                  </Button>
                ))}
              </div>
              <div className="d-flex justify-content-center align-items-center">
                <div className="d-flex justify-content-center flex-column align-items-center">
                  <div className="answer-character mt-3">
                    <HtmlAnswerCharacter
                      lives={result.lives}
                      points={result.points}
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
        {/*
				<Container className="m-1 d-flex flex-column justify-content-center align-items-center">
  <div className='col-12 col-md-10 col-lg-8 d-flex flex-column flex-md-row justify-content-around w-100'>
    <div className="m-2 d-flex justify-content-center">
      <div className="d-block mx-auto img-fluid px-2">
        <img
          className="quest-img object-fit-contain d-block"
          src="/assets/HtmlGame/htmlstart.jpeg"
          alt="coding man"
          style={{ maxWidth: '30em', height: 'auto' }}
        />
      </div>
    </div>

    <div className="col-12 col-md-6 m-1 px-2">
      <h2 className="h3 mt-4 text-warning bangers-text tracking-wide">
        💥 {currentQuestion + 1}. {question}
      </h2>
      <div className="d-flex flex-column mt-4">
        {options.map((answer, index) => (
          <Button
            style={{ height: '3em' }}
            onClick={() => onAnswerSelected(answer, index)}
            key={answer}
            id={selectedAnswerIndex === index ? 'selected-answer' : null}
            className="m-1 answer-button border border-5"
          >
            <p className="fw-bold h5 button-text">{answer}</p>
          </Button>
        ))}
      </div>
      <div className="d-flex justify-content-center flex-md-row flex-column align-items-center mt-4">
        <div className="d-flex justify-content-center flex-column align-items-center">
          <div className='answer-character mt-5'>
            <HtmlAnswerCharacter
              lives={result.lives}
              points={result.points}
              alertMessage={alertMessage}
              gameOver={gameOver}
              allQuestionsAnswered={allQuestionAnswered}
            />
          </div>
          <div className="mt-3 h2 bangers-text">
            {alertMessage}
          </div>
        </div>
        <div className="mt-3">
          {show ? (
            <button
              className="shaking-button bangers-text m-2 bg-warning"
              onClick={navigateToLevel3}
            >
              GO TO NEXT LEVEL
            </button>
          ) : null}
          {showRestart ? (
            <button
              className="shaking-button bangers-text m-2 bg-warning"
              onClick={handleRestart}
            >
              TRY AGAIN!
            </button>
          ) : null}
        </div>
      </div>
    </div>
  </div>
</Container>*/}
      </div>
    </>
  );
};
export default HtmlGame;

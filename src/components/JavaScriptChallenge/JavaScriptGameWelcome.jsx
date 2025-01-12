import { Container, Row, Button } from "react-bootstrap";
import LevelWelcomeContent from "../LevelWelcomeContent/LevelWelcomeContent";
import questList from "../../databases/questList.json";
import "../../components/HtmlChallenge/HtmlGame.css";

const JavaScriptGameWelcome = () => {
  const level1Game = questList.find((game) => game.id === 1);

  return (
    <Container className="animated-container d-flex flex-column justify-content-center align-items-center">
      <Row className="d-flex justify-content-center align-items-center">
        {level1Game && (
          <LevelWelcomeContent
            id={level1Game.id}
            key={level1Game.id}
            name={level1Game.name}
            image={level1Game.image}
            description={level1Game.description}
            instruction={level1Game.instruction}
          />
        )}
      </Row>
    </Container>
  );
};

export default JavaScriptGameWelcome;

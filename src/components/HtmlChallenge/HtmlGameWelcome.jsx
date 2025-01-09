import {  Container, Row, Button  } from 'react-bootstrap';
import LevelWelcomeContent from "../LevelWelcomeContent/LevelWelcomeContent";
import questList from '../../databases/questList.json';
import './HtmlGame.css';

const HtmlGameWelcome = () => {
	const level2Game = questList.find((game) => game.id === 2);

	return (
		<Container className="animated-container d-flex flex-column justify-content-center align-items-center">
			<Row className="d-flex justify-content-center align-items-center">
				{level2Game && (
					<LevelWelcomeContent
						id={level2Game.id}
						key={level2Game.id}
						name={level2Game.name}
						image={level2Game.image}
						description={level2Game.description}
						instruction={level2Game.instruction}
					/>
				)}
			</Row>
		</Container>
	);
};

export default HtmlGameWelcome;

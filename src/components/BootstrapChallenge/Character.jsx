import React from 'react';
import { Image } from 'react-bootstrap';
import characterData from "../../databases/bootstrapCharacter.json";
import './Challenge3.css'


const ProgressModule = ({ message, gameOver, allQuestionsAnswered }) => {
    const getCharacterImage = () => {
        let character;

        if (gameOver) {
            character = characterData.find(character => character.id === "gameOverCharacter");
        } else if (allQuestionsAnswered) {
            character = characterData.find(character => character.id === "gameWonCharacter");
        } else if (message.startsWith("Life bought")) {
            character = characterData.find(character => character.id === "readyCharacter");
        } else {
            character = characterData.find(character =>
                (character.id === "winCharacter" && message.startsWith("Correct")) ||
                (character.id === "loseCharacter" && message.startsWith("Incorrect")) ||
                (character.id === "readyCharacter" && message === 'Ready')
            );
        }

        return character ? (
            <Image 
                src={character.image} 
                alt={character.id} 
                fluid 
                className="img-fluid custom-height" // Set the maxHeight here
            />
        ) : null; // Handle the case when character is not found
    };

    return (
        <div>
            {getCharacterImage()}            
        </div>
    );
};


/*const ProgressModule = ({ message, gameOver, allQuestionsAnswered }) => {
    const getCharacterImage = () => {
        if (gameOver) {
            const gameOverCharacter = characterData.find(character => character.id === "gameOverCharacter");
            return <Image  src={gameOverCharacter.image} alt="gameOverCharacter" fluid />;
        }
        if (allQuestionsAnswered) {
            const gameWonCharacter = characterData.find(character => character.id === "gameWonCharacter");
            return <Image src={gameWonCharacter.image} alt="gameWonCharacter" fluid />;
        }
        if (message.startsWith("Life bought")) {
            const readyCharacter = characterData.find(character => character.id === "readyCharacter");
            return <Image src={readyCharacter.image} alt="readyCharacter" fluid />;
        }
        const character = characterData.find(character =>
            (character.id === "winCharacter" && message.startsWith("Correct")) ||
            (character.id === "loseCharacter" && message.startsWith("Incorrect")) ||
            (character.id === "readyCharacter" && message === 'Ready')
        );
        return <Image src={character.image} alt={character.id} fluid />;
    };

    return (
        <div>
            {getCharacterImage()}            
        </div>
    );
};*/

export default ProgressModule;

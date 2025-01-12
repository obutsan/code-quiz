import React, { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import questions from '../../databases/bootstrapChallenge.json';

export default function Challenge({ count, handleAnswerButton, gameOver, questionAnswered }) {
	const questionData = questions[count] || {};
	const question = questionData.question || '';
	const answerOptions = questionData.options || [];
	const [userAnswer, setUserAnswer] = useState('');
	const [validationError, setValidationError] = useState('');
	const [submittedWithoutInput, setSubmittedWithoutInput] = useState(false); 

	const handleAnswer = (event) => {
		event.preventDefault();
		if (!gameOver && !questionAnswered) {
			const trimmedAnswer = userAnswer.trim();
			if (trimmedAnswer !== '') {
				handleAnswerButton(trimmedAnswer);
				setUserAnswer('');
				setValidationError('');
				setSubmittedWithoutInput(false);
			} else {
				setValidationError('Hey! You forgot to answer!');
				setSubmittedWithoutInput(true); 
			}
		}
	};

	return (
		<>
			<div id='challenge'>
				<h4 className="my-3">Question {count + 1}:</h4>
				<p className='question h4 fw-bold text-warning'>{question}</p>
				
				<Form onSubmit={handleAnswer} className="mx-auto mt-4" style={{ maxWidth: '400px' }}>
          <InputGroup>
            <Form.Select
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              disabled={gameOver || questionAnswered}
              className={submittedWithoutInput && userAnswer.trim() === '' ? "bg-danger-subtle" : ""}
            >
              {answerOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
                ))}
            </Form.Select>
            <Button type="submit" className="gradient-bg-blue-no-shadow" disabled={gameOver || questionAnswered}>
            Submit
            </Button>
          </InputGroup>
        </Form>
			</div>
		</>
	);
}

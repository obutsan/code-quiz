import { v4 as uuidv4 } from 'uuid';
import questions from '../../databases/javascriptQuestions.json'
import './JavaScriptChallange.css'

export default function JavaScriptChallenge({ count, handleAnswerButton, isFormDisabled, handleRadioChange, selectedOption, isWin, isCorrect, status}) {
	const question = questions[count].question || {};
	const answerOptions = questions[count].options || [];

	return (
		<div className="container challenge1">
			<div className="d-block mx-lg-auto img-fluid px-2">
        <img className="hero1 object-fit-contain d-block justify-content-center " src="images/officeKnight.gif" alt="hero1" style={{maxWidth: '20em', height: '100%'}}></img>
      </div>
			<div className='container challenge' id='challengeLevel1'>
				<h3 className='question'>{question}</h3>
				<div className='options'>
					<form onSubmit={handleAnswerButton} disabled={isFormDisabled}>
						{answerOptions.map((option, index) => (
							<div key={uuidv4()} className="form-check">
								<input
									type="radio"
									className="form-check-input"
									name="answer"
									id={`option${index}`}
									value={option}
								/>
								<label className="form-check-label" htmlFor={`option${index}`}>
									{option}
								</label>
							</div>
						))}
						<button type="submit" className="btn btn-warning mt-3 answerBtn" disabled={isFormDisabled}>
							Submit
						</button>
					</form>
				</div>
			</div>
			<div className="d-block mx-lg-auto img-fluid px-2">
        <img className="answer object-fit-contain d-block justify-content-center" src="/images/js/start.jpg" alt="answer" style={{maxWidth: '15em', height: '100%'}}></img>
      </div>
		</div>
	);
}
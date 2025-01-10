import { v4 as uuidv4 } from 'uuid';
import questions from '../../databases/javascriptQuestions.json'
import './JavaScriptChallange.css'

export default function JavaScriptChallenge({ count, handleAnswerButton, isFormDisabled, handleRadioChange, selectedOption, isWin, isCorrect, status}) {
	const question = questions[count].question || {};
	const answerOptions = questions[count].options || [];

	return (
	  <div className="container container-fluid  challenge1 d-flex flex-column flex-lg-row align-items-center justify-content-center gap-3 py-3"
      style={{ backgroundColor: '#0d213c'}} id='challengeLevel1'>

      <div className="col-12 col-md-6 text-center">
        <img className="hero1 img-fluid" src="images/officeKnight.gif" alt="hero1" style={{ maxWidth: '20em', height: 'auto' }}/>
      </div>

      <div className="col-12 col-md-8 col-lg-6 justify-content-center challenge text-center py-3 px-4" style={{ border: '10px solid #0d213c', borderRadius: '8px', backgroundColor: 'rgba(35, 105, 173, 0.5)' }}>
        <h3 className="question" style={{ fontWeight: '700', borderBottom: '4px solid rgba(255, 100, 0, 0.5)', marginBottom: '1rem' }}>{question}</h3>
      	<form onSubmit={handleAnswerButton} disabled={isFormDisabled}>
          <div className="btn-group-vertical w-100">
            {answerOptions.map((option, index) => (
            <div key={uuidv4()} className="form-check w-100">
			      <input type="radio" сlassName="btn-check" name="answer" id={`option${index}`} value={option}/>
			      <label className="btn btn-outline-primary" htmlFor={`option${index}`}>
				      {option}
			      </label>
		        </div>
            ))}
          </div>
         <button type="submit" className="btn btn-warning mt-3 answerBtn" disabled={isFormDisabled}>
          Submit
         </button>
        </form>
      </div>
   </div>
	);
}
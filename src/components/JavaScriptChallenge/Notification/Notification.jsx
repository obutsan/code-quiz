import toast from "react-hot-toast";
import Nav from "react-bootstrap/Nav";
import "./Notification.css";

const imageMap = {
  start: "/images/js/go.jpg",
  correct: "/images/js/correct2.jpg",
  incorrect: "/images/js/wrong1.jpg",
  victory: "/images/js/win.jpg",
  lost: "/images/js/lost1.jpg",
  nextlevel: "/images/js/nextlevel2.jpg",
  chooseanswer: "/images/js/chooseanswer.jpg",
  tryagain: "/images/js/tryagain.jpg",
};

const cardStyles = {
  backgroundColor: "#0C49A2",
  color: "#fff",
  border: "1px solid #2369AD",
  boxShadow: "0 0 30px rgba(255, 165, 0, 0.5)",
};

const buttonStyles = {
  backgroundColor: "rgba(255, 100, 0, 0.6)",
  color: "#fff",
  border: "none",
};

export const successfulNotification = (points) => {
  toast(
    (t) => (
      <div
        className="notification text-dark rounded"
        style={{
          backgroundColor: "rgba(255, 223, 0, 0.9)",
          padding: "20px",
        }}
      >
        <div className="row g-0 align-items-center text-center">
          <div className="col-md-4">
            <img
              src={imageMap.victory}
              className="img-fluid rounded-circle"
              alt="victory image"
              style={{
                height: "80px",
                objectFit: "cover",
                margin: "auto",
                border: "4px solid #FFD700",
              }}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title fw-bold">Congratulations!!!</h5>
              <p className="card-text fw-bold">You earned {points} points!</p>
              <div className="d-flex justify-content-between mt-3">
                <Nav.Link
                  href="/"
                  className="btn btn-outline-dark"
                  style={{
                    borderColor: "rgba(255, 165, 0, 0.5)",
                    color: "#333",
                    backgroundColor: "rgba(255, 165, 0, 0.5)",
                    padding: "5px",
                  }}
                >
                  Exit Game
                </Nav.Link>
                <Nav.Link
                  href="/level2welcome"
                  className="btn btn-outline-dark"
                  style={{
                    borderColor: "rgba(255, 165, 0, 0.5)",
                    color: "#333",
                    backgroundColor: "rgba(255, 165, 0, 0.5)",
                    padding: "5px",
                  }}
                >
                  Next Level
                </Nav.Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      style: {
        border: "7px solid #FFD700", // Золота рамка
        width: "500px",
        maxWidth: "90vw",
        padding: "15px",
        color: "#333", // Темний текст для контрасту
        backgroundColor: "rgba(255, 223, 0, 0.9)", // Яскравий жовтий фон
        boxShadow: "0 0 20px rgba(255, 223, 0, 0.8)", // Жовтий відблиск
      },
      duration: Infinity,
    }
  );
};

export const failNotification = () => {
  toast(
    (t) => (
      <div
        className="card mb-3 notification"
        style={{ maxWidth: "540px", ...cardStyles }}
      >
        <div className="row g-0">
          <div className="col-md-8">
            <img
              src={imageMap.lost}
              className="img-fluid rounded-start"
              alt="game over"
            />
          </div>
          <div className="col-md-4 d-flex flex-column justify-content-center">
            <Nav.Link
              href="/"
              className="btn btn-danger mb-2"
              style={buttonStyles}
            >
              Exit Game
            </Nav.Link>
            <Nav.Link
              href="/level1"
              className="btn btn-primary"
              style={{ ...buttonStyles, backgroundColor: "#2369AD" }}
            >
              Restart
            </Nav.Link>
          </div>
        </div>
      </div>
    ),
    {
      style: {
        border: "7px solid #FFD700",
        //width: '500px',
        maxWidth: "90vw",
        padding: "15px",
        color: "#333",
        backgroundColor: "#0C49A2",
        boxShadow: "0 0 20px rgba(255, 223, 0, 0.8)", // Жовтий відблиск
      },
      duration: Infinity,
    }
  );
};

export const correctAnswerNotification = () => {
  toast(
    (t) => (
      <div
        className="notification text-white rounded"
        style={{ backgroundColor: "rgba(0, 128, 0, 0.8)" }}
      >
        <div className="row g-0 align-items-center text-center">
          <div className="col-md-6">
            <img
              src={imageMap.correct}
              className="img-fluid rounded-circle"
              alt="correct answer"
              style={{
                height: "100px",
                objectFit: "cover",
                margin: "auto",
                border: "4px solid #28a745",
              }}
            />
          </div>
          <div className="col-md-6">
            <div className="card-body">
              <h5 className="card-title fw-bold">Correct!!!</h5>
              <p className="card-text fw-bold">You earned 10 points!</p>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      style: {
        border: "7px solid #28a745", // Green border
        padding: "10px",
        color: "#fff",
        backgroundColor: "rgba(0, 128, 0, 0.8)", // Green background
        boxShadow: "0 0 20px rgba(0, 255, 0, 0.5)", // Green glow
      },
      duration: 1500,
    }
  );
};

export const wrongtAnswerNotification = () => {
  toast(
    (t) => (
      <div
        className="notification text-white rounded"
        style={{ backgroundColor: "rgba(255, 0, 0)" }}
      >
        <div className="row g-0 align-items-center text-center">
          <div className="col-md-6">
            <img
              src={imageMap.incorrect}
              className="img-fluid"
              alt="wrong answer"
              style={{
                height: "100px",
                objectFit: "cover",
                margin: "auto",
                border: "4px solid #dc3545",
              }}
            />
          </div>
          <div className="col-md-6">
            <div className="card-body">
              <h5 className="card-title fw-bold">Wrong Answer!</h5>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      style: {
        border: "7px solid #dc3545",
        padding: "10px",
        color: "#fff",
        backgroundColor: "rgba(255, 0, 0)",
        boxShadow: "0 0 20px rgba(255, 0, 0, 0.5)",
      },
      duration: 1500,
    }
  );
};

export const rememberNotification = () => {
  toast(
    (t) => (
      <div
        className="notification text-white rounded"
        style={{ backgroundColor: "rgba(255, 165, 0, 0.9)" }}
      >
        <div className="row g-0 align-items-center text-center">
          <div className="col-md-6">
            <img
              src={imageMap.chooseanswer}
              className="img-fluid"
              alt="choose answer"
              style={{
                height: "100px",
                objectFit: "cover",
                margin: "auto",
                border: "4px solid rgba(255, 100, 0)",
              }}
            />
          </div>
          <div className="col-md-6">
            <div className="card-body">
              <h5 className="card-title fw-bold">Reminder!</h5>
              <p className="card-text fw-bold">Please choose an answer!</p>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      style: {
        border: "7px solid #FFA500",
        padding: "10px",
        color: "#fff",
        backgroundColor: "rgba(255, 165, 0, 0.9)",
        boxShadow: "0 0 20px rgba(255, 165, 0, 0.7)",
      },
      duration: 1500,
    }
  );
};

/*import toast from 'react-hot-toast';
import Nav from 'react-bootstrap/Nav';
import './Notification.css'

const imageMap = {
	start: '/images/js/go.jpg',
	correct: '/images/js/correct2.jpg',
	incorrect: '/images/js/wrong2.jpg',
	victory: '/images/js/win.jpg',
	lost: '/images/js/lost1.jpg',
	gameover: '/images/js/start.jpg',
	nextlevel: '/images/js/nextlevel2.jpg',
	chooseanswer: '/images/js/chooseanswer.jpg',
	tryagain: '/images/js/tryagain.jpg',
};

export const successfulNotification = (points) => {
  toast((t) => (
     <div className="card mb-3 notification" style={{ maxWidth: '540px' }}>
       <div className="row g-0">
        <div className="col-md-4">
          <img src={imageMap.victory} className="img-fluid rounded-start" alt="win image"/>
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">Congratulations!!!</h5>
            <p className="card-text">You earn {points} points and go to next level</p>
          </div>
          <div className='buttons'>
          <button className="btn btn-danger"> <Nav.Link href={`/`}>Exit Game</Nav.Link>
          </button>
          <button className="btn btn-success"> <Nav.Link href={`/level2welcome`}>Next Level
        </Nav.Link>
          </button>
          </div>
        </div>
      </div>
    </div>
  ),
  {
    duration: Infinity,
    },
    {
      style: {
        width: '500px',
      }
    },);
    }; 



export const failNotification = () => {
  toast((t) => (
     <div className="card mb-3" style={{ maxWidth: '540px' }}>
       <div className="row g-0 gameOver">
          <div className="col-md-8">
          <img src={imageMap.gameover} className="img-fluid rounded-start" alt="sad image"/>
          </div>
          <div className='buttons'>
          <button> <Nav.Link className="nav-element" href={`/`}>Exit Game</Nav.Link>
          </button>
          <button> <Nav.Link className="nav-element" href={`/level1`}>Start again</Nav.Link>
          </button>
          </div>
        </div>
      </div>
  ),
  {
    duration: Infinity,
    }
    ); 
}

export const correctAnswerNotification = () => {
  toast((t) => (
     <div className="card mb-3 notification" style={{ maxWidth: '540px' }}>
       <div className="row g-0">
        <div className="col-md-4">
          <img src={imageMap.correct} className="img-fluid rounded-start" alt="win image"/>
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">Correct Answer</h5>
            <p className="card-text">You earned 10 points!</p>
          </div>
        </div>
      </div>
    </div>
  ),
  {
    duration: 1500,
    },
    {
      style: {
        width: '500px',
      }
    },);
}

export const wrongtAnswerNotification = () => {
  toast((t) => (
     <div className="card mb-3 notification" style={{ maxWidth: '540px' }}>
       <div className="row g-0">
        <div className="col-md-4">
          <img src={imageMap.incorrect} className="img-fluid rounded-start" alt="wrong answer"/>
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">Wrong Answer!</h5>
          </div>
        </div>
      </div>
    </div>
  ),
  {
    duration: 1500,
    },
    {
      style: {
        width: '500px',
      }
    },);
}

export const rememberNotification = () => {
  toast((t) => (
     <div className="card mb-3" style={{ maxWidth: '540px' }}>
       <div className="row g-0">
        <div className="col-md-4">
          <img src={imageMap.chooseanswer} className="img-fluid rounded-start" alt="remember message"/>
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">Please choose the answer!</h5>
          </div>
        </div>
      </div>
    </div>
  ),
  {
    duration: 1500,
    },
    {
      style: {
        width: '500px',
      }
    },);
}

*/

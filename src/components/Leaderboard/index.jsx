import React, { useState, useEffect } from "react";
import { Modal, Button, Container, Row, Col, Image } from "react-bootstrap";
import { getAllDataFromSupabase } from "../../utils/Supabase";
import cheerGif from "/images/fireGif.gif";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const LeaderBoard = ({ onClose }) => {
  const [playersData, setPlayersData] = useState([]);
  const navigate = useNavigate();

  async function getPlayersData() {
    try {
      const data = await getAllDataFromSupabase();
      const sortedData = data.sort((a, b) => b.score - a.score);
      const topTenData = sortedData.slice(0, 10);
      setPlayersData(topTenData);
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    getPlayersData();
  }, []);

  const handleStartAgain = () => {
    navigate("/");
    onClose();
    localStorage.removeItem('currentUser'); 
  };

  return (
    <Container>
      <Modal.Dialog
        scrollable
        className="border border-info border-3 rounded p-4 w-100"
      >
        <Modal.Header className="d-flex text-center">
          <h2 className="modal-title w-100 h1 me-5 text-warning">
            Leaderboard
          </h2>
          {/* Close Button */}
          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={onClose}
          ></button>
        </Modal.Header>
        <Modal.Body className="p-3">
          <Row>
            {/* Image Section */}
            <Col md="6" className="text-center my-md-5">
              <Image
                className="img-fluid rounded align-self-start"
                src={cheerGif}
                alt="CodeQuest background"
                style={{ maxWidth: "300px" }}
              />
            </Col>

            {/* Leaderboard Section */}
            <Col md="6" className="d-flex flex-column align-items-start my-4">
              {/* Leaderboard Table */}
              <table className="table table-dark bg-gradient bg-opacity-50 border rounded-3">
                <thead className="table-warning">
                  <tr>
                    <th className="text-primary px-4 py-2">Player</th>
                    <th className="text-success px-4 py-2">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {playersData.map(({ name, score, id }) => (
                    <tr key={id} className="table-light border-bottom">
                      <td className="px-4 py-2">{name}</td>
                      <td className="px-4 py-2">{score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          {/* Buttons */}
          <div className="d-flex flex-wrap gap-3 mt-4">
            <Button
              className="rounded-pill gradient-bg-orange text-white px-4 py-2"
              variant="warning"
              onClick={handleStartAgain}
            >
              Start Again
            </Button>
            <Button
              className="rounded-pill gradient-bg-orange text-white px-4 py-2"
              variant="outline-warning"
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        </Modal.Footer>
      </Modal.Dialog>
    </Container>
  );
};

export default LeaderBoard;

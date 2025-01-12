import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Form,
  Button,
  InputGroup,
  Nav,
} from "react-bootstrap";
import Typewriter from "typewriter-effect";
import { useNavigate } from "react-router-dom";
import { saveCurrentUser } from "../utils/localStorage";
import fightGif from "/images/fightGif.gif";

const Welcome = () => {
  const [formData, setFormData] = useState({ username: "" });
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveCurrentUser(formData.username, 0);
    if (!formData.username.trim()) {
      setError("Please enter your username!");
      setShow(false);
    } else {
      setShow(true);
      setError("");
    }
  };

  const navigateToLevel1Welcome = () => {
    navigate("/level1welcome");
  };

  return (
    <Container className="vh-100">
      <Row>
        <Col md="6" className="order-md-2 d-flex align-items-center h-auto">
          <Image
            className="ps-md-5"
            src={fightGif}
            alt="CodeQuest background"
            fluid
            rounded
            style={{ maxHeight: "70vh", height: "auto" }}
          />
        </Col>
        <Col
          md="6"
          className="order-md-1 d-flex flex-column justify-content-center"
        >
          <h1
            className="mt-4 text-responsive"
            style={{ height: "200px", overflow: "hidden" }}
          >
            Welcome to{" "}
            <span className="text-warning">
              {" "}
              <Typewriter
                options={{
                  strings: ["CodeQuest, <br> Front-end Chronicles!"],
                  autoStart: true,
                  loop: true,
                  delay: 100,
                  deleteSpeed: 30,
                }}
              />
            </span>
          </h1>

          {!show && (
            <Form onSubmit={handleSubmit}>
              <p className="fs-5">
                Your coding skills will be put to the test as you venture forth
                into the digital realm of CodeQuest.
              </p>
              <h2 className="mt-5">Enter your name to begin:</h2>
              <InputGroup className="my-5">
                <Form.Control
                  type="text"
                  name="username"
                  className="rounded-pill me-3 w-75"
                  placeholder="Player Name"
                  value={formData.username}
                  onChange={handleInputChange}
                />
                <Button type="submit" className="rounded-pill gradient-bg-blue">
                  Submit
                </Button>
              </InputGroup>
            </Form>
          )}

          {error && <Form.Text className="text-danger">{error}</Form.Text>}

          {show && (
            <>
              <div>
                <p className="fs-4">
                  Hello,{" "}
                  <span className="text-danger bold-text">
                    {formData.username}
                  </span>
                  !
                </p>
                <p className="fs-5">
                  You are embarking on a journey to become a skilled{" "}
                  <span className="bold-text text-warning">
                    front-end developer
                  </span>
                  , and face the challenges plaguing the digital kingdom.
                </p>
              </div>
              <div className="d-flex flex-column">
                <Button
                  className="my-4 gradient-bg-orange rounded-pill btn-lg"
                  onClick={navigateToLevel1Welcome}
                >
                  Start the Game
                </Button>
              </div>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Welcome;

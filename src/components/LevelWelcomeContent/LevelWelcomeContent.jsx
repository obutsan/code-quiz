import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Image, Button } from "react-bootstrap";

const LevelWelcomeContent = (props) => {
  const navigate = useNavigate();
  const navigateToLevel = () => {
    navigate(`/level${props.id}`);
  };
  return (
    <>
      <Container>
        <Row className="justify-content-center align-items-center">
          <Col md="6" className="order-md-2 py-3">
            <Image
              src={props.image}
              alt={props.name}
              fluid
              className="d-block mx-lg-auto img-fluid p-5"
            />
          </Col>
          <Col md="6" className="order-md-1">
            <h2 className="fw-bold mb-3">{props.name}</h2>
            <p className="mt-5">{props.description}</p>
            <p>{props.instruction}</p>
            <Button
              className="btn gradient-bg-orange rounded-pill btn-lg bold-text text-white mt-5"
              onClick={navigateToLevel}
            >
              ⚔️ Start ⚔️
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LevelWelcomeContent;

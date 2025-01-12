import { Container, Row, Col, Button } from "react-bootstrap";
import IconButton from "@mui/material/IconButton";
import { GitHub, Instagram, LinkedIn } from "@mui/icons-material";
import logo from "/images/logo.png";

function Footer() {
  return (
    <Container className="py-3">
      <hr className="my-4"></hr>
      <Row className="d-flex align-items-center">
        <Col xs={12} md={4} className="text-center mb-3">
          <h5 className="mb-2">Information</h5>
          <ul className="list-unstyled d-flex justify-content-center gap-4 align-items-center">
            <li>
              <a
                href="/about"
                className="fw-light link-light link-offset-3 link-underline-opacity-25 link-underline-opacity-100-hover"
              >
                About us
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="fw-light link-light link-offset-3 link-underline-opacity-25 link-underline-opacity-100-hover"
              >
                Contact us
              </a>
            </li>
          </ul>
        </Col>
        <Col xs={12} md={4} className="text-center mb-3">
          <h5 className="mb-2">Follow Us</h5>
          <div className="d-flex justify-content-center align-items-center">
            <IconButton
              color="inherit"
              href="https://github.com/AoifeEdX/code-quest"
              target="_blank"
              aria-label="GitHub"
              className="text-white me-2"
            >
              <GitHub />
            </IconButton>
            <IconButton
              color="inherit"
              href="https://instagram.com"
              target="_blank"
              aria-label="Instagram"
              className="text-white me-2"
            >
              <Instagram />
            </IconButton>
            <IconButton
              color="inherit"
              href="https://www.linkedin.com"
              target="_blank"
              aria-label="LinkedIn"
              className="text-white"
            >
              <LinkedIn />
            </IconButton>
          </div>
        </Col>
        <Col
          xs={12}
          md={4}
          className="text-center d-flex flex-column align-items-center"
        >
          <img
            src={logo}
            alt="Logo"
            className="footer-logo mb-2"
            style={{ maxWidth: "50px", maxHeight: "50px" }}
          />
          <p className="fw-light m-0">© {new Date().getFullYear()}</p>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;

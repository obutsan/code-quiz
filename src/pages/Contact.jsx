import React, { useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import IconButton from "@mui/material/IconButton";
import { Email, GitHub, LinkedIn, Phone } from "@mui/icons-material";
import supabase from "./../utils/Supabase";
import { toast } from 'react-hot-toast';

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const Contact = () => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({
    userName: null,
    email: null,
    message: null,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const { userName, email, message } = formData;

    if (!userName || !email) {
      toast.error('Enter valid name and email.');
      return;
    }

    if (!isValidEmail(email)) {
      toast.error('Enter valid email.');
      return;
    }

    if (!message) {
      toast.error('Write your message');
      return;
    }

    console.log("Data to insert:", { userName, email, message });

    const { data, error } = await supabase
      .from('messages')
      .insert([{ userName, email, message }]);

    if (error) {
      console.error('Error inserting data:', error);
      toast.error('An error occurred while sending your message.');
    } else {
      toast.success(`Hello, ${userName}. Thank you for your message!`);
      setFormData({ userName: '', email: '', message: '' });
    }
  };

  return (
    <div>
      <Container>
        <Row className="mt-3 pt-3">
          <Col md={12} className="mt-3 pt-3">
            <h2>
              Contact <span className="bold-text text-danger">CodeQuest</span>
            </h2>
            <hr />
          </Col>
        </Row>
        <Row>
          <Col md={7}>
            <p className="my-5 fs-5">
              If you have any inquiries or feedback for{" "}
              <span className="bold-text text-warning">CodeQuest</span>, please
              feel free to reach out to us. We're here to help and provide
              assistance with any questions you may have.
            </p>
            <div className="fs-5">
              <p className="mt-5 text-warning ">
                <IconButton
                  href="tel:+440123456789"
                  className="text-warning me-4"
                >
                  <Phone />
                </IconButton>
                +44 01 2345 6789
              </p>
              <p className="mt-4">
                <a
                  href="mailto:info@codequest.com"
                  className="link-warning link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                >
                  <IconButton className="text-warning me-4">
                    <Email />
                  </IconButton>
                  info@codequest.com
                </a>
              </p>
              <p className="mt-4">
                <a
                  href="https://github.com/AoifeEdX/code-quest"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-warning link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                >
                  <IconButton className="text-warning me-4">
                    <GitHub />
                  </IconButton>
                  GitHub
                </a>
              </p>
              <p className="mt-4">
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-warning link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                >
                  <IconButton className="text-warning me-4">
                    <LinkedIn />
                  </IconButton>
                  LinkedIn
                </a>
              </p>
            </div>
          </Col>
          <Col md={5} className="p-5">
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="userName">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="userName"
                  placeholder="John Doe"
                  value={formData.userName}
                  onChange={handleInputChange}
                />
                {errors.userName && (
                  <p className="text-danger fw-bolder">{errors.userName}</p>
                )}
              </div>
              <div className="form-group my-3">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  className="form-control"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {errors.email && (
                  <p className="text-danger fw-bolder">{errors.email}</p>
                )}
              </div>
              <div className="form-group my-3">
                <label htmlFor="message">Message</label>
                <textarea
                  className="form-control"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleInputChange}
                ></textarea>
                {errors.message && (
                  <p className="text-danger fw-bolder">{errors.message}</p>
                )}
              </div>
              <Button
                type="submit"
                className="my-3 btn rounded-pill gradient-bg-blue"
                style={{ width: "100%" }}
              >
                Submit
              </Button>
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Contact;
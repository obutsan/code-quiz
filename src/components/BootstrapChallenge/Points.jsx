import React from "react";
import { ProgressBar } from "react-bootstrap";

const Points = ({ points }) => {
  const cappedPoints = Math.min(points, 120);
  const progress = (cappedPoints / 120) * 100;

  return (
    <div className="d-flex justify-content-between text-success fw-bold fs-4">
      <p style={{ marginBottom: "0" }}>Points: {points}</p>
      <ProgressBar
        animated
        now={progress}
        label={`${points}`}
        variant="success"
        className="d-none d-md-flex ms-3"
        style={{ height: "32px", width: "200px" }}
      />
    </div>
  );
};

export default Points;

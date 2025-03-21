import React from "react";
import "../../styles/BlurLoader.css";

const BlurLoader = () => {
  return (
    <div className="blur-loader-container">
      <div className="honey-pot">🍯</div>
      <div className="bee">🐝</div>
      <p>Processing your request...</p>
    </div>
  );
};

export default BlurLoader;